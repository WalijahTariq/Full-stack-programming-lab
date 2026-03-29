export default function Products() {
  const products = [
    { id: 1, title: "Phone", desc: "Smartphone" },
    { id: 2, title: "Laptop", desc: "Gaming Laptop" }
  ];

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}