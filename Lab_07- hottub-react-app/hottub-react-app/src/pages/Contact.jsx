import { useState } from 'react'

import contactImg from '../assets/Contact-us.jpg'
import loginImg from '../assets/Login-page.jpg'
import forgetImg from '../assets/Forget-password.jpg'
import billingImg from '../assets/Edit-Billing-Address.jpg'
import shippingImg from '../assets/Edit-Shipping-Address.jpg'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for your message, ${form.name}!`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <main>
      <h1>Contact Us</h1>

      <img src={contactImg} alt="Contact page design" />

      <p>If you have questions or feedback, please fill out the form below.</p>

      <div className="small-gallery">
        <img src={loginImg} alt="Login reference" />
        <img src={forgetImg} alt="Forget password reference" />
        <img src={billingImg} alt="Edit billing reference" />
        <img src={shippingImg} alt="Edit shipping reference" />
      </div>

      <form onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Message:</label>
        <textarea
          rows="4"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <button type="submit">Send</button>
      </form>
    </main>
  )
}