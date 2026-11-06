import 'package:flutter/material.dart';
import '../data/sample_catalogue.dart';
import '../theme/gaan_theme.dart';
import '../widgets/song_tile.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final genres = SampleCatalogue.genres;
    final topSongs = SampleCatalogue.songs.take(5).toList();
    final artists = SampleCatalogue.artists;

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      appBar: AppBar(
        title: const Text('Explore'),
        backgroundColor: GaanTheme.amoledBlack,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(bottom: 90),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Quick action pills
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  _buildQuickPill('Charts', Icons.trending_up, GaanTheme.primaryPurple),
                  const SizedBox(width: 8),
                  _buildQuickPill('Moods', Icons.mood, GaanTheme.fuchsiaNeon),
                  const SizedBox(width: 8),
                  _buildQuickPill('New', Icons.new_releases, GaanTheme.violetAccent),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Moods & Genres Section
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                'Moods & Genres',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 2.2,
                ),
                itemCount: genres.length,
                itemBuilder: (context, index) {
                  final genre = genres[index];
                  return Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(14),
                      gradient: LinearGradient(
                        colors: [
                          Color(genre.colorValue).withOpacity(0.4),
                          GaanTheme.surfaceBlack,
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      border: Border.all(
                        color: Color(genre.colorValue).withOpacity(0.3),
                      ),
                    ),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        genre.name,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 24),

            // Top Charts
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                'Top Charts',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: topSongs.length,
              itemBuilder: (context, index) {
                final song = topSongs[index];
                return Row(
                  children: [
                    Container(
                      width: 32,
                      alignment: Alignment.center,
                      child: Text(
                        '#${index + 1}',
                        style: const TextStyle(
                          color: GaanTheme.purpleLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                    Expanded(
                      child: SongTile(song: song, playlistContext: topSongs),
                    ),
                  ],
                );
              },
            ),

            const SizedBox(height: 24),

            // Featured Artists
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                'Featured Artists',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            SizedBox(
              height: 120,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: artists.length,
                separatorBuilder: (context, index) => const SizedBox(width: 16),
                itemBuilder: (context, index) {
                  final artist = artists[index];
                  return Column(
                    children: [
                      CircleAvatar(
                        radius: 36,
                        backgroundImage: NetworkImage(artist.imageUrl),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        artist.name,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickPill(String title, IconData icon, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: GaanTheme.surfaceBlack,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: GaanTheme.borderCharcoal),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 18),
            const SizedBox(width: 6),
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
