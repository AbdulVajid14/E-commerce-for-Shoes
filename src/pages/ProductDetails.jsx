
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slice/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
    const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected shoe size
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product!", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
    } else {
      const productWithSize = { ...product, selectedSize }; // Include selected size in the product object
      toast.success("Product added to cart");
      dispatch(addToCart(productWithSize));
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  if (!product) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:flex lg:gap-8">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={product.images}
              alt={product.name}
              className="w-full h-96 object-contain rounded-xl bg-gray-100 p-4"
            />
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="space-y-4">
              <p className="text-2xl font-semibold text-gray-900">
                ${product.price}
                <span className="text-sm text-gray-500 ml-2">(incl. taxes)</span>
              </p>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {product.quantity} in stock
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {product.categories}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {[6, 7, 8, 9, 10].map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-full text-sm font-medium transition-all
                      ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-medium
                         hover:bg-gray-800 transition-colors duration-200 shadow-sm
                         disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
              <h3 className="text-lg font-semibold mb-4">
                Sign in to add items to your cart
              </h3>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleLoginRedirect}
                  className="px-6 py-2 bg-gray-900 text-white rounded-full
                           hover:bg-gray-800 transition-colors duration-200"
                >
                  Continue to Login
                </button>
                <button
                  onClick={handleCloseLoginPrompt}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full
                           hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ProductDetails;