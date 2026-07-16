export interface GithubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progress_ms?: number;
  duration_ms?: number;
}

export interface WakaStats {
  today: string;
  weekly: string;
  avgPerDay: string;
  currentStreak: number;
  languages: { name: string; percent: number; color: string }[];
}
