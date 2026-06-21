export interface GithubContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubContributionsResponse {
    total: Record<string, number>;
    contributions: GithubContributionDay[];
}

export interface GithubStats {
    total: number;
    thisWeek: number;
    best: number;
    average: number;
}

export const GITHUB_USERNAME = "jieglee";

export function computeStats(days: GithubContributionDay[]): GithubStats {
    if (days.length === 0) {
        return { total: 0, thisWeek: 0, best: 0, average: 0 };
    }

    const total = days.reduce((sum, d) => sum + d.count, 0);
    const best = Math.max(...days.map((d) => d.count));
    const average = Math.round(total / days.length);

    const last7 = days.slice(-7);
    const thisWeek = last7.reduce((sum, d) => sum + d.count, 0);

    return { total, thisWeek, best, average };
}

// Group contribution days into weeks (columns), Sunday-first, like GitHub's graph
export function groupByWeek(
    days: GithubContributionDay[]
): GithubContributionDay[][] {
    if (days.length === 0) return [];

    const weeks: GithubContributionDay[][] = [];
    let currentWeek: GithubContributionDay[] = [];

    const firstDate = new Date(days[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 = Sunday

    // pad the first week with empty cells so columns align like GitHub
    for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push({ date: "", count: -1, level: 0 });
    }

    for (const day of days) {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push({ date: "", count: -1, level: 0 });
        }
        weeks.push(currentWeek);
    }

    return weeks;
}

export const LEVEL_COLORS = [
    "var(--gh-level-0)",
    "var(--gh-level-1)",
    "var(--gh-level-2)",
    "var(--gh-level-3)",
    "var(--gh-level-4)",
];