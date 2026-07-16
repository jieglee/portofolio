import GithubContributions from "@/modules/dashboard/GithubContributions";
import GithubProfileCard from "@/modules/dashboard/GithubProfileCard";
import SpotifyWidget from "@/modules/dashboard/SpotifyWidget";
import AnalyticsWidget from "@/modules/dashboard/AnalyticsWidget";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: GitHub Profile + Contributions side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GithubProfileCard />
        <GithubContributions />
      </div>

      {/* Row 2: Spotify + Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SpotifyWidget />
        <AnalyticsWidget />
      </div>
    </div>
  );
}
