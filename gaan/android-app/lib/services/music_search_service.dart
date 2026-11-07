import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:dart_des/dart_des.dart';
import '../data/sample_catalogue.dart';
import '../models/song.dart';

class SearchResultData {
  final List<Song> songs;
  final List<Song> relatedSongs;

  SearchResultData({required this.songs, required this.relatedSongs});
}

class MusicSearchService {
  static final _desKey = utf8.encode('38346591');

  static String _cleanHtml(String text) {
    return text
        .replaceAll('&quot;', '"')
        .replaceAll('&amp;', '&')
        .replaceAll('&#039;', "'")
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>');
  }

  static String? decryptMediaUrl(String encMediaUrl) {
    try {
      final des = DES(key: _desKey, mode: DESMode.ECB, paddingType: DESPaddingType.PKCS7);
      final decryptedBytes = des.decrypt(base64.decode(encMediaUrl.trim()));
      final url = utf8.decode(decryptedBytes);
      if (!url.startsWith('http')) return null;
      return url.replaceAll('_96.mp4', '_160.mp4');
    } catch (e) {
      return null;
    }
  }

  static Future<SearchResultData> searchMusic(String query) async {
    final cleanQ = query.trim().toLowerCase();
    if (cleanQ.isEmpty) {
      return SearchResultData(
        songs: SampleCatalogue.songs,
        relatedSongs: SampleCatalogue.songs.take(4).toList(),
      );
    }

    // 1. Search local curated catalog
    final localMatches = SampleCatalogue.songs.where((s) {
      return s.title.toLowerCase().contains(cleanQ) ||
          s.artistName.toLowerCase().contains(cleanQ) ||
          (s.albumTitle?.toLowerCase().contains(cleanQ) ?? false);
    }).toList();

    final List<Song> globalSongs = [];

    // 2. Direct query to JioSaavn API for worldwide songs
    try {
      final uri = Uri.parse(
          'https://www.jiosaavn.com/api.php?__call=search.getResults&q=${Uri.encodeComponent(query)}&_format=json&_marker=0&ctx=android&p=1&n=30');

      final res = await http.get(uri, headers: {
        'User-Agent':
            'Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json',
      }).timeout(const Duration(seconds: 7));

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        final results = data['results'] as List? ?? [];

        for (final item in results) {
          final encUrl = item['encrypted_media_url'] as String?;
          if (encUrl == null || encUrl.isEmpty) continue;

          final streamUrl = decryptMediaUrl(encUrl);
          if (streamUrl == null) continue;

          final title = _cleanHtml(item['song'] ?? item['title'] ?? 'Unknown');
          final artist = _cleanHtml(item['primary_artists'] ?? item['singers'] ?? item['music'] ?? 'Artist');
          final album = _cleanHtml(item['album'] ?? 'Single');
          final duration = int.tryParse(item['duration']?.toString() ?? '') ?? 240;
          final rawImg = item['image'] as String? ?? '';
          final cover = rawImg.isNotEmpty
              ? rawImg.replaceAll('150x150', '500x500').replaceAll('50x50', '500x500')
              : 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.webp';

          globalSongs.add(
            Song(
              id: 'saavn-${item['id']}',
              title: title,
              artistId: 'artist-${item['id']}',
              artistName: artist,
              albumTitle: album,
              coverUrl: cover,
              audioUrl: streamUrl,
              durationSeconds: duration,
              playsCount: int.tryParse(item['play_count']?.toString() ?? '') ?? 500000,
              likesCount: 15000,
              lyrics: 'Streaming $title by $artist\nMastered by Creative Max Audio Engine',
            ),
          );
        }
      }
    } catch (e) {
      debugPrint('JioSaavn search direct query note: $e');
    }

    // Combine results (avoid duplicate titles)
    final existingTitles = localMatches.map((s) => s.title.toLowerCase()).toSet();
    final combined = [
      ...localMatches,
      ...globalSongs.where((s) => !existingTitles.contains(s.title.toLowerCase())),
    ];

    // Mood & Related Songs recommendations
    List<Song> related = [];
    if (combined.isNotEmpty) {
      final top = combined.first;
      final topPrimaryArtist = top.artistName.split(',').first.trim().toLowerCase();
      related = SampleCatalogue.songs.where((s) {
        if (s.id == top.id) return false;
        return s.artistName.toLowerCase().contains(topPrimaryArtist) ||
            (s.genreName != null && s.genreName == top.genreName);
      }).take(5).toList();
    }
    if (related.isEmpty) {
      related = SampleCatalogue.songs.take(4).toList();
    }

    return SearchResultData(
      songs: combined,
      relatedSongs: related,
    );
  }
}
