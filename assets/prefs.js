/* Okuma ayarı (yazı boyutu): sayfa çizilmeden önce uygulanır. Uyarlamada eklendi (Usta, 2026). */
(function () {
  try {
    var fs = localStorage.getItem("ruhsal-atlas-yazi");
    if (fs === "s" || fs === "l" || fs === "xl") document.documentElement.setAttribute("data-fs", fs);
  } catch (e) { /* depolama yoksa varsayılan boyut */ }
})();
