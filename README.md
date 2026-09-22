# 🧠 SentiPulse - Yapay Zeka Duygu & Psikolojik Analiz Stüdyosu

[![Live Demo](https://img.shields.io/badge/🌐_Canlı_Demo-GitHub_Pages-2563eb?style=for-the-badge)](https://mesutyilmazjs.github.io/sentiment-analysis-app/)
![Transformers.js](https://img.shields.io/badge/AI-Transformers.js_v2.17-6366f1?style=for-the-badge&logo=huggingface&logoColor=white)
![WebAI](https://img.shields.io/badge/Client_Side-100%25_Private-10b981?style=for-the-badge&logo=javascript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/UI-Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-amber-500?style=for-the-badge)

> 🚀 **Canlı Demo:** Uygulamayı doğrudan tarayıcınızda denemek için 👉 [**mesutyilmazjs.github.io/sentiment-analysis-app**](https://mesutyilmazjs.github.io/sentiment-analysis-app/)

SentiPulse, herhangi bir arka plan (backend) sunucusuna ihtiyaç duymadan **%100 tarayıcı üzerinde (Web AI)** yerel olarak çalışan, Türkçe destekli, **5 Seviyeli Duygu Derecelendirmesi** ve **7 Kanallı Psikolojik Duygu Spektrumu** sunan modern bir metin analitiği uygulamasıdır.

---

## 🌟 Öne Çıkan Özellikler

- ⚡ **%100 Tarayıcı İçi İşlem (In-Browser Execution):** Verileriniz hiçbir sunucuya gönderilmez. Tüm analiz HuggingFace `Transformers.js` ile istemci tarafında yapılır.
- 🌟 **5 Seviyeli Hassas Derecelendirme (1-5 Yıldız):**
  - **5 Yıldız:** 😍 Coşkulu Pozitif (Mükemmel memnuniyet & övgü)
  - **4 Yıldız:** 😊 Pozitif (Genel olumlu görüş)
  - **3 Yıldız:** 😐 Nötr / Kararsız (Dengeli veya bilgi odaklı metin)
  - **2 Yıldız:** 🙁 Olumsuz (Memnuniyetsizlik veya kusur beyanı)
  - **1 Yıldız:** 😡 Aşırı Olumsuz / Öfkeli (Ciddi şikayet & mağduriyet)
- 🎭 **7 Kanallı Psikolojik Duygu Spektrumu (Emotion Spectrum):**
  - Neşe / Mutluluk (Joy)
  - Öfke / Kızgınlık (Anger)
  - Üzüntü / Hayal Kırıklığı (Sadness)
  - Endişe / Korku (Fear)
  - Şaşkınlık (Surprise)
  - Tiksinme (Disgust)
  - Nötr / Tarafsız (Neutral)
- 🎙️ **Sesli Girdi (Web Speech API):** Mikrofona basarak konuşun, Türkçe konuşmanız anında metne dökülsün (`tr-TR`).
- ⏱️ **Milisaniye Cinsinden Canlı Performans Ölçümü:** Analizlerin kaç `ms` içinde tamamlandığını canlı ölçer.
- 🕒 **Oturum Geçmişi (Session History):** Gerçekleştirilen analizleri oturum boyunca hafızada tutar ve tek tıkla eski sonuçlara dönmenizi sağlar.
- 📋 **Tek Tıkla Kopyalama:** Analiz sonuç özetlerini panoya kopyalama özelliği.
- 📱 **Tam Duyarlı (Responsive) Stüdyo Arayüzü:** Masaüstü, tablet ve mobil uyumlu koyu tema (Dark Mode) tasarımı.

---

## 🛠️ Kullanılan Teknolojiler

- **Yapay Zeka Motoru:** HuggingFace `@xenova/transformers` (Model: `Xenova/bert-base-multilingual-uncased-sentiment`)
- **Arayüz & Tasarım:** Tailwind CSS (CDN), FontAwesome 6, Google Fonts (Plus Jakarta Sans & JetBrains Mono)
- **Mimari:** Vanilla JavaScript **OOP (Nesne Yönelimli Programlama - ES Module)**

---

## 🚀 Hızlı Başlangıç

Uygulamayı bilgisayarınızda çalıştırmak için ekstra bir kurulum yapmanıza veya `npm install` çalıştırmanıza gerek yoktur.

### 1. Depoyu Kopyalayın (Clone)
```bash
git clone https://github.com/mesutyilmazjs/sentiment-analysis-app.git
cd sentiment-analysis-app
```

### 2. Yerel Sunucu Başlatın
Herhangi bir statik HTTP sunucusu ile çalıştırmanız yeterlidir:

**Python ile:**
```bash
python3 -m http.server 8080
```

**VS Code Live Server:**
`index.html` dosyasına sağ tıklayıp **"Open with Live Server"** seçeneğini kullanabilirsiniz.

### 3. Tarayıcıda Açın
Tarayıcınızda `http://localhost:8080` adresine gidin.

---

## 📂 Proje Yapısı

```
sentiment-analysis-app/
│
├── index.html       # Semantik HTML5 ve Tailwind CSS stüdyo düzeni
├── style.css        # Özel gradientler, animasyonlar ve ızgara dokusu
├── app.js           # Vanilla JS OOP (SentimentApp sınıfı) & Transformers.js mantığı
└── README.md        # Proje dokümantasyonu
```

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır. Serbestçe kullanılabilir ve geliştirilebilir.
