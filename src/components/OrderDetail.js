import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const OrderDetail = () => {
  const { orderIdParam } = useParams();
  const [orderId, setOrderId] = useState(orderIdParam);
  const [order, setOrder] = useState(null);
  
  const handleFetchOrder = async () => {
    try {
      const response = await axios.get(`/api/order/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  
  useState(() => {
    handleFetchOrder()
  }, [])

  return (
    <>
      <div className='page-container'>
        <h1>Order Detail</h1>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Ingrese el ID del Pedido"
        />
        <button onClick={handleFetchOrder}>Obtener Pedido</button>
        {order && (
          <div>
            <p>ID: {order._id}</p>
            <p>Client: {order.client}</p>
            <p>Status: {order.status}</p>
            <p>Shipping Address: {order.shippingAddress}</p>
            <p>Shipping Promise: {new Date(order.shippingPromise).toLocaleDateString()}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  <p>Title: {item.title}</p>
                  <p>Description: {item.description}</p>
                  <p>URL: {item.url}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetail;