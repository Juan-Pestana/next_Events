import {API_URL} from '@/config/index'
import {useState} from 'react'
import styles from '@/styles/Form.module.css'

export default function ImageUpload({evId, imageUploaded}) {

    const [image, setImage] = useState(null)

    const handleSubmit = async (e) =>{

        e.preventDefault()

        const formData = new FormData()

        formData.append('files', image)
        formData.append('ref', 'events')
        formData.append('refId', evId)
        formData.append('field', 'image')

        const res = await fetch(`${API_URL}/upload`, {
            method:'POST',
            body: formData
        })

        if(res.ok){
            imageUploaded()
        }

    }

    const handleFileChange = (e) =>{
        setImage(e.target.files[0]);
    }

    return (
        <div className={styles.form}>
            <h1>Subir imagen del evento</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange}/>
                </div>
                <input type="submit" value='Subir foto' className='btn'/>
            </form>            
        </div>
    )
}
