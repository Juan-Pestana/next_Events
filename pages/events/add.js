import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css'

export default function AddEventPage() {

    const [values, setValues] = useState(
        {
            name: '',
            performers: '',
            venue: '',
            address: '',
            date: '',
            time: '',
            description: ''
        }

    ) 

    const router = useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const hasEmptyFields = Object.values(values).some((elem) => elem === '' )

        if(hasEmptyFields){
            toast.error('Rellena todos los campos')
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if(!res.ok) {
            toast.error('Me temo que no se ha creado tu evento')
        }else{
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    return (
        <Layout title='Añadir un nuevo evento'>
            <Link href='/events'>
                <a>{'<'}  Volver</a>
            </Link>
            <h1>Añadir Evento</h1>
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
                        value={values.date}
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
                <input type="submit" value="Crear Evento" className='btn'/>

            </form>
        </Layout>
    )
}
