import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Spinner from '../Spinner'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

export default function GithubSidebar({ type, githubUser }) {
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://api.github.com/users/${githubUser}/${type}`)
      .then(response => response.json())
      .then(data => setFollowers(data))
      .finally(() => setIsLoading(false))
  }, [githubUser])

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://api.github.com/users/${githubUser}/${type}`)
      .then(response => response.json())
      .then(data => setFollowing(data))
      .finally(() => setIsLoading(false))
  }, [githubUser])

  function buildUIGithub() {
    if (type === 'following') {
      return (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="smallTitle">Seguindo ({following.length})</h2>
              <ul className={`${isActive ? 'open' : ''}`}>
                {following.map(user => (
                  <li key={`${user.login}-${user.id}`}>
                    <Link href={`/user/${user.login}`}>
                      <a>
                        <img
                          src={`https://github.com/${user.login}.png`}
                          alt={user.login}
                        />
                        <span>{user.login}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr />
              {following.length > 6 && (
                <button
                  type="button"
                  className="btn-vermais"
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? 'Ver menos' : 'Ver mais'}
                </button>
              )}
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
              <ul className={`${isActive ? 'open' : ''}`}>
                {followers.map(user => (
                  <li key={`${user.login}-${user.id}`}>
                    <Link href={`/user/${user.login}`}>
                      <a>
                        <img
                          src={`https://github.com/${user.login}.png`}
                          alt={user.login}
                        />
                        <span>{user.login}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr />
              {followers.length > 6 && (
                <button
                  type="button"
                  className="btn-vermais"
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? 'Ver menos' : 'Ver mais'}
                </button>
              )}
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

GithubSidebar.propTypes = {
  type: PropTypes.string.isRequired,
  githubUser: PropTypes.string.isRequired,
}
