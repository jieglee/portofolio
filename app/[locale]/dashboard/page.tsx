import GithubContributions from "@/modules/dashboard/GithubContributions";
import GithubProfileCard from "@/modules/dashboard/GithubProfileCard";
import GithubReposCard from "@/modules/dashboard/GithubReposCard";
import SpotifyWidget from "@/modules/dashboard/SpotifyWidget";
import AnalyticsWidget from "@/modules/dashboard/AnalyticsWidget";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-6 py-6 px-4 sm:px-6">

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          A live overview of my coding activity and online presence.
        </p>
      </div>

      <div className="h-px w-full border-t border-dashed border-border" />

      {/* Row 1: GitHub Profile + Repos (kiri) | Contributions (kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 items-start">
        {/* Kiri — Profile atas, Repos bawah */}
        <div className="flex flex-col gap-4">
          <GithubProfileCard />
          <GithubReposCard />
        </div>

        {/* Kanan — Contributions full height */}
        <GithubContributions />
      </div>

      {/* Row 2: Spotify + Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SpotifyWidget />
        <AnalyticsWidget />
      </div>

    </div>
  );
}