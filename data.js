// Genişletilmiş Devasa Oyun Fikri Veri Havuzu
// 1. Slot: Ana Tema (Ortam, Evren, Dünya)
// 2. Slot: Yan Tema (Mekanik, Uğraş, Yan Öğe, Çatışma)
// 3. Slot: Oyun Türü (Genre, Oynanış Stili)

const THEMES_1 = [
  // Havacılık & Gökyüzü
  { id: "plane", name: "Uçak & Havacılık", icon: "✈️", desc: "Bulutların üzerinde kokpit gerilimi ve gökyüzü rotaları" },
  { id: "airship", name: "Dev Zeplinler & Hava Korsanları", icon: "🎈", desc: "Gökyüzü limanları, pirinç pervaneler ve hava savaşları" },
  { id: "skydive", name: "Serbest Düşüş & Yamaç Paraşütü", icon: "🪂", desc: "Yerçekimine meydan okuma ve rüzgar akımları" },

  // Bilim Kurgu & Uzay
  { id: "space", name: "Derin Uzay Keşfi", icon: "🚀", desc: "Bilinmeyen galaksiler, terk edilmiş uzay istasyonları ve asteroitler" },
  { id: "cyberpunk", name: "Neon Siberpunk Metropol", icon: "🤖", desc: "Megakentler, sibernetik çipler, yapay zeka isyanı ve neon yağmuru" },
  { id: "mars", name: "Kızıl Gezegen Kolonisi", icon: "🪐", desc: "Oksijen krizleri, kubbe şehirler ve kızıl kum fırtınaları" },
  { id: "solarpunk", name: "Güneş Çiftliği & Solarpunk", icon: "🌻", desc: "Doğayla iç içe yeşil fütürizm ve temiz enerji ütopyası" },
  { id: "matrix", name: "Sanal Simülasyon Dünyası", icon: "💾", desc: "Kodların arkasındaki gerçeklik ve glitch avcılığı" },
  { id: "aliens", name: "Uzaylı İstilası / Temas", icon: "👽", desc: "Bilinmeyen yaşam formları, kaçırılmalar ve iletişim çabası" },
  { id: "mecha", name: "Dev Mecha Robotlar", icon: "🦾", desc: "Kokpitten yönetilen tonlarca çelik ve enerji kılıçları" },

  // Tarih, Dönem & Mitoloji
  { id: "medieval", name: "Orta Çağ Feodal Krallığı", icon: "🏰", desc: "Şövalyeler, kale kuşatmaları ve taht entrikaları" },
  { id: "samurai", name: "Feodal Japonya & Samuraylar", icon: "⛩️", desc: "Katanalar, kiraz çiçekleri ve bushido onur yasası" },
  { id: "viking", name: "Viking & İskandinav Fiyortları", icon: "🪓", desc: "Uzun gemiler, karlı dağlar ve Valhalla çağrısı" },
  { id: "egypt", name: "Antik Mısır Piramitleri", icon: "🏺", desc: "Firavun mezarları, kum fırtınaları ve hiyeroglif gizemleri" },
  { id: "rome", name: "Roma Gladyatör Arenası", icon: "🏛️", desc: "Kumla kaplı arenalar, lejyonerler ve imparatorluk ihtişamı" },
  { id: "wildwest", name: "Tozlu Vahşi Batı", icon: "🤠", desc: "Kovboy düelloları, tren soygunları ve kanyonlar" },
  { id: "steampunk", name: "Viktoryen Steampunk Londra", icon: "⚙️", desc: "Buhar gücü, pirinç dişliler, sisli sokaklar ve gaz lambaları" },
  { id: "pirates", name: "Korsan Denizi & Hazine Adaları", icon: "🏴‍☠️", desc: "Kalyonlar, kraken efsaneleri ve rom kokulu limanlar" },
  { id: "coldwar", name: "Soğuk Savaş Casusluğu", icon: "📻", desc: "Şifreli telgraflar, nükleer bunkerlar ve sınır geçişleri" },
  { id: "stoneage", name: "Taş Devri & İlkel Kabile", icon: "🦴", desc: "Mamut avları, mağara duvarı resimleri ve ateşin keşfi" },

  // Gizem, Doğaüstü & Fantastik
  { id: "dungeon", name: "Karanlık Yeraltı Mahzeni", icon: "🗝️", desc: "Tuzaklı taş koridorlar, meşaleler ve sandık canavarları" },
  { id: "hell", name: "Cehennem & Lav Nehirleri", icon: "🔥", desc: "Kaynayan magma, şeytani paktlar ve ebedi alevler" },
  { id: "dreamscape", name: "Sürreal Rüya Boyutu", icon: "🌙", desc: "Yüzen mimariler, eriyen saatler ve yerçekimsiz adalar" },
  { id: "nightmare", name: "Psikolojik Kabus Odaları", icon: "👁️", desc: "Gerçekle hayalin karıştığı klostrofobik mekanlar" },
  { id: "noir", name: "1940'lar Noir Dedektiflik", icon: "🕵️", desc: "Sürekli yağan yağmur, caz barları ve kırık kalpli dedektifler" },
  { id: "carnival", name: "Terk Edilmiş Lanetli Lunapark", icon: "🎪", desc: "Gıcırdayan dönme dolaplar, tekinsiz aynalı labirentler" },
  { id: "fairytale", name: "Karanlık Masal Ormanı", icon: "🍄", desc: "Konuşan ağaçlar, zehirli elmalar ve cadı kulübeleri" },
  { id: "lovecraft", name: "Kozmik Dehşet & Lovecraftian", icon: "🐙", desc: "Akıl sağlığını zorlayan antik tanrılar ve delilik" },
  { id: "angelic", name: "Göksel Cennet Katı", icon: "🪽", desc: "Bulut sarayları, altın kapılar ve kutsal ışık hüzmeleri" },

  // Doğa, Vahşi Yaşam & Ekstrem Coğrafya
  { id: "deepsea", name: "Okyanus Tabanı & Abissal Karanlık", icon: "🌊", desc: "Devasa sualtı basıncı, fosforlu yaratıklar ve batıklar" },
  { id: "arctic", name: "Buzul Çağı & Kutup Tipi", icon: "❄️", desc: "Sıfırın altında hayatta kalma, çatlayan buzlar ve iglolar" },
  { id: "jungle", name: "Balta Girmemiş Yağmur Ormanı", icon: "🌴", desc: "Sarmaşıklar, zehirli kurbağalar ve gizli tapınak kalıntıları" },
  { id: "desert", name: "Uçsuz Bucaksız Çöl Vahası", icon: "🏜️", desc: "Seraplar, dev kum solucanları ve yakan güneş" },
  { id: "swamp", name: "Sisli Bataklık & Sazlık", icon: "🐊", desc: "Diz boyu çamur, sazlık fenerleri ve pusu kuran timsahlar" },
  { id: "volcano", name: "Aktif Yanardağ Krateri", icon: "🌋", desc: "Tüfler, sülfür gazları ve her an patlamaya hazır magma" },
  { id: "cave", name: "Kristal Mağara Labirenti", icon: "💎", desc: "Yankılanan damlalar, parıldayan jeotlar ve dar geçitler" },

  // Gündelik, Mikro & İlginç Boyutlar
  { id: "micro", name: "Mikroskobik Hücre Dünyası", icon: "🔬", desc: "Akyuvarlar, virüsler ve nano-ölçekli moleküler savaşlar" },
  { id: "backyard", name: "Arka Bahçedeki Minik Böcekler", icon: "🐜", desc: "Çimlerin arasında orman gibi hissettiren dev dünya" },
  { id: "suburb", name: "90'lar Banliyö Mahallesi", icon: "🏘️", desc: "Bisikletli çocuklar, gazete dağıtımı ve garaj satışları" },
  { id: "metro", name: "Karanlık Metro Tünelleri", icon: "🚇", desc: "Raylar üzerinde terk edilmiş vagonlar ve yeraltı insanları" },
  { id: "hospital", name: "Terk Edilmiş Akıl Hastanesi", icon: "🏥", desc: "Titreyen floresanlar, tekerlekli sandalyeler ve tıbbi kayıtlar" },
  { id: "highschool", name: "Tuhaf Japon Lisesi", icon: "🏫", desc: "Çatı katı öğle yemekleri, okul kulüpleri ve festival telaşı" },
  { id: "prison", name: "Maksimum Güvenlikli Cezaevi", icon: "⛓️", desc: "Gardiyan devriyeleri, avlu çatışmaları ve kaçış tünelleri" },
  { id: "office", name: "Ruh Emici Kurumsal Plazalar", icon: "🏢", desc: "Gri kabinler, kahve makineleri ve bitmeyen toplantılar" },
  { id: "supermarket", name: "Gece Yarısı Süpermarketi", icon: "🛒", desc: "Reyonlar arasında kaybolma ve indirim anonsları" },
  { id: "arcade90", name: "Retro Jetonlu Arcade Salonu", icon: "🕹️", desc: "Neon tüpler, jeton şıngırtısı ve pikselli makineler" },
  { id: "casino", name: "Las Vegas Yeraltı Kumarhanesi", icon: "🎰", desc: "Kadife masalar, poker fişleri ve gizli kasa odaları" },
  { id: "library", name: "Sonsuz Babil Kütüphanesi", icon: "📚", desc: "Tavana kadar kitap rafları ve kayıp el yazmaları" },
  { id: "museum", name: "Gece Hayat Bulan Antika Müzesi", icon: "🖼️", desc: "Hareket eden heykeller ve canlanan mumyalar" },
  { id: "diner", name: "Otoyol Kenarı Gece Dinlenme Tesisi", icon: "☕", desc: "Neon tabelalar, filtre kahve ve garip yolcular" },
  { id: "shipyard", name: "Paslı Gemi Mezarlığı", icon: "⚓", desc: "Devasa tanker iskeletleri, vinçler ve çelik yığınları" },

  // Kıyamet & Distopya
  { id: "postapoc", name: "Nükleer Kıyamet Sonrası", icon: "☢️", desc: "Radyasyonlu harabeler, gaz maskeleri ve mutasyonlar" },
  { id: "flooded", name: "Sular Altında Kalmış Dünya", icon: "🚤", desc: "Çatı katı iskeleleri, sualtı gökdelenleri ve paslı botlar" },
  { id: "iceapoc", name: "Sonsuz Kar & Buz Fırtınası", icon: "🌨️", desc: "Isı kaynaklarını koruma ve donmuş medeniyet kalıntıları" },
  { id: "garbage", name: "Dev Çöplük Gezegeni", icon: "🗑️", desc: "Hurda dağları, geri dönüşüm çeteleri ve mekanik parçalar" },
  { id: "dystopia1984", name: "Büyük Birader Otoriter Devleti", icon: "👁️‍🗨️", desc: "Propaganda hoparlörleri, gözetleme kuleleri ve sansür" },

  // Eğlenceli & Absürt
  { id: "candyland", name: "Şekerleme & Tatlı Diyarı", icon: "🍭", desc: "Lolipop ormanları, çikolata nehirleri ve jelibon tepeleri" },
  { id: "toystore", name: "Canlanan Oyuncaklar Odası", icon: "🧸", desc: "Kurmalı robotlar, tahta bloklar ve peluş krallığı" },
  { id: "cardboard", name: "Karton Kutu & Origami Dünyası", icon: "📦", desc: "Katlanan kağıt köprüler ve yapıştırıcı tehlikesi" },
  { id: "catsville", name: "Kedilerin Yönettiği Şehir", icon: "🐱", desc: "Kedi nanesi kafeleri ve kutu içinde meclis toplantıları" },
  { id: "doggo", name: "Köpeklerin Gizli Parkı", icon: "🐶", desc: "Kemik saklama yarışları ve sincap kovalama operasyonları" },
  { id: "retro80s", name: "80'ler Synthwave Günbatımı", icon: "🌴", desc: "Mor ızgaralar, DeLorean arabalar ve retro synth melodileri" },
  { id: "hauntedhouse", name: "Perili Viktoryen Malikane", icon: "🏚️", desc: "Gıcırdayan merdivenler, sallanan avizeler ve gizli geçitler" },
  { id: "carnivalevil", name: "Gezici Sirk Karavanı", icon: "🤹", desc: "Akrobatlar, ateş yutanlar ve sahne arkası dramaları" },
  { id: "cyberocean", name: "Dijital Veri Okyanusu", icon: "🌐", desc: "Bit dalgaları, güvenlik duvarları ve virüs girdapları" },
  { id: "nuclearplant", name: "Çernobil Tarzı Nükleer Santral", icon: "☢️", desc: "Çekirdek erimesi alarmları, soğutma kuleleri ve dozimetreler" },
  { id: "airtraffic", name: "Havalimanı Radar Kulesi", icon: "📡", desc: "İniş kalkış sıraları, sisli pistler ve acil durum çağrıları" },
  { id: "subwaybazaar", name: "Yeraltı Pasajı & Gece Pazarı", icon: "🏮", desc: "Buharı tüten sokak tezgahları, taklit saatler ve neon tabelalar" },
  { id: "hauntedhotel", name: "The Shining Tarzı Dağ Oteli", icon: "🛎️", desc: "Karla kapanan yollar, uzun koridorlar ve 237 numaralı oda" },
  { id: "oilrig", name: "Okyanus Ortasında Petrol Platformu", icon: "🏗️", desc: "Fırtınalı dalgalar, gıcırdayan platform ve sızıntı tehlikesi" },
  { id: "lighthouse", name: "Kayalıktaki Yalnız Deniz Feneri", icon: "🗼", desc: "Sis düdükleri, dönen dev lens ve azgın fırtınalar" },
  { id: "trainexpress", name: "Karlı Sibirya Ekspres Treni", icon: "🚂", desc: "Donmuş camlar, kompartıman gizemleri ve sonsuz raylar" },
  { id: "moonbase", name: "Ay Üssü Alfa Krateri", icon: "🌕", desc: "Düşük yerçekimi, ay tozu ve güneş paneli bakımı" },
  { id: "colosseum", name: "Yeraltı Yasadışı Dövüş Kulübü", icon: "🥊", desc: "Dumanaltı bodrum katları, bahisçiler ve çıplak yumruklar" },
  { id: "attic", name: "Tozlu Büyükbaba Çatı Katı", icon: "🗝️", desc: "Sandıklar, eski gramofonlar ve örümcek ağları" },
  { id: "monastery", name: "Himalaya Sisli Dağ Manastırı", icon: "🏔️", desc: "Dua çanları, dondurucu rüzgar ve sessizlik yemini" },
  { id: "sewers", name: "Şehir Kanalizasyon Tünelleri", icon: "🐀", desc: "Metan gazı, lağım fareleri ve kayıp hazineler" },
  { id: "aquarium", name: "Gece Yarısı Dev Akvaryum", icon: "🦈", desc: "Camın arkasından süzülen köpekbalıkları ve mavi ışık" },
  { id: "saloon", name: "Vahşi Batı Kumarhane Saloonu", icon: "🥃", desc: "Kanatlı kapılar, dökülen viskiler ve piyanist" },
  { id: "treehouse", name: "Dev Sekoya Ağaç Evi Köyü", icon: "🏡", desc: "Asma köprüler, yaprak çatıları ve ahşap makaralar" },
  { id: "zeppelinflux", name: "Zaman Kırılması Zeplini", icon: "🕰️", desc: "Çağlar arasında sürüklenen buharlı gökyüzü gemisi" }
];

const THEMES_2 = [
  // Gastronomi & Tüketim
  { id: "food", name: "Gastronomi & Mutfak Kaosu", icon: "🍳", desc: "Sipariş yetiştirme, tencere yangınları ve acımasız şefler" },
  { id: "coffee", name: "Baristalık & Kahve Bağımlılığı", icon: "☕", desc: "Espresso basıncı, latte art ve sabah telaşı" },
  { id: "baking", name: "Fırıncılık & Hamur Kabartma", icon: "🥐", desc: "Mayalama süreleri, fırın sıcaklığı ve un fırtınaları" },
  { id: "cocktail", name: "Barmenlik & İksir Miksolojisi", icon: "🍸", desc: "Çalkalanan shakerlar, gizli tarifler ve dert dinleme" },
  { id: "farming", name: "Organik Tarım & Mahsul Yetiştirme", icon: "🌾", desc: "Tohum ekme, sulama sistemleri ve böcek istilası" },
  { id: "honey", name: "Arıcılık & Bal Hasadı", icon: "🍯", desc: "Kovan yönetimi, sokulmadan bal sağma ve kraliçe arı" },

  // Doğa, Hayvanlar & Çevre
  { id: "fishing", name: "Balıkçılık & Derin Deniz Avı", icon: "🎣", desc: "Oltalar, yem seçimi, dev pullu efsaneler ve sabır" },
  { id: "cats", name: "Kafasına Buyruk Kediler", icon: "🐈", desc: "Tırmalama tahtaları, masadan bardak devirme ve miyavlama" },
  { id: "gardening", name: "Botanik & Zehirli Bitkiler", icon: "🌱", desc: "Etobur bitkiler, kök budama ve sera iklimlendirme" },
  { id: "mushrooms", name: "Mantar Toplayıcılığı & Sporlar", icon: "🍄", desc: "Halüsinojenik mantarlar, orman tabanı ve karanlık küfler" },
  { id: "birdwatching", name: "Kuş Gözlemciliği & Ornitoloji", icon: "🦅", desc: "Dürbünler, nadir tüy sesleri ve göç yolları" },
  { id: "dino", name: "Dinozor Terbiyeciliği", icon: "🦖", desc: "T-Rex besleme, fosil kazıları ve kaçan raptorlar" },

  // Sanat, Müzik & Zanaat
  { id: "music", name: "Rock & Elektro Müzik", icon: "🎸", desc: "Ritim tutturma, patlayan amfiler ve stadyum soloları" },
  { id: "blacksmith", name: "Demircilik & Örs Dövme", icon: "🔨", desc: "Kızgın çeliği şekillendirme ve kusursuz kılıç bileme" },
  { id: "painting", name: "Tablo Boyama & Boya Sıçratma", icon: "🎨", desc: "Fırça darbeleri, renk teorisi ve canlanan tuval" },
  { id: "pottery", name: "Çömlekçilik & Çamur Torna", icon: "🏺", desc: "Dönen çarkta kile form verme ve çatlama riski" },
  { id: "tailor", name: "Terzilik & Haute Couture", icon: "🧵", desc: "Kumaş biçme, iğne iplik ve defile yetiştirme" },
  { id: "photography", name: "Gizli Fotoğrafçılık & Paparazzi", icon: "📸", desc: "Flaş patlamaları, karanlık oda banyosu ve anı yakalama" },

  // Gizem, Doğaüstü & Büyü
  { id: "magic", name: "Antik Büyü & Rün Sentezi", icon: "🔮", desc: "Mana kontrolü, asalar ve fiyaskoyla sonuçlanan büyüler" },
  { id: "alchemy", name: "Çılgın Simya & Reaksiyonlar", icon: "🧪", desc: "Fokurdayan tüpler, patlayan kazanlar ve altın formülü" },
  { id: "ghosts", name: "Ruh Yakalama & Ektoplazma", icon: "👻", desc: "EMF sayaçları, tuz çemberleri ve huysuz hayaletler" },
  { id: "zombie", name: "Zombi Isırığı & Karantina", icon: "🧟", desc: "Barikat kurma, son mermi ve enfeksiyon saati" },
  { id: "timeloop", name: "Zaman Döngüsü & Paradox", icon: "⏳", desc: "Sürekli başa saran aynı 12 dakika ve kaderi kırma" },
  { id: "tarot", name: "Tarot & Kehanet Kartları", icon: "🎴", desc: "Kader okuma, lanetli kart çekimleri ve yıldız haritaları" },
  { id: "vampire", name: "Vampirizm & Kan Arzusu", icon: "🧛", desc: "Güneş ışığından kaçış, sarımsak ve asil davetler" },
  { id: "curses", name: "Eski Lahit Lanetleri", icon: "💀", desc: "Mühürleri kırma, kuruyan kemikler ve uykusuzluk" },

  // Günlük İşler, Meslekler & Bürokrasi
  { id: "delivery", name: "Ekspres Kargo Dağıtımı", icon: "📦", desc: "Kırılabilir eşyalar, acil teslimat ve adresi bulamama" },
  { id: "cleaning", name: "Derin Suç Mahalli Temizliği", icon: "🧹", desc: "Paspas çekme, leke çıkarma ve kanıtları yok etme" },
  { id: "tax", name: "Vergi Kaçırma & Ağır Bürokrasi", icon: "📋", desc: "Damga pulları, denetmen rüşveti ve evrak yığınları" },
  { id: "mining", name: "Değerli Maden Kazısı", icon: "⛏️", desc: "Kazma darbeleri, grizu patlaması ve elmas damarları" },
  { id: "plumbing", name: "Tesisatçılık & Su Kaçakları", icon: "🔧", desc: "İngiliz anahtarları, patlayan borular ve paslı vanalar" },
  { id: "busdriver", name: "Belediye Otobüsü Şoförlüğü", icon: "🚌", desc: "Duraklarda bekleme, akbil basmayan yolcular ve vites" },
  { id: "construction", name: "Yüksek Vinç & İnşaat", icon: "🏗️", desc: "Çelik kirişler, harç karma ve şantiye güvenliği" },
  { id: "security", name: "Gece Güvenlik Vardiyası", icon: "🔦", desc: "Kamera odası, fener pili ve koridor fısıltıları" },
  { id: "dentist", name: "Acımasız Diş Çekimi", icon: "🦷", desc: "Vızıldayan matkaplar, uyuşturucu iğneler ve çürükler" },

  // İlişkiler, Duygular & Sosyal
  { id: "dating", name: "Felaket İlk Buluşma (Date)", icon: "💌", desc: "Garip sessizlikler, yanlış masalar ve romantik fiyasko" },
  { id: "gossip", name: "Mahalle Dedikodusu & İftira", icon: "🗣️", desc: "Kulaktan kulağa sırlar, dinleme cihazları ve rezillik" },
  { id: "sleep", name: "Aşırı Uykusuzluk & Esneme", icon: "💤", desc: "Göz kapaklarının düşmesi, enerji içecekleri ve rüyalar" },
  { id: "wedding", name: "Düğün Sabotajı & Kaos", icon: "🎂", desc: "Devrilen çok katlı pasta, kaçan damat ve takı kavgası" },
  { id: "paranoia", name: "Kolektif Paranoya", icon: "👀", desc: "Herkesin ajan olduğunu düşünme ve perde arkasından bakma" },

  // Teknoloji, Kodlama & Mekanik
  { id: "hacking", name: "Yeraltı Siber Korsanlığı", icon: "💻", desc: "Güvenlik duvarlarını delme, terminal komutları ve sızıntı" },
  { id: "bugs", name: "Kod Hataları & Glitchler", icon: "🐛", desc: "Spagetti kod, null pointer ve çöken sunucular" },
  { id: "clockwork", name: "Saat Tamiri & Yay Mekaniği", icon: "🕰️", desc: "Tıkırdayan minik çarklar, zemberekler ve sarkaç ayarı" },
  { id: "drone", name: "Kamikaze Dron Pilotluğu", icon: "🛸", desc: "FPV gözlükler, pil göstergesi ve dar koridor dalışları" },
  { id: "battery", name: "Biten Pil & Enerji Kıtlığı", icon: "🪫", desc: "Yüzde 1 şarjla hayatta kalma ve priz arama yarışı" },

  // Eylem, Hırsızlık & Macera
  { id: "heist", name: "Kasa Soygunu & Lazer Sensörler", icon: "💰", desc: "Şifre kırma, termal matkap ve kaçış arabası" },
  { id: "chase", name: "Yüksek Hızlı Polis Kovalamacası", icon: "🚨", desc: "Ters şerit, patlayan lastikler ve helikopter ışığı" },
  { id: "gamble", name: "Tüm Mal Varlığını Basma (Kumar)", icon: "🎲", desc: "Kör bahis, blöf yapma ve masadan sıfırla kalkma" },
  { id: "scavenge", name: "Hurda Toplayıcılığı & Geri Dönüşüm", icon: "🧲", desc: "Metal dedektörleri, paslı levhalar ve yedek parçalar" },
  { id: "sabotage", name: "Gizli Fabrika Sabotajı", icon: "🧨", desc: "Saatli bombalar, kesilen kablolar ve duman alarmları" },
  { id: "auction", name: "Gergin Antika Müzayedesi", icon: "🏷️", desc: "Pey sürme, tokmak sesleri ve sahte eser skandalları" },
  { id: "origami", name: "Origami & Kağıt Katlama", icon: "🦢", desc: "Hassas katlama çizgileri, kağıt kesikleri ve form verme" },
  { id: "tattoo", name: "Dövme Sanatı & İğne Mürekkebi", icon: "🖋️", desc: "Müşterinin acı eşiği, titremeyen eller ve tribal desenler" },
  { id: "hypnosis", name: "Hipnoz & Zihin Kontrolü", icon: "🌀", desc: "Sallanan köstekli saat, trans hali ve gizli telkinler" },
  { id: "lockpicking", name: "Maymuncukla Kilit Açma", icon: "🔐", desc: "Pimleri dinleme, kırılan maymuncuklar ve sessiz sızma" },
  { id: "meteor", name: "Yaklaşan Meteor Tehdidi", icon: "☄️", desc: "Geri sayım saati, panik ortamı ve yörünge saptırma" },
  { id: "paparazzi", name: "Ünlülerin Peşinde Magazin", icon: "📸", desc: "Çalılıkların arasına saklanma, skandal manşetler ve flaşlar" },
  { id: "karaoke", name: "Detone Gece Yarısı Karaoke", icon: "🎤", desc: "Bağırarak söylenen şarkılar, puan tablosu ve alkışlar" },
  { id: "vending", name: "Otomat Makinesi Doldurma", icon: "🥤", desc: "Sıkışan gazoz kutuları, para iade tuşları ve atıştırmalıklar" },
  { id: "telepathy", name: "Zihin Okuma & Düşünce Yankısı", icon: "🧠", desc: "İnsanların iç sesini duyma ve baş ağrısı krizleri" },
  { id: "gladiator", name: "Arena Kalabalığını Coşturma", icon: "🏟️", desc: "Başparmak yukarı mı aşağı mı? Seyirci beğenisi" },
  { id: "smuggling", name: "Gizli Bölmede Kaçakçılık", icon: "🕶️", desc: "Gümrük köpekleri, x-ray cihazları ve sahte pasaportlar" },
  { id: "graffiti", name: "Gece Duvar Grafitisi", icon: "🎨", desc: "Tıslayan sprey boyalar, bekçiden kaçış ve şablon sanatı" },
  { id: "meteorology", name: "Hava Durumu Manipülasyonu", icon: "⚡", desc: "Bulut tohumlama, şimşek çağırma ve hortum yönlendirme" },
  { id: "inheritance", name: "Miras Kavgası & Vasiyetname", icon: "📜", desc: "Açgözlü akrabalar, gizli maddeler ve son istekler" },
  { id: "cloning", name: "Kontrolden Çıkan Klonlama", icon: "👥", desc: "Kendinden 50 tane olması ve kimin gerçek olduğunu unutma" },
  { id: "blackhole", name: "Yutucu Mikro Karadelik", icon: "🕳️", desc: "Olay ufku, spagettileşme ve madde emilimi" }
];

const GENRES = [
  // Roguelike & Kart
  { id: "roguelite", name: "Roguelite", icon: "🎲", desc: "Rastgele odalar, kalıcı yükseltmeler ve her ölümde yeni bir deneme" },
  { id: "deckbuilder", name: "Deckbuilder", icon: "🃏", desc: "Deste oluşturma, sinerjiler ve sıra tabanlı kart komboları" },
  { id: "autobattler", name: "Auto-Battler", icon: "♟️", desc: "Birimleri tahtaya yerleştirme, sinerji kurup savaşı izleme" },
  { id: "reversebullet", name: "Reverse Bullet Hell / Survivors-like", icon: "🧲", desc: "Otomatik ateş eden silahlar ve binlerce düşman dalgası" },

  // Aksiyon, Savaş & Souls
  { id: "soulslike", name: "Souls-like", icon: "⚔️", desc: "Zamanlama, dayanıklılık çubuğu ve cezalandırıcı boss savaşları" },
  { id: "hackslash", name: "Hack & Slash", icon: "🗡️", desc: "Kombo sayaçları, hava komboları ve akıcı kılıç gösterisi" },
  { id: "boomshooter", name: "Boomer Shooter (Retro FPS)", icon: "💥", desc: "Çift namlulu pompalı, hızlı bunny-hop ve kan banyosu" },
  { id: "bullethell", name: "Bullet Hell / Danmaku", icon: "🌀", desc: "Ekranı kaplayan mermi motifleri ve piksellik kaçışlar" },
  { id: "arenashooter", name: "İkiz Kollu (Twin-Stick) Nişancı", icon: "🕹️", desc: "Bir çubukla yürü, diğer çubukla her yöne ateş aç" },
  { id: "brawler", name: "Beat 'em Up / Sokak Dövüşü", icon: "🥊", desc: "Sokak serserilerini pataklama, çöp kutusu fırlatma" },
  { id: "extraction", name: "Extraction Shooter", icon: "🎒", desc: "Ganimeti topla, pusulardan sağ çık ve tahliye noktasına koş" },

  // Platform, Metroidvania & Keşif
  { id: "metroidvania", name: "Metroidvania", icon: "🗝️", desc: "Bağlantılı harita, yeni yeteneklerle açılan gizli bölgeler" },
  { id: "precisionplat", name: "Hassas Platformer (Precision)", icon: "👟", desc: "Milisaniyelik zıplamalar, diken tuzakları ve anında yeniden başlama" },
  { id: "collectathon", name: "3D Collect-a-thon", icon: "⭐", desc: "Renkli dünyalarda yüzlerce yıldız, bozuk para ve gizem toplama" },
  { id: "infinite", name: "Endless Runner", icon: "🏃", desc: "Asla durmayan hız, reflekslerle engellerden kayma ve zıplama" },

  // Strateji, Yönetim & Simülasyon
  { id: "towerdefense", name: "Tower Defense", icon: "🏰", desc: "Savunma kuleleri, labirent oluşturma ve canavar dalgaları" },
  { id: "citybuilder", name: "Şehir Kurma & İmar", icon: "🏙️", desc: "Yollar, vergi oranları, su boruları ve halkın refahı" },
  { id: "factorysim", name: "Fabrika Otomasyonu", icon: "🏭", desc: "Konveyör bantlar, lojistik düğümleri ve maksimum verimlilik" },
  { id: "colony", name: "Koloni Simülatörü", icon: "⛺", desc: "Akıl sağlığını kaybeden kolonistler, yemek kıtlığı ve barınak" },
  { id: "cozysim", name: "Cozy / Rahatlatıcı Yaşam Sim", icon: "☕", desc: "Stresten uzak, keyifli rutinler ve iç ısıtan kasaba atmosferi" },
  { id: "tycoon", name: "İşletme / Tycoon Yönetimi", icon: "💼", desc: "Müşteri memnuniyeti, fiyat politikası ve iflastan kaçış" },
  { id: "godgame", name: "Tanrı Oyunu (God Game)", icon: "⚡", desc: "Yukarıdan dünyayı yönetme, mucizeler ve inananlar yaratma" },

  // Gizlilik, Taktik & Macera
  { id: "stealth", name: "Taktiksel Gizlilik (Stealth)", icon: "👥", desc: "Işıktan saklanma, bozuk para atıp dikkat dağıtma ve bayıltma" },
  { id: "tactics", name: "İzometrik Taktiksel Sıra Tabanlı", icon: "📐", desc: "Kare kare ilerleme, siper alma ve yüzde 95 ıskalama şansı" },
  { id: "pointclick", name: "Point & Click Macera", icon: "🔍", desc: "Piksel avcılığı, envanterde ördek ile ipi birleştirme" },
  { id: "immsim", name: "Immersive Sim", icon: "🚪", desc: "Havalandırma borularından sızma, fizik motorunu suistimal etme" },

  // Bulmaca, Fizik & Deneyim
  { id: "physics", name: "Fizik Tabanlı Sakarlık Simülatörü", icon: "🤸", desc: "Ragdoll animasyonlar, kontrolü imkansız kollar ve komik kazalar" },
  { id: "puzzlebox", name: "Mekanik Bulmaca Kutusu", icon: "🧩", desc: "Kolları çekme, şifreleri çözme ve gizli bölmeleri açma" },
  { id: "sokoban", name: "Blok İtmece (Sokoban)", icon: "📦", desc: "Kutu köşeye sıkışınca pes etme ve geri alma hamleleri" },
  { id: "pinball", name: "Pinball & Flipper Fiziği", icon: "🎯", desc: "Yaylar, çarpanlar, jackpot rampaları ve tilt uyarısı" },
  { id: "typing", name: "Hızlı Klavye / Yazma Oyunu", icon: "⌨️", desc: "Ekrana gelen kelimeleri seri yazarak düşmanları yok etme" },

  // Müzik, Ritim & Hızlı Mini Oyunlar
  { id: "rhythm", name: "Ritim & Müzik Oyunu", icon: "🎵", desc: "Vuruşları tam zamanında yakalama ve müziğin akışına kapılma" },
  { id: "microgames", name: "5 Saniyelik Çılgın Mini Oyunlar", icon: "⚡", desc: "WarioWare tarzı panik dolu saniyeler ve ani görevler" },

  // Dehşet & Psikoloji
  { id: "survivalhorror", name: "Klasik Hayatta Kalma Korkusu", icon: "🔦", desc: "Kısıtlı envanter, yetersiz fener pili ve ayak sesleri" },
  { id: "analoghorror", name: "Analog Kaset & VHS Korkusu", icon: "📼", desc: "Parazitli görüntüler, garip test yayınları ve tekinsiz yüzler" },

  // Hikaye, Diyalog & Sosyal
  { id: "visualnovel", name: "Görsel Roman & Dallanan Hikaye", icon: "📖", desc: "Karakter portreleri, kritik diyalog seçimleri ve çoklu sonlar" },
  { id: "datingsim", name: "Flört Simülatörü (Dating Sim)", icon: "💖", desc: "Doğru hediyeyi seçme, kalp göstergesi ve utanma anları" },
  { id: "socialdeduct", name: "Sosyal Çıkarım & Hain Avı", icon: "🎭", desc: "Aramızdaki haini bulma, acil toplantılar ve yalan söyleme" },
  { id: "incremental", name: "Clicker / Sayı Patlatan Artımlı Oyun", icon: "📈", desc: "Sürekli büyüyen sayılar, katlanan katsayılar ve otomasyon" },
  { id: "inventory", name: "Çanta / Envanter Düzenleme (Backpack)", icon: "🎒", desc: "Eşyaları döndürme, ızgaraya sığdırma ve sinerji bulmacası" },
  { id: "monstertame", name: "Yaratık / Canavar Terbiyeciliği", icon: "🐾", desc: "Vahşi yaratıkları evcilleştirme, evrimleştirme ve turnuva" },
  { id: "golfphysics", name: "Mini-Golf & Çılgın Fizik", icon: "⛳", desc: "Açı ayarlama, güç çubuğu, rüzgar hesabı ve deliğe sokma" },
  { id: "kartracing", name: "Arcade Kart Yarışı & Muz Kabukları", icon: "🏎️", desc: "Drift yapma, güçlendirici kutuları patlatma ve kestirmeler" },
  { id: "hexstrategy", name: "Altıgen (Hex-Grid) Savaş Stratejisi", icon: "⬡", desc: "Arazi avantajı, menzilli atışlar ve birlik ikmali" },
  { id: "escapegame", name: "Kaçış Odası (Escape Room)", icon: "🔐", desc: "İpuçlarını birleştirme, gizli kasalar ve odadan çıkış yolu" },
  { id: "boomerfps", name: "Bumerang / Fırlatmalı Savaş", icon: "🪃", desc: "Atılan silahın geri dönüş açısını hesaplama ve iki yönlü vuruş" }
];

// Fikir başlığı ve pitch oluşturan yardımcı fonksiyon
function generatePitch(t1, t2, genre) {
  const titles = [
    `${t1.name.split(" ")[0]} & ${t2.name.split(" ")[0]}: ${genre.name}`,
    `Proje: ${t1.icon} ${t2.name.split(" ")[0]} Operasyonu`,
    `Chronicles of ${t1.name.split(" ")[0]}: ${genre.name}`,
    `${t1.name.split(" ")[0]} Protokolü: ${t2.name.split(" ")[0]}`,
    `The Last ${t1.name.split(" ")[0]} of ${t2.name.split(" ")[0]}`,
    `Süper ${t2.name.split(" ")[0]} ${genre.name} Deluxe`,
    `${t1.icon} ${t1.name.split(" ")[0]} Çıkmazı: ${genre.name}`
  ];

  const descriptions = [
    `Kahramanımız ${t1.name.toLowerCase()} atmosferinde hayatta kalmaya çalışırken ${t2.name.toLowerCase()} ile başa çıkmak zorunda! Bütün bunlar ${genre.name} mekanikleriyle birleşiyor.`,
    `${genre.name} türünün sınırlarını zorlayan bu oyunda, ${t1.name.toLowerCase()} unsurları doğrudan ${t2.name.toLowerCase()} dinamiklerine bağlanıyor.`,
    `Düşünün: ${t1.name} temalı bir evrende geçen, tamamen ${t2.name.toLowerCase()} etrafında dönen bağımlılık yapıcı bir ${genre.name} macerası!`,
    `${t1.name} ile ${t2.name} bir araya gelirse ne mi olur? Karşınızda beklenmedik derinliğe sahip taze bir ${genre.name} deneyimi!`,
    `Her turda ${t1.name.toLowerCase()} zorluklarıyla mücadele ederken ${t2.name.toLowerCase()} odağında reflekslerinizi sınayan eşsiz bir ${genre.name}!`,
    `Unutulmaz bir atmosfer: ${t1.name} ortamında ${t2.name.toLowerCase()} mekanikleriyle zenginleştirilmiş, indie ödüllerine aday bir ${genre.name}!`
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

  // Game Jam Kısıtlamaları (Optional wildcards & creative constraints)
  const constraints = [
    "Kısıtlama: Yalnızca tek tuş veya fare ile oynanabilir",
    "Kısıtlama: Zaman yalnızca oyuncu hareket ettiğinde akar",
    "Kısıtlama: Karakter her öldüğünde bir eşyasını kalıcı olarak kaybeder",
    "Kısıtlama: 60 saniyelik mikro turlar ve ani kararlar",
    "Kısıtlama: Görsel stil yalnızca GameBoy 4-renk paleti",
    "Kısıtlama: Düşmanları öldürmek yerine onları yönlendirmek zorundasın",
    "Kısıtlama: Ses seviyesi doğrudan karakterin görünürlüğünü etkiler",
    "Kısıtlama: Sağlık çubuğu aynı zamanda harcanan para birimidir",
    "Kısıtlama: Harita her 45 saniyede bir 90 derece döner",
    "Kısıtlama: Oyundaki tüm nesneler geri dönüştürülebilir"
  ];
  const randomConstraint = constraints[Math.floor(Math.random() * constraints.length)];

  return { title: randomTitle, description: randomDesc, constraint: randomConstraint };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { THEMES_1, THEMES_2, GENRES, generatePitch };
}
