// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { removeFromCart, updateQuantity, setCart } from "../slice/userSlice"; 

// const Cart = () => {
//   const { cart, user } = useSelector((state) => state.user); 
//   const [productDetails, setProductDetails] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/products")
//       .then((response) => setProductDetails(response.data))
//       .catch((error) => console.error("Error fetching product details:", error));
//   }, []);
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5001/users/${user.id}`)
//         .then((response) => {
//           dispatch(setCart(response.data.cart || [])); 
//         })
//         .catch((error) => console.error("Error fetching cart:", error));
//     }
//   }, [user, dispatch]);
//   const handleQuantityChange = (itemId, quantity) => {
//     const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity);
//     dispatch(updateQuantity({ productId: itemId, newQuantity: validQuantity }));
//   };
//   const handleCheckout = () => {
//     if (cart.length > 0) {
//       navigate("/checkout");
//     } else {
//       toast.error("Your cart is empty");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-semibold mb-6">Your Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p>
//           Your cart is empty.{" "}
//           <Link to="/" className="text-blue-500">
//             Go back to shop
//           </Link>
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => {
//             const product = productDetails.find((p) => p.id === item.id) || {};
//             return (
//               <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={product.images || ""}
//                     alt={product.name || "Product"}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="font-semibold">{product.name || "Loading..."}</h3>
//                     <p className="text-gray-500">Price: ${product.price || 0}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center">
//                     <button
//                       className="bg-gray-200 px-2 py-1 rounded-md"
//                       onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
//                       className="w-12 text-center border p-1 rounded-md"
//                       min="1"
//                     />
//                     <button
//                       className="bg-gray-200 px-2 py-1 rounded-md"
//                       onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="font-semibold">${(product.price || 0) * item.quantity}</p>
//                   <button
//                     className="text-red-500 hover:text-red-700"
//                     onClick={() => dispatch(removeFromCart(item.id))}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//           <div className="flex justify-between items-center mt-6">
//             <Link to="/home" className="text-blue-500 hover:text-blue-700">
//               Continue Shopping
//             </Link>
//             <div className="text-xl font-semibold">
//               Total: $
//               {cart.reduce((total, item) => {
//                 const product = productDetails.find((p) => p.id === item.id);
//                 return total + (product ? product.price * item.quantity : 0);
//               }, 0)}
//             </div>
//             <button
//               className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//               onClick={handleCheckout}
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Cart;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { removeFromCart, updateQuantity, setCart } from "../slice/userSlice";

// const Cart = () => {
//   const { cart, user } = useSelector((state) => state.user);
//   const [productDetails, setProductDetails] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/products")
//       .then((response) => setProductDetails(response.data))
//       .catch((error) => console.error("Error fetching product details:", error));
//   }, []);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5001/users/${user.id}`)
//         .then((response) => {
//           dispatch(setCart(response.data.cart || []));
//         })
//         .catch((error) => console.error("Error fetching cart:", error));
//     }
//   }, [user, dispatch]);

//   const handleQuantityChange = (itemId, quantity) => {
//     const validQuantity = Math.max(1, isNaN(quantity) ? 1 : quantity);
//     dispatch(updateQuantity({ productId: itemId, newQuantity: validQuantity }));
//   };

//   const handleCheckout = () => {
//     if (cart.length > 0) {
//       navigate("/checkout");
//     } else {
//       toast.error("Your cart is empty");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-semibold mb-6">Your Shopping Cart</h2>
//       {cart.length === 0 ? (
//         <p>
//           Your cart is empty.{" "}
//           <Link to="/" className="text-blue-500 hover:text-blue-700 transition-colors">
//             Go back to shop
//           </Link>
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => {
//             const product = productDetails.find((p) => p.id === item.id) || {};
//             return (
//               <div key={item.id} className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex items-center space-x-6">
//                   <img
//                     src={product.images || ""}
//                     alt={product.name || "Product"}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-lg">{product.name || "Loading..."}</h3>
//                     <p className="text-gray-500">Price: ${product.price || 0}</p>
//                     {item.selectedSize && (
//                       <p className="text-gray-500">Size: {item.selectedSize}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-6">
//                   <div className="flex items-center space-x-2">
//                     <button
//                       className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
//                       onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
//                       className="w-12 text-center border p-1 rounded-md"
//                       min="1"
//                     />
//                     <button
//                       className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
//                       onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="font-semibold text-lg">${(product.price || 0) * item.quantity}</p>
//                   <button
//                     className="text-red-500 hover:text-red-700 transition-colors"
//                     onClick={() => dispatch(removeFromCart(item.id))}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//           <div className="flex justify-between items-center mt-8">
//             <Link to="/home" className="text-blue-500 hover:text-blue-700 transition-colors">
//               Continue Shopping
//             </Link>
//             <div className="text-xl font-semibold">
//               Total: $
//               {cart.reduce((total, item) => {
//                 const product = productDetails.find((p) => p.id === item.id);
//                 return total + (product ? product.price * item.quantity : 0);
//               }, 0)}
//             </div>
//             <button
//               className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
//               onClick={handleCheckout}
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Cart;


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
    <div className="container mx-auto p-4 lg:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cart.map((item) => {
              const product = productDetails.find((p) => p.id === item.id) || {};
              return (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col space-y-4">
                    <img
                      src={product.images || ""}
                      alt={product.name || "Product"}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl text-gray-800">{product.name || "Loading..."}</h3>
                      <p className="text-lg font-semibold text-gray-700">${product.price || 0}</p>
                      {item.selectedSize && (
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="w-16 text-center border-2 border-gray-200 p-2 rounded-lg font-medium"
                          min="1"
                        />
                        <button
                          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      <button
                        className="flex items-center space-x-1 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="font-medium">Remove</span>
                      </button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-lg font-bold text-gray-800">
                        Total: ${(product.price || 0) * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <Link 
                to="/" 
                className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium text-gray-700 transition-colors"
              >
                ← Continue Shopping
              </Link>
              <div className="text-2xl font-bold text-gray-800">
                Total: $
                {cart.reduce((total, item) => {
                  const product = productDetails.find((p) => p.id === item.id);
                  return total + (product ? product.price * item.quantity : 0);
                }, 0)}
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all w-full md:w-auto"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;