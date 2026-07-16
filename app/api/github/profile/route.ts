import { NextResponse } from "next/server";

const GITHUB_USERNAME = "jieglee";

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    };

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!profileRes.ok) throw new Error("GitHub profile fetch failed");

    const profile = await profileRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    return NextResponse.json({ profile, repos });
  } catch (err) {
    console.error("[GitHub API]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
