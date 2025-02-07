// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrders } from '../slice/userSlice';

// const YourOrders = () => {
//   const { orders, user, status, error } = useSelector((state) => state.user); 
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (user) {
//       dispatch(getOrders(user.id));
//     }
//   }, [user, dispatch]);
//   if (status === "loading") {
//     return <div>Loading orders...</div>;
//   }
//   if (status === "failed") {
//     return <div>Error: {error}</div>;
//   }
//   if (orders.length === 0) {
//     return (
//       <div className="orders-page">
//         <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
//         <p className="text-gray-600">You have no orders yet.</p>
//       </div>
//     );
//   }
//   console.log(orders);
//   return (
//     <div className="orders-page">
//       <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
//       <div className="orders-list space-y-4">
//         {orders.map((order) => (
//           <div key={order.orderId} className="order-card border p-4 rounded-lg shadow-sm">
//             <h3 className="font-semibold text-lg">Order ID: {order.orderId}</h3>
//             <p className="text-sm text-gray-500">Status: {order.status}</p>
//             <p className="text-sm text-gray-500">
//               Order Date: {new Date(order.orderDate).toLocaleString()}
//             </p>
//             <div className="cart-items mt-2">
//               <h4 className="font-medium">Items:</h4>
//               <ul className="list-disc ml-5 text-sm">
//                 {order.cartItems && order.cartItems.length > 0 ? (
//                   order.cartItems.map((item, index) => (
//                     <li key={index} className="flex items-center space-x-4">
//                       <div className="flex-grow">
//                         <div>{item.productName}</div>
//                         <div>Quantity: {item.quantity}</div>
//                         <div>Price: ${item.price}</div>
//                       </div>
//                       {item.images && (
//                         <img
//                           src={item.images}
//                           alt={item.productName}
//                           className="w-16 h-16 object-cover rounded-md"
//                         />
//                       )}
//                     </li>
//                   ))
//                 ) : (
//                   <li>No items found in this order.</li>
//                 )}
//               </ul>
//             </div>
//             <div className="shipping-details mt-2">
//               <h4 className="font-medium">Shipping Address:</h4>
//               <p className="text-sm">{order.shippingAddress?.fullName}</p>
//               <p className="text-sm">{order.shippingAddress?.phone}</p>
//               <p className="text-sm">{order.shippingAddress?.street}</p>
//               <p className="text-sm">{order.shippingAddress?.city}</p>
//               <p className="text-sm">{order.shippingAddress?.state}</p>
//               <p className="text-sm">{order.shippingAddress?.zipCode}</p>
//             </div>
//             <div className="payment-details mt-2">
//               <h4 className="font-medium">Payment Details:</h4>
//               <p className="text-sm">Method: {order.paymentDetails?.paymentMethod}</p>
//               <p className="text-sm">
//                 Total: $
//                 {order.cartItems
//                   ? order.cartItems.reduce(
//                       (total, item) => total + item.price * item.quantity,
//                       0
//                     ).toFixed(2)
//                   : '0.00'}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default YourOrders;

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

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading orders...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
          <p className="text-gray-600">You have no orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Order List */}
        <div className="lg:col-span-2 space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Order ID: {order.orderId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Status:{' '}
                    <span
                      className={`font-medium ${
                        order.status === 'pending'
                          ? 'text-yellow-600'
                          : order.status === 'delivered'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Order Date: {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Details
                </button>
              </div>

              {/* Order Items */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Items:</h4>
                <ul className="mt-2 space-y-3">
                  {order.cartItems && order.cartItems.length > 0 ? (
                    order.cartItems.map((item, index) => (
                      <li key={index} className="flex items-center space-x-4">
                        {item.images && (
                          <img
                            src={item.images}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-grow">
                          <p className="font-medium text-gray-800">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ${item.price}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No items found in this order.</li>
                  )}
                </ul>
              </div>

              {/* Shipping and Payment Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Shipping Address:</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.street}, {order.shippingAddress?.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress?.state}, {order.shippingAddress?.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {order.shippingAddress?.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Payment Details:</h4>
                  <p className="text-sm text-gray-600">
                    Method: {order.paymentDetails?.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: $
                    {order.cartItems
                      ? order.cartItems
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)
                      : '0.00'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary or Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders:</span>
              <span className="font-medium">{orders.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Orders:</span>
              <span className="font-medium text-yellow-600">
                {orders.filter((order) => order.status === 'Pending').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivered Orders:</span>
              <span className="font-medium text-green-600">
                {orders.filter((order) => order.status === 'Order Placed').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cancelled Orders:</span>
              <span className="font-medium text-red-600">
                {orders.filter((order) => order.status === 'cancelled').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOrders;