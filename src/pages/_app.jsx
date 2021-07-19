import { GlobalStorage } from '../context'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../lib/AlurakutCommons'

import 'react-toastify/dist/ReactToastify.css'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: #D9E6F6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

import '../assets/css/spinner.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <GlobalStorage>
          <Component {...pageProps} />
        </GlobalStorage>
      </ThemeProvider>
    </>
  )
}
