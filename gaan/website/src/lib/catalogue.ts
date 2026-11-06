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
  header_url?: string;
  verified: boolean;
  monthly_listeners: number;
  language: string;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  artist_name?: string;
  cover_url: string;
  release_date: string;
  type: 'album' | 'single' | 'ep';
  total_tracks: number;
  language: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  accent_color: string;
  language?: string;
}

export const GENRES: Genre[] = [
  {
    id: 'g-hindi',
    name: 'Bollywood Romance',
    slug: 'bollywood',
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    accent_color: '#EC4899',
    language: 'Hindi',
  },
  {
    id: 'g-urdu',
    name: 'Coke Studio & Sufi',
    slug: 'urdu-sufi',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    accent_color: '#8B5CF6',
    language: 'Urdu',
  },
  {
    id: 'g-punjabi',
    name: 'Punjabi Hits',
    slug: 'punjabi',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    accent_color: '#F59E0B',
    language: 'Punjabi',
  },
  {
    id: 'g-bengali',
    name: 'Bengali Melody',
    slug: 'bengali',
    image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
    accent_color: '#10B981',
    language: 'Bengali',
  },
  {
    id: 'g-pop',
    name: 'Hollywood & Global Pop',
    slug: 'english-pop',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    accent_color: '#3B82F6',
    language: 'English',
  },
  {
    id: 'g-lofi',
    name: 'Late Night Chill & Lo-Fi',
    slug: 'lo-fi',
    image_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    accent_color: '#A855F7',
    language: 'All',
  },
];

export const ARTISTS: Artist[] = [
  {
    id: 'art-arijit',
    name: 'Arijit Singh',
    bio: 'The undisputed voice of modern Bollywood melodies and romantic anthems with over 100M monthly listeners.',
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 42800000,
    language: 'Hindi',
  },
  {
    id: 'art-atif',
    name: 'Atif Aslam',
    bio: 'Pakistani global vocal icon revered for heartfelt Sufi and romantic blockbuster tracks.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 26400000,
    language: 'Urdu',
  },
  {
    id: 'art-rahat',
    name: 'Rahat Fateh Ali Khan & Momina',
    bio: 'Coke Studio legends bringing qawwali heritage to modern viral acoustic music.',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 18900000,
    language: 'Urdu',
  },
  {
    id: 'art-diljit',
    name: 'Diljit Dosanjh',
    bio: 'Punjabi music powerhouse and global Coachella headliner pioneering Punjabi Pop worldwide.',
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    header_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    monthly_listeners: 21500000,
    language: 'Punjabi',
  },
  {
    id: 'art-hemanta',
    name: 'Hemanta Mukherjee',
    bio: 'Legendary Indian singer and composer renowned for evergreen Bengali and Rabindra Sangeet masterpieces.',
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    verified: true,
    monthly_listeners: 4300000,
    language: 'Bengali',
  },
  {
    id: 'art-kk',
    name: 'KK (Krishnakumar Kunnath)',
    bio: 'Iconic Indian playback singer celebrated for unforgettable 2000s Bollywood rock and love songs.',
    image_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    verified: true,
    monthly_listeners: 19800000,
    language: 'Hindi',
  },
];

export const ALBUMS: Album[] = [
  {
    id: 'alb-aashiqui',
    title: 'Aashiqui 2 Soundtrack',
    artist_id: 'art-arijit',
    artist_name: 'Arijit Singh',
    cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    release_date: '2013-04-08',
    type: 'album',
    total_tracks: 4,
    language: 'Hindi',
  },
  {
    id: 'alb-cokestudio',
    title: 'Coke Studio Season 9 Specials',
    artist_id: 'art-rahat',
    artist_name: 'Rahat Fateh Ali Khan & Momina',
    cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    release_date: '2016-08-19',
    type: 'album',
    total_tracks: 3,
    language: 'Urdu',
  },
  {
    id: 'alb-punjabipop',
    title: 'Punjabi Desi Vibrations',
    artist_id: 'art-diljit',
    artist_name: 'Diljit Dosanjh & Sona',
    cover_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    release_date: '2023-01-15',
    type: 'album',
    total_tracks: 3,
    language: 'Punjabi',
  },
  {
    id: 'alb-bengali',
    title: 'Sonar Bangla Classics',
    artist_id: 'art-hemanta',
    artist_name: 'Hemanta Mukherjee',
    cover_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
    release_date: '2021-05-09',
    type: 'album',
    total_tracks: 2,
    language: 'Bengali',
  },
];

export const SONGS: Song[] = [
  // 1. HINDI / BOLLYWOOD
  {
    id: 'song-tum-hi-ho',
    title: 'Tum Hi Ho',
    artist_id: 'art-arijit',
    artist_name: 'Arijit Singh',
    album_id: 'alb-aashiqui',
    album_title: 'Aashiqui 2 Soundtrack',
    genre_id: 'g-hindi',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 262,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Tum%20Hi%20Ho%20(From%20_Aashiqui%202).mp3',
    cover_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    lyrics: `Hum tere bin ab reh nahi sakte
Tere bina kya wajood mera
Tujhse juda agar ho jaayenge
Toh khud se hi ho jaayenge judaa

Kyunki tum hi ho, ab tum hi ho
Zindagi ab tum hi ho
Chain bhi, mera dard bhi
Meri aashiqui ab tum hi ho

Tera mera rishta hai kaisa
Ik pal door gawaara nahi
Tere liye har roz hai jeete
Tujhko diya mera waqt sabhi`,
    plays_count: 8520000,
    likes_count: 940000,
    is_explicit: false,
  },
  {
    id: 'song-agar-tum-saath-ho',
    title: 'Agar Tum Saath Ho',
    artist_id: 'art-arijit',
    artist_name: 'Arijit Singh & Alka Yagnik',
    album_id: 'alb-aashiqui',
    album_title: 'Tamasha',
    genre_id: 'g-hindi',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 341,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Agar%20Tum%20Saath%20Ho%20(From%20_Tamasha_).mp3',
    cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    lyrics: `Pal bhar thehar jaao, dil ye sambhal jaaye
Kaise tumhe roka karun
Meri taraf aata har gham phisal jaaye
Aankhon mein tum ko bharun

Bin bole baatein tumse karun
Agar tum saath ho
Dil ye sambhal jaaye
Agar tum saath ho`,
    plays_count: 9140000,
    likes_count: 1020000,
    is_explicit: false,
  },
  {
    id: 'song-kabira',
    title: 'Kabira',
    artist_id: 'art-arijit',
    artist_name: 'Arijit Singh & Tochi Raina',
    album_id: 'alb-aashiqui',
    album_title: 'Yeh Jawaani Hai Deewani',
    genre_id: 'g-hindi',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 223,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Kabira.mp3',
    cover_url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    lyrics: `Kaisi teri khudgarzi
Na dhoop chune na chhaanv
Kaisi teri khudgarzi
Kisi thor tike na paanv

Ban liya apna paighambar
Tar liya tu saat samandar
Phir bhi sookha mann ke andar
Kyun reh gaya

Re Kabira maan jaa
Re Faqeera yun na jaa
Aaja tujhko pukaare teri parchhaaiyan`,
    plays_count: 7300000,
    likes_count: 810000,
    is_explicit: false,
  },
  {
    id: 'song-pee-loon',
    title: 'Pee Loon',
    artist_id: 'art-kk',
    artist_name: 'Mohit Chauhan',
    album_id: 'alb-aashiqui',
    album_title: 'Once Upon A Time In Mumbaai',
    genre_id: 'g-hindi',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 285,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Pee%20Loon.mp3',
    cover_url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    lyrics: `Pee loon tere neele neele naino se shabnam
Pee loon tere geele geele hothon ki sargam
Pee loon hai peene ka mausam

Tere sang ishq taari hai
Tere sang ik khumaari hai
Tere sang chain bhi mujhko
Tere sang bekaraari hai`,
    plays_count: 5900000,
    likes_count: 670000,
    is_explicit: false,
  },
  {
    id: 'song-zara-sa',
    title: 'Zara Sa',
    artist_id: 'art-kk',
    artist_name: 'KK (Krishnakumar Kunnath)',
    album_id: 'alb-aashiqui',
    album_title: 'Jannat',
    genre_id: 'g-hindi',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 303,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Zara%20Sa.mp3',
    cover_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    lyrics: `Zara sa jhoom loon main
Arre na re na re na
Zara sa dil mein de jagah tu
Zara sa apna le bana

Keh bhi de keh bhi de dil mein tere jo hai chhipa
Khamakha kyu faasla
Zara sa dil mein de jagah tu
Zara sa apna le bana`,
    plays_count: 6420000,
    likes_count: 730000,
    is_explicit: false,
  },
  {
    id: 'song-jeena-jeena',
    title: 'Jeena Jeena',
    artist_id: 'art-atif',
    artist_name: 'Atif Aslam',
    album_id: 'alb-aashiqui',
    album_title: 'Badlapur',
    genre_id: 'g-hindi',
    genre_name: 'Bollywood Romance',
    language: 'Hindi',
    duration_seconds: 229,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Jeena%20Jeena%20(From%20_Badlapur_).mp3',
    cover_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    lyrics: `Dehleez pe mere dil ki
Jo rakhe hain tune kadam
Tere naam pe meri zindagi
Likh di mere humdum

Haan seekha maine jeena jeena kaise jeena
Haan seekha maine jeena mere humdum
Na seekha kabhi jeena jeena kaise jeena
Na seekha jeena tere bina humdum`,
    plays_count: 6100000,
    likes_count: 780000,
    is_explicit: false,
  },

  // 2. URDU / COKE STUDIO
  {
    id: 'song-afreen-afreen',
    title: 'Afreen Afreen',
    artist_id: 'art-rahat',
    artist_name: 'Rahat Fateh Ali Khan & Momina Mustehsan',
    album_id: 'alb-cokestudio',
    album_title: 'Coke Studio Season 9',
    genre_id: 'g-urdu',
    genre_name: 'Coke Studio & Sufi',
    language: 'Urdu',
    duration_seconds: 400,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Afreen%20Afreen%20(Coke%20Studio%20Season%209).mp3',
    cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    lyrics: `Aisa dekha nahi khoobsurat koi
Jism jaise ajanta ki murat koi
Jism jaise nigaahon pe jaadu koi
Jism naghma koi jism khushbu koi

Husn-e-jaana ki tareef mumkin nahi
Afreen afreen, afreen afreen
Tu bhi dekhe agar to kahe hum-nasheen
Afreen afreen, afreen afreen`,
    plays_count: 14200000,
    likes_count: 1850000,
    is_explicit: false,
  },
  {
    id: 'song-tajdar-e-haram',
    title: 'Tajdar-e-Haram',
    artist_id: 'art-atif',
    artist_name: 'Atif Aslam',
    album_id: 'alb-cokestudio',
    album_title: 'Coke Studio Season 8',
    genre_id: 'g-urdu',
    genre_name: 'Coke Studio & Sufi',
    language: 'Urdu',
    duration_seconds: 615,
    audio_url: 'https://archive.org/download/AtifAslamTajdarEHaramCokeStudioSeason8Episode1_201806/Atif%20Aslam%20Tajdar-e-Haram%20Coke%20Studio%20Season%208%20Episode%201.mp3',
    cover_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    lyrics: `Kismat mein meri chain se jeena likh de
Doobe na kabhi mera safeena likh de
Jannat bhi gawaara hai magar mere liye
Ae kaatib-e-taqdeer madina likh de

Tajdar-e-haram, ho nigaah-e-karam
Hum ghareebon ke sar par bhi chaaon rahe
Tajdar-e-haram, ho nigaah-e-karam`,
    plays_count: 18900000,
    likes_count: 2300000,
    is_explicit: false,
  },

  // 3. PUNJABI HITS
  {
    id: 'song-enna-sona',
    title: 'Enna Sona',
    artist_id: 'art-arijit',
    artist_name: 'Arijit Singh & A.R. Rahman',
    album_id: 'alb-punjabipop',
    album_title: 'OK Jaanu',
    genre_id: 'g-punjabi',
    genre_name: 'Punjabi Hits',
    language: 'Punjabi',
    duration_seconds: 213,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Enna%20Sona.mp3',
    cover_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    lyrics: `Enna sona kyun Rabb ne banaya
Aavan jaavan te main yaara nu manavan
Enna sona kyun Rabb ne banaya

Kol hove te sekh lagda ae
Door jaave te dil jalda ae
Kedi agg naal Rabb ne banaya
Rabb ne banaya, Rabb ne banaya`,
    plays_count: 7800000,
    likes_count: 890000,
    is_explicit: false,
  },
  {
    id: 'song-ambarsariya',
    title: 'Ambarsariya',
    artist_id: 'art-diljit',
    artist_name: 'Sona Mohapatra',
    album_id: 'alb-punjabipop',
    album_title: 'Fukrey',
    genre_id: 'g-punjabi',
    genre_name: 'Punjabi Hits',
    language: 'Punjabi',
    duration_seconds: 248,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Ambarsariya.mp3',
    cover_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    lyrics: `Ambarsariya mundeya ve kacchiyaan kaliyaan na tod
Teri ma ne boleya mujhe teekha teekha bol
Ambarsariya mundeya ve kacchiyaan kaliyaan na tod

Gori gori baahon mein har dam
Chudiyaan khankaati hoon
Tere peeche peeche main
Duniya bhulaati hoon`,
    plays_count: 5120000,
    likes_count: 590000,
    is_explicit: false,
  },
  {
    id: 'song-soch-na-sake',
    title: 'Soch Na Sake',
    artist_id: 'art-arijit',
    artist_name: 'Arijit Singh & Tulsi Kumar',
    album_id: 'alb-punjabipop',
    album_title: 'Airlift',
    genre_id: 'g-punjabi',
    genre_name: 'Punjabi Hits',
    language: 'Punjabi',
    duration_seconds: 281,
    audio_url: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Soch%20Na%20Sake%20(From%20_Airlift).mp3',
    cover_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    lyrics: `Tenu itna main pyaar karaan
Ek pal vich sau baar karaan
Tu jaave je mainu chhad ke
Maut da intezaar karaan

Ke tere liye duniya chhod di hai
Tujhpe hi saans aake rukey
Main tujhko kitna chahta hoon
Ye tu kabhi soch na sake`,
    plays_count: 8900000,
    likes_count: 980000,
    is_explicit: false,
  },

  // 4. BENGALI CLASSICS
  {
    id: 'song-aguner-poroshmoni',
    title: 'Aguner Poroshmoni',
    artist_id: 'art-hemanta',
    artist_name: 'Rabindranath Tagore & Classical Ensemble',
    album_id: 'alb-bengali',
    album_title: 'Sonar Bangla Classics',
    genre_id: 'g-bengali',
    genre_name: 'Bengali Melody',
    language: 'Bengali',
    duration_seconds: 245,
    audio_url: 'https://archive.org/download/ClassicSongVolume1/Aguner%20Poroshmoni.mp3',
    cover_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
    lyrics: `Aguner poroshmoni chhowao praane
E jibon punyo koro dahon-daane
Aguner poroshmoni chhowao praane

Aamar e deho-khani tule dhoro
Tomar oi debaloyer prodip koro
Nishi-din alok-shikha joluk gaane
Aguner poroshmoni chhowao praane`,
    plays_count: 2450000,
    likes_count: 310000,
    is_explicit: false,
  },
  {
    id: 'song-aamar-e-poth',
    title: 'Aamar E Poth Tomar Pather',
    artist_id: 'art-hemanta',
    artist_name: 'Hemanta Mukherjee',
    album_id: 'alb-bengali',
    album_title: 'Sonar Bangla Classics',
    genre_id: 'g-bengali',
    genre_name: 'Bengali Melody',
    language: 'Bengali',
    duration_seconds: 215,
    audio_url: 'https://archive.org/download/ClassicSongVolume1/Aamar%20E%20Poth%20Tomar%20Pather.mp3',
    cover_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    lyrics: `Aamar e poth tomar pather theke
Onek dure gechhe beke
Aamar e ghor aakashe megher moton
Ghire achhe tomay eke eke

Tomar jani chiro-chhena shure
Kono gaan aami baje na bajiye
Aamar e buke sudhu tomar smriti
Robi-chander aaloy saajiye`,
    plays_count: 1820000,
    likes_count: 240000,
    is_explicit: false,
  },

  // 5. ENGLISH / HOLLYWOOD & GLOBAL SYNTH
  {
    id: 'song-cybernetic-skyline',
    title: 'Cybernetic Skyline (After Hours)',
    artist_id: 'art-arijit',
    artist_name: 'The Weeknd Vibe (Global Synth)',
    album_id: 'alb-aashiqui',
    album_title: 'Midnight Odyssey',
    genre_id: 'g-pop',
    genre_name: 'Hollywood & Global Pop',
    language: 'English',
    duration_seconds: 372,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    lyrics: `Cruising through the neon haze
Electric shadows in purple glaze
Speeding through the grid tonight
Guided by the violet light

I can't feel my heartbeat fading
In the dark the bass is breaking
GAAN plays the pulse of tomorrow
Transcending digital sorrow`,
    plays_count: 6700000,
    likes_count: 820000,
    is_explicit: false,
  },
  {
    id: 'song-neon-highway',
    title: 'Neon Highway 86 (Synth Retro)',
    artist_id: 'art-arijit',
    artist_name: 'Dua Lipa & Retro Pop',
    album_id: 'alb-aashiqui',
    album_title: 'Midnight Odyssey',
    genre_id: 'g-pop',
    genre_name: 'Hollywood & Global Pop',
    language: 'English',
    duration_seconds: 423,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    lyrics: `Midnight highway stretches on
Chasing the horizon until the dawn
Synthetic resonance fills the air
Drifting freely without a care`,
    plays_count: 4500000,
    likes_count: 520000,
    is_explicit: false,
  },
];
