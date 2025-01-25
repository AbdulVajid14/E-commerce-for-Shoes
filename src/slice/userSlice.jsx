
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// export const getOrders = createAsyncThunk(
//     "user/getOrders",
//     async (userId, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`http://localhost:5001/users/${userId}`);
//         if (response.data.orders) {
//           return response.data.orders; 
//         } else {
//           throw new Error("No orders found for this user.");
//         }
//       } catch (error) {
//         toast.error("Failed to fetch orders.");
//         return rejectWithValue(error.response?.data || error.message);
//       }
//     }
//   );
// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   cart: JSON.parse(localStorage.getItem("cart")) || [],
//   orders: JSON.parse(localStorage.getItem("orders")) || [],
//   status: "idle", 
//   error: null,     
// };
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.cart = [];
//       state.orders = [];
//       localStorage.removeItem("user");
//       localStorage.removeItem("cart");
//       localStorage.removeItem("orders");
//     },
//     setCart: (state, action) => {
//       state.cart = action.payload;
//       localStorage.setItem("cart", JSON.stringify(action.payload));
//     },
//     addToCart: (state, action) => {
//       const existingItem = state.cart.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         toast.error("Item is already in the cart!");
//         return;
//       }
//       const updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
//       state.cart = updatedCart;
//       if (state.user) {
//         axios.patch(`http://localhost:5001/users/${state.user.id}`, { cart: updatedCart })
//           .then(() => toast.success("Item added to cart!"))
//           .catch(() => toast.error("Failed to add item to cart."));
//       }
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     },
//     removeFromCart: (state, action) => {
//       const updatedCart = state.cart.filter((item) => item.id !== action.payload);
//       state.cart = updatedCart;
//       if (state.user) {
//         axios.patch(`http://localhost:5001/users/${state.user.id}`, { cart: updatedCart })
//           .then(() => toast.success("Item removed from cart!"))
//           .catch(() => toast.error("Failed to remove item from cart."));
//       }
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     },
//     updateQuantity: (state, action) => {
//       const { productId, newQuantity } = action.payload;
//       const updatedCart = state.cart.map((item) =>
//         item.id === productId
//           ? { ...item, quantity: newQuantity, price: (item.price / item.quantity) * newQuantity }
//           : item
//       );
//       state.cart = updatedCart;
//       if (state.user) {
//         axios.patch(`http://localhost:5001/users/${state.user.id}`, { cart: updatedCart })
//           .then(() => toast.success("Quantity updated!"))
//           .catch(() => toast.error("Failed to update quantity."));
//       }
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     },
//     addOrder: (state, action) => {
//       const newOrder = {
//         orderId: `order-${Date.now()}`,
//         status: "Pending",
//         cartItems: action.payload.cartItems,
//         shippingAddress: action.payload.shippingAddress,
//         paymentDetails: action.payload.paymentDetails,
//         orderDate: action.payload.orderDate || new Date().toISOString(),
//       };
//       const updatedOrders = [...state.orders, newOrder];
//       state.orders = updatedOrders;
//       if (state.user) {
//         axios.patch(`http://localhost:5001/users/${state.user.id}`, { orders: updatedOrders })
//           .then(() => toast.success("Order confirmed!"))
//           .catch(() => toast.error("Failed to confirm order."));
//       }
//       localStorage.setItem("orders", JSON.stringify(updatedOrders));
//     },
//   },
//   extraReducers:(builder)=>{
//     builder
//       .addCase(getOrders.pending,(state)=>{
//         state.status = "loading"; 
//       })
//       .addCase(getOrders.fulfilled,(state,action)=>{
//         state.status ="succeeded";
//         state.orders =action.payload; 
//         localStorage.setItem("orders",JSON.stringify(action.payload));
//       })
//       .addCase(getOrders.rejected,(state,action)=>{
//         state.status= "failed";
//         state.error= action.payload || action.error.message;  
//       });
//   },
// });

// export const {
//   setUser,
//   logoutUser,
//   setCart,
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   addOrder,
// } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getOrders = createAsyncThunk(
  "user/getOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5001/users/${userId}`);
      if (response.data.orders) {
        return response.data.orders;
      } else {
        throw new Error("No orders found for this user.");
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: null,
  cart: [],
  orders: [],
  status: "idle",
  error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.cart = [];
      state.orders = [];
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        toast.error("Item is already in the cart!");
        return;
      }
      const updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      state.cart = updatedCart;
      if (state.user) {
        axios
          .patch(`http://localhost:5001/users/${state.user.id}`, { cart: updatedCart })
          .then(() => toast.success("Item added to cart!"))
          .catch(() => toast.error("Failed to add item to cart."));
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter((item) => item.id !== action.payload);
      state.cart = updatedCart;
      if (state.user) {
        axios
          .patch(`http://localhost:5001/users/${state.user.id}`, { cart: updatedCart })
          .then(() => toast.success("Item removed from cart!"))
          .catch(() => toast.error("Failed to remove item from cart."));
      }
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity, price: (item.price / item.quantity) * newQuantity }
          : item
      );
      state.cart = updatedCart;
      if (state.user) {
        axios
          .patch(`http://localhost:5001/users/${state.user.id}`, { cart: updatedCart })
          .then(() => toast.success("Quantity updated!"))
          .catch(() => toast.error("Failed to update quantity."));
      }
    },
    addOrder: (state, action) => {
      const newOrder = {
        orderId: `order-${Date.now()}`,
        status: "Pending",
        cartItems: action.payload.cartItems,
        shippingAddress: action.payload.shippingAddress,
        paymentDetails: action.payload.paymentDetails,
        orderDate: action.payload.orderDate || new Date().toISOString(),
      };
      const updatedOrders = [...state.orders, newOrder];
      state.orders = updatedOrders;
      if (state.user) {
        axios
          .patch(`http://localhost:5001/users/${state.user.id}`, { orders: updatedOrders })
          .then(() => toast.success("Order confirmed!"))
          .catch(() => toast.error("Failed to confirm order."));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setUser,
  logoutUser,
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  addOrder,
} = userSlice.actions;

export default userSlice.reducer;
