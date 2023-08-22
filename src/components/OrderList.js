import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

console.log(process.env.REACT_APP_SERVER_URL)
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;


const columns = [
  { field: 'id', headerName: 'Order Id', width: 300 },
  { field: 'client', headerName: 'Client Name', width: 170 },
  { field: 'shippingAddress', headerName: 'Shipping Address', width: 290 },
  { field: 'shippingPromise', headerName: 'Shipping Date', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 }
]

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/order');
      setOrders(response.data.map(obj => {
        const { _id, shippingPromise, ...rest } = obj;
        return { ...rest, id: _id, shippingPromise: new Date(shippingPromise).toISOString().slice(0, 10) };
      }));
      console.log(orders)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  const handleFetchReport = async () => {
    try {
      const response = await axios.get(`/api/reports/traveling-between-dates?startDate=${startDate}&endDate=${endDate}`);
      setOrders(response.data.map(obj => {
        const { _id, shippingPromise, ...rest } = obj;
        return { ...rest, id: _id, shippingPromise: new Date(shippingPromise).toISOString().slice(0, 10) };
      }));
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  const handleRowClick = (params) => {
    navigate(`./order-detail/${params.row.id}`)
  }

  return (
    <>
      <div className='page-container'>
        <h1>Orders</h1>
        <div className='travelling-filter'>
          <h3>Filter Travelling Orders</h3>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleFetchReport}>Obtener Reporte</button>
        </div>
        <DataGrid
          className='orders-grid'
          rows={orders}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]} />
      </div>
    </>
  );
};
export default OrderList;