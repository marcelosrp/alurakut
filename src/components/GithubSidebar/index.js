import { useState, useEffect } from 'react'

import Spinner from '../Spinner'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export default function GithubSidebar({ type, githubUser }) {
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://api.github.com/users/${githubUser}/${type}`)
      .then(response => response.json())
      .then(data => setFollowers(data))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://api.github.com/users/${githubUser}/${type}`)
      .then(response => response.json())
      .then(data => setFollowing(data))
      .finally(() => setIsLoading(false))
  }, [])

  function buildUIGithub() {
    if (type === 'following') {
      return (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="smallTitle">Seguindo ({following.length})</h2>
              <ul>
                {following.map(user => (
                  <li key={`${user.login}-${user.id}`}>
                    <a href={`users/${user.login}`}>
                      <img
                        src={`https://github.com/${user.login}.png`}
                        alt={user.login}
                      />
                      <span>{user.login}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )
    }

    if (type === 'followers') {
      return (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="smallTitle">Seguidores ({followers.length})</h2>
              <ul>
                {followers.map(user => (
                  <li key={`${user.login}-${user.id}`}>
                    <a href={`users/${user.login}`}>
                      <img
                        src={`https://github.com/${user.login}.png`}
                        alt={user.login}
                      />
                      <span>{user.login}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )
    }
  }

  return (
    <ProfileRelationsBoxWrapper>{buildUIGithub()}</ProfileRelationsBoxWrapper>
  )
}
