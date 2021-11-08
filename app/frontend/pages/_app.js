import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout'

// This wraps up every page components, so the Layout will be displayed in every page
function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
}

export default MyApp
