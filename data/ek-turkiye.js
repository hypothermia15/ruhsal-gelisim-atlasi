/* Uyarlamada eklenen Türkiye notları (Usta, 2026): yaş dönemlerine göre Türkiye'de geliştirilmiş ya da sınanmış
   araçlar ve Türkiye örneklemlerinden veriler. Biçim: [başlık, metin, [kaynak anahtarları], {exp, theory} (isteğe bağlı)].
   Sayısal bulgular anılan makalelerin PubMed özetlerinden alınmıştır. */
(function () {
  var A = window.ATLAS;
  var GKR = ["Gelişimi İzleme ve Destekleme Rehberi (GİDR)", "Ankara Üniversitesi'nde geliştirilen, bakımverenle açık uçlu görüşmeye dayanan izlem aracı. 0-24 ay için ilk çalışmada kapsamlı gelişimsel değerlendirmeye göre duyarlılığı 0,88, özgüllüğü 0,93 bulundu (79 çocuk); tıp öğrencileri ile gelişim uzmanı arasındaki uyum yüksekti (kappa 0,83-0,88). Uluslararası sürümü dört ülkede sınandı.", ["ertem08", "ertem18"], { exp: "ertem18" }];
  var DENVER = ["Denver II: Türk çocuklarında başarım", "Sağlıklı 1091 Türk çocuğunda cinsiyet farkları az ve tutarsızdı; sosyokültürel gruplar arasında ise özellikle ince motor ve dil alanlarında ve büyük okul öncesi çocuklarda belirgin fark vardı. Yazarlar, okul öncesi eğitimin yaygın olmadığı ülkelerde anne eğitiminin etkisinin daha önemli olduğunu belirtir.", ["durmazlar98"]];
  var BUYUME = ["Türk çocukları için büyüme referansları", "İstanbul'da sağlıklı çocuk izlemine düzenli gelen ve hali vakti yerinde ailelerden 0-18 yaş çocukların ölçümlerinden ağırlık, boy, baş çevresi ve beden kitle indeksi persentilleri oluşturuldu. Baş çevresi ve büyüme değerlendirmesinde yerel referansın hangi örnekleme dayandığı akılda tutulmalıdır.", ["neyzi15"]];
  var MCHAT = ["M-CHAT-R/F: İstanbul toplum örneklemi", "16-36 aylık 6712 çocukta tarama %9,8 oranında pozitifti; izlem görüşmesinden sonra ilk taramada pozitif çıkanların %39,7'si otizm ölçütlerini karşıladı. 57 çocuğa (117'de 1; %0,8) otizm tanısı kondu. Yazarlara göre araç Türkiye'de ABD'dekine benzer başarım gösterdi.", ["oner20"]];
  var CFD = ["Hasta çocuk vizitinde gelişimi destekleme", "Ankara Üniversitesi Çocuk Sağlığı ve Hastalıkları Anabilim Dalı'nda, hafif akut hastalıkla başvuran küçük çocuklarda DSÖ ve UNICEF'in 'Gelişim için Bakım' müdahalesi kontrollü olarak sınandı. Müdahale grubunda olmak, bir ay sonra ev ortamının daha uyarıcı olmasının bağımsız yordayıcısıydı; tedaviye uyum ve hastalık seyri gruplar arasında farklı değildi.", ["ertem06"]];
  var EPICPAT = ["Türkiye'de çocukluk çağı psikopatolojisinin yaygınlığı (EPICPAT-T)", "30 ilde 2-4. sınıfa giden, temsili 5830 çocuk K-SADS-PL ile değerlendirildi. Herhangi bir psikopatolojinin yaygınlığı işlev kaybı ölçütü olmadan %37,6, işlev kaybı ölçütüyle %17,1 idi. En sık tanı DEHB (işlev kaybıyla %12,4), ikinci sırada kaygı bozuklukları (%5,3) idi. Ebeveynin düşük eğitim düzeyi ve bedensel ya da ruhsal sorunu bağımsız yordayıcılardı.", ["ercan19"]];
  var PUBERTE = ["İstanbul'da kız çocuklarında puberte yaşları", "6-18 yaşındaki 4868 sağlıklı kız öğrencide ortanca menarş yaşı 12,74, meme gelişiminin başlangıcı (evre 2) 9,65 yaş bulundu. Menarş yaşı kırk yıl önceki çalışmayla yaklaşık aynıydı; meme evrelerinde ise erkene kayma eğilimi vardı. Yüksek sosyoekonomik düzey ve beden kitle indeksi daha erken puberteyle ilişkiliydi.", ["atay11"]];
  var KOHLBERG = ["Kohlberg'in evreleri Türkiye'de sınandı", "Nisan ve Kohlberg (1982), ahlaki yargı evrelerinin evrenselliğini Türkiye'de boylamsal ve kesitsel bir çalışmayla inceledi. Makale, evre sırasının kültürler arası geçerliliği tartışmasında sık anılan kaynaklardandır; bulguların ayrıntısı için makalenin kendisine başvurulmalıdır.", ["nisan82"], { theory: "kohlberg" }];
  var KAGIT_COCUK = ["Çocuğun değeri ve erken destek: Kağıtçıbaşı", "Çocuğun Değeri araştırmasının Türkiye ayağı ve İstanbul'da yürütülen Türkiye Erken Destek Projesi, aile değişimi kuramının ve Anne-Çocuk Eğitim Programı'nın dayanağıdır. Kuramın ayrıntılı profili ve 22 yıllık izlem atlasta yer alır.", ["kagitcibasi17"], { theory: "kagitcibasi", exp: "tedp09" }];
  var KAGIT_GENC = ["Özerk-ilişkisel benlik: ayrışmadan özerkleşme", "Kağıtçıbaşı'na göre özerklik ile yakınlık zıt kutuplar değildir; kentleşen Türkiye'de yaygınlaşan duygusal karşılıklı bağımlılık aile modelinde genç, aileden kopmadan kendi kararlarını verebilir. Ergen ve aileyle çalışırken 'ayrışma' ölçütünü Batı örneklemlerinden aynen aktarmamak gerekir.", ["kagitcibasi17"], { theory: "kagitcibasi", exp: "kagitcibasi05" }];
  var KAGIT_YETISKIN = ["Kuşaklararası bağlar ve bakım", "Aile değişimi kuramına göre kentleşmeyle yaşlı ebeveyne maddi bağımlılık azalırken duygusal bağ ve bakım sorumluluğu sürer. Orta yaşta hem çocuğuna hem ebeveynine bakan yetişkinlerde bu beklenti yükün de anlamın da kaynağı olabilir; formülasyonda ikisi birlikte sorulmalıdır.", ["kagitcibasi17"], { theory: "kagitcibasi" }];
  var TR = {
    a0: [GKR, BUYUME],
    a1: [GKR, DENVER, BUYUME],
    a2: [GKR, CFD, DENVER],
    a3: [MCHAT, GKR, CFD],
    a4: [MCHAT, DENVER, KAGIT_COCUK],
    a5: [KAGIT_COCUK, DENVER, BUYUME],
    a6: [EPICPAT, BUYUME],
    a7: [EPICPAT, PUBERTE],
    a8: [PUBERTE, KOHLBERG, KAGIT_GENC],
    a9: [KAGIT_GENC, KOHLBERG],
    a10: [KAGIT_GENC],
    a11: [KAGIT_YETISKIN],
    a12: [KAGIT_YETISKIN],
    a13: [KAGIT_YETISKIN]
  };
  A.ageExtras = A.ageExtras || {};
  Object.keys(TR).forEach(function (id) {
    A.ageExtras[id] = A.ageExtras[id] || {};
    A.ageExtras[id].tr = TR[id];
  });
  A.trNotes = TR;
})();
