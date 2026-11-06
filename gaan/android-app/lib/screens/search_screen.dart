import 'package:flutter/material.dart';
import '../data/sample_catalogue.dart';
import '../theme/gaan_theme.dart';
import '../widgets/song_tile.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _query = '';
  String _activeFilter = 'All';
  final List<String> _filters = ['All', 'Songs', 'Artists', 'Albums'];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cleanQ = _query.toLowerCase().trim();

    final filteredSongs = SampleCatalogue.songs.where((s) {
      return s.title.toLowerCase().contains(cleanQ) ||
          s.artistName.toLowerCase().contains(cleanQ) ||
          (s.genreName?.toLowerCase().contains(cleanQ) ?? false);
    }).toList();

    final filteredArtists = SampleCatalogue.artists.where((a) {
      return a.name.toLowerCase().contains(cleanQ) || a.bio.toLowerCase().contains(cleanQ);
    }).toList();

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      body: SafeArea(
        child: Column(
          children: [
            // Search Input Field
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
              child: Container(
                decoration: BoxDecoration(
                  color: GaanTheme.surfaceBlack,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: GaanTheme.borderCharcoal),
                ),
                child: TextField(
                  controller: _searchController,
                  onChanged: (val) => setState(() => _query = val),
                  style: const TextStyle(color: Colors.white, fontSize: 15),
                  decoration: InputDecoration(
                    hintText: 'Search songs, artists, or genres...',
                    hintStyle: const TextStyle(color: GaanTheme.textMuted, fontSize: 14),
                    prefixIcon: const Icon(Icons.search, color: GaanTheme.primaryPurple),
                    suffixIcon: _query.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, color: GaanTheme.textMuted, size: 20),
                            onPressed: () {
                              _searchController.clear();
                              setState(() => _query = '');
                            },
                          )
                        : null,
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
            ),

            // Filter Chips
            SizedBox(
              height: 40,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _filters.length,
                separatorBuilder: (context, index) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final f = _filters[index];
                  final isSelected = _activeFilter == f;
                  return GestureDetector(
                    onTap: () => setState(() => _activeFilter = f),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: isSelected ? GaanTheme.primaryPurple : GaanTheme.surfaceBlack,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isSelected ? GaanTheme.primaryPurple : GaanTheme.borderCharcoal,
                        ),
                      ),
                      child: Text(
                        f,
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

            const SizedBox(height: 8),

            // Results List
            Expanded(
              child: _query.isEmpty
                  ? _buildEmptyState()
                  : ListView(
                      padding: const EdgeInsets.only(bottom: 90),
                      children: [
                        if (_activeFilter == 'All' || _activeFilter == 'Songs') ...[
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            child: Text(
                              'Songs (${filteredSongs.length})',
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ),
                          ...filteredSongs.map((song) => SongTile(
                                song: song,
                                playlistContext: filteredSongs,
                              )),
                        ],

                        if (_activeFilter == 'All' || _activeFilter == 'Artists') ...[
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            child: Text(
                              'Artists (${filteredArtists.length})',
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ),
                          ...filteredArtists.map((artist) => ListTile(
                                leading: CircleAvatar(
                                  backgroundImage: NetworkImage(artist.imageUrl),
                                ),
                                title: Text(artist.name, style: const TextStyle(color: Colors.white)),
                                subtitle: const Text('Artist', style: TextStyle(color: GaanTheme.textMuted)),
                              )),
                        ],
                      ],
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search, size: 64, color: GaanTheme.textMuted.withOpacity(0.5)),
          const SizedBox(height: 12),
          const Text(
            'Search GAAN catalogue',
            style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 6),
          const Text(
            'Find your favorite synthwave, lo-fi, or ambient tracks',
            style: TextStyle(color: GaanTheme.textMuted, fontSize: 12),
          ),
        ],
      ),
    );
  }
}
