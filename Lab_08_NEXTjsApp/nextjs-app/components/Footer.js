import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg tracking-tight">◈ LUMIS</p>
          <p className="text-zinc-500 text-sm mt-2">
            Crafting tools for focused, intentional work.
          </p>
        </div>
        <div>
          <p className="text-zinc-300 font-semibold mb-3 text-sm uppercase tracking-widest">
            Pages
          </p>
          <ul className="space-y-2 text-sm text-zinc-500">
            {["/", "/about", "/products", "/contact"].map((href) => (
              <li key={href}>
                <Link href={href} className="hover:text-amber-400 transition-colors capitalize">
                  {href === "/" ? "Home" : href.replace("/", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-zinc-300 font-semibold mb-3 text-sm uppercase tracking-widest">
            Contact
          </p>
          <p className="text-zinc-500 text-sm">hello@lumis.design</p>
          <p className="text-zinc-500 text-sm mt-1">Rawalpindi, Pakistan</p>
        </div>
      </div>
      <div className="border-t border-zinc-800 px-6 py-4 text-center text-zinc-600 text-xs">
        © {new Date().getFullYear()} LUMIS. All rights reserved.
      </div>
    </footer>
  );
}