export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
        Who We Are
      </span>
      <h1 className="text-5xl font-black tracking-tighter mt-3 mb-6">
        Built by makers,<br />
        <span className="text-amber-400">for makers.</span>
      </h1>
      <p className="text-zinc-400 text-lg leading-relaxed mb-8">
        LUMIS started in a small apartment in Rawalpindi with one goal: stop accepting that good-looking gear has to cost a fortune, and poorly-made gear has to be cheap. We source, test, and curate every product ourselves.
      </p>
      <p className="text-zinc-400 text-lg leading-relaxed mb-16">
        We're a small team of designers, engineers, and obsessive desk-setup enthusiasts. We don't list anything we wouldn't personally use every single day.
      </p>

      {/* Team */}
      <h2 className="text-2xl font-bold mb-8 text-white">The Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Ayesha Raza", role: "Founder & Creative Director", initial: "A" },
          { name: "Omar Tariq", role: "Head of Product", initial: "O" },
          { name: "Sana Malik", role: "Lead Engineer", initial: "S" },
        ].map(({ name, role, initial }) => (
          <div key={name} className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400/40 text-amber-400 font-black text-2xl flex items-center justify-center mx-auto mb-4">
              {initial}
            </div>
            <p className="text-white font-semibold">{name}</p>
            <p className="text-zinc-500 text-sm mt-1">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}