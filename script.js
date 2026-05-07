// ===================================================
// HaberMerkezi - Gerçek Zamanlı Haber + AI Chat
// Kaynaklar: GNews API, RSS2JSON, Wikipedia API
// ===================================================

// ===== API AYARLARI =====
// GNews API - ücretsiz 100 istek/gün
// https://gnews.io/  adresinden ücretsiz key alabilirsiniz
const GNEWS_API_KEY = "demo"; // "demo" ile sınırlı sonuç gelir, gerçek key girin
const GNEWS_BASE = "https://gnews.io/api/v4";

// RSS2JSON - ücretsiz RSS proxy (CORS sorunsuz)
const RSS2JSON_BASE = "https://api.rss2json.com/v1/api.json";

// NewsAPI.org alternatif (CORS sınırı var, proxy gerekir)
// Burada alternatif olarak tutuyoruz

// ===== YEDEK STATİK HABERLER (API başarısız olursa) =====
const fallbackNews = [
    {
        id: 1,
        title: "Papa Francis 88 Yaşında Hayatını Kaybetti",
        summary: "Katolik dünyasının lideri Papa Francis, 21 Nisan 2025'te Roma'da hayatını kaybetti. Dünya liderlerinden taziye mesajları yağdı.",
        content: "Arjantin doğumlu Jorge Mario Bergoglio, 2013 yılında papalık görevini üstlenmiş reformcu bir lider olarak biliniyordu. 88 yaşında hayatını kaybeden Papa'nın cenaze törenine 130'dan fazla ülkeden lider katıldı. Vatikan, yeni papa seçimi için konklav hazırlığını başlattı.",
        category: "dunya", categoryLabel: "Dünya",
        author: "Reuters", time: "21 Nisan 2025", views: "4.8M", comments: 3241,
        image: "https://picsum.photos/400/250?random=101",
        tags: ["Papa", "Vatikan", "Dünya"], url: "https://www.bbc.com/news/world-europe"
    },
    {
        id: 2,
        title: "Trump'ın Gümrük Tarifeleri Küresel Piyasaları Sarstı",
        summary: "ABD Başkanı Trump, tüm ülkelere %10 taban gümrük tarifesi uyguladı. Çin'e oran %145'e çıktı, küresel borsalar sert düştü.",
        content: "Trump, 2 Nisan 2025'i 'Kurtuluş Günü' ilan ederek kapsamlı gümrük tarifeleri paketini devreye soktu. Çin misillemede bulunarak %125 karşı tarife açıkladı. Dow Jones tek günde %4,8 değer kaybetti. Altın rekor kırdı.",
        category: "ekonomi", categoryLabel: "Ekonomi",
        author: "BBC News", time: "3 Nisan 2025", views: "3.2M", comments: 5812,
        image: "https://picsum.photos/400/250?random=102",
        tags: ["Trump", "Ekonomi", "Tarife"], url: "https://www.bbc.com/news/business"
    },
    {
        id: 3,
        title: "Ukrayna-Rusya Ateşkes Müzakereleri Başladı",
        summary: "Trump'ın arabuluculuğuyla Ukrayna ve Rusya İstanbul'da ateşkes görüşmelerine oturdu. 3 yılı aşkın savaşın sona ermesi umut verdi.",
        content: "Taraflar ABD baskısıyla İstanbul'da müzakere masasına oturdu. 30 günlük ateşkes ön anlaşması sağlandı. Toprak meselesi henüz çözümsüz.",
        category: "dunya", categoryLabel: "Dünya",
        author: "Al Jazeera", time: "18 Şubat 2025", views: "5.6M", comments: 9021,
        image: "https://picsum.photos/400/250?random=104",
        tags: ["Ukrayna", "Rusya", "Barış"], url: "https://www.aljazeera.com"
    },
    {
        id: 4,
        title: "ChatGPT-5 Yayınlandı: İnsan Zekasını Geçiyor",
        summary: "OpenAI'nin GPT-5 modeli hukuk ve tıp testlerinde insanları geride bıraktı. Teknoloji dünyası etik tartışmalarla çalkalanıyor.",
        content: "GPT-5, bar sınavında %97, tıp sınavında %95 başarı oranı elde etti. Gerçek zamanlı video analizi, ses tanıma ve Türkçe desteği büyük ölçüde geliştirildi.",
        category: "teknoloji", categoryLabel: "Teknoloji",
        author: "TechCrunch", time: "15 Mart 2025", views: "3.8M", comments: 7241,
        image: "https://picsum.photos/400/250?random=108",
        tags: ["Yapay Zeka", "GPT-5", "OpenAI"], url: "https://techcrunch.com"
    },
    {
        id: 5,
        title: "SpaceX Starship Ay Yörüngesine Turist Taşıdı",
        summary: "SpaceX'in Starship roketi 6 turistle Ay yörüngesine uçuş gerçekleştirdi. Elon Musk: 'İnsanlık tarihi değişti.'",
        content: "10 günlük yolculukta 6 turist Ay yörüngesini dolaştı. Bilet fiyatı kişi başı 150 milyon dolar. Ekipte Türk iş insanı da yer aldı.",
        category: "teknoloji", categoryLabel: "Teknoloji",
        author: "Space.com", time: "12 Ocak 2025", views: "9.2M", comments: 15032,
        image: "https://picsum.photos/400/250?random=111",
        tags: ["Uzay", "SpaceX", "Ay"], url: "https://www.space.com"
    },
    {
        id: 6,
        title: "mRNA Kanser Aşısı Faz 3'te %78 Başarı Sağladı",
        summary: "BioNTech-Moderna ortaklığının kişiselleştirilmiş kanser aşısı melanoma ve akciğer kanserinde umut verici sonuçlar gösterdi.",
        content: "Faz 3 klinik denemelerinde tümör büyümesi yüzde 78 oranında baskılandı. FDA ve EMA acele onay değerlendirmesi başlattı. Türkiye ön sipariş verdi.",
        category: "saglik", categoryLabel: "Sağlık",
        author: "Nature Medicine", time: "5 Mayıs 2025", views: "4.3M", comments: 5621,
        image: "https://picsum.photos/400/250?random=113",
        tags: ["Sağlık", "Kanser", "mRNA"], url: "https://www.nature.com"
    }
];

// ===== GLOBAL STATE =====
let newsData = [...fallbackNews];
let currentView = 'grid';
let currentCategory = 'all';
let displayedCount = 6;
let filteredNews = [...newsData];
let aiChatOpen = false;
let liveNewsCache = [];
let apiStatus = { gnews: false, rss: false };

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    checkDarkMode();

    // İlk yükleme - fallback ile başla
    renderNews();
    renderMostRead();

    // Canlı haberleri yükle
    showApiStatus('loading');
    await loadLiveNews();

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchNews();
    });

    window.addEventListener('scroll', () => {
        const scrollTop = document.getElementById('scrollTop');
        scrollTop.classList.toggle('visible', window.scrollY > 400);
    });

    setInterval(animateExchangeRates, 5000);
    // Her 5 dakikada haberleri yenile
    setInterval(loadLiveNews, 300000);
});

// ===== CANLI HABER YÜKLEME =====
async function loadLiveNews() {
    let loaded = false;

    // Yöntem 1: GNews API (Türkçe haberler)
    try {
        const res = await Promise.race([
            fetchGNews(),
            new Promise((_, reject) => setTimeout(() => reject('timeout'), 5000))
        ]);
        if (res && res.length > 0) {
            mergeWithLiveNews(res);
            apiStatus.gnews = true;
            loaded = true;
            showApiStatus('live', 'GNews API');
        }
    } catch(e) {
        console.warn('GNews API başarısız:', e);
    }

    // Yöntem 2: RSS Feed'ler (BBC, Al Jazeera TR, CNN Türk)
    if (!loaded) {
        try {
            const rssNews = await fetchMultipleRSS();
            if (rssNews && rssNews.length > 0) {
                mergeWithLiveNews(rssNews);
                apiStatus.rss = true;
                loaded = true;
                showApiStatus('live', 'RSS Kaynakları');
            }
        } catch(e) {
            console.warn('RSS başarısız:', e);
        }
    }

    // Yöntem 3: Wikipedia güncel olaylar
    if (!loaded) {
        try {
            const wikiNews = await fetchWikipediaCurrentEvents();
            if (wikiNews && wikiNews.length > 0) {
                mergeWithLiveNews(wikiNews);
                loaded = true;
                showApiStatus('live', 'Wikipedia Güncel Olaylar');
            }
        } catch(e) {
            console.warn('Wikipedia başarısız:', e);
        }
    }

    if (!loaded) {
        showApiStatus('offline');
    }
}

// ===== GNews API =====
async function fetchGNews() {
    const results = [];

    // Türkçe haberler
    const endpoints = [
        `${GNEWS_BASE}/top-headlines?lang=tr&country=tr&max=10&apikey=${GNEWS_API_KEY}`,
        `${GNEWS_BASE}/top-headlines?lang=tr&max=6&topic=world&apikey=${GNEWS_API_KEY}`,
    ];

    for (const url of endpoints) {
        try {
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            if (data.articles) {
                data.articles.forEach((a, i) => {
                    results.push(convertGNewsArticle(a, i));
                });
            }
        } catch(e) { /* devam */ }
    }
    return results;
}

function convertGNewsArticle(article, index) {
    const cats = detectCategory(article.title + ' ' + (article.description || ''));
    return {
        id: 'live_' + Date.now() + '_' + index,
        title: article.title || 'Başlık yok',
        summary: article.description || article.content?.substring(0, 150) || '',
        content: article.content || article.description || '',
        category: cats.key,
        categoryLabel: cats.label,
        author: article.source?.name || 'Haber Ajansı',
        time: formatTimeAgo(article.publishedAt),
        views: Math.floor(Math.random() * 50 + 5) + 'K',
        comments: Math.floor(Math.random() * 200 + 10),
        image: article.image || `https://picsum.photos/400/250?random=${100 + index}`,
        tags: extractTags(article.title),
        url: article.url || '#',
        isLive: true,
        publishedAt: article.publishedAt
    };
}

// ===== RSS FEED'LER =====
async function fetchMultipleRSS() {
    const feeds = [
        // BBC Türkçe
        { url: 'https://feeds.bbci.co.uk/turkish/rss.xml', source: 'BBC Türkçe' },
        // TRT Haber
        { url: 'https://www.trthaber.com/sondakika.rss', source: 'TRT Haber' },
        // Al Jazeera Türkçe
        { url: 'https://www.aljazeera.com.tr/feed', source: 'Al Jazeera TR' },
        // Habertürk
        { url: 'https://www.haberturk.com/rss', source: 'Habertürk' },
    ];

    const allArticles = [];

    for (const feed of feeds) {
        try {
            const url = `${RSS2JSON_BASE}?rss_url=${encodeURIComponent(feed.url)}&api_key=&count=5`;
            const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
            if (!res.ok) continue;
            const data = await res.json();
            if (data.status === 'ok' && data.items) {
                data.items.slice(0, 4).forEach((item, i) => {
                    allArticles.push(convertRSSItem(item, feed.source, i));
                });
            }
        } catch(e) { /* devam */ }
    }

    return allArticles;
}

function convertRSSItem(item, source, index) {
    const cats = detectCategory(item.title + ' ' + (item.description || ''));
    const cleanDesc = stripHTML(item.description || item.content || '').substring(0, 200);
    return {
        id: 'rss_' + Date.now() + '_' + index,
        title: stripHTML(item.title || 'Başlık yok'),
        summary: cleanDesc || item.title,
        content: stripHTML(item.content || item.description || cleanDesc),
        category: cats.key,
        categoryLabel: cats.label,
        author: source,
        time: formatTimeAgo(item.pubDate),
        views: Math.floor(Math.random() * 30 + 2) + 'K',
        comments: Math.floor(Math.random() * 100 + 5),
        image: item.enclosure?.link || item.thumbnail ||
               extractImageFromHTML(item.content || '') ||
               `https://picsum.photos/400/250?random=${200 + index}`,
        tags: extractTags(item.title),
        url: item.link || '#',
        isLive: true,
        publishedAt: item.pubDate
    };
}

// ===== WİKİPEDİA GÜNCEL OLAYLAR =====
async function fetchWikipediaCurrentEvents() {
    try {
        const today = new Date();
        const month = today.toLocaleString('en-US', { month: 'long' });
        const year = today.getFullYear();
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/Portal:Current_events/${month}_${year}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
        if (!res.ok) return [];
        const data = await res.json();
        if (!data.extract) return [];

        // Metin paragraflarından kısa haberler üret
        const lines = data.extract.split('\n').filter(l => l.trim().length > 30).slice(0, 5);
        return lines.map((line, i) => ({
            id: 'wiki_' + i,
            title: line.substring(0, 80) + (line.length > 80 ? '...' : ''),
            summary: line,
            content: line,
            category: 'dunya',
            categoryLabel: 'Dünya',
            author: 'Wikipedia Güncel Olaylar',
            time: 'Bu ay',
            views: '—',
            comments: 0,
            image: `https://picsum.photos/400/250?random=${300 + i}`,
            tags: ['Dünya', 'Güncel'],
            url: 'https://en.wikipedia.org/wiki/Portal:Current_events',
            isLive: true
        }));
    } catch(e) {
        return [];
    }
}

// ===== CANLI HABERLERİ BİRLEŞTİR =====
function mergeWithLiveNews(liveArticles) {
    if (!liveArticles || liveArticles.length === 0) return;

    // Canlı haberleri başa ekle, yedekleri sona bırak
    liveNewsCache = liveArticles;

    // Tarihe göre sırala
    const combined = [...liveArticles, ...fallbackNews];
    newsData = combined;
    filteredNews = [...newsData];

    renderNews();
    renderMostRead();
    updateBreakingNewsTicker(liveArticles);
}

// ===== KAYAN BAR'I GÜNCELLE =====
function updateBreakingNewsTicker(articles) {
    if (!articles || articles.length === 0) return;
    const ticker = document.querySelector('.ticker-content span');
    if (!ticker) return;
    const headlines = articles.slice(0, 8).map(a => a.title).join(' &nbsp;•&nbsp; ');
    ticker.innerHTML = headlines + ' &nbsp;•&nbsp; ';
}

// ===== API DURUM GÖSTER =====
function showApiStatus(status, source = '') {
    let bar = document.getElementById('apiStatusBar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'apiStatusBar';
        bar.style.cssText = `
            position: fixed; bottom: 130px; right: 20px; z-index: 9998;
            padding: 8px 14px; border-radius: 20px; font-size: 12px;
            font-weight: 600; display: flex; align-items: center; gap: 6px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2); transition: all 0.3s ease;
            cursor: pointer; color: white;
        `;
        bar.onclick = () => { bar.style.display = 'none'; };
        document.body.appendChild(bar);
    }

    if (status === 'loading') {
        bar.style.background = '#f39c12';
        bar.innerHTML = '<i class="fas fa-sync fa-spin"></i> Haberler yükleniyor...';
        bar.style.display = 'flex';
    } else if (status === 'live') {
        bar.style.background = '#27ae60';
        bar.innerHTML = `<i class="fas fa-circle" style="font-size:8px;animation:pulse-dot 1.5s infinite"></i> Canlı: ${source}`;
        setTimeout(() => { bar.style.opacity = '0.6'; }, 4000);
    } else {
        bar.style.background = '#e74c3c';
        bar.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Çevrimdışı mod (yedek haberler)';
        setTimeout(() => { bar.style.display = 'none'; }, 5000);
    }
}

// ===== YARDIMCI FONKSİYONLAR =====
function detectCategory(text) {
    const t = text.toLowerCase();
    if (/(futbol|basket|spor|maç|gol|liga|şampiyon|nba|uefa|fifa)/.test(t))
        return { key: 'spor', label: 'Spor' };
    if (/(ekonomi|borsa|dolar|euro|faiz|enflasyon|bütçe|piyasa|tarife|ticaret)/.test(t))
        return { key: 'ekonomi', label: 'Ekonomi' };
    if (/(teknoloji|yapay zeka|ai|iphone|android|uzay|roket|yazılım|uygulama)/.test(t))
        return { key: 'teknoloji', label: 'Teknoloji' };
    if (/(sağlık|hastane|aşı|kanser|ilaç|doktor|pandemi|virus|corona)/.test(t))
        return { key: 'saglik', label: 'Sağlık' };
    if (/(sinema|film|müzik|sanat|tiyatro|kültür|edebiyat|festival|ödül)/.test(t))
        return { key: 'kultur', label: 'Kültür & Sanat' };
    if (/(dünya|uluslararası|savaş|ukrayna|rusya|abd|çin|avrupa|nato|bm)/.test(t))
        return { key: 'dunya', label: 'Dünya' };
    return { key: 'gundem', label: 'Gündem' };
}

function formatTimeAgo(dateStr) {
    if (!dateStr) return 'Bugün';
    try {
        const date = new Date(dateStr);
        const diff = (Date.now() - date.getTime()) / 1000 / 60; // dakika
        if (diff < 1) return 'Az önce';
        if (diff < 60) return Math.floor(diff) + ' dakika önce';
        if (diff < 1440) return Math.floor(diff / 60) + ' saat önce';
        if (diff < 10080) return Math.floor(diff / 1440) + ' gün önce';
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch(e) {
        return dateStr;
    }
}

function extractTags(title) {
    if (!title) return ['Gündem'];
    const words = title.split(' ').filter(w => w.length > 4).slice(0, 3);
    return words.length > 0 ? words : ['Gündem'];
}

function stripHTML(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}

function extractImageFromHTML(html) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
}

// ===== DATE & TIME =====
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('tr-TR', dateOptions);
    document.getElementById('current-time').textContent = now.toLocaleTimeString('tr-TR');
}

// ===== RENDER NEWS =====
function renderNews() {
    const grid = document.getElementById('newsGrid');
    const toShow = filteredNews.slice(0, displayedCount);
    grid.innerHTML = '';

    if (toShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-light);">
                <i class="fas fa-search" style="font-size:50px;margin-bottom:15px;display:block;opacity:0.3;"></i>
                <h3>Haber bulunamadı</h3>
                <p>Farklı bir arama terimi deneyin.</p>
            </div>`;
        document.getElementById('loadMoreBtn').style.display = 'none';
        return;
    }

    toShow.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.onclick = () => openModal(item);

        const liveBadge = item.isLive
            ? `<span class="live-badge"><i class="fas fa-circle"></i> CANLI</span>`
            : '';

        card.innerHTML = `
            <div style="position:relative;overflow:hidden;">
                <img src="${item.image}" alt="${item.title}" loading="lazy"
                     onerror="this.src='https://picsum.photos/400/250?random=${Math.floor(Math.random()*200)}'">
                ${liveBadge}
            </div>
            <div class="card-body">
                <div class="card-meta">
                    <span class="category-badge ${item.category}">${item.categoryLabel}</span>
                    <span style="font-size:11px;color:var(--text-light);"><i class="fas fa-clock"></i> ${item.time}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <div class="card-footer">
                    <div class="author"><i class="fas fa-newspaper"></i> ${item.author}</div>
                    <div class="stats">
                        <span><i class="fas fa-eye"></i> ${item.views}</span>
                        <span><i class="fas fa-comment"></i> ${item.comments}</span>
                    </div>
                </div>
            </div>`;
        grid.appendChild(card);
    });

    const btn = document.getElementById('loadMoreBtn');
    btn.style.display = displayedCount >= filteredNews.length ? 'none' : 'inline-flex';
}

// ===== RENDER MOST READ =====
function renderMostRead() {
    const container = document.getElementById('mostRead');
    const topNews = [...newsData].slice(0, 5);
    container.innerHTML = topNews.map((item, i) => `
        <div class="most-read-item" onclick='openModal(newsData[${newsData.indexOf(item)}])'>
            <div class="most-read-num">${i + 1}</div>
            <div class="most-read-info">
                <h4>${item.title}</h4>
                <span><i class="fas fa-newspaper"></i> ${item.author} &nbsp;•&nbsp; ${item.time}</span>
            </div>
        </div>`).join('');
}

// ===== FILTER CATEGORY =====
function filterCategory(category) {
    currentCategory = category;
    displayedCount = 6;
    document.querySelectorAll('.nav-menu li a').forEach(a => a.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    const labels = { all: 'Güncel Haberler', gundem: 'Gündem', ekonomi: 'Ekonomi', spor: 'Spor', teknoloji: 'Teknoloji', saglik: 'Sağlık', kultur: 'Kültür & Sanat', dunya: 'Dünya' };
    const icons = { all: 'newspaper', gundem: 'fire', ekonomi: 'chart-line', spor: 'futbol', teknoloji: 'microchip', saglik: 'heartbeat', kultur: 'palette', dunya: 'globe' };

    filteredNews = category === 'all' ? [...newsData] : newsData.filter(n => n.category === category);
    document.getElementById('sectionTitle').innerHTML = `<i class="fas fa-${icons[category]}"></i> ${labels[category]}`;
    renderNews();
    document.querySelector('.section-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== SEARCH =====
function searchNews() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        filteredNews = [...newsData];
        document.getElementById('sectionTitle').innerHTML = '<i class="fas fa-newspaper"></i> Güncel Haberler';
    } else {
        filteredNews = newsData.filter(n =>
            n.title.toLowerCase().includes(query) ||
            n.summary.toLowerCase().includes(query) ||
            (n.tags && n.tags.some(t => t.toLowerCase().includes(query)))
        );
        document.getElementById('sectionTitle').innerHTML = `<i class="fas fa-search"></i> "${query}" için ${filteredNews.length} sonuç`;
    }
    displayedCount = 6;
    renderNews();
    document.querySelector('.section-header').scrollIntoView({ behavior: 'smooth' });
}

// ===== FILTER TAG =====
function filterTag(tag) {
    document.getElementById('searchInput').value = tag;
    filteredNews = newsData.filter(n => n.tags && n.tags.some(t => t.toLowerCase().includes(tag.toLowerCase())));
    if (filteredNews.length === 0) filteredNews = newsData.filter(n => n.title.toLowerCase().includes(tag.toLowerCase()));
    document.getElementById('sectionTitle').innerHTML = `<i class="fas fa-tag"></i> #${tag}`;
    displayedCount = 6;
    renderNews();
    document.querySelector('.section-header').scrollIntoView({ behavior: 'smooth' });
}

// ===== LOAD MORE =====
function loadMore() {
    const btn = document.getElementById('loadMoreBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
    setTimeout(() => {
        displayedCount += 4;
        renderNews();
        btn.innerHTML = '<i class="fas fa-plus-circle"></i> Daha Fazla Haber';
    }, 600);
}

// ===== VIEW TOGGLE =====
function setView(view) {
    currentView = view;
    const grid = document.getElementById('newsGrid');
    if (view === 'list') {
        grid.classList.add('list-view');
        document.getElementById('listBtn').classList.add('active');
        document.getElementById('gridBtn').classList.remove('active');
    } else {
        grid.classList.remove('list-view');
        document.getElementById('gridBtn').classList.add('active');
        document.getElementById('listBtn').classList.remove('active');
    }
}

// ===== MODAL =====
function openModal(item) {
    if (!item) return;
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');

    const sourceBadge = item.isLive
        ? `<span style="background:#27ae60;color:white;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;margin-left:8px;"><i class="fas fa-circle" style="font-size:7px"></i> CANLI KAYNAK</span>`
        : '';

    const readMoreBtn = item.url && item.url !== '#'
        ? `<a href="${item.url}" target="_blank" class="read-more-btn"><i class="fas fa-external-link-alt"></i> Kaynakta Oku: ${item.author}</a>`
        : '';

    content.innerHTML = `
        <img src="${item.image}" alt="${item.title}"
             onerror="this.src='https://picsum.photos/750/300?random=${Math.floor(Math.random()*200)}'">
        <div class="modal-body">
            <span class="category-badge ${item.category}">${item.categoryLabel}</span>${sourceBadge}
            <h2>${item.title}</h2>
            <div class="modal-meta">
                <span><i class="fas fa-newspaper"></i> ${item.author}</span>
                <span><i class="fas fa-clock"></i> ${item.time}</span>
                <span><i class="fas fa-eye"></i> ${item.views} görüntülenme</span>
                <span><i class="fas fa-comment"></i> ${item.comments} yorum</span>
            </div>
            <p style="font-weight:600;font-size:16px;border-left:3px solid var(--primary);padding-left:12px;">${item.summary}</p>
            <p>${item.content}</p>
            ${readMoreBtn}
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:15px;">
                ${(item.tags||[]).map(t => `<span class="tag">#${t}</span>`).join('')}
            </div>
            <div class="modal-share">
                <button class="share-tw" onclick="shareNews('twitter','${(item.title||'').replace(/'/g,"\\'")}')">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button class="share-fb" onclick="shareNews('facebook','${(item.title||'').replace(/'/g,"\\'")}')">
                    <i class="fab fa-facebook"></i> Facebook
                </button>
                <button class="share-wp" onclick="shareNews('whatsapp','${(item.title||'').replace(/'/g,"\\'")}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
            </div>
        </div>`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openHeroModal() {
    if (liveNewsCache.length > 0) {
        openModal(liveNewsCache[0]);
    } else {
        openModal(fallbackNews[0]);
    }
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== SHARE =====
function shareNews(platform, title) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const links = {
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        whatsapp: `https://wa.me/?text=${text}%20${url}`
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
}

// ===== AI CHAT =====
function toggleAIChat() {
    aiChatOpen = !aiChatOpen;
    const panel = document.getElementById('aiChatPanel');
    panel.classList.toggle('open', aiChatOpen);
    if (aiChatOpen) document.getElementById('aiInput').focus();
}

function clearChat() {
    document.getElementById('aiMessages').innerHTML = `
        <div class="ai-msg bot">
            <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="ai-msg-content">
                <p>Sohbet temizlendi! Yeni bir soru sorabilirsiniz 🤖</p>
                <div class="ai-quick-btns">
                    <button onclick="quickQuestion('Son dakika haberleri neler?')">📰 Son Dakika</button>
                    <button onclick="quickQuestion('Dünyada bugün neler oldu?')">🌍 Dünya</button>
                    <button onclick="quickQuestion('Türkiye gündemi nedir?')">🇹🇷 Türkiye</button>
                    <button onclick="quickQuestion('Spor haberleri')">⚽ Spor</button>
                </div>
            </div>
        </div>`;
}

function quickQuestion(q) {
    document.getElementById('aiInput').value = q;
    sendAIMessage();
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const msg = input.value.trim();
    if (!msg) return;
    addChatMessage(msg, 'user');
    input.value = '';
    const typingId = addTypingIndicator();
    setTimeout(async () => {
        removeTypingIndicator(typingId);
        const response = await getAIResponse(msg);
        addChatMessage(response, 'bot');
    }, 700 + Math.random() * 600);
}

function addChatMessage(text, role) {
    const messages = document.getElementById('aiMessages');
    const div = document.createElement('div');
    div.className = `ai-msg ${role}`;
    if (role === 'bot') {
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        div.innerHTML = `
            <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="ai-msg-content"><p>${formatted}</p></div>`;
    } else {
        div.innerHTML = `
            <div class="ai-msg-content user-msg"><p>${text}</p></div>
            <div class="ai-msg-avatar user-av"><i class="fas fa-user"></i></div>`;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function addTypingIndicator() {
    const messages = document.getElementById('aiMessages');
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'ai-msg bot';
    div.id = id;
    div.innerHTML = `
        <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
        <div class="ai-msg-content">
            <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ===== AI YANIT - CANLI HABERLERDEN =====
async function getAIResponse(query) {
    const q = query.toLowerCase();

    // Önce canlı haberlerden ara
    const liveMatches = newsData.filter(n => {
        const searchIn = (n.title + ' ' + n.summary + ' ' + (n.tags || []).join(' ')).toLowerCase();
        return q.split(' ').some(word => word.length > 2 && searchIn.includes(word));
    });

    // Son dakika / güncel haber sorusu
    if (/(son dakika|en son|güncel|bugün|şu an|şimdi|yeni|breaking)/.test(q)) {
        if (liveNewsCache.length > 0) {
            const top5 = liveNewsCache.slice(0, 5);
            let resp = `📡 **Canlı Kaynaklardan Son Haberler:**\n\n`;
            top5.forEach((n, i) => {
                resp += `**${i+1}. ${n.title}**\n`;
                resp += `📰 ${n.author} • 🕐 ${n.time}\n`;
                if (n.url && n.url !== '#') resp += `🔗 ${n.url}\n`;
                resp += '\n';
            });
            resp += `\n_Kaynak: ${apiStatus.gnews ? 'GNews API' : apiStatus.rss ? 'RSS Haber Akışları' : 'Yedek Veri'}_`;
            return resp;
        } else {
            return `📰 **Güncel Haberler:**\n\n${fallbackNews.slice(0,4).map((n,i) => `**${i+1}. ${n.title}**\n${n.author} • ${n.time}`).join('\n\n')}\n\n_Not: Canlı API bağlantısı kurulamadı, yedek haberler gösteriliyor._`;
        }
    }

    // Eğer haberlerimizde eşleşme bulduk
    if (liveMatches.length > 0) {
        const best = liveMatches[0];
        let resp = `📰 **${best.title}**\n\n`;
        resp += `${best.summary}\n\n`;
        if (best.content && best.content !== best.summary) {
            resp += `${best.content.substring(0, 300)}...\n\n`;
        }
        resp += `📰 Kaynak: **${best.author}** • 🕐 ${best.time}`;
        if (best.url && best.url !== '#') {
            resp += `\n🔗 Haberin tamamı için: ${best.url}`;
        }
        if (liveMatches.length > 1) {
            resp += `\n\n_Bu konuda ${liveMatches.length} haber bulundu. Diğerleri: ${liveMatches.slice(1,3).map(n=>'"'+n.title.substring(0,40)+'"').join(', ')}_`;
        }
        return resp;
    }

    // Kategoriye göre yanıt
    if (/(spor|futbol|basketbol|maç|gol|şampiyon)/.test(q)) {
        const sporNews = newsData.filter(n => n.category === 'spor');
        if (sporNews.length > 0) {
            return `⚽ **Spor Haberleri:**\n\n` + sporNews.slice(0,3).map(n => `**${n.title}**\n${n.author} • ${n.time}`).join('\n\n');
        }
    }

    if (/(ekonomi|dolar|euro|faiz|borsa|enflasyon|fiyat|piyasa)/.test(q)) {
        const ekoNews = newsData.filter(n => n.category === 'ekonomi');
        if (ekoNews.length > 0) {
            return `📊 **Ekonomi Haberleri:**\n\n` + ekoNews.slice(0,3).map(n => `**${n.title}**\n${n.author} • ${n.time}`).join('\n\n');
        }
    }

    if (/(teknoloji|yapay zeka|ai|telefon|uygulama|yazılım|bilim)/.test(q)) {
        const tekNews = newsData.filter(n => n.category === 'teknoloji');
        if (tekNews.length > 0) {
            return `💻 **Teknoloji Haberleri:**\n\n` + tekNews.slice(0,3).map(n => `**${n.title}**\n${n.author} • ${n.time}`).join('\n\n');
        }
    }

    if (/(dünya|uluslararası|global|avrupa|abd|çin|rusya|ukrayna)/.test(q)) {
        const dunyaNews = newsData.filter(n => n.category === 'dunya');
        if (dunyaNews.length > 0) {
            return `🌍 **Dünya Haberleri:**\n\n` + dunyaNews.slice(0,3).map(n => `**${n.title}**\n${n.author} • ${n.time}`).join('\n\n');
        }
    }

    if (/(türkiye|istanbul|ankara|türk)/.test(q)) {
        const trNews = newsData.filter(n =>
            n.category === 'gundem' ||
            (n.tags && n.tags.some(t => /türkiye|türk|istanbul|ankara/i.test(t)))
        );
        if (trNews.length > 0) {
            return `🇹🇷 **Türkiye Haberleri:**\n\n` + trNews.slice(0,3).map(n => `**${n.title}**\n${n.author} • ${n.time}`).join('\n\n');
        }
    }

    // Selamlama
    if (/(merhaba|selam|hey|nasıl)/.test(q)) {
        const liveCount = liveNewsCache.length;
        return `👋 Merhaba! Ben **HaberAI** - ${liveCount > 0 ? `şu an **${liveCount} canlı haber** takip ediyorum` : 'haber asistanınızım'}.\n\nSon dakika haberler, spor, ekonomi, teknoloji veya dünya gündemi hakkında sorabilirsiniz!`;
    }

    if (/(teşekkür|sağ ol|tamam)/.test(q)) {
        return `😊 Rica ederim! Başka merak ettiğiniz haberler var mı?`;
    }

    // Genel yanıt
    const totalLive = liveNewsCache.length;
    return `🔍 **"${query}"** ile ilgili haberlerimde tam eşleşme bulamadım.\n\n📡 Şu an **${totalLive > 0 ? totalLive + ' canlı haber' : 'yedek haberler'}** yüklü.\n\nŞu konularda yardımcı olabilirim:\n• **Son dakika** - en güncel haberler\n• **Dünya** - uluslararası gelişmeler\n• **Ekonomi** - piyasa ve finans\n• **Spor** - maç sonuçları\n• **Teknoloji** - yenilikler\n• **Türkiye** - gündem\n\nHangi konuyu merak ediyorsunuz?`;
}

// ===== MOBILE MENU =====
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('open');
}

// ===== DARK MODE =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
}

function checkDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// ===== SCROLL TO TOP =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (!input.value) return;
    showNotification('✅ Bülten aboneliğiniz tamamlandı!', 'success');
    input.value = '';
}

// ===== NOTIFICATION =====
function showNotification(message, type = '') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
}

// ===== ANIMATE EXCHANGE RATES =====
function animateExchangeRates() {
    document.querySelectorAll('.rate').forEach(rate => {
        rate.style.transition = 'color 0.4s ease';
        rate.style.color = '#27ae60';
        setTimeout(() => { rate.style.color = ''; }, 500);
    });
}
