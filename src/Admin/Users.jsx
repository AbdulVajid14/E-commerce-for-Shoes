import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserBlockStatus } from '../slice/adminSlice'; 

function Users() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const viewUserDetails = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsModalOpen(true); 
  };

  const toggleBlockStatus = async (userId) => {
    const user = users.find((u) => u.id === userId);
    
    if (!user) {
      alert("User not found!");
      return;
    }

    const action = user.isBlocked ? "Unblock" : "Block";
    const confirmed = window.confirm(`Are you sure you want to ${action} this user?`);

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(updateUserBlockStatus({ userId, isBlocked: !user.isBlocked }));
      alert(`${action}ed user successfully`);
    } catch (error) {
      console.error("Error updating block status:", error);
      alert("Error updating block status");
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registered Users</h2>
      <ul className="mb-6 space-y-4">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center">
            <span>
              {user.username} ({user.email})
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => viewUserDetails(user.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm sm:text-base"
              >
                View Details
              </button>
              <button
                onClick={() => toggleBlockStatus(user.id)}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  user.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-700"
            >
              &times; 
            </button>
            <h3 className="text-lg font-bold mb-2">User Details</h3>
            <p><strong>Name:</strong> {selectedUser.username || "N/A"}</p>
            <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>

            <h4 className="text-md font-bold mt-4">Cart</h4>
            {selectedUser.cart?.length > 0 ? (
              <ul className="list-disc pl-4">
                {selectedUser.cart.map((item, index) => (
                  <li key={index}>
                    Product ID: {item.id}, Name: {item.name}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in the cart.</p>
            )}

            <h4 className="text-md font-bold mt-4">Orders</h4>
            {selectedUser.orders?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b">Order ID</th>
                      <th className="px-4 py-2 border-b">Status</th>
                      <th className="px-4 py-2 border-b">Total</th>
                      <th className="px-4 py-2 border-b">Order Date</th>
                      <th className="px-4 py-2 border-b">Cart Items</th>
                      <th className="px-4 py-2 border-b">Shipping Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser.orders.map((order, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border-b">{order.orderId}</td>
                        <td className="px-4 py-2 border-b">{order.status}</td>
                        <td className="px-4 py-2 border-b">
                          ${order.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc pl-4">
                            {order.cartItems.map((item, idx) => (
                              <li key={idx}>
                                Product ID: {item.id}, Name :{item.name}, Quantity: {item.quantity}, Price: ${item.price}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-4 py-2 border-b">
                          {order.shippingAddress ? (
                            <div>
                              <p><strong>Name:</strong> {order.shippingAddress.fullName || "N/A"}</p>
                              <p><strong>Phone No:</strong> {order.shippingAddress.phone || "N/A"}</p>
                              <p><strong>Street:</strong> {order.shippingAddress.street || "N/A"}</p>
                              <p><strong>City:</strong> {order.shippingAddress.city || "N/A"}</p>
                              <p><strong>State:</strong> {order.shippingAddress.state || "N/A"}</p>
                              <p><strong>Pincode:</strong> {order.shippingAddress.zipCode || "N/A"}</p>
                            </div>
                          ) : (
                            <p>No shipping address provided for this order.</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No orders placed.</p>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
