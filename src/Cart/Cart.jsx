import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { removeFromCart, updateQuantity, setCart } from "../slice/userSlice"; 

const Cart = () => {
  const { cart, user } = useSelector((state) => state.user); 
  const [productDetails, setProductDetails] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5001/products")
      .then((response) => setProductDetails(response.data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, []);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5001/users/${user.id}`)
        .then((response) => {
          dispatch(setCart(response.data.cart || [])); 
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [user, dispatch]);
  const handleQuantityChange = (itemId, quantity) => {
    const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity);
    dispatch(updateQuantity({ productId: itemId, newQuantity: validQuantity }));
  };
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      toast.error("Your cart is empty");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-500">
            Go back to shop
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => {
            const product = productDetails.find((p) => p.id === item.id) || {};
            return (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.images || ""}
                    alt={product.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name || "Loading..."}</h3>
                    <p className="text-gray-500">Price: ${product.price || 0}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded-md"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="w-12 text-center border p-1 rounded-md"
                      min="1"
                    />
                    <button
                      className="bg-gray-200 px-2 py-1 rounded-md"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">${(product.price || 0) * item.quantity}</p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between items-center mt-6">
            <Link to="/home" className="text-blue-500 hover:text-blue-700">
              Continue Shopping
            </Link>
            <div className="text-xl font-semibold">
              Total: $
              {cart.reduce((total, item) => {
                const product = productDetails.find((p) => p.id === item.id);
                return total + (product ? product.price * item.quantity : 0);
              }, 0)}
            </div>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
