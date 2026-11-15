/* Uyarlamada eklenen ayrıntılı kuram profilleri (Usta, 2026): Fonagy ve Gergely (zihinselleştirme), Marcia (kimlik statüleri),
   mizaç (Thomas ve Chess, Kagan, Rothbart) ve Kağıtçıbaşı (aile değişimi, özerk-ilişkisel benlik).
   Biçim özgün profillerle aynıdır; her profil ek: true ile işaretlidir. Klinik vinyetler kurgusaldır. */
Object.assign(ATLAS.profiles, {
fonagy: { ek: true,
  life: "Peter Fonagy: 14 Ağustos 1952, Budapeşte · György Gergely ile birlikte",
  bio: [
    "Fonagy Budapeşte'de doğdu, ergenlik yıllarında Londra'ya geldi. University College London'da psikoloji okudu, psikanalist olarak yetişti ve aynı üniversitede psikanaliz profesörü oldu; 2003'ten sonra Anna Freud Merkezi'ni yönetti. Miriam ve Howard Steele ile gebe annelerde Yetişkin Bağlanma Görüşmesi'ni kullanarak ebeveynin zihinsel durumlar üzerine düşünme kapasitesinin bebeğin bağlanmasını öngördüğünü gösterdi (1991).",
    "Gelişim psikoloğu György Gergely ile John Watson'ın sosyal biyogeribildirim kuramı (1996), bebeğin kendi duygularını bakımverenin 'işaretli' aynalaması yoluyla tanımayı öğrendiğini öne sürdü. Mary Target ile birlikte psişik gerçekliğin gelişimini betimleyen Fonagy, Anthony Bateman ile sınır kişilik bozukluğu için Mentalizasyon Temelli Tedavi'yi geliştirdi. 2010'lardan sonra kuramın merkezine epistemik güven kavramı yerleşti."
  ],
  timeline: [[1952, "Fonagy Budapeşte'de doğdu"], [1991, "Fonagy, Steele ve Steele: doğum öncesi bağlanma temsili bebeğin bağlanmasını öngörür; 'yansıtıcı benlik' makalesi"], [1996, "Gergely ve Watson: sosyal biyogeribildirim kuramı; Fonagy ve Target: 'Gerçeklikle oynamak'"], [1998, "Yansıtıcı İşlev puanlama el kitabı"], [1999, "Bateman ve Fonagy: sınır kişilikte kısmi yatışla ilk randomize çalışma"], [2002, "Duygulanım Düzenlemesi, Zihinselleştirme ve Kendiliğin Gelişimi"], [2009, "Ayaktan MBT ile yapılandırılmış klinik yönetimin karşılaştırılması"], [2012, "Ergenlerde kendine zarar vermede MBT-A çalışması"], [2014, "Fonagy ve Allison: epistemik güven"], [2017, "'Fikrimizi değiştirdiğimiz konular' makaleleri: sınır kişilik, genel psikopatoloji etkeni ve epistemik güven"]],
  concepts: [
    ["Zihinselleştirme", "Kendi davranışını ve başkalarının davranışını istek, duygu, inanç gibi zihinsel durumlar üzerinden anlama. Büyük ölçüde örtük ve otomatiktir; gerektiğinde açık ve denetimli hâle gelir."],
    ["Yansıtıcı işlev", "Zihinselleştirmenin ölçülebilir karşılığı: bağlanma anlatılarında zihinsel durumlara ne ölçüde ve ne kadar tutarlı başvurulduğu."],
    ["İşaretli aynalama", "Bakımverenin bebeğin duygusunu abartılı ya da karışık bir ifadeyle, 'bu benim değil senin duygun' işaretiyle geri yansıtması. Bebek bu sayede duygusunun ikincil temsilini kurar."],
    ["Olumsallık algısı", "Bebeğin kendi eylemi ile çevredeki tepki arasındaki eşleşmeyi fark etmesi. İlk aylarda kusursuz, sonra 'yüksek ama kusurlu' olumsallık tercih edilir; bu kayma toplumsal dünyaya yönelimi başlatır."],
    ["Psişik eşdeğerlik", "İç dünyanın dış gerçeklikle aynı sayıldığı kip: düşünülen şey gerçektir. Yetişkinde stres altında 'Hissediyorsam doğrudur' kesinliği olarak geri döner."],
    ["'Mış gibi' kipi", "İç dünyanın gerçeklikten koparıldığı kip. Yetişkinde duygudan kopuk, bitmeyen ve hiçbir şeyi değiştirmeyen psikolojik konuşma (sözde zihinselleştirme) olarak görülür."],
    ["Teleolojik kip", "Zihinsel durumların ancak gözle görülür sonuçlarla anlaşıldığı kip: sevgi ancak bir eylemle kanıtlanır."],
    ["Yabancı kendilik", "Aynalama bebeğin durumuyla uyuşmadığında, bakımverenin durumu kendilik temsilinin içine yerleşir; sonradan dışsallaştırılmak istenen bir iç baskı olarak yaşanır."],
    ["Epistemik güven", "Başkasından gelen bilginin kişisel olarak ilgili ve genellenebilir olduğuna güvenme. Fonagy'ye göre erken güvensiz ortam bu güveni kapatır; tedavinin ortak etkeni onu yeniden açmaktır."],
    ["Aşırı zihinselleştirme", "Başkalarına kanıtın desteklemediği ölçüde ayrıntılı niyetler yükleme; ergenlerde sınır kişilik özellikleriyle ilişkilendirilmiştir."]
  ],
  stageFields: { labels: ["Bakımverenin katkısı", "Kazanım", "Klinikte geri dönüşü"], rows: [
    ["Bebeğin eylemlerine olumsal yanıt", "Faillik duygusu: 'Bir şey yapınca bir şey oluyor'", "Ağır ihmalde edilgenlik ve etkisizlik duygusu"],
    ["Amaca uygun, öngörülebilir yanıt; duygunun işaretli aynalanması", "Davranışı amaçla açıklama", "Teleolojik kip: 'Beni önemsiyorsan gece yarısı telefonu açarsın'"],
    ["Oyuna katılma: çocuğun 'mış gibi' dünyasını ciddiye alıp gerçeklikle bağlama", "İç dünya ile dış dünyanın ayrışmaya başlaması", "Psişik eşdeğerlik (paranoid kesinlik) ve 'mış gibi' kipi (boş konuşma)"],
    ["Çocuğun bakış açısını dile getirme, yanlış inançlar üzerine konuşma", "Düşüncenin bir temsil olduğunu ve yanılabileceğini anlama", "Temsili düzeyin bağlanma stresi altında çökmesi"],
    ["Duygusal olarak yüklü durumlarda merakı sürdüren bir yetişkin", "Karışık duyguları ve ikinci derece inançları anlama, kendi zihnine bakabilme", "Ergenlikte geçici dalgalanma; kişilik bozukluğunda ilişki içinde ani çöküşler"]
  ] },
  evolution: [
    [1991, "Bağlanma araştırması: ebeveynin yansıtıcı işlevi kuşaklararası aktarımın aracı olarak önerildi."],
    [1996, "Gelişimsel model: işaretli aynalama ve zihinselleştirme öncesi kipler tanımlandı."],
    [2004, "Klinik model: MBT bir el kitabına bağlandı; hedef, uyarılma yükseldiğinde kaybolan zihinselleştirmeyi geri kazanmak."],
    [2014, "Epistemik güven: bağlanma, toplumsal öğrenmeyi açan bir işaret olarak yeniden yorumlandı; kuram bireyden toplumsal iletişime kaydı."],
    [2017, "Genel psikopatoloji etkeniyle bağlantı: zihinselleştirme güçlüğü tanılar üstü bir kırılganlık olarak önerildi."]
  ],
  classic: { title: "Doğmadan önce öngörmek: Londra Ebeveyn-Çocuk Projesi",
    text: [
      "Fonagy, Steele ve Steele ilk çocuklarını bekleyen annelerle gebelikte Yetişkin Bağlanma Görüşmesi yaptı; bebekler bir yaşına geldiğinde Yabancı Durum'da değerlendirildi. Annenin doğumdan önce ölçülen bağlanma temsili, bebeğin bağlanma güvenliğini yaklaşık dörtte üç oranında doğru öngördü.",
      "Aynı görüşmeler yansıtıcı işlev açısından puanlandığında, zor bir çocukluk geçirmiş ama zihinsel durumlar üzerine düşünebilen annelerin bebeklerinin çoğunlukla güvenli bağlandığı görüldü. Bu bulgu, aktarılan şeyin deneyimin kendisi değil, deneyim üzerine düşünme biçimi olduğu savının dayanağı oldu."
    ],
    critique: [
      "Örneklem küçük ve orta sınıftı. Sonraki meta-analizler aktarımı doğruladı, ama etki büyüklüğü ilk çalışmalardakinden küçüktür (Verhage ve ark., 2016).",
      "Ebeveyn zihinselleştirmesinin duyarlılıktan bağımsız bir katkısı vardır, ancak ikisi birlikte bağlanma güvenliğindeki varyansın yalnızca %12'sini açıklar (Zeegers ve ark., 2017). Bebeklikte örtük zihin kuramı bulgularının yinelenememesi de gelişimsel zamanlamaya ilişkin savları temkinli okumayı gerektirir."
    ],
    exps: ["fonagy91", "verhage16", "zeegers17", "kulke18"] },
  vignette: { title: "Mesajına yanıt gelmeyince: on beş yaşında bir ergen",
    case: "On beş yaşında bir kız, yakın arkadaşı mesajını 'görüp' yanıtlamayınca birkaç dakika içinde 'Benden nefret ediyor, herkes benden nefret ediyor' sonucuna varıyor ve kolunu çiziyor. Ertesi gün olayı sakin bir sesle, kitaptan okur gibi 'Terk edilme şemam tetiklendi' diye anlatıyor; duygusu görüşme odasında yok.",
    classic: "Zihinselleştirme kuramına göre bağlanma stresi yükseldiğinde temsili düzey çökmüştür. Önce psişik eşdeğerlik: 'Nefret ediyor' düşüncesi bir olasılık değil gerçektir. Ardından teleolojik kip: dayanılmaz iç durum ancak bedende görünür bir eylemle değişir. Ertesi günkü anlatım 'mış gibi' kipidir: sözcükler doğru, duygu yok. Müdahale açıklama yapmak değil, çöküşten hemen önceki ana dönüp merakı yeniden kurmaktır: 'Mesajın görüldüğünü fark ettiğin anda içinden ne geçti?'",
    modern: "Güncel yaklaşım: kendine zarar verme ve intihar riski yapılandırılmış biçimde değerlendirilir, güvenlik planı yapılır. Ergenlerde kendine zarar vermede MBT-A, olağan tedaviye göre kendine zarar vermeyi ve depresyonu daha çok azaltmıştır (Rossouw ve Fonagy, 2012); DBT-A da kanıta dayalı bir seçenektir. Aile oturumlarında hedef, ebeveynin kendi uyarılması yükseldiğinde ergenin zihnini akılda tutabilmesidir." },
  misconceptions: [
    "Zihinselleştirme empatiyle aynı şey değildir: kişinin kendi zihnini anlamasını da kapsar ve duygusal olduğu kadar bilişseldir.",
    "'İyi zihinselleştiren' sabit bir özellik değildir; kapasite bağlama ve uyarılma düzeyine göre dalgalanır. Değerlendirme 'ne zaman çöküyor?' sorusunu sorar.",
    "Çok ve ayrıntılı psikolojik konuşma iyi zihinselleştirme göstergesi değildir; duygudan kopuksa 'mış gibi' kipidir.",
    "MBT'nin etkinliğinin gösterilmesi, iyileşmenin zihinselleştirme artışıyla gerçekleştiğini kanıtlamaz; mekanizma çalışmaları sınırlıdır.",
    "Epistemik güven her bilgiye inanmak değildir; sağlıklı gelişimde güven de tetikte olma da duruma göre ayarlanır."
  ],
  measures: [
    ["Yansıtıcı İşlev Ölçeği", "Yetişkin Bağlanma Görüşmesi dökümleri üzerinden puanlanır; eğitim ve güvenirlik çalışması gerektirir, emek yoğundur."],
    ["Ebeveyn Gelişim Görüşmesi (PDI)", "Ebeveynin çocuğu ve ilişkileri hakkındaki anlatısında yansıtıcı işlevi değerlendirir."],
    ["Yansıtıcı İşlev Anketi (RFQ)", "Kısa öz-bildirim ölçeği; kesinlik ve belirsizlik boyutlarını ölçer. Öz-bildirimle zihinselleştirmenin ne ölçüde ölçülebildiği tartışmalıdır."],
    ["Zihin odaklılık kodlaması", "Ebeveynin bebeğin iç durumlarına ilişkin uygun yorumlarının oyun gözleminden kodlanması (Meins)."],
    ["Sosyal Bilişi Değerlendirme Filmi (MASC)", "Film sahnelerindeki karakterlerin zihinsel durumlarını sorar; az, aşırı ve hatalı zihinselleştirmeyi ayırır."]
  ],
  exps: ["fonagy91", "bateman09", "zeegers17", "verhage16"] },

marcia: { ek: true,
  life: "James E. Marcia: 1937, Cleveland, Ohio",
  bio: [
    "Marcia klinik psikoloji doktorasını Ohio State Üniversitesi'nde yaptı. Erikson'un kimlik kavramının klinik olarak zengin ama ölçülmesi güç olduğunu görerek, doktora çalışmasında kimliği iki süreçle tanımlayan yarı yapılandırılmış bir görüşme geliştirdi: seçenekleri araştırma (ilk yazılarında 'kriz') ve bir seçime bağlanma. Meslek, din ve siyaset alanlarında bu iki sürecin varlığına göre dört kimlik statüsü tanımladı (1966).",
    "Akademik yaşamının büyük bölümünü Kanada'da Simon Fraser Üniversitesi'nde geçirdi; klinik uygulamayı da sürdürdü. Kimlik statüsü yaklaşımı, Erikson'un kuramını görgül araştırmaya açan en etkili girişim oldu ve yüzlerce çalışmaya temel sağladı. Sonraki kuşak araştırmacılar keşif ve bağlanmayı süreç olarak yeniden tanımlayan modeller geliştirdi."
  ],
  timeline: [[1937, "Cleveland'da doğum"], [1966, "Ego kimliği statüsünün geliştirilmesi ve geçerliği"], [1980, "'Ergenlikte kimlik' bölümü: statülerin kuramsal çerçevesi"], [1982, "Waterman: statüler arasında gelişimsel ilerleme varsayımları"], [1992, "Stephen, Fraser ve Marcia: yetişkinlikte moratoryum-başarı döngüleri"], [1993, "Ego Kimliği: Psikososyal Araştırma için El Kitabı"], [2006, "Luyckx ve ark.: bağlanmanın oluşumu ve değerlendirilmesi olarak çift döngü modeli"], [2008, "Crocetti, Rubini ve Meeus: üç etkenli süreç modeli; Luyckx: ruminatif keşif"], [2010, "Kroger, Martinussen ve Marcia: statü değişimi meta-analizi"]],
  concepts: [
    ["Keşif", "Anlamlı seçenekler arasında etkin arayış. Marcia'nın ilk yazılarında 'kriz' adıyla geçer; sıkıntı değil, seçenekleri tartma dönemi anlamındadır."],
    ["Bağlanma (adanma)", "Bir meslek, inanç ya da değer seçimine kişisel yatırım yapma ve ona göre davranma."],
    ["Kimlik dağınıklığı", "Keşif de bağlanma da yok. İki biçimi ayrılır: kaygısız, gündelik yaşayan dağınıklık ve sıkıntılı, yönsüz dağınıklık."],
    ["İpotekli kimlik", "Keşif olmadan bağlanma: ebeveynin ya da topluluğun seçimleri sorgulanmadan benimsenir. Kısa vadede kaygı düşüktür; seçim sarsıldığında kırılgandır."],
    ["Moratoryum", "Keşif sürüyor, bağlanma henüz yok. Kaygı en yüksek bu statüdedir; gelişim açısından en hareketli konumdur."],
    ["Başarılı kimlik", "Keşiften sonra kurulan bağlanma. Son durak değildir; yaşam olaylarıyla yeniden açılabilir."],
    ["MAMA döngüsü", "Yetişkinlikte moratoryum ve başarılı kimlik arasında yinelenen geçişler: her büyük yaşam değişikliği kimliği yeniden gözden geçirtir."],
    ["Ruminatif keşif", "Luyckx'in eklediği boyut: sonuca varmayan, yineleyen, kaygı yüklü arayış. Moratoryumun uyumsuz yanını yakalar."],
    ["Bağlanmayla özdeşleşme", "Verilen kararın kişiye ne kadar 'kendisi' gibi geldiği; yalnızca karar vermiş olmaktan farklıdır."]
  ],
  stageFields: { labels: ["Görüşmede nasıl duyulur", "Duygu durumu", "Klinikte dikkat"], rows: [
    ["'Bilmem, hiç düşünmedim'; seçenekler arasında fark gözetmeme", "Kayıtsız ya da boşluk duygusu", "Depresyon, madde kullanımı ve kişilik patolojisinde kimlik dağınıklığından ayırt edilmeli"],
    ["'Hep doktor olacağım söylendi'; seçeneklerden söz edilmez", "Düşük kaygı, yüksek uyum", "Sınavda başarısızlık ya da aileden ayrılma gibi sarsıntılarda ani çöküş"],
    ["'Şunu da düşünüyorum, bunu da'; artılar ve eksiler tartılır", "Yüksek kaygı, kararsızlık", "Normatif arayış ile ruminatif keşfi ve işlev kaybını ayırın"],
    ["'Şunları denedim, şu nedenle bunu seçtim'", "Görece dinginlik, esneklik", "Seçim yaşam olaylarıyla yeniden açılabilir; bu gerileme değildir"]
  ] },
  evolution: [
    [1966, "Dört statü: Erikson'un tek boyutlu 'kimlik-karmaşa' ekseni iki süreçle dörde bölündü."],
    [1982, "Gelişimsel varsayım: dağınıklık ve ipotekten moratoryum yoluyla başarıya doğru ilerleme beklenir."],
    [1992, "Yaşam boyu bakış: statüler evre değil, yeniden ziyaret edilen konumlardır."],
    [2008, "Süreç modelleri: keşif genişlemesine, derinlemesine ve ruminatif olarak; bağlanma karar ve özdeşleşme olarak ayrıştırıldı."],
    [2010, "Meta-analiz: ilerleme vardır ama yavaştır; genç yetişkinlerin önemli bir bölümü başarılı kimliğe ulaşmamıştır."]
  ],
  classic: { title: "Kimlik statüsü görüşmesi ve ilk geçerlik çalışması",
    text: [
      "Marcia üniversite öğrencileriyle meslek, din ve siyaset üzerine yarı yapılandırılmış görüşmeler yaptı ve her öğrenciyi keşif ile bağlanmanın varlığına göre dört statüden birine yerleştirdi. Ardından statülerin Erikson'un kuramından türetilen öngörülerle ilişkisini sınadı: stres altında kavram oluşturma görevindeki başarım, benlik saygısının olumsuz geribildirime dayanıklılığı, otoriter değerlere eğilim ve hedef belirleme.",
      "Statüler bu değişkenlerle anlamlı biçimde ilişkiliydi. Yöntem, klinik bir kavramın güvenilir biçimde kodlanabileceğini göstererek kimlik araştırmasının yolunu açtı."
    ],
    critique: [
      "İlk örneklem yalnızca erkek üniversite öğrencilerinden oluşuyordu; meslek, din ve siyaset alanları kadınların ve Batı dışı toplumların kimlik alanlarını (ilişkiler, aile rolleri) eksik temsil eder.",
      "Meta-analize göre boylamsal çalışmalarda gençlerin %36'sı ilerleyici, %15'i gerileyici değişim göstermiş, %49'u aynı statüde kalmıştır (Kroger ve ark., 2010). Statüler bir anın fotoğrafıdır; sürecin kendisini süreç modelleri daha iyi yakalar. İpotekli kimlik, toplulukçu bağlamlarda uyumlu ve doyumlu bir konum olabilir."
    ],
    exps: ["marcia66"] },
  vignette: { title: "'Hep doktor olacaktım': on sekiz yaşında bir genç",
    case: "On sekiz yaşında bir erkek, üniversite sınavında tıp fakültesini kazanamayınca yemek yemeyi ve odasından çıkmayı bırakıyor. İlkokuldan beri 'doktor olacak çocuk' olarak bilinmiş; ailede üç hekim var. 'Başka ne olabileceğimi hiç düşünmedim; şimdi kimim, bilmiyorum' diyor. Arkadaşları yeni bölümlerinden heyecanla söz ederken o yalnızca 'başaramadım' cümlesini yineliyor.",
    classic: "Kimlik statüsü açısından ipotekli kimlik sarsılmıştır: bağlanma keşiften geçmeden kurulduğu için, seçimin ortadan kalkması kimliğin kendisini ortadan kaldırmış gibi yaşanır. Görev, kaybın yasını tutarken ilk kez gerçek bir keşfe alan açmaktır: 'Doktorlukta seni çeken neydi?' sorusu, bağlanmanın içeriğini (yardım etmek, saygınlık, aileye aidiyet) seçimin kendisinden ayırır. Moratoryuma geçiş kaygıyı artırır; bu, kötüleşme değil hareketin işaretidir.",
    modern: "Güncel yaklaşım: depresif epizot ve intihar riski değerlendirilir; işlev kaybı varsa kanıta dayalı tedavi başlanır. Kimlik keşfi tedavinin yerine geçmez, onun içinde ilerler. Aileyle görüşmede, Kağıtçıbaşı'nın özerk-ilişkisel benlik kavramı yol göstericidir: gencin kendi seçimini yapması aileden kopması anlamına gelmez. Ruminatif keşif (sonuca varmayan 'ya şunu seçseydim') hedeflenir; küçük, denenebilir adımlar önerilir." },
  misconceptions: [
    "Statüler evre değildir: herkes dağınıklıktan başarıya doğru sırayla ilerlemez; geri dönüşler ve uzun süreli kalışlar olağandır.",
    "Başarılı kimlik bir varış noktası değildir; yetişkinlikte yeniden açılır.",
    "İpotekli kimlik her zaman sorunlu değildir; kaygısı düşük, uyumu yüksek bir konumdur. Risk, seçimin sarsıldığı anda ortaya çıkar.",
    "Kişi tek bir statüde değildir: meslek alanında başarılı, ilişki ya da inanç alanında dağınık olabilir.",
    "Moratoryumdaki kaygı patoloji değildir; ancak ruminatif keşif ve işlev kaybı eşlik ediyorsa değerlendirme gerekir."
  ],
  measures: [
    ["Kimlik Statüsü Görüşmesi", "Marcia'nın yarı yapılandırılmış görüşmesi; alan alan keşif ve bağlanmayı değerlendirir. Eğitim gerektirir."],
    ["Genişletilmiş Ego Kimlik Statüleri Ölçeği (EOM-EIS)", "Statüleri ideolojik ve kişilerarası alanlarda ölçen öz-bildirim ölçeği."],
    ["Ego Kimliği Süreç Anketi (EIPQ)", "Keşif ve bağlanmayı iki sürekli boyut olarak ölçer."],
    ["Kimlik Gelişiminin Boyutları Ölçeği (DIDS)", "Beş boyut: bağlanma kararı, bağlanmayla özdeşleşme, genişlemesine, derinlemesine ve ruminatif keşif."],
    ["Utrecht Kimlik Bağlanmalarını Yönetme Ölçeği (U-MICS)", "Bağlanma, derinlemesine keşif ve bağlanmayı yeniden gözden geçirme boyutları."]
  ],
  exps: ["marcia66", "icenogle19"] },

mizac: { ek: true,
  life: "Alexander Thomas (1914-2003) ve Stella Chess (1914-2007) · Jerome Kagan (1929-2021) · Mary K. Rothbart (d. 1940)",
  bio: [
    "Psikiyatrist Thomas ve Chess, çocuk sorunlarının yalnızca ebeveyn tutumuyla açıklandığı bir dönemde, 1956'da New York Boylamsal Çalışması'nı başlattı. Bebekleri erken aylardan yetişkinliğe izleyerek dokuz mizaç boyutu ve üç mizaç örüntüsü tanımladılar. En kalıcı katkıları 'uyumun iyiliği' kavramıdır: sonucu belirleyen çocuğun mizacı değil, mizaç ile çevrenin beklentileri arasındaki uyumdur.",
    "Kagan mizacı gözlem ve fizyolojiyle çalıştı: yabancı kişi ve nesnelere karşı çekingenliği 'davranışsal ketlenme' olarak tanımladı ve dört aylık bebeklerde yeni uyaranlara tepkiselliğin sonraki ketlenmeyi öngördüğünü gösterdi. Rothbart mizacı tepkisellik ve öz-düzenlemedeki yapısal bireysel farklar olarak tanımladı; bebeklikten ergenliğe uzanan ölçekleri ve 'çaba gerektiren kontrol' kavramı, mizacı dikkat ve yürütücü işlev araştırmalarına bağladı."
  ],
  timeline: [[1956, "New York Boylamsal Çalışması başladı"], [1968, "Thomas, Chess ve Birch: Çocuklarda Mizaç ve Davranış Bozuklukları"], [1977, "Mizaç ve Gelişim: uyumun iyiliği"], [1981, "Rothbart: Bebek Davranış Anketi; tepkisellik ve öz-düzenleme modeli"], [1984, "Kagan ve ark.: yabancıya karşı davranışsal ketlenme"], [1987, "'Mizaç nedir?' yuvarlak masası: dört yaklaşım"], [1988, "Kagan, Reznick ve Snidman: çocukluk çekingenliğinin biyolojik temelleri"], [2001, "Çocuk Davranış Anketi: üç üst etken"], [2003, "Schwartz ve ark.: ketlenmiş çocukların yetişkinlikte amigdala yanıtı"], [2020, "Tang ve ark.: 14. aydaki ketlenmenin 26 yaştaki sonuçları"]],
  concepts: [
    ["Dokuz boyut", "Etkinlik düzeyi, ritmiklik, yaklaşma ya da çekilme, uyum sağlama, tepki eşiği, tepki yoğunluğu, duygudurumun niteliği, dikkatin dağılabilirliği, dikkat süresi ve sebat (Thomas ve Chess)."],
    ["Kolay, zor ve yavaş ısınan çocuk", "Üç örüntü; çocukların yaklaşık üçte biri hiçbirine uymaz. 'Zor' sözcüğü çocuğu değil, bakımın gerektirdiği emeği anlatır."],
    ["Uyumun iyiliği", "Çocuğun özellikleri ile çevrenin talep ve beklentilerinin örtüşmesi. Müdahalenin hedefi çocuğun mizacını değil, uyumu değiştirmektir."],
    ["Davranışsal ketlenme", "Yabancı kişi, nesne ve durumlar karşısında çekingenlik, susma ve bakımverene yaklaşma eğilimi (Kagan). Sosyal kaygı bozukluğu için en iyi belgelenmiş erken risk etkenlerindendir."],
    ["Yüksek tepkisellik", "Dört aylık bebeğin yeni uyaranlara yoğun hareket ve ağlamayla yanıt vermesi; sonraki ketlenmeyi öngörür."],
    ["Tepkisellik ve öz-düzenleme", "Rothbart'ın tanımı: uyarılmanın ne kadar çabuk ve yoğun ortaya çıktığı ile onu ayarlayan süreçler."],
    ["Çaba gerektiren kontrol", "Baskın tepkiyi bastırıp daha uygun olanı seçme, dikkati isteyerek yönlendirme. Okul öncesinde hızla gelişir; yürütücü dikkat ağına dayanır."],
    ["Üç üst etken", "Dışa dönüklük ve coşkunluk, olumsuz duygulanım, çaba gerektiren kontrol (Rothbart). Yetişkin kişilik boyutlarıyla örtüşür."],
    ["Ayırıcı duyarlılık", "Tepkiselliği yüksek çocukların yalnızca olumsuz ortamdan daha çok zarar görmediği, destekleyici ortamdan da daha çok yararlandığı görüşü."]
  ],
  stageFields: { labels: ["Gözlenen", "Ebeveynin görevi", "Klinikte dikkat"], rows: [
    ["Ağlamanın yoğunluğu, yatışabilirlik, uyku ve beslenme düzeni", "Bebeğin ritmini tanımak, kendi beklentisini ona göre ayarlamak", "Aşırı ağlamada ebeveyn tükenmişliği ve depresyonu; 'zor bebek' etiketinin ilişkiye etkisi"],
    ["Yabancıya ve yeni duruma çekingenlik ya da atılganlık", "Kaçınmaya izin vermeden, basamak basamak alıştırmak", "Ketlenmiş çocukta aşırı koruyucu ebeveynlik kaygı riskini artırır"],
    ["Bekleyebilme, kuralı akılda tutma, öfkeyi yatıştırma", "Yapı ve tutarlılık; öz-düzenlemeyi oyunla çalıştırmak", "DEHB ve davranım sorunlarında düşük çaba gerektiren kontrol; mizaç tanı değildir"],
    ["Kişilik özelliklerine dönüşüm; ilgi alanı ve çevre seçimi", "Çocuğun özelliklerine uygun ortam ve uğraş bulmasına eşlik etmek", "Mizaç yazgı değildir: ketlenmiş çocukların çoğu kaygı bozukluğu geliştirmez"]
  ] },
  evolution: [
    [1956, "Betimleme: klinik görüşmelerden dokuz boyut ve üç örüntü."],
    [1981, "Yapı: etken analiziyle daha az sayıda, yaşlar arasında karşılaştırılabilir boyut."],
    [1984, "Biyoloji: gözlem, kalp atım hızı ve kortizolle ölçülen ketlenme; sonra amigdala görüntülemesi."],
    [1997, "Etkileşim: mizaç ile ebeveynliğin birlikte etkisi; ayırıcı duyarlılık görüşü."],
    [2020, "Yaşam boyu: bebeklikte gözlenen mizacın yetişkin kişiliği ve psikopatolojisiyle bağlantısı."]
  ],
  classic: { title: "New York Boylamsal Çalışması",
    text: [
      "Thomas ve Chess, bebeklerin ilk aylardan başlayarak gündelik durumlardaki davranışlarını ebeveyn görüşmeleriyle ayrıntılı biçimde kaydetti ve çocukları yetişkinliğe kadar izledi. Çocukların yaklaşık %40'ı kolay, %10'u zor, %15'i yavaş ısınan olarak sınıflandı; geri kalanı bu örüntülere uymadı.",
      "Zor mizaçlı çocuklarda davranış sorunları daha sıktı, ancak belirleyici olan ebeveynin çocuğun özelliklerine nasıl yanıt verdiğiydi. Çalışma, 'buzdolabı anne' türünden tek yönlü açıklamalara karşı çocuğun kendi katkısını gündeme getirdi."
    ],
    critique: [
      "Örneklem New York'lu, eğitimli, orta sınıf ailelerden oluşuyordu ve veriler büyük ölçüde ebeveyn anlatısına dayanıyordu; ebeveynin algısı çocuğun mizacıyla karışır.",
      "Dokuz boyutun bir bölümü sonraki etken analizlerinde ayrışmadı. Mizaç ile bağlanma arasındaki ilişki küçüktür: olumsuz duygulanım dirençli bağlanma olasılığını az da olsa artırır (Dagan ve ark., 2024). Hazzı ertelemenin uzun dönem öngörü gücü de aile ortamı kontrol edildiğinde belirgin biçimde azalır (Watts ve ark., 2018)."
    ],
    exps: ["kagan03", "tang20", "dagan24", "watts18"] },
  vignette: { title: "Anaokulunda kapıdan ayrılamayan dört yaşında bir çocuk",
    case: "Dört yaşında bir kız, anaokulunun ikinci ayında hâlâ annesinin bacağına yapışarak sınıfa giriyor, ilk saatte oyuna katılmıyor, öğretmenle fısıltıyla konuşuyor. Evde konuşkan ve neşeli. Bebekken yeni yiyeceklere ve yabancılara uzun süre alışamamış. Annesi 'Zorlamak istemiyorum, o hassas' diyor ve ağladığı günlerde çocuğu okula götürmüyor; babası 'Şımartıyorsun' diye karşı çıkıyor.",
    classic: "Mizaç kuramına göre tablo davranışsal ketlenmedir ve çocuğun bir özelliğidir, ebeveynin hatası değil. Sorun uyumdadır: annenin koruyuculuğu kaçınmayı pekiştirmekte, babanın sabırsızlığı çocuğun eşiğini aşmaktadır. Thomas ve Chess'in önerisi, çocuğun temposunu kabul edip talebi kaldırmadan basamaklandırmaktır: okula her gün gidilir, ayrılık kısa ve öngörülebilir tutulur, sınıfta önce tek bir çocukla oyun kurulur.",
    modern: "Güncel yaklaşım: seçici dilsizlik ve ayrılık kaygısı bozukluğu yönünden değerlendirilir. Ketlenmiş okul öncesi çocuklarda ebeveyne yönelik kısa eğitim programları (aşırı korumayı azaltma, basamaklı yüzleştirme) sonraki kaygı bozukluğu sıklığını azaltmıştır. Bebeklikteki ketlenme yetişkinlikte içe dönüklük ve içe yönelim belirtileriyle ilişkilidir (Tang ve ark., 2020), ancak etki orta düzeydedir: çoğu ketlenmiş çocuk bozukluk geliştirmez." },
  misconceptions: [
    "Mizaç değişmez değildir; biyolojik temellidir ama olgunlaşma ve deneyimle biçimlenir.",
    "'Zor mizaç' tanı değildir ve ebeveyni aklamak ya da suçlamak için kullanılmaz; hedef uyumdur.",
    "Ketlenme utangaçlıkla aynı değildir: ketlenme yeniliğe verilen tepkidir, utangaçlık toplumsal değerlendirilme kaygısını içerir.",
    "Mizaç ölçekleri çocuğu olduğu kadar ebeveynin algısını da ölçer; mümkünse gözlemle desteklenir.",
    "Yüksek tepkisellik yalnızca risk değildir; destekleyici ortamda bu çocuklar ortalamanın üzerinde yararlanabilir."
  ],
  measures: [
    ["Rothbart ölçekleri", "Bebek Davranış Anketi (IBQ-R), Erken Çocukluk Davranış Anketi (ECBQ), Çocuk Davranış Anketi (CBQ) ve erken ergenlik formu; ebeveyn bildirimine dayanır."],
    ["Laboratuvar Mizaç Değerlendirme Bataryası (Lab-TAB)", "Standart durumlarda (yabancı yaklaşımı, engellenme, bekleme) gözlemle kodlama."],
    ["Davranışsal Ketlenme Anketi (BIQ)", "Okul öncesinde ketlenmenin ebeveyn ve öğretmen bildirimiyle taranması."],
    ["Hazzı erteleme ve engelleyici kontrol görevleri", "Çaba gerektiren kontrolün davranışsal ölçümü; tek ölçümün öngörü gücü sınırlıdır."],
    ["Uyum görüşmesi", "Ölçek değil, klinik araç: çocuğun özellikleri ile ailenin ve okulun beklentilerinin nerede çatıştığının sorulması."]
  ],
  exps: ["kagan03", "tang20", "moffitt11", "dagan24"] },

kagitcibasi: { ek: true,
  life: "Çiğdem Kağıtçıbaşı: 29 Ocak 1940, İstanbul – 2 Mart 2017, İstanbul",
  bio: [
    "Kağıtçıbaşı lisans eğitimini Wellesley College'da, sosyal psikoloji doktorasını Kaliforniya Üniversitesi, Berkeley'de tamamladı. Türkiye'ye dönerek Orta Doğu Teknik Üniversitesi ve Boğaziçi Üniversitesi'nde, 1995'ten sonra Koç Üniversitesi'nde çalıştı. İlk uluslararası yayınından başlayarak psikolojinin Batılı, eğitimli, orta sınıf örneklemlerden çıkan bulgularının evrensel sayılmasını sorguladı.",
    "1970'lerde dokuz ülkeli Çocuğun Değeri araştırmasının Türkiye ayağını yürüttü; bu veriler aile değişimi kuramının temeli oldu. 1980'lerde Sevda Bekman ve Diane Sunar ile İstanbul'un düşük gelirli mahallelerinde Türkiye Erken Destek Projesi'ni gerçekleştirdi; Anne-Çocuk Eğitim Programı ve Anne Çocuk Eğitim Vakfı bu projeden doğdu. Kuramı ile uygulamayı birleştirmesi, 'çoğunluk dünyası' psikolojisinin öncülerinden biri sayılmasını sağladı."
  ],
  timeline: [[1940, "İstanbul'da doğum"], [1967, "Berkeley'de sosyal psikoloji doktorası"], [1975, "Çocuğun Değeri araştırmasının Türkiye verisi"], [1982, "Türkiye Erken Destek Projesi başladı (1986'ya kadar)"], [1993, "Anne Çocuk Eğitim Vakfı kuruldu"], [1996, "Kültürler Arasında Aile ve İnsan Gelişimi"], [2005, "Kültürel bağlamda özerklik ve ilişkisellik; Çocuğun Değeri'nin otuz yıl sonraki yinelemesi"], [2007, "Kitabın ikinci baskısı: Kültürler Arasında Aile, Benlik ve İnsan Gelişimi"], [2009, "Erken Destek Projesi'nin 22 yıllık izlemi"], [2017, "Kültürel mercekle psikoloji yapmak: yarım yüzyıllık yolculuk"]],
  concepts: [
    ["Çocuğun değeri", "Ebeveynin çocuktan beklentisi: ekonomik ve yaşlılık güvencesi değeri (yararcı) ya da sevgi ve yakınlık (psikolojik). Sosyoekonomik gelişmeyle birincisi azalır, ikincisi artar."],
    ["Karşılıklı bağımlılık aile modeli", "Kırsal, geleneksel bağlam: kuşaklar arasında hem maddi hem duygusal bağımlılık; itaat yönelimli çocuk yetiştirme."],
    ["Bağımsızlık aile modeli", "Batılı kentli orta sınıf bağlamı: kuşaklar arasında maddi ve duygusal ayrışma; erken özerklik ve kendine yeterlik hedefi."],
    ["Duygusal karşılıklı bağımlılık aile modeli", "Kentleşen çoğunluk dünyası: maddi bağımlılık azalır, duygusal bağ sürer. Çocuk yetiştirmede denetim ile özerkliğe destek bir arada bulunur."],
    ["Eylemlilik boyutu", "Özerklikten bağımlılığa (başkasının yönetimine) uzanır: kişinin kendi kararlarını kendisinin verip vermediği."],
    ["Kişilerarası mesafe boyutu", "İlişkisellikten ayrıklığa uzanır: kişinin kendini başkalarına ne kadar bağlı tanımladığı. Eylemlilikten bağımsız bir boyuttur."],
    ["Özerk-ilişkisel benlik", "Hem kendi kararını veren hem yakın ilişkiler içinde olan benlik; iki temel gereksinimin (özerklik ve ilişkisellik) birlikte doyurulduğu bireşim."],
    ["Çoğunluk dünyası", "Dünya nüfusunun çoğunluğunu oluşturan, Batı dışı toplumlar için önerdiği terim; 'gelişmekte olan' nitelemesine seçenek."],
    ["Bağlamsal-işlevsel yaklaşım", "Davranışı içinde yer aldığı bağlamdaki işleviyle açıklama: aynı ebeveyn denetimi farklı bağlamlarda farklı anlam taşır."]
  ],
  stageFields: { labels: ["Karşılıklı bağımlılık modelinde", "Bağımsızlık modelinde", "Duygusal karşılıklı bağımlılık modelinde"], rows: [
    ["İtaat ve aileye sadakat; çocuğun katkısı beklenir", "Erken özerklik, kendi kendine yetme", "Sıcaklık ve denetim birlikte; özerkliğe yer açılır"],
    ["Çocuk aile ekonomisine katkıda bulunur; eğitim ikincil", "Bireysel başarı ve rekabet", "Eğitime yüksek yatırım; çocuğun psikolojik değeri öne çıkar"],
    ["Aile kararlarına uyum; ayrışma sadakatsizlik sayılır", "Aileden ayrışma olgunluk ölçütüdür", "Kendi kararını veren ama yakınlığı sürdüren genç"],
    ["Yaşlı ebeveyn yetişkin çocuğa maddi olarak bağımlıdır", "Kuşaklar ayrı yaşar; bakım kurumlara devredilir", "Maddi bağımsızlık, süren duygusal bağ ve bakım sorumluluğu"]
  ] },
  evolution: [
    [1975, "Çocuğun Değeri: doğurganlık kararlarının ardındaki beklentiler; aile modellerinin ilk ayrımı."],
    [1990, "Aile değişimi kuramı: modernleşme kuramının öngördüğü 'bağımsızlığa yakınsama' yerine üçüncü bir model."],
    [1996, "Benlik: özerklik ve ilişkiselliğin iki ayrı boyut olduğu savı; özerk-ilişkisel benlik."],
    [2005, "Görgül sınama: otuz yıl sonraki yineleme ve benlik ölçekleri; kuramın göçmen ailelere uygulanması."],
    [2009, "Uygulama: erken destek programının yetişkinliğe uzanan etkileri; politika önerileri."]
  ],
  classic: { title: "Türkiye Erken Destek Projesi",
    text: [
      "Proje 1982'de İstanbul'un düşük gelirli mahallelerinde başladı. Üç-beş yaşındaki çocuklar eğitsel kreşte, bakım odaklı kreşte ya da evde bakım koşulunda izlendi; annelerin bir bölümüne iki yıl süren bir anne eğitimi verildi. Program, çocuğun bilişsel gelişimini destekleyen etkinlikleri ve anneler arasında grup tartışmalarını içeriyordu.",
      "İzlemlerde anne eğitimi alan ve eğitsel okul öncesi deneyimi olan çocukların okulda kalma süresi ve başarısı daha iyiydi. Yirmi iki yıl sonraki izlemde bu gruplar daha yüksek eğitim düzeyi ve mesleki statü gösterdi. Proje, Anne-Çocuk Eğitim Programı'na dönüşerek yaygınlaştı."
    ],
    critique: [
      "Gruplar tam olarak randomize edilmemişti ve uzun izlemde kayıp vardı; etkilerin büyüklüğü bu nedenle temkinli okunmalıdır.",
      "Benzer bir sonuç Jamaika'da randomize bir çalışmada, 31 yaş izleminde gösterilmiştir (Walker ve ark., 2022). Aile modelleri ideal tiplerdir; aynı toplumda, hatta aynı ailede birden çok model bir arada bulunabilir. Özerk-ilişkisel benlik ölçümleri öz-bildirime dayanır."
    ],
    exps: ["tedp09", "kagitcibasi05", "walker22", "ertem18"] },
  vignette: { title: "'Ya biz ya o şehir': on yedi yaşında bir genç ve ailesi",
    case: "On yedi yaşında bir kız, başka bir şehirde mimarlık okumak istiyor. Ailesi yaşadıkları şehirdeki üniversitede kalmasını istiyor: 'Biz ona hiçbir şeyi yasaklamadık, ama uzakta ne yapar?' Genç iki aydır ailesiyle konuşmuyor, uykusu bozulmuş, 'İstediğimi yaparsam onları kaybedeceğim, yapmazsam kendimi' diyor. Önceki görüşmede kendisine 'ailenden ayrışman gerekiyor' dendiğini, annesine ise 'bırakın kendi kararını versin' dendiğini anlatıyor.",
    classic: "Aile değişimi kuramına göre çatışma, özerklik ile yakınlığın zıt sayılmasından doğmaktadır. Aile, duygusal karşılıklı bağımlılık modelindedir: kızlarının eğitimine yatırım yapmış, kararlarına alan açmıştır; korkuları denetimi yitirmek değil, bağı yitirmektir. 'Ayrışma' dili bu korkuyu doğrular. Formülasyon iki boyutu ayırır: genç eylemlilikte özerklik istemektedir, kişilerarası mesafede ayrıklık değil. Görüşmenin sorusu 'gitmek mi kalmak mı' değil, 'giderse bağ nasıl sürer' olur.",
    modern: "Güncel yaklaşım: depresif belirtiler ve uyku ayrıca değerlendirilir. Aile görüşmesinde özerkliğe destek ile sıcaklığın birlikte bulunmasının ergen uyumuyla ilişkili olduğu aktarılır; karar süreci somut düzenlemelere (iletişim sıklığı, ziyaretler, ilk dönemin birlikte planlanması) çevrilir. Klinisyen, Batı örneklemlerinden gelen 'ayrışma' ölçütünü olduğu gibi uygulamadığını aileye açıkça söyleyebilir; bu, ittifakı güçlendirir." },
  misconceptions: [
    "Özerk-ilişkisel benlik 'iki uç arasında orta yol' değildir; iki ayrı boyutun ikisinde de yüksek olmaktır.",
    "Kuram toplulukçuluğu övmez, bireyciliği yermez; her iki gereksinimin de temel olduğunu ve bağlamın hangisini beslediğini söyler.",
    "Ebeveyn denetimi her bağlamda aynı anlamı taşımaz: sıcaklıkla birlikte olduğunda reddedilme olarak algılanmayabilir. Bu, sert disiplinin savunusu değildir.",
    "Aile modelleri ülkeleri değil bağlamları tanımlar; Türkiye'de üç model de bir arada görülür.",
    "Modernleşme her toplumu Batı'daki bağımsızlık modeline götürmez; kuramın temel savı budur."
  ],
  measures: [
    ["Özerk Benlik, İlişkisel Benlik ve Özerk-İlişkisel Benlik ölçekleri", "Kağıtçıbaşı'nın geliştirdiği kısa öz-bildirim ölçekleri; iki boyutu ayrı ayrı ve birlikte ölçer."],
    ["Çocuğun Değeri soru formu", "Ebeveynin çocuk sahibi olma nedenlerini ve çocuktan beklentilerini (ekonomik, psikolojik, toplumsal) sorar."],
    ["Aile modeli göstergeleri", "Kuşaklararası maddi ve duygusal bağımlılık, itaat ve özerklik beklentileri; araştırma amaçlı ölçümler."],
    ["Anne-Çocuk Eğitim Programı", "Ölçme aracı değil, kuramdan türeyen uygulama: okul öncesi çocuğu olan annelere yönelik grup programı."]
  ],
  exps: ["tedp09", "kagitcibasi05", "ertem18", "walker22"] }
});
