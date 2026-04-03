import { useState } from 'react'
import registerImg from '../assets/Register.jpg'

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.username && form.email && form.password) {
      localStorage.setItem('user', JSON.stringify(form))
      alert('Registration successful!')
      setForm({ username: '', email: '', password: '' })
    }
  }

  return (
    <main>
      <h1>Register</h1>

      <img src={registerImg} alt="Register page reference" />

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Register</button>
      </form>
    </main>
  )
}