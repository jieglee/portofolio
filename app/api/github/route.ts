import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "jieglee";

export interface GithubContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubContributionsResponse {
    total: Record<string, number>;
    contributions: GithubContributionDay[];
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || GITHUB_USERNAME;

    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
            {
                next: { revalidate: 3600 }, // cache 1 jam
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch GitHub contributions" },
                { status: res.status }
            );
        }

        const data: GithubContributionsResponse = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}