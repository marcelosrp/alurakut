import { useContext } from 'react'
import { GlobalContext } from '../../context'
import Spinner from '../Spinner'

import Moment from 'react-moment'
import 'moment/locale/pt-br'

import * as S from './style'

export default function ListarDepoimentos() {
  const { depoimentos, isLoadingDepoimento } = useContext(GlobalContext)

  if (depoimentos.length === 0) {
    return <h2 className="subTitle">Você ainda não tem depoimentos</h2>
  }

  if (isLoadingDepoimento) return <Spinner />

  return (
    <>
      <h2 className="subTitle">Depoimentos ({depoimentos.length})</h2>
      {depoimentos &&
        depoimentos.map(depoimento => {
          return (
            <S.DepoimentoWrapper key={depoimento.id}>
              <div>
                <S.Avatar
                  src={`https://github.com/${depoimento.creatorSlug}.png`}
                  alt={`Avatar ${depoimento.creatorSlug}`}
                />
              </div>
              <div>
                <S.DepoimentoPost>
                  <a
                    href={`https://github.com/${depoimento.creatorSlug}`}
                    target="_blank"
                  >
                    @{depoimento.creatorSlug}
                  </a>
                  -
                  <p>
                    <Moment format="DD/MM/YYYY">{depoimento._createdAt}</Moment>
                  </p>
                </S.DepoimentoPost>
                <p>{depoimento.message}</p>
              </div>
            </S.DepoimentoWrapper>
          )
        })}
    </>
  )
}
