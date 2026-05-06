async function getProducts() {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Ecommerce Store
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow rounded-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />

            <h2 className="text-xl mt-2 font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-600">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}