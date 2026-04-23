import { useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

function CarParts() {
  const [search, setSearch] = useState('')
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!API_URL) {
      setError('Falta configurar VITE_API_URL en .env')
      setLoading(false)
      return
    }

    setLoading(true)
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: no se pudo cargar la API`)
        }
        return response.json()
      })
      .then((data) => {
        const payload = Array.isArray(data) ? data : data.repuestos || data.items || []
        setParts(payload)
        setError(null)
      })
      .catch((err) => {
        setError(err.message || 'Error al cargar los repuestos')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const visibleParts = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    if (!normalized) return parts

    return parts.filter((part) =>
      part.name?.toLowerCase().includes(normalized) ||
      part.category?.toLowerCase().includes(normalized),
    )
  }, [search, parts])

  return (
    <section className="carparts" id="parts">
      <div className="carparts__header">
        <div>
          <h2>Repuestos disponibles</h2>
          <p>Filtra por nombre o categoría para encontrar la pieza correcta.</p>
        </div>
        <div>
          <label htmlFor="parts-search" className="sr-only">
            Buscar repuestos
          </label>
          <input
            id="parts-search"
            type="search"
            placeholder="Buscar repuestos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="carparts__search"
            disabled={loading}
          />
        </div>
      </div>

      {loading ? (
        <div className="parts-empty">Cargando repuestos...</div>
      ) : error ? (
        <div className="parts-empty">{error}</div>
      ) : (
        <div className="parts-grid">
          {visibleParts.map((part) => (
            <article key={part.id ?? part.name} className="part-card">
              <strong>{part.name}</strong>
              <span className="part-card__category">{part.category}</span>
              <p className="part-card__price">${Number(part.price ?? 0).toFixed(2)}</p>
            </article>
          ))}
          {visibleParts.length === 0 && (
            <div className="parts-empty">No se encontraron repuestos.</div>
          )}
        </div>
      )}
    </section>
  )
}

export default CarParts
