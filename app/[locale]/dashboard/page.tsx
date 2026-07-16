import GithubContributions from "@/modules/dashboard/GithubContributions";
import GithubProfileCard from "@/modules/dashboard/GithubProfileCard";
import SpotifyWidget from "@/modules/dashboard/SpotifyWidget";
import AnalyticsWidget from "@/modules/dashboard/AnalyticsWidget";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Top row: Profile (left) | Spotify + Analytics (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        {/* Left — GitHub Profile */}
        <GithubProfileCard />

        {/* Right — Spotify + Analytics stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SpotifyWidget />
          <AnalyticsWidget />
        </div>
      </div>

      {/* Bottom — Contributions Heatmap (full width) */}
      <GithubContributions />
    </div>
  );
}
