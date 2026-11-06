import '../models/song.dart';

class SampleCatalogue {
  static const List<Genre> genres = [
    Genre(
      id: 'g-hindi',
      name: 'Bollywood Romance',
      slug: 'bollywood',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFFEC4899,
    ),
    Genre(
      id: 'g-urdu',
      name: 'Coke Studio & Sufi',
      slug: 'urdu-sufi',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFF8B5CF6,
    ),
    Genre(
      id: 'g-punjabi',
      name: 'Punjabi Hits',
      slug: 'punjabi',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFFF59E0B,
    ),
    Genre(
      id: 'g-bengali',
      name: 'Bengali Melody',
      slug: 'bengali',
      imageUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFF10B981,
    ),
    Genre(
      id: 'g-pop',
      name: 'Hollywood & Global Pop',
      slug: 'english-pop',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      colorValue: 0xFF3B82F6,
    ),
  ];

  static const List<Artist> artists = [
    Artist(
      id: 'art-arijit',
      name: 'Arijit Singh',
      bio: 'The undisputed voice of modern Bollywood melodies and romantic anthems.',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 42800000,
    ),
    Artist(
      id: 'art-atif',
      name: 'Atif Aslam',
      bio: 'Pakistani global vocal icon revered for heartfelt Sufi and romantic hits.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 26400000,
    ),
    Artist(
      id: 'art-rahat',
      name: 'Rahat Fateh Ali Khan & Momina',
      bio: 'Coke Studio legends bringing qawwali heritage to modern viral acoustic music.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 18900000,
    ),
    Artist(
      id: 'art-diljit',
      name: 'Diljit Dosanjh',
      bio: 'Punjabi music powerhouse and global Coachella headliner.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      headerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      verified: true,
      monthlyListeners: 21500000,
    ),
  ];

  static const List<Album> albums = [
    Album(
      id: 'alb-aashiqui',
      title: 'Aashiqui 2 Soundtrack',
      artistId: 'art-arijit',
      artistName: 'Arijit Singh',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      releaseDate: '2013-04-08',
      type: 'album',
      totalTracks: 4,
    ),
    Album(
      id: 'alb-cokestudio',
      title: 'Coke Studio Season 9 Specials',
      artistId: 'art-rahat',
      artistName: 'Rahat Fateh Ali Khan & Momina',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      releaseDate: '2016-08-19',
      type: 'album',
      totalTracks: 3,
    ),
    Album(
      id: 'alb-punjabipop',
      title: 'Punjabi Desi Vibrations',
      artistId: 'art-diljit',
      artistName: 'Diljit Dosanjh & Sona',
      coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      releaseDate: '2023-01-15',
      type: 'album',
      totalTracks: 3,
    ),
  ];

  static const List<Song> songs = [
    // 1. Hindi Bollywood
    Song(
      id: 'song-tum-hi-ho',
      title: 'Tum Hi Ho',
      artistId: 'art-arijit',
      artistName: 'Arijit Singh',
      albumId: 'alb-aashiqui',
      albumTitle: 'Aashiqui 2',
      genreId: 'g-hindi',
      genreName: 'Bollywood Romance',
      durationSeconds: 262,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Tum%20Hi%20Ho%20(From%20_Aashiqui%202).mp3',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Hum tere bin ab reh nahi sakte
Tere bina kya wajood mera
Tujhse juda agar ho jaayenge
Toh khud se hi ho jaayenge judaa

Kyunki tum hi ho, ab tum hi ho
Zindagi ab tum hi ho
Chain bhi, mera dard bhi
Meri aashiqui ab tum hi ho''',
      playsCount: 8520000,
      likesCount: 940000,
    ),
    Song(
      id: 'song-agar-tum-saath-ho',
      title: 'Agar Tum Saath Ho',
      artistId: 'art-arijit',
      artistName: 'Arijit Singh & Alka Yagnik',
      albumId: 'alb-aashiqui',
      albumTitle: 'Tamasha',
      genreId: 'g-hindi',
      genreName: 'Bollywood Romance',
      durationSeconds: 341,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Agar%20Tum%20Saath%20Ho%20(From%20_Tamasha_).mp3',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Pal bhar thehar jaao, dil ye sambhal jaaye
Kaise tumhe roka karun
Meri taraf aata har gham phisal jaaye
Aankhon mein tum ko bharun''',
      playsCount: 9140000,
      likesCount: 1020000,
    ),
    Song(
      id: 'song-kabira',
      title: 'Kabira',
      artistId: 'art-arijit',
      artistName: 'Arijit Singh & Tochi Raina',
      albumId: 'alb-aashiqui',
      albumTitle: 'Yeh Jawaani Hai Deewani',
      genreId: 'g-hindi',
      genreName: 'Bollywood Romance',
      durationSeconds: 223,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Kabira.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Kaisi teri khudgarzi
Na dhoop chune na chhaanv
Ban liya apna paighambar
Tar liya tu saat samandar
Re Kabira maan jaa''',
      playsCount: 7300000,
      likesCount: 810000,
    ),
    Song(
      id: 'song-pee-loon',
      title: 'Pee Loon',
      artistId: 'art-arijit',
      artistName: 'Mohit Chauhan',
      albumId: 'alb-aashiqui',
      albumTitle: 'Once Upon A Time In Mumbaai',
      genreId: 'g-hindi',
      genreName: 'Bollywood Romance',
      durationSeconds: 285,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Pee%20Loon.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Pee loon tere neele neele naino se shabnam
Pee loon tere geele geele hothon ki sargam
Pee loon hai peene ka mausam''',
      playsCount: 5900000,
      likesCount: 670000,
    ),
    Song(
      id: 'song-zara-sa',
      title: 'Zara Sa',
      artistId: 'art-arijit',
      artistName: 'KK (Krishnakumar Kunnath)',
      albumId: 'alb-aashiqui',
      albumTitle: 'Jannat',
      genreId: 'g-hindi',
      genreName: 'Bollywood Romance',
      durationSeconds: 303,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Zara%20Sa.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Zara sa jhoom loon main
Arre na re na re na
Zara sa dil mein de jagah tu
Zara sa apna le bana''',
      playsCount: 6420000,
      likesCount: 730000,
    ),

    // 2. Urdu Coke Studio
    Song(
      id: 'song-afreen-afreen',
      title: 'Afreen Afreen',
      artistId: 'art-rahat',
      artistName: 'Rahat Fateh Ali Khan & Momina',
      albumId: 'alb-cokestudio',
      albumTitle: 'Coke Studio Season 9',
      genreId: 'g-urdu',
      genreName: 'Coke Studio & Sufi',
      durationSeconds: 400,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Afreen%20Afreen%20(Coke%20Studio%20Season%209).mp3',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Husn-e-jaana ki tareef mumkin nahi
Afreen afreen, afreen afreen
Tu bhi dekhe agar to kahe hum-nasheen
Afreen afreen, afreen afreen''',
      playsCount: 14200000,
      likesCount: 1850000,
    ),
    Song(
      id: 'song-tajdar-e-haram',
      title: 'Tajdar-e-Haram',
      artistId: 'art-atif',
      artistName: 'Atif Aslam',
      albumId: 'alb-cokestudio',
      albumTitle: 'Coke Studio Season 8',
      genreId: 'g-urdu',
      genreName: 'Coke Studio & Sufi',
      durationSeconds: 615,
      audioUrl: 'https://archive.org/download/AtifAslamTajdarEHaramCokeStudioSeason8Episode1_201806/Atif%20Aslam%20Tajdar-e-Haram%20Coke%20Studio%20Season%208%20Episode%201.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Kismat mein meri chain se jeena likh de
Doobe na kabhi mera safeena likh de
Tajdar-e-haram, ho nigaah-e-karam''',
      playsCount: 18900000,
      likesCount: 2300000,
    ),

    // 3. Punjabi
    Song(
      id: 'song-enna-sona',
      title: 'Enna Sona',
      artistId: 'art-arijit',
      artistName: 'Arijit Singh & A.R. Rahman',
      albumId: 'alb-punjabipop',
      albumTitle: 'OK Jaanu',
      genreId: 'g-punjabi',
      genreName: 'Punjabi Hits',
      durationSeconds: 213,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Enna%20Sona.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Enna sona kyun Rabb ne banaya
Aavan jaavan te main yaara nu manavan
Kol hove te sekh lagda ae
Door jaave te dil jalda ae''',
      playsCount: 7800000,
      likesCount: 890000,
    ),
    Song(
      id: 'song-ambarsariya',
      title: 'Ambarsariya',
      artistId: 'art-diljit',
      artistName: 'Sona Mohapatra',
      albumId: 'alb-punjabipop',
      albumTitle: 'Fukrey',
      genreId: 'g-punjabi',
      genreName: 'Punjabi Hits',
      durationSeconds: 248,
      audioUrl: 'https://archive.org/download/afreen-afreen-coke-studio-season-9/Ambarsariya.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Ambarsariya mundeya ve kacchiyaan kaliyaan na tod
Teri ma ne boleya mujhe teekha teekha bol
Gori gori baahon mein har dam
Chudiyaan khankaati hoon''',
      playsCount: 5120000,
      likesCount: 590000,
    ),

    // 4. Bengali
    Song(
      id: 'song-aguner-poroshmoni',
      title: 'Aguner Poroshmoni',
      artistId: 'art-arijit',
      artistName: 'Rabindranath Tagore Classical',
      albumId: 'alb-punjabipop',
      albumTitle: 'Sonar Bangla',
      genreId: 'g-bengali',
      genreName: 'Bengali Melody',
      durationSeconds: 245,
      audioUrl: 'https://archive.org/download/ClassicSongVolume1/Aguner%20Poroshmoni.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Aguner poroshmoni chhowao praane
E jibon punyo koro dahon-daane
Aguner poroshmoni chhowao praane''',
      playsCount: 2450000,
      likesCount: 310000,
    ),

    // 5. English Pop
    Song(
      id: 'song-cybernetic-skyline',
      title: 'Cybernetic Skyline (After Hours)',
      artistId: 'art-arijit',
      artistName: 'The Weeknd Vibe (Global Synth)',
      albumId: 'alb-aashiqui',
      albumTitle: 'Midnight Odyssey',
      genreId: 'g-pop',
      genreName: 'Hollywood & Global Pop',
      durationSeconds: 372,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      lyrics: '''Cruising through the neon haze
Electric shadows in purple glaze
Speeding through the grid tonight
Guided by the violet light''',
      playsCount: 6700000,
      likesCount: 820000,
    ),
  ];
}
