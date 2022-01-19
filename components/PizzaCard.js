import Image from 'next/image'
import styles from '../styles/PizzaCard.module.css'
import Link from 'next/link'

const PizzaCard = ({ title, dec, prices, img, id }) => {


    return (
        <div className={styles.container}>
            <Link href={`/product/${id}/`} passHref>
                <Image 
                src={img} 
                alt="pizza"
                width="500"
                height="500"
                />
            </Link>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.price}>Starting at ${prices[0]}</span>
            <p className={styles.desc}>
                {dec}
            </p>
        </div>
    )
}

export default PizzaCard


