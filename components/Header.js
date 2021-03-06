import {useContext} from 'react'
import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import AuthContext from '../context/authContext'
import Search from '@/components/Search'

export default function Header() {

    const {user, logout, ready} = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>DJ Events</a>
                </Link>
            </div>
            <Search/>

                <nav>
                {ready ? 
                    <ul>
                        <li>
                            <Link href='/events'>
                                <a>Eventos</a>
                            </Link>
                        </li>

                        {user ? 
                        //si logged in
                        <>
                            <li>
                                <Link href='/events/add'>
                                    <a>Crea un Evento</a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/account/dashboard'>
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                
                                <button 
                                    className='btn-secondary btn-icon'
                                    onClick={()=> logout()}><FaSignOutAlt/> Log Out</button>
                                
                            </li>        
                        </> : 
                        //si logged out
                        <>
                        
                            <li>
                                <Link href='/account/login'>
                                    <a className='btn-secondary btn-icon'><FaSignInAlt/> Log In</a>
                                </Link>
                            </li>
                        
                        </>}
                        
                        
                    </ul> : null
            }
                </nav>
            
            
            
            
        </header>
    )
}
