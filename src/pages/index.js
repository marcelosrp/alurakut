/* E-mail Dato CMS: voyetig768@eyeremind.com */
import { useState, useEffect } from 'react'

import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../lib/AlurakutCommons'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="avatar profile"
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <a href={`https://github.com/${props.githubUser}`} className="boxLink">
        {props.githubUser}
      </a>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

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

  const [comunidades, setComunidades] = useState([])

  const [followers, setFollowers] = useState([])

  function handleCriarComunidade(event) {
    event.preventDefault()

    const dadosDoForm = new FormData(event.target)

    const comunidade = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
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
    })
  }

  useEffect(() => {
    fetch(`http://api.github.com/users/${githubUser}/followers`)
      .then(response => response.json())
      .then(data => setFollowers(data))

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
              _status
              _firstPublishedAt
            }
          }`,
      }),
    })
      .then(res => res.json())
      .then(res => setComunidades(res.data.allCommunities))
  }, [])

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
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
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
