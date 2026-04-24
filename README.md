readme

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
 //esta función toma la respuesta de la API y extrae el arreglo de los repuestos
/////////////////////////////////////////////////////////////////////////////////

{hasMore && (
            <div className="parts-load-more">
              <button type="button" onClick={() => setPage((current) => current + 1)}>
                Ver más
              </button>
//el hasmore es una forma de renderizado en react

/////////////////////////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////////////////////////////////

//Esta función busca la mejor URL de imagen posible en el objeto
//////////////////////////////////////////////////////////////////////////////////////////
