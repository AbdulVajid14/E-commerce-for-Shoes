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
    } else {
      toast.success("Product added to cart");
      dispatch(addToCart(product));  
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleCloseLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      {/* <Navbar /> */}
      <div className="product-details max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>

        <div className="flex items-center justify-center">
          <img
            src={product.images}
            alt={product.name}
            className="w-full max-w-lg h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="space-y-4">
          <p className="text-xl text-gray-800 font-semibold">
            Price: <span className="text-blue-600">${product.price}</span>
          </p>
          <p className="text-md text-gray-700">
            Quantity Available: <span className="font-semibold">{product.quantity}</span>
          </p>
          <p className="text-md text-gray-700">
            Category: <span className="font-semibold">{product.categories}</span>
          </p>
          <p className="text-md text-gray-700">Description:</p>
          <p className="text-md text-gray-600">{product.description}</p>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        {showLoginPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">You need to log in to add items to the cart</h3>
              <div className="space-x-4">
                <button
                  onClick={handleLoginRedirect}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-400"
                >
                  Log In
                </button>
                <button
                  onClick={handleCloseLoginPrompt}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default ProductDetails;
