const achievements = [
  {
    id: 1,
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "2024",
    credential: "2VX3R7DL3ZYQ",
    link: "https://www.dicoding.com/certificates/2VX3R7DL3ZYQ",
    type: "Certificate",
  },
];

export default async function AchievementsPage() {
  return (
    <div className="px-6 py-10 lg:px-12">
      <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
        Achievements
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A collection of certificates and badges I have earned throughout my
        professional and academic journey.
      </p>

      <div className="my-6 border-t border-dashed border-border" />

      <div className="relative w-64">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Total: {achievements.length}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) => (
          
            <a key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-border bg-muted p-4 transition hover:border-primary hover:shadow-sm"
          >
            <span className="w-fit rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
              {item.type}
            </span>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.issuer}</span>
              <span>{item.date}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              ID: {item.credential}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}