import Link from 'next/link'
import Layout from '@/components/Layout'

export default function AboutPage() {
    return (
        <Layout title='Página About' description='estoy viendo a ver si ser recarga el código fuente de la página'>
            <h1>Página de About</h1>
            <p>Esta es una página donde encontrar eventos y djs</p>
            <p>Versión 1.0.0</p>
            <Link href='/'>Back Home</Link>

        </Layout>
    )
}
