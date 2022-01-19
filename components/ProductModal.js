import styles from "../styles/ProductModal.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { CircularProgress } from '@mui/material';

const ProductModal = ({ pizza, closePath, close, type }) => {

  const [progress, setProgress] = useState(false)
    
  const [title, setTitle] = useState();
  const [dec, setDec] = useState();
  const [img, setImg] = useState("/img/pizza.png");
  const [prices, setPrices] = useState([0, 0, 0]);
  const [extraOptions, setExtraOptions] = useState([{ text: "", price: 0 }]);

  const router = useRouter();


  const handleClose = () => {
    router.push(closePath);
    close();
  };

  const submitData = async (e) => {
    e.preventDefault()
    setProgress(true)
    const file = new FormData();
    file.append("file", img);
    file.append("upload_preset", "foodie");
    const res = await axios.post('https://api.cloudinary.com/v1_1/dwm55ojtn/image/upload', file)

    switch (type) {
      case "Edit":
        try {
          const { url } = res.data;
          const data = { title, dec, img: url, prices, extraOptions };

          await axios.put(`${process.env.api}/api/products/${pizza}`, data);
          setProgress(false)
          router.push(closePath);
          close();
        } catch (error) {
          console.log(error);
        }
        break;
      case "Create":
        try {
          const { url } = res.data;
          const data = { title, dec, img: url, prices, extraOptions };

          await axios.post(`${process.env.api}/api/products`, data);
          setProgress(false)
          window.location.reload(false)
        } catch (error) {
          throw error;
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (pizza) {
      const getPizza = async (pizza) => {
        try {
          const { data } = await axios.get(
            `${process.env.api}/api/products/${pizza}`
          );
          setTitle(data.title);
          setDec(data.dec);
          setImg(data.img);
          setPrices(data.prices);
          setExtraOptions(data.extraOptions);
        } catch (error) {
          console.log(error);
        }
      };
      getPizza(pizza);
    }
  }, [pizza]);

  const handleChange = (text, method, index, price) => {
    switch (method) {

      case "CHANGE_SIZE_PRICE":
        prices[index] = parseFloat(price);
        setPrices([...prices]);
        break;
      case "ADD_OPTION":
        setExtraOptions([...extraOptions, { text, price }]);
        break;
      case "CHANGE_OPTION_PRICE":
        const optionPrice = (extraOptions[index] = {
          ...extraOptions[index],
          price: parseFloat(price),
        });
        extraOptions.splice(index, 1, optionPrice);
        setExtraOptions([...extraOptions]);
        break;
      case "CHANGE_OPTION_TEXT":
        const optionText = (extraOptions[index] = {
          ...extraOptions[index],
          text,
        });
        extraOptions.splice(index, 1, optionText);
        setExtraOptions([...extraOptions]);
        break;
      case "DELETE_OPTION":
        extraOptions.splice(index);
        setExtraOptions([...extraOptions]);
        break;
    }
  };

  const renderPrices = (prices) => {
    const sizes = ["Small", "Medium", "Large"];
    return prices.map((price, index) => {
      return (
        <div key={sizes[index]} className={styles.sizeItem}>
          <label>{sizes[index]}</label>
          <input
            onChange={(e) =>
              handleChange(null, "CHANGE_SIZE_PRICE", index, e.target.value)
            }
            required
            defaultValue={price}
            type="number"
          />
        </div>
      );
    });
  };

  const renderOptions = (options) => {
    return options.map(({ text, price }, index) => {
      return (
        <div key={index} className={styles.extrasField}>
          <label>Extra Label</label>
          <input
            required
            defaultValue={text}
            type="text"
            onChange={(e) =>
              handleChange(e.target.value, "CHANGE_OPTION_TEXT", index, null)
            }
          />
          <label>Extra Price</label>
          <input
            required
            defaultValue={price}
            type="number"
            onChange={(e) =>
              handleChange(null, "CHANGE_OPTION_PRICE", index, e.target.value)
            }
          />
          <button
            onClick={() => handleChange(null, "DELETE_OPTION", index)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.wrapper}>
          <GrClose onClick={handleClose} className={styles.close} />
          <h1 className={styles.title}>{type} Pizza</h1>
          <form>
            <div className={styles.item}>
              <label className={styles.label}>Pizza Title:</label>
              <input
                defaultValue={title}
                className={styles.input}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={styles.item}>
              <label className={styles.label}>
                Pizza Dec:
                <textarea
                  required
                  onChange={(e) =>
                    setDec(e.target.value)
                  }
                  defaultValue={dec}
                  className={styles.input}
                  rows="4"
                  cols="50"
                />
              </label>
            </div>
            <div className={styles.sizeField}>
              {prices && renderPrices(prices)}
            </div>
            <h3>Extra Add-ons:</h3>
            <div className={styles.extras}>
              {extraOptions && renderOptions(extraOptions)}
              <div className={styles.addButton}>
                <button onClick={(e) => handleChange(null, "ADD_OPTION")}>
                  Add topping
                </button>
              </div>
            </div>
            <div className={styles.image}>
              <label htmlFor="img">Select image:</label>
              <input
                type="file"
                defaultValue={img}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <div className={styles.createContainer}>
              <button
                onClick={(e) => submitData(e)}
                className={styles.create}
              >
                {type} Pizza
              </button>
            </div>
          </form>
        </div>
      </div>
      {progress &&
        <div className={styles.circularProgress}>
        <CircularProgress/>
      </div>
      }  
    </div>
  );
};

export default ProductModal;
