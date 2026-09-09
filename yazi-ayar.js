(function () {
  if (window.__yaziAyarKurulu) return;
  window.__yaziAyarKurulu = true;

  var TIPLER = [
    { k: "lora", ad: "Lora", css: "Lora, serif" },
    { k: "caveat", ad: "El yazısı", css: "Caveat, cursive" },
    { k: "georgia", ad: "Georgia", css: "Georgia, serif" },
    { k: "comic", ad: "Neşeli", css: "'Comic Sans MS', 'Chalkboard SE', cursive" },
    { k: "menlo", ad: "Menlo", css: "Menlo, Consolas, monospace" }
  ];
  var A_GENEL = "ajanda-yazi-genel";
  var A_ALAN = "ajanda-yazi-alanlar";
  var SEC = 'input[type="text"], input:not([type]), textarea, [contenteditable="true"]';

  function oku(a, y) { try { var v = localStorage.getItem(a); return v === null ? y : JSON.parse(v); } catch (e) { return y; } }
  function yaz(a, v) { try { localStorage.setItem(a, JSON.stringify(v)); } catch (e) {} }

  var genel = oku(A_GENEL, { p: 14, t: "lora" });
  var alanlar = oku(A_ALAN, {});
  if (!alanlar || typeof alanlar !== "object") alanlar = {};

  function tipBul(k) { for (var i = 0; i < TIPLER.length; i++) if (TIPLER[i].k === k) return TIPLER[i]; return TIPLER[0]; }

  var fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap";
  document.head.appendChild(fontLink);

  function anahtar(el) {
    var sf = el.closest("section.page") || el.closest("section") || document.body;
    var ad = sf.id || sf.getAttribute("data-label") || "sayfa";
    var liste = Array.prototype.slice.call(sf.querySelectorAll(SEC));
    return ad + "#" + liste.indexOf(el);
  }

  var hedef = null, kapsam = "alan";

  function ayarAl(el) {
    if (!el) return genel;
    var a = alanlar[anahtar(el)];
    return a ? { p: a.p || genel.p, t: a.t || genel.t } : genel;
  }

  var bekle = null;
  function uygulaHepsi() {
    var alan = document.querySelectorAll(SEC);
    for (var i = 0; i < alan.length; i++) {
      var el = alan[i];
      if (el.closest("#__yazi-ayar-kok")) continue;
      var s = ayarAl(el);
      var t = tipBul(s.t);
      el.style.setProperty("font-family", t.css, "important");
      el.style.setProperty("font-size", s.p + "px", "important");
    }
    panelYenile();
  }
  function uygulaGecikmeli() {
    if (bekle) return;
    bekle = setTimeout(function () { bekle = null; uygulaHepsi(); }, 60);
  }

  var etiket = null, puntoDeger = null, kaydir = null, kapsamDugmeleri = [], tipDugmeleri = [], hedefAd = null;

  function panelYenile() {
    if (!etiket) return;
    var s = kapsam === "alan" ? ayarAl(hedef) : genel;
    var t = tipBul(s.t);
    etiket.textContent = s.p + " pt · " + t.ad;
    puntoDeger.textContent = s.p + " pt";
    if (kaydir && document.activeElement !== kaydir) kaydir.value = String(s.p);
    hedefAd.textContent = kapsam === "tum"
      ? "değişiklik tüm alanlara uygulanır"
      : (hedef ? "seçili alan" : "bir yazı alanına dokun");
    tipDugmeleri.forEach(function (d) {
      var sec = d.getAttribute("data-k") === s.t;
      d.style.background = sec ? "#f6f2ec" : "#fff";
      d.style.borderColor = sec ? "#c4885b" : "#ece9e5";
      d.style.color = sec ? "#8a5a33" : "#57534f";
    });
    kapsamDugmeleri.forEach(function (d) {
      var sec = d.getAttribute("data-k") === kapsam;
      d.style.background = sec ? "#201e1d" : "#fff";
      d.style.color = sec ? "#fffdfa" : "#8d8a87";
      d.style.borderColor = sec ? "#201e1d" : "#ece9e5";
    });
  }

  function degistir(alanAdi, deger) {
    if (kapsam === "tum") {
      genel[alanAdi] = deger;
      yaz(A_GENEL, genel);
      alanlar = {};
      yaz(A_ALAN, alanlar);
    } else {
      if (!hedef) return;
      var k = anahtar(hedef);
      var mev = alanlar[k] || { p: genel.p, t: genel.t };
      mev[alanAdi] = deger;
      alanlar[k] = mev;
      yaz(A_ALAN, alanlar);
    }
    uygulaHepsi();
  }

  function kur() {
    if (!document.body || document.getElementById("__yazi-ayar-kok")) return;

    var kok = document.createElement("div");
    kok.id = "__yazi-ayar-kok";
    kok.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:2147483000;font-family:Lora,serif;display:flex;flex-direction:column;align-items:flex-end;gap:8px";

    var panel = document.createElement("div");
    panel.style.cssText = "display:none;flex-direction:column;gap:11px;width:232px;box-sizing:border-box;padding:14px 15px;background:#fffdfa;border:1px solid #e6e2dc;border-radius:12px;box-shadow:0 8px 26px rgba(32,30,29,0.14)";

    var kapsamKutu = document.createElement("div");
    kapsamKutu.style.cssText = "display:flex;gap:5px";
    kapsamDugmeleri = [{ k: "alan", ad: "Seçili alan" }, { k: "tum", ad: "Tüm sayfa" }].map(function (o) {
      var d = document.createElement("button");
      d.type = "button"; d.setAttribute("data-k", o.k); d.textContent = o.ad;
      d.style.cssText = "flex:1;padding:5px 4px;border:1px solid #ece9e5;border-radius:8px;background:#fff;cursor:pointer;font:400 11px Lora,serif";
      d.addEventListener("click", function () { kapsam = o.k; panelYenile(); });
      kapsamKutu.appendChild(d);
      return d;
    });

    hedefAd = document.createElement("div");
    hedefAd.style.cssText = "font:400 10px Lora,serif;letter-spacing:0.06em;color:#a9a6a3";

    var bas = document.createElement("div");
    bas.style.cssText = "display:flex;align-items:baseline;justify-content:space-between";
    var basAd = document.createElement("span");
    basAd.textContent = "PUNTO";
    basAd.style.cssText = "font:400 10px Lora,serif;letter-spacing:0.14em;color:#a9a6a3";
    puntoDeger = document.createElement("span");
    puntoDeger.style.cssText = "font:500 13px Lora,serif;color:#201e1d";
    bas.appendChild(basAd); bas.appendChild(puntoDeger);

    kaydir = document.createElement("input");
    kaydir.type = "range"; kaydir.min = "10"; kaydir.max = "22"; kaydir.step = "1";
    kaydir.style.cssText = "width:100%;accent-color:#c4885b";
    kaydir.addEventListener("input", function () { degistir("p", parseInt(kaydir.value, 10) || 14); });

    var tipAd = document.createElement("span");
    tipAd.textContent = "YAZI TİPİ";
    tipAd.style.cssText = "font:400 10px Lora,serif;letter-spacing:0.14em;color:#a9a6a3";

    var tipKutu = document.createElement("div");
    tipKutu.style.cssText = "display:flex;flex-direction:column;gap:5px";
    tipDugmeleri = TIPLER.map(function (t) {
      var d = document.createElement("button");
      d.type = "button"; d.setAttribute("data-k", t.k); d.textContent = t.ad;
      d.style.cssText = "text-align:left;padding:6px 10px;border:1px solid #ece9e5;border-radius:8px;background:#fff;cursor:pointer;font:400 14px " + t.css;
      d.addEventListener("click", function () { degistir("t", t.k); });
      tipKutu.appendChild(d);
      return d;
    });

    var sifirla = document.createElement("button");
    sifirla.type = "button";
    sifirla.textContent = "Bu alanı sayfa ayarına döndür";
    sifirla.style.cssText = "padding:5px 4px;border:none;background:none;cursor:pointer;font:400 10px Lora,serif;letter-spacing:0.04em;color:#c4885b;text-align:left";
    sifirla.addEventListener("click", function () {
      if (!hedef) return;
      delete alanlar[anahtar(hedef)];
      yaz(A_ALAN, alanlar);
      uygulaHepsi();
    });

    panel.appendChild(kapsamKutu);
    panel.appendChild(hedefAd);
    panel.appendChild(bas);
    panel.appendChild(kaydir);
    panel.appendChild(tipAd);
    panel.appendChild(tipKutu);
    panel.appendChild(sifirla);

    var dugme = document.createElement("button");
    dugme.type = "button";
    dugme.style.cssText = "display:flex;align-items:center;gap:7px;padding:7px 13px;border:1px solid #e6e2dc;border-radius:20px;background:#fffdfa;box-shadow:0 3px 12px rgba(32,30,29,0.12);cursor:pointer";
    var ikon = document.createElement("span");
    ikon.textContent = "Aa";
    ikon.style.cssText = "font:500 15px Lora,serif;color:#201e1d";
    etiket = document.createElement("span");
    etiket.style.cssText = "font:400 11px Lora,serif;letter-spacing:0.04em;color:#8d8a87";
    dugme.appendChild(ikon); dugme.appendChild(etiket);
    dugme.addEventListener("mousedown", function (e) { e.preventDefault(); });
    dugme.addEventListener("click", function () {
      panel.style.display = panel.style.display === "flex" ? "none" : "flex";
      panelYenile();
    });

    kok.appendChild(panel);
    kok.appendChild(dugme);
    document.body.appendChild(kok);

    document.addEventListener("focusin", function (e) {
      var el = e.target;
      if (el && el.closest && !el.closest("#__yazi-ayar-kok") && el.matches && el.matches(SEC)) {
        hedef = el;
        kapsam = "alan";
        el.style.setProperty("outline", "1px dashed #d9b48f");
        panelYenile();
      }
    });
    document.addEventListener("focusout", function (e) {
      if (e.target && e.target.style) e.target.style.removeProperty("outline");
    });

    var izle = new MutationObserver(uygulaGecikmeli);
    izle.observe(document.body, { childList: true, subtree: true });

    var yazdirStil = document.createElement("style");
    yazdirStil.textContent = "@media print { #__yazi-ayar-kok { display:none !important; } }";
    document.head.appendChild(yazdirStil);

    uygulaHepsi();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
  else kur();
})();
