import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setCart, addOrder } from "../slice/userSlice";
import 'react-toastify/dist/ReactToastify.css';  

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
      const updatedOrders = [...user.orders, order];
      await axios.patch(`http://localhost:5001/users/${user.id}`, {
        orders: updatedOrders,
        cart: [], 
        shippingAddress: address, 
        paymentDetails, 
      });
      dispatch(addOrder(order));
      toast.success("Order confirmed! Thank you for shopping.");
      dispatch(setCart([]));
      alert("order confirmed !thank you for shopping") 
      navigate("/orders");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm the order. Please try again.");
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
      {isAddressSet && !isEditingAddress && (
        <div className="border p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <p>
            <strong>Name:</strong> {address.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {address.phone}
          </p>
          <p>
            <strong>Street:</strong> {address.street}
          </p>
          <p>
            <strong>City:</strong> {address.city}
          </p>
          <p>
            <strong>State:</strong> {address.state}
          </p>
          <p>
            <strong>Pin Code:</strong> {address.zipCode}
          </p>
          <button
            className="text-blue-500 mt-4"
            onClick={() => setIsEditingAddress(true)}  >
            Edit Address
          </button>
        </div>
      )}
      {(isEditingAddress || !isAddressSet) && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Shipping Address</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg"
              value={address.fullName}
              onChange={(e) => handleInputChange(e, "fullName", "address")}  />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg"
              value={address.phone}
              onChange={(e) => handleInputChange(e, "phone", "address")}  />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full p-3 border rounded-lg"
              value={address.street}
              onChange={(e) => handleInputChange(e, "street", "address")} />
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border rounded-lg"
              value={address.city}
              onChange={(e) => handleInputChange(e, "city", "address")}  />
            <input
              type="text"
              placeholder="State"
              className="w-full p-3 border rounded-lg"
              value={address.state}
              onChange={(e) => handleInputChange(e, "state", "address")} />
            <input
              type="text"
              placeholder="Pin Code"
              className="w-full p-3 border rounded-lg"
              value={address.zipCode}
              onChange={(e) => handleInputChange(e, "zipCode", "address")}  />
          </div>
          <button
            className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-md"
            onClick={() => setIsEditingAddress(false)}  >
            Save Address
          </button>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
        <div className="space-y-4">
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              onChange={(e) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              checked={paymentDetails.paymentMethod === "Cash on Delivery"} />
            Cash on Delivery
          </label>
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              onChange={(e) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              checked={paymentDetails.paymentMethod === "UPI"} />
            UPI
          </label>
          <label className="block">
            <input
              type="radio"
              name="paymentMethod"
              value="Banking"
              onChange={(e) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              checked={paymentDetails.paymentMethod === "Banking"} />
            Banking
          </label>
        </div>
      </div>
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
