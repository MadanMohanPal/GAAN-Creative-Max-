import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/sample_catalogue.dart';
import '../models/song.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import '../widgets/song_tile.dart';
import 'category_detail_screen.dart';

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({super.key});

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  String _activeTab = 'Downloads';
  final List<String> _tabs = ['Downloads', 'Playlists', 'Discover', 'Liked', 'All Songs', 'Albums'];

  final List<Map<String, dynamic>> _curatedPlaylists = [
    {
      'title': 'Punjabi Kings & Hip-Hop',
      'subtitle': 'Sidhu Moose Wala, Diljit, AP Dhillon • 12 Tracks',
      'imageUrl': 'https://c.saavncdn.com/609/Moosetape-Punjabi-2021-20260626155141-500x500.webp',
      'filter': 'punjabi',
      'color': GaanTheme.fuchsiaNeon,
    },
    {
      'title': 'Bollywood Romance & Sufi',
      'subtitle': 'Arijit Singh, Pritam & Mithoon • 10 Tracks',
      'imageUrl': 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp',
      'filter': 'bollywood',
      'color': GaanTheme.primaryPurple,
    },
    {
      'title': 'Coke Studio Legends',
      'subtitle': 'Atif Aslam, Rahat Fateh Ali Khan & Momina',
      'imageUrl': 'https://c.saavncdn.com/728/Afreen-Afreen-Urdu-2022-20220802031813-500x500.webp',
      'filter': 'coke',
      'color': Color(0xFFD946EF),
    },
    {
      'title': 'Midnight Neon Synthwave',
      'subtitle': 'The Weeknd, Taylor Swift & Global Hits',
      'imageUrl': 'https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.webp',
      'filter': 'synth',
      'color': Color(0xFFEC4899),
    },
  ];

  final List<Map<String, dynamic>> _userPlaylists = [];

  void _showCreatePlaylistDialog() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: GaanTheme.surfaceBlack,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: GaanTheme.primaryPurple),
        ),
        title: const Row(
          children: [
            Icon(Icons.playlist_add, color: GaanTheme.primaryPurple),
            SizedBox(width: 8),
            Text('Create Playlist', style: TextStyle(color: Colors.white, fontSize: 18)),
          ],
        ),
        content: TextField(
          controller: controller,
          style: const TextStyle(color: Colors.white),
          decoration: const InputDecoration(
            hintText: 'Enter playlist title...',
            hintStyle: TextStyle(color: GaanTheme.textMuted),
            enabledBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: GaanTheme.borderCharcoal),
            ),
            focusedBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: GaanTheme.primaryPurple),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel', style: TextStyle(color: GaanTheme.textMuted)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: GaanTheme.primaryPurple,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              final text = controller.text.trim();
              if (text.isNotEmpty) {
                setState(() {
                  _userPlaylists.insert(0, {
                    'title': text,
                    'subtitle': 'Personal Playlist • Creative Max Engine',
                    'icon': Icons.queue_music,
                  });
                });
                Navigator.pop(ctx);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    backgroundColor: GaanTheme.primaryPurple,
                    content: Text('Playlist "$text" created!'),
                  ),
                );
              }
            },
            child: const Text('Create', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final allSongs = SampleCatalogue.songs;
    final likedSongs = allSongs.where((s) => player.isLiked(s.id)).toList();
    final preferredLanguages = player.preferredLanguages;

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Your Library', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
            Text(
              'Lossless Music Hub • Creative Max',
              style: TextStyle(
                color: GaanTheme.fuchsiaNeon.withOpacity(0.9),
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
        backgroundColor: GaanTheme.amoledBlack,
        actions: [
          IconButton(
            icon: const Icon(Icons.add_circle_outline, color: GaanTheme.primaryPurple),
            onPressed: _showCreatePlaylistDialog,
            tooltip: 'Create New Playlist',
          ),
        ],
      ),
      body: Column(
        children: [
          // Sub-navigation tabs
          SizedBox(
            height: 42,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _tabs.length,
              separatorBuilder: (context, index) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final tab = _tabs[index];
                final isSelected = _activeTab == tab;
                return GestureDetector(
                  onTap: () => setState(() => _activeTab = tab),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      gradient: isSelected ? GaanTheme.primaryGradient : null,
                      color: isSelected ? null : GaanTheme.surfaceBlack,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: isSelected ? GaanTheme.fuchsiaNeon : GaanTheme.borderCharcoal,
                      ),
                    ),
                    child: Text(
                      tab,
                      style: TextStyle(
                        color: isSelected ? Colors.white : GaanTheme.textSecondary,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          const SizedBox(height: 12),

          // Content Views
          Expanded(
            child: _buildTabContent(player, allSongs, likedSongs, preferredLanguages),
          ),
        ],
      ),
    );
  }

  Widget _buildTabContent(
    AudioPlayerService player,
    List<Song> allSongs,
    List<Song> likedSongs,
    List<String> preferredLanguages,
  ) {
    if (_activeTab == 'Downloads') {
      return player.downloadedSongs.isNotEmpty
          ? ListView.builder(
              padding: const EdgeInsets.only(bottom: 90),
              itemCount: player.downloadedSongs.length,
              itemBuilder: (context, index) {
                final song = player.downloadedSongs[index];
                return SongTile(
                  song: song,
                  playlistContext: player.downloadedSongs,
                );
              },
            )
          : const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.download_for_offline_outlined, color: GaanTheme.textMuted, size: 52),
                  SizedBox(height: 12),
                  Text(
                    'No Offline Downloads Yet',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  SizedBox(height: 6),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      'Tap the download icon next to ANY song on GAAN to listen offline anytime with zero data.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: GaanTheme.textMuted, fontSize: 12),
                    ),
                  ),
                ],
              ),
            );
    }

    if (_activeTab == 'Playlists') {
      return ListView(
        padding: const EdgeInsets.fromLTRB(16, 4, 16, 90),
        children: [
          // User created playlists
          if (_userPlaylists.isNotEmpty) ...[
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 8),
              child: Text('Your Playlists', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
            ),
            ..._userPlaylists.map((pl) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: _buildPlaylistItem(
                    title: pl['title'] as String,
                    subtitle: pl['subtitle'] as String,
                    icon: Icons.queue_music,
                    onTap: () {
                      player.playSong(allSongs[0], customQueue: allSongs);
                    },
                  ),
                )),
            const SizedBox(height: 12),
          ],

          const Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text('Curated Cloud Playlists', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
          ),
          ..._curatedPlaylists.map((pl) {
            final filter = (pl['filter'] as String).toLowerCase();
            final matchedSongs = allSongs.where((s) {
              return (s.genreName?.toLowerCase().contains(filter) ?? false) ||
                  s.title.toLowerCase().contains(filter) ||
                  s.artistName.toLowerCase().contains(filter);
            }).toList();

            final targetSongs = matchedSongs.isNotEmpty ? matchedSongs : allSongs;

            return InkWell(
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => CategoryDetailScreen(
                      title: pl['title'] as String,
                      subtitle: pl['subtitle'] as String,
                      imageUrl: pl['imageUrl'] as String,
                      themeColor: pl['color'] as Color,
                      songs: targetSongs,
                    ),
                  ),
                );
              },
              borderRadius: BorderRadius.circular(16),
              child: Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: GaanTheme.surfaceBlack,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: GaanTheme.borderCharcoal),
                ),
                child: Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: Image.network(
                        pl['imageUrl'] as String,
                        width: 56,
                        height: 56,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(pl['title'] as String, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                          const SizedBox(height: 3),
                          Text(pl['subtitle'] as String, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11)),
                        ],
                      ),
                    ),
                    const Icon(Icons.arrow_forward_ios, color: Colors.white38, size: 14),
                  ],
                ),
              ),
            );
          }),
        ],
      );
    }

    if (_activeTab == 'Discover') {
      // Recommendations matching preferred languages
      final recommended = allSongs.where((s) {
        if (preferredLanguages.isEmpty) return true;
        for (final l in preferredLanguages) {
          if (s.artistName.toLowerCase().contains(l.toLowerCase()) ||
              (s.genreName?.toLowerCase().contains(l.toLowerCase()) ?? false)) {
            return true;
          }
        }
        return false;
      }).toList();

      final displayRec = recommended.isNotEmpty ? recommended : allSongs;

      return ListView(
        padding: const EdgeInsets.only(bottom: 90),
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Recommended Internet Tracks',
                  style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                ),
                Text(
                  'Based on ${preferredLanguages.join(', ')}',
                  style: const TextStyle(color: GaanTheme.fuchsiaNeon, fontSize: 11),
                ),
              ],
            ),
          ),
          ...displayRec.map((song) => SongTile(song: song, playlistContext: displayRec)),
        ],
      );
    }

    if (_activeTab == 'Liked') {
      return likedSongs.isNotEmpty
          ? ListView.builder(
              padding: const EdgeInsets.only(bottom: 90),
              itemCount: likedSongs.length,
              itemBuilder: (context, index) {
                return SongTile(
                  song: likedSongs[index],
                  playlistContext: likedSongs,
                );
              },
            )
          : const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.favorite_border, color: GaanTheme.textMuted, size: 48),
                  SizedBox(height: 8),
                  Text('No liked songs yet', style: TextStyle(color: GaanTheme.textMuted)),
                ],
              ),
            );
    }

    if (_activeTab == 'All Songs') {
      return ListView.builder(
        padding: const EdgeInsets.only(bottom: 90),
        itemCount: allSongs.length,
        itemBuilder: (context, index) {
          return SongTile(
            song: allSongs[index],
            playlistContext: allSongs,
          );
        },
      );
    }

    // Albums tab
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 90),
      children: SampleCatalogue.albums.map((album) {
        final albumSongs = allSongs.where((s) => s.albumId == album.id).toList();
        return InkWell(
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => CategoryDetailScreen(
                  title: album.title,
                  subtitle: '${album.artistName} • ${album.totalTracks} songs',
                  imageUrl: album.coverUrl,
                  themeColor: GaanTheme.primaryPurple,
                  songs: albumSongs.isNotEmpty ? albumSongs : allSongs,
                ),
              ),
            );
          },
          child: Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: GaanTheme.surfaceBlack,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: GaanTheme.borderCharcoal),
            ),
            child: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Image.network(
                    album.coverUrl,
                    width: 52,
                    height: 52,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(album.title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                      const SizedBox(height: 3),
                      Text('${album.artistName} • ${album.totalTracks} tracks', style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11)),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, color: Colors.white38, size: 14),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildPlaylistItem({required String title, required String subtitle, required IconData icon, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: GaanTheme.surfaceBlack,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: GaanTheme.borderCharcoal),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                gradient: GaanTheme.primaryGradient,
              ),
              child: Icon(icon, color: Colors.white, size: 24),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 3),
                  Text(subtitle, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11)),
                ],
              ),
            ),
            const Icon(Icons.play_circle_fill, color: GaanTheme.primaryPurple, size: 28),
          ],
        ),
      ),
    );
  }
}
