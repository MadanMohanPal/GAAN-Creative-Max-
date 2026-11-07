import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/sample_catalogue.dart';
import '../models/song.dart';
import '../services/audio_player_service.dart';
import '../theme/gaan_theme.dart';
import '../widgets/brand_logo.dart';
import '../widgets/song_tile.dart';
import 'category_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _activeMood = 'All';
  final List<String> _moods = ['All', 'Relax', 'Energize', 'Workout', 'Focus', 'Night Drive'];

  final List<String> _allLanguages = [
    'Hindi',
    'Punjabi',
    'English',
    'Urdu',
    'Bengali',
    'Bhojpuri',
    'Haryanvi',
    'Telugu',
  ];

  void _showGaanUnlimitedSuperpowers(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        decoration: const BoxDecoration(
          color: Color(0xFF0F0B18),
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
          border: Border(top: BorderSide(color: GaanTheme.primaryPurple, width: 1.5)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 44,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 18),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    gradient: GaanTheme.primaryGradient,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Icon(Icons.bolt, color: Colors.white, size: 24),
                ),
                const SizedBox(width: 14),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'GAAN Unlimited',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.2,
                      ),
                    ),
                    Text(
                      'Engineered by Creative Max • All Features Unlocked',
                      style: TextStyle(color: GaanTheme.purpleLight, fontSize: 11),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Divider(color: GaanTheme.borderCharcoal),
            const SizedBox(height: 10),
            _buildSuperpowerTile(
              icon: Icons.music_note,
              title: '100% Full-Length Songs',
              desc: 'Uncut 3 to 6 minute studio songs (Zero 30-second previews).',
              color: GaanTheme.primaryPurple,
            ),
            _buildSuperpowerTile(
              icon: Icons.download_for_offline,
              title: '1-Click Offline MP3 Downloads',
              desc: 'Tap the download icon to save any track directly to your device storage.',
              color: GaanTheme.fuchsiaNeon,
            ),
            _buildSuperpowerTile(
              icon: Icons.search,
              title: 'Worldwide Standalone Search',
              desc: 'Direct in-app JioSaavn search & native DES decryption with no server dependency.',
              color: GaanTheme.pinkNeon,
            ),
            _buildSuperpowerTile(
              icon: Icons.swipe,
              title: 'Swipe to Change Song',
              desc: 'Swipe left/right on the player artwork to skip effortlessly between tracks.',
              color: GaanTheme.violetAccent,
            ),
            _buildSuperpowerTile(
              icon: Icons.translate,
              title: 'Personalized Languages',
              desc: 'Select Hindi, Punjabi, English & more to personalize your entire recommendations feed.',
              color: Colors.amber,
            ),
            _buildSuperpowerTile(
              icon: Icons.cast_connected,
              title: 'Universal Casting & Hi-Res Audio',
              desc: 'Stream lossless 160-320kbps audio to Bluetooth headsets and Smart TVs.',
              color: Colors.tealAccent,
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: GaanTheme.primaryPurple,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Enjoy GAAN Unlimited', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _buildSuperpowerTile({
    required IconData icon,
    required String title,
    required String desc,
    required Color color,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13.5)),
                const SizedBox(height: 2),
                Text(desc, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11.5)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showCastDialog(BuildContext context) {
    final player = context.read<AudioPlayerService>();
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) {
          final cur = player.outputDevice;
          return Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
            decoration: const BoxDecoration(
              color: Color(0xFF0F0B18),
              borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
              border: Border(top: BorderSide(color: GaanTheme.primaryPurple, width: 1.5)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 44,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.white24,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Row(
                  children: [
                    Icon(Icons.cast, color: GaanTheme.purpleLight, size: 22),
                    SizedBox(width: 10),
                    Text(
                      'Connect to a Device',
                      style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                const Text(
                  'Lossless 320kbps Audio Output Engine',
                  style: TextStyle(color: GaanTheme.textMuted, fontSize: 11),
                ),
                const SizedBox(height: 16),
                _buildDeviceTile(
                  icon: Icons.phone_android,
                  name: 'This Phone Speaker',
                  desc: 'Studio output with AMOLED soundscapes',
                  isSelected: cur == GaanOutputDevice.speaker,
                  onTap: () {
                    player.setOutputDevice(GaanOutputDevice.speaker);
                    setModalState(() {});
                    Navigator.pop(ctx);
                  },
                ),
                _buildDeviceTile(
                  icon: Icons.headphones,
                  name: 'Bluetooth Earphones / TWS',
                  desc: 'AptX & Dolby Atmos mode active',
                  isSelected: cur == GaanOutputDevice.bluetooth,
                  onTap: () {
                    player.setOutputDevice(GaanOutputDevice.bluetooth);
                    setModalState(() {});
                    Navigator.pop(ctx);
                  },
                ),
                _buildDeviceTile(
                  icon: Icons.tv,
                  name: 'Living Room Smart TV / Cast',
                  desc: 'Chromecast & AirPlay wireless link',
                  isSelected: cur == GaanOutputDevice.cast,
                  onTap: () {
                    player.setOutputDevice(GaanOutputDevice.cast);
                    setModalState(() {});
                    Navigator.pop(ctx);
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildDeviceTile({
    required IconData icon,
    required String name,
    required String desc,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF26143F) : GaanTheme.surfaceBlack,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSelected ? GaanTheme.primaryPurple : GaanTheme.borderCharcoal,
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: isSelected ? GaanTheme.fuchsiaNeon : GaanTheme.textMuted, size: 24),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(name, style: TextStyle(color: isSelected ? Colors.white : Colors.white70, fontWeight: FontWeight.bold, fontSize: 13)),
                  Text(desc, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11)),
                ],
              ),
            ),
            if (isSelected)
              const Icon(Icons.check_circle, color: GaanTheme.fuchsiaNeon, size: 20),
          ],
        ),
      ),
    );
  }

  void _showNotificationsDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        decoration: const BoxDecoration(
          color: Color(0xFF0F0B18),
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
          border: Border(top: BorderSide(color: GaanTheme.primaryPurple, width: 1.5)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 44,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Row(
              children: [
                Icon(Icons.notifications_active, color: GaanTheme.fuchsiaNeon, size: 22),
                SizedBox(width: 10),
                Text(
                  'Notifications & Updates',
                  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 16),
            _buildNotificationItem(
              title: '🔥 Sidhu Moose Wala Uncut Audio Live',
              subtitle: '295, Moosetape & full discography streaming in 160kbps studio master.',
              time: 'Just now',
            ),
            _buildNotificationItem(
              title: '⚡ 1-Click Offline Downloads Ready',
              subtitle: 'Tap the download icon next to any song to listen offline with 0 data usage.',
              time: '2h ago',
            ),
            _buildNotificationItem(
              title: '✨ Daily Vibe Mix Curated',
              subtitle: 'New tracks added based on your preferred languages & recent searches.',
              time: 'Today',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotificationItem({required String title, required String subtitle, required String time}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: GaanTheme.surfaceBlack,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: GaanTheme.borderCharcoal),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(child: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13))),
              Text(time, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 10)),
            ],
          ),
          const SizedBox(height: 4),
          Text(subtitle, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11.5)),
        ],
      ),
    );
  }

  void _showLanguageSelector(BuildContext context) {
    final player = context.read<AudioPlayerService>();
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) {
          final selected = player.preferredLanguages;
          return Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
            decoration: const BoxDecoration(
              color: Color(0xFF0F0B18),
              borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
              border: Border(top: BorderSide(color: GaanTheme.primaryPurple, width: 1.5)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 44,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.white24,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Row(
                  children: [
                    Icon(Icons.translate, color: Colors.amber, size: 22),
                    SizedBox(width: 10),
                    Text(
                      'Select Music Languages',
                      style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                const Text(
                  'Your feed, quick picks & suggestions will prioritize your selected languages.',
                  style: TextStyle(color: GaanTheme.textMuted, fontSize: 11.5),
                ),
                const SizedBox(height: 18),
                Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: _allLanguages.map((lang) {
                    final isSel = selected.contains(lang);
                    return ChoiceChip(
                      label: Text(lang),
                      selected: isSel,
                      selectedColor: GaanTheme.primaryPurple,
                      backgroundColor: GaanTheme.surfaceBlack,
                      side: BorderSide(
                        color: isSel ? GaanTheme.primaryPurple : GaanTheme.borderCharcoal,
                      ),
                      labelStyle: TextStyle(
                        color: isSel ? Colors.white : GaanTheme.textSecondary,
                        fontWeight: FontWeight.bold,
                        fontSize: 12.5,
                      ),
                      onSelected: (_) {
                        player.toggleLanguage(lang);
                        setModalState(() {});
                        setState(() {});
                      },
                    );
                  }).toList(),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: GaanTheme.primaryPurple,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    onPressed: () => Navigator.pop(ctx),
                    child: const Text('Save Language Preferences', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  // Curate songs dynamically by mood
  List<Song> _getSongsForMood(String mood, List<Song> allSongs) {
    if (mood == 'Relax') {
      return allSongs.where((s) {
        final t = s.title.toLowerCase();
        final a = s.artistName.toLowerCase();
        return t.contains('kesariya') ||
            t.contains('afreen') ||
            t.contains('enna sona') ||
            t.contains('tum hi ho') ||
            t.contains('agar tum') ||
            a.contains('arijit') ||
            a.contains('atif');
      }).toList();
    } else if (mood == 'Energize') {
      return allSongs.where((s) {
        final t = s.title.toLowerCase();
        final a = s.artistName.toLowerCase();
        return t.contains('lover') ||
            t.contains('295') ||
            t.contains('blinding') ||
            t.contains('excuses') ||
            a.contains('diljit') ||
            a.contains('weeknd');
      }).toList();
    } else if (mood == 'Workout') {
      return allSongs.where((s) {
        final a = s.artistName.toLowerCase();
        return a.contains('sidhu') || a.contains('diljit') || a.contains('ap dhillon');
      }).toList();
    } else if (mood == 'Focus') {
      return allSongs.where((s) {
        final g = s.genreName?.toLowerCase() ?? '';
        return g.contains('sufi') || g.contains('synth') || s.title.contains('Afreen');
      }).toList();
    } else if (mood == 'Night Drive') {
      return allSongs.where((s) {
        final t = s.title.toLowerCase();
        final g = s.genreName?.toLowerCase() ?? '';
        return t.contains('cruel') || t.contains('blinding') || g.contains('synth') || t.contains('295');
      }).toList();
    }
    return allSongs;
  }

  @override
  Widget build(BuildContext context) {
    final player = context.watch<AudioPlayerService>();
    final allSongs = SampleCatalogue.songs;
    final artists = SampleCatalogue.artists;
    final albums = SampleCatalogue.albums;
    final preferredLanguages = player.preferredLanguages;

    // Filter by mood
    final moodFiltered = _getSongsForMood(_activeMood, allSongs);
    final displaySongs = moodFiltered.isNotEmpty ? moodFiltered : allSongs;

    // Filter by preferred languages if specified
    final languagePrioritized = displaySongs.where((s) {
      if (preferredLanguages.isEmpty) return true;
      final g = s.genreName?.toLowerCase() ?? '';
      final a = s.artistName.toLowerCase();
      // Match language indicators
      for (final lang in preferredLanguages) {
        final l = lang.toLowerCase();
        if (g.contains(l)) return true;
        if (l == 'punjabi' && (a.contains('sidhu') || a.contains('diljit') || a.contains('dhillon'))) return true;
        if (l == 'hindi' && (a.contains('arijit') || a.contains('pritam') || a.contains('mithoon'))) return true;
        if (l == 'urdu' && (a.contains('atif') || a.contains('rahat') || g.contains('sufi'))) return true;
        if (l == 'english' && (a.contains('taylor') || a.contains('weeknd'))) return true;
      }
      return false;
    }).toList();

    final feedSongs = languagePrioritized.isNotEmpty ? languagePrioritized : displaySongs;

    // Dynamic Quick Picks based on active mood or search history
    List<Song> quickPicks = [];
    String quickPicksSubheader = 'Curated for your vibe';

    if (_activeMood != 'All') {
      quickPicks = moodFiltered.take(5).toList();
      quickPicksSubheader = 'Curated for $_activeMood Mode';
    } else if (player.searchHistory.isNotEmpty) {
      final topQuery = player.searchHistory.first.toLowerCase();
      quickPicks = allSongs.where((s) {
        return s.title.toLowerCase().contains(topQuery) ||
            s.artistName.toLowerCase().contains(topQuery) ||
            (s.genreName?.toLowerCase().contains(topQuery) ?? false);
      }).toList();
      if (quickPicks.isNotEmpty) {
        quickPicksSubheader = 'Based on recent search: "${player.searchHistory.first}"';
      }
    } else if (player.history.isNotEmpty) {
      final lastPlayedArtist = player.history.first.artistName.split(',').first.trim().toLowerCase();
      quickPicks = allSongs.where((s) => s.artistName.toLowerCase().contains(lastPlayedArtist)).toList();
      if (quickPicks.isNotEmpty) {
        quickPicksSubheader = 'More from ${player.history.first.artistName.split(',').first.trim()}';
      }
    }

    if (quickPicks.isEmpty) {
      quickPicks = feedSongs.take(5).toList();
    }

    final trending = feedSongs.skip(2).take(6).toList();
    final history = player.history;

    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      body: CustomScrollView(
        slivers: [
          // AMOLED App Bar with Clickable GAAN Unlimited Logo
          SliverAppBar(
            backgroundColor: GaanTheme.amoledBlack,
            floating: true,
            pinned: false,
            title: GaanLogoMark(
              size: 32,
              showText: true,
              onTap: () => _showGaanUnlimitedSuperpowers(context),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.translate, color: Colors.amber, size: 20),
                tooltip: 'Select Languages',
                onPressed: () => _showLanguageSelector(context),
              ),
              IconButton(
                icon: Icon(
                  player.outputDevice == GaanOutputDevice.speaker ? Icons.cast : Icons.cast_connected,
                  color: player.outputDevice == GaanOutputDevice.speaker ? Colors.white : GaanTheme.fuchsiaNeon,
                  size: 22,
                ),
                tooltip: 'Connect to Device / Cast',
                onPressed: () => _showCastDialog(context),
              ),
              IconButton(
                icon: const Icon(Icons.notifications_none, color: Colors.white, size: 22),
                tooltip: 'Notifications',
                onPressed: () => _showNotificationsDialog(context),
              ),
              const SizedBox(width: 8),
            ],
          ),

          // Mood filter chips (Interactive: All, Relax, Energize, Workout, Focus, Night Drive)
          SliverToBoxAdapter(
            child: SizedBox(
              height: 44,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _moods.length,
                separatorBuilder: (context, index) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final mood = _moods[index];
                  final isSelected = _activeMood == mood;
                  return GestureDetector(
                    onTap: () => setState(() => _activeMood = mood),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        gradient: isSelected ? GaanTheme.primaryGradient : null,
                        color: isSelected ? null : GaanTheme.surfaceBlack,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isSelected ? GaanTheme.fuchsiaNeon : GaanTheme.borderCharcoal,
                        ),
                      ),
                      child: Text(
                        mood,
                        style: TextStyle(
                          color: isSelected ? Colors.white : GaanTheme.textSecondary,
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),

          // Dynamic Hero Banner customized per mood
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.fromLTRB(16, 12, 16, 12),
              height: 145,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                gradient: LinearGradient(
                  colors: _activeMood == 'Workout'
                      ? [const Color(0xFF7C2D12), const Color(0xFF1F0D05), GaanTheme.surfaceBlack]
                      : _activeMood == 'Relax'
                          ? [const Color(0xFF0F3E3E), const Color(0xFF051717), GaanTheme.surfaceBlack]
                          : _activeMood == 'Energize'
                              ? [const Color(0xFF581C87), const Color(0xFF1E0B30), GaanTheme.surfaceBlack]
                              : const [Color(0xFF2D104E), Color(0xFF140827), GaanTheme.surfaceBlack],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                border: Border.all(color: GaanTheme.primaryPurple.withOpacity(0.4)),
              ),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2.5),
                            decoration: BoxDecoration(
                              color: GaanTheme.primaryPurple.withOpacity(0.35),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              _activeMood == 'All' ? 'GAAN UNLIMITED SOUND' : '$_activeMood Station'.toUpperCase(),
                              style: const TextStyle(
                                color: GaanTheme.purpleLight,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.8,
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            _activeMood == 'All'
                                ? 'True AMOLED Experience'
                                : '$_activeMood Flow',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            _activeMood == 'All'
                                ? '100% full uncut audio • 1-click downloads'
                                : 'Curated music for your $_activeMood state',
                            style: const TextStyle(color: GaanTheme.textMuted, fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        if (displaySongs.isNotEmpty) {
                          player.playSong(displaySongs[0], customQueue: displaySongs);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              backgroundColor: GaanTheme.primaryPurple,
                              content: Text('Playing $_activeMood Station'),
                              duration: const Duration(seconds: 2),
                            ),
                          );
                        }
                      },
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: GaanTheme.primaryGradient,
                        ),
                        child: const Icon(Icons.play_arrow, color: Colors.white, size: 30),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Recently Played (History)
          if (history.isNotEmpty) ...[
            const SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.fromLTRB(16, 12, 16, 8),
                child: Row(
                  children: [
                    Icon(Icons.history, color: GaanTheme.fuchsiaNeon, size: 18),
                    SizedBox(width: 8),
                    Text(
                      'Recently Played',
                      style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: SizedBox(
                height: 145,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: history.take(6).length,
                  separatorBuilder: (context, index) => const SizedBox(width: 12),
                  itemBuilder: (context, index) {
                    final song = history[index];
                    return GestureDetector(
                      onTap: () => player.playSong(song, customQueue: history),
                      child: SizedBox(
                        width: 105,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(12),
                              child: Image.network(
                                song.coverUrl,
                                width: 105,
                                height: 105,
                                fit: BoxFit.cover,
                                errorBuilder: (ctx, e, st) => Container(
                                  width: 105,
                                  height: 105,
                                  color: GaanTheme.surfaceBlack,
                                  child: const Icon(Icons.music_note, color: GaanTheme.primaryPurple),
                                ),
                              ),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              song.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              song.artistName,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(color: GaanTheme.textMuted, fontSize: 10),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ],

          // Quick Picks Header (Dynamic from Search History & Vibe)
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.flash_on, color: GaanTheme.primaryPurple, size: 18),
                      SizedBox(width: 8),
                      Text(
                        'Quick Picks',
                        style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  Text(
                    quickPicksSubheader,
                    style: const TextStyle(color: GaanTheme.fuchsiaNeon, fontSize: 11, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ),

          // Quick Picks Song Tiles
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final song = quickPicks[index];
                return SongTile(song: song, playlistContext: quickPicks);
              },
              childCount: quickPicks.length,
            ),
          ),

          // Spotlight Artists Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 20, 16, 12),
              child: Row(
                children: [
                  Icon(Icons.star_rounded, color: Colors.amber, size: 20),
                  SizedBox(width: 8),
                  Text(
                    'Spotlight Artists',
                    style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),

          // Spotlight Artists Horizontal Scroll
          SliverToBoxAdapter(
            child: SizedBox(
              height: 120,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: artists.length,
                separatorBuilder: (context, index) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final artist = artists[index];
                  final artistSongs = allSongs.where((s) {
                    return s.artistName.toLowerCase().contains(artist.name.toLowerCase()) ||
                        s.artistId == artist.id;
                  }).toList();

                  return GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => CategoryDetailScreen(
                            title: artist.name,
                            subtitle: artist.bio,
                            imageUrl: artist.imageUrl,
                            themeColor: GaanTheme.fuchsiaNeon,
                            songs: artistSongs.isNotEmpty ? artistSongs : allSongs,
                          ),
                        ),
                      );
                    },
                    child: SizedBox(
                      width: 85,
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
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ),

          // Recommended Albums Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 20, 16, 12),
              child: Text(
                'Recommended Albums',
                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),

          // Albums Horizontal List
          SliverToBoxAdapter(
            child: SizedBox(
              height: 190,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: albums.length,
                separatorBuilder: (context, index) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final album = albums[index];
                  final albumSongs = allSongs.where((s) {
                    return s.albumId == album.id || (s.albumTitle != null && s.albumTitle == album.title);
                  }).toList();

                  return GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => CategoryDetailScreen(
                            title: album.title,
                            subtitle: '${album.artistName} • ${album.totalTracks} Tracks',
                            imageUrl: album.coverUrl,
                            themeColor: GaanTheme.primaryPurple,
                            songs: albumSongs.isNotEmpty ? albumSongs : allSongs,
                          ),
                        ),
                      );
                    },
                    child: SizedBox(
                      width: 135,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(14),
                            child: Image.network(
                              album.coverUrl,
                              width: 135,
                              height: 135,
                              fit: BoxFit.cover,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            album.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            album.artistName ?? 'Artist',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: GaanTheme.textMuted,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ),

          // Trending Header
          const SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 20, 16, 8),
              child: Row(
                children: [
                  Icon(Icons.local_fire_department, color: GaanTheme.pinkNeon, size: 18),
                  SizedBox(width: 8),
                  Text(
                    'Trending Worldwide',
                    style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),

          // Trending Song List
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final song = trending[index];
                return SongTile(song: song, playlistContext: trending);
              },
              childCount: trending.length,
            ),
          ),

          // Bottom padding for mini player
          const SliverToBoxAdapter(
            child: SizedBox(height: 90),
          ),
        ],
      ),
    );
  }
}
