import styles from '../styles/Confirm.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Confirm = ({ pizza, no, title, theme = null }) => {

    const [name, setName] = useState()

    const deletePizza = async (pizza) => {
        try {
           await axios.delete(`http://localhost:3000/api/products/${pizza}`)
           window.location.reload(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (pizza) {
          const getPizza = async (pizza) => {
            try {
              const { data } = await axios.get(
                `http://localhost:3000/api/products/${pizza}`
              );
              setName(data.title)
            } catch (error) {
              throw error
            }
          };
          getPizza(pizza);
        }
      }, [pizza]);

    return (
        <div className={styles.container}>
           <div style={{ border: `6px solid ${theme}`, padding: '6px'}} className={styles.wrapper}>
               <h1 style={{ color:`${theme}`}}>{title}</h1>
               <p>You are about to delete pizza: <strong> {pizza}, {name}</strong>. Do you wish to proceed?</p>
               <div>
                    <button className={styles.button} onClick={() => no()}>No</button>
                    <button className={styles.button} onClick={() => deletePizza(pizza)}>Yes</button>
               </div>
            </div> 
        </div>
    )
}

export default Confirm
