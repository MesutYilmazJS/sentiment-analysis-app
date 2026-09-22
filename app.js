/**
 * SentiPulse - 5 Seviyeli Duygu & Psikolojik Analiz Stüdyosu
 * Vanilla JS OOP Mimarisi
 */

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Tarayıcı içi önbellekleme aktif
env.allowLocalModels = false;

class SentimentApp {
    constructor() {
        this.classifier = null;
        this.modelName = 'Xenova/bert-base-multilingual-uncased-sentiment';
        this.history = [];

        // DOM Element Referansları
        this.elements = {
            inputText: document.getElementById('inputText'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            clearBtn: document.getElementById('clearBtn'),
            pasteBtn: document.getElementById('pasteBtn'),
            charCounter: document.getElementById('charCounter'),

            // Status
            statusContainer: document.getElementById('statusContainer'),
            statusText: document.getElementById('statusText'),
            statusProgressPct: document.getElementById('statusProgressPct'),
            statusProgressBar: document.getElementById('statusProgressBar'),

            // Results UI
            emptyResultState: document.getElementById('emptyResultState'),
            resultSection: document.getElementById('result'),
            resultCard: document.getElementById('resultCard'),
            resultAccentLine: document.getElementById('resultAccentLine'),
            sentimentEmoji: document.getElementById('sentimentEmoji'),
            sentimentTitle: document.getElementById('sentimentTitle'),
            sentimentSublabel: document.getElementById('sentimentSublabel'),
            confidenceScore: document.getElementById('confidenceScore'),
            starContainer: document.getElementById('starContainer'),
            meterFill: document.getElementById('meterFill'),

            // Emotion Spectrum
            primaryEmotionTag: document.getElementById('primaryEmotionTag'),
            emotionBarsContainer: document.getElementById('emotionBarsContainer'),

            // Specs & Clipboard
            timeValue: document.getElementById('timeValue'),
            rawScoreLabel: document.getElementById('rawScoreLabel'),
            copyResultBtn: document.getElementById('copyResultBtn'),
            copyToast: document.getElementById('copyToast'),

            // History
            historyList: document.getElementById('historyList'),
            historyBadge: document.getElementById('historyBadge'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),

            exampleChips: document.querySelectorAll('.example-chip'),
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCharCounter();
        console.log('🚀 SentiPulse Dual-Engine AI (5-Level & Emotion AI) Hazır.');
    }

    bindEvents() {
        // Analiz Tetikleyici
        this.elements.analyzeBtn.addEventListener('click', () => this.handleAnalyze());

        // Girdi Kontrolleri
        this.elements.inputText.addEventListener('input', () => this.updateCharCounter());
        this.elements.inputText.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.handleAnalyze();
            }
        });

        // Temizle & Yapıştır
        this.elements.clearBtn.addEventListener('click', () => {
            this.elements.inputText.value = '';
            this.updateCharCounter();
            this.elements.inputText.focus();
        });

        this.elements.pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    this.elements.inputText.value = text;
                    this.updateCharCounter();
                }
            } catch (err) {
                console.warn('Panoya erişim izni yok:', err);
            }
        });

        // Örnek Çipler
        this.elements.exampleChips.forEach((chip) => {
            chip.addEventListener('click', (e) => {
                const sampleText = e.currentTarget.getAttribute('data-text');
                if (sampleText) {
                    this.elements.inputText.value = sampleText;
                    this.updateCharCounter();
                    this.elements.inputText.focus();
                }
            });
        });

        // Kopyala
        this.elements.copyResultBtn.addEventListener('click', () => this.copyCurrentResult());

        // Geçmişi Temizle
        this.elements.clearHistoryBtn.addEventListener('click', () => {
            this.history = [];
            this.renderHistory();
        });
    }

    updateCharCounter() {
        const len = this.elements.inputText.value.length;
        this.elements.charCounter.textContent = `${len} karakter`;
    }

    async initModel() {
        if (this.classifier) return this.classifier;

        try {
            this.showStatus('Model yükleniyor...', 0);
            this.elements.analyzeBtn.disabled = true;

            this.classifier = await pipeline('sentiment-analysis', this.modelName, {
                progress_callback: (info) => {
                    if (info.status === 'progress') {
                        const pct = Math.round((info.loaded / info.total) * 100) || 0;
                        this.showStatus(`Model indiriliyor: %${pct}`, pct);
                    } else if (info.status === 'ready') {
                        this.showStatus('Model belleğe aktarılıyor...', 95);
                    }
                }
            });

            this.hideStatus();
            this.elements.analyzeBtn.disabled = false;
            return this.classifier;
        } catch (err) {
            console.error('Model yükleme hatası:', err);
            this.elements.analyzeBtn.disabled = false;
            this.showStatus(`Model yüklenemedi: ${err.message || err}`, 0, true);
            throw err;
        }
    }

    async handleAnalyze() {
        const text = this.elements.inputText.value.trim();

        if (!text) {
            this.triggerInputWarning('Lütfen önce bir metin girin.');
            return;
        }

        const startTime = performance.now();

        try {
            if (!this.classifier) {
                await this.initModel();
            }

            this.showStatus('5 Seviyeli Derecelendirme & Psikolojik Spektrum Hesaplanıyor...', 100);
            this.elements.analyzeBtn.disabled = true;

            // 1. Model Çıktısı (5-Star Sentiment Model)
            const modelOutput = await this.classifier(text);
            const durationMs = Math.round(performance.now() - startTime);

            // 2. Psikolojik Duygu Spektrumu Hesabı (7 Emotion Channels)
            const emotionSpectrum = this.calculatePsychologicalEmotions(text, modelOutput[0]);

            this.hideStatus();
            this.elements.analyzeBtn.disabled = false;

            if (modelOutput && modelOutput.length > 0) {
                const analysisResult = {
                    text,
                    output: modelOutput[0],
                    emotions: emotionSpectrum,
                    durationMs,
                    timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                };

                this.renderResult(analysisResult);
                this.addToHistory(analysisResult);
            }
        } catch (err) {
            console.error('Analiz hatası:', err);
            this.elements.analyzeBtn.disabled = false;
            this.showStatus(`Hata oluştu: ${err.message || err}`, 0, true);
        }
    }

    triggerInputWarning(msg) {
        this.elements.inputText.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
        setTimeout(() => {
            this.elements.inputText.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
        }, 1500);
    }

    showStatus(msg, pct = 0, isError = false) {
        this.elements.statusContainer.classList.remove('hidden');
        this.elements.statusText.textContent = msg;
        this.elements.statusProgressPct.textContent = pct > 0 ? `%${pct}` : '';
        this.elements.statusProgressBar.style.width = `${pct}%`;

        if (isError) {
            this.elements.statusProgressBar.className = 'h-full bg-rose-500 transition-all duration-300';
        } else {
            this.elements.statusProgressBar.className = 'h-full bg-blue-500 transition-all duration-300';
        }
    }

    hideStatus() {
        this.elements.statusContainer.classList.add('hidden');
    }

    /**
     * 7 Kanallı Psikolojik Duygu Spektrumu Hesaplayıcı
     * (Neşe, Öfke, Üzüntü, Korku, Şaşkınlık, Tiksinme, Nötr)
     */
    calculatePsychologicalEmotions(text, sentimentOutput) {
        const lowerText = text.toLowerCase();
        const { label, score } = sentimentOutput;

        // Baz puanlar
        let joy = 5;
        let anger = 5;
        let sadness = 5;
        let fear = 5;
        let surprise = 5;
        let disgust = 5;
        let neutral = 10;

        // Semantik Duygu Sözlükleri
        const joyWords = ['harika', 'muhteşem', 'beğendim', 'mutlu', 'güzel', 'süper', 'mükemmel', 'sevindim', 'kaliteli', 'tavsiye', 'hızlı', 'teşekkür', 'efsane', 'başkası', 'iyi', 'sevdim'];
        const angerWords = ['rezalet', 'berbat', 'kızgın', 'öfke', 'fiyasko', 'kötü', 'pişman', 'sakın', 'almayın', 'suratıma', 'şikayet', 'hırsız', 'dolandırıcı', 'saygısız', 'ilgisiz', 'kabul edilemez', 'iade'];
        const sadnessWords = ['üzgünüm', 'kırıldım', 'mağdur', 'yazık', 'bozuldu', 'kırık', 'ezik', 'gecikti', 'bekledim', 'hüsran', 'tatsız', 'maalesef', 'eksik', 'çaresiz'];
        const fearWords = ['korkuyorum', 'endişe', 'şüphe', 'güvensiz', 'tehlike', 'riski', 'korkunç', 'acaba', 'zarar', 'patlayabilir', 'patladı', 'sahte'];
        const surpriseWords = ['inanamıyorum', 'şaşırdım', 'beklemiyordum', 'vauv', 'şok', 'beklentimin', 'beklediğimden', 'hayret', 'nasıl'];
        const disgustWords = ['iğrenç', 'pis', 'kokuyor', 'berbat', 'tiksindim', 'çöp', 'berbatlık', 'kalitesiz', 'koku', 'rezillik'];

        // Kelime sayımları
        joyWords.forEach(w => { if (lowerText.includes(w)) joy += 25; });
        angerWords.forEach(w => { if (lowerText.includes(w)) anger += 30; });
        sadnessWords.forEach(w => { if (lowerText.includes(w)) sadness += 25; });
        fearWords.forEach(w => { if (lowerText.includes(w)) fear += 25; });
        surpriseWords.forEach(w => { if (lowerText.includes(w)) surprise += 25; });
        disgustWords.forEach(w => { if (lowerText.includes(w)) disgust += 25; });

        // Ünlem ve Soru işareti etkileri
        if (lowerText.includes('!')) {
            anger += 10;
            joy += 10;
            surprise += 15;
        }
        if (lowerText.includes('?')) {
            fear += 10;
            neutral += 10;
            surprise += 10;
        }

        // 5-Star Model etiket ağırlıklandırması
        if (label.includes('5 stars')) {
            joy += 50 * score;
            neutral = Math.max(2, neutral - 10);
        } else if (label.includes('4 stars')) {
            joy += 35 * score;
        } else if (label.includes('3 stars')) {
            neutral += 40 * score;
        } else if (label.includes('2 stars')) {
            sadness += 30 * score;
            anger += 20 * score;
        } else if (label.includes('1 star')) {
            anger += 50 * score;
            disgust += 25 * score;
        }

        const total = joy + anger + sadness + fear + surprise + disgust + neutral;

        const emotions = [
            { name: 'Neşe / Mutluluk', key: 'joy', icon: '😊', score: Math.round((joy / total) * 100), color: 'bg-emerald-500' },
            { name: 'Öfke / Kızgınlık', key: 'anger', icon: '😡', score: Math.round((anger / total) * 100), color: 'bg-rose-500' },
            { name: 'Üzüntü / Hayal Kırıklığı', key: 'sadness', icon: '😢', score: Math.round((sadness / total) * 100), color: 'bg-blue-500' },
            { name: 'Endişe / Korku', key: 'fear', icon: '😨', score: Math.round((fear / total) * 100), color: 'bg-purple-500' },
            { name: 'Şaşkınlık', key: 'surprise', icon: '😲', score: Math.round((surprise / total) * 100), color: 'bg-pink-500' },
            { name: 'Tiksinme', key: 'disgust', icon: '🤢', score: Math.round((disgust / total) * 100), color: 'bg-amber-600' },
            { name: 'Nötr / Kararsız', key: 'neutral', icon: '😐', score: Math.round((neutral / total) * 100), color: 'bg-slate-500' },
        ];

        // Sırala
        emotions.sort((a, b) => b.score - a.score);
        return emotions;
    }

    /**
     * Ekrana 5-Star ve Psikolojik Spektrumu Çizme
     */
    renderResult(item) {
        const { label, score } = item.output;
        const confidencePct = (score * 100).toFixed(1);

        // 5 Seviyeli Derecelendirme Haritası
        let starsCount = 3;
        let displayTitle = '3 / 5 Yıldız (Nötr)';
        let sublabel = 'Dengeli veya kararsız metin tonu';
        let emoji = '😐';
        let accentColor = 'bg-amber-500';
        let textColor = 'text-amber-400';
        let meterGradient = 'from-amber-500 to-yellow-400';

        if (label.includes('5 stars')) {
            starsCount = 5;
            displayTitle = '5 / 5 Yıldız (Coşkulu Pozitif)';
            sublabel = 'Mükemmel derece ve yüksek övgü ifadesi';
            emoji = '😍';
            accentColor = 'bg-emerald-500';
            textColor = 'text-emerald-400';
            meterGradient = 'from-emerald-500 to-teal-400';
        } else if (label.includes('4 stars') || label === 'POSITIVE') {
            starsCount = 4;
            displayTitle = '4 / 5 Yıldız (Pozitif)';
            sublabel = 'Genel olarak olumlu ve memnun geri bildirim';
            emoji = '😊';
            accentColor = 'bg-teal-500';
            textColor = 'text-teal-400';
            meterGradient = 'from-teal-500 to-emerald-400';
        } else if (label.includes('3 stars')) {
            starsCount = 3;
            displayTitle = '3 / 5 Yıldız (Nötr / Dengeli)';
            sublabel = 'Nötr, tarafsız veya orta seviye durum';
            emoji = '😐';
            accentColor = 'bg-amber-500';
            textColor = 'text-amber-400';
            meterGradient = 'from-amber-500 to-yellow-400';
        } else if (label.includes('2 stars')) {
            starsCount = 2;
            displayTitle = '2 / 5 Yıldız (Olumsuz)';
            sublabel = 'Belirgin memnuniyetsizlik veya kusur beyanı';
            emoji = '🙁';
            accentColor = 'bg-orange-500';
            textColor = 'text-orange-400';
            meterGradient = 'from-orange-500 to-rose-400';
        } else if (label.includes('1 star') || label === 'NEGATIVE') {
            starsCount = 1;
            displayTitle = '1 / 5 Yıldız (Aşırı Olumsuz / Öfkeli)';
            sublabel = 'Ciddi şikayet, öfke veya hüsran ifadesi';
            emoji = '😡';
            accentColor = 'bg-rose-500';
            textColor = 'text-rose-400';
            meterGradient = 'from-rose-600 to-pink-500';
        }

        // Header DOM Güncellemeleri
        this.elements.sentimentEmoji.textContent = emoji;
        this.elements.sentimentTitle.textContent = displayTitle;
        this.elements.sentimentSublabel.textContent = sublabel;
        this.elements.confidenceScore.textContent = `%${confidencePct}`;
        this.elements.confidenceScore.className = `text-2xl font-mono font-bold ${textColor}`;
        this.elements.timeValue.textContent = item.durationMs;
        this.elements.rawScoreLabel.textContent = `Etiket: ${label} (${score.toFixed(3)})`;

        // Üst Çizgi Aksanı
        this.elements.resultAccentLine.className = `absolute top-0 left-0 right-0 h-1 ${accentColor}`;

        // Meter Bar
        this.elements.meterFill.className = `h-full rounded bg-gradient-to-r ${meterGradient} transition-all duration-700 ease-out`;
        setTimeout(() => {
            const meterPct = Math.round((starsCount / 5) * 100);
            this.elements.meterFill.style.width = `${meterPct}%`;
        }, 50);

        // Yıldız İkonları
        let starHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= starsCount) {
                starHTML += `<i class="fa-solid fa-star text-amber-400"></i>`;
            } else {
                starHTML += `<i class="fa-regular fa-star text-slate-700"></i>`;
            }
        }
        this.elements.starContainer.innerHTML = starHTML;

        // 2. Psikolojik Duygu Spektrumunu Çizme
        const emotions = item.emotions;
        const topEmotion = emotions[0];
        this.elements.primaryEmotionTag.textContent = `Baskın Duygu: ${topEmotion.icon} ${topEmotion.name} (%${topEmotion.score})`;

        let emotionHTML = '';
        emotions.slice(0, 5).forEach((e) => {
            emotionHTML += `
                <div class="space-y-1">
                    <div class="flex justify-between items-center text-[11px] font-mono">
                        <span class="text-slate-300 flex items-center gap-1.5">
                            <span>${e.icon}</span>
                            <span>${e.name}</span>
                        </span>
                        <span class="text-slate-400 font-bold">%${e.score}</span>
                    </div>
                    <div class="w-full bg-surface-950 h-2 rounded-full overflow-hidden border border-surface-800/80">
                        <div class="h-full rounded ${e.color} transition-all duration-500 ease-out" style="width: ${e.score}%"></div>
                    </div>
                </div>
            `;
        });

        this.elements.emotionBarsContainer.innerHTML = emotionHTML;

        // Görünürlük
        this.elements.emptyResultState.classList.add('hidden');
        this.elements.resultSection.classList.remove('hidden');
        this.elements.resultCard.classList.add('animate-fade-in-up');
    }

    addToHistory(item) {
        this.history.unshift(item);
        if (this.history.length > 9) this.history.pop();
        this.renderHistory();
    }

    renderHistory() {
        this.elements.historyBadge.textContent = this.history.length;

        if (this.history.length === 0) {
            this.elements.historyList.innerHTML = `
                <div class="col-span-full text-center py-6 text-xs text-slate-500 bg-surface-900/40 rounded-xl border border-surface-800/50">
                    Henüz analiz edilen bir metin geçmişi bulunmuyor.
                </div>
            `;
            return;
        }

        let html = '';
        this.history.forEach((histItem, index) => {
            const label = histItem.output.label;
            const topEmotion = histItem.emotions[0];
            const truncatedText = histItem.text.length > 65 ? histItem.text.substring(0, 65) + '...' : histItem.text;

            let badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            if (label.includes('5 stars') || label.includes('4 stars')) {
                badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            } else if (label.includes('1 star') || label.includes('2 stars')) {
                badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            }

            html += `
                <div class="history-item bg-surface-900 border border-surface-800 rounded-xl p-3 flex flex-col justify-between gap-2 cursor-pointer hover:border-surface-700" data-index="${index}">
                    <p class="text-xs text-slate-300 leading-snug line-clamp-2">"${truncatedText}"</p>
                    <div class="flex items-center justify-between text-[11px] pt-2 border-t border-surface-850">
                        <span class="inline-flex items-center gap-1 border px-2 py-0.5 rounded-md font-mono ${badgeColor}">
                            <span>${topEmotion.icon}</span>
                            <span>${label}</span>
                        </span>
                        <span class="text-slate-500 font-mono text-[10px]">${histItem.timestamp}</span>
                    </div>
                </div>
            `;
        });

        this.elements.historyList.innerHTML = html;

        this.elements.historyList.querySelectorAll('.history-item').forEach((itemEl) => {
            itemEl.addEventListener('click', (e) => {
                const idx = e.currentTarget.getAttribute('data-index');
                if (idx !== null && this.history[idx]) {
                    const savedItem = this.history[idx];
                    this.elements.inputText.value = savedItem.text;
                    this.updateCharCounter();
                    this.renderResult(savedItem);
                }
            });
        });
    }

    copyCurrentResult() {
        const title = this.elements.sentimentTitle.textContent;
        const confidence = this.elements.confidenceScore.textContent;
        const topEmotion = this.elements.primaryEmotionTag.textContent;
        const text = this.elements.inputText.value;

        const summary = `SentiPulse Duygu Analizi:\nMetin: "${text}"\nDerecelendirme: ${title} (${confidence})\n${topEmotion}`;
        navigator.clipboard.writeText(summary).then(() => {
            this.elements.copyToast.classList.remove('hidden');
            setTimeout(() => {
                this.elements.copyToast.classList.add('hidden');
            }, 2000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.sentimentApp = new SentimentApp();
});
