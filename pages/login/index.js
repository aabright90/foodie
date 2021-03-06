import styles from "../../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from 'react-cookie'
import { adminPath } from "../../lib/adminPath";
import { CircularProgress } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [circularProgress, setCircularProgress] = useState(false)
  const [error, setError] = useState(null);
  const [cookies] = useCookies()

  const router = useRouter();

  

  useEffect(() => {
    if(cookies.token === process.env.cookieToken){
      router.push('/')
    }
  }, [cookies])


  const handleClick = async () => {
      setCircularProgress(true)
      try {
          await axios.post(`${process.env.api}/api/login`, {
              username,
              password
          })
          setCircularProgress(false)
          adminPath()
      } catch (error) {
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
      { circularProgress && (
      <div className={styles.circularProgress}>
        <CircularProgress />
      </div>
      )}
    </div>
  );
};

export default Login;
