// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { setCart, addOrder } from "../slice/userSlice";
// import 'react-toastify/dist/ReactToastify.css';  

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, cart } = useSelector((state) => state.user);
//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   });
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//     paymentMethod: "", 
//   });
//   const [isAddressSet, setIsAddressSet] = useState(false); 
//   const [isEditingAddress, setIsEditingAddress] = useState(false); 
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5001/users/${user.id}`)
//         .then((response) => {
//           const userData = response.data;
//           if (userData.shippingAddress) {
//             setAddress(userData.shippingAddress);
//             setIsAddressSet(true);
//           }
//           if (userData.paymentDetails) {
//             setPaymentDetails(userData.paymentDetails);
//           }
//         })
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, [user]);
//   const handleInputChange = (e, field, section) => {
//     const value = e.target.value;
//     if (section === "address") {
//       setAddress((prev) => ({ ...prev, [field]: value }));
//     } else {
//       setPaymentDetails((prev) => ({ ...prev, [field]: value }));
//     }
//   };
//   const validateInputs = () => {
//     if (
//       !address.fullName ||
//       !address.phone ||
//       !address.street ||
//       !address.city ||
//       !address.state ||
//       !address.zipCode ||
//       !paymentDetails.paymentMethod
//     ) {
//       toast.error("Please fill in all required fields.");
//       return false;
//     }
//     return true;
//   };
//   const handleConfirmOrder = async () => {
//     if (!cart || cart.length === 0) {
//       toast.error("Your cart is empty. Please add items to your cart.");
//       return;
//     }
//     if (!validateInputs()) return;
//     const orderId = `order-${Date.now()}`;
//     const status = "pending";
//     const updatedCartItems = await Promise.all(
//       cart.map(async (item) => {
//         try {
//           const productResponse = await axios.get(
//             `http://localhost:5001/products/${item.id}`
//           );
//           const product = productResponse.data;
//           return {
//             ...item,
//             productName: product.name, 
//             productImage: product.image, 
//           };
//         } catch (error) {
//           console.error(
//             `Error fetching product details for item ${item.id}:`,
//             error
//           );
//           return item;
//         }
//       })
//     );
//     const order = {
//       orderId,
//       status,
//       cartItems: updatedCartItems,
//       shippingAddress: address,
//       paymentDetails,
//       orderDate: new Date().toISOString(),
//     };
//     try {
//       const updatedOrders = [...user.orders, order];
//       await axios.patch(`http://localhost:5001/users/${user.id}`, {
//         orders: updatedOrders,
//         cart: [], 
//         shippingAddress: address, 
//         paymentDetails, 
//       });
//       dispatch(addOrder(order));
//       toast.success("Order confirmed! Thank you for shopping.");
//       dispatch(setCart([]));
//       alert("order confirmed !thank you for shopping") 
//       navigate("/orders");
//     } catch (error) {
//       console.error("Error confirming order:", error);
//       toast.error("Failed to confirm the order. Please try again.");
//     }
//   };
//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
//       {isAddressSet && !isEditingAddress && (
//         <div className="border p-4 mb-6">
//           <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
//           <p>
//             <strong>Name:</strong> {address.fullName}
//           </p>
//           <p>
//             <strong>Phone:</strong> {address.phone}
//           </p>
//           <p>
//             <strong>Street:</strong> {address.street}
//           </p>
//           <p>
//             <strong>City:</strong> {address.city}
//           </p>
//           <p>
//             <strong>State:</strong> {address.state}
//           </p>
//           <p>
//             <strong>Pin Code:</strong> {address.zipCode}
//           </p>
//           <button
//             className="text-blue-500 mt-4"
//             onClick={() => setIsEditingAddress(true)}  >
//             Edit Address
//           </button>
//         </div>
//       )}
//       {(isEditingAddress || !isAddressSet) && (
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-3">Shipping Address</h3>
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full p-3 border rounded-lg"
//               value={address.fullName}
//               onChange={(e) => handleInputChange(e, "fullName", "address")}  />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full p-3 border rounded-lg"
//               value={address.phone}
//               onChange={(e) => handleInputChange(e, "phone", "address")}  />
//             <input
//               type="text"
//               placeholder="Street Address"
//               className="w-full p-3 border rounded-lg"
//               value={address.street}
//               onChange={(e) => handleInputChange(e, "street", "address")} />
//             <input
//               type="text"
//               placeholder="City"
//               className="w-full p-3 border rounded-lg"
//               value={address.city}
//               onChange={(e) => handleInputChange(e, "city", "address")}  />
//             <input
//               type="text"
//               placeholder="State"
//               className="w-full p-3 border rounded-lg"
//               value={address.state}
//               onChange={(e) => handleInputChange(e, "state", "address")} />
//             <input
//               type="text"
//               placeholder="Pin Code"
//               className="w-full p-3 border rounded-lg"
//               value={address.zipCode}
//               onChange={(e) => handleInputChange(e, "zipCode", "address")}  />
//           </div>
//           <button
//             className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-md"
//             onClick={() => setIsEditingAddress(false)}  >
//             Save Address
//           </button>
//         </div>
//       )}
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
//         <div className="space-y-4">
//           <label className="block">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="Cash on Delivery"
//               onChange={(e) =>
//                 setPaymentDetails((prev) => ({
//                   ...prev,
//                   paymentMethod: e.target.value,
//                 }))
//               }
//               checked={paymentDetails.paymentMethod === "Cash on Delivery"} />
//             Cash on Delivery
//           </label>
//           <label className="block">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="UPI"
//               onChange={(e) =>
//                 setPaymentDetails((prev) => ({
//                   ...prev,
//                   paymentMethod: e.target.value,
//                 }))
//               }
//               checked={paymentDetails.paymentMethod === "UPI"} />
//             UPI
//           </label>
//           <label className="block">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="Banking"
//               onChange={(e) =>
//                 setPaymentDetails((prev) => ({
//                   ...prev,
//                   paymentMethod: e.target.value,
//                 }))
//               }
//               checked={paymentDetails.paymentMethod === "Banking"} />
//             Banking
//           </label>
//         </div>
//       </div>
//       <button
//         className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         onClick={handleConfirmOrder}>
//         Confirm Order
//       </button>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast ,ToastContainer} from "react-toastify";
import axios from "axios";
import { setCart, addOrder } from "../slice/userSlice";
import 'react-toastify/dist/ReactToastify.css';

const CreditCardIcon = () => (
  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const UPIIcon = () => (
  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const CashIcon = () => (
  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => state.user);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "", 
  });
  const [isAddressSet, setIsAddressSet] = useState(false); 
  const [isEditingAddress, setIsEditingAddress] = useState(false); 
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5001/users/${user.id}`)
        .then((response) => {
          const userData = response.data;
          if (userData.shippingAddress) {
            setAddress(userData.shippingAddress);
            setIsAddressSet(true);
          }
          if (userData.paymentDetails) {
            setPaymentDetails(userData.paymentDetails);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user]);
  const handleInputChange = (e, field, section) => {
    const value = e.target.value;
    if (section === "address") {
      setAddress((prev) => ({ ...prev, [field]: value }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [field]: value }));
    }
  };
  const validateInputs = () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !paymentDetails.paymentMethod
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };
  // const handleConfirmOrder = async () => {
  //   if (!cart || cart.length === 0) {
  //     toast.error("Your cart is empty. Please add items to your cart.");
  //     return;
  //   }
  //   if (!validateInputs()) return;
  //   const orderId = `order-${Date.now()}`;
  //   const status = "pending";
  //   const updatedCartItems = await Promise.all(
  //     cart.map(async (item) => {
  //       try {
  //         const productResponse = await axios.get(
  //           `http://localhost:5001/products/${item.id}`
  //         );
  //         const product = productResponse.data;
  //         return {
  //           ...item,
  //           productName: product.name, 
  //           productImage: product.image, 
  //         };
  //       } catch (error) {
  //         console.error(
  //           `Error fetching product details for item ${item.id}:`,
  //           error
  //         );
  //         return item;
  //       }
  //     })
  //   );
  //   const order = {
  //     orderId,
  //     status,
  //     cartItems: updatedCartItems,
  //     shippingAddress: address,
  //     paymentDetails,
  //     orderDate: new Date().toISOString(),
  //   };
  //   try {
  //     const updatedOrders = [...(user.orders || []), order];
  //     await axios.patch(`http://localhost:5001/users/${user.id}`, {
  //       orders: updatedOrders,
  //       cart: [], 
  //       shippingAddress: address, 
  //       paymentDetails, 
  //     });
  //     dispatch(addOrder(order));
  //     toast.success("Order confirmed! Thank you for shopping.");
  //     dispatch(setCart([]));
  //     alert("order confirmed !thank you for shopping") 
  //     navigate("/orders");
  //   } catch (error) {
  //     console.error("Error confirming order:", error);
  //     toast.error("Failed to confirm the order. Please try again.");
  //   }
  // };
  const handleConfirmOrder = async () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty. Please add items to your cart.");
      return;
    }
    if (!validateInputs()) return;
  
    const orderId = `order-${Date.now()}`;
    const status = "pending";
  
    const updatedCartItems = await Promise.all(
      cart.map(async (item) => {
        try {
          const productResponse = await axios.get(
            `http://localhost:5001/products/${item.id}`
          );
          const product = productResponse.data;
          return {
            ...item,
            productName: product.name,
            productImage: product.image,
          };
        } catch (error) {
          console.error(
            `Error fetching product details for item ${item.id}:`,
            error
          );
          return item;
        }
      })
    );
  
    const order = {
      orderId,
      status,
      cartItems: updatedCartItems,
      shippingAddress: address,
      paymentDetails,
      orderDate: new Date().toISOString(),
    };
  
    try {
      const updatedOrders = [...(user.orders || []), order];
      await axios.patch(`http://localhost:5001/users/${user.id}`, {
        orders: updatedOrders,
        cart: [], // Clear the cart in the backend
        shippingAddress: address,
        paymentDetails,
      });
  
      // Dispatch actions to update Redux state
      dispatch(addOrder(order));
      dispatch(setCart([])); // Clear the cart in the Redux state
  
      toast.success("Order confirmed! Thank you for shopping.");
      alert("Order confirmed! Thank you for shopping.");
      navigate("/orders");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm the order. Please try again.");
    }
  };
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Address Section */}
          {isAddressSet && !isEditingAddress && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">Shipping Address</h3>
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                  onClick={() => setIsEditingAddress(true)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {address.fullName}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {address.phone}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
                </p>
              </div>
            </div>
          )}

          {(isEditingAddress || !isAddressSet) && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Shipping Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address.fullName}
                    onChange={(e) => handleInputChange(e, "fullName", "address")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address.phone}
                    onChange={(e) => handleInputChange(e, "phone", "address")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address.street}
                    onChange={(e) => handleInputChange(e, "street", "address")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address.city}
                    onChange={(e) => handleInputChange(e, "city", "address")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address.state}
                    onChange={(e) => handleInputChange(e, "state", "address")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address.zipCode}
                    onChange={(e) => handleInputChange(e, "zipCode", "address")}
                  />
                </div>
              </div>
              <button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={() => setIsEditingAddress(false)}
              >
                Save Address
              </button>
            </div>
          )}

          {/* Payment Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Payment Method</h3>
            <div className="space-y-4">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentDetails.paymentMethod === "Cash on Delivery"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setPaymentDetails(prev => ({ ...prev, paymentMethod: "Cash on Delivery" }))}
              >
                <div className="flex items-center">
                  <CashIcon />
                  <div>
                    <h4 className="font-medium text-gray-800">Cash on Delivery</h4>
                    <p className="text-sm text-gray-600">Pay when you receive your order</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentDetails.paymentMethod === "UPI"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setPaymentDetails(prev => ({ ...prev, paymentMethod: "UPI" }))}
              >
                <div className="flex items-center">
                  <UPIIcon />
                  <div>
                    <h4 className="font-medium text-gray-800">UPI Payment</h4>
                    <p className="text-sm text-gray-600">Pay using UPI apps like Google Pay, PhonePe</p>
                    {paymentDetails.paymentMethod === "UPI" && (
                      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                        <img 
                          src="src\assets\qrcode_localhost.png" 
                          alt="UPI QR Code" 
                          className="w-48 h-48 mx-auto mb-3"
                        />
                        <p className="text-center text-sm">Scan QR code to complete payment</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentDetails.paymentMethod === "Banking"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setPaymentDetails(prev => ({ ...prev, paymentMethod: "Banking" }))}
              >
                <div className="flex items-center">
                  <CreditCardIcon />
                  <div className="w-full">
                    <h4 className="font-medium text-gray-800">Credit/Debit Card</h4>
                    {paymentDetails.paymentMethod === "Banking" && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
                          <img src="src\assets\visa-logo-png-2020.png" alt="Visa" className="h-8" />
                          <img src="src/assets/pngimg.com - mastercard_PNG16.png" alt="Mastercard" className="h-8" />
                          <img src="src\assets\pngimg.com - paypal_PNG7.png" alt="PayPal" className="h-8" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-8">
  <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
  <div className="space-y-4">
    {/* Order Items */}
    {cart.map((item) => {
      // Calculate item total using Redux cart data
      const itemTotal = item.price * item.quantity;

      return (
        <div key={item.id} className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={item.images}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x ${item.price.toFixed(2)}
              </p>
              {item.selectedSize && (
                <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
              )}
            </div>
          </div>
          <p className="font-medium text-gray-800">${itemTotal.toFixed(2)}</p>
        </div>
      );
    })}

    {/* Pricing Calculations */}
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-medium">
          $
          {cart
            .reduce((total, item) => total + (item.price * item.quantity), 0)
            .toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Shipping:</span>
        <span className="font-medium">$5.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Tax (10%):</span>
        <span className="font-medium">
          $
          {(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.1)
            .toFixed(2)}
        </span>
      </div>
      <div className="border-t pt-4 flex justify-between">
        <span className="text-lg font-bold text-gray-800">Total:</span>
        <span className="text-lg font-bold text-gray-800">
          $
          {(
            cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.1 + 5
          ).toFixed(2)}
        </span>
      </div>
    </div>
  </div>

  {/* Confirm Order Button */}
  <button
    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
    onClick={handleConfirmOrder}
  >
    Confirm Order
  </button>
</div>
      
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Checkout;