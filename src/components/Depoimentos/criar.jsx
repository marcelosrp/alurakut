import { useContext } from 'react'
import { GlobalContext } from '../../context'

export default function CriarDepoimento() {
  const {
    message,
    isLoadingDepoimento,
    handleCriarDepoimento,
    handleMessageDepoimento,
  } = useContext(GlobalContext)

  return (
    <>
      <h2 className="subTitle">Deixe aqui seu depoimento</h2>
      <form onSubmit={handleCriarDepoimento}>
        <div>
          <input
            type="text"
            placeholder="Digite aqui a sua mensagem"
            name="message"
            value={message}
            onChange={handleMessageDepoimento}
          />
        </div>
        <button disabled={isLoadingDepoimento} type="submit">
          {isLoadingDepoimento ? 'Enviando depoimento...' : 'Enviar depoimento'}
        </button>
      </form>
    </>
  )
}
