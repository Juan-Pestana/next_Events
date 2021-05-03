import {useState, useEffect} from 'react'
import ReactDom from 'react-dom'
import {FaTimes} from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'



export default function Modal({show, onClose, children, title}) {

    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() =>{
        setIsBrowser(true)
    },[])

    const handleClose = (e) =>{
        e.preventDefault()
        onClose()

    }

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}><FaTimes/></a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    ) : null


    //Comprobamos si esta en el browser o en el servidor, si estamos en el Browser, le decimos a React que cree un portal en el div que hemos creado en _pages.js, y le metemos el contenido de modalContent

    if (isBrowser){
        return ReactDom.createPortal(modalContent, document.getElementById('modal-root'))
    } else {
        return null
    }

    return (
        <div>
            
        </div>
    )
}
