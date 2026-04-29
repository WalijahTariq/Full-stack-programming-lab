import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  if (!product) return notFound();

  const others = products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <Link
        href="/products"
        className="text-sm text-zinc-500 hover:text-amber-400 transition-colors mb-10 inline-block"
      >
        ← Back to Products
      </Link>

      {/* Product Hero */}
      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-3xl p-10 mb-12">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 bg-zinc-700/50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <span className="text-4xl font-black text-amber-400">
            ${product.price}
          </span>
        </div>

        <h1 className="text-4xl font-black tracking-tighter text-white mb-4">
          {product.title}
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">
            Key Specs
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {product.specs.map((spec) => (
              <div
                key={spec}
                className="bg-zinc-700/50 border border-zinc-700 rounded-xl px-4 py-3 text-center text-sm text-zinc-300"
              >
                {spec}
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-amber-400 text-zinc-950 font-bold py-4 rounded-xl hover:bg-amber-300 transition-colors text-lg">
          Add to Cart
        </button>
      </div>

      {/* Other Products */}
      {others.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <div className="group bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-6 hover:border-amber-400/40 transition-all">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
                    {p.category}
                  </p>
                  <p className="text-white font-bold group-hover:text-amber-400 transition-colors">
                    {p.title}
                  </p>
                  <p className="text-amber-400 font-black mt-1">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}