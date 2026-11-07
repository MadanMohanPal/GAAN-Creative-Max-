import 'package:flutter/material.dart';
import '../data/sample_catalogue.dart';
import '../models/song.dart';
import '../theme/gaan_theme.dart';
import '../widgets/song_tile.dart';
import 'category_detail_screen.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  void _openCategory(
    BuildContext context, {
    required String title,
    required String subtitle,
    required String imageUrl,
    required Color color,
    required List<Song> songs,
  }) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => CategoryDetailScreen(
          title: title,
          subtitle: subtitle,
          imageUrl: imageUrl,
          themeColor: color,
          songs: songs.isNotEmpty ? songs : SampleCatalogue.songs,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final genres = SampleCatalogue.genres;
    final allSongs = SampleCatalogue.songs;
    final topSongs = allSongs.take(6).toList();
    final artists = SampleCatalogue.artists;

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      appBar: AppBar(
        title: const Text('Explore & Discover', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
        backgroundColor: GaanTheme.amoledBlack,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(bottom: 90),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Quick action pills (Charts, Moods, New)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  _buildQuickPill(
                    title: 'Charts',
                    icon: Icons.trending_up,
                    color: GaanTheme.primaryPurple,
                    onTap: () {
                      _openCategory(
                        context,
                        title: 'Top 50 India & Global Charts',
                        subtitle: 'Most streamed tracks this week • 100% Full Audio',
                        imageUrl: 'https://c.saavncdn.com/609/Moosetape-Punjabi-2021-20260626155141-500x500.webp',
                        color: GaanTheme.primaryPurple,
                        songs: allSongs,
                      );
                    },
                  ),
                  const SizedBox(width: 8),
                  _buildQuickPill(
                    title: 'Moods',
                    icon: Icons.mood,
                    color: GaanTheme.fuchsiaNeon,
                    onTap: () {
                      _openCategory(
                        context,
                        title: 'Mood & Vibe Mix',
                        subtitle: 'Curated soundscapes for study, relax & drive',
                        imageUrl: 'https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.webp',
                        color: GaanTheme.fuchsiaNeon,
                        songs: allSongs.reversed.toList(),
                      );
                    },
                  ),
                  const SizedBox(width: 8),
                  _buildQuickPill(
                    title: 'New Drops',
                    icon: Icons.new_releases,
                    color: GaanTheme.violetAccent,
                    onTap: () {
                      _openCategory(
                        context,
                        title: 'New Releases 2026',
                        subtitle: 'Fresh Punjabi, Bollywood & Global studio singles',
                        imageUrl: 'https://c.saavncdn.com/209/MoonChild-Era-Punjabi-2021-20240715073449-500x500.webp',
                        color: GaanTheme.violetAccent,
                        songs: allSongs.where((s) => s.artistName.contains('Diljit') || s.artistName.contains('Sidhu') || s.artistName.contains('Arijit')).toList(),
                      );
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Moods & Genres Section Header
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

            // Moods & Genres Clickable Grid
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
                  final genreColor = Color(genre.colorValue);

                  final genreSongs = allSongs.where((s) {
                    return s.genreId == genre.id ||
                        (s.genreName != null && s.genreName!.toLowerCase().contains(genre.name.toLowerCase().split(' ').first));
                  }).toList();

                  return InkWell(
                    onTap: () {
                      _openCategory(
                        context,
                        title: genre.name,
                        subtitle: 'Non-stop ${genre.name} • Mastered by Creative Max',
                        imageUrl: genre.imageUrl,
                        color: genreColor,
                        songs: genreSongs.isNotEmpty ? genreSongs : allSongs,
                      );
                    },
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        gradient: LinearGradient(
                          colors: [
                            genreColor.withOpacity(0.4),
                            GaanTheme.surfaceBlack,
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        border: Border.all(
                          color: genreColor.withOpacity(0.35),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              genre.name,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Icon(Icons.arrow_forward_ios, color: Colors.white38, size: 12),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 24),

            // Top Charts Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Top Charts India & Global',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      _openCategory(
                        context,
                        title: 'Top 50 India & Global',
                        subtitle: 'Daily Top Songs • Creative Max Lossless Audio',
                        imageUrl: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp',
                        color: GaanTheme.primaryPurple,
                        songs: allSongs,
                      );
                    },
                    child: const Text(
                      'View All',
                      style: TextStyle(color: GaanTheme.purpleLight, fontSize: 12, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),

            // Top Charts List
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: topSongs.length,
              itemBuilder: (context, index) {
                final song = topSongs[index];
                return Row(
                  children: [
                    Container(
                      width: 36,
                      alignment: Alignment.center,
                      child: Text(
                        '#${index + 1}',
                        style: TextStyle(
                          color: index < 3 ? GaanTheme.fuchsiaNeon : GaanTheme.textMuted,
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
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

            // Featured Artists Header
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                'Spotlight Artists',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            // Featured Artists Horizontal Scroll with Tap-To-View
            SizedBox(
              height: 125,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: artists.length,
                separatorBuilder: (context, index) => const SizedBox(width: 16),
                itemBuilder: (context, index) {
                  final artist = artists[index];
                  final artistSongs = allSongs.where((s) {
                    return s.artistName.toLowerCase().contains(artist.name.toLowerCase()) ||
                        s.artistId == artist.id;
                  }).toList();

                  return GestureDetector(
                    onTap: () {
                      _openCategory(
                        context,
                        title: artist.name,
                        subtitle: artist.bio,
                        imageUrl: artist.imageUrl,
                        color: GaanTheme.fuchsiaNeon,
                        songs: artistSongs.isNotEmpty ? artistSongs : allSongs,
                      );
                    },
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 36,
                          backgroundImage: NetworkImage(artist.imageUrl),
                          backgroundColor: GaanTheme.surfaceBlack,
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
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickPill({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: GaanTheme.surfaceBlack,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: color.withOpacity(0.4)),
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
      ),
    );
  }
}
