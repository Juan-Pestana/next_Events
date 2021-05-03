import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {API_URL} from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css'
import {FaImage} from 'react-icons/fa'

import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function EditEventPage({event}) {

    const [values, setValues] = useState(
        {
            name: event.name,
            performers: event.performers,
            venue: event.venue,
            address: event.address,
            date: event.date,
            time: event.time,
            description: event.description
        }

    ) 
       
    const [imagePreview, setImagePreview] = useState(event.image ? event.image.formats.thumbnail.url : null)

    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) =>{

        e.preventDefault()
        const hasEmptyFields = Object.values(values).some((elem) => elem === '' )

        if(hasEmptyFields){
            toast.error('Rellena todos los campos')
        }

        const res = await fetch(`${API_URL}/events/${event.id}`, {
            method: 'put',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if(!res.ok) {
            toast.error('Me temo que no se ha actualizado tu evento')
        }else{
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const imageUploaded = async (e) =>{
        const res = await fetch(`${API_URL}/events/${event.id}`);
        const data = await res.json()
        console.log(data)
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }

    return (
        <Layout title='Añadir un nuevo evento'>
            <Link href='/events'>
                <a>{'<'}  Volver</a>
            </Link>
            <h1>Editar Evento</h1>
            <ToastContainer/>

            

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                        type='text'
                        name='performers'
                        id='performers'
                        value={values.performers}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                        type='text'
                        name='venue'
                        id='venue'
                        value={values.venue}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                        type='text'
                        name='address'
                        id='address'
                        value={values.address}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                        type='date'
                        name='date'
                        id='date'
                        value={moment(values.date).format('yyyy-MM-DD')}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                        type='text'
                        name='time'
                        id='time'
                        value={values.time}
                        onChange={handleInputChange}
                        />
                    </div>
                    

                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                        <textarea
                            type='text'
                            name='description'
                            id='description'
                            value={values.description}
                            onChange={handleInputChange}
                        ></textarea>
                    
                    
                        
                </div>
                <input type="submit" value="Actualizar Evento" className='btn'/>

            </form>

            <h2>Imagen</h2>
            {imagePreview ?<Image 
                src={imagePreview}
                height={100}
                width={170}/> 
                    : 
                <div>
                    <p>No hay Imagen en este evento</p>
                </div>}

                <div>
                    <button className="btn-secondary" onClick={()=>setShowModal(true)}><FaImage/> Subir o actualizar</button>
                </div>

                <Modal show={showModal} onClose={()=> setShowModal(false)} title='ESTO ES UNA PRUEBA'>
                    <ImageUpload 
                        evId={event.id} 
                        imageUploaded={imageUploaded}
                        />
                </Modal>

        </Layout>
    )
}

export async function getServerSideProps ({params: {id}}) {

    const res = await fetch(`${API_URL}/events/${id}`)
    const event = await res.json()

    return{
        props : {
            event
        }
    }
}
