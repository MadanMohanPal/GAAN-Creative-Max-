import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import 'full_player_screen.dart';

class MiniPlayer extends StatelessWidget {
  const MiniPlayer({super.key});

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
        height: 64,
        margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: const Color(0xFF0F0F17),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: GaanTheme.borderCharcoal,
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.8),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
            BoxShadow(
              color: GaanTheme.primaryPurple.withOpacity(0.15),
              blurRadius: 8,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Column(
            children: [
              // Micro progress indicator on top
              LinearProgressIndicator(
                value: progress,
                minHeight: 2,
                backgroundColor: Colors.transparent,
                valueColor: const AlwaysStoppedAnimation<Color>(GaanTheme.primaryPurple),
              ),

              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Row(
                    children: [
                      // Song Thumbnail
                      ClipRRect(
                        borderRadius: BorderRadius.circular(10),
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
                      const SizedBox(width: 12),

                      // Title & Artist
                      Expanded(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              currentSong.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 13.5,
                              ),
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
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: GaanTheme.primaryGradient,
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
