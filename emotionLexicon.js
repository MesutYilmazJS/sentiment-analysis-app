/**
 * SentiPulse - Gelişmiş Türkçe Semantik Duygu Sözlüğü (Emotion Lexicon Engine)
 * 7 Farklı Psikolojik Duygu Kanalı İçin E-Ticaret + Günlük Yaşam + Argo & Küfür İfadeleri
 */

export const EMOTION_LEXICON = {
    // 1. NEŞE / MUTLULUK / MEMNUNİYET / GÜNLÜK & ARGO POZİTİF
    joy: [
        // E-Ticaret & Hizmet
        'harika', 'muhteşem', 'beğendim', 'mutlu', 'güzel', 'süper', 'mükemmel', 'sevindim', 'kaliteli',
        'tavsiye', 'hızlı', 'teşekkür', 'efsane', 'başkası', 'iyi', 'sevdim', 'bayıldım', 'şahane', 'fevkalade',
        'muazzam', 'kusursuz', '10 numara', 'tam istediğim', 'elinize sağlık', 'minnettarım', 'keyifli',
        'güler yüzlü', 'memnun kaldım', 'tebrikler', 'başarılı', 'bayıldık', 'harikaydı', 'harikulade',
        'tavsiye ederim', 'çok iyi', 'hızlı teslimat', 'özenli paketleme', 'çok şık', 'harika bir ürün',
        'gönül rahatlığıyla', 'on numara', 'düşünmeden alın', 'fiyat performans', 'dostça', 'samimi',
        
        // Günlük Yaşam & Argo Pozitif (Övgü / Coşku)
        'günüm harika geçti', 'içim açıldı', 'huzur doluyum', 'huzurlu', 'enerjik', 'zinde', 'neşeliyim',
        'çok sevindim', 'canım dostum', 'sevgilim', 'kurtuldum', 'sınavı geçtim', 'başardım', 'hallettim',
        'hava çok güzel', 'keyfim yerinde', 'gülümsedim', 'kahkaha attım', 'gülmekten koptum', 'çok tatlı',
        'kralsın', 'adamın dibi', 'baba ürün', 'ateş ediyor', 'fena güzel', 'yaktı geçti', 'dehşet güzel',
        'efsanesin', 'taş gibi', 'koptum ya', 'kral hareket', 'adamsın', 'on numara beş yıldız'
    ],

    // 2. ÖFKE / KIZGINLIK / ARGO & KÜFÜRLÜ İFADELER
    anger: [
        // E-Ticaret & Hizmet
        'rezalet', 'berbat', 'kızgın', 'öfke', 'fiyasko', 'kötü', 'pişman', 'sakın', 'almayın', 'suratıma',
        'şikayet', 'hırsız', 'dolandırıcı', 'saygısız', 'ilgisiz', 'kabul edilemez', 'iade', 'nefret',
        'lanet', 'rezillik', 'çıldıracağım', 'terbiyesizlik', 'sinirlendim', 'suratıma kapattı', 'çöpe atın',
        'yalan', 'aldatmaca', 'şikayetçiyim', 'dolandırıcılık', 'sahtekarlık', 'haddini bilin', 'terbiyesiz',
        'hakaret', 'skandal', 'ayıp', 'yazıklar olsun', 'mağdur ettiler', 'kandırıldık', 'para tuzağı',
        
        // Argo, Hakaret ve Küfür İfadeleri (Sert Öfke Tespiti)
        'sinir krizine girdim', 'bıktım artık', 'yeter ya', 'sinir bozucu', 'çıldırtma insanı', 'gıcık oldum',
        'kavga ettik', 'bağırdı', 'haksızlık', 'patron kızdı', 'trafiğe takıldım', 'çıldırttı', 'sabrım taştı',
        'tahammülüm kalmadı', 'gözüm görmesin', 'canıma tak etti', 'deli oldum', 'saçmalık', 'sövmek istiyorum',
        'ukala', 'nankör', 'bencil', 'arkamdan konuştu', 'ikiyüzlü', 'patlamaya hazırım', 'çıldırmak üzereyim',
        'salak', 'aptal', 'gerizekalı', 'mal', 'hıyar', 'angut', 'dangalak', 'beyinsiz', 'şerefsiz',
        'mankafa', 'kro', 'yavşak', 'puşt', 'sürtük', 'piç', 'ibne', 'amk', 'aq', 'amq', 'sik', 'siktir',
        'sikerim', 'boc', 'bok', 'orospu', 'göt', 'götveren', 'kaltak', 'haysiyetsiz', 'onursuz', 'kahpe'
    ],

    // 3. ÜZÜNTÜ / HAYAL KIRIKLIĞI / HÜSRAN / ARGO SİTEM
    sadness: [
        // E-Ticaret & Hizmet
        'üzgünüm', 'kırıldım', 'mağdur', 'yazık', 'bozuldu', 'kırık', 'ezik', 'gecikti', 'bekledim', 'hüsran',
        'tatsız', 'maalesef', 'eksik', 'çaresiz', 'hayal kırıklığı', 'mahvoldum', 'üzüntü', 'bozuk geldi',
        'yırtık', 'kalbimi kırdı', 'umudum kırıldı', 'ne yazık ki', 'beklediğim gibi çıkmadı', 'üzüldüm',
        'moralim bozuldu', 'zaman kaybı', 'hasarlı', 'defolu', 'kırılmış', 'kullanılamaz',
        
        // Günlük Yaşam & Sitem İfadeleri
        'ayrıldık', 'canım acıyor', 'yalnız hissediyorum', 'ağladım', 'gözyaşı', 'içim kan ağlıyor',
        'depresyondayım', 'moralim sıfır', 'modum düştü', 'tatsız tuzsuz', 'keyfim yok', 'hastayım',
        'başım ağrıyor', 'kötü hissediyorum', 'özledim', 'kaybettim', 'başarısız oldum', 'sınavdan kaldım',
        'vazgeçtim', 'tükendim', 'bitti her şey', 'yalnızım', 'kederli', 'çaresizim', 'içim karardı',
        'hayatım kaydı', 'bittim ben', 'battık', 'içim cız etti', 'içim yandı', 'sıçtık'
    ],

    // 4. ENDİŞE / KORKU / ŞÜPHE / TEHLİKE
    fear: [
        // E-Ticaret & Hizmet
        'korkuyorum', 'endişe', 'şüphe', 'güvensiz', 'tehlike', 'riski', 'korkunç', 'acaba', 'zarar',
        'patlayabilir', 'patladı', 'sahte', 'tedirgin', 'tırstım', 'güvenmiyorum', 'güvenlik riski',
        'elektrik çarptı', 'kıvılcım', 'yangın', 'zehirli', 'sakıncalı', 'riskli', 'korkutucu',
        
        // Günlük Yaşam & Argo Kaygı
        'panik yaptım', 'panik atak', 'anksiyete', 'gece uyuyamadım', 'kabus gördüm', 'başıma bir şey gelecek',
        'korkudan öldüm', 'tırstım valla', 'ürperdim', 'deprem oldu sanırım', 'acaba ne olacak',
        'geç kalacağım', 'patron çağırıyor', 'sınav sonucu korkutuyor', 'hastalık riski', 'kötü his var içimde',
        'endişeleniyorum', 'korkulu rüya', 'kararsızım', 'korku doluyum', 'götüm yemedi', 'altıma sıçtım'
    ],

    // 5. ŞAŞKINLIK / HAYRET / ARGO ŞOK
    surprise: [
        // E-Ticaret & Hizmet
        'inanamıyorum', 'şaşırdım', 'beklemiyordum', 'vauv', 'wow', 'şok', 'beklentimin', 'beklediğimden',
        'hayret', 'nasıl', 'inanamadım', 'ilginç', 'şaşırtıcı', 'umduğumdan daha', 'beyin yaktı', 'şoke oldum',
        
        // Argo & Tepki İfadeleri
        'şaka gibi', 'yok artık', 'harbiden mi', 'ciddi misin', 'gözlerime inanamadım', 'dumur oldum',
        'şok geçirdim', 'beklenmedik sürpriz', 'sürpriz yaptılar', 'hiç tahmin etmezdim', 'neler oluyor',
        'şaştım kaldım', 'inanamıyorum gerçekten', 'vay be', 'ağzım açık kaldı', 'hassiktir', 'hasiktir',
        'yuh artık', 'çüş', 'oha'
    ],

    // 6. TİKSİNME / PİSLİK / ARGO İĞRENÇLİK
    disgust: [
        // E-Ticaret & Hizmet
        'iğrenç', 'pis', 'kokuyor', 'berbat', 'tiksindim', 'çöp', 'berbatlık', 'kalitesiz', 'koku', 'rezillik',
        'leş', 'küflü', 'böcekli', 'leke', 'kirli', 'pislik', 'mide bulandırıcı', 'mide bulantısı', 'mikrop',
        
        // Argo & Nefret İfadeleri
        'midem bulandı', 'tiksindim yemeğin tadından', 'kokudan durulmuyor', 'çöp kokusu', 'iğrenç bir ortam',
        'böcek çıktı', 'kıl çıktı', 'bulaşık', 'sinek var', 'ter kokusu', 'saçma sapan', 'tiksindirici',
        'mide bulandıran', 'pis kokulu', 'midem kaldırmadı', 'bok gibi', 'kaka', 'leş gibi'
    ],

    // 7. NÖTR / TARAFSIZ / GÜNLÜK RUTİN
    neutral: [
        'standart', 'ortalama', 'sıradan', 'elime ulaştı', 'teslim edildi', 'faturası var', 'kutusunda',
        'henüz denemedim', 'kargo geldi', 'ölçüsü', 'boyutu', 'rengi', 'normale göre', 'fiyatı',
        'evdeyim', 'otobüsteyim', 'işe gidiyorum', 'ders çalışıyorum', 'yemek yiyorum', 'saat kaç',
        'bugün salı', 'hava normal', 'rutin gün', 'çay içiyorum', 'kitap okuyorum', 'televizyon izliyorum',
        'bekliyorum', 'olağan', 'her zamanki gibi', 'değişiklik yok', 'nötr'
    ]
};

/**
 * Verilen Türkçe metni genişletilmiş duygu sözlüğü üzerinden analiz eder
 * @param {string} text 
 * @returns {Object} { joy: number, anger: number, sadness: number, fear: number, surprise: number, disgust: number, neutral: number }
 */
export function analyzeLexiconEmotions(text) {
    const lowerText = text.toLowerCase();
    
    const scores = {
        joy: 0,
        anger: 0,
        sadness: 0,
        fear: 0,
        surprise: 0,
        disgust: 0,
        neutral: 0
    };

    // Kelime ve kelime öbeği eşleşmeleri
    Object.keys(EMOTION_LEXICON).forEach((emotionKey) => {
        const words = EMOTION_LEXICON[emotionKey];
        words.forEach((word) => {
            if (lowerText.includes(word)) {
                // Uzun tam kelime öbeklerine veya argo küfür kelimelerine ekstra ağırlık ver
                const weight = word.includes(' ') ? 40 : 25;
                scores[emotionKey] += weight;
            }
        });
    });

    return scores;
}
