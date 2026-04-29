import { Link } from 'react-router-dom'
import categoryImg from '../assets/Category-page.jpg'

export default function Category() {
  return (
    <main>
      <h1>Category</h1>

      <img src={categoryImg} alt="Category page reference" />

      <section>
        <h2>Product Categories</h2>
        <p>Browse our categories here.</p>

        <Link to="/product">View Products</Link>
      </section>
    </main>
  )
}