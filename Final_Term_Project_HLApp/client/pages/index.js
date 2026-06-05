import Link from 'next/link'

export default function Home(){
  return (
    <div className="hero">
      <div>
        <h1>HLApp: Modern healthcare booking made easy</h1>
        <p>Manage appointments, track patient records, assign doctors, and follow treatment plans from a polished, fast dashboard.</p>
        <div className="button-group">
          <Link href="/register"><button>Get Started</button></Link>
          <Link href="/login"><button className="button-secondary">Sign In</button></Link>
        </div>
      </div>
    </div>
  )
}
