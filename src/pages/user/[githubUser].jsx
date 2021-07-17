import Head from 'next/head'
import { useRouter } from 'next/router'

import MainGrid from '../../components/MainGrid'
import Box from '../../components/Box'
import ProfileSidebar from '../../components/ProfileSidebar'
import GithubSidebar from '../../components/GithubSidebar'
import Spinner from '../../components/Spinner'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../../lib/AlurakutCommons'

export default function User(props) {
  const githubUser = props.githubUser
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Alurakut :: Feed</title>
      </Head>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo, {githubUser}</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <GithubSidebar type="following" githubUser={githubUser} />
          <GithubSidebar type="followers" githubUser={githubUser} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getStaticProps(context) {
  const githubUser = context.params.githubUser

  return {
    props: {
      githubUser: githubUser,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          githubUser: 'marcelosrp',
        },
      },
    ],
    fallback: true,
  }
}
