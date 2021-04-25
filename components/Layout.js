import Head from 'next/head'
import styles from '../styles/Layout.module.css'

export default function Layout({title, keywords, description, children}) {


    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
            </Head>
            <div className={styles.container}>
                {children}    
            </div>     
             
        </div>
    )
}

Layout.defaultProps = {
    title: 'Una Web de eventos hecha con NextJs',
    description: 'Esta es una página web muy molona, aunque sería bueno recordar que clase de Meta había que meter para el idioma',
    keywords: 'eventos, pestana, fiestuquí'
}