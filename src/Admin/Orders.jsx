// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from "../slice/adminSlice"; // Adjust the import path as needed
// import { updateOrderStatus } from '../slice/adminSlice';

// const OrdersPage = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.admin);
//   const handleStatusChange = (orderId, status) => {
//     dispatch(updateOrderStatus({ orderId, status }));
//   };
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const allOrders = users.flatMap(user => 
//     user.orders.map(order => ({
//       ...order,
//       user: {
//         username: user.username,
//         email: user.email,
//       },
//     }))
//   );

//   // Sort orders by date (latest first)
//   const sortedOrders = allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

//   return (
//     <div>
//       <h1>Orders</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>User</th>
//             <th>Email</th>
//             <th>Order Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedOrders.map((order) => (
//             <tr key={order.orderId}>
//               <td>{order.orderId}</td>
//               <td>{order.user.username}</td>
//               <td>{order.user.email}</td>
//               <td>{new Date(order.orderDate).toLocaleString()}</td>
//               <td>{order.status}</td>
//               <td>
//                 <button 
//                   onClick={() => handleStatusChange(order.orderId, 'Order Placed')}
//                   disabled={order.status !== 'Pending'}
//                 >
//                   Mark as Order Placed
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrdersPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateOrderStatus } from '../slice/adminSlice';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

//   const handleStatusChange = (orderId, status,userId) => {
//     dispatch(updateOrderStatus({ orderId, status,userId }));
//   };
const handleStatusChange = (orderId, status, userId) => {
    if (!userId) {
      console.error("User ID is undefined for order:", orderId);
      return;
    }
    dispatch(updateOrderStatus({ orderId, status, userId }));
  };
  

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  // Flatten all orders from all users
  const allOrders = users.flatMap(user =>
    user.orders.map(order => ({
      ...order,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    }))
  );

  // Sort orders by date (latest first)
  const sortedOrders = allOrders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleStatusChange(order.orderId, 'Order Placed',order.user.id)}
                    disabled={order.status !== 'Pending'}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                      order.status === 'Pending'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Mark as Order Placed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;