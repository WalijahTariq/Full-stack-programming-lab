import { useState } from 'react'
import billingImg from '../assets/Edit-Billing-Address.jpg'

export default function Billing() {
  const [form, setForm] = useState({ name: '', address: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('billing', JSON.stringify(form))
    alert('Billing address saved.')
    setForm({ name: '', address: '' })
  }

  return (
    <main>
      <h1>Edit Billing Address</h1>

      <img src={billingImg} alt="Edit billing address reference" />

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