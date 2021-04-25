import Link from 'next/link'
import Layout from '../../components/Layout'
import {useRouter} from 'next/router'

export default function EventoPage() {

    const router = useRouter()

  

    return (
        <Layout>
            <h1>Esto es una prueba, a ver que pasa</h1> 
            <p>esta es la página: {router.query.slug}</p> 
            <button onClick={()=> router.push('/about')}>Go About</button>
            <Link href='/'>Inicio</Link>
        </Layout>
    )
}
