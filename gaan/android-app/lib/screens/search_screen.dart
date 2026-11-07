import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/sample_catalogue.dart';
import '../models/song.dart';
import '../services/audio_player_service.dart';
import '../services/music_search_service.dart';
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
  bool _isLoading = false;
  Timer? _debounce;
  List<Song> _globalSongs = [];
  List<Song> _relatedSongs = [];
  final List<String> _recentSearches = [];

  final List<String> _trending = [
    'Kesariya',
    'Sidhu Moose Wala',
    'Arijit Singh',
    'Taylor Swift',
    'Brown Munde',
    'Coke Studio',
    'Diljit Dosanjh',
    'The Weeknd',
  ];

  @override
  void dispose() {
    _debounce?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged(String val) {
    setState(() => _query = val);
    _debounce?.cancel();

    if (val.trim().isEmpty) {
      setState(() {
        _globalSongs = [];
        _relatedSongs = [];
        _isLoading = false;
      });
      return;
    }

    _debounce = Timer(const Duration(milliseconds: 350), () {
      _performSearch(val.trim());
    });
  }

  Future<void> _performSearch(String query) async {
    setState(() => _isLoading = true);
    if (!_recentSearches.contains(query)) {
      _recentSearches.insert(0, query);
      if (_recentSearches.length > 8) _recentSearches.removeLast();
    }
    try {
      context.read<AudioPlayerService>().addSearchQuery(query);
    } catch (_) {}

    try {
      // Direct standalone in-app search & native DES decryption (no localhost dependency)
      final result = await MusicSearchService.searchMusic(query);

      if (mounted) {
        setState(() {
          _globalSongs = result.songs;
          _relatedSongs = result.relatedSongs;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final cleanQ = _query.toLowerCase().trim();

    // Local catalogue matches
    final localMatches = SampleCatalogue.songs.where((s) {
      return s.title.toLowerCase().contains(cleanQ) ||
          s.artistName.toLowerCase().contains(cleanQ) ||
          (s.genreName?.toLowerCase().contains(cleanQ) ?? false);
    }).toList();

    // Combine local + global
    final seenTitles = localMatches.map((s) => s.title.toLowerCase()).toSet();
    final combinedSongs = _globalSongs.isNotEmpty
        ? _globalSongs
        : [
            ...localMatches,
            ..._globalSongs.where((s) => !seenTitles.contains(s.title.toLowerCase())),
          ];

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
                  onChanged: _onSearchChanged,
                  style: const TextStyle(color: Colors.white, fontSize: 15),
                  decoration: InputDecoration(
                    hintText: 'Search ANY full-length song...',
                    hintStyle: const TextStyle(color: GaanTheme.textMuted, fontSize: 13),
                    prefixIcon: _isLoading
                        ? const Padding(
                            padding: EdgeInsets.all(12),
                            child: SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: GaanTheme.primaryPurple,
                              ),
                            ),
                          )
                        : const Icon(Icons.search, color: GaanTheme.primaryPurple),
                    suffixIcon: _query.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, color: GaanTheme.textMuted, size: 20),
                            onPressed: () {
                              _searchController.clear();
                              _onSearchChanged('');
                            },
                          )
                        : null,
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
            ),

            // Trending search pills
            SizedBox(
              height: 36,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _trending.length,
                separatorBuilder: (context, index) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final t = _trending[index];
                  return GestureDetector(
                    onTap: () {
                      _searchController.text = t;
                      _onSearchChanged(t);
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: GaanTheme.surfaceBlack,
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: GaanTheme.borderCharcoal),
                      ),
                      child: Text(
                        t,
                        style: const TextStyle(
                          color: GaanTheme.textSecondary,
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 8),

            // Filter Chips
            SizedBox(
              height: 36,
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
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Songs & Tracks',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                                const Text(
                                  '⭐ 100% Full Audio',
                                  style: TextStyle(
                                    color: GaanTheme.fuchsiaNeon,
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          ...combinedSongs.map((song) => SongTile(
                                song: song,
                                playlistContext: combinedSongs,
                              )),
                        ],

                        // Mood & Related Songs Suggestions
                        if (_relatedSongs.isNotEmpty && (_activeFilter == 'All' || _activeFilter == 'Songs')) ...[
                          Padding(
                            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                            child: Row(
                              children: [
                                const Icon(Icons.auto_awesome, color: GaanTheme.fuchsiaNeon, size: 16),
                                const SizedBox(width: 6),
                                Text(
                                  'Suggested for this vibe ("$_query")',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          ..._relatedSongs.map((song) => SongTile(
                                song: song,
                                playlistContext: _relatedSongs,
                              )),
                        ],

                        if (_activeFilter == 'All' || _activeFilter == 'Artists') ...[
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            child: const Text(
                              'Artists',
                              style: TextStyle(
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
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      children: [
        if (_recentSearches.isNotEmpty) ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.history, color: GaanTheme.purpleLight, size: 18),
                  SizedBox(width: 6),
                  Text(
                    'Recent Searches',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () => setState(() => _recentSearches.clear()),
                child: const Text(
                  'Clear',
                  style: TextStyle(color: GaanTheme.textMuted, fontSize: 12),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _recentSearches.map((term) {
              return ActionChip(
                backgroundColor: GaanTheme.surfaceBlack,
                side: const BorderSide(color: GaanTheme.borderCharcoal),
                avatar: const Icon(Icons.arrow_outward, size: 14, color: GaanTheme.textMuted),
                label: Text(term, style: const TextStyle(color: Colors.white, fontSize: 12)),
                onPressed: () {
                  _searchController.text = term;
                  _onSearchChanged(term);
                },
              );
            }).toList(),
          ),
          const SizedBox(height: 28),
        ],

        // Suggestions based on mood & trending
        const Row(
          children: [
            Icon(Icons.explore, color: GaanTheme.fuchsiaNeon, size: 18),
            SizedBox(width: 6),
            Text(
              'Trending Searches',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: _trending.map((term) {
            return ActionChip(
              backgroundColor: const Color(0xFF1F132E),
              side: const BorderSide(color: Color(0xFF3B1E54)),
              label: Text(term, style: const TextStyle(color: GaanTheme.purpleLight, fontSize: 12)),
              onPressed: () {
                _searchController.text = term;
                _onSearchChanged(term);
              },
            );
          }).toList(),
        ),

        const SizedBox(height: 36),
        Center(
          child: Column(
            children: [
              Icon(Icons.search, size: 48, color: GaanTheme.textMuted.withOpacity(0.4)),
              const SizedBox(height: 10),
              const Text(
                'Search Any Song Worldwide',
                style: TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 4),
              const Text(
                'JioSaavn & Studio Decryption engine by Creative Max',
                style: TextStyle(color: GaanTheme.textMuted, fontSize: 11),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
