/* Okuma araçları: yazı boyutu denetimi ve atlas içi arama. Uyarlamada eklendi (Usta, 2026).
   Arama dizini atlasın verisinden kurulur: yaş dönemleri, kuramlar, evreler, kavramlar, çalışmalar, vakalar,
   beyin bölgeleri, Türkiye notları ve kısaltmalar. */
(function () {
  "use strict";
  var A = window.ATLAS, U = A.U, esc = U.esc, thById = U.thById;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- yazı boyutu ---------- */
  var SIZES = ["s", "m", "l", "xl"], NAMES = { s: "Küçük", m: "Olağan", l: "Büyük", xl: "Çok büyük" };
  function curSize() { var v = document.documentElement.getAttribute("data-fs"); return SIZES.indexOf(v) > -1 ? v : "m"; }
  function setSize(v) {
    if (v === "m") document.documentElement.removeAttribute("data-fs"); else document.documentElement.setAttribute("data-fs", v);
    try { if (v === "m") localStorage.removeItem("ruhsal-atlas-yazi"); else localStorage.setItem("ruhsal-atlas-yazi", v); } catch (e) { /* yok say */ }
    paintSize();
  }
  function paintSize() {
    var i = SIZES.indexOf(curSize());
    var dn = document.querySelector('[data-fs-step="-1"]'), up = document.querySelector('[data-fs-step="1"]');
    if (dn) dn.disabled = i === 0;
    if (up) up.disabled = i === SIZES.length - 1;
    var out = $("fsOut");
    if (out) out.textContent = "Yazı boyutu: " + NAMES[curSize()];
    setTimeout(tabsState, 0);
  }
  document.addEventListener("click", function (e) {
    /* küçük ekranda tek düğme: boyutlar sırayla dolaşılır */
    if (e.target.closest("[data-fs-cycle]")) { setSize(SIZES[(SIZES.indexOf(curSize()) + 1) % SIZES.length]); return; }
    var b = e.target.closest("[data-fs-step]");
    if (!b) return;
    var i = SIZES.indexOf(curSize()) + (+b.dataset.fsStep);
    if (i >= 0 && i < SIZES.length) setSize(SIZES[i]);
  });
  paintSize();

  /* ---------- sekme şeridi: seçili sekme görünür kalır, taşma varsa kenarda soluklaşma ---------- */
  var tabs = document.querySelector(".tabs");
  function tabsState() {
    if (!tabs) return;
    var more = tabs.scrollWidth - tabs.clientWidth - tabs.scrollLeft > 4;
    tabs.classList.toggle("more", more);
    tabs.classList.toggle("less", tabs.scrollLeft > 4);
  }
  function tabIntoView() {
    if (!tabs) return;
    var cur = tabs.querySelector('.tab[aria-selected="true"]');
    if (cur) {
      var a = cur.offsetLeft - tabs.offsetLeft, b = a + cur.offsetWidth;
      if (a < tabs.scrollLeft + 24) tabs.scrollLeft = Math.max(0, a - 24);
      else if (b > tabs.scrollLeft + tabs.clientWidth - 24) tabs.scrollLeft = b - tabs.clientWidth + 24;
    }
    tabsState();
  }
  if (tabs) {
    tabs.addEventListener("scroll", tabsState, { passive: true });
    window.addEventListener("resize", tabsState);
    window.addEventListener("hashchange", function () { setTimeout(tabIntoView, 0); });
    setTimeout(tabIntoView, 0);
  }

  /* ---------- içeriğe geç ---------- */
  var skip = $("skipMain");
  if (skip) skip.addEventListener("click", function () { var m = document.querySelector("main"); m.setAttribute("tabindex", "-1"); m.focus(); m.scrollIntoView({ block: "start" }); });

  /* ---------- arama dizini ---------- */
  function fold(s) {
    return String(s == null ? "" : s).toLocaleLowerCase("tr").replace(/[çğıöşüâîû]/g, function (c) { return { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" }[c]; });
  }
  var INDEX = null;
  var ORDER = { "Kuram": 0, "Evre": 1, "Kavram": 2, "Yaş dönemi": 3, "Vaka": 4, "Çalışma": 5, "Beyin": 6, "Kısaltma": 7, "Türkiye": 8 };
  function add(type, title, sub, text, go) {
    INDEX.push({ type: type, title: title, sub: sub || "", text: text || "", ft: fold(title), fs: fold(sub), fb: fold(text), go: go });
  }
  function afterNav(fn) { setTimeout(fn, 160); }
  function build() {
    INDEX = [];
    A.theories.forEach(function (t) {
      add("Kuram", t.name, t.who + " · " + t.years, t.core, function () { A.nav.theory(t.id); });
      t.stages.forEach(function (s, i) {
        add("Evre", s.name, U.famById[t.fam] ? t.who.split(/ ve |;|,/)[0] + " · " + U.fmtRange(s.from, s.to) : "", s.task + " " + (s.ms || []).join(" "), function () { A.nav.theory(t.id, i); });
      });
    });
    Object.keys(A.profiles || {}).forEach(function (tid) {
      var t = thById[tid];
      if (!t) return;
      (A.profiles[tid].concepts || []).forEach(function (c) {
        add("Kavram", c[0], t.who.split(/ ve |;|,/)[0] + ": " + t.name, c[1], function () {
          A.nav.theory(tid);
          afterNav(function () { var el = $("ts-kavramlar"); if (el) el.scrollIntoView({ block: "start" }); });
        });
      });
    });
    A.ages.forEach(function (a) { add("Yaş dönemi", a.name, a.range, a.gist + " " + (a.flags || []).join(" "), function () { A.nav.age(a.id); }); });
    (A.cases || []).forEach(function (c) { add("Vaka", c.title, c.ageLabel + " · " + c.tags.join(", "), c.ask, function () { A.nav["case"](c.id); }); });
    A.experiments.forEach(function (e) { add("Çalışma", e.title, e.who + " · " + e.year, e.find + " " + e.method, function () { A.nav.exp(e.id); }); });
    A.brain.regions.forEach(function (r) { add("Beyin", r.name, r.short || "", r.func || "", function () { A.nav.brain(A.state.brainAge, r.id); }); });
    (A.abbr || []).forEach(function (g) {
      g.items.forEach(function (x) {
        add("Kısaltma", x[0], x[1], x[2] || "", function () {
          location.hash = "kaynakca";
          afterNav(function () { var el = $("kisaltmalar"); if (el) { el.open = true; el.scrollIntoView({ block: "start" }); } });
        });
      });
    });
    var seenTr = {};
    Object.keys(A.trNotes || {}).forEach(function (aid) {
      A.trNotes[aid].forEach(function (n) {
        if (seenTr[n[0]]) return;
        seenTr[n[0]] = 1;
        add("Türkiye", n[0], "Türkiye notu", n[1], function () {
          A.nav.age(aid);
          afterNav(function () { var el = document.querySelector(".trp"); if (el) el.scrollIntoView({ block: "start" }); });
        });
      });
    });
  }
  function search(q) {
    var toks = fold(q).split(/\s+/).filter(function (t) { return t.length > 1 || /\d/.test(t); });
    if (!toks.length) return [];
    var fq = fold(q).trim();
    var out = [];
    INDEX.forEach(function (it) {
      var score = 0;
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i], p = it.ft.indexOf(t);
        if (p === 0) score += 100;
        else if (p > 0 && /[\s\-:(/'’“"]/.test(it.ft.charAt(p - 1))) score += 60;
        else if (p > 0) score += 35;
        else if (it.fs.indexOf(t) > -1) score += it.type === "Kuram" ? 80 : 15;
        else if (it.fb.indexOf(t) > -1) score += 5;
        else return;
      }
      if (it.ft === fq) score += 200;
      out.push({ it: it, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score || ORDER[a.it.type] - ORDER[b.it.type] || a.it.title.length - b.it.title.length; });
    return out.slice(0, 40).map(function (x) { return x.it; });
  }
  function snippet(it, q) {
    var toks = fold(q).split(/\s+/).filter(Boolean), p = -1;
    for (var i = 0; i < toks.length && p < 0; i++) p = it.fb.indexOf(toks[i]);
    if (p < 0 || it.ft.indexOf(toks[0]) > -1) return it.text.length > 150 ? it.text.slice(0, 150).replace(/\s+\S*$/, "") + "…" : it.text;
    var a = Math.max(0, p - 60), b = Math.min(it.text.length, p + 100), s = it.text.slice(a, b);
    if (a > 0) s = "…" + s.replace(/^\S*\s/, "");
    if (b < it.text.length) s = s.replace(/\s+\S*$/, "") + "…";
    return s;
  }

  /* ---------- arama penceresi ---------- */
  var box = $("search"), input = $("searchInput"), list = $("searchResults"), results = [], sel = 0, lastFocus = null;
  function paint() {
    var q = input.value.trim();
    results = q.length > 1 ? search(q) : [];
    sel = 0;
    if (q.length < 2) { list.innerHTML = '<p class="sb-empty">En az iki harf yazın. Örnek: <b>bağlanma</b>, <b>moratoryum</b>, <b>18 ay</b>, <b>RKÇ</b>, <b>Kağıtçıbaşı</b>.</p>'; return; }
    if (!results.length) { list.innerHTML = '<p class="sb-empty">“' + esc(q) + '” için sonuç bulunamadı. Daha kısa bir sözcük deneyin.</p>'; return; }
    list.innerHTML = results.map(function (it, i) {
      return '<button type="button" class="sb-item" role="option" data-i="' + i + '" aria-selected="' + (i === 0) + '"><span class="sb-type sb-' + ORDER[it.type] + '">' + esc(it.type) + "</span>" +
        '<span class="sb-main"><b>' + esc(it.title) + "</b>" + (it.sub ? '<span class="sb-sub">' + esc(it.sub) + "</span>" : "") + '<span class="sb-snip">' + esc(snippet(it, q)) + "</span></span></button>";
    }).join("");
  }
  function mark() {
    Array.prototype.forEach.call(list.querySelectorAll(".sb-item"), function (el, i) {
      el.setAttribute("aria-selected", String(i === sel));
      if (i === sel) el.scrollIntoView({ block: "nearest" });
    });
  }
  function open() {
    if (!INDEX) build();
    lastFocus = document.activeElement;
    box.hidden = false;
    document.documentElement.classList.add("search-open");
    input.value = ""; paint(); input.focus();
  }
  function close(restore) {
    box.hidden = true;
    document.documentElement.classList.remove("search-open");
    if (restore && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function choose(i) {
    var it = results[i];
    if (!it) return;
    close(false);
    it.go();
  }
  if (box) {
    $("searchOpen").addEventListener("click", open);
    input.addEventListener("input", paint);
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".sb-item");
      if (b) choose(+b.dataset.i);
      else if (e.target === box || e.target.closest("#searchClose")) close(true);
    });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(true); }
      else if (e.key === "ArrowDown") { e.preventDefault(); if (results.length) { sel = (sel + 1) % results.length; mark(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (results.length) { sel = (sel - 1 + results.length) % results.length; mark(); } }
      else if (e.key === "Enter" && e.target === input) { e.preventDefault(); choose(sel); }
      else if (e.key === "Tab") {
        /* odak pencerenin içinde kalır */
        var f = box.querySelectorAll("input, button");
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    document.addEventListener("keydown", function (e) {
      if (!box.hidden) return;
      var t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
      var deck = $("deck");
      if (deck && !deck.hidden) return;
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) { e.preventDefault(); open(); }
    });
  }
  A.search = { open: open, query: function (q) { if (!INDEX) build(); return search(q); } };
})();
