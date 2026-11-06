import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../data/sample_catalogue.dart';
import '../models/song.dart';
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
        _isLoading = false;
      });
      return;
    }

    _debounce = Timer(const Duration(milliseconds: 400), () {
      _performSearch(val.trim());
    });
  }

  Future<void> _performSearch(String query) async {
    setState(() => _isLoading = true);
    try {
      final uri = Uri.parse(
          'https://itunes.apple.com/search?term=${Uri.encodeComponent(query)}&entity=song&limit=30');
      final res = await http.get(uri);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        final List results = data['results'] ?? [];
        final List<Song> parsed = results.map((item) {
          final trackId = item['trackId']?.toString() ?? UniqueKey().toString();
          final title = item['trackName'] ?? 'Unknown Song';
          final artist = item['artistName'] ?? 'Unknown Artist';
          final album = item['collectionName'] ?? item['trackName'] ?? 'Single';
          final rawArt = item['artworkUrl100'] as String?;
          final cover = rawArt != null
              ? rawArt.replaceAll('100x100bb', '600x600bb')
              : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80';
          final audioUrl = item['previewUrl'] ?? '';
          final durationSec = ((item['trackTimeMillis'] ?? 30000) / 1000).round();
          final genre = item['primaryGenreName'] ?? 'Pop';

          return Song(
            id: 'global_$trackId',
            title: title,
            artistId: 'artist_$trackId',
            artistName: artist,
            albumTitle: album,
            durationSeconds: durationSec,
            audioUrl: audioUrl,
            coverUrl: cover,
            genreName: genre,
            lyrics: 'Streaming $title by $artist\nHigh Fidelity Audio Fidelity on GAAN',
          );
        }).where((s) => s.audioUrl.isNotEmpty).toList();

        if (mounted) {
          setState(() {
            _globalSongs = parsed;
            _isLoading = false;
          });
        }
      } else {
        if (mounted) setState(() => _isLoading = false);
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
    final combinedSongs = [
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
                    hintText: 'Search ANY song, artist or playlist...',
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
                                  'Songs (${combinedSongs.length})',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                                if (_globalSongs.isNotEmpty)
                                  const Text(
                                    '🌍 Worldwide Catalog',
                                    style: TextStyle(
                                      color: GaanTheme.violetAccent,
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
            'Search Any Song in the World',
            style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 6),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              'Search Bollywood, Coke Studio, Punjabi, English Pop, or Bengali hits',
              textAlign: TextAlign.center,
              style: TextStyle(color: GaanTheme.textMuted, fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
