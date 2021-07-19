import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

export const GlobalContext = createContext()

export const GlobalStorage = ({ children }) => {
  const [isLoadingDepoimento, setIsLoadingDepoimento] = useState(false)
  const [isLoadingComunidade, setIsLoadingComunidade] = useState(false)

  const [comunidadeTitle, setComunidadeTitle] = useState('')
  const [comunidadeImageUrl, setComunidadeImageUrl] = useState('')
  const [comunidades, setComunidades] = useState([])

  const [message, setMessage] = useState('')
  const [depoimentos, setDepoimentos] = useState([])

  const [githubUser, setGithubUser] = useState('')

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

  useEffect(() => {
    const token = nookies.get().USER_TOKEN
    const { githubUser } = jwt.decode(token)
    setGithubUser(githubUser)
  }, [])

  const handleMessageDepoimento = event => setMessage(event.target.value)

  const handleCriarDepoimento = event => {
    event.preventDefault()

    const depoimento = {
      message: message,
      creatorSlug: githubUser,
    }

    if (message === '') {
      toast.error('Preencha corretamente os campos da Comunidade')
      return
    }

    setIsLoadingDepoimento(true)

    fetch('/api/depoimentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(depoimento),
    })
      .then(async res => {
        const data = await res.json()
        setDepoimentos([...depoimentos, data.record])
        setMessage('')
        toast.success('Depoimento enviado com sucesso')
      })
      .catch(error => toast.error(error))
      .finally(() => {
        setIsLoadingDepoimento(false)
      })
  }

  const handleComunidadeTitle = event => setComunidadeTitle(event.target.value)

  const handleComunidadeImageUrl = event =>
    setComunidadeImageUrl(event.target.value)

  const handleCriarComunidade = event => {
    event.preventDefault()

    const comunidade = {
      title: comunidadeTitle,
      imageUrl: comunidadeImageUrl,
      creatorSlug: githubUser,
    }

    if (comunidadeTitle === '' || comunidadeImageUrl === '') {
      toast.error('Preencha corretamente os campos da Comunidade')
      return
    }

    setIsLoadingComunidade(true)

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
      .catch(error => toast.error(error))
      .finally(() => {
        setIsLoadingComunidade(false)
      })
  }

  return (
    <GlobalContext.Provider
      value={{
        handleCriarDepoimento,
        handleMessageDepoimento,
        handleCriarComunidade,
        handleComunidadeTitle,
        handleComunidadeImageUrl,
        githubUser,
        isLoadingComunidade,
        isLoadingDepoimento,
        message,
        depoimentos,
        comunidadeTitle,
        comunidadeImageUrl,
        comunidades,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalStorage.propTypes = {
  children: PropTypes.any.isRequired,
}
