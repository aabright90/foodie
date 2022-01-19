import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({ data }) => {

  const renderCards = () => {
    return data.map(({_id, title, dec, prices, img, extraOptions }) => {
      return <PizzaCard 
        key={_id}
        id={_id} 
        title={title}
        dec={dec}
        prices={prices}
        img={img}
        extraOptions={extraOptions}
      />
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN THE BUCKEYE STATE!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
          {renderCards()}
      </div>
    </div>
  );
};

export default PizzaList;
