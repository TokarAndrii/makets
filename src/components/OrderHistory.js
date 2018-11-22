import React from 'react';

const OrderHistory = ({ orderList, className }) => (
  <table className={className}>
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Price</th>
        <th>Address of Delivery</th>
        <th>Raiting</th>
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
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default OrderHistory;
