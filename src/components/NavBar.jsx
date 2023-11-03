import Link from "next/link"

export default function NavBar() {
  return (
    <nav className='nav'>
      <div className='nav-buttons'>
        <Link style={{textDecoration: 'none', color: '#eee'}} href='/'>Administrador de campos</Link>
      </div>
    </nav>
  )
}