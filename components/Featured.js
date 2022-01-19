import styles from '../styles/Featured.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';


const Featured = () => {

    const images = [
        "/img/featured.jpeg",
        "/img/featured2.png",
        "/img/featured3.jpg",
    ]

    const renderSlides = (images) => {
        return images.map((img, index) => (
            <div key={index} className={styles.slide}>
                <div className={styles.slideText}>
                    <h1 className={styles.h1}>Sale</h1>
                    <p className={styles.p1}>11% Off</p>
                    <p className={styles.p2}>Anything Delicious!</p>
                </div>
                <div className={styles.slideImage}>
                    <img 
                    className={styles.img}
                    src={img}      
                    />
                </div>
            </div>
        ))
    }

    return (
        <Carousel 
            showThumbs={false}
            className={styles.container}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            >
            {renderSlides(images)}
        </Carousel>   
    )
}

export default Featured



