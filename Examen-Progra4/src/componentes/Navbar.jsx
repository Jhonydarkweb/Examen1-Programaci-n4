import { Link } from '@tanstack/react-router'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">Examen Repuestos</div>
      <nav className="navbar__nav">
        <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
          Inicio
        </Link>
        <Link to="/cart" activeProps={{ style: { fontWeight: 'bold' } }}>
          Repuestos
        </Link>
        <a href="#contact">Contacto</a>
      </nav>
    </header>
  )
}

export default Navbar
