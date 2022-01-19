import Layout from '../components/Layout'
import '../styles/globals.css'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

function MyApp( { Component, pageProps } ) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Provider>
  )
}

export default MyApp
