/* Değerlendirme testi ve skor tabloları (#calis): uyarlamada eklendi (Usta, 2026).
   20 soru, beş alan; doğru yanıt 100 puan, hızlı yanıt 50 puana kadar prim getirir.
   Skorlar bu tarayıcıda saklanır. Bir sınıf kodu girilirse en iyi skor, sitedeki sunucu işlevi
   (/api/atlas-skor) üzerinden o sınıfın ortak tablosuna da yazılır: yalnızca rumuz, puan, doğru sayısı,
   süre, deneme sayısı, tarih ve bu tarayıcının ürettiği rastgele kimlik gönderilir. */
(function () {
  "use strict";
  var A = window.ATLAS, U = A.U, esc = U.esc, G = A.quizGen;
  var view = document.getElementById("view-calis");
  if (!view || !G) return;

  var KEY = "ruhsal-atlas-sinav", API = "/api/atlas-skor";
  var TAM = 100, PRIM = 50, PRIM_TAM_MS = 8000, PRIM_SIFIR_MS = 60000, EN_COK_MS = 600000;
  var ALFABE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  /* Soru dağılımı her denemede aynıdır; sorular atlasın verisinden yeniden üretilir */
  var ALANLAR = [
    { id: "kuram", ad: "Kuramlar ve evreler", gen: [G.stageOwner, G.ageStage, G.theoryCore, G.ageStage, G.theoryEvidence, G.stageOwner] },
    { id: "cdc", ad: "Gelişim basamakları", gen: [G.cdc, G.cdc, G.cdc] },
    { id: "deney", ad: "Deneyler ve kanıt", gen: [G.expWhich, G.expRelation, G.expWhich, G.expRelation, G.expStatus] },
    { id: "kavram", ad: "Kavramlar", gen: [G.concept, G.concept, G.concept] },
    { id: "klinik", ad: "Klinik ve beyin", gen: [G.caseFinding, G.brainRegion, G.caseFinding] }
  ];
  var N = ALANLAR.reduce(function (n, a) { return n + a.gen.length; }, 0);
  var EN_YUKSEK = N * (TAM + PRIM);
  function alanAd(id) { return ALANLAR.filter(function (a) { return a.id === id; })[0].ad; }

  /* ---------- kalıcı durum (yalnızca bu tarayıcı) ---------- */
  var P = { rumuz: "", sinif: "", sinifAd: "", kimlik: "", yerel: [], yonetici: {} };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (typeof saved.rumuz === "string") P.rumuz = saved.rumuz.slice(0, 20);
    if (typeof saved.sinif === "string") P.sinif = kodDuzelt(saved.sinif);
    if (typeof saved.sinifAd === "string") P.sinifAd = saved.sinifAd.slice(0, 60);
    if (typeof saved.kimlik === "string") P.kimlik = saved.kimlik;
    if (Array.isArray(saved.yerel)) P.yerel = saved.yerel.filter(function (x) { return x && typeof x.r === "string" && isFinite(x.p) && isFinite(x.d) && isFinite(x.s); }).slice(0, 20);
    if (saved.yonetici && typeof saved.yonetici === "object") Object.keys(saved.yonetici).forEach(function (k) { if (kodDuzelt(k) === k && typeof saved.yonetici[k] === "string") P.yonetici[k] = saved.yonetici[k]; });
  } catch (e) { /* depolama yoksa varsayılanlar */ }
  if (!/^[a-z0-9]{16,64}$/.test(P.kimlik)) P.kimlik = rastgele(24);
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* yok say */ } }

  /* ---------- oturum durumu ---------- */
  var X = null;   /* süren test: { qs, i, secim, t0, yanit } */
  var SON = null; /* son sonuç: { puan, dogru, ms, prim, alan, qs, yanit, yerelSira, kayit } */
  var F = { rumuz: P.rumuz, kod: "", mesaj: "", tur: "", mesgul: false };          /* giriş formu */
  var T = { sekme: P.sinif ? "sinif" : "yerel", veri: null, durum: "", mesaj: "", onay: null, yeni: "", kopya: false }; /* tablolar */
  var KUR = { acik: false, ad: "", mesaj: "", mesgul: false };                        /* sınıf oluşturma */
  var ilkYukleme = false;
  /* Katılım bağlantısı: ...?sinif=KOD#calis */
  try { var q = kodDuzelt(new URLSearchParams(location.search).get("sinif")); if (q && q !== P.sinif) F.kod = q; } catch (e) { /* yok say */ }

  /* ---------- yardımcılar ---------- */
  function rastgele(n) {
    var a = "abcdefghijklmnopqrstuvwxyz0123456789", s = "", b, i;
    try { b = new Uint8Array(n); crypto.getRandomValues(b); } catch (e) { b = []; for (i = 0; i < n; i++) b.push(Math.floor(Math.random() * 256)); }
    for (i = 0; i < n; i++) s += a.charAt(b[i] % a.length);
    return s;
  }
  function kodDuzelt(s) {
    var k = String(s == null ? "" : s).toUpperCase().replace(/[\s-]/g, "");
    if (k.length !== 6) return "";
    for (var i = 0; i < k.length; i++) if (ALFABE.indexOf(k.charAt(i)) < 0) return "";
    return k;
  }
  function rumuzDuzelt(s) {
    var r = String(s == null ? "" : s).replace(/\s+/g, " ").trim().slice(0, 20), ok = false;
    try { ok = new RegExp("^[\\p{L}\\p{N}][\\p{L}\\p{N} ._-]{1,19}$", "u").test(r); } catch (e) { ok = /^[^\s<>&"'][^<>&"']{1,19}$/.test(r); }
    return ok ? r : "";
  }
  function katla(s) { return String(s).toLocaleLowerCase("tr"); }
  function soruPuani(ok, ms) {
    if (!ok) return 0;
    return TAM + Math.round(PRIM * Math.min(1, Math.max(0, (PRIM_SIFIR_MS - ms) / (PRIM_SIFIR_MS - PRIM_TAM_MS))));
  }
  function sayi(n) { try { return Number(n).toLocaleString("tr-TR"); } catch (e) { return String(n); } }
  function sure(ms) { var s = Math.round(ms / 1000), d = Math.floor(s / 60); return d ? d + " dk " + (s % 60) + " sn" : s + " sn"; }
  function tarih(iso) {
    try { var d = new Date(iso), o = { day: "numeric", month: "short" }; if (d.getFullYear() !== new Date().getFullYear()) o.year = "numeric"; return d.toLocaleDateString("tr-TR", o); } catch (e) { return ""; }
  }
  function baglanti(kod) { return location.origin + location.pathname + "?sinif=" + kod + "#calis"; }

  /* ---------- sunucu ---------- */
  function iste(yontem, veri) {
    var o = { method: yontem, headers: { "Accept": "application/json" }, cache: "no-store" }, url = API;
    if (yontem === "GET") url += "?sinif=" + encodeURIComponent(veri);
    else { o.headers["Content-Type"] = "application/json"; o.body = JSON.stringify(veri); }
    return fetch(url, o).then(function (r) {
      return r.text().then(function (t) {
        var j = null;
        try { j = JSON.parse(t); } catch (e) { j = null; }
        /* JSON olmayan yanıt: işlev bu yayında yok (durum -1) ya da istek sınırı aşıldı */
        if (!j || typeof j !== "object") throw { durum: r.status === 429 ? 429 : -1, mesaj: r.status === 429 ? "Çok sık istek gönderildi. Bir dakika sonra yeniden deneyin." : "Ortak skor tablosu bu yayında kullanılamıyor; skorlar yalnızca bu cihazda saklanır." };
        if (!r.ok) throw { durum: r.status, mesaj: j.hata || "İstek başarısız oldu." };
        return j;
      });
    }, function () { throw { durum: 0, mesaj: "Ortak skor tablosuna ulaşılamadı. Bağlantınızı denetleyip yeniden deneyin." }; });
  }
  function sinifAl(j) { T.veri = j; T.durum = "hazir"; T.mesaj = ""; if (j.sinif) { P.sinifAd = j.sinif.ad; save(); } }
  function yukle() {
    if (!P.sinif) return;
    T.durum = "yukleniyor"; T.mesaj = ""; draw();
    var kod = P.sinif;
    iste("GET", kod).then(function (j) { if (P.sinif === kod) { sinifAl(j); draw(); } }, function (e) {
      if (P.sinif !== kod) return;
      T.durum = "hata"; T.mesaj = e.durum === 404 ? "Bu sınıf kapatılmış ya da kod geçersiz. Sınıftan çıkıp yeni kodu girebilirsiniz." : e.mesaj; draw();
    });
  }
  function katil(sonra) {
    var kod = kodDuzelt(F.kod);
    if (!kod) { F.mesaj = "Sınıf kodu altı karakterdir (harf ve rakam). Kodu eğiticinizden alın."; F.tur = "bad"; draw(); return; }
    F.mesgul = true; F.mesaj = "Sınıf denetleniyor…"; F.tur = ""; draw();
    iste("GET", kod).then(function (j) {
      F.mesgul = false; F.mesaj = ""; F.kod = "";
      P.sinif = kod; T.sekme = "sinif"; T.onay = null; T.yeni = ""; sinifAl(j); save();
      if (sonra) sonra(); else draw();
    }, function (e) { F.mesgul = false; F.mesaj = e.durum === 404 ? "Bu kodla bir sınıf bulunamadı. Kodu denetleyin." : e.mesaj; F.tur = "bad"; draw(); });
  }
  function olustur() {
    var ad = KUR.ad.replace(/\s+/g, " ").trim();
    if (ad.length < 3) { KUR.mesaj = "Sınıf adı en az üç karakter olmalıdır."; draw(); return; }
    KUR.mesgul = true; KUR.mesaj = "Sınıf oluşturuluyor…"; draw();
    iste("POST", { islem: "olustur", ad: ad }).then(function (j) {
      KUR = { acik: false, ad: "", mesaj: "", mesgul: false };
      P.sinif = j.sinif.kod; P.yonetici[j.sinif.kod] = j.anahtar; T.sekme = "sinif"; T.onay = null; T.yeni = j.sinif.kod; F.kod = ""; F.mesaj = "";
      sinifAl(j); save(); draw();
    }, function (e) { KUR.mesgul = false; KUR.mesaj = e.mesaj; draw(); });
  }
  function gonder() {
    if (!SON || !P.sinif) return;
    SON.kayit = { durum: "gonderiliyor" }; draw();
    var kod = P.sinif;
    iste("POST", { islem: "skor", sinif: kod, kimlik: P.kimlik, rumuz: SON.rumuz, yanitlar: SON.yanit.map(function (y) { return [y.ok ? 1 : 0, y.ms]; }) }).then(function (j) {
      if (!SON) return;
      SON.kayit = { durum: "tamam", sira: j.kayit.sira, rekor: j.kayit.rekor, n: j.tablo.length };
      if (P.sinif === kod) { sinifAl(j); T.sekme = "sinif"; }
      draw();
    }, function (e) { if (SON) { SON.kayit = { durum: "hata", mesaj: e.mesaj, kalici: e.durum === 409 || e.durum === 422 || e.durum === 404 }; draw(); } });
  }
  function yonet(islem, rumuz) {
    var kod = P.sinif, veri = { islem: islem, sinif: kod, anahtar: P.yonetici[kod] };
    if (rumuz) veri.rumuz = rumuz;
    T.onay = null; T.durum = "yukleniyor"; draw();
    iste("POST", veri).then(function (j) {
      if (islem === "kapat") { delete P.yonetici[kod]; cik(); return; }
      sinifAl(j); draw();
    }, function (e) { T.durum = "hazir"; T.mesaj = e.mesaj; draw(); });
  }
  function cik() { P.sinif = ""; P.sinifAd = ""; T.veri = null; T.durum = ""; T.mesaj = ""; T.onay = null; T.yeni = ""; T.sekme = "yerel"; save(); draw(); }

  /* ---------- test ---------- */
  function kur() {
    var qs = [], seen = {};
    function ekle(gen, alan) {
      for (var guard = 0; guard < 40; guard++) {
        var s = gen(), key = s.prompt + "|" + s.detail;
        if (seen[key] || !s.opts || s.opts.length < 2) continue;
        seen[key] = 1; s.alan = alan; qs.push(s); return true;
      }
      return false;
    }
    ALANLAR.forEach(function (a) { a.gen.forEach(function (g) { if (!ekle(g, a.id)) ekle(G.concept, a.id); }); });
    return G.shuffle(qs);
  }
  function basla() {
    var r = rumuzDuzelt(F.rumuz);
    if (F.rumuz.trim() && !r) { F.mesaj = "Rumuz 2-20 karakter olmalı; harf, rakam, boşluk, nokta ve tire kullanılabilir."; F.tur = "bad"; draw(); return; }
    if (!P.sinif && F.kod.trim()) { katil(basla); return; }
    if (P.sinif && !r) { F.mesaj = "Sınıf tablosuna yazılabilmesi için bir rumuz girin."; F.tur = "bad"; draw(); return; }
    var qs = kur();
    if (qs.length !== N) { F.mesaj = "Sorular üretilemedi. Sayfayı yenileyip yeniden deneyin."; F.tur = "bad"; draw(); return; }
    P.rumuz = r; F.rumuz = r; F.mesaj = ""; save();
    SON = null; X = { qs: qs, i: 0, secim: -1, t0: performance.now(), yanit: [] };
    tumunuCiz("start");
  }
  function yanitla(k) {
    if (!X || X.secim > -1) return;
    var s = X.qs[X.i];
    if (k < 0 || k >= s.opts.length) return;
    var ms = Math.min(EN_COK_MS, Math.max(0, Math.round(performance.now() - X.t0))), ok = k === s.correct;
    X.secim = k; X.yanit.push({ k: k, ok: ok, ms: ms, puan: soruPuani(ok, ms) });
    draw();
    var nx = document.getElementById("exNext");
    if (nx) nx.focus();
  }
  function sonraki() {
    if (!X || X.secim < 0) return;
    X.i++; X.secim = -1;
    if (X.i >= X.qs.length) { bitir(); return; }
    X.t0 = performance.now();
    draw();
    var p = document.getElementById("examPanel"), f = view.querySelector(".study-opt");
    if (p) p.scrollIntoView({ block: "nearest" });
    if (f) f.focus();
  }
  function bitir() {
    var alan = {}, puan = 0, dogru = 0, ms = 0;
    ALANLAR.forEach(function (a) { alan[a.id] = { d: 0, n: 0 }; });
    X.yanit.forEach(function (y, i) { var a = alan[X.qs[i].alan]; a.n++; if (y.ok) { a.d++; dogru++; } puan += y.puan; ms += y.ms; });
    var kayit = { r: P.rumuz || "Misafir", p: puan, d: dogru, s: ms, t: new Date().toISOString() };
    P.yerel.push(kayit);
    P.yerel.sort(function (a, b) { return b.p - a.p || a.s - b.s; });
    var sira = P.yerel.indexOf(kayit) + 1;
    P.yerel = P.yerel.slice(0, 20);
    save();
    SON = { puan: puan, dogru: dogru, ms: ms, prim: puan - dogru * TAM, alan: alan, qs: X.qs, yanit: X.yanit, rumuz: P.rumuz, yerelSira: sira <= 20 ? sira : 0, yerelKayit: kayit, kayit: null };
    X = null;
    if (P.sinif && SON.rumuz) { T.sekme = "sinif"; gonder(); } else { T.sekme = "yerel"; }
    tumunuCiz("start");
  }
  function kapat() { X = null; SON = null; tumunuCiz("nearest"); }
  /* Test başlarken ve biterken Çalış görünümünün tamamı yeniden çizilir (diğer bölümler gizlenir ya da geri gelir) */
  function tumunuCiz(blok) {
    A.views.calis.render();
    var p = document.getElementById("examPanel") || document.getElementById("examSlot");
    if (p) p.scrollIntoView({ block: blok });
    var f = X ? view.querySelector(".study-opt") : null;
    if (f) f.focus();
  }

  /* ---------- çizim: skor tabloları ---------- */
  function tabloHtml(satirlar, ortak, yonetici) {
    if (!satirlar.length) return '<p class="hint ex-empty">' + (ortak ? "Bu sınıfta henüz skor yok. İlk skoru siz yazın." : "Bu cihazda henüz tamamlanmış bir test yok.") + "</p>";
    var ben = katla(P.rumuz || "");
    var body = satirlar.map(function (s, i) {
      var benim = ortak ? (ben && katla(s.rumuz) === ben) : (SON && SON.yerelKayit === s.ham);
      var son = "";
      if (yonetici) {
        son = T.onay && T.onay.tur === "sil" && T.onay.r === s.rumuz
          ? '<td class="xc-act"><button type="button" class="linkish ex-danger" data-ex="silEvet">Sil</button> <button type="button" class="linkish" data-ex="vazgec">Vazgeç</button></td>'
          : '<td class="xc-act"><button type="button" class="linkish" data-ex="sil" data-r="' + esc(s.rumuz) + '" aria-label="' + esc(s.rumuz) + ' kaydını sil">Sil</button></td>';
      }
      return '<tr class="' + (i < 3 ? "top" + (i + 1) : "") + (benim ? " me" : "") + '"><td class="xc-no">' + (i + 1) + '</td><td class="xc-ad">' + esc(s.rumuz) + (benim ? ' <span class="ex-me">siz</span>' : "") +
        '</td><td class="xc-p">' + sayi(s.puan) + '</td><td class="xc-d">' + s.dogru + " / " + N + '</td><td class="xc-s">' + sure(s.sure) + "</td>" +
        (ortak ? '<td class="xc-n">' + s.deneme + '</td><td class="xc-i">' + sayi(s.ilk) + "</td>" : "") + '<td class="xc-t">' + esc(tarih(s.tarih)) + "</td>" + son + "</tr>";
    }).join("");
    return '<div class="ex-scroll"><table class="ex-table"><thead><tr><th class="xc-no" scope="col"><abbr title="Sıra">#</abbr></th><th class="xc-ad" scope="col">Rumuz</th><th class="xc-p" scope="col">Puan</th><th class="xc-d" scope="col">Doğru</th><th class="xc-s" scope="col">Süre</th>' + (ortak ? '<th class="xc-n" scope="col">Deneme</th><th class="xc-i" scope="col"><abbr title="İlk deneme puanı">İlk</abbr></th>' : "") +
      '<th class="xc-t" scope="col">Tarih</th>' + (yonetici ? '<th class="xc-act" scope="col"><span class="sr">İşlem</span></th>' : "") + "</tr></thead><tbody>" + body + "</tbody></table></div>";
  }
  function boardHtml() {
    var sinifVar = !!P.sinif, sekme = sinifVar ? T.sekme : "yerel", ic = "";
    var tabs = '<div class="ex-tabs" role="tablist" aria-label="Skor tabloları"><button type="button" role="tab" class="ex-tab" data-ex="sekme" data-v="yerel" aria-selected="' + (sekme === "yerel") + '">Bu cihaz</button>' +
      (sinifVar ? '<button type="button" role="tab" class="ex-tab" data-ex="sekme" data-v="sinif" aria-selected="' + (sekme === "sinif") + '">Sınıf: ' + esc(P.sinifAd || P.sinif) + "</button>" : "") + "</div>";
    if (sekme === "yerel") {
      var yerel = P.yerel.slice(0, 10).map(function (x) { return { rumuz: x.r, puan: x.p, dogru: x.d, sure: x.s, tarih: x.t, ham: x }; });
      ic = tabloHtml(yerel, false, false) + (P.yerel.length ? '<p class="hint ex-foot">Bu tablo yalnızca bu tarayıcıda saklanır; en iyi 10 deneme gösterilir. ' +
        (T.onay && T.onay.tur === "temizle" ? 'Bütün denemeler silinsin mi? <button type="button" class="linkish ex-danger" data-ex="temizleEvet">Sil</button> <button type="button" class="linkish" data-ex="vazgec">Vazgeç</button>'
          : '<button type="button" class="linkish" data-ex="temizle">Tabloyu temizle</button>') + "</p>" : "");
    } else {
      var kod = P.sinif, yon = !!P.yonetici[kod], v = T.veri;
      var bilgi = '<div class="ex-class"><div class="ex-class-id"><span class="ex-code" aria-label="Sınıf kodu">' + esc(kod) + "</span><span>" + (v ? v.sinif.kayit + " katılımcı" + (yon ? " · bu cihaz yönetici" : "") : "") + "</span></div>" +
        '<div class="ex-class-act"><button type="button" class="btn ghost" data-ex="yenile"' + (T.durum === "yukleniyor" ? " disabled" : "") + ">Yenile</button>" +
        '<button type="button" class="btn ghost" data-ex="kopya">' + (T.kopya ? "Kopyalandı" : "Katılım bağlantısını kopyala") + "</button></div></div>";
      if (T.yeni === kod) bilgi += '<p class="ex-note ok" role="status"><b>Sınıf oluşturuldu.</b> Katılımcılarla sınıf kodunu ya da katılım bağlantısını paylaşın. Yönetici anahtarı yalnızca bu tarayıcıda saklanır: kayıt silme ve sınıfı kapatma bu cihazdan yapılır.</p>';
      if (T.kopya === "elle") bilgi += '<p class="ex-note">Bağlantı kopyalanamadı; elle kopyalayın: <span class="ex-link">' + esc(baglanti(kod)) + "</span></p>";
      if (T.mesaj) bilgi += '<p class="ex-note bad" role="alert">' + esc(T.mesaj) + "</p>";
      var govde = T.durum === "yukleniyor" && !v ? '<p class="hint ex-empty" role="status">Tablo yükleniyor…</p>' : v ? tabloHtml(v.tablo, true, yon) : "";
      var alt = '<p class="hint ex-foot">Puan, katılımcının en iyi denemesidir; eşitlikte daha kısa süre öndedir. “İlk” sütunu ilk deneme puanını gösterir. ' +
        '<button type="button" class="linkish" data-ex="cik">Sınıftan çık</button>' +
        (yon ? (T.onay && T.onay.tur === "kapat" ? ' · Sınıf ve tablosu kalıcı olarak silinsin mi? <button type="button" class="linkish ex-danger" data-ex="kapatEvet">Evet, kapat</button> <button type="button" class="linkish" data-ex="vazgec">Vazgeç</button>'
          : ' · <button type="button" class="linkish" data-ex="sinifKapat">Sınıfı kapat</button>') : "") + "</p>";
      ic = bilgi + govde + alt;
    }
    return '<div class="ex-board"><div class="panel-title">Skor tablosu</div>' + tabs + '<div role="tabpanel">' + ic + "</div></div>";
  }

  /* ---------- çizim: giriş ---------- */
  function girisHtml() {
    var enIyi = P.yerel.length ? P.yerel[0] : null;
    var sinif = P.sinif
      ? '<div class="ex-field"><span class="ex-lab">Sınıf</span><p class="ex-joined"><b>' + esc(P.sinifAd || "Sınıf") + '</b> <span class="ex-code small">' + esc(P.sinif) + "</span></p><p class=\"ex-sub\">Testi bitirdiğinizde skorunuz bu sınıfın tablosuna yazılır.</p></div>"
      : '<div class="ex-field"><label class="ex-lab" for="exKod">Sınıf kodu <small>(isteğe bağlı)</small></label><div class="ex-row"><input class="ex-in ex-in-code" id="exKod" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="8" placeholder="ör. K7M2QX" value="' + esc(F.kod) + '"' + (F.mesgul ? " disabled" : "") + ">" +
        '<button type="button" class="btn ghost" data-ex="katil"' + (F.mesgul ? " disabled" : "") + ">Tabloyu aç</button></div><p class=\"ex-sub\">Kod girerseniz skorunuz sınıfın ortak tablosuna da yazılır. Kodsuz denemeler yalnızca bu cihazda kalır.</p></div>";
    var kurForm = P.sinif ? "" : '<details class="ex-create" id="exKur"' + (KUR.acik ? " open" : "") + "><summary>Sınıf oluştur (eğiticiler için)</summary>" +
      '<p class="ex-sub">Bir asistan grubu ya da ders için ortak tablo açar. Size altı karakterlik bir kod verilir; kodu bilen herkes tabloyu görebilir ve skor yazabilir.</p>' +
      '<div class="ex-field"><label class="ex-lab" for="exSinifAd">Sınıf adı</label><div class="ex-row"><input class="ex-in" id="exSinifAd" type="text" autocomplete="off" maxlength="60" placeholder="ör. ÇRS asistanları 2026" value="' + esc(KUR.ad) + '"' + (KUR.mesgul ? " disabled" : "") + ">" +
      '<button type="button" class="btn ghost" data-ex="olustur"' + (KUR.mesgul ? " disabled" : "") + ">Oluştur</button></div></div>" +
      (KUR.mesaj ? '<p class="ex-note' + (KUR.mesgul ? "" : " bad") + '" role="status">' + esc(KUR.mesaj) + "</p>" : "") + "</details>";
    return '<div class="section-h"><h3>Değerlendirme testi</h3><span>' + N + " soru · " + ALANLAR.length + " alan · en yüksek " + sayi(EN_YUKSEK) + " puan</span></div>" +
      '<section class="panel exam" id="examPanel"><div class="ex-grid"><div class="ex-start">' +
      "<p>Atlasın bütününden " + N + " soruluk puanlı bir test. Soru dağılımı her denemede aynıdır, sorular yeniden üretilir.</p>" +
      '<ul class="ex-rules"><li><b>Doğru yanıt ' + TAM + " puan</b>, yanlış yanıt 0 puan; yanlış doğruyu götürmez.</li>" +
      "<li><b>Hız primi " + PRIM + " puana kadar:</b> ilk " + (PRIM_TAM_MS / 1000) + " saniyede tam, " + (PRIM_SIFIR_MS / 1000) + ". saniyeye doğru azalır.</li>" +
      "<li>Yanıt verildikten sonra değiştirilemez. Açıklamalar test bitince soru soru gösterilir.</li>" +
      "<li>" + ALANLAR.map(function (a) { return esc(a.ad) + " (" + a.gen.length + ")"; }).join(", ") + ".</li></ul>" +
      '<div class="ex-field"><label class="ex-lab" for="exRumuz">Rumuz' + (P.sinif ? "" : " <small>(isteğe bağlı)</small>") + '</label><input class="ex-in" id="exRumuz" type="text" autocomplete="off" spellcheck="false" maxlength="20" placeholder="Skor tablosunda görünecek ad" value="' + esc(F.rumuz) + '"></div>' +
      sinif + (F.mesaj ? '<p class="ex-note' + (F.tur ? " " + F.tur : "") + '" role="' + (F.tur === "bad" ? "alert" : "status") + '">' + esc(F.mesaj) + "</p>" : "") +
      '<div class="study-actions"><button type="button" class="btn ex-go" data-ex="basla"' + (F.mesgul ? " disabled" : "") + ">Testi başlat</button>" +
      (enIyi ? '<span class="ex-best">Bu cihazdaki en iyi: <b>' + sayi(enIyi.p) + "</b> puan</span>" : "") + "</div>" + kurForm +
      '<p class="hint ex-privacy">Ortak tabloda yalnızca rumuz, puan, doğru sayısı, süre, deneme sayısı ve tarih saklanır; gerçek adınızı yazmanız gerekmez. Sorular tarayıcıda üretildiği için tablo bir sınav güvencesi değil, sınıf içi karşılaştırma aracıdır.</p>' +
      "</div>" + boardHtml() + "</div></section>";
  }

  /* ---------- çizim: soru ---------- */
  function soruHtml() {
    var s = X.qs[X.i], done = X.secim > -1, y = done ? X.yanit[X.i] : null;
    var toplam = X.yanit.reduce(function (n, v) { return n + v.puan; }, 0);
    var opts = s.opts.map(function (o, k) {
      var cls = done ? (k === s.correct ? " ok" : k === X.secim ? " bad" : "") : "";
      return '<button type="button" class="study-opt' + cls + '" data-ex="yanit" data-k="' + k + '"' + (done ? " disabled" : "") + '><span class="so-l">' + "ABCD".charAt(k) + "</span><span>" + esc(o) + "</span></button>";
    }).join("");
    var prim;
    if (done) {
      prim = '<div class="ex-prim done" aria-hidden="true"><i style="width:' + (y.ok ? Math.round(100 * (y.puan - TAM) / PRIM) : 0) + '%"></i></div>';
    } else {
      /* Çubuk CSS ile küçülür; yeniden çizimde geçen süre kadar ileriden başlar */
      var gecen = (performance.now() - X.t0) / 1000;
      prim = '<div class="ex-prim" aria-hidden="true"><i style="animation-delay:' + (PRIM_TAM_MS / 1000 - gecen).toFixed(2) + 's"></i></div>';
    }
    var fb = done ? '<div class="study-fb ' + (y.ok ? "ok" : "bad") + '" role="status"><p><b>' + (y.ok ? "Doğru: +" + y.puan + " puan" : "Yanlış: 0 puan") + "</b>" +
      (y.ok ? " (" + TAM + " + " + (y.puan - TAM) + " hız primi, " + sure(y.ms) + ")" : ". Doğru yanıt: " + esc(s.opts[s.correct]) + ".") + '</p></div><div class="study-actions"><button type="button" class="btn" id="exNext" data-ex="sonraki">' +
      (X.i + 1 < X.qs.length ? "Sonraki soru →" : "Sonucu gör") + "</button></div>" : "";
    return '<section class="panel exam ex-run" id="examPanel"><div class="panel-title">Değerlendirme testi · soru ' + (X.i + 1) + " / " + X.qs.length + '<span class="study-run">' + sayi(toplam) + " puan</span></div>" +
      '<div class="ex-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + X.qs.length + '" aria-valuenow="' + X.yanit.length + '" aria-label="Yanıtlanan soru"><i style="width:' + Math.round(100 * X.yanit.length / X.qs.length) + '%"></i></div>' +
      '<p class="study-k">' + esc(alanAd(s.alan)) + " · " + esc(s.kicker) + '</p><p class="study-q">' + esc(s.prompt) + "</p>" + (s.detail ? '<blockquote class="study-d">' + esc(s.detail) + "</blockquote>" : "") +
      '<div class="ex-primrow"><span>Hız primi</span>' + prim + "</div>" +
      '<div class="study-opts" role="group" aria-label="Seçenekler">' + opts + "</div>" + fb +
      '<p class="hint ex-quit">' + (X.birak ? 'Test bırakılsın mı? Skor kaydedilmez. <button type="button" class="linkish ex-danger" data-ex="birakEvet">Bırak</button> <button type="button" class="linkish" data-ex="birakHayir">Sürdür</button>'
        : '<span class="ex-kbd">Klavye: A-D ya da 1-4 ile yanıtlayın. </span><button type="button" class="linkish" data-ex="birak">Testi bırak</button>') + "</p></section>";
  }

  /* ---------- çizim: sonuç ---------- */
  function sonucHtml() {
    var R = SON, oran = R.dogru / N;
    var yorum = oran >= 0.85 ? "Atlasın bütününe hâkimsiniz. Yanlışlarınızın açıklamaları aşağıda." : oran >= 0.6 ? "İyi bir sonuç. Alan dökümünde zayıf kalan başlıklara ve soru dökümündeki bağlantılara bakın."
      : "Alan dökümü hangi bölümlerin yeniden okunmasının yararlı olacağını gösterir; soru dökümündeki bağlantılar ilgili sayfaları açar.";
    var alan = ALANLAR.map(function (a) {
      var v = R.alan[a.id], p = v.n ? Math.round(100 * v.d / v.n) : 0;
      return '<div class="ex-area"><span class="ex-area-n">' + esc(a.ad) + '</span><span class="ex-area-b"><i style="width:' + p + '%"></i></span><span class="ex-area-v">' + v.d + " / " + v.n + "</span></div>";
    }).join("");
    var durum = '<p class="ex-note"><b>Bu cihaz:</b> ' + (R.yerelSira ? R.yerelSira + ". sıra" + (R.yerelSira === 1 ? " (bu cihazdaki en iyi skor)" : "") : "ilk 20'ye giremedi") + ".</p>";
    if (P.sinif && !R.rumuz) durum += '<p class="ex-note bad">Rumuz girilmediği için skor sınıf tablosuna yazılmadı.</p>';
    else if (R.kayit) {
      var k = R.kayit;
      durum += k.durum === "gonderiliyor" ? '<p class="ex-note" role="status">Skor sınıf tablosuna gönderiliyor…</p>'
        : k.durum === "tamam" ? '<p class="ex-note ok" role="status"><b>' + esc(P.sinifAd || "Sınıf") + ":</b> " + k.n + " katılımcı içinde " + k.sira + ". sıradasınız" + (k.rekor ? "; bu, sınıftaki en iyi skorunuz." : "; tabloda önceki en iyi skorunuz duruyor.") + "</p>"
        : '<p class="ex-note bad" role="alert"><b>Skor sınıf tablosuna yazılamadı.</b> ' + esc(k.mesaj) + (k.kalici ? "" : ' <button type="button" class="linkish" data-ex="gonder">Yeniden gönder</button>') + "</p>";
    }
    var dokum = R.qs.map(function (s, i) {
      var y = R.yanit[i];
      return '<details class="ex-rev ' + (y.ok ? "ok" : "bad") + '"><summary><span class="ex-rev-no">' + (i + 1) + '</span><span class="lv ' + (y.ok ? "lv-ok" : "lv-bad") + '">' + (y.ok ? "Doğru" : "Yanlış") + '</span><span class="ex-rev-q">' + esc(s.prompt) + '</span><span class="ex-rev-p">' + (y.ok ? "+" + y.puan : "0") + "</span></summary>" +
        '<div class="ex-rev-b"><p class="study-k">' + esc(alanAd(s.alan)) + " · " + esc(s.kicker) + " · " + sure(y.ms) + "</p>" + (s.detail ? '<blockquote class="study-d">' + esc(s.detail) + "</blockquote>" : "") +
        (y.ok ? "" : "<p><b>Yanıtınız:</b> " + esc(s.opts[y.k]) + "</p>") + "<p><b>Doğru yanıt:</b> " + esc(s.opts[s.correct]) + "</p><p>" + esc(s.explain) + "</p>" + G.goBtn(s.go) + "</div></details>";
    }).join("");
    return '<section class="panel exam ex-result" id="examPanel"><div class="panel-title">Değerlendirme testi · sonuç' + (R.rumuz ? '<span class="study-run">' + esc(R.rumuz) + "</span>" : "") + "</div>" +
      '<div class="ex-grid"><div class="ex-sum"><p class="ex-score">' + sayi(R.puan) + "<small> / " + sayi(EN_YUKSEK) + '</small></p><p class="ex-stats"><b>' + R.dogru + " / " + N + "</b> doğru · süre <b>" + sure(R.ms) + "</b> · hız primi <b>+" + R.prim + "</b></p><p>" + yorum + "</p>" +
      '<div class="ex-areas" aria-label="Alan dökümü">' + alan + "</div>" + durum +
      '<div class="study-actions"><button type="button" class="btn" data-ex="basla">Yeniden dene</button><button type="button" class="btn ghost" data-ex="kapat">Kapat</button></div></div>' + boardHtml() + "</div>" +
      '<div class="section-h ex-rev-h"><h3>Soru dökümü</h3><span>Açıklama ve bağlantı için soruya dokunun</span></div><div class="ex-revs">' + dokum + "</div></section>";
  }

  /* ---------- çizim ---------- */
  function draw() {
    var slot = document.getElementById("examSlot");
    if (!slot) return;
    slot.innerHTML = X ? soruHtml() : SON ? sonucHtml() : girisHtml();
  }
  function mount() {
    draw();
    if (P.sinif && !T.veri && !ilkYukleme) { ilkYukleme = true; yukle(); }
  }

  /* ---------- olaylar ---------- */
  view.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ex]");
    if (!t || t.disabled) return;
    var x = t.dataset.ex;
    if (x === "basla") basla();
    else if (x === "yanit") yanitla(+t.dataset.k);
    else if (x === "sonraki") sonraki();
    else if (x === "birak") { X.birak = true; draw(); }
    else if (x === "birakHayir") { X.birak = false; draw(); }
    else if (x === "birakEvet" || x === "kapat") kapat();
    else if (x === "gonder") gonder();
    else if (x === "katil") katil(null);
    else if (x === "olustur") olustur();
    else if (x === "sekme") { T.sekme = t.dataset.v; T.onay = null; T.kopya = false; draw(); if (T.sekme === "sinif" && !T.veri && T.durum !== "yukleniyor") yukle(); }
    else if (x === "yenile") { T.kopya = false; yukle(); }
    else if (x === "cik") cik();
    else if (x === "sil") { T.onay = { tur: "sil", r: t.dataset.r }; draw(); }
    else if (x === "silEvet") yonet("sil", T.onay.r);
    else if (x === "sinifKapat") { T.onay = { tur: "kapat" }; draw(); }
    else if (x === "kapatEvet") yonet("kapat");
    else if (x === "temizle") { T.onay = { tur: "temizle" }; draw(); }
    else if (x === "temizleEvet") { P.yerel = []; T.onay = null; save(); draw(); }
    else if (x === "vazgec") { T.onay = null; draw(); }
    else if (x === "kopya") {
      var url = baglanti(P.sinif), bitti = function (ok) { T.kopya = ok ? true : "elle"; draw(); };
      try { navigator.clipboard.writeText(url).then(function () { bitti(true); }, function () { bitti(false); }); } catch (err) { bitti(false); }
    }
  });
  view.addEventListener("input", function (e) {
    var id = e.target.id;
    if (id === "exRumuz") F.rumuz = e.target.value;
    else if (id === "exKod") F.kod = e.target.value;
    else if (id === "exSinifAd") KUR.ad = e.target.value;
  });
  view.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var id = e.target.id;
    if (id === "exRumuz") { e.preventDefault(); basla(); }
    else if (id === "exKod") { e.preventDefault(); katil(null); }
    else if (id === "exSinifAd") { e.preventDefault(); olustur(); }
  });
  view.addEventListener("toggle", function (e) { if (e.target.id === "exKur") KUR.acik = e.target.open; }, true);
  document.addEventListener("keydown", function (e) {
    if (!X || X.secim > -1 || view.hidden || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    var tag = e.target && e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || document.documentElement.classList.contains("search-open")) return;
    var k = "1234".indexOf(e.key);
    if (k < 0) k = "abcd".indexOf(String(e.key).toLowerCase());
    if (k > -1 && e.key.length === 1) { e.preventDefault(); yanitla(k); }
  });

  A.exam = { mount: mount, active: function () { return !!(X || SON); }, N: N, puan: soruPuani };
})();
