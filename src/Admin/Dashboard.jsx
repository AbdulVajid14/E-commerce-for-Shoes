
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { fetchDashboardData } from '../slice/adminSlice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const dispatch = useDispatch();
  const {
    totalProducts,
    totalUsers,
    totalSales,
    totalProfit,
    monthlySales,
    monthlyProfit,
    loading,
    error,
  } = useSelector((state) => state.admin); 

  useEffect(() => {
    dispatch(fetchDashboardData()); 
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const salesChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Sales ($)',
        data: monthlySales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const profitChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Profit ($)',
        data: monthlyProfit,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold">Total Products</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold">Total Amount Spent by All Users</h2>
          <p className="text-2xl">${totalSales.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Monthly Sales</h2>
          <Bar data={salesChartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Monthly Profit</h2>
          <Bar data={profitChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
