import './App.css'
import './componentes/Componente.css'
import Navbar from './componentes/Navbar.jsx'
import Home from './componentes/Home.jsx'
import CarParts from './componentes/CarParts.jsx'
import Footer from './componentes/Footer.jsx'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Home />
        <CarParts />
      </main>
      <Footer />
    </div>
  )
}

export default App
