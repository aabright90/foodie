import styles from "../../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from 'react-cookie'

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies] = useCookies()

  const router = useRouter();

  

  useEffect(() => {
    if(cookies.token === process.env.cookieToken){
      router.push('/')
    }
  }, [cookies])


  const handleClick = async () => {
      try {
          await axios.post(`${process.env.api}/api/login`, {
              username,
              password
          })
          router.push('/admin')
      } catch (error) {
          console.log(error);
          setError(true)
      }
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
