
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Men() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/products", {
        params: {
          categories: "men", 
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-left text-3xl font-semibold mb-6">#Mens</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              to={`/productdetails/${product.id}`}
              key={product.id}
              className="product-card bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Category: {product.categories}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Men;
