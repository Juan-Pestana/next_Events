import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout >
      
      <h1>Hola desde el inicio</h1>

      <Link href='/about'> A About</Link>
      
    </Layout>
  )
}
