import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useRouter} from 'next/router'
import styles from '@/styles/Event.module.css'

import {API_URL} from '@/config/index'

export default function EventoPage({event}) {

    const router = useRouter()
   
 const deleteEvent = async (e) =>{
        if(confirm('Estás seguro?')) {

            const res = await fetch(`${API_URL}/events/${event.id}`,{
                method: 'DELETE'
            })

            const data= await res.json()

            if(!res.ok){
            toast.error(data.message)

            } else{
                
            router.push('/events')
            }
        }
        

        
 }


    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                  
                    <Link href={`/events/edit/${event.id}`}>
                        <a><FaPencilAlt/> Editar</a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes/> Eliminar</a>
                </div>
                <span>{new Date(event.date).toLocaleDateString('es-ES')} at {event.time}</span>
                <h1>{event.name}</h1>
                <ToastContainer/>
                {event.image && 
                        <div className={styles.image}>
                            <Image 
                            src={event.image.formats.medium.url}
                            layout="responsive"
                            objectFit='cover'
                            width={960}
                            height={500}
                            objectPosition="center center"
                            />
                        </div> 

                    }
                <h3>Performers</h3>
                <p>{event.performers}</p>
                <h3>Venue: {event.venue}</h3>
                <p>{event.address}</p>
                <Link href='/events'>
                    <a className={styles.back}>{'<'} EVENTOS</a>
                </Link>
                    
            </div>
            
        </Layout>
    )
}

export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/events`)
    const events = await res.json()
    const paths= events.map(evt =>({
        params:{slug: evt.slug}
    }))

   

    return {
        paths, 
        fallback: false
    }
}

export async function getStaticProps({params:{slug}}){
      const res = await fetch(`${API_URL}/events?slug=${slug}`)
      const [event] = await res.json()
     
    return {
        props:{event}
    }
}