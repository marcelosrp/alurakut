import { useContext } from 'react'
import { GlobalContext } from '../../context'

export default function CriarComunidade() {
  const {
    handleCriarComunidade,
    handleComunidadeTitle,
    handleComunidadeImageUrl,
    isLoadingComunidade,
    comunidadeTitle,
    comunidadeImageUrl,
  } = useContext(GlobalContext)

  return (
    <>
      <h2 className="subTitle">Crie sua comunidade</h2>
      <form onSubmit={handleCriarComunidade}>
        <div>
          <input
            type="text"
            placeholder="Qual vai ser o nome da sua comunidade?"
            name="title"
            value={comunidadeTitle}
            onChange={handleComunidadeTitle}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Coloque uma URL para usarmos de capa"
            name="image"
            value={comunidadeImageUrl}
            onChange={handleComunidadeImageUrl}
          />
        </div>
        <button disabled={isLoadingComunidade} type="submit">
          {isLoadingComunidade ? 'Criando comunidade...' : 'Criar comunidade'}
        </button>
      </form>
    </>
  )
}
