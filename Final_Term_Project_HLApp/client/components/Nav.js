import Link from 'next/link'

export default function Nav(){
  return (
    <nav style={{padding:10}}>
      <Link href="/" style={{marginRight:12}}>Home</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  )
}
