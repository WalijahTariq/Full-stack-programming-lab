import { useState } from 'react'
import forgetImg from '../assets/Forget-password.jpg'

export default function Forget() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const stored = JSON.parse(localStorage.getItem('user') || '{}')

    if (stored.email === email) {
      const newPass = prompt('Enter your new password:')
      if (newPass) {
        stored.password = newPass
        localStorage.setItem('user', JSON.stringify(stored))
        alert('Password has been reset.')
      }
    } else {
      alert('Email not found.')
    }

    setEmail('')
  }

  return (
    <main>
      <h1>Forget Password</h1>

      <img src={forgetImg} alt="Forget password page reference" />

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>
    </main>
  )
}