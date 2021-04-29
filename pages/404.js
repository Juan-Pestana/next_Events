import Layout from '@/components/Layout'
import Link from 'next/link'
import styles from '@/styles/404.module.css'
import {FaExclamationTriangle} from 'react-icons/fa'

export default function NotFound() {
    return (
        <Layout title='Not found'>
            <div className={styles.error}>
                <h1><FaExclamationTriangle/> 404</h1>
                <h4>Lo siento, nada por aquí</h4>
                <Link href='/'>Volver a Inicio</Link>
            </div>
            
        </Layout>
    )
}
