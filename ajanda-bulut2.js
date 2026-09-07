/* Ajanda bulut eşitleme — Supabase üzerinden, tüm sayfalarda ortak.
   Veri localStorage["ajanda-v3"] içinde; bu katman onu okuyup yazar,
   sayfaların kendi mantığına hiç dokunmaz. */
(function () {
  if (window.__ajandaBulut) return;
  window.__ajandaBulut = true;

  var URL_ = "https://miciwnnylpaevizggzwy.supabase.co";


  var KEY_ = "sb_publishable_IeUGf69i6Ee9ndXtT5pJjA_TLn88T0d";
  var VERI = "ajanda-v3";
  var TS = "ajanda-v3-ts";

  var sb = null, kul = null, durum = "yukleniyor", zamanlayici = null, sonGonderilen = null, sonHata = null;

  function ts() { return Number(window.localStorage.getItem(TS) || 0); }
  function tsYaz(v) { window.localStorage.setItem(TS, String(v)); }
  function ham() { return window.localStorage.getItem(VERI) || "{}"; }

  /* ---- arayüz: sağ altta küçük bir hap ---- */
  var hap, panel;
  function kurArayuz() {
    hap = document.createElement("div");
    hap.setAttribute("style", "position:fixed;right:16px;bottom:62px;z-index:2147483000;display:flex;align-items:center;gap:7px;padding:7px 14px;border-radius:18px;background:rgba(253,252,250,0.96);border:1px solid #d8d3cc;box-shadow:0 2px 10px rgba(32,30,29,0.14);font:400 12px Lora,Georgia,serif;color:#4a4744;cursor:pointer;user-select:none");
    hap.onclick = panelAc;
    document.body.appendChild(hap);
    ciz();
  }

  function ciz() {
    if (!hap) return;
    var renk = { yukleniyor: "#cfccc9", giris: "#d9a273", esitlendi: "#8fae9b", gonderiliyor: "#d9c079", hata: "#c98d97" }[durum] || "#cfccc9";
    var yazi = { yukleniyor: "bağlanıyor", giris: "giriş yap", esitlendi: "eşitlendi", gonderiliyor: "eşitleniyor", hata: "bağlanamadı" }[durum] || "";
    hap.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:' + renk + '"></span><span>' + yazi + '</span>';
  }

  function panelKapat() { if (panel) { panel.remove(); panel = null; } }
  window.__ajandaKapat = panelKapat;

  function panelAc() {
    if (panel) { panelKapat(); return; }
    panel = document.createElement("div");
    panel.setAttribute("style", "position:fixed;right:16px;bottom:106px;z-index:2147483000;width:296px;padding:20px;border-radius:12px;background:#fdfcfa;border:1px solid #d8d3cc;box-shadow:0 8px 30px rgba(32,30,29,0.22);font-family:Lora,Georgia,serif;color:#201e1d");
    document.body.appendChild(panel);
    kul ? panelHesap() : panelGiris();
  }

  function baslik(metin) {
    return '<div onclick="window.__ajandaKapat()" style="position:absolute;right:12px;top:8px;font:400 20px Lora,serif;color:#a9a6a3;cursor:pointer;line-height:1">×</div>' +
      '<div style="font:400 11px Lora,serif;letter-spacing:0.14em;color:#8d8a87;padding-bottom:12px">' + metin + '</div>';
  }
  var GIRDI = "width:100%;box-sizing:border-box;padding:9px 11px;border:1px solid #d8d3cc;border-radius:6px;font:400 14px Lora,serif;color:#201e1d;outline:none;background:#fbfaf8";
  var DUGME = "display:block;width:100%;box-sizing:border-box;margin-top:10px;padding:9px 0;border:1px solid #b8b4b0;border-radius:16px;background:#f4efe3;font:400 13px Lora,serif;color:#3a3128;cursor:pointer;text-align:center";

  function panelGiris() {
    panel.innerHTML = baslik("AJANDANI EŞİTLE") +
      '<div style="font:400 13px/1.5 Lora,serif;color:#4a4744;padding-bottom:14px">E-postanı yaz, sana altı haneli bir kod göndereyim. Şifre gerekmiyor.</div>' +
      '<input id="ab-mail" type="email" placeholder="e-posta" style="' + GIRDI + '" />' +
      '<div id="ab-btn" style="' + DUGME + '">Kod gönder</div>' +
      '<div id="ab-not" style="font:400 12px/1.45 Lora,serif;color:#8d8a87;padding-top:10px"></div>';
    panel.querySelector("#ab-btn").onclick = function () {
      var mail = (panel.querySelector("#ab-mail").value || "").trim();
      if (!mail) return;
      var not = panel.querySelector("#ab-not");
      not.textContent = "gönderiliyor…";
      sb.auth.signInWithOtp({ email: mail, options: { shouldCreateUser: true, emailRedirectTo: location.href.split("#")[0].split("?")[0] } }).then(function (r) {
        if (r.error) { not.textContent = "olmadı: " + r.error.message; return; }
        panelKod(mail);
      });
    };
  }

  function panelKod(mail) {
    panel.innerHTML = baslik("KOD") +
      '<div style="font:400 13px/1.5 Lora,serif;color:#4a4744;padding-bottom:14px">' + mail + ' adresine mail gitti. Maildeki bağlantıya dokun. Bağlantı Safari\'de açılıp burada giriş olmazsa: maildeki bağlantıyı <b>kopyala</b> ve aşağıya yapıştır. Altı haneli kod geldiyse onu da yazabilirsin.</div>' +
      '<input id="ab-kod" type="text" placeholder="kod ya da bağlantı" style="' + GIRDI + ';text-align:center" />' +
      '<div id="ab-btn" style="' + DUGME + '">Gir</div>' +
      '<div id="ab-not" style="font:400 12px/1.45 Lora,serif;color:#8d8a87;padding-top:10px"></div>';
    panel.querySelector("#ab-btn").onclick = function () {
      var kod = (panel.querySelector("#ab-kod").value || "").trim();
      var not = panel.querySelector("#ab-not");
      if (!kod) { not.textContent = "kod ya da bağlantı yaz"; return; }
      not.textContent = "bakılıyor…";

      if (kod.indexOf("http") === 0 || kod.indexOf("access_token") >= 0 || kod.indexOf("token_hash") >= 0) {
        var ham = kod.replace(/^[^#?]*/, "");
        var p = new URLSearchParams(ham.replace(/^[#?]/, ""));
        var at = p.get("access_token"), rt = p.get("refresh_token"), th = p.get("token_hash");
        var tamam = function (r) {
          if (r.error) { not.textContent = "bağlantı tutmadı: " + r.error.message; return; }
          kul = (r.data.session && r.data.session.user) || r.data.user;
          panelKapat();
          ilkEsitle();
        };
        if (at && rt) { sb.auth.setSession({ access_token: at, refresh_token: rt }).then(tamam); return; }
        if (th) { sb.auth.verifyOtp({ token_hash: th, type: "email" }).then(tamam); return; }
        not.textContent = "bağlantıda anahtar bulunamadı — mailden tam adresi kopyaladığından emin ol";
        return;
      }

      sb.auth.verifyOtp({ email: mail, token: kod, type: "email" }).then(function (r) {
        if (r.error) { not.textContent = "kod tutmadı: " + r.error.message; return; }
        kul = r.data.user;
        panelKapat();
        ilkEsitle();
      });
    };
  }

  function panelHesap() {
    var t = ts();
    panel.innerHTML = baslik("EŞİTLEME") +
      '<div style="font:400 14px Lora,serif;color:#201e1d;padding-bottom:4px">' + (kul.email || "") + '</div>' +
      '<div style="font:400 12px Lora,serif;color:#8d8a87">' + (t ? "son kayıt " + new Date(t).toLocaleString("tr-TR") : "henüz kayıt yok") + '</div>' +
      (sonHata ? '<div style="font:400 11px/1.4 Lora,serif;color:#b4564f;padding-top:8px">' + sonHata + '</div>' : '') +
      '<div id="ab-gonder" style="' + DUGME + '">Buluta gönder</div>' +
      '<div id="ab-cek" style="' + DUGME + '">Buluttan getir</div>' +
      '<div id="ab-cik" style="' + DUGME + ';background:#fbfaf8;color:#8d8a87">Çıkış yap</div>' +
      '<div id="ab-not" style="font:400 12px/1.45 Lora,serif;color:#8d8a87;padding-top:10px"></div>';
    panel.querySelector("#ab-gonder").onclick = function () {
      panel.querySelector("#ab-not").textContent = "gönderiliyor…";
      sonGonderilen = null;
      gonder();
      setTimeout(function () { if (panel && kul) panelHesap(); }, 900);
    };
    panel.querySelector("#ab-cek").onclick = function () {
      panel.querySelector("#ab-not").textContent = "getiriliyor…";
      cek(true);
    };
    panel.querySelector("#ab-cik").onclick = function () {
      sb.auth.signOut().then(function () {
        kul = null; durum = "giris"; ciz(); panelKapat();
      });
    };
  }

  /* ---- eşitleme ---- */
  function cek(zorla) {
    return sb.from("ajanda").select("veri,guncel").eq("id", kul.id).maybeSingle().then(function (r) {
      if (r.error) { durum = "hata"; sonHata = r.error.message; ciz(); if (panel && kul) panelHesap(); return; }
      if (!r.data) { gonder(); return; }
      var uzakTs = new Date(r.data.guncel).getTime();
      if (zorla || uzakTs > ts() + 1500) {
        var yeni = JSON.stringify(r.data.veri || {});
        if (yeni !== ham()) {
          window.localStorage.setItem(VERI, yeni);
          tsYaz(uzakTs);
          window.location.reload();
          return;
        }
        tsYaz(uzakTs);
      }
      durum = "esitlendi"; ciz();
      if (panel && kul) panelHesap();
    });
  }

  function gonder() {
    var veri = ham();
    if (veri === sonGonderilen) { durum = "esitlendi"; ciz(); return; }
    durum = "gonderiliyor"; ciz();
    var simdi = new Date();
    sb.from("ajanda").upsert({ id: kul.id, veri: JSON.parse(veri), guncel: simdi.toISOString() }).then(function (r) {
      if (r.error) { durum = "hata"; sonHata = r.error.message; ciz(); if (panel && kul) panelHesap(); return; }
      sonGonderilen = veri;
      sonHata = null;
      tsYaz(simdi.getTime());
      durum = "esitlendi"; ciz();
      if (panel && kul) panelHesap();
    });
  }

  function gonderSonra() {
    if (!kul) return;
    clearTimeout(zamanlayici);
    zamanlayici = setTimeout(gonder, 1400);
  }

  function ilkEsitle() {
    durum = "esitlendi"; ciz();
    cek(false).then(function () {
      if (ham() !== "{}") gonder();
    });
    if (!window.__abDongu) {
      window.__abDongu = true;
      setInterval(function () { if (kul && !document.hidden) cek(false); }, 12000);
      document.addEventListener("visibilitychange", function () { if (!document.hidden && kul) cek(false); });
      window.addEventListener("focus", function () { if (kul) cek(false); });
    }
  }

  /* yerel yazmaları yakala */
  var asilSet = window.localStorage.setItem.bind(window.localStorage);
  window.localStorage.setItem = function (k, v) {
    asilSet(k, v);
    if (k === VERI) { tsYaz(Date.now()); gonderSonra(); }
  };

  /* ---- başlat ---- */
  function basla() {
    kurArayuz();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
    s.onerror = function () { durum = "hata"; ciz(); };
    s.onload = function () {
      sb = window.supabase.createClient(URL_, KEY_, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "implicit" } });
      sb.auth.onAuthStateChange(function (olay, oturum) {
        var yeni = oturum ? oturum.user : null;
        if (yeni && (!kul || kul.id !== yeni.id)) {
          kul = yeni;
          if (location.hash.indexOf("access_token") >= 0) history.replaceState(null, "", location.pathname);
          ilkEsitle();
        }
      });
      sb.auth.getSession().then(function (r) {
        kul = r.data && r.data.session ? r.data.session.user : null;
        if (kul) ilkEsitle();
        else { durum = "giris"; ciz(); }
      });
    };
    document.head.appendChild(s);
  }

  if (document.body) basla();
  else document.addEventListener("DOMContentLoaded", basla);
})();
