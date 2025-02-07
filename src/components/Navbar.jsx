
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slice/userSlice";
import { FaUser } from "react-icons/fa"; 
import { AiOutlineLogout } from "react-icons/ai"; 
import backgroundImage from "../assets/Untitled design.png"; 


function Navbar() {
  const { cart, user } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const searchProduct = (e) => {
    const value = e.target.value;
    setSearch(value);
    const searched = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(searched);
  };

  const handleProductClick = (productId) => {
    setSearch("");
    setFilteredProducts([]);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logoutUser()); 
    setIsModalOpen(false); 
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); 
  };

  const confirmLogout = () => {
    setIsModalOpen(true); 
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  return (
    <div className="sticky top-0 bg-white shadow-lg z-50">
<nav 
  className="p-4 shadow-lg relative"
  style={{
    backgroundImage: `linear-gradient(to right, rgba(115, 113, 156, 0.23), rgba(140, 127, 169, 0.3), rgba(25, 4, 15, 0.44)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "multiply"
  }}
>        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-extrabold tracking-wider text-white">
            <Link to="/">
              <span className="italic text-yellow-300">Shoe</span>
              <span className="text-white transform scale-110">ZZ</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/men"
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Men
            </Link>
            <Link
              to="/women"
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Women
            </Link>
            <Link
              to="/orders"
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              My Orders
            </Link>
          </div>

   <div className="relative hidden md:flex items-center border-2 rounded-full p-2 w-96 bg-white shadow-lg">
  <input
    type="text"
    className="w-full border-none focus:outline-none px-4 py-2 text-gray-800 rounded-full"
    placeholder="Search for shoes..."
    value={search}
    onChange={searchProduct}
  />
  {search && (
    <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            to={`/productdetails/${product.id}`}
            key={product.id}
            className="block p-2 hover:bg-gray-100 transition duration-200"
            onClick={() => handleProductClick(product.id)}
          >
            {product.name}
          </Link>
        ))
      ) : (
        <div className="p-2 text-gray-500">No products found</div>
      )}
    </div>
  )}
</div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-white">
              <CiShoppingCart size={30} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                {cart.length}
              </span>
            </Link>

            {user ? (
              <>
                <span className="text-xl text-white font-bold">Welcome, {user.username}</span>
    <button
      className="relative flex items-center justify-center bg-red-400 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 h-[50px] w-[50px] sm:h-[50px] sm:w-[50px]"
      onClick={confirmLogout}
      title="Logout" 
    >
      <span className="flex items-center justify-center bg-white text-red-500 rounded-full p-2">
        <AiOutlineLogout className="text-xl" />
      </span>
    </button>
              </>
            ) : (
              <>
              <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
        className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        <FaUser className="text-xl text-gray-700" /> 
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-60 md:w-72 lg:w-40 bg-white shadow-lg rounded-lg">
          <ul className="py-2">
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 text-lg text-blue-500 hover:bg-gray-100 rounded"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block px-4 py-2 text-lg text-green-500 hover:bg-gray-100 rounded"
                onClick={() => setIsDropdownOpen(false)}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 bg-teal-500 p-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/men"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Men
          </Link>
          <Link
            to="/women"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Women
          </Link>
          <Link
            to="/orders"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            My Orders
          </Link>
          <div className="relative text-white">
            <Link to="/cart" className="relative text-white">
              <CiShoppingCart size={30} />
              <span className="absolute top-0 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                {cart.length}
              </span>
            </Link>
          </div>
          <div className="relative w-full">
          <div className="flex items-center border-2 rounded-full p-2 w-full">
            <input
              type="text"
              className="w-full border-none focus:outline-none px-4 py-2 rounded-full"
              placeholder="Search for shoes..."
              value={search}
              onChange={searchProduct}
            />
          </div>

          {search && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    to={`/productdetails/${product.id}`}
                    key={product.id}
                    className="block p-2 hover:bg-gray-100 transition duration-200"
                    onClick={() => handleProductClick(product.id)} 
                  >
                    {product.name}
                  </Link>
                ))
              ) : (
                <div className="p-2 text-gray-500">No products found</div>
              )}
            </div>
          )}
          </div>

          {!user ? (
            <div className="relative">
            {/* Button for toggling the dropdown */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <FaUser className="text-xl text-gray-700" />
            </button>
      
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 sm:w-60 md:w-72 lg:w-80 bg-white shadow-lg rounded-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-lg text-blue-500 hover:bg-gray-100 rounded"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-lg text-green-500 hover:bg-gray-100 rounded"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          ) : (
            <div className="flex flex-col space-y-2">
                <span className="text-xl text-white font-bold">Welcome, {user.username}</span>
                
              <button
      className="relative flex items-center justify-center bg-red-400 text-white p-2 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 h-[50px] w-[50px] sm:h-[50px] sm:w-[50px]"
      onClick={confirmLogout}
      title="Logout" 
    >
      <span className="flex items-center justify-center bg-white text-red-500 rounded-full p-2">
        <AiOutlineLogout className="text-xl" />
      </span>
    </button>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-bold">Are you sure you want to logout?</h3>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;



