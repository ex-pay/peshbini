// سیستمی زمان (سێ شێوەزار)
class LanguageManager {
    constructor() {
        this.currentLang = 'ckb'; // سۆرانی پێشوەختە
        this.init();
    }

    init() {
        // وەرگرتنی دوگمەکانی زمان
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
                
                // چالاککردنی دوگمەکە
                langButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // وەرگرتنی زمانی پاشەکەوتکراو لە local storage
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            this.setLanguage(savedLang);
            document.querySelector(`[data-lang="${savedLang}"]`)?.classList.add('active');
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // گۆڕینی هەموو تێکستەکان
        document.querySelectorAll('[data-lang-ckb], [data-lang-bad], [data-lang-kmr]').forEach(element => {
            const text = element.dataset[`lang${lang}`];
            if (text) {
                element.textContent = text;
            }
        });
    }
}

// سیستمی کۆین
class CoinManager {
    constructor() {
        this.coins = 7; // لە سەرەتادا ٧ کۆین
        this.init();
    }

    init() {
        this.updateDisplay();
    }

    useCoin(amount = 1) {
        if (this.coins >= amount) {
            this.coins -= amount;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    addCoins(amount) {
        this.coins += amount;
        this.updateDisplay();
    }

    updateDisplay() {
        const coinDisplay = document.getElementById('user-coins');
        if (coinDisplay) {
            coinDisplay.textContent = this.coins;
        }
    }

    resetWeekly() {
        this.coins = 7;
        this.updateDisplay();
        this.showNotification('کۆینەکانت نوێ کرانەوە! ٧ کۆینی وەرگرت');
    }

    showNotification(message) {
        // دروستکردنی نوتیفیکەیشن
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        // لابرتن دوای ٣ چرکە
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// سیستمی یارییەکان
class MatchManager {
    constructor() {
        this.matches = [];
        this.predictionTypes = [
            { id: 'home_win', name_ckb: 'بردنەوەی تیمی ماڵەوە', name_bad: 'بردنەوەی تیمی ماڵەوە', name_kmr: 'Serkeftina tîma malê' },
            { id: 'away_win', name_ckb: 'بردنەوەی تیمی میوان', name_bad: 'بردنەوەی تیمی میوان', name_kmr: 'Serkeftina tîma mêvan' },
            { id: 'draw', name_ckb: 'یەکسان بوونی هەردوو تیم', name_bad: 'یەکسان بوونی هەردوو تیم', name_kmr: 'Weksan' },
            { id: 'home_or_draw', name_ckb: 'بردنەوە و یەکسان بوونی تیمی ماڵەوە', name_bad: 'بردنەوە و یەکسان بوونی تیمی ماڵەوە', name_kmr: 'Tîma malê an weksan' },
            { id: 'away_or_draw', name_ckb: 'بردنەوە و یەکسان بوونی تیمی میوان', name_bad: 'بردنەوە و یەکسان بوونی تیمی میوان', name_kmr: 'Tîma mêvan an weksan' },
            { id: 'no_draw', name_ckb: 'بردنەوەی تیمی ماڵ یان بردنەوەی تیمی میوان', name_bad: 'بردنەوەی تیمی ماڵ یان بردنەوەی تیمی میوان', name_kmr: 'Serkeftina malê an mêvan' },
            { id: 'btts', name_ckb: 'هەردوو تیم گۆل دەکەن', name_bad: 'هەردوو تیم گۆل دەکەن', name_kmr: 'Herdu tîm gol dikin' },
            { id: 'over_0_5', name_ckb: 'گۆل لە یاری زیاتر لە 0.5', name_bad: 'گۆل لە یاری زیاتر لە 0.5', name_kmr: 'Zêdetirî 0.5 gol' },
            { id: 'over_1_5', name_ckb: 'گۆل لە یاری زیاتر لە 1.5', name_bad: 'گۆل لە یاری زیاتر لە 1.5', name_kmr: 'Zêdetirî 1.5 gol' },
            { id: 'over_2_5', name_ckb: 'گۆل لە یاری زیاتر لە 2.5', name_bad: 'گۆل لە یاری زیاتر لە 2.5', name_kmr: 'Zêdetirî 2.5 gol' },
            { id: 'over_3_5', name_ckb: 'گۆل لە یاری زیاتر لە 3.5', name_bad: 'گۆل لە یاری زیاتر لە 3.5', name_kmr: 'Zêdetirî 3.5 gol' },
            { id: 'over_4_5', name_ckb: 'گۆل لە یاری زیاتر لە 4.5', name_bad: 'گۆل لە یاری زیاتر لە 4.5', name_kmr: 'Zêdetirî 4.5 gol' },
            { id: 'over_5_5', name_ckb: 'گۆل لە یاری زیاتر لە 5.5', name_bad: 'گۆل لە یاری زیاتر لە 5.5', name_kmr: 'Zêdetirî 5.5 gol' },
            { id: 'over_6_5', name_ckb: 'گۆل لە یاری زیاتر لە 6.5', name_bad: 'گۆل لە یاری زیاتر لە 6.5', name_kmr: 'Zêdetirî 6.5 gol' }
        ];
    }

    loadMatches() {
        // ئێستا بە داتای ساختە (Mock Data) کاردەکەین
        this.matches = [
            {
                id: 1,
                homeTeam: 'مانچستەر یونایتد',
                awayTeam: 'لیڤەرپوول',
                date: '2024-03-06',
                time: '20:45',
                status: 'SCHEDULED'
            },
            {
                id: 2,
                homeTeam: 'ئارسناڵ',
                awayTeam: 'چێڵسی',
                date: '2024-03-06',
                time: '18:30',
                status: 'SCHEDULED'
            },
            {
                id: 3,
                homeTeam: 'ڕیال مەدرید',
                awayTeam: 'بارسێلۆنا',
                date: '2024-03-07',
                time: '21:00',
                status: 'SCHEDULED'
            }
        ];
        
        this.displayTodayMatches();
    }

    displayTodayMatches() {
        const container = document.getElementById('today-matches');
        if (!container) return;

        const today = new Date().toISOString().split('T')[0];
        const todayMatches = this.matches.filter(m => m.date === today);

        if (todayMatches.length === 0) {
            container.innerHTML = '<p class="no-matches">هیچ یارییەک ئەمڕۆ نییە</p>';
            return;
        }

        container.innerHTML = todayMatches.map(match => `
            <div class="match-card" data-match-id="${match.id}">
                <div class="match-teams">
                    <span class="team home">${match.homeTeam}</span>
                    <span class="vs">vs</span>
                    <span class="team away">${match.awayTeam}</span>
                </div>
                <div class="match-time">${match.time}</div>
                <div class="predictions-count"><i class="fas fa-chart-simple"></i> 14 پێشبینی</div>
                <button class="btn btn-primary btn-small predict-btn" onclick="showPredictions(${match.id})">
                    <span data-lang-ckb="پێشبینی کردن" data-lang-bad="پێشبینی کردن" data-lang-kmr="Pêşbînî bike">پێشبینی کردن</span>
                </button>
            </div>
        `).join('');
    }

    showPredictionModal(matchId) {
        const match = this.matches.find(m => m.id === matchId);
        if (!match) return;

        // دروستکردنی مۆدال
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${match.homeTeam} vs ${match.awayTeam}</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="modal-time">${match.time}</p>
                    <div class="predictions-grid">
                        ${this.predictionTypes.map(type => `
                            <div class="prediction-item" onclick="selectPrediction('${type.id}', ${matchId})">
                                <span class="prediction-name">${type.name_ckb}</span>
                                <span class="prediction-cost"><i class="fas fa-coins" style="color: #FFA500;"></i> 1</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="this.closest('.modal').remove()">داخستن</button>
                    <button class="btn btn-primary" onclick="addToList(${matchId})">زیادکردن بۆ لیست</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// دەستپێکردنی هەموو سیستەمەکان
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
    window.coinManager = new CoinManager();
    window.matchManager = new MatchManager();
    
    matchManager.loadMatches();
    
    // پێشنیاری بەکارهێنەر بۆ تۆمارکردن ئەگەر نەگەیشتووە
    if (!localStorage.getItem('userLoggedIn')) {
        setTimeout(() => {
            if (confirm('ئایا دەتەوێت تۆمار بکەیت بۆ وەرگرتنی ٧ کۆین؟')) {
                window.location.href = 'register.html';
            }
        }, 5000);
    }
});

// فەنکشنە جیهانییەکان
function showPredictions(matchId) {
    if (!localStorage.getItem('userLoggedIn')) {
        alert('تکایە سەرەتا تۆمار بکە یان بچۆ ژوورەوە');
        window.location.href = 'login.html';
        return;
    }
    
    matchManager.showPredictionModal(matchId);
}

function selectPrediction(typeId, matchId) {
    if (coinManager.useCoin(1)) {
        alert(`پێشبینییەکەت تۆمار کرا! (${typeId})`);
        // لە ڕاستیدا، پێویستە پێشبینییەکە لە بنکەی زانیاری تۆمار بکەیت
    } else {
        alert('کۆینی تەواوت نییە! تا هەینی چاوەڕێ بکە بۆ نوێکردنەوە');
    }
}

function addToList(matchId) {
    // ئەمە دواتر جێبەجێ دەکەین
    alert('ئەم تایبەتمەندییە لە داهاتوودا زیاد دەکرێت');
}

// ستایلی نوتیفیکەیشن و مۆدال
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--primary);
        color: var(--secondary);
        padding: 15px 25px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
        from {
            top: -50px;
            opacity: 0;
        }
        to {
            top: 20px;
            opacity: 1;
        }
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: var(--white);
        border-radius: var(--border-radius);
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-time {
        text-align: center;
        color: #666;
        margin-bottom: 20px;
    }

    .predictions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
    }

    .prediction-item {
        padding: 10px;
        border: 1px solid #eee;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .prediction-item:hover {
        background-color: var(--primary-light);
        border-color: var(--primary);
    }

    .modal-footer {
        padding: 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
`;

document.head.appendChild(style);
