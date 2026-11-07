import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/song.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import '../widgets/song_tile.dart';

class CategoryDetailScreen extends StatelessWidget {
  final String title;
  final String subtitle;
  final String imageUrl;
  final Color themeColor;
  final List<Song> songs;

  const CategoryDetailScreen({
    super.key,
    required this.title,
    required this.subtitle,
    required this.imageUrl,
    this.themeColor = GaanTheme.primaryPurple,
    required this.songs,
  });

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      body: CustomScrollView(
        slivers: [
          // Collapsible Ambient Header
          SliverAppBar(
            expandedHeight: 250,
            pinned: true,
            backgroundColor: GaanTheme.amoledBlack,
            iconTheme: const IconThemeData(color: Colors.white),
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Image.network(
                    imageUrl,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) => Container(
                      color: themeColor.withOpacity(0.3),
                      child: Icon(Icons.music_note, size: 80, color: themeColor),
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Colors.transparent,
                          GaanTheme.amoledBlack.withOpacity(0.85),
                          GaanTheme.amoledBlack,
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 24,
                    left: 16,
                    right: 16,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: themeColor.withOpacity(0.25),
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(color: themeColor.withOpacity(0.5)),
                          ),
                          child: Text(
                            'CURATED BY CREATIVE MAX',
                            style: TextStyle(
                              color: themeColor,
                              fontSize: 9,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.0,
                            ),
                          ),
                        ),
                        const SizedBox(height: 6),
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
                ],
              ),
            ),
          ),

          // Action Buttons: Play All & Shuffle
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
              child: Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: themeColor,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                        elevation: 4,
                      ),
                      onPressed: () {
                        if (songs.isNotEmpty) {
                          player.playSong(songs[0], customQueue: songs);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              backgroundColor: themeColor,
                              content: Text('Playing "$title" playlist'),
                              duration: const Duration(seconds: 2),
                            ),
                          );
                        }
                      },
                      icon: const Icon(Icons.play_arrow, color: Colors.white, size: 22),
                      label: const Text(
                        'Play All',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  IconButton.filledTonal(
                    style: IconButton.styleFrom(
                      backgroundColor: GaanTheme.surfaceBlack,
                      padding: const EdgeInsets.all(12),
                    ),
                    icon: const Icon(Icons.shuffle, color: Colors.white, size: 20),
                    onPressed: () {
                      if (songs.isNotEmpty) {
                        player.toggleShuffle();
                        player.playSong(songs[0], customQueue: songs);
                      }
                    },
                  ),
                  const SizedBox(width: 8),
                  IconButton.filledTonal(
                    style: IconButton.styleFrom(
                      backgroundColor: GaanTheme.surfaceBlack,
                      padding: const EdgeInsets.all(12),
                    ),
                    icon: const Icon(Icons.download_for_offline, color: GaanTheme.fuchsiaNeon, size: 20),
                    tooltip: 'Download All for Offline',
                    onPressed: () async {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          backgroundColor: GaanTheme.primaryPurple,
                          content: Text('Downloading tracks from "$title" for offline playback...'),
                          duration: const Duration(seconds: 2),
                        ),
                      );
                      for (final song in songs) {
                        await player.downloadSong(song);
                      }
                    },
                  ),
                ],
              ),
            ),
          ),

          // Songs List Header
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Tracks & Melodies',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    '⭐ 100% Studio Quality',
                    style: TextStyle(
                      color: themeColor,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Songs List
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final song = songs[index];
                return SongTile(song: song, playlistContext: songs);
              },
              childCount: songs.length,
            ),
          ),

          const SliverToBoxAdapter(
            child: SizedBox(height: 100),
          ),
        ],
      ),
    );
  }
}
