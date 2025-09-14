import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './CustomerQueue.css';

const CustomerQueue = () => {
  const { queue } = useSelector(state => state.customers);

  return (
    <motion.div
      className="customer-queue"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="queue-header">
        <h2>👥 Customers</h2>
        <span className="queue-count">{queue.length}/3</span>
      </div>

      <div className="queue-list">
        {queue.length === 0 ? (
          <div className="empty-queue">
            <p>Waiting for customers...</p>
          </div>
        ) : (
          queue.map((customer, index) => (
            <motion.div
              key={customer.id}
              className={`customer-card ${customer.isVIP ? 'vip' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="customer-avatar">
                {customer.avatar}
                {customer.isVIP && <span className="vip-badge">VIP</span>}
              </div>

              <div className="customer-info">
                <h3>{customer.name}</h3>
                <div className="customer-order">
                  <p>Order: {customer.order.ingredients.join(', ')}</p>
                  <p>Method: {customer.order.cookingMethod}</p>
                </div>
              </div>

              <div className="customer-patience">
                <div className="patience-bar">
                  <div
                    className="patience-fill"
                    style={{
                      width: `${(customer.patience / customer.maxPatience) * 100}%`,
                      backgroundColor: customer.patience > 60 ? '#2ed573' :
                                     customer.patience > 30 ? '#ffa502' : '#ff3838'
                    }}
                  ></div>
                </div>
                <span className="patience-text">
                  {Math.round(customer.patience)}%
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default CustomerQueue;