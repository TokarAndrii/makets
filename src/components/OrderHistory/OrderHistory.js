import React from 'react';
import Button from '../shared/Button/Button';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './OrderHistory.module.css';

const OrderHistory = ({
  orderList,
  className,
  onShowDetails,
  onDelete,
  children,
  disableDetailsBtn,
}) => (
  <AuthContext.Consumer>
    {({ isAuthenticated }) => (
      <div>
        <table className={className}>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Price</th>
              <th>Address of Delivery</th>
              <th>Raiting</th>
              <th style={{ width: '600px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => {
              const currNumber = index;
              return (
                <tr key={order.id}>
                  <td>{currNumber}</td>
                  <td>{order.date}</td>
                  <td>{order.price}</td>
                  <td>{order.address}</td>
                  <td>{order.rating}</td>
                  <td>
                    {!disableDetailsBtn ? (
                      <Button
                        type="button"
                        text="Details"
                        className={styles.OrderHistotyDetailsBtn}
                        onClick={() => onShowDetails(order.id)}
                      />
                    ) : null}
                    {isAuthenticated && (
                      <Button
                        type="button"
                        text="Remove"
                        className={styles.OrderHistotyRmBtn}
                        onClick={() => onDelete(order.id)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>{children}</div>
      </div>
    )}
  </AuthContext.Consumer>
);

export default OrderHistory;
