// GAAN — Central Curated Catalogue & Types
// Engineered & Mastered by Creative Max

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  album_id?: string;
  album_title?: string;
  genre_id?: string;
  genre_name?: string;
  language: 'Hindi' | 'Punjabi' | 'Urdu' | 'Bengali' | 'English';
  duration_seconds: number;
  audio_url: string;
  cover_url: string;
  lyrics?: string;
  plays_count: number;
  likes_count: number;
  is_explicit: boolean;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  verified: boolean;
  monthly_listeners: number;
  language?: string;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  cover_url: string;
  release_date: string;
  type: 'album' | 'single' | 'ep';
  total_tracks: number;
  language?: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  color_hex: string;
  image_url: string;
}

export const GENRES: Genre[] = [
  { id: 'g-1', name: 'Bollywood Romance', slug: 'bollywood-romance', description: 'Soulful Hindi movie love anthems', color_hex: '#8B5CF6', image_url: 'https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg' },
  { id: 'g-2', name: 'Coke Studio & Sufi', slug: 'coke-studio', description: 'Mystical sufi harmonies and live acoustics', color_hex: '#D946EF', image_url: 'https://c.saavncdn.com/728/Afreen-Afreen-Urdu-2022-20220802031813-500x500.webp' },
  { id: 'g-3', name: 'Punjabi Desi Heat', slug: 'punjabi-hits', description: 'High-energy bhangra and melodic hip-hop', color_hex: '#F59E0B', image_url: 'https://c.saavncdn.com/609/Moosetape-Punjabi-2021-20260626155141-500x500.webp' },
  { id: 'g-4', name: 'Bengali Classics', slug: 'bengali-classics', description: 'Rabindra Sangeet & timeless modern melodies', color_hex: '#10B981', image_url: 'https://c.saavncdn.com/358/Aguner-Poroshmoni-Bengali-2021-20211006110024-500x500.webp' },
  { id: 'g-5', name: 'Global Pop & Synth', slug: 'global-pop', description: 'Billboard chart toppers & retro synthwave', color_hex: '#EC4899', image_url: 'https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.webp' },
  { id: 'g-6', name: 'Lo-Fi Chill & Night Drive', slug: 'lo-fi-chill', description: 'Deep night relaxation with warm beats', color_hex: '#6366F1', image_url: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp' },
];

export const ARTISTS: Artist[] = [
  { id: 'art-1', name: 'Arijit Singh', bio: 'The undisputed voice of soulful Bollywood romantic anthems.', image_url: 'https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg', verified: true, monthly_listeners: 45000000, language: 'Hindi' },
  { id: 'art-2', name: 'Sidhu Moose Wala', bio: 'Iconic Punjabi trailblazer who redefined global Punjabi hip-hop.', image_url: 'https://c.saavncdn.com/609/Moosetape-Punjabi-2021-20260626155141-500x500.webp', verified: true, monthly_listeners: 32000000, language: 'Punjabi' },
  { id: 'art-3', name: 'Diljit Dosanjh', bio: 'Global Punjabi powerhouse, Coachella headliner and superstar.', image_url: 'https://c.saavncdn.com/209/MoonChild-Era-Punjabi-2021-20240715073449-500x500.webp', verified: true, monthly_listeners: 28000000, language: 'Punjabi' },
  { id: 'art-4', name: 'Atif Aslam', bio: 'Legendary vocalist known for emotive Coke Studio sufi & Bollywood classics.', image_url: 'https://c.saavncdn.com/747/Jeena-Jeena-Bannet-Dosanjh-Remix-Hindi-2025-20250930144029-500x500.webp', verified: true, monthly_listeners: 27000000, language: 'Urdu' },
  { id: 'art-5', name: 'Taylor Swift', bio: 'Global pop sensation and 14-time Grammy winning songwriter.', image_url: 'https://c.saavncdn.com/243/The-Cruelest-Summer-English-2023-20231109123211-500x500.webp', verified: true, monthly_listeners: 105000000, language: 'English' },
  { id: 'art-6', name: 'Shreya Ghoshal', bio: 'India’s nightingale delivering melodious symphonies across languages.', image_url: 'https://c.saavncdn.com/808/Bajirao-Mastani-Hindi-2025-20260120201154-500x500.webp', verified: true, monthly_listeners: 31000000, language: 'Hindi' },
  { id: 'art-7', name: 'The Weeknd', bio: 'Chart-conquering maestro blending dark R&B with 80s synthwave.', image_url: 'https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.webp', verified: true, monthly_listeners: 98000000, language: 'English' },
  { id: 'art-8', name: 'Pritam', bio: 'Architect of modern Bollywood soundscapes and timeless melodies.', image_url: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp', verified: true, monthly_listeners: 38000000, language: 'Hindi' },
  { id: 'art-9', name: 'AP Dhillon', bio: 'Modern Punjabi wave creator crafting chart-topping atmospheric hits.', image_url: 'https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.webp', verified: true, monthly_listeners: 18000000, language: 'Punjabi' },
  { id: 'art-10', name: 'KK (Krishnakumar Kunnath)', bio: 'The golden voice of iconic Bollywood rock and passionate romance.', image_url: 'https://c.saavncdn.com/801/Jannat-Hindi-2008-20190629135803-500x500.webp', verified: true, monthly_listeners: 21000000, language: 'Hindi' },
];

export const ALBUMS: Album[] = [
  { id: 'alb-1', title: 'Brahmastra', artist_id: 'art-1', artist_name: 'Pritam & Arijit Singh', cover_url: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp', release_date: '2022-09-09', type: 'album', total_tracks: 6, language: 'Hindi' },
  { id: 'alb-2', title: 'Moosetape', artist_id: 'art-2', artist_name: 'Sidhu Moose Wala', cover_url: 'https://c.saavncdn.com/609/Moosetape-Punjabi-2021-20260626155141-500x500.webp', release_date: '2021-05-15', type: 'album', total_tracks: 32, language: 'Punjabi' },
  { id: 'alb-3', title: 'MoonChild Era', artist_id: 'art-3', artist_name: 'Diljit Dosanjh', cover_url: 'https://c.saavncdn.com/209/MoonChild-Era-Punjabi-2021-20240715073449-500x500.webp', release_date: '2021-08-22', type: 'album', total_tracks: 9, language: 'Punjabi' },
  { id: 'alb-4', title: 'Aashiqui 2', artist_id: 'art-1', artist_name: 'Arijit Singh & Mithoon', cover_url: 'https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg', release_date: '2013-04-26', type: 'album', total_tracks: 11, language: 'Hindi' },
  { id: 'alb-5', title: 'Bajirao Mastani', artist_id: 'art-6', artist_name: 'Sanjay Leela Bhansali & Shreya Ghoshal', cover_url: 'https://c.saavncdn.com/808/Bajirao-Mastani-Hindi-2025-20260120201154-500x500.webp', release_date: '2015-12-18', type: 'album', total_tracks: 10, language: 'Hindi' },
  { id: 'alb-6', title: 'Yeh Jawaani Hai Deewani', artist_id: 'art-8', artist_name: 'Pritam', cover_url: 'https://c.saavncdn.com/440/Yeh-Jawaani-Hai-Deewani-2013-500x500.jpg', release_date: '2013-05-31', type: 'album', total_tracks: 10, language: 'Hindi' },
  { id: 'alb-7', title: 'Tamasha', artist_id: 'art-1', artist_name: 'A.R. Rahman & Arijit Singh', cover_url: 'https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg', release_date: '2015-11-27', type: 'album', total_tracks: 9, language: 'Hindi' },
  { id: 'alb-8', title: 'After Hours', artist_id: 'art-7', artist_name: 'The Weeknd', cover_url: 'https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.webp', release_date: '2020-03-20', type: 'album', total_tracks: 14, language: 'English' },
];

export const SONGS: Song[] = [
  // 1. Kesariya (Full 268s)
  {
    id: 's-1',
    title: 'Kesariya',
    artist_id: 'art-1',
    artist_name: 'Pritam, Arijit Singh, Amitabh Bhattacharya',
    album_id: 'alb-1',
    album_title: 'Brahmastra',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 268,
    audio_url: 'https://aac.saavncdn.com/871/c2febd353f3a076a406fa37510f31f9f_160.mp4',
    cover_url: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp',
    lyrics: `Mujhko itna bataye koi\nKaise tujhse dil na lagaye koi\nRabba ne tujhko banane mein\nKardi hai husn ki khaali tijoriyan\n\nKajal ki siyahi se likhi\nHai tune jaane kitno ki love storiyan\nKesariya tera ishq hai piya\nRang jaaun jo main haath lagaun\nDin beete saara teri fikr mein\nRain saari teri khair manaun`,
    plays_count: 245000000,
    likes_count: 298000,
    is_explicit: false,
  },
  // 2. 295 (Full 270s)
  {
    id: 's-2',
    title: '295',
    artist_id: 'art-2',
    artist_name: 'Sidhu Moose Wala',
    album_id: 'alb-2',
    album_title: 'Moosetape',
    genre_id: 'g-3',
    genre_name: 'Punjabi Desi Heat',
    language: 'Punjabi',
    duration_seconds: 270,
    audio_url: 'https://aac.saavncdn.com/609/852628435c98083dfe217c1cfa731bb5_160.mp4',
    cover_url: 'https://c.saavncdn.com/609/Moosetape-Punjabi-2021-20260626155141-500x500.webp',
    lyrics: `Dass kehra ethe bhala chahunda tera\nHar koi ethe vekhe faida apna\n\nKade judde kade toote vishwaas tera\nKitte 295 je kare koi baat\nAjj kal loki sab matlabi ne yaara\nSidhu Moose Wala sada dil te raaj kare`,
    plays_count: 310000000,
    likes_count: 512000,
    is_explicit: false,
  },
  // 3. Tum Hi Ho (Full 262s)
  {
    id: 's-3',
    title: 'Tum Hi Ho',
    artist_id: 'art-1',
    artist_name: 'Mithoon, Arijit Singh',
    album_id: 'alb-4',
    album_title: 'Aashiqui 2',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 262,
    audio_url: 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_160.mp4',
    cover_url: 'https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg',
    lyrics: `Hum tere bin ab reh nahi sakte\nTere bina kya wajood mera\nTujhse juda gar ho jaayenge\nToh khud se hi ho jaayenge judaa\n\nKyunki tum hi ho, ab tum hi ho\nZindagi ab tum hi ho\nChain bhi, mera dard bhi\nMeri aashiqui ab tum hi ho`,
    plays_count: 380000000,
    likes_count: 420000,
    is_explicit: false,
  },
  // 4. Lover (Full 190s)
  {
    id: 's-4',
    title: 'Lover',
    artist_id: 'art-3',
    artist_name: 'Diljit Dosanjh, Intense, Raj Ranjodh',
    album_id: 'alb-3',
    album_title: 'MoonChild Era',
    genre_id: 'g-3',
    genre_name: 'Punjabi Desi Heat',
    language: 'Punjabi',
    duration_seconds: 190,
    audio_url: 'https://aac.saavncdn.com/209/88cd9a1cc0af8768d67272876bb09851_160.mp4',
    cover_url: 'https://c.saavncdn.com/209/MoonChild-Era-Punjabi-2021-20240715073449-500x500.webp',
    lyrics: `Tera ni tera lover, lover, lover ni\nJind jaan vi tere utto varan ni\nTainu karda main pyaar behisaab\nDiljit Dosanjh beats rollin'`,
    plays_count: 195000000,
    likes_count: 275000,
    is_explicit: false,
  },
  // 5. Excuses (Full 177s)
  {
    id: 's-5',
    title: 'Excuses',
    artist_id: 'art-9',
    artist_name: 'AP Dhillon, Gurinder Gill, Intense',
    genre_id: 'g-3',
    genre_name: 'Punjabi Desi Heat',
    language: 'Punjabi',
    duration_seconds: 177,
    audio_url: 'https://aac.saavncdn.com/890/a18aabc4681dc6c334d5d29b67e84a0f_160.mp4',
    cover_url: 'https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.webp',
    lyrics: `Kehndi hundi si chan tak raah bana de\nTaare ne pasand mainu hethan saare laade\nOhna taareyan de vich jad mainu vekhegi\nYaad karu tenu taan chete aawanga`,
    plays_count: 230000000,
    likes_count: 380000,
    is_explicit: false,
  },
  // 6. Deewani Mastani (Full 339s)
  {
    id: 's-6',
    title: 'Deewani Mastani',
    artist_id: 'art-6',
    artist_name: 'Shreya Ghoshal, Sanjay Leela Bhansali',
    album_id: 'alb-5',
    album_title: 'Bajirao Mastani',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 339,
    audio_url: 'https://aac.saavncdn.com/808/08d91b5009b5e221ea5838d2acb4b690_160.mp4',
    cover_url: 'https://c.saavncdn.com/808/Bajirao-Mastani-Hindi-2025-20260120201154-500x500.webp',
    lyrics: `Nazar jo teri laagi main deewani ho gayi\nDeewani haan deewani ho gayi\nMashoor mere ishq ki kahani ho gayi\nDeewani haan deewani ho gayi`,
    plays_count: 175000000,
    likes_count: 240000,
    is_explicit: false,
  },
  // 7. Agar Tum Saath Ho (Full 341s)
  {
    id: 's-7',
    title: 'Agar Tum Saath Ho',
    artist_id: 'art-1',
    artist_name: 'Alka Yagnik, Arijit Singh',
    album_id: 'alb-7',
    album_title: 'Tamasha',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 341,
    audio_url: 'https://aac.saavncdn.com/994/2e6b47719cea3e7c9f971a3f1ddc9b0a_160.mp4',
    cover_url: 'https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg',
    lyrics: `Pal bhar thehar jaao, dil ye sambhal jaaye\nKaise tumhe roka karun\nMeri taraf aata har gham phisal jaaye\nAgar tum saath ho\n\nDil ye sambhal jaaye\nAgar tum saath ho`,
    plays_count: 360000000,
    likes_count: 480000,
    is_explicit: false,
  },
  // 8. Cruel Summer (Full 178s)
  {
    id: 's-8',
    title: 'Cruel Summer',
    artist_id: 'art-5',
    artist_name: 'Taylor Swift, Jack Antonoff, St. Vincent',
    genre_id: 'g-5',
    genre_name: 'Global Pop & Synth',
    language: 'English',
    duration_seconds: 178,
    audio_url: 'https://aac.saavncdn.com/243/cf6b522de1390996fdbe109298873c72_160.mp4',
    cover_url: 'https://c.saavncdn.com/243/The-Cruelest-Summer-English-2023-20231109123211-500x500.webp',
    lyrics: `Fever dream high in the quiet of the night\nYou know that I caught it\nBad, bad boy, shiny toy with a price\nYou know that I bought it\nAnd it's new, the shape of your body\nIt's blue, the feeling I've got\nAnd it's ooh, whoa, oh\nIt's a cruel summer`,
    plays_count: 420000000,
    likes_count: 610000,
    is_explicit: false,
  },
  // 9. Afreen Afreen (Full 265s)
  {
    id: 's-9',
    title: 'Afreen Afreen (Coke Studio)',
    artist_id: 'art-4',
    artist_name: 'Rahat Fateh Ali Khan & Momina Mustehsan',
    genre_id: 'g-2',
    genre_name: 'Coke Studio & Sufi',
    language: 'Urdu',
    duration_seconds: 265,
    audio_url: 'https://aac.saavncdn.com/728/be3245a8b4bdcfca3c2c9ce62e81a8f7_160.mp4',
    cover_url: 'https://c.saavncdn.com/728/Afreen-Afreen-Urdu-2022-20220802031813-500x500.webp',
    lyrics: `Husn-e-jaana ki tareef mumkin nahi\nAfreen afreen, afreen afreen\nTu bhi dekhe agar toh kahe hamsheen\nAfreen afreen, afreen afreen\n\nAisa dekha nahi khoobsurat koi\nJism jaise ajanta ki murat koi\nJism jaise nigahon pe jaadu koi\nJism naghma koi, jism khushbu koi`,
    plays_count: 280000000,
    likes_count: 360000,
    is_explicit: false,
  },
  // 10. Tajdar-E-Haram (Full 291s)
  {
    id: 's-10',
    title: 'Tajdar-E-Haram',
    artist_id: 'art-4',
    artist_name: 'Atif Aslam, Shiraz Uppal',
    genre_id: 'g-2',
    genre_name: 'Coke Studio & Sufi',
    language: 'Urdu',
    duration_seconds: 291,
    audio_url: 'https://aac.saavncdn.com/333/0d7a19ed14693db414d2014668045226_160.mp4',
    cover_url: 'https://c.saavncdn.com/333/Satyameva-Jayate-Hindi-2018-20180801-500x500.jpg',
    lyrics: `Kismat mein meri chain se jeena likh de\nDoobe na kabhi mera safeena likh de\nJannat bhi gawaara hai magar mere khuda\nPehle toh madine ka safeena likh de\n\nTajdar-e-haram, ho nigaah-e-karam`,
    plays_count: 220000000,
    likes_count: 310000,
    is_explicit: false,
  },
  // 11. Kabira (Full 224s)
  {
    id: 's-11',
    title: 'Kabira',
    artist_id: 'art-8',
    artist_name: 'Pritam, Tochi Raina, Rekha Bhardwaj',
    album_id: 'alb-6',
    album_title: 'Yeh Jawaani Hai Deewani',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 224,
    audio_url: 'https://aac.saavncdn.com/440/664097ba2ddb94e9a8c9e9527b3010ec_160.mp4',
    cover_url: 'https://c.saavncdn.com/440/Yeh-Jawaani-Hai-Deewani-2013-500x500.jpg',
    lyrics: `Kaisi teri khudgarzi\nNa dhoop chune na chhaanv\nKaisi teri khudgarzi\nKisi thaur tike na paanv\n\nRe Kabira maan jaa\nRe Faqeera maan jaa`,
    plays_count: 260000000,
    likes_count: 290000,
    is_explicit: false,
  },
  // 12. Pee Loon (Full 285s)
  {
    id: 's-12',
    title: 'Pee Loon',
    artist_id: 'art-8',
    artist_name: 'Mohit Chauhan, Pritam',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 285,
    audio_url: 'https://aac.saavncdn.com/106/c7c9cdfc2ea4dcd3388fe15e3eae06c2_160.mp4',
    cover_url: 'https://c.saavncdn.com/106/Emraan-Hashmi-Hits-Hindi-2026-20260905191028-500x500.webp',
    lyrics: `Pee loon tere neele neele naino se shabnam\nPee loon tere geele geele hothon ki sargam\nPee loon hai peene ka mausam\n\nTere sang ishq taari hai\nTere sang ik khumaari hai`,
    plays_count: 190000000,
    likes_count: 215000,
    is_explicit: false,
  },
  // 13. Zara Sa (Full 302s)
  {
    id: 's-13',
    title: 'Zara Sa',
    artist_id: 'art-10',
    artist_name: 'KK (Krishnakumar Kunnath), Pritam',
    genre_id: 'g-1',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 302,
    audio_url: 'https://aac.saavncdn.com/801/571617f7810fb699ed56bc8a7d9e40d9_160.mp4',
    cover_url: 'https://c.saavncdn.com/801/Jannat-Hindi-2008-20190629135803-500x500.webp',
    lyrics: `Zara sa jhoom loon main\nZara sa dil mein de jagah tu\nZara sa apna le bana\nZara sa khwaabon mein saja tu`,
    plays_count: 210000000,
    likes_count: 280000,
    is_explicit: false,
  },
  // 14. Blinding Lights (Full 204s)
  {
    id: 's-14',
    title: 'Blinding Lights',
    artist_id: 'art-7',
    artist_name: 'The Weeknd, Max Martin, Oscar Holter',
    album_id: 'alb-8',
    album_title: 'After Hours',
    genre_id: 'g-5',
    genre_name: 'Global Pop & Synth',
    language: 'English',
    duration_seconds: 204,
    audio_url: 'https://aac.saavncdn.com/820/5ddb9a79a5218f85ca9bef170f3a461d_160.mp4',
    cover_url: 'https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.webp',
    lyrics: `Yeah, I've been tryna call\nI've been on my own for long enough\nMaybe you can show me how to love, maybe\nI said, ooh, I'm blinded by the lights\nNo, I can't sleep until I feel your touch`,
    plays_count: 520000000,
    likes_count: 790000,
    is_explicit: false,
  },
  // 15. Aguner Poroshmoni (Full 210s)
  {
    id: 's-15',
    title: 'Aguner Poroshmoni',
    artist_id: 'art-1',
    artist_name: 'Rabindranath Tagore • Srikanto Acharya',
    genre_id: 'g-4',
    genre_name: 'Bengali Classics',
    language: 'Bengali',
    duration_seconds: 210,
    audio_url: 'https://aac.saavncdn.com/358/a1e645607ba919864228c25368f5a545_160.mp4',
    cover_url: 'https://c.saavncdn.com/358/Aguner-Poroshmoni-Bengali-2021-20211006110024-500x500.webp',
    lyrics: `Aguner poroshmoni chhowao praane\nE jibon punyo koro dohon-daane\nAmar e deho-khani tule dhoro\nTumar oi debaloyer prodip koro`,
    plays_count: 65000000,
    likes_count: 98000,
    is_explicit: false,
  },
];
