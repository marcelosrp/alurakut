import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import nookies from 'nookies'

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [githubUser, setGithubUser] = useState('')
  const router = useRouter()

  const handleSubmitLogin = e => {
    e.preventDefault()

    setIsLoading(true)
    fetch('https://alurakut.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ githubUser: githubUser }),
    })
      .then(async res => {
        const data = await res.json()
        nookies.set(null, 'USER_TOKEN', data.token, {
          path: '/',
          maxAge: 86400 * 7,
        })
        if (!githubUser || githubUser.length === 0) {
          toast.error('Ops! Algo deu errado, tente novamente!')
        }
        router.push('/feed')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <ToastContainer position="bottom-right" />
      <main
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="loginScreen">
          <section className="logoArea">
            <img src="https://alurakut.vercel.app/logo.svg" alt="Logo" />

            <p>
              <strong>Conecte-se</strong> aos seus amigos e familiares usando
              recados e mensagens instantâneas
            </p>
            <p>
              <strong>Conheça</strong> novas pessoas através de amigos de seus
              amigos e comunidades
            </p>
            <p>
              <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
              lugar
            </p>
          </section>

          <section className="formArea">
            <form className="box" onSubmit={handleSubmitLogin}>
              <p>
                Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
              </p>
              <input
                placeholder="Usuário"
                value={githubUser}
                onChange={e => setGithubUser(e.target.value)}
              />
              <button type="submit">
                {isLoading ? 'Carregando...' : 'Login'}
              </button>
            </form>

            <footer className="box">
              <p>
                Ainda não é membro? <br />
                <a href="/login">
                  <strong>ENTRAR JÁ</strong>
                </a>
              </p>
            </footer>
          </section>

          <footer className="footerArea">
            <p>
              © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{' '}
              <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a>{' '}
              - <a href="/">Termos</a> - <a href="/">Contato</a>
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
