import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import ApproveAndNearDeliveryReport from './components/ApproveAndNearDeliveryReport';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Orders</Link>
            </li>
            <li>
              <Link to="/approve-near-delivery-report">Approved near Deliver</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<OrderList />} />
          <Route path="/order-detail/:orderIdParam" element={<OrderDetail />} />
          <Route path="/approve-near-delivery-report" element={<ApproveAndNearDeliveryReport />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;