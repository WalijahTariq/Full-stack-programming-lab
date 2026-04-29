import { useState } from 'react'
import shippingImg from '../assets/Edit-Shipping-Address.jpg'

export default function Shipping() {
  const [form, setForm] = useState({ name: '', address: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('shipping', JSON.stringify(form))
    alert('Shipping address saved.')
    setForm({ name: '', address: '' })
  }

  return (
    <main>
      <h1>Edit Shipping Address</h1>

      <img src={shippingImg} alt="Edit shipping address reference" />

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Address:</label>
        <textarea
          rows="3"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />

        <button type="submit">Save</button>
      </form>
    </main>
  )
}