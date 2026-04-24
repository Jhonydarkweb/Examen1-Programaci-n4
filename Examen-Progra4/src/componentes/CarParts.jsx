import { useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_JSONBIN_API_URL
const ACCESS_KEY = import.meta.env.VITE_JSONBIN_ACCESS_KEY
const PAGE_SIZE = 10

function getPartText(part) {
  return [
    part.name,
    part.category,
    part.type,
    part.description,
    part.articleProductName,
    part.articleNo,
    part.supplierName,
    part.s3image,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function isRepuestoDeCarro(part) {
  const text = getPartText(part)
  return Boolean(
    text &&
      (
        text.includes('repuestos de carro') ||
        text.includes('repuesto de carro') ||
        text.includes('repuesto') ||
        part.articleProductName ||
        part.articleNo
      )
  )
}

function getImageUrl(part) {
  return (
    part.s3image ||
    part.image ||
    part.img ||
    part.imageUrl ||
    part.thumbnail ||
    part.photo ||
    part.picture ||
    ''
  )
}

function normalizePayload(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data.articles)) return data.articles
  if (Array.isArray(data.record)) return data.record
  if (Array.isArray(data.record?.items)) return data.record.items
  if (Array.isArray(data.record?.repuestos)) return data.record.repuestos
  if (Array.isArray(data.items)) return data.items
  if (Array.isArray(data.repuestos)) return data.repuestos
  return []
}

function CarParts() {
  const [parts, setParts] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        'X-Access-Key': ACCESS_KEY,
        Accept: 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.message || `Error ${response.status}: no se pudo cargar la lista`)
        }
        return response.json()
      })
      .then((data) => {
        const payload = normalizePayload(data)
        const filtered = payload.filter(isRepuestoDeCarro)
        setParts(filtered)
        setPage(1)
      })
      .catch((err) => {
        setError(err.message || 'Error al cargar los repuestos')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredParts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return parts

    return parts.filter((part) => getPartText(part).includes(normalizedSearch))
  }, [parts, search])

  const displayedParts = filteredParts.slice(0, page * PAGE_SIZE)
  const hasMore = filteredParts.length > displayedParts.length
  const isEmpty = !loading && !error && filteredParts.length === 0
  const emptyMessage = search.trim()
    ? `No se encontraron repuestos para "${search.trim()}".`
    : 'No se encontraron repuestos.'

  return (
    <section className="carparts" id="parts">
      <div className="carparts__header">
        <div>
          <h2>Repuestos disponibles</h2>
          <p>Explora los artículos disponibles usando el buscador.</p>
          <input
            type="search"
            className="carparts__search"
            placeholder="Buscar repuestos..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="parts-empty">Cargando repuestos...</div>
      ) : error ? (
        <div className="parts-empty">{error}</div>
      ) : isEmpty ? (
        <div className="parts-empty">{emptyMessage}</div>
      ) : (
        <>
          <div className="parts-grid">
            {displayedParts.map((part) => {
              const imageUrl = getImageUrl(part)
              const title = part.articleProductName || part.name || 'Repuesto de carro'

              return (
                <article key={part.articleId ?? part.articleNo ?? part.id ?? title} className="part-card">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="part-card__image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <strong>{title}</strong>
                  <span className="part-card__category">
                    {part.supplierName || part.category || part.type || 'Proveedor desconocido'}
                  </span>
                  <p className="part-card__meta">
                    {part.articleNo && <>Código: {part.articleNo}</>}
                  </p>
                </article>
              )
            })}
          </div>
          {hasMore && (
            <div className="parts-load-more">
              <button type="button" onClick={() => setPage((current) => current + 1)}>
                Ver más
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default CarParts
