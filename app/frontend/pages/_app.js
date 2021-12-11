import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'


// This wraps up every page components, so the Layout will be displayed in every page
function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
    )
}

export default MyApp
