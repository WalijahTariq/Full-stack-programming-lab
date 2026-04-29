import productImg from '../assets/Product-des.jpg'

export default function Product() {
  const handleAddToCart = () => {
    alert('Item added to cart (demo).')
  }

  return (
    <main>
      <h1>Product Description</h1>

      <img src={productImg} alt="Product description reference" />

      <section>
        <h2>Product Details</h2>
        <p>Details about the product.</p>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      </section>
    </main>
  )
}