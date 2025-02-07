
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Bar } from 'react-chartjs-2';
// import { fetchDashboardData } from '../slice/adminSlice';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function Dashboard() {
//   const dispatch = useDispatch();
//   const {
//     totalProducts,
//     totalUsers,
//     totalSales,
//     totalProfit,
//     monthlySales,
//     monthlyProfit,
//     loading,
//     error,
//   } = useSelector((state) => state.admin); 

//   useEffect(() => {
//     dispatch(fetchDashboardData()); 
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const salesChartData = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
//     ],
//     datasets: [
//       {
//         label: 'Sales ($)',
//         data: monthlySales,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const profitChartData = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
//     ],
//     datasets: [
//       {
//         label: 'Profit ($)',
//         data: monthlyProfit,
//         backgroundColor: 'rgba(153, 102, 255, 0.6)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold">Total Products</h2>
//           <p className="text-2xl">{totalProducts}</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold">Total Users</h2>
//           <p className="text-2xl">{totalUsers}</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold">Total Amount Spent by All Users</h2>
//           <p className="text-2xl">${totalSales.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Monthly Sales</h2>
//           <Bar data={salesChartData} options={{ responsive: true }} />
//         </div>
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-bold mb-4">Monthly Profit</h2>
//           <Bar data={profitChartData} options={{ responsive: true }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDashboardData } from '../slice/adminSlice';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const {
//     totalProducts,
//     totalUsers,
//     totalSales,
//     totalProfit,
//     monthlySales = [],
//     monthlyProfit = [],
//     recentOrders = [],
//     loading,
//     error,
//   } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchDashboardData());
//   }, [dispatch]);

//   const monthlyData = monthlySales.map((sales, index) => ({
//     month: new Date(0, index).toLocaleString('en-US', { month: 'short' }),
//     sales,
//     profit: monthlyProfit[index] || 0,
//   }));

//   const metrics = [
//     { title: 'Total Sales', value: `$${totalSales.toFixed(2)}`, icon: '💰', trend: '+12%' },
//     { title: 'Total Orders', value: recentOrders.length, icon: '📦', trend: '+5%' },
//     { title: 'Total Users', value: totalUsers, icon: '👥', trend: '+2%' },
//     { title: 'Total Products', value: totalProducts, icon: '🛍️', trend: '+8%' },
//   ];

//   if (loading) return <div className="text-center p-8">Loading dashboard data...</div>;
//   if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {metrics.map((metric, index) => (
//           <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium">{metric.title}</p>
//                 <p className="text-2xl font-bold mt-2">{metric.value}</p>
//                 <span className="text-green-500 text-sm">{metric.trend}</span>
//               </div>
//               <span className="text-3xl opacity-80">{metric.icon}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="text-xl font-semibold mb-4">Monthly Performance</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} name="Sales ($)" />
//               <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit ($)" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-600 border-b">
//                 <th className="pb-3 font-medium">Order ID</th>
//                 <th className="pb-3 font-medium">Customer</th>
//                 <th className="pb-3 font-medium">Date</th>
//                 <th className="pb-3 font-medium">Amount</th>
//                 <th className="pb-3 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((order) => (
//                 <tr key={order.id} className="border-b hover:bg-gray-50">
//                   <td className="py-4">#{order.id?.slice(0, 8)}</td>
//                   <td className="py-4">{order.userName}</td>
//                   <td className="py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
//                   <td className="py-4">${order.totalAmount?.toFixed(2)}</td>
//                   <td className="py-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../slice/adminSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalProducts,
    totalUsers,
    totalSales,
    totalProfit,
    monthlySales,
    monthlyProfit,
    users,
    loading,
    error,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Calculate recent orders from users' orders
  const recentOrders = users
    .flatMap((user) =>
      user.orders.map((order) => ({
        ...order,
        userName: user.username,
        totalAmount: order.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }))
    )
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5); // Show only the 5 most recent orders

  const monthlyData = monthlySales.map((sales, index) => ({
    month: new Date(0, index).toLocaleString('en-US', { month: 'short' }),
    sales: sales,
    profit: monthlyProfit[index],
  }));

  const metrics = [
    { title: 'Total Sales', value: `$${totalSales.toFixed(2)}`, icon: '💰', trend: '+12%' },
    { title: 'Total Orders', value: recentOrders.length, icon: '📦', trend: '+5%' },
    { title: 'Total Users', value: totalUsers, icon: '👥', trend: '+2%' },
    { title: 'Total Products', value: totalProducts, icon: '🛍️', trend: '+8%' },
  ];

  if (loading) return <div className="text-center p-8">Loading dashboard data...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{metric.title}</p>
                <p className="text-2xl font-bold mt-2">{metric.value}</p>
                <span className="text-green-500 text-sm">{metric.trend}</span>
              </div>
              <span className="text-3xl opacity-80">{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Monthly Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Sales ($)"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Profit ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4">Id-{order.orderId?.slice(7, 19)}</td>
                    <td className="py-4">{order.userName}</td>
                    <td className="py-4">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="py-4">${order.totalAmount?.toFixed(2)}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Marketing Campaign</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Launch Campaign
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Export Data</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <span>Export as CSV</span>
              <span className="text-gray-500">📥</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <span>Generate PDF Report</span>
              <span className="text-gray-500">📄</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <span>Custom Report</span>
              <span className="text-gray-500">📊</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;