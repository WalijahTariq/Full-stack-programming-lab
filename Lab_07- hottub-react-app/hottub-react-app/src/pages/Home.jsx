import { Link } from 'react-router-dom'
import homeImg from '../assets/Hottub_main_F.jpg'

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Project</h1>
      <p>This is the home page for the assignment.</p>

      <section>
        <h2>Featured</h2>
        <p>
          Use this area for a short introduction or a screenshot from the final pages reference.
        </p>

        <img src={homeImg} alt="Homepage featured image" />
      </section>

      <section>
        <h2>Navigation</h2>
        <p>
          <Link to="/about">About</Link> |{" "}
          <Link to="/contact">Contact</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/account">Account</Link> |{" "}
          <Link to="/category">Category</Link> |{" "}
          <Link to="/product">Product</Link>
        </p>
      </section>
    </main>
  )
}