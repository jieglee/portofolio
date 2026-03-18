export default function Home() {
  return (
    <div className="px-6 py-10 lg:px-12">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
        Hi, I&apos;m Anindita Amantaruna 👋
      </h1>

      {/* Meta info */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
  <span className="flex items-center gap-1">
    <span className="text-muted-foreground">•</span>
    Based in West Java, Indonesia 🇮🇩
  </span>
</div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Bio */}
      <div className="flex max-w-2xl flex-col gap-4 text-foreground/80 leading-relaxed">
        <p>
          A passionate <span className="font-semibold text-foreground">Frontend Developer</span> dedicated to building beautiful and functional digital experiences. I specialize in developing modern web and mobile applications using a clean, minimal aesthetic.
        </p>
        <p>
          My focus is on crafting interfaces that are not only visually appealing but also intuitive and accessible. I combine technical skills with an eye for design to ensure every project feels polished and purposeful.
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-border" />

      {/* Skills teaser */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          &lt;/&gt; Skills
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">My professional skills.</p>
      </div>
    </div>
  );
}