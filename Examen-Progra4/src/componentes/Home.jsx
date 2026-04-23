function Home() {
  return (
    <section className="home-section" id="home">
      <div className="home-section__content">
        <p className="eyebrow">Bienvenido al catalogo de repuestos</p>
        <h1>Catálogo de repuestos automotrices</h1>
        <p>
          Aquí encontrarás los principales repuestos disponibles para tu taller o auto.
        </p>
      </div>
      <div className="home-section__hero">
        <div className="hero-card">
          <span className="hero-card__title">Mejor rendimiento</span>
          <p>Encuentra piezas confiables, con stock y precios claros.</p>
        </div>
      </div>
    </section>
  )
}

export default Home
