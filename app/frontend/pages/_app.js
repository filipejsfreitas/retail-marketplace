import '../styles/globals.css'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout'

// This wraps up every page components, so the Layout will be displayed in every page
function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
=======

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
>>>>>>> 8dc3eb85835729b757a8237b7ed4fd0bbaf5233e
}

export default MyApp
