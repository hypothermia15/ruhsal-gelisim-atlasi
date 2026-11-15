/* Çalış (#calis): uyarlamada eklenen öğrenme araçları (Usta, 2026).
   Değerlendirme testi ve skor tabloları view-exam.js içindedir; soru üreticileri buradan paylaşılır (A.quizGen).
   Sorular atlasın kendi verisinden üretilir: kuram evreleri, yaş dönemleri, CDC basamakları, deneyler ve profil kavramları.
   İlerleme (görülen sayfalar, test sonuçları, bilinen kartlar) yalnızca bu tarayıcıda saklanır. */
(function () {
  "use strict";
  var A = window.ATLAS, U = A.U, esc = U.esc, thById = U.thById, expById = U.expById;
  var view = document.getElementById("view-calis");
  var KEY = "ruhsal-atlas-calis";
  var N_SORU = 10;

  /* ---------- durum ---------- */
  var S = { seen: { age: {}, theory: {}, "case": {} }, quiz: {}, cards: {}, cardSet: "" };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    ["age", "theory", "case"].forEach(function (k) { if (saved.seen && saved.seen[k] && typeof saved.seen[k] === "object") S.seen[k] = saved.seen[k]; });
    if (saved.quiz && typeof saved.quiz === "object") S.quiz = saved.quiz;
    if (saved.cards && typeof saved.cards === "object") S.cards = saved.cards;
    if (typeof saved.cardSet === "string") S.cardSet = saved.cardSet;
  } catch (e) { /* depolama yoksa varsayılanlar */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* yok say */ } }
  /* Diğer görünümler bir yaş dönemi, kuram ya da vaka açıldığında burayı çağırır */
  A.seen = function (type, id) {
    if (!S.seen[type] || S.seen[type][id]) return;
    S.seen[type][id] = 1; save();
  };

  /* ---------- yardımcılar ---------- */
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pick(a, n, skip) { return shuffle(a.filter(function (x) { return !skip || !skip(x); })).slice(0, n); }
  function who(t) { return t.who.split(/ ve |;|,/)[0]; }
  function tLabel(t) { return who(t) + ": " + t.name; }
  function low(s) { return String(s).toLocaleLowerCase("tr"); }
  /* Seçenekleri karıştırır; doğru yanıtın yeni sırasını döndürür */
  function build(q, right, wrong) {
    var opts = shuffle([right].concat(wrong));
    q.opts = opts; q.correct = opts.indexOf(right);
    return q;
  }

  /* ---------- soru üreticileri ---------- */
  var stageNameCount = {};
  A.theories.forEach(function (t) { t.stages.forEach(function (s) { stageNameCount[s.name] = (stageNameCount[s.name] || 0) + 1; }); });

  /* Evre adı ya da görevi kuramın adını ele veriyorsa soru üretilmez (ör. "Yansıtıcı zihinselleştirme" ile "Zihinselleştirme") */
  function givesAway(t, text) {
    text = low(text);
    return low(t.name).split(/[^a-zçğıöşü]+/).some(function (w) { return w.length >= 6 && text.indexOf(w.slice(0, 6)) > -1; });
  }
  function qStageOwner() {
    var pool = [];
    A.theories.forEach(function (t) {
      t.stages.forEach(function (s, i) {
        if (stageNameCount[s.name] === 1 && low(s.name).indexOf(low(who(t))) < 0 && s.task && s.task.length > 30 && !givesAway(t, s.name)) pool.push({ t: t, s: s, i: i });
      });
    });
    var x = pool[Math.floor(Math.random() * pool.length)];
    var same = pick(A.theories, 2, function (o) { return o === x.t || o.fam !== x.t.fam; });
    var other = pick(A.theories, 3 - same.length, function (o) { return o === x.t || same.indexOf(o) > -1; });
    return build({ kicker: "Evre kimin?", prompt: "“" + x.s.name + "” (" + U.fmtRange(x.s.from, x.s.to) + ") hangi kuramın evresidir?",
      detail: x.s.task, explain: tLabel(x.t) + ". " + x.t.core, go: { theory: x.t.id, stage: x.i, label: "Kuramda bu evreyi aç" } },
      tLabel(x.t), same.concat(other).map(tLabel));
  }
  function qAgeStage() {
    for (var guard = 0; guard < 60; guard++) {
      var t = A.theories[Math.floor(Math.random() * A.theories.length)];
      if (t.stages.length < 3) continue;
      var b = A.ages[1 + Math.floor(Math.random() * (A.ages.length - 1))];
      var best = null, bestO = 0;
      t.stages.forEach(function (s) { var o = U.overlap(s, b); if (o > bestO) { bestO = o; best = s; } });
      if (!best || bestO < 0.7 * (b.to - b.from)) continue;
      /* aynı evre dörtten çok yaş dönemini kapsıyorsa (ör. "yetişkinlik boyunca") soru ayırt edici olmaz */
      var kapsar = A.ages.filter(function (o) { return U.overlap(best, o) >= 0.7 * (o.to - o.from); }).length;
      if (kapsar > 4) continue;
      var others = t.stages.filter(function (s) { return s !== best && s.name !== best.name; });
      if (others.length < 2) continue;
      var idx = t.stages.indexOf(best);
      others.sort(function (p, q) { return Math.abs(t.stages.indexOf(p) - idx) - Math.abs(t.stages.indexOf(q) - idx); });
      return build({ kicker: "Bu yaşta hangi evre?", prompt: "“" + b.name + "” döneminde (" + b.range + ") bu kurama göre hangi evre geçerlidir?",
        detail: "Kuram: " + tLabel(t), explain: best.name + " (" + U.fmtRange(best.from, best.to) + "): " + best.task, go: { theory: t.id, stage: idx, label: "Kuramda bu evreyi aç" } },
        best.name, others.slice(0, 3).map(function (s) { return s.name; }));
    }
    return qStageOwner();
  }
  var DOMAIN = { sosyal: "Sosyal-duygusal", dil: "Dil ve iletişim", bilis: "Bilişsel", motor: "Motor ve fiziksel" };
  function qCdc() {
    var C = A.cdc || [];
    if (C.length < 4) return qStageOwner();
    var i = Math.floor(Math.random() * C.length), c = C[i];
    var doms = Object.keys(DOMAIN).filter(function (d) { return c[d] && c[d].length; });
    var d = doms[Math.floor(Math.random() * doms.length)];
    var m = c[d][Math.floor(Math.random() * c[d].length)];
    var near = [];
    for (var k = Math.max(0, i - 3); k <= Math.min(C.length - 1, i + 3); k++) if (k !== i) near.push(C[k].age);
    var q = build({ kicker: "CDC basamağı · " + DOMAIN[d], prompt: "CDC 2022 kontrol listelerine göre çocukların en az %75’i şu beceriyi hangi yaşta kazanmış olur?",
      detail: m, explain: "Bu basamak " + c.age + " kontrol listesindedir. Listeler çocukların en az %75’inin ulaştığı becerileri içerir; basamağa bu yaşta ulaşılmaması değerlendirme gerektirir.",
      go: { age: c.band, label: "Bu yaş dönemini aç" } }, c.age, pick(near, 3));
    /* yaş seçenekleri kronolojik sırada daha okunaklı */
    var order = C.map(function (x) { return x.age; });
    var right = q.opts[q.correct];
    q.opts.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); });
    q.correct = q.opts.indexOf(right);
    return q;
  }
  function expLabel(e) { return e.title + " (" + e.year + ")"; }
  function qExpWhich() {
    var E = A.experiments;
    var e = E[Math.floor(Math.random() * E.length)];
    var near = E.filter(function (o) { return o !== e && Math.abs(o.year - e.year) <= 25; });
    return build({ kicker: "Hangi çalışma?", prompt: "Aşağıdaki bulgu hangi çalışmaya aittir?", detail: e.find,
      explain: expLabel(e) + ", " + e.who + ". " + e.note, go: { exp: e.id, label: "Çalışmayı aç" } },
      expLabel(e), pick(near.length >= 3 ? near : E.filter(function (o) { return o !== e; }), 3).map(expLabel));
  }
  function qExpRelation() {
    var pool = [];
    A.experiments.forEach(function (e) {
      e.sup.forEach(function (id) { if (thById[id]) pool.push({ e: e, t: thById[id], rel: 0 }); });
      e.ch.forEach(function (id) { if (thById[id]) pool.push({ e: e, t: thById[id], rel: 1 }); });
    });
    /* sorgulayan çalışmalar az olduğu için eşit olasılıkla seçilir */
    var want = Math.random() < 0.5 ? 1 : 0;
    var sub = pool.filter(function (x) { return x.rel === want; });
    var x = sub[Math.floor(Math.random() * sub.length)];
    var q = { kicker: "Destekler mi, sorgular mı?", prompt: "“" + expLabel(x.e) + "” çalışması " + tLabel(x.t) + " kuramı için ne anlama gelir?", detail: x.e.find,
      explain: x.e.note, go: { exp: x.e.id, label: "Çalışmayı aç" }, opts: ["Kuramı destekler", "Kuramı sorgular"], correct: x.rel };
    return q;
  }
  function qExpStatus() {
    var e = A.experiments[Math.floor(Math.random() * A.experiments.length)];
    return { kicker: "Kanıt durumu", prompt: "Atlas “" + expLabel(e) + "” çalışmasının kanıt durumunu nasıl sınıflar?", detail: e.find,
      explain: A.status[e.st].label + ": " + A.status[e.st].desc + ". " + e.note, go: { exp: e.id, label: "Çalışmayı aç" },
      opts: [1, 2, 3].map(function (s) { return A.status[s].label; }), correct: e.st - 1 };
  }
  var CONCEPTS = [];
  Object.keys(A.profiles || {}).forEach(function (tid) {
    var t = thById[tid];
    if (!t) return;
    (A.profiles[tid].concepts || []).forEach(function (c, i) { CONCEPTS.push({ id: tid + "-" + i, t: t, term: c[0], def: c[1] }); });
  });
  function qConcept() {
    var pool = CONCEPTS.filter(function (c) {
      var first = low(c.term).split(/[\s,(]+/)[0];
      return first.length > 3 && low(c.def).indexOf(first.slice(0, Math.max(4, first.length - 2))) < 0;
    });
    var c = pool[Math.floor(Math.random() * pool.length)];
    var sib = CONCEPTS.filter(function (o) { return o.t === c.t && o !== c; });
    return build({ kicker: "Kavram · " + who(c.t), prompt: "Bu tanım hangi kavrama aittir? (Kuram: " + tLabel(c.t) + ")", detail: c.def,
      explain: c.term + ": " + c.def, go: { theory: c.t.id, label: "Kuram profilini aç" } },
      c.term, pick(sib, 3).map(function (o) { return o.term; }));
  }

  /* --- Değerlendirme testiyle birlikte eklenen soru türleri --- */
  function qTheoryCore() {
    var pool = A.theories.filter(function (t) {
      var soyad = low(who(t)).split(" ").pop(), ilk = low(t.name).split(/[\s,(]+/)[0];
      return t.core && t.core.length > 60 && low(t.core).indexOf(soyad) < 0 && (ilk.length < 5 || low(t.core).indexOf(ilk.slice(0, 6)) < 0);
    });
    if (pool.length < 4) return qStageOwner();
    var t = pool[Math.floor(Math.random() * pool.length)];
    var same = pick(A.theories, 2, function (o) { return o === t || o.fam !== t.fam; });
    var other = pick(A.theories, 3 - same.length, function (o) { return o === t || same.indexOf(o) > -1; });
    return build({ kicker: "Hangi kuram?", prompt: "Aşağıdaki temel sav hangi kurama aittir?", detail: t.core,
      explain: tLabel(t) + ". " + (t.engine || ""), go: { theory: t.id, label: "Kuramı aç" } }, tLabel(t), same.concat(other).map(tLabel));
  }
  function qTheoryEvidence() {
    var pool = A.theories.filter(function (t) { return t.ev >= 1 && t.ev <= 4 && t.evNote; });
    var t = pool[Math.floor(Math.random() * pool.length)];
    return { kicker: "Kuramın kanıt düzeyi", prompt: "Atlas “" + tLabel(t) + "” kuramının kanıt düzeyini nasıl sınıflar?", detail: t.core,
      explain: A.evidenceScale[t.ev] + ". " + t.evNote, go: { theory: t.id, label: "Kuramı aç" },
      opts: [1, 2, 3, 4].map(function (i) { return A.evidenceScale[i]; }), correct: t.ev - 1 };
  }
  var FINDING = [["norm", "Beklenen"], ["izle", "İzlenmeli"], ["bayrak", "Kırmızı bayrak"]];
  function qCaseFinding() {
    /* üç düzey eşit olasılıkla sorulur */
    var want = Math.floor(Math.random() * FINDING.length), pool = [];
    (A.cases || []).forEach(function (c) { (c.findings || []).forEach(function (f) { if (f[1] === FINDING[want][0] && f[0] && f[2]) pool.push({ c: c, f: f }); }); });
    if (!pool.length) return qExpStatus();
    var x = pool[Math.floor(Math.random() * pool.length)];
    return { kicker: "Vaka bulgusu · " + x.c.ageLabel, prompt: "Bu vakada aşağıdaki bulgu nasıl değerlendirilir?", detail: x.c.ask + " Bulgu: " + x.f[0],
      explain: x.f[2], go: { "case": x.c.id, label: "Vakayı aç" }, opts: FINDING.map(function (l) { return l[1]; }), correct: want };
  }
  function qBrainRegion() {
    var Rg = ((A.brain && A.brain.regions) || []).filter(function (r) { return r.name && r.func; });
    if (Rg.length < 4) return qStageOwner();
    var r = Rg[Math.floor(Math.random() * Rg.length)];
    return build({ kicker: "Beyin bölgesi", prompt: "Aşağıdaki işlevler en çok hangi beyin bölgesiyle ilişkilendirilir?", detail: r.func,
      explain: r.name + ". " + String(r.clinic || "").replace(/<[^>]+>/g, ""), go: { region: r.id, label: "Beyin haritasında aç" } },
      r.name, pick(Rg, 3, function (o) { return o === r; }).map(function (o) { return o.name; }));
  }

  var MODES = [
    { id: "kuram", name: "Kuramlar ve evreler", desc: "Evre hangi kuramın, bu yaşta hangi evre?", gen: [qStageOwner, qAgeStage, qTheoryCore] },
    { id: "cdc", name: "CDC basamakları", desc: "0-5 yaş: hangi beceri hangi yaşta beklenir?", gen: [qCdc] },
    { id: "deney", name: "Deneyler ve kanıt", desc: "Bulgu hangi çalışmanın, kuramı destekler mi, kanıt ne kadar sağlam?", gen: [qExpWhich, qExpRelation, qExpStatus] },
    { id: "kavram", name: "Kavramlar", desc: CONCEPTS.length + " profil kavramı: tanımdan kavrama", gen: [qConcept] },
    { id: "klinik", name: "Klinik ve beyin", desc: "Vaka bulgusu beklenen mi, kırmızı bayrak mı; işlev hangi beyin bölgesinin?", gen: [qCaseFinding, qBrainRegion] },
    { id: "karisik", name: "Karışık", desc: "Bütün soru türlerinden " + N_SORU + " soru", gen: [qStageOwner, qAgeStage, qCdc, qExpWhich, qExpRelation, qExpStatus, qConcept, qTheoryCore, qCaseFinding, qBrainRegion] }
  ];
  /* Değerlendirme testi (view-exam.js) aynı üreticileri kullanır */
  A.quizGen = { stageOwner: qStageOwner, ageStage: qAgeStage, cdc: qCdc, expWhich: qExpWhich, expRelation: qExpRelation, expStatus: qExpStatus,
    concept: qConcept, theoryCore: qTheoryCore, theoryEvidence: qTheoryEvidence, caseFinding: qCaseFinding, brainRegion: qBrainRegion, shuffle: shuffle, goBtn: goBtn };
  function modeById(id) { return MODES.filter(function (m) { return m.id === id; })[0]; }

  /* ---------- test oturumu ---------- */
  var R = null; /* { mode, qs, i, right, answered } */
  function startQuiz(id) {
    var m = modeById(id), qs = [], seen = {};
    for (var guard = 0; qs.length < N_SORU && guard < 200; guard++) {
      var q = m.gen[(qs.length + guard) % m.gen.length]();
      var key = q.prompt + "|" + q.detail;
      if (seen[key] || q.opts.length < 2) continue;
      seen[key] = 1; qs.push(q);
    }
    R = { mode: id, qs: qs, i: 0, right: 0, answered: -1 };
    render();
    var el = document.getElementById("studyQuiz");
    if (el) el.scrollIntoView({ block: "start" });
  }
  function answer(k) {
    if (!R || R.answered > -1) return;
    var q = R.qs[R.i];
    R.answered = k;
    if (k === q.correct) R.right++;
    var st = S.quiz[R.mode] = S.quiz[R.mode] || { n: 0, c: 0, best: 0, rounds: 0 };
    st.n++; if (k === q.correct) st.c++;
    if (R.i === R.qs.length - 1) { st.rounds++; st.best = Math.max(st.best, R.right); }
    save();
    render();
    var nx = document.getElementById("studyNext");
    if (nx) nx.focus();
  }
  function goBtn(g) {
    if (!g) return "";
    var attr = g.theory ? 'data-theory="' + g.theory + '"' + (g.stage != null ? ' data-stage="' + g.stage + '"' : "") : g.exp ? 'data-exp="' + g.exp + '"' : g.age ? 'data-goage="' + g.age + '"' : g["case"] ? 'data-case="' + g["case"] + '"' : g.region ? 'data-region="' + g.region + '"' : "";
    return attr ? '<button type="button" class="linkish" ' + attr + ">" + esc(g.label) + " →</button>" : "";
  }
  function quizHtml() {
    if (!R) return "";
    var m = modeById(R.mode);
    if (R.i >= R.qs.length) {
      var st = S.quiz[R.mode] || { best: R.right };
      var ratio = R.right / R.qs.length;
      return '<section class="panel study-quiz" id="studyQuiz"><div class="panel-title">' + esc(m.name) + ' · sonuç</div><p class="study-score">' + R.right + " / " + R.qs.length + "</p><p>" +
        (ratio >= 0.8 ? "Çok iyi. Yanlış yaptığınız sorulardaki bağlantılardan ilgili sayfalara dönebilirsiniz." : ratio >= 0.5 ? "İyi. Soruların altındaki bağlantılarla ilgili kuram ve çalışmaları yeniden gözden geçirin." : "Bu konuyu atlasta okuduktan sonra yeniden deneyin; sorular her seferinde yeniden üretilir.") +
        "</p><p class=\"hint\">Bu türde en iyi sonucunuz: " + st.best + " / " + R.qs.length + '.</p><div class="study-actions"><button type="button" class="btn" data-quiz="' + R.mode + '">Yeniden başlat</button><button type="button" class="btn ghost" id="studyClose">Kapat</button></div></section>';
    }
    var q = R.qs[R.i], done = R.answered > -1;
    var opts = q.opts.map(function (o, k) {
      var cls = done ? (k === q.correct ? " ok" : k === R.answered ? " bad" : "") : "";
      return '<button type="button" class="study-opt' + cls + '" data-ans="' + k + '"' + (done ? " disabled" : "") + '><span class="so-l">' + "ABCD".charAt(k) + "</span><span>" + esc(o) + "</span></button>";
    }).join("");
    var fb = done ? '<div class="study-fb ' + (R.answered === q.correct ? "ok" : "bad") + '"><p><b>' + (R.answered === q.correct ? "Doğru." : "Doğru yanıt: " + esc(q.opts[q.correct]) + ".") + "</b> " + esc(q.explain) + "</p>" + goBtn(q.go) +
      '</div><div class="study-actions"><button type="button" class="btn" id="studyNext">' + (R.i + 1 < R.qs.length ? "Sonraki soru →" : "Sonucu gör") + "</button></div>" : "";
    return '<section class="panel study-quiz" id="studyQuiz"><div class="panel-title">' + esc(m.name) + " · soru " + (R.i + 1) + " / " + R.qs.length + '<span class="study-run">' + R.right + " doğru</span></div>" +
      '<p class="study-k">' + esc(q.kicker) + '</p><p class="study-q">' + esc(q.prompt) + "</p>" + (q.detail ? '<blockquote class="study-d">' + esc(q.detail) + "</blockquote>" : "") +
      '<div class="study-opts" role="group" aria-label="Seçenekler">' + opts + "</div>" + fb + "</section>";
  }

  /* ---------- kavram kartları ---------- */
  var CARD = { list: [], i: 0, flipped: false };
  function cardPool() { return CONCEPTS.filter(function (c) { return !S.cardSet || c.t.id === S.cardSet; }); }
  function dealCards() {
    var pool = cardPool();
    var unknown = shuffle(pool.filter(function (c) { return !S.cards[c.id]; }));
    CARD.list = unknown.length ? unknown : shuffle(pool);
    CARD.i = 0; CARD.flipped = false;
  }
  function cardsHtml() {
    var pool = cardPool();
    if (!CARD.list.length || CARD.list.some(function (c) { return pool.indexOf(c) < 0; })) dealCards();
    var known = pool.filter(function (c) { return S.cards[c.id]; }).length;
    var c = CARD.list[CARD.i % CARD.list.length];
    var sets = '<label class="sr" for="cardSet">Kuram seç</label><select id="cardSet"><option value="">Bütün profiller (' + CONCEPTS.length + ")</option>" +
      Object.keys(A.profiles).filter(function (id) { return thById[id]; }).sort(function (a, b) { return who(thById[a]).localeCompare(who(thById[b]), "tr"); }).map(function (id) {
        return '<option value="' + id + '"' + (S.cardSet === id ? " selected" : "") + ">" + esc(tLabel(thById[id])) + "</option>";
      }).join("") + "</select>";
    return '<section class="panel study-cards" id="studyCards"><div class="panel-title">Kavram kartları<span class="study-run">' + known + " / " + pool.length + " biliniyor</span></div>" +
      '<div class="study-cardbar">' + sets + '<button type="button" class="btn ghost" id="cardReset">Bilinenleri sıfırla</button></div>' +
      '<button type="button" class="study-card' + (CARD.flipped ? " flipped" : "") + '" id="cardFlip" style="--c:' + U.famColor(c.t.fam) + '" aria-live="polite">' +
      '<span class="sc-who">' + U.famIcon(c.t.fam) + esc(tLabel(c.t)) + "</span>" +
      (CARD.flipped ? '<span class="sc-term small">' + esc(c.term) + '</span><span class="sc-def">' + esc(c.def) + "</span>" : '<span class="sc-term">' + esc(c.term) + '</span><span class="sc-hint">Tanımı görmek için dokunun</span>') + "</button>" +
      '<div class="study-actions">' + (CARD.flipped ? '<button type="button" class="btn" data-card="1">Biliyorum</button><button type="button" class="btn ghost" data-card="0">Tekrar göster</button>' : "") +
      '<button type="button" class="btn ghost" data-card="skip">Sonraki kart →</button><button type="button" class="linkish" data-theory="' + c.t.id + '">Kuram profilini aç →</button></div></section>';
  }

  /* ---------- ilerleme ---------- */
  function progressHtml() {
    var nA = A.ages.filter(function (a) { return S.seen.age[a.id]; }).length;
    var nT = A.theories.filter(function (t) { return S.seen.theory[t.id]; }).length;
    var nC = (A.cases || []).filter(function (c) { return S.seen["case"][c.id]; }).length;
    var qn = 0, qc = 0;
    Object.keys(S.quiz).forEach(function (k) { qn += S.quiz[k].n || 0; qc += S.quiz[k].c || 0; });
    var known = CONCEPTS.filter(function (c) { return S.cards[c.id]; }).length;
    function box(label, val, total, sub) {
      var pct = total ? Math.round(100 * val / total) : 0;
      return '<div class="sp-box"><span class="sp-l">' + esc(label) + '</span><span class="sp-v">' + val + (total ? '<small> / ' + total + "</small>" : "") + "</span>" +
        (total ? '<span class="sp-bar"><i style="width:' + pct + '%"></i></span>' : "") + '<span class="sp-s">' + esc(sub) + "</span></div>";
    }
    return '<section class="panel study-progress"><div class="panel-title">İlerlemem</div><div class="sp-grid">' +
      box("Yaş dönemleri", nA, A.ages.length, "açılan dönem") + box("Kuramlar", nT, A.theories.length, "açılan kuram") +
      box("Vakalar", nC, (A.cases || []).length, "açılan vaka") + box("Kavram kartları", known, CONCEPTS.length, "bilinen kavram") +
      box("Sorular", qn, 0, qn ? "%" + Math.round(100 * qc / qn) + " doğru" : "henüz yanıtlanmadı") + "</div>" +
      '<p class="hint">İlerleme yalnızca bu tarayıcıda saklanır. <button type="button" class="linkish" id="studyWipe">İlerlemeyi sil</button></p></section>';
  }
  function nextUp() {
    var a = A.ages.filter(function (x) { return !S.seen.age[x.id]; })[0];
    var c = (A.cases || []).filter(function (x) { return !S.seen["case"][x.id]; })[0];
    var prof = Object.keys(A.profiles).filter(function (id) { return thById[id] && !S.seen.theory[id]; })[0];
    var items = [];
    if (a) items.push('<button type="button" class="study-next" data-goage="' + a.id + '"><span>Sıradaki yaş dönemi</span><b>' + esc(a.name) + "</b><small>" + esc(a.range) + "</small></button>");
    if (prof) items.push('<button type="button" class="study-next" data-theory="' + prof + '"><span>Okunmamış ayrıntılı profil</span><b>' + esc(tLabel(thById[prof])) + "</b><small>" + esc(thById[prof].years) + "</small></button>");
    if (c) items.push('<button type="button" class="study-next" data-case="' + c.id + '"><span>Açılmamış vaka</span><b>' + esc(c.title) + "</b><small>" + esc(c.ageLabel) + "</small></button>");
    return items.length ? '<div class="section-h"><h3>Sıradaki adım</h3><span>Henüz açmadıklarınızdan</span></div><div class="study-nexts">' + items.join("") + "</div>" : "";
  }

  function render() {
    if (!view) return;
    /* Değerlendirme testi sürerken ya da sonucu açıkken yalnızca test gösterilir */
    if (A.exam && A.exam.active()) { document.getElementById("studyWrap").innerHTML = '<div id="examSlot"></div>'; A.exam.mount(); return; }
    var modes = MODES.map(function (m) {
      var st = S.quiz[m.id];
      return '<button type="button" class="study-mode" data-quiz="' + m.id + '"' + (R && R.mode === m.id ? ' aria-current="true"' : "") + "><b>" + esc(m.name) + "</b><span>" + esc(m.desc) + "</span><small>" +
        (st && st.rounds ? "En iyi: " + st.best + " / " + N_SORU + " · " + st.rounds + " tur" : N_SORU + " soru") + "</small></button>";
    }).join("");
    document.getElementById("studyWrap").innerHTML = progressHtml() + '<div id="examSlot"></div>' + nextUp() +
      '<div class="section-h"><h3>Kendini sına</h3><span>Sorular atlasın verisinden her seferinde yeniden üretilir</span></div><div class="study-modes">' + modes + "</div>" +
      quizHtml() + '<div class="section-h"><h3>Kavram kartları</h3><span>Ayrıntılı profillerdeki temel kavramlar</span></div>' + cardsHtml();
    if (A.exam) A.exam.mount();
  }

  if (view) {
    view.addEventListener("click", function (e) {
      var t;
      if ((t = e.target.closest("[data-quiz]"))) startQuiz(t.dataset.quiz);
      else if ((t = e.target.closest("[data-ans]"))) answer(+t.dataset.ans);
      else if ((t = e.target.closest("#studyNext"))) { R.i++; R.answered = -1; render(); var q = document.getElementById("studyQuiz"); if (q) q.scrollIntoView({ block: "nearest" }); var f = view.querySelector(".study-opt, [data-quiz]"); if (f && R.i < R.qs.length) f.focus(); }
      else if ((t = e.target.closest("#studyClose"))) { R = null; render(); }
      else if ((t = e.target.closest("#cardFlip"))) { CARD.flipped = !CARD.flipped; render(); document.getElementById("cardFlip").focus(); }
      else if ((t = e.target.closest("[data-card]"))) {
        var c = CARD.list[CARD.i % CARD.list.length];
        if (t.dataset.card === "1") S.cards[c.id] = 1; else if (t.dataset.card === "0") delete S.cards[c.id];
        save(); CARD.i++; CARD.flipped = false;
        if (CARD.i >= CARD.list.length) dealCards();
        render(); document.getElementById("cardFlip").focus();
      }
      else if ((t = e.target.closest("#cardReset"))) { cardPool().forEach(function (c) { delete S.cards[c.id]; }); save(); dealCards(); render(); }
      else if ((t = e.target.closest("#studyWipe"))) { S = { seen: { age: {}, theory: {}, "case": {} }, quiz: {}, cards: {}, cardSet: S.cardSet }; R = null; save(); dealCards(); render(); }
      else if ((t = e.target.closest("[data-theory]"))) A.nav.theory(t.dataset.theory, t.dataset.stage != null ? +t.dataset.stage : null);
      else if ((t = e.target.closest("[data-exp]"))) A.nav.exp(t.dataset.exp);
      else if ((t = e.target.closest("[data-goage]"))) A.nav.age(t.dataset.goage);
      else if ((t = e.target.closest("[data-case]"))) A.nav["case"](t.dataset.case);
      else if ((t = e.target.closest("[data-region]"))) A.nav.brain(A.state.brainAge, t.dataset.region);
    });
    view.addEventListener("change", function (e) {
      if (e.target.id === "cardSet") { S.cardSet = e.target.value; save(); dealCards(); render(); }
    });
  }

  A.views.calis = { render: render, modes: MODES };
})();
