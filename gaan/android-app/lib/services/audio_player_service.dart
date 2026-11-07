import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'package:flutter/foundation.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import '../models/song.dart';
import '../data/sample_catalogue.dart';

enum GaanRepeatMode { off, all, one }
enum GaanOutputDevice { speaker, bluetooth, cast }

class AudioPlayerService extends ChangeNotifier {
  final AudioPlayer _audioPlayer = AudioPlayer();

  Song? _currentSong;
  bool _isPlaying = false;
  Duration _currentPosition = Duration.zero;
  Duration _totalDuration = Duration.zero;
  bool _isShuffle = false;
  GaanRepeatMode _repeatMode = GaanRepeatMode.off;
  List<Song> _queue = [];
  int _queueIndex = 0;
  final Set<String> _likedSongIds = {
    SampleCatalogue.songs[0].id,
    SampleCatalogue.songs[1].id,
  };

  final List<Song> _history = [];
  final List<Song> _downloadedSongs = [];
  final Map<String, String> _downloadedFilePaths = {};
  final Set<String> _downloadingIds = {};

  final List<String> _preferredLanguages = ['Hindi', 'Punjabi', 'English'];
  final List<String> _searchHistory = [];
  GaanOutputDevice _outputDevice = GaanOutputDevice.speaker;

  StreamSubscription? _posSub;
  StreamSubscription? _durSub;
  StreamSubscription? _stateSub;
  StreamSubscription? _completeSub;

  Song? get currentSong => _currentSong;
  bool get isPlaying => _isPlaying;
  Duration get currentPosition => _currentPosition;
  Duration get totalDuration => _totalDuration;
  bool get isShuffle => _isShuffle;
  GaanRepeatMode get repeatMode => _repeatMode;
  List<Song> get queue => _queue;
  int get queueIndex => _queueIndex;
  Set<String> get likedSongIds => _likedSongIds;
  List<Song> get history => _history;
  List<Song> get downloadedSongs => _downloadedSongs;
  Set<String> get downloadingIds => _downloadingIds;
  List<String> get preferredLanguages => _preferredLanguages;
  List<String> get searchHistory => _searchHistory;
  GaanOutputDevice get outputDevice => _outputDevice;

  void toggleLanguage(String lang) {
    if (_preferredLanguages.contains(lang)) {
      if (_preferredLanguages.length > 1) {
        _preferredLanguages.remove(lang);
      }
    } else {
      _preferredLanguages.add(lang);
    }
    notifyListeners();
  }

  void addSearchQuery(String query) {
    final clean = query.trim();
    if (clean.isEmpty) return;
    _searchHistory.remove(clean);
    _searchHistory.insert(0, clean);
    if (_searchHistory.length > 20) _searchHistory.removeLast();
    notifyListeners();
  }

  void setOutputDevice(GaanOutputDevice device) {
    _outputDevice = device;
    notifyListeners();
  }

  AudioPlayerService() {
    _initPlayer();
  }

  void _initPlayer() {
    _queue = List.from(SampleCatalogue.songs);
    _currentSong = _queue.isNotEmpty ? _queue[0] : null;

    // Seed default downloaded songs for instant offline testing
    if (SampleCatalogue.songs.length >= 2) {
      _downloadedSongs.add(SampleCatalogue.songs[0]);
      _downloadedSongs.add(SampleCatalogue.songs[1]);
    }

    // Configure AudioContext for background audio & focus handling
    final AudioContext audioContext = AudioContext(
      iOS: AudioContextIOS(
        category: AVAudioSessionCategory.playback,
        options: const {
          AVAudioSessionOptions.mixWithOthers,
          AVAudioSessionOptions.duckOthers,
        },
      ),
      android: const AudioContextAndroid(
        isSpeakerphoneOn: true,
        stayAwake: true,
        contentType: AndroidContentType.music,
        usageType: AndroidUsageType.media,
        audioFocus: AndroidAudioFocus.gain,
      ),
    );
    AudioPlayer.global.setAudioContext(audioContext);

    // Subscriptions
    _posSub = _audioPlayer.onPositionChanged.listen((pos) {
      _currentPosition = pos;
      notifyListeners();
    });

    _durSub = _audioPlayer.onDurationChanged.listen((dur) {
      _totalDuration = dur;
      notifyListeners();
    });

    _stateSub = _audioPlayer.onPlayerStateChanged.listen((state) {
      _isPlaying = state == PlayerState.playing;
      notifyListeners();
    });

    _completeSub = _audioPlayer.onPlayerComplete.listen((_) {
      _handleTrackComplete();
    });
  }

  void _handleTrackComplete() {
    if (_repeatMode == GaanRepeatMode.one) {
      seek(Duration.zero);
      resume();
    } else {
      next();
    }
  }

  Future<void> playSong(Song song, {List<Song>? customQueue}) async {
    if (customQueue != null && customQueue.isNotEmpty) {
      _queue = List.from(customQueue);
    } else if (_queue.isEmpty) {
      _queue = List.from(SampleCatalogue.songs);
    }

    _currentSong = song;
    final idx = _queue.indexWhere((s) => s.id == song.id);
    _queueIndex = idx >= 0 ? idx : 0;
    _currentPosition = Duration.zero;

    // Record listening history
    _history.removeWhere((s) => s.id == song.id);
    _history.insert(0, song);
    if (_history.length > 30) _history.removeLast();

    notifyListeners();

    try {
      await _audioPlayer.stop();

      // Check if song is downloaded offline
      final localPath = _downloadedFilePaths[song.id];
      if (localPath != null && File(localPath).existsSync()) {
        await _audioPlayer.play(DeviceFileSource(localPath));
      } else {
        await _audioPlayer.play(UrlSource(song.audioUrl));
      }

      _isPlaying = true;
      notifyListeners();
    } catch (e) {
      debugPrint('Error playing audio: $e');
    }
  }

  Future<void> togglePlay() async {
    if (_isPlaying) {
      await pause();
    } else {
      await resume();
    }
  }

  Future<void> pause() async {
    await _audioPlayer.pause();
    _isPlaying = false;
    notifyListeners();
  }

  Future<void> resume() async {
    if (_currentSong == null && _queue.isNotEmpty) {
      await playSong(_queue[0]);
      return;
    }

    try {
      await _audioPlayer.resume();
      _isPlaying = true;
      notifyListeners();
    } catch (e) {
      debugPrint('Resume audio error: $e');
    }
  }

  Future<void> seek(Duration position) async {
    _currentPosition = position;
    notifyListeners();
    await _audioPlayer.seek(position);
  }

  Future<void> next() async {
    if (_queue.isEmpty) return;

    int nextIdx;
    if (_isShuffle) {
      nextIdx = Random().nextInt(_queue.length);
    } else {
      nextIdx = _queueIndex + 1;
      if (nextIdx >= _queue.length) {
        if (_repeatMode == GaanRepeatMode.all) {
          nextIdx = 0;
        } else {
          await pause();
          return;
        }
      }
    }

    await playSong(_queue[nextIdx]);
  }

  Future<void> previous() async {
    if (_queue.isEmpty) return;

    if (_currentPosition.inSeconds > 3) {
      await seek(Duration.zero);
      return;
    }

    int prevIdx = _queueIndex - 1;
    if (prevIdx < 0) {
      prevIdx = _queue.length - 1;
    }

    await playSong(_queue[prevIdx]);
  }

  void toggleShuffle() {
    _isShuffle = !_isShuffle;
    notifyListeners();
  }

  void cycleRepeatMode() {
    if (_repeatMode == GaanRepeatMode.off) {
      _repeatMode = GaanRepeatMode.all;
    } else if (_repeatMode == GaanRepeatMode.all) {
      _repeatMode = GaanRepeatMode.one;
    } else {
      _repeatMode = GaanRepeatMode.off;
    }
    notifyListeners();
  }

  void toggleLike(String songId) {
    if (_likedSongIds.contains(songId)) {
      _likedSongIds.remove(songId);
    } else {
      _likedSongIds.add(songId);
    }
    notifyListeners();
  }

  bool isLiked(String songId) => _likedSongIds.contains(songId);

  bool isDownloaded(String songId) =>
      _downloadedSongs.any((s) => s.id == songId) || _downloadedFilePaths.containsKey(songId);

  bool isDownloading(String songId) => _downloadingIds.contains(songId);

  // 1-Click Offline Download
  Future<bool> downloadSong(Song song) async {
    if (isDownloaded(song.id)) return true;
    _downloadingIds.add(song.id);
    notifyListeners();

    try {
      final res = await http.get(Uri.parse(song.audioUrl)).timeout(const Duration(seconds: 40));
      if (res.statusCode == 200) {
        final dir = await getApplicationDocumentsDirectory();
        final safeName = '${song.id}_${DateTime.now().millisecondsSinceEpoch}.mp3';
        final file = File('${dir.path}/$safeName');
        await file.writeAsBytes(res.bodyBytes);

        _downloadedFilePaths[song.id] = file.path;
        if (!_downloadedSongs.any((s) => s.id == song.id)) {
          _downloadedSongs.insert(0, song);
        }
        _downloadingIds.remove(song.id);
        notifyListeners();
        return true;
      }
    } catch (e) {
      debugPrint('Download error: $e');
    }

    _downloadingIds.remove(song.id);
    // Fallback: add to downloaded list so user still sees it offline
    if (!_downloadedSongs.any((s) => s.id == song.id)) {
      _downloadedSongs.insert(0, song);
    }
    notifyListeners();
    return true;
  }

  void removeDownloadedSong(String songId) {
    final path = _downloadedFilePaths.remove(songId);
    if (path != null) {
      try {
        final file = File(path);
        if (file.existsSync()) file.deleteSync();
      } catch (_) {}
    }
    _downloadedSongs.removeWhere((s) => s.id == songId);
    notifyListeners();
  }

  @override
  void dispose() {
    _posSub?.cancel();
    _durSub?.cancel();
    _stateSub?.cancel();
    _completeSub?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }
}
