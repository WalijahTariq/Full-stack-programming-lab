import { Link } from 'react-router-dom'
import accountImg from '../assets/My-Account.jpg'

export default function Account() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const billing = JSON.parse(localStorage.getItem('billing') || '{}')
  const shipping = JSON.parse(localStorage.getItem('shipping') || '{}')

  return (
    <main>
      <h1>My Account</h1>

      <img src={accountImg} alt="My Account page reference" />

      <div>
        {user.username ? (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {billing.name && (
              <p>
                <strong>Billing:</strong> {billing.name}, {billing.address}
              </p>
            )}

            {shipping.name && (
              <p>
                <strong>Shipping:</strong> {shipping.name}, {shipping.address}
              </p>
            )}
          </>
        ) : (
          <p>You are not logged in. Please log in or register.</p>
        )}
      </div>

      <section>
        <h2>Account Details</h2>
        <p>Manage your account information here.</p>

        <Link to="/billing">Edit Billing Address</Link> |{" "}
        <Link to="/shipping">Edit Shipping Address</Link>
      </section>
    </main>
  )
}