/**
 * SentiPulse - Yapay Zeka Duygu Analitiği Stüdyosu
 * Vanilla JS OOP Mimarisi
 */

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Tarayıcı içinde önbelleğe izin ver
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

            // Status Elements
            statusContainer: document.getElementById('statusContainer'),
            statusText: document.getElementById('statusText'),
            statusProgressPct: document.getElementById('statusProgressPct'),
            statusProgressBar: document.getElementById('statusProgressBar'),

            // Result Display
            emptyResultState: document.getElementById('emptyResultState'),
            resultSection: document.getElementById('result'),
            resultCard: document.getElementById('resultCard'),
            resultAccentLine: document.getElementById('resultAccentLine'),
            sentimentEmoji: document.getElementById('sentimentEmoji'),
            sentimentTitle: document.getElementById('sentimentTitle'),
            sentimentSublabel: document.getElementById('sentimentSublabel'),
            confidenceScore: document.getElementById('confidenceScore'),
            rawScoreLabel: document.getElementById('rawScoreLabel'),
            meterFill: document.getElementById('meterFill'),
            starContainer: document.getElementById('starContainer'),
            timeValue: document.getElementById('timeValue'),
            copyResultBtn: document.getElementById('copyResultBtn'),
            copyToast: document.getElementById('copyToast'),

            // History
            historyList: document.getElementById('historyList'),
            historyBadge: document.getElementById('historyBadge'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),

            // Example chips
            exampleChips: document.querySelectorAll('.example-chip'),
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCharCounter();
        console.log('🚀 SentiPulse Studio (OOP Engine) Hazır.');
    }

    bindEvents() {
        // Analiz Butonu
        this.elements.analyzeBtn.addEventListener('click', () => this.handleAnalyze());

        // Metin Kutusu Girdileri
        this.elements.inputText.addEventListener('input', () => this.updateCharCounter());
        this.elements.inputText.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.handleAnalyze();
            }
        });

        // Temizle Butonu
        this.elements.clearBtn.addEventListener('click', () => {
            this.elements.inputText.value = '';
            this.updateCharCounter();
            this.elements.inputText.focus();
        });

        // Yapıştır Butonu
        this.elements.pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    this.elements.inputText.value = text;
                    this.updateCharCounter();
                }
            } catch (err) {
                console.warn('Panoya erişilemedi:', err);
            }
        });

        // Hızlı Örnek Çipleri
        this.elements.exampleChips.forEach((chip) => {
            chip.addEventListener('click', (e) => {
                const text = e.currentTarget.getAttribute('data-text');
                if (text) {
                    this.elements.inputText.value = text;
                    this.updateCharCounter();
                    this.elements.inputText.focus();
                }
            });
        });

        // Sonucu Kopyala
        this.elements.copyResultBtn.addEventListener('click', () => this.copyCurrentResult());

        // Geçmişi Temizle
        this.elements.clearHistoryBtn.addEventListener('click', () => {
            this.history = [];
            this.renderHistory();
        });
    }

    updateCharCounter() {
        const count = this.elements.inputText.value.length;
        this.elements.charCounter.textContent = `${count} karakter`;
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
                        this.showStatus(`Model dosyaları indiriliyor: %${pct}`, pct);
                    } else if (info.status === 'ready') {
                        this.showStatus('Model belleğe aktarılıyor...', 95);
                    }
                }
            });

            this.hideStatus();
            this.elements.analyzeBtn.disabled = false;
            return this.classifier;
        } catch (error) {
            console.error('Model yükleme hatası:', error);
            this.elements.analyzeBtn.disabled = false;
            this.showStatus(`Hata: ${error.message || error}`, 0, true);
            throw error;
        }
    }

    async handleAnalyze() {
        const text = this.elements.inputText.value.trim();

        if (!text) {
            this.triggerInputWarning('Lütfen önce analiz edilecek bir metin girin.');
            return;
        }

        const startTime = performance.now();

        try {
            if (!this.classifier) {
                await this.initModel();
            }

            this.showStatus('Metin duygu analizi yapılıyor...', 100);
            this.elements.analyzeBtn.disabled = true;

            const output = await this.classifier(text);
            const durationMs = Math.round(performance.now() - startTime);

            this.hideStatus();
            this.elements.analyzeBtn.disabled = false;

            if (output && output.length > 0) {
                const analysisResult = {
                    text,
                    output: output[0],
                    durationMs,
                    timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                };

                this.renderResult(analysisResult);
                this.addToHistory(analysisResult);
            }
        } catch (error) {
            console.error('Analiz hatası:', error);
            this.elements.analyzeBtn.disabled = false;
            this.showStatus(`Analiz başarısız: ${error.message || error}`, 0, true);
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

    renderResult(item) {
        const { label, score } = item.output;
        const confidencePct = (score * 100).toFixed(1);

        let displayTitle = 'Nötr';
        let sublabel = 'Dengeli veya kararsız metin tonu';
        let emoji = '😐';
        let starsCount = 3;
        let accentColor = 'bg-amber-500';
        let textColor = 'text-amber-400';
        let meterGradient = 'from-amber-500 to-yellow-400';

        if (label.includes('1 star') || label.includes('2 stars') || label === 'NEGATIVE') {
            displayTitle = label.includes('1 star') ? 'Çok Olumsuz' : 'Olumsuz';
            sublabel = 'Belirgin olumsuzluk veya şikayet ifadesi';
            emoji = label.includes('1 star') ? '😡' : '🙁';
            starsCount = label.includes('1 star') ? 1 : 2;
            accentColor = 'bg-rose-500';
            textColor = 'text-rose-400';
            meterGradient = 'from-rose-600 to-pink-500';
        } else if (label.includes('4 stars') || label.includes('5 stars') || label === 'POSITIVE') {
            displayTitle = label.includes('5 stars') ? 'Mükemmel / Çok Pozitif' : 'Pozitif';
            sublabel = 'Yüksek memnuniyet ve övgü ifadesi';
            emoji = label.includes('5 stars') ? '😍' : '😊';
            starsCount = label.includes('5 stars') ? 5 : 4;
            accentColor = 'bg-emerald-500';
            textColor = 'text-emerald-400';
            meterGradient = 'from-emerald-500 to-teal-400';
        }

        // Card DOM Updates
        this.elements.sentimentEmoji.textContent = emoji;
        this.elements.sentimentTitle.textContent = displayTitle;
        this.elements.sentimentSublabel.textContent = sublabel;
        this.elements.confidenceScore.textContent = `%${confidencePct}`;
        this.elements.confidenceScore.className = `text-2xl font-mono font-bold ${textColor}`;
        this.elements.rawScoreLabel.textContent = `Etiket: ${label} (Skor: ${score.toFixed(4)})`;
        this.elements.timeValue.textContent = item.durationMs;

        // Accent Top Line
        this.elements.resultAccentLine.className = `absolute top-0 left-0 right-0 h-1 ${accentColor}`;

        // Meter Fill
        this.elements.meterFill.className = `h-full rounded bg-gradient-to-r ${meterGradient} transition-all duration-700 ease-out`;
        setTimeout(() => {
            this.elements.meterFill.style.width = `${confidencePct}%`;
        }, 50);

        // Star icons
        let starHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= starsCount) {
                starHTML += `<i class="fa-solid fa-star text-amber-400"></i>`;
            } else {
                starHTML += `<i class="fa-regular fa-star text-slate-700"></i>`;
            }
        }
        this.elements.starContainer.innerHTML = starHTML;

        // Toggle state
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
            const score = (histItem.output.score * 100).toFixed(0);

            let badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            let icon = '😐';

            if (label.includes('1 star') || label.includes('2 stars') || label === 'NEGATIVE') {
                badgeBg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                icon = '😡';
            } else if (label.includes('4 stars') || label.includes('5 stars') || label === 'POSITIVE') {
                badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                icon = '😊';
            }

            const truncatedText = histItem.text.length > 70 ? histItem.text.substring(0, 70) + '...' : histItem.text;

            html += `
                <div class="history-item bg-surface-900 border border-surface-800 rounded-xl p-3 flex flex-col justify-between gap-2 cursor-pointer hover:border-surface-700" data-index="${index}">
                    <p class="text-xs text-slate-300 leading-snug line-clamp-2">"${truncatedText}"</p>
                    <div class="flex items-center justify-between text-[11px] pt-2 border-t border-surface-850">
                        <span class="inline-flex items-center gap-1 border px-2 py-0.5 rounded-md font-mono ${badgeBg}">
                            <span>${icon}</span>
                            <span>%${score}</span>
                        </span>
                        <span class="text-slate-500 font-mono text-[10px]">${histItem.timestamp}</span>
                    </div>
                </div>
            `;
        });

        this.elements.historyList.innerHTML = html;

        // Geçmiş elemanına tıklayınca metni textarea'ya geri yükle
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
        const text = this.elements.inputText.value;

        const summary = `SentiPulse Analizi:\nMetin: "${text}"\nSonuç: ${title} (${confidence})`;
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
