import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/product">Product</Link></li>
      </ul>
    </nav>
  )
}