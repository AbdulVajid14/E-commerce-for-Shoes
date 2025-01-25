import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../slice/userSlice';

const YourOrders = () => {
  const { orders, user, status, error } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getOrders(user.id));
    }
  }, [user, dispatch]);
  if (status === "loading") {
    return <div>Loading orders...</div>;
  }
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <p className="text-gray-600">You have no orders yet.</p>
      </div>
    );
  }
  console.log(orders);
  return (
    <div className="orders-page">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="orders-list space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Order ID: {order.orderId}</h3>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
            <p className="text-sm text-gray-500">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
            <div className="cart-items mt-2">
              <h4 className="font-medium">Items:</h4>
              <ul className="list-disc ml-5 text-sm">
                {order.cartItems && order.cartItems.length > 0 ? (
                  order.cartItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="flex-grow">
                        <div>{item.productName}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>Price: ${item.price}</div>
                      </div>
                      {item.images && (
                        <img
                          src={item.images}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                    </li>
                  ))
                ) : (
                  <li>No items found in this order.</li>
                )}
              </ul>
            </div>
            <div className="shipping-details mt-2">
              <h4 className="font-medium">Shipping Address:</h4>
              <p className="text-sm">{order.shippingAddress?.fullName}</p>
              <p className="text-sm">{order.shippingAddress?.phone}</p>
              <p className="text-sm">{order.shippingAddress?.street}</p>
              <p className="text-sm">{order.shippingAddress?.city}</p>
              <p className="text-sm">{order.shippingAddress?.state}</p>
              <p className="text-sm">{order.shippingAddress?.zipCode}</p>
            </div>
            <div className="payment-details mt-2">
              <h4 className="font-medium">Payment Details:</h4>
              <p className="text-sm">Method: {order.paymentDetails?.paymentMethod}</p>
              <p className="text-sm">
                Total: $
                {order.cartItems
                  ? order.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ).toFixed(2)
                  : '0.00'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourOrders;
