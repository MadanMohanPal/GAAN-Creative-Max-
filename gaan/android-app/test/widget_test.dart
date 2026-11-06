import 'package:flutter_test/flutter_test.dart';
import 'package:gaan_app/main.dart';

void main() {
  testWidgets('GAAN App loads and displays splash branding', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const GaanApp());

    // Verify GAAN text is rendered on splash screen
    expect(find.text('GAAN'), findsOneWidget);
    expect(find.text('TRUE AMOLED MUSIC ECOSYSTEM'), findsOneWidget);

    // Advance timer past the 2.2s splash duration to onboarding
    await tester.pump(const Duration(milliseconds: 2500));
    await tester.pumpAndSettle();

    // Verify onboarding screen is now visible
    expect(find.text('True AMOLED Black'), findsOneWidget);
  });
}
