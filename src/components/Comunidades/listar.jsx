import { useContext } from 'react'
import { GlobalContext } from '../../context'

export default function ListarComunidades() {
  const { comunidades } = useContext(GlobalContext)

  return (
    <>
      <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
      <ul>
        {comunidades.map(comunidade => (
          <li key={`${comunidade.title}-${comunidade.id}`}>
            <a href={`/comunities/${comunidade.id}`}>
              <img src={comunidade.imageUrl} alt={comunidade.title} />
              <span>{comunidade.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
