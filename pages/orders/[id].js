import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {
  
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  const statusElements = [
    { type: "Payment", status: statusClass(0), img: "/img/paid.png" },
    { type: "Preparing", status: statusClass(1), img: "/img/bake.png" },
    { type: "On the way", status: statusClass(2), img: "/img/bike.png" },
    { type: "Delivered", status: statusClass(3), img: "/img/delivered.png" }
  ];

  const renderElements = () => statusElements.map(({ type, status, img }, key) => {
    return (
      <div key={key} className={status}>
        <Image src={img} width={30} height={30} alt="" />
        <span>{type}</span>
        <div className={styles.checkedIcon}>
          <Image
            className={styles.checkedIcon}
            src="/img/checked.png"
            width={20}
            height={20}
            alt=""
          />
        </div>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.trTitle}>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>
                  {order.address}
                </span>
              </td>
              <td>
                <span className={styles.total}>${order.total}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          {renderElements()}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/orders/${params.id}`
  );
  return {
    props: {
      order: data,
    },
  };
};