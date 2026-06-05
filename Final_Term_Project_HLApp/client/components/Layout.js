import Link from 'next/link'

export default function Layout({ children }){
  return (
    <div>
      <header className="app-header">
        <div className="header-inner">
          <Link href="/" className="header-title">HLApp</Link>
          <div className="header-links">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">© HLApp — Healthcare booking and management</footer>
    </div>
  )
}
