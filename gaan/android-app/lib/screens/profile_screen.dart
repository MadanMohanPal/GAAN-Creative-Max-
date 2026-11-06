import 'package:flutter/material.dart';
import '../theme/gaan_theme.dart';
import '../widgets/brand_logo.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String _audioQuality = 'Lossless 24-Bit';
  bool _normalizeVolume = true;
  bool _amoledMode = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GaanTheme.amoledBlack,
      appBar: AppBar(
        title: const Text('Account & Settings'),
        backgroundColor: GaanTheme.amoledBlack,
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 90),
        children: [
          // User Card
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: GaanTheme.surfaceBlack,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: GaanTheme.borderCharcoal),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 32,
                  backgroundColor: GaanTheme.primaryPurple,
                  child: const Icon(Icons.person, color: Colors.white, size: 36),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Text(
                            'Guest Auditor',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: GaanTheme.primaryPurple.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text(
                              'PRO',
                              style: TextStyle(
                                color: GaanTheme.purpleLight,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'guest@gaan.audio',
                        style: TextStyle(color: GaanTheme.textMuted, fontSize: 13),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Audio Quality Section
          const Text(
            'AUDIO & PLAYBACK',
            style: TextStyle(
              color: GaanTheme.primaryPurple,
              fontSize: 11,
              fontWeight: FontWeight.bold,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 8),

          Container(
            decoration: BoxDecoration(
              color: GaanTheme.surfaceBlack,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: GaanTheme.borderCharcoal),
            ),
            child: Column(
              children: [
                ListTile(
                  leading: const Icon(Icons.high_quality, color: GaanTheme.purpleLight),
                  title: const Text('Streaming Quality', style: TextStyle(color: Colors.white, fontSize: 14)),
                  subtitle: Text(_audioQuality, style: const TextStyle(color: GaanTheme.textMuted, fontSize: 12)),
                  trailing: DropdownButton<String>(
                    dropdownColor: GaanTheme.surfaceBlack,
                    value: _audioQuality,
                    underline: const SizedBox(),
                    items: const [
                      DropdownMenuItem(value: 'Normal 160k', child: Text('Normal 160k')),
                      DropdownMenuItem(value: 'High 320k', child: Text('High 320k')),
                      DropdownMenuItem(value: 'Lossless 24-Bit', child: Text('Lossless 24-Bit')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _audioQuality = val);
                    },
                  ),
                ),
                const Divider(color: GaanTheme.borderCharcoal, height: 1),
                SwitchListTile(
                  secondary: const Icon(Icons.volume_up, color: GaanTheme.purpleLight),
                  title: const Text('Volume Normalization', style: TextStyle(color: Colors.white, fontSize: 14)),
                  subtitle: const Text('Equalize loudness across songs', style: TextStyle(color: GaanTheme.textMuted, fontSize: 12)),
                  value: _normalizeVolume,
                  activeThumbColor: GaanTheme.primaryPurple,
                  onChanged: (val) => setState(() => _normalizeVolume = val),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Display Section
          const Text(
            'DISPLAY & AMOLED',
            style: TextStyle(
              color: GaanTheme.primaryPurple,
              fontSize: 11,
              fontWeight: FontWeight.bold,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 8),

          Container(
            decoration: BoxDecoration(
              color: GaanTheme.surfaceBlack,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: GaanTheme.borderCharcoal),
            ),
            child: SwitchListTile(
              secondary: const Icon(Icons.brightness_2, color: GaanTheme.purpleLight),
              title: const Text('Pure AMOLED Black (#000000)', style: TextStyle(color: Colors.white, fontSize: 14)),
              subtitle: const Text('Optimized for OLED pixel power saving', style: TextStyle(color: GaanTheme.textMuted, fontSize: 12)),
              value: _amoledMode,
              activeThumbColor: GaanTheme.primaryPurple,
              onChanged: (val) => setState(() => _amoledMode = val),
            ),
          ),

          const SizedBox(height: 32),

          // Brand Footer
          const Center(
            child: Column(
              children: [
                GaanLogoMark(size: 40),
                SizedBox(height: 8),
                Text(
                  'GAAN Phase 1 • Foundation v1.0.0',
                  style: TextStyle(color: GaanTheme.textMuted, fontSize: 11, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 4),
                Text(
                  'Supabase PostgreSQL • Flutter Engine',
                  style: TextStyle(color: GaanTheme.textMuted, fontSize: 10),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
