import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Billing from './pages/Billing'
import Shipping from './pages/Shipping'
import Category from './pages/Category'
import Product from './pages/Product'
import Forget from './pages/Forget'

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>

      <footer>
        <p>&copy; 2026 Full Stack Programming Assignment</p>
      </footer>
    </>
  )
}