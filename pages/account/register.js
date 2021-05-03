import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

export default function loginPage() {

    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')


    const handleSubmit = (e) =>{
        e.preventDefault()
        if(password !== passwordConfirm){
            toast.error('Las contraseñas no coinciden')
        }
        console.log(userName, email, password);
    }

    return (
        <Layout title='Registro de usuario'>
            <div className={styles.auth}>
                <h1><FaUser/> Regístrate</h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName">Nombre de usuario</label>
                        <input type="text" id='userName' value={userName} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password confirm">Confirma contraseña</label>
                        <input type="password" id='passwordConfirm' value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                    </div>
                    <input type="submit" value='Login' className='btn'/>
                </form>

                <p>Ya tienes una cuenta? <Link href='/account/login'>Inicia sesión</Link></p>

            </div>
        </Layout>
    )
}
