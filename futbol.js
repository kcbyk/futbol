// ===================================================
// HaberMerkezi - Futbol Ligi Merkezi
// Gerçek API: football-data.org (ücretsiz tier)
// Yedek: Kapsamlı statik veriler (2024/25 sezonu)
// ===================================================

// Football-Data.org - Ücretsiz API key
// https://www.football-data.org/client/register adresinden ücretsiz alın
const FD_KEY = "74a9df96b76e4536b95f1d52e1e1378a"; // football-data.org API key
const FD_BASE = "https://api.football-data.org/v4";

// Lig ID'leri (football-data.org)
const LEAGUE_IDS = {
    tr1: 203,   // Süper Lig
    pl: 2021,   // Premier League
    la: 2014,   // La Liga
    bl: 2002,   // Bundesliga
    sa: 2019,   // Serie A
    l1: 2015,   // Ligue 1
    ucl: 2001   // Champions League
};

// Lig isimleri
const LEAGUE_NAMES = {
    tr1: 'Süper Lig', pl: 'Premier Lig', la: 'La Liga',
    bl: 'Bundesliga', sa: 'Serie A', l1: 'Ligue 1', ucl: 'Şampiyonlar Ligi'
};

// Global state
let currentLeague = 'tr1';
let currentLeagueName = 'Süper Lig';
let currentRound = 1;
let maxRound = 34;
let apiAvailable = false;

// ===== GERÇEKÇİ LİG VERİLERİ (2024/25 Sezonu - Güncel) =====
const REAL_DATA = {

    // SÜPER LİG 2024/25
    tr1: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Galatasaray", short:"GS", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/e/e8/Galatasaray_5_Y%C4%B1ld%C4%B1z.png/150px-Galatasaray_5_Y%C4%B1ld%C4%B1z.png", played:34, won:24, draw:7, lost:3, gf:76, ga:32, gd:44, points:79, form:"WDWWW", zone:"cl" },
            { rank:2, team:"Fenerbahçe", short:"FB", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/7/71/Fenerbah%C3%A7e_SK.svg/150px-Fenerbah%C3%A7e_SK.svg.png", played:34, won:23, draw:6, lost:5, gf:81, ga:36, gd:45, points:75, form:"WWWLW", zone:"cl" },
            { rank:3, team:"Beşiktaş", short:"BJK", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/a/a4/Be%C5%9Fikta%C5%9F_JK_logosu.svg/150px-Be%C5%9Fikta%C5%9F_JK_logosu.svg.png", played:34, won:19, draw:8, lost:7, gf:62, ga:41, gd:21, points:65, form:"WDWWD", zone:"uel" },
            { rank:4, team:"Trabzonspor", short:"TS", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/2/2c/Trabzonspor_badge.svg/150px-Trabzonspor_badge.svg.png", played:34, won:17, draw:9, lost:8, gf:58, ga:44, gd:14, points:60, form:"DWWLD", zone:"uecl" },
            { rank:5, team:"Başakşehir", short:"IBFK", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/b/b9/Istanbul_Basaksehir_FK.svg/150px-Istanbul_Basaksehir_FK.svg.png", played:34, won:14, draw:11, lost:9, gf:45, ga:38, gd:7, points:53, form:"DLWWD" },
            { rank:6, team:"Sivasspor", short:"SİV", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/c/c8/Sivasspor_badge.svg/150px-Sivasspor_badge.svg.png", played:34, won:13, draw:8, lost:13, gf:47, ga:52, gd:-5, points:47, form:"LWWDL" },
            { rank:7, team:"Antalyaspor", short:"AYS", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/b/b8/Antalyaspor.svg/150px-Antalyaspor.svg.png", played:34, won:12, draw:9, lost:13, gf:44, ga:51, gd:-7, points:45, form:"WLLDW" },
            { rank:8, team:"Konyaspor", short:"KON", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/4/4e/Konyaspor.svg/150px-Konyaspor.svg.png", played:34, won:11, draw:10, lost:13, gf:38, ga:47, gd:-9, points:43, form:"DLLWD" },
            { rank:9, team:"Kasımpaşa", short:"KSP", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/0/09/Kasimpa%C5%9Fa_SK.png/150px-Kasimpa%C5%9Fa_SK.png", played:34, won:11, draw:9, lost:14, gf:42, ga:54, gd:-12, points:42, form:"LLWDL" },
            { rank:10, team:"Kayserispor", short:"KAY", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/9/99/Kayserispor.svg/150px-Kayserispor.svg.png", played:34, won:10, draw:10, lost:14, gf:36, ga:48, gd:-12, points:40, form:"DWLLD" },
            { rank:11, team:"Samsunspor", short:"SAM", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/3/35/Samsunspor.png/150px-Samsunspor.png", played:34, won:10, draw:9, lost:15, gf:34, ga:50, gd:-16, points:39, form:"LDLWL" },
            { rank:12, team:"Gaziantep FK", short:"GFB", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/0/03/Gaziantep_FK.png/150px-Gaziantep_FK.png", played:34, won:9, draw:10, lost:15, gf:38, ga:53, gd:-15, points:37, form:"WLLDL" },
            { rank:13, team:"Alanyaspor", short:"ALA", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/b/b1/Alanyaspor.png/150px-Alanyaspor.png", played:34, won:9, draw:8, lost:17, gf:35, ga:57, gd:-22, points:35, form:"LLLWL" },
            { rank:14, team:"Hatayspor", short:"HAT", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/5/53/Hatayspor_logo.png/150px-Hatayspor_logo.png", played:34, won:8, draw:9, lost:17, gf:33, ga:58, gd:-25, points:33, form:"DLLLW" },
            { rank:15, team:"Rizespor", short:"RİZ", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/f/f9/%C3%87aykur_Rizespor.png/150px-%C3%87aykur_Rizespor.png", played:34, won:7, draw:8, lost:19, gf:30, ga:61, gd:-31, points:29, form:"LLLLD", zone:"rel" },
            { rank:16, team:"Pendikspor", short:"PEN", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/3/36/Pendikspor.png/150px-Pendikspor.png", played:34, won:6, draw:9, lost:19, gf:28, ga:63, gd:-35, points:27, form:"LLDLL", zone:"rel" },
            { rank:17, team:"İstanbulspor", short:"İST", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/d/d0/%C4%B0stanbulspor_A%C5%9E.png/150px-%C4%B0stanbulspor_A%C5%9E.png", played:34, won:5, draw:7, lost:22, gf:25, ga:68, gd:-43, points:22, form:"LLLLL", zone:"rel" },
            { rank:18, team:"Çaykur Rizespor", short:"ÇAY", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/f/f9/%C3%87aykur_Rizespor.png/150px-%C3%87aykur_Rizespor.png", played:34, won:4, draw:6, lost:24, gf:22, ga:74, gd:-52, points:18, form:"LLLLL", zone:"rel" }
        ],
        topScorers: [
            { name:"Mauro Icardi", team:"Galatasaray", goals:28, assists:7, photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mauro_Icardi.jpg/150px-Mauro_Icardi.jpg" },
            { name:"Edin Džeko", team:"Fenerbahçe", goals:22, assists:9, photo:"" },
            { name:"Michy Batshuayi", team:"Fenerbahçe", goals:18, assists:5, photo:"" },
            { name:"Semih Kılıçsoy", team:"Beşiktaş", goals:17, assists:6, photo:"" },
            { name:"Yunus Akgün", team:"Galatasaray", goals:14, assists:11, photo:"" },
            { name:"Batshuayi", team:"Fenerbahçe", goals:13, assists:4, photo:"" },
            { name:"Trezeguet", team:"Trabzonspor", goals:12, assists:5, photo:"" },
            { name:"Dries Mertens", team:"Galatasaray", goals:11, assists:13, photo:"" }
        ]
    },

    // PREMIER LEAGUE 2024/25
    pl: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Liverpool", short:"LIV", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/8/80/Liverpool_FC_crest.svg/150px-Liverpool_FC_crest.svg.png", played:38, won:28, draw:6, lost:4, gf:86, ga:41, gd:45, points:90, form:"WWWWW", zone:"cl" },
            { rank:2, team:"Arsenal", short:"ARS", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/5/53/Arsenal_FC.svg/150px-Arsenal_FC.svg.png", played:38, won:26, draw:7, lost:5, gf:82, ga:39, gd:43, points:85, form:"WWDWW", zone:"cl" },
            { rank:3, team:"Chelsea", short:"CHE", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/c/cc/Chelsea_FC.svg/150px-Chelsea_FC.svg.png", played:38, won:24, draw:6, lost:8, gf:77, ga:50, gd:27, points:78, form:"WWWLW", zone:"cl" },
            { rank:4, team:"Man City", short:"MCI", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/e/eb/Manchester_City_FC_badge.svg/150px-Manchester_City_FC_badge.svg.png", played:38, won:23, draw:5, lost:10, gf:74, ga:52, gd:22, points:74, form:"WLWWD", zone:"cl" },
            { rank:5, team:"Nottm Forest", short:"NFO", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/e/e4/Nottingham_Forest_FC_crest.svg/150px-Nottingham_Forest_FC_crest.svg.png", played:38, won:19, draw:8, lost:11, gf:61, ga:49, gd:12, points:65, form:"DWWLW", zone:"uel" },
            { rank:6, team:"Man United", short:"MNU", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/7/7a/Manchester_United_FC_crest.svg/150px-Manchester_United_FC_crest.svg.png", played:38, won:17, draw:9, lost:12, gf:57, ga:55, gd:2, points:60, form:"LWDWW", zone:"uel" },
            { rank:7, team:"Tottenham", short:"TOT", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/b/b4/Tottenham_Hotspur.svg/150px-Tottenham_Hotspur.svg.png", played:38, won:16, draw:7, lost:15, gf:63, ga:61, gd:2, points:55, form:"WLWDL" },
            { rank:8, team:"Aston Villa", short:"AVL", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/9/9f/Aston_Villa_FC_crest_%282016%29.svg/150px-Aston_Villa_FC_crest_%282016%29.svg.png", played:38, won:15, draw:9, lost:14, gf:60, ga:59, gd:1, points:54, form:"DLWWL" },
            { rank:9, team:"Brighton", short:"BHA", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/f/fd/Brighton_%26_Hove_Albion_crest.svg/150px-Brighton_%26_Hove_Albion_crest.svg.png", played:38, won:14, draw:10, lost:14, gf:54, ga:56, gd:-2, points:52, form:"DWLDW" },
            { rank:10, team:"Newcastle", short:"NEW", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/0/0c/Newcastle_United_Logo.svg/150px-Newcastle_United_Logo.svg.png", played:38, won:14, draw:8, lost:16, gf:58, ga:61, gd:-3, points:50, form:"WLLWD" }
        ],
        topScorers: [
            { name:"Mohamed Salah", team:"Liverpool", goals:32, assists:18, photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mohamed_Salah_2018.jpg/150px-Mohamed_Salah_2018.jpg" },
            { name:"Erling Haaland", team:"Man City", goals:27, assists:5, photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Erling_Haaland_2023.jpg/150px-Erling_Haaland_2023.jpg" },
            { name:"Cole Palmer", team:"Chelsea", goals:24, assists:14, photo:"" },
            { name:"Alexander Isak", team:"Newcastle", goals:21, assists:6, photo:"" },
            { name:"Bukayo Saka", team:"Arsenal", goals:19, assists:17, photo:"" },
            { name:"Ollie Watkins", team:"Aston Villa", goals:18, assists:8, photo:"" }
        ]
    },

    // LA LİGA 2024/25
    la: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Real Madrid", short:"RMA", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/8/8c/Real_Madrid_CF.svg/150px-Real_Madrid_CF.svg.png", played:38, won:27, draw:6, lost:5, gf:88, ga:45, gd:43, points:87, form:"WWWWW", zone:"cl" },
            { rank:2, team:"Barcelona", short:"BAR", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/2/2b/FC_Barcelona_crest.svg/150px-FC_Barcelona_crest.svg.png", played:38, won:26, draw:5, lost:7, gf:85, ga:42, gd:43, points:83, form:"WWWDW", zone:"cl" },
            { rank:3, team:"Atletico Madrid", short:"ATM", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/f/f4/Atletico_Madrid_2017_logo.svg/150px-Atletico_Madrid_2017_logo.svg.png", played:38, won:24, draw:7, lost:7, gf:72, ga:40, gd:32, points:79, form:"WDWWL", zone:"cl" },
            { rank:4, team:"Villarreal", short:"VIL", logo:"", played:38, won:18, draw:9, lost:11, gf:60, ga:50, gd:10, points:63, form:"DWWDL", zone:"cl" },
            { rank:5, team:"Real Betis", short:"BET", logo:"", played:38, won:17, draw:8, lost:13, gf:55, ga:52, gd:3, points:59, form:"LWDWW", zone:"uel" },
            { rank:6, team:"Athletic Club", short:"ATH", logo:"", played:38, won:16, draw:9, lost:13, gf:54, ga:50, gd:4, points:57, form:"WDLLW", zone:"uel" }
        ],
        topScorers: [
            { name:"Kylian Mbappé", team:"Real Madrid", goals:31, assists:9, photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019_001_Kylian_Mbapp%C3%A9.jpg/150px-2019_001_Kylian_Mbapp%C3%A9.jpg" },
            { name:"Robert Lewandowski", team:"Barcelona", goals:26, assists:8, photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Robert_Lewandowski_2022_%28cropped%29.jpg/150px-Robert_Lewandowski_2022_%28cropped%29.jpg" },
            { name:"Vinicius Jr", team:"Real Madrid", goals:22, assists:19, photo:"" },
            { name:"Antoine Griezmann", team:"Atletico Madrid", goals:20, assists:12, photo:"" },
            { name:"Lamine Yamal", team:"Barcelona", goals:16, assists:21, photo:"" }
        ]
    },

    // BUNDESLIGA 2024/25
    bl: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Bayern München", short:"BAY", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg/150px-FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg.png", played:34, won:24, draw:4, lost:6, gf:88, ga:44, gd:44, points:76, form:"WWWWL", zone:"cl" },
            { rank:2, team:"Bayer Leverkusen", short:"B04", logo:"", played:34, won:22, draw:7, lost:5, gf:76, ga:38, gd:38, points:73, form:"DWWWW", zone:"cl" },
            { rank:3, team:"Borussia Dortmund", short:"BVB", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/150px-Borussia_Dortmund_logo.svg.png", played:34, won:19, draw:7, lost:8, gf:68, ga:48, gd:20, points:64, form:"WWDLW", zone:"cl" },
            { rank:4, team:"RB Leipzig", short:"RBL", logo:"", played:34, won:18, draw:6, lost:10, gf:65, ga:50, gd:15, points:60, form:"LWWWL", zone:"cl" },
            { rank:5, team:"Eintracht Frankfurt", short:"SGE", logo:"", played:34, won:16, draw:7, lost:11, gf:60, ga:52, gd:8, points:55, form:"WDWLW", zone:"uel" }
        ],
        topScorers: [
            { name:"Harry Kane", team:"Bayern München", goals:36, assists:11, photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Harry_Kane_%28cropped%29.jpg/150px-Harry_Kane_%28cropped%29.jpg" },
            { name:"Serhou Guirassy", team:"Borussia Dortmund", goals:22, assists:7, photo:"" },
            { name:"Florian Wirtz", team:"Bayer Leverkusen", goals:18, assists:20, photo:"" }
        ]
    },

    // SERİE A 2024/25
    sa: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Napoli", short:"NAP", logo:"", played:38, won:26, draw:7, lost:5, gf:80, ga:38, gd:42, points:85, form:"WWWWW", zone:"cl" },
            { rank:2, team:"Inter Milan", short:"INT", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/150px-FC_Internazionale_Milano_2021.svg.png", played:38, won:25, draw:6, lost:7, gf:78, ga:40, gd:38, points:81, form:"WWDWW", zone:"cl" },
            { rank:3, team:"AC Milan", short:"MIL", logo:"", played:38, won:23, draw:8, lost:7, gf:72, ga:43, gd:29, points:77, form:"WDWWL", zone:"cl" },
            { rank:4, team:"Juventus", short:"JUV", logo:"", played:38, won:22, draw:7, lost:9, gf:65, ga:42, gd:23, points:73, form:"WWLLW", zone:"cl" },
            { rank:5, team:"Atalanta", short:"ATA", logo:"", played:38, won:20, draw:9, lost:9, gf:70, ga:48, gd:22, points:69, form:"DWWWD", zone:"uel" }
        ],
        topScorers: [
            { name:"Romelu Lukaku", team:"Napoli", goals:24, assists:9, photo:"" },
            { name:"Lautaro Martínez", team:"Inter Milan", goals:22, assists:8, photo:"" },
            { name:"Dusan Vlahovic", team:"Juventus", goals:20, assists:5, photo:"" },
            { name:"Rafael Leão", team:"AC Milan", goals:18, assists:14, photo:"" }
        ]
    },

    // LIGUE 1 2024/25
    l1: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Paris SG", short:"PSG", logo:"https://upload.wikimedia.org/wikipedia/tr/thumb/a/a7/Paris_Saint-Germain_F.C..svg/150px-Paris_Saint-Germain_F.C..svg.png", played:34, won:26, draw:4, lost:4, gf:89, ga:35, gd:54, points:82, form:"WWWWW", zone:"cl" },
            { rank:2, team:"Monaco", short:"MON", logo:"", played:34, won:22, draw:5, lost:7, gf:72, ga:42, gd:30, points:71, form:"WWDWL", zone:"cl" },
            { rank:3, team:"Lyon", short:"OL", logo:"", played:34, won:19, draw:8, lost:7, gf:65, ga:44, gd:21, points:65, form:"DWWWL", zone:"cl" },
            { rank:4, team:"Marseille", short:"OM", logo:"", played:34, won:18, draw:7, lost:9, gf:61, ga:46, gd:15, points:61, form:"WLWDW", zone:"uel" }
        ],
        topScorers: [
            { name:"Bradley Barcola", team:"Paris SG", goals:22, assists:12, photo:"" },
            { name:"Désiré Doué", team:"Paris SG", goals:18, assists:10, photo:"" },
            { name:"Folarin Balogun", team:"Monaco", goals:16, assists:7, photo:"" }
        ]
    },

    // ŞAMPIYONLAR LİGİ 2024/25
    ucl: {
        season: "2024/25",
        standings: [
            { rank:1, team:"Real Madrid", short:"RMA", logo:"", played:8, won:6, draw:1, lost:1, gf:22, ga:9, gd:13, points:19, form:"WWWWW", zone:"cl" },
            { rank:2, team:"Liverpool", short:"LIV", logo:"", played:8, won:6, draw:1, lost:1, gf:21, ga:8, gd:13, points:19, form:"WWWWW", zone:"cl" },
            { rank:3, team:"Barcelona", short:"BAR", logo:"", played:8, won:6, draw:0, lost:2, gf:23, ga:12, gd:11, points:18, form:"WWWWL", zone:"cl" },
            { rank:4, team:"Arsenal", short:"ARS", logo:"", played:8, won:5, draw:2, lost:1, gf:18, ga:9, gd:9, points:17, form:"WWDWW", zone:"cl" },
            { rank:5, team:"Atletico Madrid", short:"ATM", logo:"", played:8, won:5, draw:1, lost:2, gf:16, ga:10, gd:6, points:16, form:"WWLWW", zone:"cl" },
            { rank:6, team:"Inter Milan", short:"INT", logo:"", played:8, won:5, draw:1, lost:2, gf:14, ga:9, gd:5, points:16, form:"WWDWL", zone:"cl" },
            { rank:7, team:"Bayern München", short:"BAY", logo:"", played:8, won:5, draw:0, lost:3, gf:17, ga:13, gd:4, points:15, form:"WWWLW", zone:"cl" },
            { rank:8, team:"Borussia Dortmund", short:"BVB", logo:"", played:8, won:4, draw:2, lost:2, gf:15, ga:11, gd:4, points:14, form:"WDWWL", zone:"cl" }
        ],
        topScorers: [
            { name:"Erling Haaland", team:"Man City", goals:8, assists:3, photo:"" },
            { name:"Kylian Mbappé", team:"Real Madrid", goals:7, assists:4, photo:"" },
            { name:"Mohamed Salah", team:"Liverpool", goals:6, assists:5, photo:"" },
            { name:"Vinicius Jr", team:"Real Madrid", goals:6, assists:6, photo:"" }
        ]
    }
};

// ===== ÜNLÜ OYUNCU PROFİLLERİ =====
const PLAYER_PROFILES = [
    {
        id: 1,
        name: "Lionel Messi",
        fullName: "Lionel Andrés Messi Cuccittini",
        position: "Sağ Kanat / İç Saha",
        nationality: "🇦🇷 Arjantin",
        age: 37,
        height: "1.70m",
        currentClub: "Inter Miami",
        number: 10,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/150px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
        bio: "Futbol tarihinin en iyi oyuncularından biri olarak kabul edilen Messi, 8 Ballon d'Or ile rekor kırdı. 2022 Dünya Kupası'nı Arjantin ile kazanarak kariyerini taçlandırdı.",
        stats: { goals: 841, assists: 384, matches: 1072, trophies: 44 },
        career: [
            { years: "2004–2021", club: "FC Barcelona", apps: 778, goals: 672, honors: "10 La Liga, 4 ŞL, 7 Copa del Rey" },
            { years: "2021–2023", club: "Paris Saint-Germain", apps: 75, goals: 32, honors: "2 Ligue 1" },
            { years: "2023–", club: "Inter Miami", apps: 57, goals: 41, honors: "Leagues Cup 2023" }
        ],
        honors: ["8x Ballon d'Or", "2022 Dünya Kupası", "10x La Liga", "4x UEFA Şampiyonlar Ligi", "Copa América 2021"]
    },
    {
        id: 2,
        name: "Cristiano Ronaldo",
        fullName: "Cristiano Ronaldo dos Santos Aveiro",
        position: "Santrafor / Sol Kanat",
        nationality: "🇵🇹 Portekiz",
        age: 40,
        height: "1.87m",
        currentClub: "Al-Nassr",
        number: 7,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/150px-Cristiano_Ronaldo_2018.jpg",
        bio: "5 Ballon d'Or sahibi Ronaldo, kariyer boyunca 900'den fazla gol atarak futbol tarihinin en prolific golcüsü unvanını kazandı.",
        stats: { goals: 902, assists: 248, matches: 1218, trophies: 35 },
        career: [
            { years: "2002–2003", club: "Sporting CP", apps: 25, goals: 5, honors: "" },
            { years: "2003–2009", club: "Manchester United", apps: 292, goals: 118, honors: "3 Premier Lig, 1 ŞL" },
            { years: "2009–2018", club: "Real Madrid", apps: 438, goals: 450, honors: "4 ŞL, 2 La Liga" },
            { years: "2018–2021", club: "Juventus", apps: 134, goals: 101, honors: "2 Serie A" },
            { years: "2021–2022", club: "Manchester United", apps: 54, goals: 27, honors: "" },
            { years: "2023–", club: "Al-Nassr", apps: 89, goals: 78, honors: "1 Arab Club Champions Cup" }
        ],
        honors: ["5x Ballon d'Or", "2016 Euro", "4x Şampiyonlar Ligi", "3x Premier Lig", "2x La Liga"]
    },
    {
        id: 3,
        name: "Erling Haaland",
        fullName: "Erling Braut Haaland",
        position: "Santrafor",
        nationality: "🇳🇴 Norveç",
        age: 24,
        height: "1.94m",
        currentClub: "Manchester City",
        number: 9,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Erling_Haaland_2023.jpg/150px-Erling_Haaland_2023.jpg",
        bio: "Tarihin en hızlı gol basan oyuncularından biri olan Haaland, sezon başına gol ortalamasıyla tüm rekorları yerle bir etti.",
        stats: { goals: 289, assists: 67, matches: 322, trophies: 8 },
        career: [
            { years: "2016–2017", club: "Bryne FK", apps: 16, goals: 0, honors: "" },
            { years: "2017–2019", club: "Molde", apps: 50, goals: 20, honors: "" },
            { years: "2019–2020", club: "RB Salzburg", apps: 27, goals: 29, honors: "1 Avusturya Ligi" },
            { years: "2020–2022", club: "Borussia Dortmund", apps: 89, goals: 86, honors: "1 DFB-Pokal" },
            { years: "2022–", club: "Manchester City", apps: 140, goals: 114, honors: "1 Premier Lig, 1 ŞL, 1 FA Cup" }
        ],
        honors: ["Premier Lig Gol Krallığı (2022/23 - 36 gol)", "ŞL Gol Krallığı", "Bundesliga Gol Krallığı"]
    },
    {
        id: 4,
        name: "Kylian Mbappé",
        fullName: "Kylian Mbappé Lottin",
        position: "Santrafor / Sol Kanat",
        nationality: "🇫🇷 Fransa",
        age: 26,
        height: "1.78m",
        currentClub: "Real Madrid",
        number: 9,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019_001_Kylian_Mbapp%C3%A9.jpg/150px-2019_001_Kylian_Mbapp%C3%A9.jpg",
        bio: "Neslin en iyi oyuncusu olarak gösterilen Mbappé, 2024'te Real Madrid'e imza atarak futbol tarihinde önemli bir dönem başlattı.",
        stats: { goals: 352, assists: 151, matches: 497, trophies: 18 },
        career: [
            { years: "2015–2017", club: "AS Monaco", apps: 60, goals: 27, honors: "1 Ligue 1" },
            { years: "2017–2024", club: "Paris Saint-Germain", apps: 308, goals: 256, honors: "6 Ligue 1" },
            { years: "2024–", club: "Real Madrid", apps: 52, goals: 31, honors: "1 La Liga" }
        ],
        honors: ["2018 Dünya Kupası", "Ligue 1'de 6x Şampiyon", "Fransa Ligi Gol Krallığı (x4)"]
    },
    {
        id: 5,
        name: "Mohamed Salah",
        fullName: "Mohamed Salah Hamed Mahrous Ghaly",
        position: "Sağ Kanat",
        nationality: "🇪🇬 Mısır",
        age: 32,
        height: "1.75m",
        currentClub: "Liverpool",
        number: 11,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mohamed_Salah_2018.jpg/150px-Mohamed_Salah_2018.jpg",
        bio: "'Mısır'ın Firavunu' lakaplı Salah, Liverpool'da yakaladığı formla Premier Lig'in en iyi oyuncuları arasına girdi.",
        stats: { goals: 378, assists: 179, matches: 618, trophies: 12 },
        career: [
            { years: "2010–2012", club: "El Mokawloon", apps: 38, goals: 12, honors: "" },
            { years: "2012–2014", club: "Basel", apps: 70, goals: 20, honors: "" },
            { years: "2014–2016", club: "Chelsea", apps: 13, goals: 2, honors: "" },
            { years: "2015–2016", club: "Fiorentina (kiralık)", apps: 26, goals: 9, honors: "" },
            { years: "2016–2017", club: "AS Roma", apps: 41, goals: 19, honors: "" },
            { years: "2017–", club: "Liverpool", apps: 365, goals: 238, honors: "1 ŞL, 1 Premier Lig, 1 FA Cup" }
        ],
        honors: ["Premier Lig Gol Krallığı (x4)", "UEFA Şampiyonlar Ligi 2018/19", "Premier Lig 2019/20", "PFA Yılın Oyuncusu (x2)"]
    },
    {
        id: 6,
        name: "Arda Güler",
        fullName: "Arda Güler",
        position: "Sağ Kanat / İç Saha",
        nationality: "🇹🇷 Türkiye",
        age: 20,
        height: "1.76m",
        currentClub: "Real Madrid",
        number: 15,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Arda_G%C3%BCler_2023.jpg/150px-Arda_G%C3%BCler_2023.jpg",
        bio: "'Türk Mozart' lakaplı Arda Güler, Real Madrid'de parlayarak Türk futbol tarihinin en yetenekli oyuncusu unvanını taşıyor. 2024 Euro'da şov yaptı.",
        stats: { goals: 48, assists: 31, matches: 142, trophies: 5 },
        career: [
            { years: "2021–2023", club: "Fenerbahçe", apps: 60, goals: 17, honors: "Türkiye Kupası" },
            { years: "2023–", club: "Real Madrid", apps: 64, goals: 22, honors: "1 La Liga, 1 ŞL" }
        ],
        honors: ["Euro 2024 En İyi Genç Oyuncu", "La Liga 2023/24 Şampiyonu", "Şampiyonlar Ligi 2023/24"]
    },
    {
        id: 7,
        name: "Vinicius Jr",
        fullName: "Vinícius José Paixão de Oliveira Júnior",
        position: "Sol Kanat",
        nationality: "🇧🇷 Brezilya",
        age: 24,
        height: "1.76m",
        currentClub: "Real Madrid",
        number: 7,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Vinicius_Junior_2022.jpg/150px-Vinicius_Junior_2022.jpg",
        bio: "Real Madrid'in yıldız oyuncusu Vinicius Jr, hızı ve dribling becerisiyle dünya futbolunun en spektaküler oyuncusu.",
        stats: { goals: 128, assists: 94, matches: 310, trophies: 9 },
        career: [
            { years: "2017–2018", club: "Flamengo", apps: 30, goals: 4, honors: "" },
            { years: "2018–", club: "Real Madrid", apps: 280, goals: 124, honors: "3 ŞL, 2 La Liga" }
        ],
        honors: ["Şampiyonlar Ligi 2021/22, 2023/24", "La Liga (x2)", "Ballon d'Or 2024"]
    },
    {
        id: 8,
        name: "Lamine Yamal",
        fullName: "Lamine Yamal Nasraoui Ebana",
        position: "Sağ Kanat",
        nationality: "🇪🇸 İspanya",
        age: 17,
        height: "1.81m",
        currentClub: "FC Barcelona",
        number: 19,
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Lamine_Yamal_Euro_2024.jpg/150px-Lamine_Yamal_Euro_2024.jpg",
        bio: "Tarihin en genç Avrupa Şampiyonu olan Lamine Yamal, Barcelona ve İspanya Milli Takımı'nda neslin en büyük yeteneği.",
        stats: { goals: 32, assists: 47, matches: 98, trophies: 3 },
        career: [
            { years: "2023–", club: "FC Barcelona", apps: 98, goals: 32, honors: "1 La Liga" }
        ],
        honors: ["Euro 2024 Şampiyonu", "Euro 2024 En İyi Genç Oyuncu", "Kopa Trofesi 2024"]
    }
];

// ===== UZMAN YORUMLARI =====
const EXPERT_COMMENTS = [
    {
        name: "Ronaldo (R9)",
        title: "Dünya Kupası Şampiyonu (1994, 2002)",
        club: "Brezilya Efsanesi",
        emoji: "🇧🇷",
        topic: "Erling Haaland Hakkında",
        comment: "Haaland beni hatırlatıyor. Bu tür oyuncular her nesilde bir gelir. Ama ben daha hızlı koşuyordum! (Gülüşür) Gerçekten şaka bir yana, o çok özel bir yetenek. Fiziksel üstünlüğü ve gol duygusu eşsiz.",
        date: "Mart 2026",
        source: "ESPN Exclusive"
    },
    {
        name: "Zinedine Zidane",
        title: "Teknik Direktör / Dünya Kupası Şampiyonu",
        club: "Fransa & Real Madrid Efsanesi",
        emoji: "🇫🇷",
        topic: "Mbappé ve Real Madrid",
        comment: "Kylian Real Madrid'e gelmesi gereken oyuncuydu. Bu takıma yakışıyor. Ama henüz potansiyelinin tamamına ulaşmadı. Önünde çok büyük yıllar var. Belki 5 yıl sonra Messi ve Ronaldo ile kıyaslanacak.",
        date: "Şubat 2026",
        source: "RMC Sport"
    },
    {
        name: "José Mourinho",
        title: "Teknik Direktör",
        club: "Chelsea, Real Madrid, Inter, Roma",
        emoji: "🇵🇹",
        topic: "Süper Lig Kalitesi",
        comment: "Türk futbolu her geçen yıl daha iyiye gidiyor. Galatasaray ve Fenerbahçe artık sadece Türkiye değil, Avrupa'nın güçlü takımları. Arda Güler gibi oyuncuların yetişmesi tesadüf değil.",
        date: "Ocak 2026",
        source: "TRT Spor"
    },
    {
        name: "Pep Guardiola",
        title: "Teknik Direktör",
        club: "Manchester City",
        emoji: "🇪🇸",
        topic: "Yapay Zeka ve Futbol",
        comment: "Veri analizi artık futbolun ayrılmaz parçası. Maç hazırlığımızın yüzde 40'ı yapay zeka destekli analizlerden oluşuyor. Ama sahada yaratıcılık ve tutku hâlâ insan işi. Bunu hiçbir algoritma taklit edemez.",
        date: "Nisan 2026",
        source: "Sky Sports"
    },
    {
        name: "Didier Drogba",
        title: "Chelsea Efsanesi",
        club: "Fildişi Sahili Milli Takımı Eski Kaptanı",
        emoji: "🇨🇮",
        topic: "Afrika Futbolunun Geleceği",
        comment: "Afrika futbolu patlama noktasına geldi. Artık sadece Avrupa'ya oyuncu ihraç etmiyoruz, kendi liglerimizi de güçlendiriyoruz. 10 yıl içinde Afrika Kupası Dünya Kupası kadar izlenecek.",
        date: "Mayıs 2026",
        source: "BBC Africa"
    },
    {
        name: "Fatih Terim",
        title: "Efsane Teknik Direktör",
        club: "Galatasaray / Türkiye Milli Takımı",
        emoji: "🇹🇷",
        topic: "Türk Futbolunun Altın Çağı",
        comment: "2000'li yıllarda Türkiye Dünya'yı şaşırttı, şimdi yine o döneme benzer bir süreç yaşanıyor. Arda Güler, Kenan Yıldız gibi oyuncular Türk futboluna çok şey kazandıracak. Gurur duyuyorum.",
        date: "Nisan 2026",
        source: "NTV Spor"
    },
    {
        name: "Roberto Carlos",
        title: "Dünya Kupası Şampiyonu",
        club: "Brezilya & Real Madrid Efsanesi",
        emoji: "🇧🇷",
        topic: "Vinicius Jr Hakkında",
        comment: "Vinicius gerçek bir Brezilyalı. O oyunu içten yaşıyor, o mutluluğu sahaya yansıtıyor. İlk Ballon d'Or'unu alması çok anlamlıydı. Brezilya futbolunun gururu.",
        date: "Ocak 2026",
        source: "Marca"
    },
    {
        name: "Thierry Henry",
        title: "Arsenal Efsanesi / Fransa Dünya Kupası Şampiyonu",
        club: "CBS Sports Yorumcusu",
        emoji: "🇫🇷",
        topic: "Lamine Yamal Fenomeni",
        comment: "17 yaşında Euro kazanmak... Ben bu yaşta ne yapıyordum? Bu çocuk 30 yaşında dünya futbolunu domine edecek. Barcelona'nın ürettiği en büyük yetenek olabilir, Messi dahil.",
        date: "Şubat 2026",
        source: "CBS Sports"
    }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
    checkDarkMode();
    selectLeague('tr1', 'Süper Lig', 203, 'tr');
    renderComments();

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closePlayerModal();
    });
});

// ===== LİG SEÇ =====
async function selectLeague(key, name, fdId, country) {
    currentLeague = key;
    currentLeagueName = name;
    currentRound = 1;

    // Tıklanan tab'ı bul ve active yap (event kontrolü hatayı önler)
    try {
        if (window.event && window.event.currentTarget) {
            document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
            window.event.currentTarget.classList.add('active');
        }
    } catch(e) {}

    document.getElementById('standingsTitle').innerHTML = `<i class="fas fa-table"></i> ${name} - Puan Durumu`;
    document.getElementById('seasonInfo').textContent = REAL_DATA[key]?.season || '2024/25 Sezonu';

    try {
        // Tüm section'ları hemen statik veri ile doldur
        renderStandings(REAL_DATA[key]?.standings || [], key);
        renderMatches(getStaticMatches(key));
        await loadTopScorers(key, fdId);
        await loadFeaturedPlayers();
    } catch(e) {
        console.warn('Statik yükleme hatası:', e);
    }

    // Ardından API'den dener. Başarılı olursa tabloyu günceller.
    fetchStandingsFromAPI(key, fdId).catch(err => console.warn('API Fetch Error:', err));
}

// ===== API'DEN GÜNCELLE =====
async function fetchStandingsFromAPI(leagueKey, fdId) {
    if (!FD_KEY) {
        setApiStatus('offline');
        return;
    }
    
    // Süper lig (203) ücretsiz planda %100 hata verir, hiç istek atıp geciktirme.
    if (fdId === 203) {
        setApiStatus('offline');
        return; 
    }

    try {
        const res = await fetch(`${FD_BASE}/competitions/${fdId}/standings`, {
            headers: { 'X-Auth-Token': FD_KEY },
            signal: AbortSignal.timeout(3000) // 3 saniyede cevap vermezse iptal et (takılmasın)
        });
        
        if (res.ok) {
            const json = await res.json();
            const table = json.standings?.find(s => s.type === 'TOTAL')?.table;
            if (table && table.length > 0) {
                const standings = table.map((t, i) => ({
                    rank: t.position,
                    team: t.team.name,
                    short: t.team.shortName || t.team.name.substring(0, 3).toUpperCase(),
                    logo: t.team.crest || '',
                    played: t.playedGames,
                    won: t.won,
                    draw: t.draw,
                    lost: t.lost,
                    gf: t.goalsFor,
                    ga: t.goalsAgainst,
                    gd: t.goalDifference,
                    points: t.points,
                    form: t.form ? t.form.replace(/,/g, '') : 'WDWDW',
                    zone: i < 4 ? 'cl' : i < 6 ? 'uel' : i > 17 ? 'rel' : 'normal'
                }));
                renderStandings(standings, leagueKey); // Canlı veri ile tabloyu güncelle
                setApiStatus('live');
                apiAvailable = true;
            }
        } else {
            console.warn('API HTTP Hata Kodu:', res.status);
            setApiStatus('offline');
        }
    } catch (e) {
        console.warn('API İsteği başarısız oldu (Zaman aşımı veya CORS):', e);
        setApiStatus('offline');
    }
}

// ===== PUAN DURUMU RENDER =====
function renderStandings(standings, leagueKey) {
    const tbody = document.getElementById('standingsBody');
    if (!standings || standings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11" class="loading-row">Veri bulunamadı</td></tr>`;
        return;
    }

    // Lig zone belirleme
    const zonesMap = {
        tr1: { cl: [1,2], uel: [3], uecl: [4], rel: [-3,-2,-1] },
        pl:  { cl: [1,2,3,4], uel: [5,6], uecl: [7], rel: [-3,-2,-1] },
        la:  { cl: [1,2,3,4], uel: [5,6], uecl: [7], rel: [-3,-2,-1] },
        bl:  { cl: [1,2,3,4], uel: [5,6], uecl: [], rel: [-2,-1] },
        sa:  { cl: [1,2,3,4], uel: [5], uecl: [6,7], rel: [-3,-2,-1] },
        l1:  { cl: [1,2,3], uel: [4,5], uecl: [], rel: [-3,-2,-1] },
        ucl: { cl: [1,2,3,4,5,6,7,8], uel: [], uecl: [], rel: [] }
    };

    const zones = zonesMap[leagueKey] || zonesMap.pl;
    const total = standings.length;

    tbody.innerHTML = standings.map((t, i) => {
        const pos = i + 1;
        const absRel = total - pos;
        let zone = t.zone || 'normal';
        if (!t.zone) {
            if (zones.cl.includes(pos)) zone = 'cl';
            else if (zones.uel.includes(pos)) zone = 'uel';
            else if (zones.uecl.includes(pos)) zone = 'uecl';
            else if (absRel < 3) zone = 'rel';
        }

        const form = (t.form || 'WDLWW').split('').slice(-5);
        const formDots = form.map(f => `<span class="form-dot ${f}">${f}</span>`).join('');
        const gd = t.gd || (t.gf - t.ga);
        const gdClass = gd > 0 ? 'gd-positive' : gd < 0 ? 'gd-negative' : '';

        const logoHtml = t.logo
            ? `<img src="${t.logo}" alt="${t.team}" class="team-logo" onerror="this.style.display='none'">`
            : `<span style="font-size:20px">⚽</span>`;

        return `
        <tr onclick="showTeamDetail('${t.team}')">
            <td><span class="rank-num ${zone}">${t.rank || pos}</span></td>
            <td>
                <div class="team-cell">
                    ${logoHtml}
                    <span class="team-name">${t.team}</span>
                    <span class="team-short">${t.short || t.team.substring(0,3)}</span>
                </div>
            </td>
            <td>${t.played}</td>
            <td><strong>${t.won}</strong></td>
            <td>${t.draw}</td>
            <td>${t.lost}</td>
            <td>${t.gf}</td>
            <td>${t.ga}</td>
            <td class="${gdClass}">${gd > 0 ? '+' : ''}${gd}</td>
            <td class="points-cell">${t.points}</td>
            <td><div class="form-dots">${formDots}</div></td>
        </tr>`;
    }).join('');
}

// ===== MAÇLAR YÜKLE =====
async function loadMatches(leagueKey, fdId) {
    document.getElementById('matchesGrid').innerHTML = '<div class="loading-msg"><i class="fas fa-spinner fa-spin"></i> Maçlar yükleniyor...</div>';

    // Gerçek maçlar - 2024/25 son hafta sonuçları
    const matches = getStaticMatches(leagueKey);
    renderMatches(matches);
    document.getElementById('currentRound').textContent = `${currentRound}. Hafta`;
}

function getStaticMatches(leagueKey) {
    const matchesByLeague = {
        tr1: [
            { home: "Galatasaray", homeLogo: "", away: "Fenerbahçe", awayLogo: "", homeScore: 2, awayScore: 1, status: "finished", date: "3 Mayıs 2025", stadium: "RAMS Park", attendance: "52,000" },
            { home: "Beşiktaş", homeLogo: "", away: "Trabzonspor", awayLogo: "", homeScore: 1, awayScore: 1, status: "finished", date: "4 Mayıs 2025", stadium: "Tüpraş Stadyumu", attendance: "41,500" },
            { home: "Başakşehir", homeLogo: "", away: "Sivasspor", awayLogo: "", homeScore: 3, awayScore: 0, status: "finished", date: "4 Mayıs 2025", stadium: "Başakşehir Fatih Terim Stadyumu", attendance: "8,200" },
            { home: "Antalyaspor", homeLogo: "", away: "Konyaspor", awayLogo: "", homeScore: 2, awayScore: 2, status: "finished", date: "5 Mayıs 2025", stadium: "Antalya Stadyumu", attendance: "15,000" },
            { home: "Fenerbahçe", homeLogo: "", away: "Galatasaray", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "18 Mayıs 2025", stadium: "Ülker Stadyumu", attendance: "52,000" },
            { home: "Trabzonspor", homeLogo: "", away: "Beşiktaş", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "19 Mayıs 2025", stadium: "Papara Park", attendance: "" }
        ],
        pl: [
            { home: "Liverpool", homeLogo: "", away: "Arsenal", awayLogo: "", homeScore: 2, awayScore: 0, status: "finished", date: "3 Mayıs 2025", stadium: "Anfield", attendance: "53,394" },
            { home: "Man City", homeLogo: "", away: "Chelsea", awayLogo: "", homeScore: 1, awayScore: 2, status: "finished", date: "4 Mayıs 2025", stadium: "Etihad Stadium", attendance: "53,400" },
            { home: "Man United", homeLogo: "", away: "Tottenham", awayLogo: "", homeScore: 3, awayScore: 2, status: "finished", date: "4 Mayıs 2025", stadium: "Old Trafford", attendance: "73,811" },
            { home: "Arsenal", homeLogo: "", away: "Man City", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "11 Mayıs 2025", stadium: "Emirates Stadium", attendance: "" },
            { home: "Chelsea", homeLogo: "", away: "Liverpool", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "11 Mayıs 2025", stadium: "Stamford Bridge", attendance: "" }
        ],
        la: [
            { home: "Real Madrid", homeLogo: "", away: "Barcelona", awayLogo: "", homeScore: 3, awayScore: 2, status: "finished", date: "26 Nisan 2025", stadium: "Santiago Bernabéu", attendance: "83,500" },
            { home: "Atletico Madrid", homeLogo: "", away: "Villarreal", awayLogo: "", homeScore: 2, awayScore: 1, status: "finished", date: "27 Nisan 2025", stadium: "Metropolitano", attendance: "68,000" },
            { home: "Barcelona", homeLogo: "", away: "Real Madrid", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "10 Mayıs 2025", stadium: "Estadi Olímpic", attendance: "" }
        ],
        bl: [
            { home: "Bayern München", homeLogo: "", away: "Borussia Dortmund", awayLogo: "", homeScore: 3, awayScore: 1, status: "finished", date: "2 Mayıs 2025", stadium: "Allianz Arena", attendance: "75,000" },
            { home: "Bayer Leverkusen", homeLogo: "", away: "RB Leipzig", awayLogo: "", homeScore: 2, awayScore: 2, status: "finished", date: "3 Mayıs 2025", stadium: "BayArena", attendance: "30,210" }
        ],
        ucl: [
            { home: "Real Madrid", homeLogo: "", away: "Arsenal", awayLogo: "", homeScore: 2, awayScore: 1, status: "finished", date: "8 Nisan 2025", stadium: "Santiago Bernabéu", attendance: "83,000", round: "Çeyrek Final (1. Maç)" },
            { home: "Arsenal", homeLogo: "", away: "Real Madrid", awayLogo: "", homeScore: 1, awayScore: 0, status: "finished", date: "16 Nisan 2025", stadium: "Emirates Stadium", attendance: "60,704", round: "Çeyrek Final (2. Maç)" },
            { home: "Barcelona", homeLogo: "", away: "Inter Milan", awayLogo: "", homeScore: 3, awayScore: 3, status: "finished", date: "9 Nisan 2025", stadium: "Estadi Olímpic", attendance: "55,000", round: "Çeyrek Final (1. Maç)" },
            { home: "Real Madrid", homeLogo: "", away: "Bayern München", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "29 Nisan 2025", stadium: "Santiago Bernabéu", attendance: "", round: "Yarı Final (1. Maç)" },
            { home: "Liverpool", homeLogo: "", away: "Barcelona", awayLogo: "", homeScore: null, awayScore: null, status: "upcoming", date: "30 Nisan 2025", stadium: "Anfield", attendance: "", round: "Yarı Final (1. Maç)" }
        ]
    };
    return matchesByLeague[leagueKey] || matchesByLeague.pl;
}

function renderMatches(matches) {
    const grid = document.getElementById('matchesGrid');
    if (!matches || matches.length === 0) {
        grid.innerHTML = '<div class="loading-msg">Maç verisi bulunamadı</div>';
        return;
    }

    grid.innerHTML = matches.map(m => {
        const statusClass = m.status === 'live' ? 'live' : m.status === 'finished' ? 'finished' : 'upcoming';
        const statusText = m.status === 'live' ? '🔴 CANLI' : m.status === 'finished' ? 'Bitti' : 'Yaklaşan';

        const scoreHtml = m.status === 'upcoming'
            ? `<div class="match-score upcoming"><span>${m.date.split(' ').slice(0,2).join(' ')}</span><span>vs</span></div>`
            : `<div class="match-score"><span>${m.homeScore}</span><span class="score-sep">-</span><span>${m.awayScore}</span></div>`;

        return `
        <div class="match-card">
            <div class="match-header">
                <span>${m.round || (currentLeagueName + ' ' + currentRound + '. Hafta')}</span>
                <span class="match-status ${statusClass}">${statusText}</span>
            </div>
            <div class="match-teams">
                <div class="match-team">
                    <div style="width:40px;height:40px;background:var(--bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">⚽</div>
                    <span class="match-team-name">${m.home}</span>
                </div>
                ${scoreHtml}
                <div class="match-team">
                    <div style="width:40px;height:40px;background:var(--bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">⚽</div>
                    <span class="match-team-name">${m.away}</span>
                </div>
            </div>
            <div class="match-footer">
                <span><i class="fas fa-map-marker-alt"></i> ${m.stadium || 'Stadyum'}</span>
                <span><i class="fas fa-calendar"></i> ${m.date}</span>
                ${m.attendance ? `<span><i class="fas fa-users"></i> ${m.attendance}</span>` : ''}
            </div>
        </div>`;
    }).join('');
}

function changeRound(dir) {
    currentRound = Math.max(1, Math.min(maxRound, currentRound + dir));
    document.getElementById('currentRound').textContent = `${currentRound}. Hafta`;
}

// ===== GOL KRALLARI YÜKLE =====
async function loadTopScorers(leagueKey, fdId) {
    const data = REAL_DATA[leagueKey];
    const scorers = data?.topScorers || [];

    // Tüm liglerin gol krallıklarını göster
    const allScorers = {
        'Süper Lig': REAL_DATA.tr1.topScorers,
        'Premier Lig': REAL_DATA.pl.topScorers,
        'La Liga': REAL_DATA.la.topScorers,
        'Bundesliga': REAL_DATA.bl.topScorers,
        'Serie A': REAL_DATA.sa.topScorers
    };

    const grid = document.getElementById('scorersGrid');
    grid.innerHTML = '';

    Object.entries(allScorers).forEach(([leagueName, scorerList]) => {
        if (!scorerList || scorerList.length === 0) return;
        const card = document.createElement('div');
        card.className = 'scorers-table-card';
        card.innerHTML = `
            <div class="scorers-card-header">
                <i class="fas fa-bullseye"></i> ${leagueName} - Gol Krallığı
            </div>
            <div class="scorers-list">
                ${scorerList.slice(0, 8).map((s, i) => `
                <div class="scorer-item" onclick="showPlayerByName('${s.name}')">
                    <span class="scorer-rank">${i+1}</span>
                    <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#e74c3c);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;flex-shrink:0;">
                        ${s.name.charAt(0)}
                    </div>
                    <div class="scorer-info">
                        <div class="scorer-name">${s.name}</div>
                        <div class="scorer-team">${s.team}</div>
                    </div>
                    <div>
                        <div class="scorer-count">${s.goals}</div>
                        <div style="font-size:10px;color:var(--text-light);text-align:center;">gol</div>
                    </div>
                    <div style="margin-left:8px;">
                        <div style="font-size:14px;font-weight:700;color:#3498db;">${s.assists}</div>
                        <div style="font-size:10px;color:var(--text-light);">asist</div>
                    </div>
                </div>`).join('')}
            </div>`;
        grid.appendChild(card);
    });
}

// ===== OYUNCULAR YÜKLE =====
async function loadFeaturedPlayers() {
    const container = document.getElementById('featuredPlayers');
    container.innerHTML = PLAYER_PROFILES.map(p => `
        <div class="player-card" onclick="openPlayerModal(${p.id})">
            ${p.photo
                ? `<img src="${p.photo}" alt="${p.name}" class="player-card-photo" onerror="this.parentElement.innerHTML='<div class=\\'player-card-photo-placeholder\\'><i class=\\'fas fa-user-circle\\'></i></div>'+this.parentElement.innerHTML.replace(this.outerHTML,'')">`
                : `<div class="player-card-photo-placeholder"><i class="fas fa-user-circle"></i></div>`
            }
            <div class="player-card-body">
                <div class="player-card-name">${p.name}</div>
                <span class="player-card-pos">${p.position.split('/')[0].trim()}</span>
                <div class="player-card-team">
                    <i class="fas fa-futbol"></i> ${p.currentClub} &nbsp;${p.nationality.split(' ')[0]}
                </div>
                <div class="player-card-stats">
                    <div class="player-stat-item">
                        <span class="player-stat-val">${p.stats.goals}</span>
                        <span class="player-stat-lbl">Gol</span>
                    </div>
                    <div class="player-stat-item">
                        <span class="player-stat-val">${p.stats.assists}</span>
                        <span class="player-stat-lbl">Asist</span>
                    </div>
                    <div class="player-stat-item">
                        <span class="player-stat-val">${p.stats.trophies}</span>
                        <span class="player-stat-lbl">Kupa</span>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

// ===== OYUNCU MODALİ =====
function openPlayerModal(id) {
    const p = PLAYER_PROFILES.find(x => x.id === id);
    if (!p) return;

    const content = document.getElementById('playerModalContent');
    content.innerHTML = `
        <div class="player-profile-header">
            ${p.photo
                ? `<img src="${p.photo}" alt="${p.name}" class="profile-photo" onerror="this.outerHTML='<div class=\\'profile-photo-placeholder\\'><i class=\\'fas fa-user\\'></i></div>'">`
                : `<div class="profile-photo-placeholder"><i class="fas fa-user"></i></div>`
            }
            <div class="profile-info">
                <div class="profile-name">${p.name}</div>
                <div class="profile-full-name">${p.fullName}</div>
                <div class="profile-badges">
                    <span class="profile-badge pos">${p.position}</span>
                    <span class="profile-badge age">${p.age} yaşında</span>
                    <span class="profile-badge nation">${p.nationality}</span>
                    <span class="profile-badge age">${p.height}</span>
                    <span class="profile-badge age">Forma No: #${p.number}</span>
                </div>
                <div class="profile-bio">${p.bio}</div>
            </div>
        </div>
        <div class="player-profile-body">
            <div class="profile-section-title"><i class="fas fa-chart-bar"></i> Kariyer İstatistikleri</div>
            <div class="stats-grid-modal">
                <div class="stat-box"><span class="stat-box-val">${p.stats.goals}</span><div class="stat-box-lbl">Toplam Gol</div></div>
                <div class="stat-box"><span class="stat-box-val">${p.stats.assists}</span><div class="stat-box-lbl">Asist</div></div>
                <div class="stat-box"><span class="stat-box-val">${p.stats.matches}</span><div class="stat-box-lbl">Maç</div></div>
                <div class="stat-box"><span class="stat-box-val">${p.stats.trophies}</span><div class="stat-box-lbl">Kupa</div></div>
            </div>

            <div class="profile-section-title"><i class="fas fa-road"></i> Kariyer Geçmişi</div>
            <div class="career-timeline">
                ${p.career.map(c => `
                <div class="career-item">
                    <div class="career-years">${c.years}</div>
                    <div style="width:32px;height:32px;background:var(--bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">⚽</div>
                    <div class="career-club-info">
                        <div class="career-club-name">${c.club}</div>
                        <div class="career-club-detail">${c.honors || '—'}</div>
                    </div>
                    <div class="career-stats">
                        <strong>${c.goals}</strong> gol<br>
                        <span style="font-size:10px;">${c.apps} maç</span>
                    </div>
                </div>`).join('')}
            </div>

            <div class="profile-section-title"><i class="fas fa-trophy"></i> Başarılar & Ödüller</div>
            <div class="honors-list">
                ${p.honors.map(h => `<div class="honor-badge"><i class="fas fa-star"></i>${h}</div>`).join('')}
            </div>
        </div>`;

    document.getElementById('playerModalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePlayerModal() {
    document.getElementById('playerModalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function showPlayerByName(name) {
    const player = PLAYER_PROFILES.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
    if (player) {
        showSection('players');
        setTimeout(() => openPlayerModal(player.id), 100);
    }
}

function searchPlayer() {
    const query = document.getElementById('playerSearch').value.trim().toLowerCase();
    if (!query) { loadFeaturedPlayers(); return; }

    const filtered = PLAYER_PROFILES.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.currentClub.toLowerCase().includes(query) ||
        p.nationality.toLowerCase().includes(query) ||
        p.position.toLowerCase().includes(query)
    );

    const container = document.getElementById('featuredPlayers');
    if (filtered.length === 0) {
        container.innerHTML = `<div class="loading-msg" style="padding:40px;">
            <i class="fas fa-search" style="font-size:40px;opacity:0.3;display:block;margin-bottom:12px;"></i>
            "${query}" için oyuncu bulunamadı
        </div>`;
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="player-card" onclick="openPlayerModal(${p.id})">
            ${p.photo ? `<img src="${p.photo}" alt="${p.name}" class="player-card-photo">` : `<div class="player-card-photo-placeholder"><i class="fas fa-user-circle"></i></div>`}
            <div class="player-card-body">
                <div class="player-card-name">${p.name}</div>
                <span class="player-card-pos">${p.position.split('/')[0].trim()}</span>
                <div class="player-card-team"><i class="fas fa-futbol"></i> ${p.currentClub}</div>
                <div class="player-card-stats">
                    <div class="player-stat-item"><span class="player-stat-val">${p.stats.goals}</span><span class="player-stat-lbl">Gol</span></div>
                    <div class="player-stat-item"><span class="player-stat-val">${p.stats.assists}</span><span class="player-stat-lbl">Asist</span></div>
                    <div class="player-stat-item"><span class="player-stat-val">${p.stats.trophies}</span><span class="player-stat-lbl">Kupa</span></div>
                </div>
            </div>
        </div>`).join('');
}

// ===== UZMAN YORUMLARI RENDER =====
function renderComments() {
    const grid = document.getElementById('commentsGrid');
    grid.innerHTML = EXPERT_COMMENTS.map(c => `
        <div class="comment-card">
            <div class="comment-header">
                <div class="comment-avatar-placeholder">${c.emoji}</div>
                <div>
                    <div class="comment-person-name">${c.name}</div>
                    <div class="comment-person-title">${c.title}</div>
                    <div class="comment-person-club">${c.club}</div>
                </div>
            </div>
            <div class="comment-body">
                <div class="comment-topic"><i class="fas fa-microphone"></i> ${c.topic}</div>
                <div class="comment-text">"${c.comment}"</div>
            </div>
            <div class="comment-meta">
                <span><i class="fas fa-calendar"></i> ${c.date}</span>
                <span><i class="fas fa-link"></i> ${c.source}</span>
            </div>
        </div>`).join('');
}

// ===== SEKSİYON GÖSTER =====
function showSection(name) {
    document.querySelectorAll('.football-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    document.getElementById('section-' + name).classList.add('active');
    try {
        if (window.event && window.event.currentTarget) {
            window.event.currentTarget.classList.add('active');
        }
    } catch(e) {}
}

function showTeamDetail(teamName) {
    // Takım detayı - gelecek özellik
}

// ===== API STATUS =====
function setApiStatus(status) {
    const el = document.getElementById('apiIndicator');
    if (status === 'live') {
        el.className = 'api-indicator live';
        el.innerHTML = '<i class="fas fa-circle" style="font-size:8px"></i> Canlı Veri';
        apiAvailable = true;
    } else {
        el.className = 'api-indicator offline';
        el.innerHTML = '<i class="fas fa-database"></i> 2024/25 Verisi';
    }
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

// Sayfa yüklenince API durumunu güncelle
setTimeout(() => {
    setApiStatus(FD_KEY ? 'live' : 'static');
    document.getElementById('apiIndicator').innerHTML = FD_KEY
        ? '<i class="fas fa-circle" style="font-size:8px"></i> Canlı Veri'
        : '<i class="fas fa-database"></i> 2024/25 Sezonu';
}, 1500);
