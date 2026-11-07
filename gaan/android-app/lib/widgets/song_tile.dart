import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/song.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';

class SongTile extends StatelessWidget {
  final Song song;
  final List<Song>? playlistContext;

  const SongTile({
    super.key,
    required this.song,
    this.playlistContext,
  });

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final isCurrent = player.currentSong?.id == song.id;

    return InkWell(
      onTap: () {
        player.playSong(song, customQueue: playlistContext);
      },
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            // Cover Image
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Stack(
                children: [
                  Image.network(
                    song.coverUrl,
                    width: 52,
                    height: 52,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) => Container(
                      width: 52,
                      height: 52,
                      color: GaanTheme.charcoalCard,
                      child: const Icon(Icons.music_note, color: GaanTheme.primaryPurple),
                    ),
                  ),
                  if (isCurrent && player.isPlaying)
                    Container(
                      width: 52,
                      height: 52,
                      color: Colors.black.withOpacity(0.5),
                      child: const Center(
                        child: Icon(Icons.equalizer, color: GaanTheme.purpleLight, size: 24),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(width: 14),

            // Title & Artist
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    song.title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: isCurrent ? GaanTheme.purpleLight : Colors.white,
                      fontSize: 14.5,
                      fontWeight: isCurrent ? FontWeight.bold : FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    '${song.artistName} • ${song.genreName ?? "Stream"}',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: GaanTheme.textMuted,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),

            // Duration
            Text(
              '${song.durationSeconds ~/ 60}:${(song.durationSeconds % 60).toString().padLeft(2, '0')}',
              style: const TextStyle(
                color: GaanTheme.textMuted,
                fontSize: 11,
                fontFamily: 'monospace',
              ),
            ),
            const SizedBox(width: 4),

            // 1-Click Offline Download Button
            if (player.isDownloading(song.id))
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 10),
                child: SizedBox(
                  width: 18,
                  height: 18,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: GaanTheme.fuchsiaNeon,
                  ),
                ),
              )
            else
              IconButton(
                icon: Icon(
                  player.isDownloaded(song.id)
                      ? Icons.check_circle
                      : Icons.download_for_offline_outlined,
                  size: 20,
                  color: player.isDownloaded(song.id)
                      ? GaanTheme.fuchsiaNeon
                      : GaanTheme.textMuted,
                ),
                tooltip: player.isDownloaded(song.id) ? 'Downloaded Offline' : 'Download Song',
                onPressed: () async {
                  if (player.isDownloaded(song.id)) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        backgroundColor: GaanTheme.charcoalCard,
                        content: Text('✓ "${song.title}" is saved for offline listening'),
                        duration: const Duration(seconds: 2),
                      ),
                    );
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        backgroundColor: GaanTheme.primaryPurple,
                        content: Text('Downloading "${song.title}"...'),
                        duration: const Duration(seconds: 1),
                      ),
                    );
                    final ok = await player.downloadSong(song);
                    if (ok && context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          backgroundColor: GaanTheme.purpleLight,
                          content: Text('✓ "${song.title}" downloaded successfully!'),
                          duration: const Duration(seconds: 2),
                        ),
                      );
                    }
                  }
                },
              ),
          ],
        ),
      ),
    );
  }
}
