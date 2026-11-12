import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import 'full_player_screen.dart';

class MiniPlayer extends StatefulWidget {
  const MiniPlayer({super.key});

  @override
  State<MiniPlayer> createState() => _MiniPlayerState();
}

class _MiniPlayerState extends State<MiniPlayer> with SingleTickerProviderStateMixin {
  late AnimationController _waveController;

  @override
  void initState() {
    super.initState();
    _waveController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat();
  }

  @override
  void dispose() {
    _waveController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final currentSong = player.currentSong;

    if (currentSong == null) return const SizedBox.shrink();

    final isLiked = player.isLiked(currentSong.id);
    final totalSecs = player.totalDuration.inSeconds > 0
        ? player.totalDuration.inSeconds
        : currentSong.durationSeconds;
    final curSecs = player.currentPosition.inSeconds;
    final progress = totalSecs > 0 ? (curSecs / totalSecs).clamp(0.0, 1.0) : 0.0;

    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(
          PageRouteBuilder(
            pageBuilder: (context, anim, secAnim) => const FullPlayerScreen(),
            transitionsBuilder: (context, anim, secAnim, child) {
              const begin = Offset(0.0, 1.0);
              const end = Offset.zero;
              const curve = Curves.easeOutCubic;
              var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
              return SlideTransition(position: anim.drive(tween), child: child);
            },
          ),
        );
      },
      child: Container(
        height: 66,
        margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF0F0F17),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: player.isPlaying
                ? GaanTheme.primaryPurple.withOpacity(0.5)
                : GaanTheme.borderCharcoal,
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.8),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
            if (player.isPlaying)
              BoxShadow(
                color: GaanTheme.primaryPurple.withOpacity(0.25),
                blurRadius: 12,
                spreadRadius: 1,
              ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Column(
            children: [
              // Micro gradient progress indicator on top
              LinearProgressIndicator(
                value: progress,
                minHeight: 2.5,
                backgroundColor: Colors.transparent,
                valueColor: const AlwaysStoppedAnimation<Color>(GaanTheme.primaryPurple),
              ),

              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Row(
                    children: [
                      // Song Thumbnail with subtle border
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: player.isPlaying
                                ? GaanTheme.primaryPurple.withOpacity(0.6)
                                : Colors.transparent,
                            width: 1.5,
                          ),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(9),
                          child: Image.network(
                            currentSong.coverUrl,
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
                      ),
                      const SizedBox(width: 12),

                      // Title & Artist with Live Equalizer Animation
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    currentSong.title,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13.5,
                                    ),
                                  ),
                                ),
                                if (player.isPlaying) ...[
                                  const SizedBox(width: 6),
                                  // Mini 4-bar dancing equalizer
                                  AnimatedBuilder(
                                    animation: _waveController,
                                    builder: (context, _) {
                                      return Row(
                                        mainAxisSize: MainAxisSize.min,
                                        crossAxisAlignment: CrossAxisAlignment.end,
                                        children: List.generate(4, (i) {
                                          final h = 4.0 + (math.sin((_waveController.value * 2 * math.pi) + (i * 1.2)).abs() * 10.0);
                                          return Container(
                                            width: 2.5,
                                            height: h,
                                            margin: const EdgeInsets.symmetric(horizontal: 1),
                                            decoration: BoxDecoration(
                                              color: GaanTheme.purpleLight,
                                              borderRadius: BorderRadius.circular(1.5),
                                            ),
                                          );
                                        }),
                                      );
                                    },
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              currentSong.artistName,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                color: GaanTheme.textSecondary,
                                fontSize: 11.5,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Heart button
                      IconButton(
                        icon: Icon(
                          isLiked ? Icons.favorite : Icons.favorite_border,
                          size: 20,
                          color: isLiked ? GaanTheme.pinkNeon : GaanTheme.textMuted,
                        ),
                        onPressed: () => player.toggleLike(currentSong.id),
                        splashRadius: 20,
                      ),

                      // Play/Pause button
                      Container(
                        width: 38,
                        height: 38,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: GaanTheme.primaryGradient,
                          boxShadow: [
                            BoxShadow(
                              color: GaanTheme.primaryPurple.withOpacity(player.isPlaying ? 0.5 : 0.2),
                              blurRadius: 8,
                            ),
                          ],
                        ),
                        child: IconButton(
                          padding: EdgeInsets.zero,
                          icon: Icon(
                            player.isPlaying ? Icons.pause : Icons.play_arrow,
                            size: 22,
                            color: Colors.white,
                          ),
                          onPressed: () => player.togglePlay(),
                        ),
                      ),

                      const SizedBox(width: 4),

                      // Skip next
                      IconButton(
                        icon: const Icon(
                          Icons.skip_next,
                          size: 24,
                          color: Colors.white,
                        ),
                        onPressed: () => player.next(),
                        splashRadius: 20,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
