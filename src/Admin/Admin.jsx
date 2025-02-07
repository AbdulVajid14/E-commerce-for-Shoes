
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  const [showModal, setShowModal] = useState(false);
  const handleLogoutClick = () => {
    setShowModal(true);
  };
  const handleCancelLogout = () => {
    setShowModal(false);
  };
  const handleConfirmLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate('/login');
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white p-5 sticky top-0 h-screen flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="flex-1">
          <li className="mb-6">
            <Link to="dashboard" className="text-white hover:text-blue-500">
              Dashboard
            </Link>
          </li>
          <li className="mb-6">
            <Link to="products" className="text-white hover:text-blue-500">
              Products
            </Link>
          </li>
          <li className="mb-6">
            <Link to="users" className="text-white hover:text-blue-500">
              Users
            </Link>
          </li>
          <li className="mb-6">
            <Link to="orders" className="text-white hover:text-blue-500">
              Orders
            </Link>
          </li>
        </ul>

        <div className="mt-auto">
          <button
            onClick={handleLogoutClick}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p>Welcome to the Admin Panel!</p>
        <Outlet />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-lg w-full sm:w-3/4 md:w-1/3">
    <h2 className="text-xl sm:text-2xl font-bold mb-4">Are you sure you want to log out?</h2>
    <div className="flex justify-end space-x-4">
      <button
        onClick={handleCancelLogout}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 text-sm sm:text-base"
      >
        Cancel
      </button>
      <button
        onClick={handleConfirmLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-sm sm:text-base"
      >
        Confirm
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
}

export default Admin;
