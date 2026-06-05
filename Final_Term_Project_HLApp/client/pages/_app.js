import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'
import MobileAlerts from '../components/MobileAlerts'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
      <MobileAlerts />
    </Layout>
  )
}
