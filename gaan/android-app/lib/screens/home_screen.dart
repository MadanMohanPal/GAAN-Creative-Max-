import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/sample_catalogue.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import '../widgets/brand_logo.dart';
import '../widgets/song_tile.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _activeChip = 'All';
  final List<String> _chips = ['All', 'Relax', 'Energize', 'Workout', 'Focus', 'Night Drive'];

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final songs = SampleCatalogue.songs;
    final quickPicks = songs.take(4).toList();
    final trending = songs.skip(2).take(5).toList();
    final albums = SampleCatalogue.albums;

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      body: CustomScrollView(
        slivers: [
          // AMOLED App Bar
          SliverAppBar(
            backgroundColor: GaanTheme.amoledBlack,
            floating: true,
            pinned: false,
            title: const GaanLogoMark(size: 32, showText: true),
            actions: [
              IconButton(
                icon: const Icon(Icons.cast, color: Colors.white, size: 22),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.notifications_none, color: Colors.white, size: 22),
                onPressed: () {},
              ),
              const SizedBox(width: 8),
            ],
          ),

          // Mood filter chips
          SliverToBoxAdapter(
            child: SizedBox(
              height: 44,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _chips.length,
                separatorBuilder: (context, index) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final chip = _chips[index];
                  final isSelected = _activeChip == chip;
                  return GestureDetector(
                    onTap: () => setState(() => _activeChip = chip),
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
                        chip,
                        style: TextStyle(
                          color: isSelected ? Colors.white : GaanTheme.textSecondary,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),

          // Hero Banner: "Night Drive Vibes"
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.all(16),
              height: 140,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                gradient: const LinearGradient(
                  colors: [Color(0xFF2D104E), Color(0xFF140827), GaanTheme.surfaceBlack],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                border: Border.all(color: GaanTheme.primaryPurple.withOpacity(0.3)),
              ),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: GaanTheme.primaryPurple.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text(
                              'FEATURED STATION',
                              style: TextStyle(
                                color: GaanTheme.purpleLight,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'Night Drive Synth',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            'True AMOLED soundscapes',
                            style: TextStyle(color: GaanTheme.textMuted, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: () => player.playSong(quickPicks[0]),
                      child: Container(
                        width: 48,
                        height: 48,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: GaanTheme.primaryGradient,
                        ),
                        child: const Icon(Icons.play_arrow, color: Colors.white, size: 28),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Quick Picks Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 8, 16, 4),
              child: Row(
                children: [
                  Icon(Icons.flash_on, color: GaanTheme.primaryPurple, size: 18),
                  SizedBox(width: 8),
                  Text(
                    'Quick Picks',
                    style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),

          // Quick Picks Song Tiles
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final song = quickPicks[index];
                return SongTile(song: song, playlistContext: quickPicks);
              },
              childCount: quickPicks.length,
            ),
          ),

          // New Albums Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 20, 16, 12),
              child: Text(
                'Recommended Albums',
                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),

          // New Albums Horizontal List
          SliverToBoxAdapter(
            child: SizedBox(
              height: 190,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: albums.length,
                separatorBuilder: (context, index) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final album = albums[index];
                  return SizedBox(
                    width: 135,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: Image.network(
                            album.coverUrl,
                            width: 135,
                            height: 135,
                            fit: BoxFit.cover,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          album.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          album.artistName ?? 'Artist',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: GaanTheme.textMuted,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ),

          // Trending Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 20, 16, 8),
              child: Row(
                children: [
                  Icon(Icons.local_fire_department, color: GaanTheme.pinkNeon, size: 18),
                  SizedBox(width: 8),
                  Text(
                    'Trending on GAAN',
                    style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),

          // Trending Song List
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final song = trending[index];
                return SongTile(song: song, playlistContext: trending);
              },
              childCount: trending.length,
            ),
          ),

          // Bottom padding for mini player
          const SliverToBoxAdapter(
            child: SizedBox(height: 90),
          ),
        ],
      ),
    );
  }
}
