(function(){if(window.matchMedia&&window.matchMedia("(max-width:520px)").matches)return;
(function () {
  if (window.__rehberKurulu) return;
  window.__rehberKurulu = true;

  var yzB = "Lora,serif";
  var ANA = "Ajanda-dijital.dc.html";

  function svg(ic, renk, boy) {
    return '<svg viewBox="0 0 24 24" width="' + (boy || 20) + '" height="' + (boy || 20) + '" fill="none" stroke="' + (renk || "#8d8a87") + '" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' + ic + "</svg>";
  }
  var IK = {
    gezinmek: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5M13 4v5M18 4v5"/>',
    planlamak: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h4"/>',
    isaretlemek: '<path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
    takip: '<path d="M4 19V6M4 19h16"/><path d="M8 15l3-4 3 3 4-6"/>',
    notlar: '<path d="M5 4h9l5 5v11H5z"/><path d="M14 4v5h5"/><path d="M8 13h7M8 16h5"/>',
    suslemek: '<path d="M12 3l2.2 5.2 5.8.5-4.4 3.8 1.3 5.5L12 15.2 7.1 18l1.3-5.5L4 8.7l5.8-.5z"/>',
    ayarlar: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
    sss: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 1 1 3.4 2.5c-.6.2-.9.7-.9 1.3v.5"/><path d="M12 17h.01"/>'
  };

  function sf() {
    var y = (location.pathname.split("/").pop() || "").toLowerCase();
    if (y.indexOf("hafta") > -1 || y.indexOf("donem") > -1) return "planlamak";
    if (y.indexOf("gun-") > -1) return "planlamak";
    if (y.indexOf("takip") > -1) return "takip";
    if (y.indexOf("notlar") > -1) return "notlar";
    return "gezinmek";
  }

  var SEKME = [
    ["#efe7db", "Bugün", "Nerede olursan ol ilk sayfaya döner"],
    ["#8fb4d4", "Yıl", "Yıllık takvim, yıllık görünüm, hep hatırımda kalsın, içgörü"],
    ["#e0c46e", "Dönem", "Dönem planı, ders programı, enerji haritası ve grafiği"],
    ["#c99a9b", "Ay", "Aylık plan ve ayın ardından"],
    ["#a89ac4", "Hafta", "Haftalık görünüm ve reset ritüeli"],
    ["#8fae9b", "Gün", "Günlük plan, saat şeridi, enerjiye göre işler"],
    ["#9ab7b0", "Takip", "Alışkanlık, birikim, bekleyenler, öğrenciler, kişiler, zaferler"],
    ["#d9a273", "Notlar", "Boş sayfa, defterler, beyin fırtınası, her şey, zor gün, etiketler"]
  ];

  var BOLUM = [
    {
      k: "gezinmek", ad: "Bir sayfada ne nerede", renk: "#c4885b",
      metin: "Hoş geldin. Başlamak için hiçbir şeyi baştan kurmana gerek yok — şu dördünü sırayla yap, on dakika sürer.",
      adim: [
        ["Bugün sayfasına bak", "Üst şeritteki ilk renk, nerede olursan ol seni buraya getirir: günün özeti, üç önceliğin ve ders programın."],
        ["Günlük sayfaya üç öncelik yaz", "Bugün gerçekten olmasını istediğin üç şey. Süresini tahmin et; akşam gerçeğini yanına yazarsın."],
        ["İlk 2 dakikayı seç", "En çok ertelediğin işin en küçük ilk adımı. „Dosyayı aç” bile yeter."],
        ["Akşam iyi anı yaz", "Bir satır. Yıl sonunda en çok dönüp okuyacağın yer burası olacak."]
      ],
      sekme: true,
      son: "Üstte bölüm şeridi, sağda yan sekmeler, altta gezinme; sağ üstte ? rehberi, sağ altta Aa ve bulut düğmesi.",
      link: ["Bir sayfada ne nerede", "rehber"]
    },
    {
      k: "planlamak", ad: "Planlamak", renk: "#a89ac4",
      metin: "Ajanda dört küçük durakla çalışıyor: sabah Bugün, gün içinde günlük sayfa, akşam iyi an, pazar günü reset.",
      akis: [
        ["SABAH", "Bugün", "Üç önceliğe bak, ders programını gör", "#f4f1ea"],
        ["GÜN İÇİ", "Günlük sayfa", "Saat şeridine yerleştir, işaretle", "#eef2ee"],
        ["AKŞAM", "İyi an", "Günün iyi anını bir satırla yaz", "#f6f1ea"],
        ["PAZAR", "Reset", "Haftayı kapat, üç işi seç", "#f1eef5"]
      ],
      ornek: "gun",
      liste: [
        ["Üç öncelik ve süre", "Tahmini süreyi yaz, akşam gerçeğini yanına koy; fark haftalık sayfada grafiğe döner."],
        ["Saat şeridi ve buçuk", "06–23 satırları; yazdığın iş haftalıkta da görünür. Saatin yanındaki ＋ o saate :30 ekler, − kaldırır."],
        ["Haftalık ve reset", "Yedi gün dikey sütun; gün başlığına dokununca o günün sayfası açılır. İkinci yarısı yedi adımlık reset."],
        ["Aylık ve ayın ardından", "Gün kutusuna yazdığın haftanın yakala bölümünde belirir; ay sonunda işaretlediklerin sonraki aya geçer."],
        ["Yıl", "Yıllık takvimden aya, güne, haftaya geçilir; hep hatırımda ve içgörü sayfaları yılı kapatır."]
      ],
      bag: [
        ["Yıllık → aylık", "Yıllık takvimde yazdığın not, o ayın sayfasında ilgili günde çıkar."],
        ["Aylık → haftalık", "Gün kutusuna yazdığın şey, o haftanın yakala bölümünde belirir."],
        ["Günlük ↔ haftalık", "Saat şeridine yazdığın iş iki sayfada da aynı anda görünür."],
        ["Süre takibi", "Üç önceliğin tahmini ve gerçek süresi haftalık sayfada grafiğe döner."]
      ],
      link: ["Planlamak sayfası", "rehber-2"]
    },
    {
      k: "isaretlemek", ad: "İşaretlemek ve yazmak", renk: "#8fae9b",
      metin: "Öğrenilecek beş hareket var, hepsi bir dokunuş. Elin bunlara alıştığında ajandanın tamamı açılıyor.",
      isaret: [
        ["kutu", "İşaretlemek", "Kare ve yuvarlak kutulara bir kez dokun; ikinci dokunuşta geri alınır."],
        ["cizgi", "Yazmak", "Çizgili ve boş alanlara dokunup yaz; başka yere geçince kaydolur. Kaydet düğmesi yok."],
        ["nokta", "Ertelemek", "Enerji işlerinin yanındaki üç noktadan birine dokun; iş ertesi güne geçer, burada üstü çizili kalır."],
        ["renk", "Renklendirmek", "Satırın sağındaki nokta altı renk arasında döner. Aynı rengi verdiğin işler birbirine bağlı okunur."],
        ["artiEksi", "Satır eklemek", "Listelerin altındaki ＋ yeni satır açar, − son satırı kaldırır."]
      ],
      ornek: "hafta",
      son: "Yanlış işaretlediysen aynı yere bir daha dokun. × işareti sorar, sonra siler; kişi silmek ajandadaki yazıları silmez.",
      link: ["İşaretlemek ve yazmak", "rehber-3"]
    },
    {
      k: "takip", ad: "Takip etmek", renk: "#9ab7b0",
      metin: "Bir güne sığmayan her şey burada. Günlük sayfa bugünü taşır, takip sayfaları ayları.",
      ornek: "takip",
      liste: [
        ["Alışkanlık", "Bir kez yaz, günlük sayfalarda adıyla çıkar. Dokundukça 1–5 derece; sekiz satır hazır, ＋ − ile 1–14 arası."],
        ["Birikim", "Hedefi ve tutarı yaz; aylık toplam, birikime giden ve hedefe kalan kendiliğinden hesaplanır."],
        ["Bekleyenler", "Kim, ne bekliyorum, istedim, geldi mi."],
        ["Söylediler ve ne tuttu", "Saklamak istediğin sözler; denediğin etkinlik ve materyalin sonucu."],
        ["Sözler ve ödünç", "Söz verdiğin işler, ödünç verdiğin kitap ve eşya."],
        ["Öğrenci", "Listeye isim yaz, isme dokun; öğrencinin kendi takip sayfası açılır."],
        ["Kişiler", "Adını ya da eklediğin sıfat ve hitapları yazdığın satırlar tarihiyle kişinin sayfasına düşer; TXT, WORD ya da PDF iner."],
        ["Küçük zaferler", "Otuz satır, onda bir kendine ödül satırı."]
      ],
      link: ["Takip etmek sayfası", "rehber-4"]
    },
    {
      k: "notlar", ad: "Yazmak ve düşünmek", renk: "#d9a273",
      metin: "Notlar bölümü serbest alan: takvime bağlı olmayan her şey.",
      liste: [
        ["Boş sayfa", "Hiç kuralı olmayan çizgili alan."],
        ["Defterler", "İstediğin kadar defter aç; „bugüne yaz” tarihli giriş açar, aylık takvimde defterin renk noktası çıkar."],
        ["Kağıt seçmek", "Her giriş kendi kağıdını seçer: düz, çizgili, kareli, noktalı ya da iki sütun."],
        ["＋ TABLO", "Dört sütunlu tablo; ilk satır başlık, ＋ SATIR ile on dörde kadar büyür."],
        ["＋ ŞEMA", "Girintili madde şeması; ‹ › ile kademe değişir, yirmi dört satıra kadar. Bir girişte altı bloğa kadar."],
        ["Beyin fırtınası", "Çiz, zihin haritası, grafik, tablo; zihin haritasında ＋ ile dal, her dalda alt dal."],
        ["Her şey", "Aklında ne varsa boşalttığın sayfa; sonra dağıtırsın."],
        ["Zor gün", "Ağırlaştıran ne, daha önce ne iyi gelmişti gibi dört soru ve tek küçük adım."],
        ["Etiketler", "Tekrar eden işleri aynı sözcükle adlandırmak için kendi listen."]
      ],
      link: ["Yazmak ve düşünmek", "rehber-5"]
    },
    {
      k: "suslemek", ad: "Süslemek", renk: "#c4885b",
      metin: "Bu bölümün tamamı isteğe bağlı; hiçbirini kullanmasan da her şey çalışır.",
      liste: [
        ["Sticker", "Her sayfada ＋ STICKER; taşınır, ⤢ boyutlar, ↻ döndürür, ✎ kırpar ve soldurur, × siler."],
        ["Kendi sticker'ın", "Galeride „＋ KENDİ STICKER'IM” ile kendi görselini yükle."],
        ["Fotoğraf", "Her sayfaya eklenir, istediğin yere taşınır."],
        ["Sayfa rengi", "Yanındaki yuvarlak: kağıt rengini yedi yumuşak ton arasında çevirir."],
        ["Arka plan", "Kapak, ayırıcı ve Bugün sayfasında ＋ ARKA PLAN; ayırıcıdaki görsel şeridin motifi olur."],
        ["Motto", "Bugün sayfasındaki kart: rengi, başlangıcı ve yaslaması ayarlanır."],
        ["Sticker albümü", "Notlar bölümünün sonunda hepsi bir arada."]
      ],
      son: "Süslemeler yazdırmada da çıkar; yalnızca ?, Aa ve bulut düğmesi görünmez.",
      link: ["Süslemek sayfası", "rehber-6"]
    },
    {
      k: "ayarlar", ad: "Kendine ayarlamak", renk: "#8d8a87",
      metin: "Ayarlar sayfaların içeriğini değiştirmez; nasıl göründüğünü ve nerede durduğunu değiştirir.",
      liste: [
        ["Punto ve yazı tipi", "Sağ alttaki Aa. Bir yazı alanına dokunduktan sonra açarsan yalnızca o alanı, „Tüm sayfa” dersen hepsini birlikte. 10–22 pt, beş yazı tipi."],
        ["Bölümleri kapatmak", "İçindekiler'deki anahtarlar: kullanmadığın bölüm ya da tek sayfa şeritten kalkar, yazdıkların silinmez."],
        ["Eşitlemeye girmek", "Bulut düğmesi: e-postanı yaz, gelen maildeki bağlantıya dokun. Şifre yok."],
        ["Girişli cihazdan aktarmak", "Girişli cihazda „Oturumu kopyala”, öbür cihazda „Girişli cihazdan aktar”a yapıştır."],
        ["Kendiliğinden eşitleme", "Girdikten sonra yazdıkların kendiliğinden buluta gider ve öbür cihaza iner."],
        ["Gönder ve getir", "Aynı panelde elle „Gönder” yukarı yollar, „Getir” buluttakini indirir."],
        ["Çıkış", "Ortak bir cihazda çalıştıysan işin bitince çık."],
        ["Yedek", "İçindekiler'den „Yedek al” tek dosyaya indirir, „Yedeği yükle” geri alır. İnternet gerekmez."]
      ],
      son: "Her şey önce senin cihazında. Eşitlemeye girdiysen bir de bulutta kopyası olur; kimse senin yazdıklarını görmez.",
      link: ["Kendine ayarlamak", "rehber-7"]
    },
    {
      k: "sss", ad: "Sık sorulanlar", renk: "#8d8a87",
      sss: [
        ["Yazdıklarım kaybolur mu?", "Hayır. Her şey yazdığın cihazda saklanıyor, internet olmadan da açılır. Bulut düğmesinden girersen cihazlar arasında eşitlenir."],
        ["Bir haftayı boş geçirdim.", "Hiç sorun değil. Bulunduğun haftaya geç; geriye dönük doldurmak zorunda değilsin, kimse saymıyor."],
        ["Üç öncelikten fazlası var.", "Fazlasını „yeri belli değil”e bırak. Üç bilerek üç: dördüncüyü eklediğinde dördü de sulanıyor."],
        ["Kullanmadığım bölümler var.", "İçindekiler'deki anahtarlardan kapat; üst şeritten ve listeden kalkar."],
        ["Yazdırabilir miyim?", "Evet, sayfalar baskı ölçüsünde. Yazdırmada düğmeler görünmez."],
        ["Punto çok küçük.", "Sağ alttaki Aa'dan büyüt, 22 pt'ye kadar. Tek bir alanı da ayrı ayarlayabilirsin."]
      ]
    }
  ];

  function el(t, s, m) {
    var d = document.createElement(t);
    if (s) d.style.cssText = s;
    if (m !== undefined) d.textContent = m;
    return d;
  }
  function ikonKutu(k, renk, boy, cap) {
    var d = el("span", "flex:none;width:" + cap + "px;height:" + cap + "px;border-radius:50%;background:#faf8f5;border:1px solid #ece9e5;display:flex;align-items:center;justify-content:center");
    d.innerHTML = svg(IK[k] || IK.sss, renk, boy);
    return d;
  }

  var ORNEK = {
    gun: {
      ad: "Perşembe", alt: "12 Kasım", renk: "#8fae9b",
      saat: [["07", "kalk · kahve", ""], ["08", "5-A hazırlık", "#8fb4d4"], ["09", "5-A ders", "#8fb4d4"], ["10", "", ""], ["11", "zümre toplantısı", "#c99a9b"], ["12", "öğle", ""], ["13", "6-B ders", "#8fb4d4"]],
      kutu: ["Deneme sınavını hazırla", "Veli mesajlarına dön", "Kütüphane listesi"],
      ilk: "Deneme dosyasını aç",
      an: "6-B'de Elif ilk kez tahtaya çıktı."
    },
    hafta: {
      ad: "Hafta 11", alt: "9–15 Kasım", renk: "#a89ac4",
      saat: [["Pzt", "deneme · 5-A", "#8fb4d4"], ["Sal", "veli görüşmesi", "#c99a9b"], ["Çar", "", ""], ["Per", "zümre", "#c99a9b"], ["Cum", "kütüphane", "#d9a273"], ["Cmt", "yürüyüş", "#8fae9b"], ["Paz", "reset", "#a89ac4"]],
      kutu: ["Deneme sonuçlarını gir", "Dönem planını gözden geçir", "Kitap siparişi"],
      ilk: "Sonuç tablosunu aç",
      an: "Hafta beklediğimden sakin geçti."
    },
    takip: {
      ad: "Kasım", alt: "alışkanlık", renk: "#9ab7b0",
      derece: [["su", [4, 4, 3, 5, 4, 5, 3]], ["yürüyüş", [2, 0, 3, 3, 4, 0, 4]], ["okuma", [5, 5, 4, 4, 5, 5, 4]], ["uyku", [3, 4, 4, 5, 4, 3, 5]]],
      kutu: ["Birikim: 1.400 ₺", "Hedefe kalan: 8.600 ₺"],
      ilk: "",
      an: "Yürüyüş iki gün kaçtı, olsun."
    }
  };

  function ornekCiz(t) {
    var o = ORNEK[t];
    if (!o) return el("span");
    var kutu = el("div", "flex:none;width:216px;box-sizing:border-box;border:1px solid #e6e2dc;border-radius:9px;background:#fffdfa;overflow:hidden;box-shadow:0 2px 10px rgba(32,30,29,0.06)");

    var serit = el("div", "display:flex;height:7px");
    ["#efe7db", "#8fb4d4", "#e0c46e", "#c99a9b", "#a89ac4", "#8fae9b", "#9ab7b0", "#d9a273"].forEach(function (r) {
      serit.appendChild(el("span", "flex:1;background:" + r + ";opacity:" + (r === o.renk ? "1" : "0.45")));
    });
    kutu.appendChild(serit);

    var bas = el("div", "display:flex;align-items:baseline;justify-content:space-between;padding:8px 10px 6px;border-bottom:1px solid #201e1d");
    bas.appendChild(el("span", "font:400 14px " + yzB + ";color:#201e1d", o.ad));
    bas.appendChild(el("span", "font:400 9px " + yzB + ";color:#a9a6a3", o.alt));
    kutu.appendChild(bas);

    var g = el("div", "display:flex;flex-direction:column;padding:2px 10px 8px");
    if (o.saat) {
      o.saat.forEach(function (s) {
        var sat = el("div", "display:flex;align-items:center;gap:7px;padding:3px 0;border-bottom:1px solid #f4f1ee");
        sat.appendChild(el("span", "flex:none;width:20px;font:400 8.5px " + yzB + ";color:#c4c1be", s[0]));
        sat.appendChild(el("span", "flex:1;font:400 12px Caveat,cursive;color:#33538a;white-space:nowrap;overflow:hidden", s[1]));
        sat.appendChild(el("span", "flex:none;width:7px;height:7px;border-radius:50%;background:" + (s[2] || "transparent")));
        g.appendChild(sat);
      });
    }
    if (o.derece) {
      o.derece.forEach(function (d) {
        var sat = el("div", "display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid #f4f1ee");
        sat.appendChild(el("span", "flex:none;width:44px;font:400 9px " + yzB + ";color:#8d8a87", d[0]));
        var hc = el("span", "flex:1;display:flex;gap:2px");
        d[1].forEach(function (v) {
          hc.appendChild(el("span", "flex:1;height:11px;border-radius:2px;background:" + (v ? "#9ab7b0" : "#f0edea") + ";opacity:" + (v ? 0.3 + v * 0.14 : 1)));
        });
        sat.appendChild(hc);
        g.appendChild(sat);
      });
    }

    if (o.kutu && o.kutu.length) {
      var k = el("div", "box-sizing:border-box;margin-top:7px;border:1px solid #ece9e5;border-radius:5px;padding:6px 8px;display:flex;flex-direction:column;gap:4px");
      k.appendChild(el("span", "font:400 7.5px " + yzB + ";letter-spacing:0.12em;color:#a9a6a3", t === "takip" ? "BİRİKİM" : "ÜÇ ÖNCELİK"));
      o.kutu.forEach(function (m, i) {
        var s = el("span", "display:flex;align-items:center;gap:6px");
        s.appendChild(el("span", "flex:none;width:9px;height:9px;border:1px solid " + o.renk + ";border-radius:2px;background:" + (i === 0 ? o.renk : "transparent")));
        s.appendChild(el("span", "flex:1;font:400 11px Caveat,cursive;color:#33538a;white-space:nowrap;overflow:hidden", m));
        k.appendChild(s);
      });
      g.appendChild(k);
    }

    if (o.ilk) {
      var il = el("div", "margin-top:6px;display:flex;flex-direction:column;gap:2px;background:#faf8f5;border-radius:5px;padding:6px 8px");
      il.appendChild(el("span", "font:400 7.5px " + yzB + ";letter-spacing:0.12em;color:#a9a6a3", "İLK 2 DAKİKA"));
      il.appendChild(el("span", "font:400 12px Caveat,cursive;color:#33538a", o.ilk));
      g.appendChild(il);
    }

    var an = el("div", "margin-top:6px;display:flex;flex-direction:column;gap:2px");
    an.appendChild(el("span", "font:400 7.5px " + yzB + ";letter-spacing:0.12em;color:" + o.renk, "İYİ AN"));
    an.appendChild(el("span", "font:400 11.5px/1.35 Caveat,cursive;color:#33538a", o.an));
    g.appendChild(an);

    kutu.appendChild(g);
    return kutu;
  }

  function satirBlok(liste, genislik) {
    var l = el("div", "flex:1;display:flex;flex-direction:column");
    liste.forEach(function (o, i) {
      var sat = el("div", "display:flex;flex-direction:column;gap:2px;padding:9px 0;border-top:" + (i ? "1px solid #f0edea" : "none"));
      sat.appendChild(el("span", "font:500 14.5px " + yzB + ";color:#201e1d", o[0]));
      sat.appendChild(el("span", "font:400 13.5px/1.55 " + yzB + ";color:#6e6b68;max-width:" + (genislik || "58ch"), o[1]));
      l.appendChild(sat);
    });
    return l;
  }

  function isaretSim(t) {
    var s = el("span", "flex:none;width:64px;display:flex;align-items:center;justify-content:center;gap:6px");
    if (t === "kutu") {
      s.appendChild(el("span", "width:18px;height:18px;border:1.5px solid #8fae9b;border-radius:4px"));
      s.appendChild(el("span", "width:18px;height:18px;border:1.5px solid #8fae9b;border-radius:4px;background:#8fae9b"));
    } else if (t === "cizgi") {
      var c = el("span", "width:46px;display:flex;flex-direction:column;gap:6px");
      [0, 1, 2].forEach(function () { c.appendChild(el("span", "height:1px;background:#ded9d4")); });
      s.appendChild(c);
    } else if (t === "nokta") {
      [0, 1, 2].forEach(function (i) {
        s.appendChild(el("span", "width:10px;height:10px;border-radius:50%;border:1px solid #c99a9b;background:" + (i === 0 ? "#c99a9b" : "transparent")));
      });
    } else if (t === "renk") {
      ["#8fb4d4", "#a89ac4", "#d9a273"].forEach(function (r) {
        s.appendChild(el("span", "width:11px;height:11px;border-radius:50%;background:" + r));
      });
    } else if (t === "artiEksi") {
      s.appendChild(el("span", "font:400 16px " + yzB + ";color:#8d8a87", "＋"));
      s.appendChild(el("span", "font:400 16px " + yzB + ";color:#8d8a87", "−"));
    } else {
      s.appendChild(el("span", "font:500 17px " + yzB + ";color:#6e6b68", "Aa"));
    }
    return s;
  }

  function bolumCiz(b) {
    var kok = el("div", "display:flex;flex-direction:column;gap:15px");

    var bas = el("div", "display:flex;align-items:center;gap:12px;border-bottom:1px solid #e6e2dc;padding-bottom:11px");
    bas.appendChild(ikonKutu(b.k, b.renk, 20, 34));
    bas.appendChild(el("span", "font:400 25px " + yzB + ";color:#201e1d", b.ad));
    bas.appendChild(el("span", "flex:1"));
    bas.appendChild(el("span", "font:400 10px " + yzB + ";letter-spacing:0.16em;color:" + b.renk, "REHBER"));
    kok.appendChild(bas);

    if (b.metin) kok.appendChild(el("div", "font:400 15px/1.65 " + yzB + ";color:#4a4744;max-width:62ch", b.metin));

    if (b.adim) {
      var ad = el("div", "display:flex;flex-direction:column;gap:11px");
      b.adim.forEach(function (a, i) {
        var s = el("div", "display:flex;gap:13px;align-items:flex-start");
        s.appendChild(el("span", "flex:none;width:27px;height:27px;border-radius:50%;background:" + b.renk + ";display:flex;align-items:center;justify-content:center;font:400 13px " + yzB + ";color:#fffdfa", String(i + 1)));
        var m = el("div", "display:flex;flex-direction:column;gap:2px");
        m.appendChild(el("span", "font:500 15px " + yzB + ";color:#201e1d", a[0]));
        m.appendChild(el("span", "font:400 13.5px/1.6 " + yzB + ";color:#6e6b68;max-width:56ch", a[1]));
        s.appendChild(m);
        ad.appendChild(s);
      });
      kok.appendChild(ad);
    }

    if (b.akis) {
      var ak = el("div", "display:flex;align-items:stretch;gap:0");
      b.akis.forEach(function (o, i) {
        var kart = el("div", "flex:1;box-sizing:border-box;display:flex;flex-direction:column;gap:5px;padding:13px 12px;background:" + o[3] + ";border-radius:8px");
        kart.appendChild(el("span", "font:400 9.5px " + yzB + ";letter-spacing:0.13em;color:#8d8a87", o[0]));
        kart.appendChild(el("span", "font:400 16px " + yzB + ";color:#2f2b25", o[1]));
        kart.appendChild(el("span", "font:400 12px/1.45 " + yzB + ";color:#6b655c", o[2]));
        ak.appendChild(kart);
        if (i < b.akis.length - 1) ak.appendChild(el("span", "flex:none;width:20px;display:flex;align-items:center;justify-content:center;font:400 14px " + yzB + ";color:#cfccc9", "→"));
      });
      kok.appendChild(ak);
    }

    if (b.bag) {
      kok.appendChild(el("span", "font:400 10px " + yzB + ";letter-spacing:0.16em;color:#a9a6a3", "SAYFALAR BİRBİRİNE BAĞLI"));
      var bg = el("div", "box-sizing:border-box;background:#f7f5f1;border-radius:10px;padding:14px 18px;display:flex;flex-direction:column");
      b.bag.forEach(function (o, i) {
        var s = el("div", "display:flex;gap:14px;align-items:baseline;padding:8px 0;border-top:" + (i ? "1px solid #ebe7e4" : "none"));
        s.appendChild(el("span", "flex:none;width:186px;font:500 13.5px " + yzB + ";color:#2f2b25", o[0]));
        s.appendChild(el("span", "flex:1;font:400 13px/1.55 " + yzB + ";color:#6b655c", o[1]));
        bg.appendChild(s);
      });
      kok.appendChild(bg);
    }

    if (b.sekme) {
      var st = el("div", "display:flex;height:34px;border-radius:6px;overflow:hidden;border:1px solid #e6e2dc");
      SEKME.forEach(function (o) {
        st.appendChild(el("span", "flex:1;background:" + o[0] + ";border-right:1px solid #fffdfa"));
      });
      kok.appendChild(st);
      var l2 = el("div", "display:flex;flex-direction:column");
      SEKME.forEach(function (o, i) {
        var s = el("div", "display:flex;align-items:center;gap:13px;padding:8px 0;border-top:" + (i ? "1px solid #f0edea" : "none"));
        s.appendChild(el("span", "flex:none;width:24px;height:24px;border-radius:5px;background:" + o[0] + ";border:1px solid rgba(32,30,29,0.1)"));
        s.appendChild(el("span", "flex:none;width:70px;font:500 14.5px " + yzB + ";color:#201e1d", o[1]));
        s.appendChild(el("span", "flex:1;font:400 13.5px/1.5 " + yzB + ";color:#6e6b68", o[2]));
        l2.appendChild(s);
      });
      kok.appendChild(l2);
    }

    if (b.isaret) {
      var iSar = el("div", "display:flex;gap:20px;align-items:flex-start");
      var ib = el("div", "flex:1;display:flex;flex-direction:column;min-width:0");
      b.isaret.forEach(function (o, i) {
        var s = el("div", "display:flex;align-items:center;gap:16px;padding:11px 0;border-top:" + (i ? "1px solid #f0edea" : "none"));
        s.appendChild(isaretSim(o[0]));
        var m = el("div", "display:flex;flex-direction:column;gap:2px");
        m.appendChild(el("span", "font:500 14.5px " + yzB + ";color:#201e1d", o[1]));
        m.appendChild(el("span", "font:400 13.5px/1.55 " + yzB + ";color:#6e6b68;max-width:44ch", o[2]));
        s.appendChild(m);
        ib.appendChild(s);
      });
      iSar.appendChild(ib);
      if (b.ornek) { iSar.appendChild(ornekCiz(b.ornek)); b.__ornekCizildi = true; }
      kok.appendChild(iSar);
    }

    if (b.liste) {
      var sar = el("div", "display:flex;gap:20px;align-items:flex-start");
      sar.appendChild(satirBlok(b.liste, b.ornek ? "44ch" : "58ch"));
      if (b.ornek) { sar.appendChild(ornekCiz(b.ornek)); b.__ornekCizildi = true; }
      kok.appendChild(sar);
    }
    if (b.ornek && !b.__ornekCizildi) {
      var oSar = el("div", "display:flex;gap:20px;align-items:flex-start;justify-content:flex-end");
      oSar.appendChild(ornekCiz(b.ornek));
      kok.appendChild(oSar);
    }
    b.__ornekCizildi = false;

    if (b.sss) {
      var q = el("div", "display:flex;flex-direction:column");
      b.sss.forEach(function (o, i) {
        var s = el("div", "display:flex;gap:12px;align-items:flex-start;padding:11px 0;border-top:" + (i ? "1px solid #f0edea" : "none"));
        s.appendChild(el("span", "flex:none;font:400 14px " + yzB + ";color:" + b.renk, "—"));
        var m = el("div", "display:flex;flex-direction:column;gap:3px");
        m.appendChild(el("span", "font:500 14.5px " + yzB + ";color:#201e1d", o[0]));
        m.appendChild(el("span", "font:400 13.5px/1.55 " + yzB + ";color:#6e6b68;max-width:58ch", o[1]));
        s.appendChild(m);
        q.appendChild(s);
      });
      kok.appendChild(q);
    }

    if (b.son) kok.appendChild(el("div", "box-sizing:border-box;padding:12px 15px;background:#faf8f5;border-left:2px solid " + b.renk + ";font:400 13.5px/1.6 " + yzB + ";color:#4a4744", b.son));

    if (b.link) {
      var a = document.createElement("a");
      a.href = ANA + "#" + b.link[1];
      a.textContent = b.link[0] + " ›";
      a.style.cssText = "align-self:flex-start;font:400 13px " + yzB + ";color:#c4885b;text-decoration:none";
      kok.appendChild(a);
    }

    return kok;
  }

  function kur() {
    if (!document.body || document.getElementById("__rehber-kok")) return;

    var kok = el("div", "position:fixed;inset:0;z-index:2147483100;display:none;align-items:center;justify-content:center;background:rgba(32,30,29,0.34);padding:24px");
    kok.id = "__rehber-kok";

    var pen = el("div", "box-sizing:border-box;width:min(940px,100%);max-height:min(740px,100%);display:flex;flex-direction:column;background:#fffdfa;border:1px solid #ded9d4;border-radius:14px;box-shadow:0 20px 60px rgba(32,30,29,0.28);overflow:hidden");

    var ust = el("div", "flex:none;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #e6e2dc;background:#faf8f5");
    var ustSol = el("span", "display:flex;align-items:center;gap:10px");
    var ustIk = el("span", "display:flex");
    ustIk.innerHTML = svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v18H6.5A2.5 2.5 0 0 1 4 18.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v18h4.5A2.5 2.5 0 0 0 20 18.5z"/>', "#8d8a87", 19);
    ustSol.appendChild(ustIk);
    ustSol.appendChild(el("span", "font:400 18px " + yzB + ";color:#201e1d", "Ajanda rehberi"));
    ust.appendChild(ustSol);
    var kapat = el("span", "font:400 20px " + yzB + ";color:#a9a6a3;cursor:pointer;padding:0 4px", "×");
    kapat.addEventListener("click", function () { kok.style.display = "none"; });
    ust.appendChild(kapat);

    var govde = el("div", "flex:1;display:flex;min-height:0");
    var yan = el("div", "flex:none;width:196px;box-sizing:border-box;border-right:1px solid #e6e2dc;background:#faf8f5;overflow:auto;padding:9px 0");
    var icerik = el("div", "flex:1;overflow:auto;padding:22px 26px 30px");

    var aktif = sf();
    var yanD = [];

    function goster(k) {
      aktif = k;
      icerik.innerHTML = "";
      var b = BOLUM[0];
      for (var i = 0; i < BOLUM.length; i++) if (BOLUM[i].k === k) b = BOLUM[i];
      icerik.appendChild(bolumCiz(b));
      icerik.scrollTop = 0;
      yanD.forEach(function (d) {
        var s = d.getAttribute("data-k") === k;
        d.style.background = s ? "#fffdfa" : "transparent";
        d.style.borderLeftColor = s ? d.getAttribute("data-renk") : "transparent";
        d.querySelector("span[data-ad]").style.color = s ? "#201e1d" : "#8d8a87";
      });
    }

    BOLUM.forEach(function (b) {
      var d = el("div", "box-sizing:border-box;display:flex;align-items:center;gap:9px;padding:7px 14px;border-left:2px solid transparent;cursor:pointer");
      d.setAttribute("data-k", b.k);
      d.setAttribute("data-renk", b.renk);
      var ik = el("span", "flex:none;display:flex");
      ik.innerHTML = svg(IK[b.k] || IK.sss, b.renk, 16);
      var ad = el("span", "font:400 13.5px " + yzB + ";color:#8d8a87", b.ad);
      ad.setAttribute("data-ad", "1");
      d.appendChild(ik);
      d.appendChild(ad);
      d.addEventListener("click", function () { goster(b.k); });
      yan.appendChild(d);
      yanD.push(d);
    });

    govde.appendChild(yan);
    govde.appendChild(icerik);
    pen.appendChild(ust);
    pen.appendChild(govde);
    kok.appendChild(pen);
    kok.addEventListener("click", function (e) { if (e.target === kok) kok.style.display = "none"; });
    document.body.appendChild(kok);

    var dugme = el("button", "position:fixed;right:14px;top:14px;z-index:2147483200;width:38px;height:38px;border:1px solid #e6e2dc;border-radius:50%;background:#fffdfa;box-shadow:0 3px 12px rgba(32,30,29,0.12);cursor:pointer;font:400 17px " + yzB + ";color:#6e6b68", "?");
    dugme.id = "__rehber-dugme";
    dugme.type = "button";
    dugme.title = "Rehber";
    dugme.addEventListener("click", function () { kok.style.display = "flex"; goster(aktif); });
    document.body.appendChild(dugme);

    document.addEventListener("keydown", function (e) { if (e.key === "Escape") kok.style.display = "none"; });

    var st = el("style");
    st.textContent = "@media print { #__rehber-kok, #__rehber-dugme { display:none !important; } }";
    document.head.appendChild(st);

    goster(aktif);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", kur);
  else kur();
})();

})();