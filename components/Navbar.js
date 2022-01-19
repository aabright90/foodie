import Image from 'next/image'
import styles from "../styles/Navbar.module.css"
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState()
    const [cookies, removeCookie] = useCookies()

    const { asPath } = useRouter()


    useEffect(() => {
        if(cookies.token === process.env.cookieToken){
            setIsLoggedIn(true)
        }
    },[cookies])

    const quantity = useSelector((state) => state.cart.quantity)

    const logOut = (input) => {
        removeCookie(input)
        location.reload(true)
    }

    
    const loggedIn = () => (
        <div className={styles.logged_in}>
            <span style={{ marginRight: '6px', display: asPath === '/admin' ? 'none' : 'block'}}>
                <Link href="/admin">Admin</Link> 
            </span>
            <span style={{ cursor: 'pointer', marginLeft: asPath === '/admin' ? '45%' : '0'}} onClick={() => logOut('token')}>
                Log Out
            </span>
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.item}>
                    <div className={styles.callButton}>
                    <Link href="/" passHref>
                        <Image src="/img/telephone.png" width="32" height="32" alt="phone"/>
                    </Link>
                    </div>
                    <div className={styles.texts}>
                        <div className={styles.text}>ORDER NOW!</div>
                        <div className={styles.text}>123-456-7891</div>
                    </div>
                </div>
            </div>
            <div className={styles.middle}>
                <div className={styles.listItem}>
                    <ul className={styles.list}>
                        <Link href="/" passHref>
                            <li style={{ cursor: 'pointer' }}>Homepage</li>
                        </Link>
                        <li className={styles.listItem}>Products</li>
                        <li className={styles.listItem}>Menu</li>
                        <li style={{ cursor: 'pointer' }}>
                            <Link href="/" passHref>
                                <Image  src="/img/BuckEyePizzaLogo.png" height="100" width="100" alt="logo"/>
                            </Link>
                        </li>
                        <li className={styles.listItem}>Events</li>
                        <li className={styles.listItem}>Blog</li>
                        <li className={styles.listItem}>Contact</li>
                    </ul>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.profile} style={{ display: asPath === '/admin/login' ? 'none' : 'block'}}>
                    {isLoggedIn ? loggedIn(): <Link href="/login">Login</Link>}
                </div>
                <Link href='/cart' passHref>
                    <div className={styles.item}>
                        <div className={styles.cart}>
                            <RiShoppingCart2Fill style={{ color: "white", cursor: 'pointer' }}/>
                            {quantity > 0 && <div className={styles.counter}>{quantity}</div>}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
