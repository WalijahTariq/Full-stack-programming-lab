import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Hero */}
      <div className="text-center mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-4 py-1.5 rounded-full mb-6">
          Curated Tech for Modern Desks
        </span>
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white leading-none mb-6">
          Design-Led<br />
          <span className="text-amber-400">Everyday Tools</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
          We obsess over the details so your workspace doesn't have to compromise between beauty and function.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="bg-amber-400 text-zinc-950 font-bold px-8 py-3 rounded-full hover:bg-amber-300 transition-colors"
          >
            Shop Products
          </Link>
          <Link
            href="/about"
            className="border border-zinc-700 text-zinc-300 font-medium px-8 py-3 rounded-full hover:border-zinc-500 hover:text-white transition-colors"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "◎", title: "Minimal by Default", desc: "Every product stripped to its essential purpose. Nothing superfluous." },
          { icon: "◈", title: "Built to Last", desc: "Premium materials and rigorous quality testing on every SKU." },
          { icon: "◉", title: "Thoughtfully Priced", desc: "Fair pricing with no inflated brand tax. Quality without the markup." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 hover:border-amber-400/30 transition-colors">
            <div className="text-3xl text-amber-400 mb-4">{icon}</div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}