/* E-mail Dato CMS: voyetig768@eyeremind.com */
import { useState, useEffect } from 'react'

import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import ProfileSidebar from '../components/ProfileSidebar'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'

export default function Home() {
  const githubUser = 'marcelosrp'

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  const [comunidadeTitle, setComunidadeTitle] = useState('')
  const [comunidadeImageUrl, setComunidadeImageUrl] = useState('')
  const [comunidades, setComunidades] = useState([])
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    fetch(`http://api.github.com/users/${githubUser}/followers`)
      .then(response => response.json())
      .then(data => setFollowers(data))
  }, [])

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

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade),
    }).then(async res => {
      const data = await res.json()
      setComunidades([...comunidades, data.record])
      setComunidadeTitle('')
      setComunidadeImageUrl('')
    })
  }

  return (
    <>
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
              <button type="submit">Criar comunidade</button>
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

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoa, key) => (
                <li key={`${pessoa}-${key}`}>
                  <a href={`users/${pessoa}`}>
                    <img
                      src={`https://github.com/${pessoa}.png`}
                      alt={pessoa}
                    />
                    <span>{pessoa}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguidores ({followers.length})</h2>
            <ul>
              {followers.map(follower => (
                <li key={`${follower.login}-${follower.id}`}>
                  <a href={`users/${follower.login}`}>
                    <img
                      src={`https://github.com/${follower.login}.png`}
                      alt={follower.login}
                    />
                    <span>{follower.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
