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

  const [comunidades, setComunidades] = useState([
    {
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
  ])

  const [followers, setFollowers] = useState([])

  function handleCriarComunidade(event) {
    event.preventDefault()

    const dadosDoForm = new FormData(event.target)

    const comunidade = {
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image'),
    }

    setComunidades([...comunidades, comunidade])
  }

  useEffect(() => {
    fetch(`http://api.github.com/users/${githubUser}/followers`)
      .then(response => response.json())
      .then(data => setFollowers(data))
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
              {comunidades.map((comunidade, key) => (
                <li key={`${comunidade.title}-${key}`}>
                  <a href="/#">
                    <img src={comunidade.image} alt={comunidade.title} />
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
