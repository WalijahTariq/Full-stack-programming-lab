import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/Login-page.jpg'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const stored = JSON.parse(localStorage.getItem('user') || '{}')

    if (stored.username === form.username && stored.password === form.password) {
      alert('Login successful!')
      navigate('/account')
    } else {
      alert('Invalid credentials.')
    }

    setForm({ username: '', password: '' })
  }

  return (
    <main>
      <h1>Login</h1>

      <img src={loginImg} alt="Login page reference" />

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Login</button>

        <br />

        <Link to="/forget">Forgot Password?</Link>
      </form>
    </main>
  )
}