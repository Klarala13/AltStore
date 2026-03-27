import type { AppCardDto } from "@altstore/types";

export const MOCK_APPS: AppCardDto[] = [
  {
    id: "1",
    slug: "opentrack",
    name: "OpenTrack (placeholder)",
    category: "PRODUCTIVITY",
    iconUrl: "",
    coverUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&auto=format&fit=crop",
    shortDesc: "Track your daily habits and build streaks with a clean, minimal interface.",
    platform: "ANDROID",
    latestVersion: "3.2.1",
    latestFileSize: "18.4 MB",
    totalDownloads: 84200,
    rating: 4.7,
  },
  {
    id: "2",
    slug: "vaultpass",
    name: "VaultPass (placeholder)",
    category: "TOOLS",
    iconUrl: "",
    coverUrl:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop",
    shortDesc: "Open source password manager with end-to-end encryption and offline mode.",
    platform: "ANDROID",
    latestVersion: "2.0.0",
    latestFileSize: "12.1 MB",
    totalDownloads: 210400,
    rating: 4.9,
  },
  {
    id: "3",
    slug: "notepilot",
    name: "NotePilot (placeholder)",
    category: "PRODUCTIVITY",
    iconUrl: "",
    coverUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop",
    shortDesc: "Markdown-first note taking with sync across devices. Privacy-first.",
    platform: "BOTH",
    latestVersion: "4.0.2",
    latestFileSize: "22.6 MB",
    totalDownloads: 150000,
    rating: 4.6,
  },
  {
    id: "4",
    slug: "lexify",
    name: "Lexify (placeholder)",
    category: "EDUCATION",
    iconUrl: "",
    coverUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop",
    shortDesc: "Learn new languages with spaced repetition and AI-generated sentences.",
    platform: "ANDROID",
    latestVersion: "2.3.0",
    latestFileSize: "27.3 MB",
    totalDownloads: 91000,
    rating: 4.5,
  },
];
