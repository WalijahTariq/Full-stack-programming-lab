import Link from "next/link";
import { products } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Our Catalog
        </span>
        <h1 className="text-5xl font-black tracking-tighter mt-3 text-white">
          All Products
        </h1>
        <p className="text-zinc-400 mt-3 text-lg">
          {products.length} carefully selected items.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="group bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-8 hover:border-amber-400/50 hover:bg-zinc-800 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 bg-zinc-700/50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-2xl font-black text-amber-400">
                  ${product.price}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {product.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs text-zinc-400 bg-zinc-700/50 border border-zinc-700 px-3 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-6 text-sm font-semibold text-amber-400 group-hover:underline">
                View Details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}