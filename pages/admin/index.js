import Image from "next/image";
import Link from "next/link"
import styles from '../../styles/Admin.module.css';
import React, { useState, useEffect } from 'react'
import axios from "axios";
import ProductModal from '../../components/ProductModal'
import Confirm from '../../components/Confirm'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'


const index = ({ orders, products, users }) => {

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [orderList, setOrderList] = useState(orders)
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [cookies] = useCookies()
    
    const router = useRouter()
    const productId = router.query.product

    
    useEffect(() => {
      if(cookies.token !== process.env.cookieToken){
          router.push('/login')
      } 
    },[cookies])
    
    
   const handleOrderUpdates = async (id, method, index) => {
       switch (method) {
           case 'UPDATE': 
           const statusUpdate = orderList[index].status += 1
           const updatedOrder = { ...orderList[index] }
           orderList.splice(index, 1, updatedOrder) 
            try {
               axios.put(`${process.env.api}/api/orders/${id}`, { status: statusUpdate });
               setOrderList([...orderList]); 
             } catch (error) {
               throw error
             }
             break
           case 'DELETE':
            try {
                await axios.delete(`${process.env.api}/api/orders/${id}`)
                orderList.splice(index, 1)
                setOrderList([...orderList])
            } catch (error) {
                throw error
            }     
       }
   }

  const renderProducts = () => {
    return products.map(({ _id, title, img, prices }) => {
      return (
        <tr key={_id} className={styles.trTitle}>
          <td>
            <Image src={img} width={50} height={50} objectFit="cover" alt="" />
          </td>
          <Link href={`/product/${_id}`}>
            <td className={styles.itemLink}>{_id.slice(0, 10)}...</td>
          </Link>
          <td>{title}</td>
          <td>{prices.map(price => <span key={price} > ${price}</span>)}</td>
          <td>
              <Link href={`/admin/?product=${_id}`} passHref>
                <button onClick={() => setEdit(true)} className={styles.button}>Edit</button>
              </Link>
              <Link href={`/admin/?product=${_id}`} passHref>
                <button onClick={() => setDeleteOpen(true)}     className={styles.button}>Delete</button>
              </Link>
          </td>
        </tr>
      );
    });
  };

  const renderOrders = () => {
    const orderStatus = ["Paid", "Preparing", "On the way", "Delivered"];
    const methodLabels = ['Paid', 'Cash on Delivery']

    return orderList.map(({ _id, customer, total, status, method }, index) => {
      return (
        <tr key={_id} className={styles.trTitle}>
          <Link href={`/orders/${_id}`}>
            <td className={styles.itemLink}>{_id.slice(0, 10)}...</td>
          </Link>
          <td>{customer}</td>
          <td>${total}</td>
          <td>{methodLabels[method]}</td>
          <td>{orderStatus[status]}</td>
          <td>
            <button 
                style={{ display: status > 2 && 'none' }} 
                onClick={() => handleOrderUpdates(_id, 'UPDATE', index)}
                >Next Stage</button>
            <button
                className={styles.orderDelete}
                style={{ display: status > 2 ? 'block' : 'none'}} 
                onClick={() => handleOrderUpdates(_id, 'DELETE', index)}
                >Delete</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id={styles.tbody}>
                {renderProducts()}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.productFooter}>
            <button 
            onClick={() => setCreate(true)}
            className={styles.createButton}
            >Create Product</button>
        </div>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderOrders()}
          </tbody>
        </table>
      </div>
      <div style={{ display: edit ? 'block' : 'none' }}>
        <ProductModal 
          pizza={productId} 
          close={() => setEdit(false)} 
          type={'Edit'}
          closePath={'/admin'}
        />
      </div>
      <div style={{ display: create ? 'block' : 'none' }}>
        <ProductModal 
          pizza={null} 
          close={() => setCreate(false)} 
          type={'Create'}
          closePath={'/admin'}
        />
      </div>
      <div style={{ display: deleteOpen ? 'block' : 'none' }}>
        <Confirm 
          pizza={productId}
          theme={'red'}
          title={'Warning!'}
          no={() => setDeleteOpen(false)}
        />
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps = async () => {
    try {
      const orders = await axios.get(`${process.env.api}/api/orders/`);
      const products = await axios.get(`${process.env.api}/api/products/`);
      return {
        props: {
          orders: orders.data,
          products: products.data,
      }
    }
  } catch (error) {
    throw error
  }
};

