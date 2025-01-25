
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './Admin/Admin';
import Dashboard from './Admin/Dashboard';
import Products from './Admin/Products';
import Users from './Admin/Users';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import ProductDetails from './pages/ProductDetails';
import Cart from './Cart/Cart';
// import { AuthProvider } from './Context/AuthContext';
// import { CartProvider } from './Context/CartContext';
// import { OrdersProvider } from './Context/OrderContext';
import AddProducts from './Admin/AddProducts';
import YourOrders from './Order/YourOrders';
import Checkout from './Order/Checkout';
function Layout({ children }) {
  const location = useLocation();

  const noHeaderFooterRoutes = ['/login', '/register', '/admin'];

  const hideHeaderFooter = noHeaderFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeaderFooter && <Navbar />}

      <main>{children}</main>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    
          <Router>
            <Layout>
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/orders" element={<YourOrders />} />
                <Route path="/productdetails/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/admin" element={<Admin />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="users" element={<Users />} />
                  <Route path="add" element={<AddProducts />} />
                </Route>
                
              </Routes>
            </Layout>
          </Router>
        
  );
}

export default App;

