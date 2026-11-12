import 'dart:math' as math;
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

class _FullPlayerScreenState extends State<FullPlayerScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;
  late AnimationController _equalizerController;
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _equalizerController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _equalizerController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  String _formatDuration(Duration d) {
    final m = d.inMinutes;
    final s = d.inSeconds % 60;
    return '$m:${s.toString().padLeft(2, '0')}';
  }

  String _formatSleepTimer(int totalSecs) {
    final m = totalSecs ~/ 60;
    final s = totalSecs % 60;
    return '${m}m ${s.toString().padLeft(2, '0')}s';
  }

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final currentSong = player.currentSong;

    if (currentSong == null) {
      return const Scaffold(
        backgroundColor: GaanTheme.amoledBlack,
        body: Center(
          child: Text('No song selected', style: TextStyle(color: Colors.white)),
        ),
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
          // Dynamic ambient purple & neon pink background glow
          AnimatedBuilder(
            animation: _pulseController,
            builder: (context, _) {
              final scale = 0.85 + (_pulseController.value * 0.15);
              return Positioned(
                top: -120,
                left: -60,
                right: -60,
                height: 480,
                child: Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        GaanTheme.violetAccent.withOpacity(0.35 * scale),
                        GaanTheme.primaryPurple.withOpacity(0.18 * scale),
                        GaanTheme.pinkNeon.withOpacity(0.08 * scale),
                        Colors.transparent,
                      ],
                      radius: 0.85,
                    ),
                  ),
                ),
              );
            },
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
                      // Studio FX & Sleep Timer quick badges
                      Row(
                        children: [
                          if (player.sleepTimerMinutes != null)
                            Container(
                              margin: const EdgeInsets.only(right: 6),
                              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                              decoration: BoxDecoration(
                                color: GaanTheme.primaryPurple.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: GaanTheme.primaryPurple.withOpacity(0.5)),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.bedtime, size: 11, color: GaanTheme.purpleLight),
                                  const SizedBox(width: 3),
                                  Text(
                                    player.sleepTimerMinutes == -1
                                        ? 'End'
                                        : _formatSleepTimer(player.sleepSecondsRemaining),
                                    style: const TextStyle(
                                      color: GaanTheme.purpleLight,
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                      fontFamily: 'monospace',
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: GaanTheme.charcoalCard,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: GaanTheme.borderCharcoal),
                            ),
                            child: const Text(
                              'Hi-Res 320k',
                              style: TextStyle(
                                color: GaanTheme.purpleLight,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Tab switch: Player / Lyrics / Queue
                Container(
                  height: 36,
                  margin: const EdgeInsets.symmetric(horizontal: 36, vertical: 4),
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
                      // View 1: Main Artwork & Song metadata & Animated Equalizer
                      _buildArtworkView(currentSong, isLiked, player),

                      // View 2: Lyrics
                      _buildLyricsView(currentSong, player),

                      // View 3: Up Next Queue
                      _buildQueueView(player),
                    ],
                  ),
                ),

                // Audio Dynamic Tools Bar: Speed, Sound FX/Equalizer, Sleep Timer, Cast
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 4),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      // Playback Speed
                      _buildQuickToolButton(
                        icon: Icons.speed,
                        label: '${player.playbackSpeed}x',
                        isActive: player.playbackSpeed != 1.0,
                        onTap: () => _showSpeedDialog(context, player),
                      ),

                      // Sound FX & Studio Equalizer
                      _buildQuickToolButton(
                        icon: Icons.tune,
                        label: player.activeEqualizerPreset.split(' ').first,
                        isActive: true,
                        onTap: () => _showEqualizerSheet(context, player),
                      ),

                      // Sleep Timer
                      _buildQuickToolButton(
                        icon: player.sleepTimerMinutes != null
                            ? Icons.bedtime
                            : Icons.bedtime_outlined,
                        label: player.sleepTimerMinutes != null ? 'Timer ON' : 'Sleep',
                        isActive: player.sleepTimerMinutes != null,
                        onTap: () => _showSleepTimerDialog(context, player),
                      ),

                      // Offline Download
                      _buildQuickToolButton(
                        icon: player.isDownloaded(currentSong.id)
                            ? Icons.download_done
                            : (player.isDownloading(currentSong.id)
                                ? Icons.downloading
                                : Icons.download_for_offline_outlined),
                        label: player.isDownloaded(currentSong.id) ? 'Saved' : 'Download',
                        isActive: player.isDownloaded(currentSong.id),
                        onTap: () async {
                          if (!player.isDownloaded(currentSong.id)) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('📥 Downloading 320kbps for offline playback...'),
                                duration: Duration(milliseconds: 1500),
                              ),
                            );
                            await player.downloadSong(currentSong);
                            if (mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  backgroundColor: Color(0xFF10B981),
                                  content: Text('✓ Song downloaded offline successfully!'),
                                  duration: Duration(milliseconds: 1500),
                                ),
                              );
                            }
                          }
                        },
                      ),
                    ],
                  ),
                ),

                // Bottom Controls Section
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                  child: Column(
                    children: [
                      // Scrubber Slider
                      SliderTheme(
                        data: SliderTheme.of(context).copyWith(
                          trackHeight: 3.5,
                          thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
                          overlayShape: const RoundSliderOverlayShape(overlayRadius: 14),
                          activeTrackColor: GaanTheme.primaryPurple,
                          inactiveTrackColor: GaanTheme.borderCharcoal,
                          thumbColor: Colors.white,
                        ),
                        child: Slider(
                          value: curSecs.toDouble().clamp(0.0, totalSecs.toDouble()),
                          min: 0.0,
                          max: totalSecs.toDouble() > 0 ? totalSecs.toDouble() : 100.0,
                          onChanged: (val) {
                            player.seek(Duration(seconds: val.toInt()));
                          },
                        ),
                      ),

                      // Time stamps
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 6),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              _formatDuration(player.currentPosition),
                              style: const TextStyle(
                                color: GaanTheme.textMuted,
                                fontSize: 11,
                                fontFamily: 'monospace',
                              ),
                            ),
                            Text(
                              _formatDuration(Duration(seconds: totalSecs)),
                              style: const TextStyle(
                                color: GaanTheme.textMuted,
                                fontSize: 11,
                                fontFamily: 'monospace',
                              ),
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 8),

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

                          // Large Glowing Play/Pause button with pulse ring
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
                                    color: GaanTheme.primaryPurple.withOpacity(player.isPlaying ? 0.6 : 0.2),
                                    blurRadius: player.isPlaying ? 24 : 12,
                                    spreadRadius: player.isPlaying ? 3 : 0,
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
                      const SizedBox(height: 8),
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

  Widget _buildQuickToolButton({
    required IconData icon,
    required String label,
    required bool isActive,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: isActive ? GaanTheme.primaryPurple.withOpacity(0.15) : GaanTheme.charcoalCard,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isActive ? GaanTheme.primaryPurple.withOpacity(0.6) : GaanTheme.borderCharcoal,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 14,
              color: isActive ? GaanTheme.purpleLight : GaanTheme.textMuted,
            ),
            const SizedBox(width: 4),
            Text(
              label,
              style: TextStyle(
                color: isActive ? Colors.white : GaanTheme.textMuted,
                fontSize: 11,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildArtworkView(Song song, bool isLiked, AudioPlayerService player) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 4),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Album Cover Artwork with Pulsing Halo and Swipe gesture
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
                  child: AnimatedBuilder(
                    animation: _pulseController,
                    builder: (context, child) {
                      final glowSpread = player.isPlaying ? (2.0 + _pulseController.value * 4.0) : 1.0;
                      return Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(24),
                          boxShadow: [
                            BoxShadow(
                              color: GaanTheme.primaryPurple.withOpacity(player.isPlaying ? 0.45 : 0.15),
                              blurRadius: 28,
                              spreadRadius: glowSpread,
                            ),
                            BoxShadow(
                              color: GaanTheme.pinkNeon.withOpacity(player.isPlaying ? 0.2 : 0.0),
                              blurRadius: 36,
                              spreadRadius: 1,
                            ),
                          ],
                        ),
                        child: child,
                      );
                    },
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

          const SizedBox(height: 8),

          // Dynamic Animated Audio Frequency Spectrum Visualizer
          _buildEqualizerWaveform(player),

          const SizedBox(height: 8),

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
                        fontSize: 21,
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
                        fontSize: 14.5,
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

  // 16-Bar Animated Real-time Waveform Equalizer
  Widget _buildEqualizerWaveform(AudioPlayerService player) {
    const int barCount = 18;
    return SizedBox(
      height: 28,
      child: AnimatedBuilder(
        animation: _equalizerController,
        builder: (context, _) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: List.generate(barCount, (index) {
              double height;
              if (player.isPlaying) {
                final phase = (index / barCount) * 2 * math.pi;
                final t = _equalizerController.value * 2 * math.pi;
                // Double harmonic sine wave for musical oscillation
                final raw = (math.sin(t + phase) * 0.5 + 0.5) *
                            (math.cos(t * 1.5 - phase * 0.7) * 0.5 + 0.5);
                height = 5.0 + (raw * 22.0 * player.bassBoostLevel);
              } else {
                height = 4.0;
              }

              return Container(
                width: 3.2,
                height: height,
                margin: const EdgeInsets.symmetric(horizontal: 2.2),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    colors: [
                      GaanTheme.primaryPurple,
                      GaanTheme.pinkNeon,
                    ],
                  ),
                  borderRadius: BorderRadius.circular(2),
                ),
              );
            }),
          );
        },
      ),
    );
  }

  Widget _buildLyricsView(Song song, AudioPlayerService player) {
    final rawLyrics = song.lyrics ??
        'Instrumental piece with rich synth textures and spatial beats.\nFeel the rhythm move through your soul.\nCreative Max brings pure musical bliss.';
    final lines = rawLyrics.split('\n').where((l) => l.trim().isNotEmpty).toList();

    return Container(
      margin: const EdgeInsets.all(20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: GaanTheme.surfaceBlack,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: GaanTheme.borderCharcoal),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.mic, size: 18, color: GaanTheme.pinkNeon),
                  SizedBox(width: 8),
                  Text(
                    'KARAOKE & SYNCED LYRICS',
                    style: TextStyle(
                      color: GaanTheme.primaryPurple,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.2,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: GaanTheme.primaryPurple.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text(
                  'LIVE',
                  style: TextStyle(
                    color: GaanTheme.purpleLight,
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Expanded(
            child: ListView.builder(
              itemCount: lines.length,
              itemBuilder: (context, index) {
                // Simulate karaoke active line based on playback progress
                final progress = player.totalDuration.inSeconds > 0
                    ? player.currentPosition.inSeconds / player.totalDuration.inSeconds
                    : 0.0;
                final activeIndex = (progress * lines.length).floor().clamp(0, lines.length - 1);
                final isActive = index == activeIndex && player.isPlaying;

                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(vertical: 6),
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: isActive ? GaanTheme.primaryPurple.withOpacity(0.2) : Colors.transparent,
                    borderRadius: BorderRadius.circular(10),
                    border: isActive
                        ? Border.all(color: GaanTheme.primaryPurple.withOpacity(0.5))
                        : null,
                  ),
                  child: Text(
                    lines[index],
                    style: TextStyle(
                      color: isActive
                          ? Colors.white
                          : (index < activeIndex ? GaanTheme.textMuted : GaanTheme.textSecondary),
                      fontSize: isActive ? 18 : 15,
                      fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
                      shadows: isActive
                          ? [
                              Shadow(
                                color: GaanTheme.primaryPurple.withOpacity(0.8),
                                blurRadius: 10,
                              ),
                            ]
                          : null,
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQueueView(AudioPlayerService player) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'UP NEXT (${player.queue.length} SONGS)',
                style: const TextStyle(
                  color: GaanTheme.textMuted,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.0,
                ),
              ),
              const Text(
                'Drag to reorder • Swipe to delete',
                style: TextStyle(
                  color: GaanTheme.purpleLight,
                  fontSize: 10.5,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: ReorderableListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
            itemCount: player.queue.length,
            onReorder: (oldIdx, newIdx) {
              if (newIdx > oldIdx) newIdx -= 1;
              player.reorderQueue(oldIdx, newIdx);
            },
            itemBuilder: (context, index) {
              final song = player.queue[index];
              final isCurrent = song.id == player.currentSong?.id;

              return Dismissible(
                key: ValueKey('queue_${song.id}_$index'),
                direction: DismissDirection.endToStart,
                background: Container(
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.only(right: 20),
                  color: Colors.redAccent.withOpacity(0.8),
                  child: const Icon(Icons.delete_outline, color: Colors.white),
                ),
                onDismissed: (_) {
                  player.removeFromQueue(index);
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(vertical: 3),
                  decoration: BoxDecoration(
                    color: isCurrent
                        ? GaanTheme.primaryPurple.withOpacity(0.12)
                        : GaanTheme.charcoalCard.withOpacity(0.4),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isCurrent
                          ? GaanTheme.primaryPurple.withOpacity(0.4)
                          : Colors.transparent,
                    ),
                  ),
                  child: ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 2),
                    onTap: () => player.playSong(song),
                    leading: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        song.coverUrl,
                        width: 44,
                        height: 44,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          width: 44,
                          height: 44,
                          color: GaanTheme.charcoalCard,
                          child: const Icon(Icons.music_note, color: GaanTheme.primaryPurple),
                        ),
                      ),
                    ),
                    title: Text(
                      song.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: isCurrent ? GaanTheme.primaryPurple : Colors.white,
                        fontWeight: isCurrent ? FontWeight.bold : FontWeight.w500,
                        fontSize: 13.5,
                      ),
                    ),
                    subtitle: Text(
                      song.artistName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11.5),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (isCurrent)
                          const Icon(Icons.graphic_eq, color: GaanTheme.primaryPurple, size: 20),
                        const SizedBox(width: 8),
                        ReorderableDragStartListener(
                          index: index,
                          child: const Icon(Icons.drag_handle, color: GaanTheme.textMuted, size: 20),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  // --- Modal Sheets & Dialogs ---

  void _showEqualizerSheet(BuildContext context, AudioPlayerService player) {
    const presets = [
      'Studio Master',
      'Bass Boost 🔥',
      'Vocal Clarity 🎙️',
      'Acoustic / Sufi 🎸',
      'Electronic / Dance 🎛️',
      'Treble Boost ⚡',
    ];

    showModalBottomSheet(
      context: context,
      backgroundColor: GaanTheme.surfaceBlack,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setSheetState) {
            return SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Container(
                        width: 40,
                        height: 4,
                        decoration: BoxDecoration(
                          color: GaanTheme.borderCharcoal,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Row(
                      children: [
                        Icon(Icons.tune, color: GaanTheme.primaryPurple),
                        SizedBox(width: 8),
                        Text(
                          'Creative Max Studio Sound & FX',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 17,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Hardware DSP & High-Fidelity Audio Profiler',
                      style: TextStyle(color: GaanTheme.textMuted, fontSize: 12),
                    ),
                    const SizedBox(height: 16),

                    // Preset Chips
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: presets.map((p) {
                        final isSel = player.activeEqualizerPreset == p;
                        return ChoiceChip(
                          label: Text(p),
                          selected: isSel,
                          onSelected: (_) {
                            player.setEqualizerPreset(p);
                            setSheetState(() {});
                          },
                          backgroundColor: GaanTheme.charcoalCard,
                          selectedColor: GaanTheme.primaryPurple,
                          labelStyle: TextStyle(
                            color: isSel ? Colors.white : GaanTheme.textSecondary,
                            fontWeight: isSel ? FontWeight.bold : FontWeight.normal,
                            fontSize: 12,
                          ),
                        );
                      }).toList(),
                    ),

                    const SizedBox(height: 20),

                    // Bass Boost Slider
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Bass Subwoofer Level',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
                        ),
                        Text(
                          '${(player.bassBoostLevel * 100).toInt()}%',
                          style: const TextStyle(
                            color: GaanTheme.primaryPurple,
                            fontWeight: FontWeight.bold,
                            fontFamily: 'monospace',
                          ),
                        ),
                      ],
                    ),
                    SliderTheme(
                      data: SliderTheme.of(context).copyWith(
                        activeTrackColor: GaanTheme.primaryPurple,
                        inactiveTrackColor: GaanTheme.borderCharcoal,
                        thumbColor: Colors.white,
                      ),
                      child: Slider(
                        value: player.bassBoostLevel,
                        min: 0.0,
                        max: 1.0,
                        onChanged: (val) {
                          player.setBassBoost(val);
                          setSheetState(() {});
                        },
                      ),
                    ),

                    // 3D Spatial Audio / Virtualizer Toggle
                    SwitchListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text(
                        '3D Spatial Virtualizer',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
                      ),
                      subtitle: const Text(
                        'Concert hall reverberation & wider stereo staging',
                        style: TextStyle(color: GaanTheme.textMuted, fontSize: 11),
                      ),
                      value: player.virtualizerEnabled,
                      activeColor: GaanTheme.primaryPurple,
                      onChanged: (_) {
                        player.toggleVirtualizer();
                        setSheetState(() {});
                      },
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  void _showSleepTimerDialog(BuildContext context, AudioPlayerService player) {
    final options = [
      {'label': '15 minutes', 'val': 15},
      {'label': '30 minutes', 'val': 30},
      {'label': '45 minutes', 'val': 45},
      {'label': '60 minutes', 'val': 60},
      {'label': 'End of this track', 'val': -1},
      {'label': 'Turn off timer', 'val': 0},
    ];

    showModalBottomSheet(
      context: context,
      backgroundColor: GaanTheme.surfaceBlack,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: GaanTheme.borderCharcoal,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Row(
                  children: [
                    Icon(Icons.bedtime, color: GaanTheme.primaryPurple),
                    SizedBox(width: 8),
                    Text(
                      'Bedtime Sleep Timer',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                const Text(
                  'Music stops smoothly when the timer finishes',
                  style: TextStyle(color: GaanTheme.textMuted, fontSize: 12),
                ),
                const SizedBox(height: 14),
                ...options.map((opt) {
                  final val = opt['val'] as int;
                  final isCurrent = player.sleepTimerMinutes == val;
                  return ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                    onTap: () {
                      player.setSleepTimer(val);
                      Navigator.of(ctx).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          backgroundColor: GaanTheme.primaryPurple,
                          content: Text(
                            val == 0
                                ? 'Sleep timer cancelled'
                                : (val == -1
                                    ? 'Music will stop at the end of this track'
                                    : 'Sleep timer set for $val minutes'),
                          ),
                          duration: const Duration(milliseconds: 1500),
                        ),
                      );
                    },
                    title: Text(
                      opt['label'] as String,
                      style: TextStyle(
                        color: isCurrent ? GaanTheme.primaryPurple : Colors.white,
                        fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                      ),
                    ),
                    trailing: isCurrent
                        ? const Icon(Icons.check, color: GaanTheme.primaryPurple)
                        : null,
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  void _showSpeedDialog(BuildContext context, AudioPlayerService player) {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    showModalBottomSheet(
      context: context,
      backgroundColor: GaanTheme.surfaceBlack,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: GaanTheme.borderCharcoal,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Row(
                  children: [
                    Icon(Icons.speed, color: GaanTheme.primaryPurple),
                    SizedBox(width: 8),
                    Text(
                      'Playback Speed',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                ...speeds.map((s) {
                  final isCurrent = player.playbackSpeed == s;
                  return ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                    onTap: () {
                      player.setPlaybackSpeed(s);
                      Navigator.of(ctx).pop();
                    },
                    title: Text(
                      s == 1.0 ? '1.0x (Normal Speed)' : '${s}x',
                      style: TextStyle(
                        color: isCurrent ? GaanTheme.primaryPurple : Colors.white,
                        fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                      ),
                    ),
                    trailing: isCurrent
                        ? const Icon(Icons.check, color: GaanTheme.primaryPurple)
                        : null,
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }
}
