
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5001/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUserBlockStatus = createAsyncThunk(
  'admin/updateUserBlockStatus',
  async ({ userId, isBlocked }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:5001/users/${userId}`, { isBlocked });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const productsResponse = await axios.get('http://localhost:5001/products');
      const usersResponse = await axios.get('http://localhost:5001/users');
      
      const products = productsResponse.data;
      const users = usersResponse.data;

      const monthlySales = Array(12).fill(0);
      const monthlyProfit = Array(12).fill(0);

      users.forEach((user) => {
        if (user.orders && Array.isArray(user.orders)) {
          user.orders.forEach((order) => {
            const orderDate = new Date(order.orderDate);
            const month = orderDate.getMonth();
            
            order.cartItems.forEach((item) => {
              monthlySales[month] += item.price;
              monthlyProfit[month] += item.price * 0.3; 
            });
          });
        }
      });

      return {
        totalProducts: products.length,
        totalUsers: users.length,
        totalSales: monthlySales.reduce((sum, value) => sum + value, 0),
        totalProfit: monthlyProfit.reduce((sum, value) => sum + value, 0),
        monthlySales,
        monthlyProfit,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5001/products', newProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'admin/editProduct',
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5001/products/${id}`, updatedProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    totalProfit: 0,
    monthlySales: [],
    monthlyProfit: [],
    products: [],
    users: [], 
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUserBlockStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.totalProducts;
        state.totalUsers = action.payload.totalUsers;
        state.totalSales = action.payload.totalSales;
        state.totalProfit = action.payload.totalProfit;
        state.monthlySales = action.payload.monthlySales;
        state.monthlyProfit = action.payload.monthlyProfit;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setProducts } = adminSlice.actions;

export default adminSlice.reducer;
