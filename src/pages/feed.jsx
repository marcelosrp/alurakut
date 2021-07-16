/* E-mail Dato CMS: voyetig768@eyeremind.com */
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import ProfileSidebar from '../components/ProfileSidebar'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import GithubSidebar from '../components/GithubSidebar'

import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'

export default function Home(props) {
  const githubUser = props.githubUser

  const [comunidadeTitle, setComunidadeTitle] = useState('')
  const [comunidadeImageUrl, setComunidadeImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [comunidades, setComunidades] = useState([])

  useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_DATOCMS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
              allCommunities {
                id
                title
                imageUrl
                creatorSlug
              }
            }`,
      }),
    })
      .then(res => res.json())
      .then(res => setComunidades(res.data.allCommunities))
  }, [])

  function handleCriarComunidade(event) {
    event.preventDefault()

    const comunidade = {
      title: comunidadeTitle,
      imageUrl: comunidadeImageUrl,
      creatorSlug: githubUser,
    }

    setIsLoading(true)

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade),
    })
      .then(async res => {
        const data = await res.json()
        setComunidades([...comunidades, data.record])
        setComunidadeTitle('')
        setComunidadeImageUrl('')
        toast.success('Comunidade criada com sucesso!')
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <ToastContainer position="bottom-right" />
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={e => handleCriarComunidade(e)}>
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  value={comunidadeTitle}
                  onChange={e => setComunidadeTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  value={comunidadeImageUrl}
                  onChange={e => setComunidadeImageUrl(e.target.value)}
                />
              </div>
              <button disabled={isLoading} type="submit">
                {isLoading ? 'Criando comunidade...' : 'Criar comunidade'}
              </button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
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
          </ProfileRelationsBoxWrapper>

          <GithubSidebar type="following" githubUser={githubUser} />
          <GithubSidebar type="followers" githubUser={githubUser} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN

  const { isAuthenticated } = await fetch(
    'https://alurakut.vercel.app/api/auth',
    {
      headers: {
        Authorization: token,
      },
    },
  ).then(res => res.json())

  console.log(isAuthenticated)

  /* if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } */

  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser,
    },
  }
}
