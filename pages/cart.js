import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import OrderModal from "../components/OrderModal";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false)
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

    const createOrder = async (data) => {
      try {
        const res = await axios.post(`${process.env.api}/api/orders`, data);
        res.status === 201 && router.push(`/orders/${res.data._id}`);
        dispatch(reset());
      } catch (error) {
        throw error
      }
    };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();


    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  const renderRow = () =>
    cart.products.map((product) => {
      const renderExtras = () => (
        <>
          <h3 className={styles.extrasTitle}>Extras:</h3>
          {product.extras.map((extra, index) => (
            <span key={index} className={styles.extras}>
              {index + 1}. {extra.text} - ${extra.price}
              <br />
            </span>
          ))}
        </>
      );

      return (
        <tbody>
          <tr key={product._id} className={styles.tr}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>{renderExtras()}</td>
            <td>
              <span className={styles.price}>{product.total}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
              <span className={styles.total}>
                ${product.total * product.quantity}
              </span>
            </td>
          </tr>
        </tbody>
      );
    });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {renderRow()}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          <button
            onClick={() => setOpen(true)}
            style={{ display: open ? "none" : "block" }}
            className={styles.button}
          >
            CHECKOUT NOW!
          </button>
          <div
            className={styles.paymentMethods}
            style={{ display: open ? "block" : "none" }}
          >
            <button onClick={() => setCash(true)} className={styles.payButton}>CASH ON DELIVERY</button>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AaWhGMMpBEMv0Szdp6PnxsjY8oZWgXxxb_dTqSkn_qFzWTR8ZbHhcg8ZfZF28BvXjr83iFBeAl2xlzjz",
                components: "buttons",
                currency: "USD",
                "disable-funding": "credit,card,p24",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
      {cash && <OrderModal 
      total={cart.total} 
      createOrder={createOrder}
      />}
    </div>
  );
};

export default Cart;
