import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Missing url param" }, { status: 400 });
    }

    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const hostname = parsed.hostname;
    const allowed = [
        "tiktokcdn.com",
        "tiktokcdn-eu.com",
        "tiktokcdn-us.com",
        "p16-common-sign.tiktokcdn-eu.com",
        "p19-common-sign.tiktokcdn-eu.com",
    ];

    const isAllowed = allowed.some(
        (h) => hostname === h || hostname.endsWith("." + h)
    );

    if (!isAllowed) {
        return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
    }

    try {
        const res = await fetch(url, {
            headers: {
                Referer: "https://www.tiktok.com/",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: `Upstream ${res.status}` }, { status: res.status });
        }

        const contentType = res.headers.get("content-type") ?? "image/webp";
        const body = await res.arrayBuffer();

        return new NextResponse(body, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400, s-maxage=86400",
            },
        });
    } catch (err) {
        return NextResponse.json({ error: "Proxy fetch failed" }, { status: 502 });
    }
}
