import styles from "../styles/Footer.module.css"
import Image from "next/image"

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/img/bg.png" layout="fill"/>
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h2 className={styles.motto}>
                        WE DO PIZZA CORRECTLY
                    </h2>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>FIND OUR OTHER STORES</h1>
                    <p className={styles.text}>
                      123 N. West Street
                      <br/> Cincinnati OH, 45330
                      <br/> 513 - 501 - 4209  
                    </p>
                    <p className={styles.text}>
                      123 N. East Street
                      <br/> Columbus OH, 45330
                      <br/> 513 - 501 - 4209  
                    </p>
                    <p className={styles.text}>
                      123 N. North Street
                      <br/> Cleveland OH, 45330
                      <br/> 513 - 501 - 4209  
                    </p>
                    <p className={styles.text}>
                      123 N. South Street
                      <br/> Dayton OH, 45330
                      <br/> 513 - 501 - 4209  
                    </p>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>WORKING HOURS</h1>
                    <p className={styles.text}>
                        MONDAY UNTIL FRIDAY
                        <br /> 9:00 – 22:00
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 – 24:00
                    </p>
                    </div>
            </div>
        </div>
    )
}

export default Footer
