import PropTypes from 'prop-types'

export default function BemVindo({ githubUser }) {
  return <h1 className="title">Bem vindo(a), @{githubUser}</h1>
}

BemVindo.propTypes = {
  githubUser: PropTypes.string.isRequired,
}
