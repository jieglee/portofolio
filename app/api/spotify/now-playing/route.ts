import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const MOCK_TRACK = {
  isPlaying: false,
  title: "Not Playing",
  artist: "—",
  album: "",
  albumImageUrl: "",
  songUrl: "",
};

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });
  return res.json();
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json(MOCK_TRACK);
  }

  try {
    const { access_token } = await getAccessToken();
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (res.status === 204 || res.status > 400) {
      return NextResponse.json({ ...MOCK_TRACK, isPlaying: false });
    }

    const song = await res.json();
    if (!song?.item) return NextResponse.json({ ...MOCK_TRACK, isPlaying: false });

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists
        .map((a: { name: string }) => a.name)
        .join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url ?? "",
      songUrl: song.item.external_urls.spotify,
      progress_ms: song.progress_ms,
      duration_ms: song.item.duration_ms,
    });
  } catch (err) {
    console.error("[Spotify API]", err);
    return NextResponse.json(MOCK_TRACK);
  }
}
