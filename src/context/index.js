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

  useEffect(() => {
    // Fetch Comunidades
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
    // Fetch Depoimentos
    setIsLoadingDepoimento(true)
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_DATOCMS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
              allTestimonials {
                id
                message
                creatorSlug
                _createdAt
              }
            }`,
      }),
    })
      .then(res => res.json())
      .then(res => setDepoimentos(res.data.allTestimonials))
      .finally(() => setIsLoadingDepoimento(false))
  }, [])

  const handleMessageDepoimento = event => setMessage(event.target.value)

  const handleCriarDepoimento = event => {
    event.preventDefault()

    if (message === '') {
      toast.error('Preencha corretamente os campos da Comunidade')
      return
    }

    const token = nookies.get().USER_TOKEN
    const { githubUser } = jwt.decode(token)

    const depoimento = {
      message: message,
      creatorSlug: githubUser,
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

    if (comunidadeTitle === '' || comunidadeImageUrl === '') {
      toast.error('Preencha corretamente os campos da Comunidade')
      return
    }

    const token = nookies.get().USER_TOKEN
    const { githubUser } = jwt.decode(token)

    const comunidade = {
      title: comunidadeTitle,
      imageUrl: comunidadeImageUrl,
      creatorSlug: githubUser,
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
        isLoadingComunidade,
        isLoadingDepoimento,
        message,
        depoimentos,
        comunidadeTitle,
        comunidadeImageUrl,
        comunidades,
        depoimentos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalStorage.propTypes = {
  children: PropTypes.any.isRequired,
}
