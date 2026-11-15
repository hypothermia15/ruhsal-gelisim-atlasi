/* Uyarlamada eklenen eğitim vakaları (Usta, 2026): özgün atlasta vakası olmayan üç yaş dönemi için
   (orta ergenlik, erken yetişkinlik, orta yetişkinlik). Vakalar kurgusaldır; gerçek kişilerle ilgisi yoktur.
   Biçim özgün vakalarla aynıdır; her vaka ek: true ile işaretlidir. */
ATLAS.cases.push(
{ id: "yeme16", ek: true, age: 16.7, ageLabel: "16 yaş 8 ay", band: "a9", tags: ["Yeme bozukluğu", "Ergenlik", "Aile temelli tedavi"],
  title: "On altı yaşında: 'Sadece sağlıklı besleniyorum'",
  ask: "Lise üçüncü sınıf öğrencisi, 16 yaş 8 aylık kız; son altı ayda belirgin kilo kaybı ve adet düzensizliği nedeniyle çocuk hekimi tarafından yönlendirilmiş. Kendisi 'Bir sorunum yok, sadece sağlıklı besleniyorum' diyor.",
  steps: [
    { h: "Başvuru", text: "Annesi, kızının altı ay önce 'spor salonu için' beslenmesini değiştirdiğini, önce tatlıyı, sonra ekmeği ve yağı bıraktığını, artık aileyle sofraya oturmadığını anlatıyor. Okul başarısı çok iyi; son aylarda ders çalışma süresi daha da artmış. Genç görüşmeye isteksiz geliyor: 'Annem abartıyor.'",
      q: "Görüşmenin ilk on dakikasında hangi bilgi, sonraki bütün adımların aciliyetini belirler?" },
    { h: "Öykü", text: "Her gün koşuyor; koşamadığı günlerde huzursuz oluyor ve yediğini azaltıyor. Tartıya günde birkaç kez çıkıyor. Üç aydır adet görmüyor. Üşüme, baş dönmesi ve saç dökülmesi var. Kusma, müshil ya da idrar söktürücü kullanımını reddediyor. 'Karnım düz olmazsa kendimi iğrenç hissediyorum' diyor; arkadaşlarıyla dışarıda yemek yemeyi bırakmış.",
      q: "Kısıtlayıcı yeme ile 'sağlıklı beslenme' ilgisini ayıran öykü özellikleri hangileri?" },
    { h: "Görüşme ve muayene", text: "Ölçülü, düzgün konuşan, ayrıntıcı bir genç. Duygulanımı kısıtlı; yemek konusu açılınca gerginleşiyor. Bedenini olduğundan iri algılıyor. Ölüm düşüncesi yok. Annesi dışarıda ağlıyor: 'Zorlarsam hiç yemiyor, zorlamazsam eriyor.' Çocuk hekiminin notunda nabzın yavaş, ayağa kalkınca tansiyonun düştüğü yazıyor.",
      q: "Ailenin içine düştüğü ikilemi nasıl adlandırır ve nasıl yanıtlarsınız?" },
    { h: "Ek bilgi", text: "Ortaokulda 'en çalışkan öğrenci' ödülleri almış; hata yapmaya dayanamayan, kuralcı bir çocukmuş. Altı ay önce bir sınıf arkadaşının görünüşüyle ilgili bir sözü olmuş. Akışında ağırlıklı olarak spor ve diyet içerikleri var. Teyzesinde gençlikte benzer bir dönem tanımlanıyor.",
      q: "Yatkınlaştıran, başlatan ve sürdüren etkenleri ayırın: hangisi tedavinin hedefidir?" }
  ],
  findings: [
    ["Görünüşe ilgi ve bedenle uğraş", "norm", "Orta ergenlikte beden imgesiyle uğraş yaygındır; tek başına patoloji göstermez."],
    ["Yüksek başarı ve mükemmeliyetçilik", "izle", "Yatkınlaştırıcı bir mizaç özelliği olabilir; ödüllendirildiği için gözden kaçar."],
    ["Altı ayda belirgin kilo kaybı", "bayrak", "Büyüme çağında kilo kaybı, hatta beklenen kilo alımının durması bile değerlendirme gerektirir."],
    ["Üç aydır adet görmeme", "bayrak", "Enerji açığının göstergesidir; DSM-5-TR tanı ölçütü olmaktan çıkmıştır ama tıbbi önemini korur."],
    ["Yavaş nabız, ortostatik tansiyon düşüklüğü", "bayrak", "Tıbbi dengesizlik göstergeleridir; ayaktan mı yatarak mı izleneceğini bunlar belirler."],
    ["Koşamayınca huzursuzluk ve yediğini azaltma", "bayrak", "Zorlantılı egzersiz, telafi edici davranıştır."],
    ["Aile sofrasından ve arkadaş yemeklerinden çekilme", "bayrak", "Toplumsal işlevsellikteki daralma hastalığın yaşamı örgütlemeye başladığını gösterir."],
    ["'Bir sorunum yok'", "izle", "İçgörü azlığı hastalığın parçasıdır; iş birliğini ebeveyn üzerinden kurmak gerekir."]
  ],
  lenses: [
    ["afreud", "Anna Freud ergenliğe özgü iki savunma tanımladı: çilecilik ve entelektüelleştirme. Bedensel isteklerin topyekûn reddi dürtü artışına karşı bir güvenlik sağlar; bu vakada çilecilik yemeği, dinlenmeyi ve hazzı kapsayacak biçimde yayılmıştır.", 7],
    ["erikson", "Kimlik ve rol karmaşası: 'disiplinli, sağlıklı beslenen kişi' kimliği, belirsizliğe karşı hazır bir yanıt sunar. Hastalığın kimlikle kaynaşması iyileşmeyi bir kayıp gibi yaşatır; tedavi hastalığı kişiden ayırarak konuşur.", 4],
    ["fonagy", "Stres altında zihinselleştirme öncesi kiplere dönüş: 'Kendimi şişman hissediyorum' duygusu bedenin gerçeği olarak yaşanır (psişik eşdeğerlik); değer ancak tartıdaki sayıyla kanıtlanır (teleolojik kip).", 4],
    ["mizac", "Yüksek olumsuz duygulanım ve çaba gerektiren kontrolün birleşimi, mükemmeliyetçi ve katı bir kişilik örüntüsüne dönüşebilir. Aynı özellikler okulda ödül getirir; 'uyumun iyiliği' ancak beklentiler esnetildiğinde sağlanır.", 3],
    ["kagitcibasi", "Özerk-ilişkisel benlik: ebeveynin beslenmenin sorumluluğunu geçici olarak üstlenmesi özerkliğin ihlali değil, ilişki içinde özerkliğe dönüşün yoludur. Aile temelli tedavinin mantığı duygusal karşılıklı bağımlılık modeliyle örtüşür.", 2],
    ["ikilisistem", "Ergenlikte ödül duyarlılığı yüksektir; bu vakada ödül yemekten değil kısıtlamayı başarmaktan ve tartıdaki sayıdan alınır. Açlık bilişsel esnekliği daha da azaltarak döngüyü sürdürür.", 1]
  ],
  brain: { regions: ["hypothalamus", "striatum", "acc", "dlpfc"],
    text: "Enerji açığında hipotalamus üreme eksenini baskılar; adet kesilmesi bunun sonucudur. Yeme bozukluklarında ödül ve alışkanlık devrelerinin (striatum) ve bilişsel denetimin rolü üzerinde durulur; ancak görüntüleme bulgularının ne kadarının yatkınlığı, ne kadarının açlığın sonucunu yansıttığı ayrılamamıştır. Açlığın kendisi düşüncede katılığı ve yemekle uğraşı artırır; bu nedenle beslenmenin düzelmesi psikoterapinin ön koşuludur." },
  ddx: [
    ["Anoreksiya nervoza, kısıtlayıcı tür", "DSM-5-TR", "Enerji alımının kısıtlanması ve belirgin düşük kilo, kilo almaktan yoğun korku, beden algısında bozulma; kusma ya da müshil kullanımı yok.", "Şiddet belirleyicisi beden kitle indeksi persentiline göre yapılır. Adet görmeme DSM-5-TR'de ölçüt değildir."],
    ["Kaçıngan/kısıtlayıcı yiyecek alımı bozukluğu", "DSM-5-TR", "Kilo kaybı ve kısıtlı yeme.", "Beden algısı bozukluğu ve kilo alma korkusu bu tanıda bulunmaz; burada ikisi de belirgin."],
    ["Majör depresif bozukluk", "DSM-5-TR", "Toplumsal çekilme, kısıtlı duygulanım, iştah değişikliği.", "Kilo kaybı amaçlı ve çaba gerektiriyor; açlığın kendisi depresif belirtilere yol açar. Beslenme düzeldikten sonra yeniden değerlendirilmeli."],
    ["Obsesif kompulsif bozukluk", "DSM-5-TR", "Kuralcılık, tartılma törenleri, zorlantılı egzersiz.", "Uğraşlar yemek ve bedenle sınırlıysa ek tanı konmaz; başka alanlarda obsesyon ve kompulsiyon ayrıca sorulmalı."],
    ["Tıbbi nedenler", "Tıbbi", "Kilo kaybı, adet düzensizliği, üşüme.", "Hipertiroidi, çölyak hastalığı, inflamatuvar bağırsak hastalığı ve tip 1 diyabet dışlanmalı; beden algısı bozukluğu bu durumlarda beklenmez."],
    ["Sporcularda görece enerji eksikliği", "Tanı değil", "Yoğun egzersiz ve adet kesilmesi.", "Kilo alma korkusu ve beden algısı bozukluğu yoksa düşünülür; burada egzersiz telafi amaçlı."]
  ],
  tools: [
    ["SCOFF", "Beş soruluk kısa tarama anketi; birinci basamak ve okul sağlığı için geliştirilmiştir (Morgan ve ark., 1999). Tanı koymaz, ileri değerlendirme gereğini gösterir."],
    ["Büyüme eğrisi", "Önceki boy ve kilo ölçümleriyle kişinin kendi eğrisinden sapmasına bakılır; tek bir ölçüm yanıltabilir. Türk çocukları için referans değerler vardır (Neyzi ve ark., 2015)."],
    ["Tıbbi değerlendirme", "Yatarak ve ayakta nabız ve tansiyon, vücut ısısı, EKG, elektrolitler. Yatış kararı kurumun protokolüne ve güncel kılavuzlara göre çocuk hekimiyle birlikte verilir."],
    ["Yeme Bozuklukları Değerlendirme Ölçeği (EDE-Q)", "Kısıtlama, yeme, beden biçimi ve kilo kaygılarını ölçen öz-bildirim ölçeği; izlemde kullanılır."],
    ["K-SADS-PL DSM-5", "Eş tanıların (depresyon, kaygı bozuklukları, OKB) yapılandırılmış değerlendirmesi."],
    ["Medya öyküsü", "Akışta diyet ve görünüş odaklı içeriğin payı ve karşılaştırma eğilimi sorulur; sitedeki 'Dijital Çağda Gençlik' rehberinde ayrıntısı vardır."]
  ],
  plan: [
    "Önce tıbbi güvenlik: yaşamsal bulgular ve laboratuvar sonuçlarına göre izlem yeri çocuk hekimiyle birlikte belirlenir. Yeniden beslenme döneminde tıbbi izlem sürer.",
    "Aile temelli tedavi ilk seçenektir: 12-18 yaşındaki 121 ergenle yapılan randomize çalışmada tedavi sonunda tam düzelme oranları ergen odaklı bireysel terapiyle benzerdi, ancak 6. ve 12. ay izlemlerinde aile temelli tedavi daha üstündü (Lock ve ark., 2010).",
    "Ebeveyni suçlamayan bir çerçeve: aile hastalığın nedeni değil, tedavinin kaynağıdır. Hastalık kişiden ayrı adlandırılır.",
    "Ebeveynler öğünlerin sorumluluğunu geçici olarak üstlenir; denetim, kilo ve beslenme düzeldikçe basamak basamak ergene geri verilir.",
    "Egzersiz tıbbi denge sağlanana kadar durdurulur; okulla öğün ve beden eğitimi düzenlemeleri konuşulur.",
    "Eş tanılar beslenme düzeldikten sonra yeniden değerlendirilir. İntihar düşüncesi her görüşmede sorulur."
  ],
  synth: "Mükemmeliyetçi mizaç ve ailede benzer öykü yatkınlaştırıcı, bir akranın sözü ve 'sağlıklı yaşam' çerçevesi başlatıcı, açlığın kendisi ve kısıtlamanın sağladığı denetim duygusu ile çevrimiçi içerik sürdürücü etkenlerdir. Tablo anoreksiya nervoza ile uyumludur ve tıbbi dengesizlik bulguları önceliği belirler. Orta ergenliğin görevi özerkliktir; hastalık bu görevi beden üzerindeki denetime indirger. Tedavi, ebeveynin geçici olarak devreye girmesiyle başlar ve özerkliğin yaşa uygun alanlara geri taşınmasıyla tamamlanır.",
  pearls: [
    "Kilo kaybının miktarı kadar hızı da önemlidir; normal kiloda olmak tıbbi riski dışlamaz.",
    "'İstemezse tedavi edemeyiz' yanlıştır: içgörü azlığı hastalığın belirtisidir ve ergen tedavisinde iş birliği ebeveynle kurulur.",
    "Açlık düşünceyi katılaştırır; beslenme düzelmeden içgörü odaklı çalışmadan sonuç beklenmez.",
    "Yeme bozukluğu yalnızca kızlarda görülmez; erkeklerde kas kazanma ve 'temiz beslenme' çerçevesiyle gelebilir."
  ],
  qs: [
    "Anna Freud'un çilecilik savunması ile ikili sistemler modelinin 'ödülün kısıtlamadan alınması' açıklaması birbirini nasıl tamamlar?",
    "Aile temelli tedavide denetimin ebeveyne verilmesi, ergenliğin özerklik göreviyle çelişir mi? Kağıtçıbaşı'nın özerk-ilişkisel benlik kavramıyla tartışın.",
    "Bu gencin kimliğinde hastalığın kapladığı yeri Erikson ve Marcia'nın kavramlarıyla betimleyin: iyileşme hangi kimlik keşfini gerektirir?"
  ],
  exps: ["solmi22", "orben22", "lozanowun25", "tang20"],
  refs: ["lock10", "morgan99", "neyzi15", "solmi22"] },

{ id: "dehb32", ek: true, age: 32, ageLabel: "32 yaş", band: "a11", tags: ["Erişkin DEHB", "Ebeveynlik", "Erken yetişkinlik"],
  title: "Otuz iki yaşında: 'Oğluma tanı konunca kendimi tanıdım'",
  ask: "Yedi yaşındaki oğluna DEHB tanısı konan 32 yaşında erkek, mühendis. Ebeveyn görüşmesinin sonunda 'Anlattıklarınızın hepsi bende de var; ben de değerlendirilebilir miyim?' diye soruyor.",
  steps: [
    { h: "Başvuru", text: "İki yıldır aynı şirkette çalışıyor; daha önce dört iş değiştirmiş. Teslim tarihlerini son gece yakaladığını, toplantılarda dinlerken koptuğunu, anahtarını ve telefonunu sürekli kaybettiğini söylüyor. Eşi, oğlunun ödev ve ilaç saatlerini kendisinin takip ettiğini, eşinin 'iyi niyetli ama dağınık' olduğunu anlatıyor.",
      q: "Erişkinde DEHB değerlendirmesinde tanıyı en çok güçlendirecek bilgi hangisidir ve kimden alınır?" },
    { h: "Öykü", text: "İlkokul karnelerinde 'Zeki ama derse ilgisiz, yerinde duramıyor' notları var. Annesi telefonda 'Ödevini başında durmazsam bitirmezdi' diyor. Lisede dershane ve sıkı aile denetimiyle üniversiteye girmiş; üniversitede iki yıl uzatmış. Trafik cezaları ve iki küçük kazası var. Kahve ve enerji içeceğini çok tüketiyor; hafta sonları alkol alıyor.",
      q: "Çocukluktaki belirtilerin 'telafi edilmiş' olması tanıyı dışlar mı? Yapı ve dış denetimin rolünü tartışın." },
    { h: "Görüşme", text: "Sıcak, konuşkan; sorulara yanıt verirken konudan konuya geçiyor. Duygudurumu ötimik, ama 'Hep potansiyelinin altında kalan biri' olarak kendini tanımlarken sesi düşüyor. Oğlunun doğumundan sonra uykusunun azaldığını ve zorlanmasının arttığını söylüyor. Mani ya da hipomani öyküsü yok.",
      q: "Belirtilerin son yıllarda artması bozukluğun kötüleşmesini mi, taleplerin artmasını mı gösterir?" },
    { h: "Ek bilgi", text: "Oğluyla en çok o oynuyor; oyun kurmakta ve doğaçlamada çok iyi. Ödev başında ise ikisi de çabuk öfkeleniyor ve akşamlar tartışmayla bitiyor. Babasının da 'her işe başlayıp yarım bırakan' biri olduğunu söylüyor.",
      q: "Babanın değerlendirilmesi ve tedavisi çocuğun tedavisini nasıl etkiler?" }
  ],
  findings: [
    ["Yeni ebeveynlikte yorgunluk ve düzenin bozulması", "norm", "Erken yetişkinlikte rol yükünün artması beklenen bir geçiştir."],
    ["Çocukta tanı sonrası kendinde benzerlik fark etme", "norm", "Sık görülen bir başvuru yoludur; DEHB ailesel yüklenme gösterir."],
    ["İlkokul karnelerinde ve anne anlatımında çocukluk belirtileri", "bayrak", "DSM-5-TR birkaç belirtinin 12 yaşından önce bulunmasını ister; nesnel kayıt tanıyı güçlendirir."],
    ["Sık iş değiştirme, üniversitede uzatma", "bayrak", "Birden çok alanda süregelen işlev kaybı."],
    ["Trafik cezaları ve kazalar", "bayrak", "Dikkatsizlik ve dürtüselliğin güvenlik sonuçları; ayrıca sorulmalı."],
    ["Yoğun kafein ve hafta sonu alkol", "izle", "Kendi kendine düzenleme çabası olabilir; kullanım düzeyi ölçülmeli."],
    ["'Potansiyelinin altında kalan biri'", "izle", "Yıllarca süren başarısızlık deneyiminin benlik algısındaki izi; eşlik eden depresyon taranmalı."],
    ["Oyun kurmada ve doğaçlamada güçlü", "norm", "Güçlü yan; ebeveyn eğitiminde kaynak olarak kullanılır."]
  ],
  lenses: [
    ["erikson", "Yakınlık evresinin içinde üretkenliğin ilk sınavı: babalık. 'Yetersiz baba' korkusu, çalışkanlık evresinden taşınan aşağılık duygusunu yeniden canlandırır; tanı bu anlatıyı 'tembellik'ten 'farklı işleyen dikkat'e çevirebilir.", 5],
    ["levinson", "30 yaş geçişi: ilk yetişkin yaşam yapısının gözden geçirildiği dönem. Meslek ve aile yapısını yeniden kurarken 'Neden hep zorlanıyorum?' sorusunun sorulması bu geçişe uygundur.", 2],
    ["vaillant", "Kariyer pekiştirmesi görevi sık iş değişiklikleriyle aksamıştır. Vaillant'a göre bu görev yalnızca iş sahibi olmak değil, işe bağlanma, yetkinlik ve doyumdur.", 2],
    ["mizac", "Çaba gerektiren kontrolün düşüklüğü çocukluktan beri süren bir bireysel farktır. Çocuklukta ailenin sağladığı yapı 'uyumun iyiliği'ni kurmuş, yetişkinlikte dış yapı azalınca güçlük görünür olmuştur.", 3],
    ["sroufe", "Gelişimsel psikopatoloji açısından süreklilik doğrusal değildir: aynı yatkınlık, destekleyici bağlamda telafi edilir, talep arttığında yeniden ortaya çıkar. Değerlendirme tek bir kesite değil, gelişimsel yola bakar.", 8],
    ["bowlby", "Bakım verme sistemi: babanın kendi dikkatini düzenlemekte zorlanması, oğlunun gereksinimlerine tutarlı yanıt vermesini güçleştirir. Ödev başındaki karşılıklı öfke, iki düzensiz sistemin birbirini tetiklemesidir; oyun ise güvenli üs işlevi görür.", null]
  ],
  brain: { regions: ["dlpfc", "striatum", "acc", "cerebellum"],
    text: "DEHB'de grup düzeyinde fronto-striatal ve fronto-serebellar devrelerde yapısal ve işlevsel farklar bildirilmiştir; bu farklar küçüktür ve bireysel tanıda kullanılamaz. Uyku yoksunluğu prefrontal denetimi ayrıca zayıflatır; yeni ebeveynlikte belirtilerin belirginleşmesinde bu etken hesaba katılmalıdır." },
  ddx: [
    ["Dikkat eksikliği/hiperaktivite bozukluğu", "DSM-5-TR", "Çocukluktan beri süren dikkatsizlik ve dürtüsellik, birden çok alanda işlev kaybı, çocukluk belirtilerinin karne ve anne anlatımıyla doğrulanması.", "17 yaş ve üzerinde her belirti kümesinden en az beş belirti aranır; birkaç belirti 12 yaşından önce bulunmalıdır."],
    ["Uyku yoksunluğu ve uyku bozuklukları", "Tıbbi", "Bebek sonrası azalan uyku, gündüz dikkat güçlüğü.", "Belirtiler çocukluktan beri var; uyku yoksunluğu tabloyu ağırlaştıran etken. Horlama ve gündüz uykululuğu sorulmalı."],
    ["Majör depresif bozukluk ya da süregiden depresif bozukluk", "DSM-5-TR", "Benlik değerinde düşüklük, odaklanma güçlüğü.", "Duygudurum ötimik ve dikkat sorunları duygudurumdan bağımsız, yaşam boyu sürüyor."],
    ["Yaygın anksiyete bozukluğu", "DSM-5-TR", "Yetişememe kaygısı, dağınıklık.", "Kaygı ikincil ve duruma bağlı görünüyor; sürekli ve denetlenemeyen endişe tanımlanmıyor."],
    ["Bipolar bozukluk", "DSM-5-TR", "Konuşkanlık, konudan konuya geçme, dürtüsellik.", "Dönemsellik, uyku gereksiniminde azalma ve yükselmiş duygudurum yok; belirtiler süreğen."],
    ["Alkol ve madde kullanımı", "DSM-5-TR", "Hafta sonu alkol, yoğun kafein.", "Kullanım düzeyi ölçülmeli; dikkat sorunları kullanımdan önce başlamış."]
  ],
  tools: [
    ["Erişkin DEHB Kendi Bildirim Ölçeği (ASRS)", "Dünya Sağlık Örgütü'nün tarama ölçeği; tanı koymaz, ayrıntılı görüşme gereğini gösterir."],
    ["Yapılandırılmış tanı görüşmesi (DIVA-5)", "Her belirti için çocukluk ve yetişkinlik örneklerini ayrı ayrı sorar; yakınla birlikte uygulanması önerilir."],
    ["Yan bilgi", "İlkokul karneleri, anne ya da babadan çocukluk öyküsü, eşten bugünkü işlevsellik. Erişkinin geriye dönük anlatımı tek başına yeterli değildir."],
    ["AUDIT", "Alkol kullanımının taranması."],
    ["PHQ-9 ve GAD-7", "Eşlik eden depresyon ve kaygı belirtilerinin taranması."],
    ["Uyku öyküsü", "Uyku süresi, horlama, gündüz uykululuğu; gerekirse uyku bozukluğu yönünden ileri değerlendirme."]
  ],
  plan: [
    "Tanı, çocukluk belirtilerinin yan bilgiyle doğrulanması ve ayırıcı tanıların dışlanmasından sonra konur; tarama ölçeği puanı tanı değildir.",
    "Psikoeğitim: DEHB'nin seyri çoğu kişide dalgalıdır. MTA izleminde çocukların yalnızca %9,1'inde kalıcı düzelme, %10,8'inde kesintisiz süreklilik görüldü; %63,8'inde düzelme ve yineleme dönemleri birbirini izledi (Sibley ve ark., 2022).",
    "Tedavi seçenekleri (ilaç tedavisi, DEHB'ye özgü bilişsel davranışçı beceri eğitimi) güncel kılavuzlara göre erişkin psikiyatrisiyle birlikte planlanır; alkol kullanımı ve kardiyovasküler öykü ilaç öncesinde değerlendirilir.",
    "Uyku ve kafein düzenlenir; sürücü güvenliği konuşulur.",
    "Çocuğun tedavisiyle eşgüdüm: ebeveyn eğitiminde babanın güçlü yanı (oyun) kullanılır; ödev düzeni gibi yapı gerektiren görevler babanın kendi belirtileri gözetilerek paylaştırılır.",
    "Eşle birlikte bir görüşme: suçlayıcı döngüyü ('sorumsuz' ile 'denetleyen') ortak bir sorun tanımına çevirmek."
  ],
  synth: "Çocukluktan beri süren, okul kayıtlarıyla doğrulanan dikkatsizlik ve dürtüsellik, aile denetiminin sağladığı yapı sayesinde ergenlikte telafi edilmiş, üniversite ve iş yaşamında yapı azalınca işlev kaybına dönüşmüştür. Babalık ve uyku yoksunluğu talebi artırarak güçlüğü görünür kılmıştır. Tablo erişkin DEHB ile uyumludur; depresyon ve alkol kullanımı taranmalıdır. Erken yetişkinliğin görevleri (işe bağlanma, yakınlık, ebeveynlik) aynı anda zorlanmaktadır; babanın tedavisi yalnızca kendi işlevselliğini değil, oğlunun tedaviye yanıtını ve aile iklimini de etkiler.",
  pearls: [
    "Çocuğa DEHB tanısı konduğunda ebeveynlerde belirtileri sormak, çocuğun tedavisinin parçasıdır.",
    "Yüksek zekâ ve aile desteği çocukluk belirtilerini maskeleyebilir; 'okulda sorun yoktu' tanıyı dışlamaz, ama çocuklukta hiçbir belirtinin olmaması tanıyı sorgulatır.",
    "Erişkinde ilk kez ortaya çıkan dikkat yakınmasında önce uyku, duygudurum, kaygı ve madde kullanımı düşünülür.",
    "DEHB'de düzelme çoğu kez kalıcı değildir; izlem planı 'geçti' ve 'geçmedi' ikiliğine göre değil, dalgalı seyre göre yapılır."
  ],
  qs: [
    "Sroufe'nin gelişimsel yollar kavramı ile mizaç kuramındaki 'uyumun iyiliği' bu babanın öyküsünde hangi dönüm noktalarını açıklar?",
    "Levinson'un 30 yaş geçişi ile Erikson'un yakınlık ve üretkenlik evreleri arasındaki ilişkiyi babalık deneyimi üzerinden tartışın.",
    "Lokum testinin kavramsal yinelemesi (Watts ve ark., 2018) ile Dunedin öz-denetim bulguları birlikte okunduğunda, çocuklukta öz-denetimin yetişkinlik sonuçlarını öngörmesi hakkında ne söylenebilir?"
  ],
  exps: ["moffitt11", "watts18", "tang20", "malone16"],
  refs: ["sibley22", "faraone21"] },

{ id: "bakim52", ek: true, age: 52, ageLabel: "52 yaş", band: "a12", tags: ["Bakım yükü", "Depresyon", "Orta yetişkinlik"],
  title: "Elli iki yaşında: 'Herkese yetişiyorum, kendime kalmıyor'",
  ask: "On altı yaşındaki oğlunun sınav kaygısı için getirdiği görüşmede, 52 yaşındaki öğretmen anne ağlamaya başlıyor: üç aydır uyuyamıyor, 'Artık hiçbir şeyden tat almıyorum' diyor. Alzheimer hastalığı olan annesi bir yıldır onlarla yaşıyor.",
  steps: [
    { h: "Başvuru", text: "Üç aydır uykuya dalmakta zorlanıyor, gece terleyerek uyanıyor ve yeniden uyuyamıyor. Sabahları isteksiz, okulda sabırsız. 'Öğrencilerime bağırdığım oluyor, ben böyle biri değildim.' İştahı azalmış. Oğlu görüşmede 'Annem her şeye ağlıyor' diyor.",
      q: "Ergen için gelinen bir görüşmede ebeveynin belirtileri ortaya çıktığında klinisyenin sorumluluğu nedir?" },
    { h: "Öykü", text: "Annesine bir yıl önce Alzheimer hastalığı tanısı konmuş; geceleri uyanıp evde dolaşıyor, bazen kızını tanımıyor. Bakımı büyük ölçüde o üstleniyor; erkek kardeşi başka şehirde. Eşi destek oluyor ama 'Bakımevini düşünelim' dediğinde aralarında tartışma çıkıyor. Altı aydır adetleri düzensiz, sıcak basmaları var. Geçmişte doğumdan sonra iki ay süren çökkün bir dönem tanımlıyor.",
      q: "Belirtilerin hangileri depresyonu, hangileri menopoz geçişini, hangileri bakım yükünü düşündürür? Ayırmak her zaman mümkün müdür?" },
    { h: "Görüşme", text: "Özenli, kendini toparlamaya çalışan bir kadın. Duygulanımı çökkün; annesinden söz ederken suçluluk belirgin: 'O bana baktı, ben onu bırakamam.' Değersizlik düşünceleri var. 'Bazen uyuyup uyanmasam diyorum' diyor; plan ya da niyet tanımlamıyor. Dikkatini toplamakta zorlandığını ve 'Bende de mi başlıyor?' diye korktuğunu söylüyor.",
      q: "Pasif ölüm düşüncesini bu bağlamda nasıl değerlendirir ve nasıl izlersiniz?" },
    { h: "Ek bilgi", text: "Yirmi sekiz yıldır öğretmen; öğrencileri ve genç meslektaşları için 'abla' konumunda. Emekliliği düşünmüş ama 'Evde kalırsam yalnızca hasta bakıcı olurum' diye vazgeçmiş. Resim yapmayı on yıl önce bırakmış. Oğlunun sınavı için de kendini sorumlu tutuyor.",
      q: "Bu kadının yaşamında üretkenliğin kaynakları ile tükenmenin kaynakları nerede örtüşüyor?" }
  ],
  findings: [
    ["Hem ergen çocuğa hem yaşlı ebeveyne bakım", "norm", "Orta yetişkinlikte sık görülen bir rol birikimidir; tek başına patoloji değildir."],
    ["Adet düzensizliği ve sıcak basmaları", "norm", "Menopoz geçişinin beklenen belirtileri; uykuyu bozarak duygudurumu etkileyebilir."],
    ["'Bende de mi başlıyor?' kaygısı", "izle", "Demanslı yakınına bakanlarda sık görülür; depresyona bağlı dikkat güçlüğüyle karışır."],
    ["Üç aydır uykusuzluk, anhedoni, iştah azalması, değersizlik", "bayrak", "Depresif epizot ölçütleri yönünden değerlendirilmeli."],
    ["Pasif ölüm düşüncesi", "bayrak", "Plan ve niyet olmasa da her görüşmede yeniden sorulmalı."],
    ["Geçmişte doğum sonrası çökkün dönem", "izle", "Hormonal geçiş dönemlerinde duygudurum belirtilerine yatkınlığı düşündürür."],
    ["Bakımevi konusunda eşle çatışma ve yoğun suçluluk", "izle", "Bakım kararını kuşaklararası sadakat anlatısı belirliyor; yükün sürdürücü etkeni."],
    ["İşte öğretici ve yol gösterici rol", "norm", "Üretkenliğin güçlü kaynağı; tedavide korunmalı."]
  ],
  lenses: [
    ["erikson", "Üretkenlik ve durgunluk: bakım vermek üretkenliğin özüdür, ancak üç kuşağa birden bakım 'aşırı uzanma'ya dönüşmüştür. Erikson'a göre üretkenliğin erdemi özendir; kişinin kendini özen gösterilecekler listesinden çıkarması durgunluğun bir biçimidir.", 6],
    ["jung", "Orta yaş içe dönmeyi ve ihmal edilmiş yanların bütünleşmesini ister. On yıl önce bırakılan resim, persona uğruna feda edilen bir yandır; belirtiler bu çağrının bedelini gösteriyor olabilir.", 2],
    ["vaillant", "Üretkenlik evresinden 'anlamın bekçisi' evresine geçiş: genç meslektaşlara yol göstermek bu geçişin sağlıklı biçimidir. Yalnızca 'bakıcı' olma korkusu, bu rolün kaybedilmesi korkusudur.", 3],
    ["baltes", "Seçme, eniyileme ve telafi: kaynaklar azalırken bütün hedefleri aynı düzeyde sürdürmek olanaksızdır. Hangi görevlerin bırakılacağına (seçme) ve hangi desteğin alınacağına (telafi) karar vermek uyumun kendisidir, başarısızlık değil.", 1],
    ["kagitcibasi", "Kuşaklararası bağlar: duygusal karşılıklı bağımlılık modelinde yaşlı ebeveyne bakım, borç değil ilişkinin sürmesidir. 'Onu bırakamam' sözü bu değeri taşır; kurumsal ya da paylaşımlı bakım seçenekleri ilişkiyi koparmadan yükü bölmenin yolu olarak konuşulabilir.", 3],
    ["carstensen", "Zaman ufku daralırken duygusal olarak anlamlı hedefler öne çıkar. Annenin hastalığı kendi geleceğini de görünür kılmıştır; 'kalan zamanı nasıl kullanmak istiyorum?' sorusu tedavide açıkça sorulabilir.", 1]
  ],
  brain: { regions: ["hypothalamus", "hippocampus", "dlpfc", "amygdala"],
    text: "Menopoz geçişinde östrojen düzeylerindeki dalgalanma hipotalamusun ısı düzenlemesini etkiler; sıcak basmaları ve gece terlemeleri uykuyu böler. Süregiden uykusuzluk ve stres, dikkat ve bellek yakınmalarına yol açabilir; bu yakınmalar depresyon düzeldiğinde geriler. Demans korkusu bu nedenle depresyon tedavi edildikten sonra yeniden değerlendirilir." },
  ddx: [
    ["Majör depresif bozukluk", "DSM-5-TR", "Üç aydır çökkün duygudurum, anhedoni, uykusuzluk, iştah azalması, değersizlik, pasif ölüm düşüncesi.", "Perimenopozdaki kadınlarda depresif belirti ve tanı riski menopoz öncesine göre daha yüksek bulunmuştur (olasılık oranı 1,40; Badawy ve ark., 2024)."],
    ["Uyum bozukluğu", "DSM-5-TR", "Belirgin bir stres etkeniyle zamansal ilişki.", "Belirti sayısı ve şiddeti depresif epizot ölçütlerini karşılıyorsa bu tanı konmaz."],
    ["Menopoz geçişine bağlı belirtiler", "Tıbbi", "Sıcak basması, gece terlemesi, uyku bölünmesi, sinirlilik.", "Anhedoni, değersizlik ve ölüm düşüncesi vazomotor belirtilerle açıklanmaz; iki durum birlikte bulunabilir."],
    ["Bakımveren tükenmişliği", "Tanı değil", "Bir yıldır yoğun bakım yükü, uyku bölünmesi, öfke.", "Tanı değil, risk bağlamıdır. Alzheimer hastalığı olan yakınına bakanlarda depresyon yaygınlığı %34,0 bulunmuştur; kadın bakımverenlerde olasılık 1,53 kat yüksektir (Sallim ve ark., 2015)."],
    ["Tiroid işlev bozukluğu", "Tıbbi", "Yorgunluk, uyku ve iştah değişikliği, dikkat güçlüğü.", "Laboratuvarla dışlanmalı."],
    ["Hafif bilişsel bozukluk", "DSM-5-TR", "Dikkat güçlüğü yakınması, ailede demans.", "Yakınma yeni ve duygudurumla eş zamanlı; depresyon tedavisinden sonra sürerse nöropsikolojik değerlendirme yapılır."]
  ],
  tools: [
    ["PHQ-9", "Depresif belirtilerin şiddeti ve izlemi; dokuzuncu madde ölüm düşüncesini sorar."],
    ["Zarit Bakım Yükü Ölçeği", "Bakımverenin algıladığı yükü ölçer; bakım planı görüşmesinin başlangıç noktası olarak kullanılır."],
    ["Uykusuzluk Şiddeti İndeksi", "Uyku yakınmasının şiddeti ve tedaviye yanıtın izlemi."],
    ["Menopoz belirtilerinin sorgulanması", "Vazomotor belirtiler, adet düzeni, uyku; kadın hastalıkları ya da aile hekimiyle eşgüdüm."],
    ["Laboratuvar", "Tiroid işlev testleri, tam kan sayımı; klinik gereğe göre diğerleri."],
    ["İntihar riskinin yapılandırılmış değerlendirmesi", "Düşünce, plan, niyet, koruyucu etkenler; C-SSRS kullanılabilir."]
  ],
  plan: [
    "Kendi tedavisi için erişkin psikiyatrisine yönlendirme ve bunun izlenmesi: ergenin görüşmesinde saptanan ebeveyn depresyonu çocuğun tedavisinin de konusudur.",
    "Depresyon tedavisi güncel kılavuzlara göre planlanır (psikoterapi, gerekirse ilaç); vazomotor belirtiler ve uyku için kadın hastalıkları ya da aile hekimiyle eşgüdüm sağlanır.",
    "İntihar düşüncesi her görüşmede sorulur; güvenlik planı ve ulaşılabilecek kişiler konuşulur.",
    "Bakım yükünün paylaşılması: kardeşle ve eşle aile görüşmesi, evde bakım desteği, gündüz bakım ve geçici bakım seçenekleri; karar suçluluk üzerinden değil, annenin ve ailenin gereksinimleri üzerinden konuşulur.",
    "Uyku: annenin gece dolaşması için düzenlemeler ve gece nöbetinin paylaşılması; uykusuzluk için bilişsel davranışçı yaklaşım.",
    "Korunacak kaynaklar: işteki yol gösterici rol ve bırakılmış ilgi alanı (resim) tedavi hedeflerine yazılır. Oğlunun sınav kaygısı ayrıca ele alınır; annenin iyileşmesi ona da yarar."
  ],
  synth: "Bir yıldır süren yoğun bakım yükü ve bölünen uyku, menopoz geçişinin biyolojik duyarlılığıyla birleşerek depresif bir epizoda zemin hazırlamıştır; geçmişteki doğum sonrası dönem bu duyarlılığı destekler. Suçluluk ve kuşaklararası sadakat anlatısı yükün paylaşılmasını engelleyen sürdürücü etkendir. Orta yetişkinliğin görevi üretkenliktir ve bu kadın onu fazlasıyla yerine getirmektedir; güçlük, özen gösterilenler arasında kendisinin bulunmamasıdır. Tedavi depresyonu, uykuyu ve bakımın örgütlenmesini birlikte hedefler.",
  pearls: [
    "Çocuk ve ergen görüşmesinde ebeveynin ruh sağlığını sormak ek iş değil, değerlendirmenin parçasıdır.",
    "Perimenopozda depresyon riski artar; menopoz sonrasında aynı artış gösterilmemiştir. 'Hormonal' diyerek depresyonu, 'depresyon' diyerek vazomotor belirtileri atlamayın.",
    "Bakımverenin depresyonu bakılan kişinin de sonucunu etkiler; bakım planı iki kişilik yapılır.",
    "Depresyondaki dikkat ve bellek yakınması demans korkusunu besler; yeniden değerlendirme duygudurum düzeldikten sonra yapılır."
  ],
  qs: [
    "Erikson'un üretkenlik kavramı ile Baltes'in seçme, eniyileme ve telafi modeli, 'herkese yetişme' çabasını nasıl farklı yorumlar?",
    "Kağıtçıbaşı'nın aile değişimi kuramı açısından, yaşlı ebeveynin bakımevine yerleştirilmesi kararı Türkiye'de hangi değerlerle çatışır ve hangi seçenekler bu çatışmayı azaltır?",
    "Malone ve arkadaşlarının (2016) bulgusu doğruysa, orta yaşta üretkenliğin korunması bu kadının ileri yaştaki bilişsel sağlığı için ne anlama gelir? Çalışmanın sınırlılıkları bu çıkarımı nasıl kısıtlar?"
  ],
  exps: ["malone16", "uretkenlik", "ortayas", "carstensen20"],
  refs: ["badawy24", "sallim15", "malone16"] }
);
