import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/sample_catalogue.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import '../widgets/song_tile.dart';

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({super.key});

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  String _activeTab = 'All Songs';
  final List<String> _tabs = ['All Songs', 'Liked', 'Playlists', 'Albums'];
  final List<Map<String, dynamic>> _customPlaylists = [
    {
      'title': 'Bollywood Romance & Sufi',
      'subtitle': 'Curated by Creative Max',
      'icon': Icons.favorite,
      'trackIndex': 0,
    },
    {
      'title': 'Coke Studio Gems',
      'subtitle': 'Atif, Rahat & Momina',
      'icon': Icons.music_note,
      'trackIndex': 5,
    },
    {
      'title': 'Punjabi Road Trip',
      'subtitle': 'Enna Sona, Ambarsariya',
      'icon': Icons.drive_eta,
      'trackIndex': 8,
    },
  ];

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
                  _customPlaylists.insert(0, {
                    'title': text,
                    'subtitle': 'Created by user • Creative Max Engine',
                    'icon': Icons.queue_music,
                    'trackIndex': 1,
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
    final likedSongs = SampleCatalogue.songs.where((s) => player.isLiked(s.id)).toList();

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Library', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
            Text(
              'Engineered by Creative Max',
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
                      color: isSelected ? GaanTheme.primaryPurple : GaanTheme.surfaceBlack,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: isSelected ? GaanTheme.primaryPurple : GaanTheme.borderCharcoal,
                      ),
                    ),
                    child: Text(
                      tab == 'Liked'
                          ? 'Liked (${likedSongs.length})'
                          : tab == 'All Songs'
                              ? 'All Songs (${SampleCatalogue.songs.length})'
                              : tab,
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

          // Content
          Expanded(
            child: _activeTab == 'All Songs'
                ? ListView.builder(
                    padding: const EdgeInsets.only(bottom: 90),
                    itemCount: SampleCatalogue.songs.length,
                    itemBuilder: (context, index) {
                      return SongTile(
                        song: SampleCatalogue.songs[index],
                        playlistContext: SampleCatalogue.songs,
                      );
                    },
                  )
                : _activeTab == 'Liked'
                    ? (likedSongs.isNotEmpty
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
                                Text(
                                  'No liked songs yet',
                                  style: TextStyle(color: GaanTheme.textMuted),
                                ),
                              ],
                            ),
                          ))
                    : _activeTab == 'Playlists'
                        ? ListView(
                            padding: const EdgeInsets.fromLTRB(16, 8, 16, 90),
                            children: _customPlaylists.map((pl) {
                              final idx = pl['trackIndex'] as int;
                              final safeTrack = idx < SampleCatalogue.songs.length
                                  ? SampleCatalogue.songs[idx]
                                  : SampleCatalogue.songs[0];
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: _buildPlaylistItem(
                                  pl['title'] as String,
                                  pl['subtitle'] as String,
                                  pl['icon'] as IconData,
                                  () => player.playSong(safeTrack),
                                ),
                              );
                            }).toList(),
                          )
                        : ListView(
                            padding: const EdgeInsets.fromLTRB(16, 8, 16, 90),
                            children: SampleCatalogue.albums.map((album) {
                              return ListTile(
                                leading: ClipRRect(
                                  borderRadius: BorderRadius.circular(8),
                                  child: Image.network(
                                    album.coverUrl,
                                    width: 48,
                                    height: 48,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                                title: Text(album.title,
                                    style: const TextStyle(
                                        color: Colors.white, fontWeight: FontWeight.bold)),
                                subtitle: Text(
                                    '${album.artistName} • ${album.totalTracks} songs',
                                    style: const TextStyle(color: GaanTheme.textMuted)),
                              );
                            }).toList(),
                          ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlaylistItem(String title, String subtitle, IconData icon, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: GaanTheme.surfaceBlack,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: GaanTheme.borderCharcoal),
        ),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                gradient: GaanTheme.primaryGradient,
              ),
              child: Icon(icon, color: Colors.white, size: 28),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: GaanTheme.textMuted,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.play_circle_fill, color: GaanTheme.primaryPurple, size: 32),
          ],
        ),
      ),
    );
  }
}
