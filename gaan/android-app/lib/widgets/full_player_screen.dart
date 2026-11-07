import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import '../models/song.dart';

class FullPlayerScreen extends StatefulWidget {
  const FullPlayerScreen({super.key});

  @override
  State<FullPlayerScreen> createState() => _FullPlayerScreenState();
}

class _FullPlayerScreenState extends State<FullPlayerScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  String _formatDuration(Duration d) {
    final m = d.inMinutes;
    final s = d.inSeconds % 60;
    return '$m:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final currentSong = player.currentSong;

    if (currentSong == null) {
      return const Scaffold(
        backgroundColor: GaanTheme.amoledBlack,
        body: Center(child: Text('No song selected')),
      );
    }

    final isLiked = player.isLiked(currentSong.id);
    final totalSecs = player.totalDuration.inSeconds > 0
        ? player.totalDuration.inSeconds
        : currentSong.durationSeconds;
    final curSecs = player.currentPosition.inSeconds;

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      body: Stack(
        children: [
          // Ambient purple glow
          Positioned(
            top: -100,
            left: -50,
            right: -50,
            height: 450,
            child: Container(
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    GaanTheme.violetAccent.withOpacity(0.3),
                    GaanTheme.primaryPurple.withOpacity(0.1),
                    Colors.transparent,
                  ],
                  radius: 0.8,
                ),
              ),
            ),
          ),

          SafeArea(
            child: Column(
              children: [
                // Top Action Bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.keyboard_arrow_down, size: 30, color: Colors.white),
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                      Column(
                        children: [
                          const Text(
                            'PLAYING FROM PLAYLIST',
                            style: TextStyle(
                              color: GaanTheme.textMuted,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.0,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            currentSong.albumTitle ?? 'GAAN Radio Flow',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: GaanTheme.charcoalCard,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: GaanTheme.borderCharcoal),
                        ),
                        child: const Text(
                          'Hi-Res',
                          style: TextStyle(
                            color: GaanTheme.purpleLight,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Tab switch: Player / Lyrics / Queue
                Container(
                  height: 36,
                  margin: const EdgeInsets.symmetric(horizontal: 40, vertical: 4),
                  decoration: BoxDecoration(
                    color: GaanTheme.surfaceBlack,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: GaanTheme.borderCharcoal),
                  ),
                  child: TabBar(
                    controller: _tabController,
                    indicator: BoxDecoration(
                      gradient: GaanTheme.primaryGradient,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    indicatorSize: TabBarIndicatorSize.tab,
                    labelColor: Colors.white,
                    unselectedLabelColor: GaanTheme.textMuted,
                    labelStyle: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                    tabs: const [
                      Tab(text: 'Player'),
                      Tab(text: 'Lyrics'),
                      Tab(text: 'Up Next'),
                    ],
                  ),
                ),

                // Center Tab Views
                Expanded(
                  child: TabBarView(
                    controller: _tabController,
                    children: [
                      // View 1: Main Artwork & Song metadata
                      _buildArtworkView(currentSong, isLiked, player),

                      // View 2: Lyrics
                      _buildLyricsView(currentSong),

                      // View 3: Up Next Queue
                      _buildQueueView(player),
                    ],
                  ),
                ),

                // Bottom Controls Section
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  child: Column(
                    children: [
                      // Scrubber Slider
                      Slider(
                        value: curSecs.toDouble().clamp(0.0, totalSecs.toDouble()),
                        min: 0.0,
                        max: totalSecs.toDouble() > 0 ? totalSecs.toDouble() : 100.0,
                        onChanged: (val) {
                          player.seek(Duration(seconds: val.toInt()));
                        },
                      ),

                      // Time stamps
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 6),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              _formatDuration(player.currentPosition),
                              style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11, fontFamily: 'monospace'),
                            ),
                            Text(
                              _formatDuration(Duration(seconds: totalSecs)),
                              style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11, fontFamily: 'monospace'),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 12),

                      // Main Playback Buttons
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          IconButton(
                            icon: Icon(
                              Icons.shuffle,
                              color: player.isShuffle ? GaanTheme.primaryPurple : GaanTheme.textMuted,
                              size: 22,
                            ),
                            onPressed: () => player.toggleShuffle(),
                          ),

                          IconButton(
                            icon: const Icon(Icons.skip_previous, size: 36, color: Colors.white),
                            onPressed: () => player.previous(),
                          ),

                          // Large Glowing Play/Pause button
                          GestureDetector(
                            onTap: () => player.togglePlay(),
                            child: Container(
                              width: 68,
                              height: 68,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: GaanTheme.primaryGradient,
                                boxShadow: [
                                  BoxShadow(
                                    color: GaanTheme.primaryPurple.withOpacity(0.5),
                                    blurRadius: 20,
                                    spreadRadius: 2,
                                  ),
                                ],
                              ),
                              child: Icon(
                                player.isPlaying ? Icons.pause : Icons.play_arrow,
                                size: 36,
                                color: Colors.white,
                              ),
                            ),
                          ),

                          IconButton(
                            icon: const Icon(Icons.skip_next, size: 36, color: Colors.white),
                            onPressed: () => player.next(),
                          ),

                          IconButton(
                            icon: Icon(
                              player.repeatMode == GaanRepeatMode.one
                                  ? Icons.repeat_one
                                  : Icons.repeat,
                              color: player.repeatMode != GaanRepeatMode.off
                                  ? GaanTheme.primaryPurple
                                  : GaanTheme.textMuted,
                              size: 22,
                            ),
                            onPressed: () => player.cycleRepeatMode(),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildArtworkView(Song song, bool isLiked, AudioPlayerService player) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Album Cover Artwork with Gesture Swipe to Change Songs
          Expanded(
            child: Center(
              child: AspectRatio(
                aspectRatio: 1.0,
                child: GestureDetector(
                  onHorizontalDragEnd: (details) {
                    final vel = details.primaryVelocity ?? 0;
                    if (vel < -150) {
                      player.next();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          backgroundColor: GaanTheme.primaryPurple,
                          content: Text('⏭ Playing Next Song'),
                          duration: Duration(milliseconds: 600),
                        ),
                      );
                    } else if (vel > 150) {
                      player.previous();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          backgroundColor: GaanTheme.primaryPurple,
                          content: Text('⏮ Playing Previous Song'),
                          duration: Duration(milliseconds: 600),
                        ),
                      );
                    }
                  },
                  onVerticalDragEnd: (details) {
                    if ((details.primaryVelocity ?? 0) > 300) {
                      Navigator.of(context).pop();
                    }
                  },
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: GaanTheme.primaryPurple.withOpacity(0.35),
                          blurRadius: 30,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: Image.network(
                        song.coverUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          color: GaanTheme.charcoalCard,
                          child: const Icon(Icons.music_note, size: 80, color: GaanTheme.primaryPurple),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),

          const SizedBox(height: 10),

          // Visual Swipe Guide
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.swipe_left_alt, color: GaanTheme.purpleLight, size: 14),
              const SizedBox(width: 4),
              Text(
                'Swipe artwork to change song',
                style: TextStyle(
                  color: GaanTheme.textMuted.withOpacity(0.85),
                  fontSize: 11,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(width: 4),
              const Icon(Icons.swipe_right_alt, color: GaanTheme.purpleLight, size: 14),
            ],
          ),

          const SizedBox(height: 16),

          // Title, Artist, and Heart Like
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      song.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      song.artistName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: GaanTheme.textSecondary,
                        fontSize: 15,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),

              IconButton(
                icon: Icon(
                  isLiked ? Icons.favorite : Icons.favorite_border,
                  color: isLiked ? GaanTheme.pinkNeon : GaanTheme.textMuted,
                  size: 28,
                ),
                onPressed: () => player.toggleLike(song.id),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLyricsView(Song song) {
    return Container(
      margin: const EdgeInsets.all(20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: GaanTheme.surfaceBlack,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: GaanTheme.borderCharcoal),
      ),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.mic_none, size: 18, color: GaanTheme.primaryPurple),
                SizedBox(width: 8),
                Text(
                  'SYNCED LYRICS',
                  style: TextStyle(
                    color: GaanTheme.primaryPurple,
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.2,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              song.lyrics ?? 'Instrumental piece with rich synth textures.',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                height: 1.8,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQueueView(AudioPlayerService player) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: player.queue.length,
      itemBuilder: (context, index) {
        final song = player.queue[index];
        final isCurrent = song.id == player.currentSong?.id;

        return ListTile(
          onTap: () => player.playSong(song),
          leading: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              song.coverUrl,
              width: 44,
              height: 44,
              fit: BoxFit.cover,
            ),
          ),
          title: Text(
            song.title,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: isCurrent ? GaanTheme.primaryPurple : Colors.white,
              fontWeight: isCurrent ? FontWeight.bold : FontWeight.w500,
              fontSize: 14,
            ),
          ),
          subtitle: Text(
            song.artistName,
            style: const TextStyle(color: GaanTheme.textMuted, fontSize: 12),
          ),
          trailing: isCurrent
              ? const Icon(Icons.graphic_eq, color: GaanTheme.primaryPurple, size: 20)
              : null,
        );
      },
    );
  }
}
