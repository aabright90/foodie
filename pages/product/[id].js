import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [total, setTotal] = useState(pizza.prices[size]);
  const [dec] = useState(pizza.dec)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const handleCheck = (option, e) => {
    if (e.target.checked) {
      setTotal((total += option.price));
      setExtras((prev) => [...prev, option]);
    } else {
      setTotal((total -= option.price));
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleSize = (index) => {
    setSize(index);
    setTotal(pizza.prices[index]);
  };

  const renderOptions = () => {
    const { extraOptions } = pizza;
    return extraOptions.map((option, index) => {
      return (
        <div key={index} className={styles.option}>
          <input
            onChange={(e) => handleCheck(option, e)}
            className={styles.checkbox}
            type="checkbox"
            id={option.text}
            name={option.text}
          />
          <label htmlFor={option.text}>{option.text}</label>
        </div>
      );
    });
  };

  const renderSizes = () => {
    const sizes = ["Small", "Medium", "Large"];

    return sizes.map((size, index) => (
      <div key={index} className={styles.size} onClick={() => handleSize(index)}>
        <Image src="/img/size.png" layout="fill" alt="" />
        <span className={styles.number}>{size}</span>
      </div>
    ));
  };

  const handleClick = () => {
    dispatch(addProduct({...pizza, extras, total, quantity}))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
          <span className={styles.price}>${total}</span>
          <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {renderSizes()}
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {renderOptions()}
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} min={1} className={styles.quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button onClick={handleClick} className={styles.button}>Add to Cart</button>
        </div>
        <div className={styles.dec}>
            {dec}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `${process.env.api}/api/products/${params.id}`
  );
  return {
    props: {
      pizza: data,
    },
  };
};

export default Product;
