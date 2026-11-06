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
  String _activeTab = 'Liked';
  final List<String> _tabs = ['Liked', 'Playlists', 'Albums', 'Artists'];

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final likedSongs = SampleCatalogue.songs.where((s) => player.isLiked(s.id)).toList();

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      appBar: AppBar(
        title: const Text('Library'),
        backgroundColor: GaanTheme.amoledBlack,
        actions: [
          IconButton(
            icon: const Icon(Icons.add, color: Colors.white),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Create Playlist dialog (Phase 1)')),
              );
            },
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

          // Content
          Expanded(
            child: _activeTab == 'Liked'
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
                        child: Text(
                          'No liked songs yet',
                          style: TextStyle(color: GaanTheme.textMuted),
                        ),
                      ))
                : _activeTab == 'Playlists'
                    ? ListView(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 90),
                        children: [
                          _buildPlaylistItem(
                            'Night Drive: Neon Horizons',
                            '4 songs • Curated by GAAN',
                            Icons.drive_eta,
                            () => player.playSong(SampleCatalogue.songs[0]),
                          ),
                          const SizedBox(height: 12),
                          _buildPlaylistItem(
                            'Deep AMOLED Chill',
                            '3 songs • Pure black relaxation',
                            Icons.nightlight_round,
                            () => player.playSong(SampleCatalogue.songs[3]),
                          ),
                        ],
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
                            title: Text(album.title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            subtitle: Text('${album.artistName} • ${album.totalTracks} songs', style: const TextStyle(color: GaanTheme.textMuted)),
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
