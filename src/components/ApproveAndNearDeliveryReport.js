import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveAndNearDeliveryReport = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchApproveAndNearDeliveryOrders();
  }, []);

  const fetchApproveAndNearDeliveryOrders = async () => {
    try {
      const response = await axios.get('/api/reports/approve-and-near-delivery');
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  return (
    <main>
      <h2>Approved near deliver Orders</h2>
      {orders.map((order) => (
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
      ))}
    </main>
  );
};

export default ApproveAndNearDeliveryReport;