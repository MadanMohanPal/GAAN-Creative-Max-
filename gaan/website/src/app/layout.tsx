import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/components/PlayerContext";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MiniPlayer } from "@/components/MiniPlayer";
import { FullPlayerModal } from "@/components/FullPlayerModal";

export const metadata: Metadata = {
  title: "GAAN by Creative Max — Stream in True AMOLED",
  description: "High-resolution music streaming ecosystem engineered by Creative Max with true AMOLED dark UI and lossless audio.",
  manifest: "/manifest.json",
  icons: {
    icon: "/creative_max_logo.png",
    apple: "/creative_max_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#000000]">
      <body className="bg-[#000000] text-white flex h-screen overflow-hidden">
        <PlayerProvider>
          {/* Left Navigation Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#000000]">
            <Header />
            <main className="flex-1 overflow-y-auto pb-28 px-6 md:px-8 py-6">
              {children}
            </main>
          </div>

          {/* Bottom Docked Mini Player & Full Screen Player Modal */}
          <MiniPlayer />
          <FullPlayerModal />
        </PlayerProvider>
      </body>
    </html>
  );
}
