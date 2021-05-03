import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'

import Search from '@/components/Search'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>DJ Events</a>
                </Link>
            </div>
            <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Evento</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/events/add'>
                            <a>Crea un Evento</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/account/login'>
                            <a className='btn-secondary btn-icon'><FaSignInAlt/> Log In</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            
        </header>
    )
}
