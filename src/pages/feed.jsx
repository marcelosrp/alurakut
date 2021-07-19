// import { useContext } from 'react'
// import { GlobalContext } from '../context'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import ProfileSidebar from '../components/ProfileSidebar'
import GithubSidebar from '../components/GithubSidebar'
import BemVindo from '../components/BemVindo'
import CriarDepoimento from '../components/Depoimentos/criar'
import CriarComunidade from '../components/Comunidades/criar'
import ListarComunidades from '../components/Comunidades/listar'
import ListarDepoimentos from '../components/Depoimentos/listar'
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons'

export default function Home(props) {
  const githubUser = props.githubUser

  return (
    <>
      <Head>
        <title>Alurakut :: Feed</title>
      </Head>
      <ToastContainer position="bottom-right" />
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <BemVindo githubUser={githubUser} />
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <CriarComunidade />
          </Box>
          <Box>
            <CriarDepoimento />
          </Box>
          <Box>
            <ListarDepoimentos />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <ListarComunidades />
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

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser,
    },
  }
}
