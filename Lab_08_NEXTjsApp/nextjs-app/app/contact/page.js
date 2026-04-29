export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
        Get In Touch
      </span>
      <h1 className="text-5xl font-black tracking-tighter mt-3 mb-4">
        We'd love to<br />
        <span className="text-amber-400">hear from you.</span>
      </h1>
      <p className="text-zinc-400 mb-12">
        Questions, partnerships, or just want to share your setup? Drop us a message.
      </p>

      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">First Name</label>
            <input
              type="text"
              placeholder="Ali"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Khan"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Email</label>
          <input
            type="email"
            placeholder="ali@example.com"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Message</label>
          <textarea
            rows={5}
            placeholder="Tell us what's on your mind..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl hover:bg-amber-300 transition-colors"
        >
          Send Message →
        </button>
      </form>
    </div>
  );
}