
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productIds = [1, 2, 3, 6, 8, 12,18,4,5];

    const fetchProducts = productIds.map((id) =>
      axios.get(`http://localhost:5001/products/${id}`)
    );
    Promise.all(fetchProducts)
      .then((responses) => {
        const fetchedProducts = responses.map((response) => response.data);
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  return (
    <>
      <div className="relative mt-20 h-[600px] bg-[url('https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-6">
    <h2 className="text-4xl font-bold">Step Into Comfort & Style</h2>
    <p className="mt-4 text-xl">Discover our latest collection of shoes designed for both comfort and fashion. Perfect for every occasion.</p>
    <button className="mt-6 px-8 py-2 bg-yellow-500 text-black font-semibold text-lg rounded-full hover:bg-yellow-400 transition-all duration-300">
      Shop Now
    </button>
  </div>
</div>
<div className="flex justify-center my-12 space-x-10 sm:space-x-8 md:space-x-20 flex-wrap">
  <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Nike.png" 
       alt="Logo 1" className="h-20" />
  <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Adidas.png" 
       alt="Logo 2" className="h-20" />
  <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Puma.png" 
       alt="Logo 3" className="h-20" />
  <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Jordan.png" 
       alt="Logo 4" className="h-20" />
  <img src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/40-Famous-Shoe-Logos/Reebok.png" 
       alt="Logo 5" className="h-20" />
</div>


<div className="my-20 px-6 py-12 bg-gray-100 flex items-center justify-between rounded-lg shadow-lg" id="about" >
  <div className="flex-1 pr-8">
    <h2 className="text-3xl font-bold text-gray-800">About Shoezz</h2>
    <p className="mt-4 text-lg text-gray-600">
      Shoezz is a brand dedicated to offering high-quality, stylish, and comfortable shoes for every occasion. Our mission is to deliver footwear that combines innovative designs, superior comfort, and lasting durability. Whether you're looking for athletic shoes, formal wear, or casual sneakers, Shoezz has something for everyone.
    </p>
    <button className="mt-6 px-8 py-2 bg-blue-500 text-white font-semibold text-lg rounded-full hover:bg-blue-400 transition-all duration-300">
      Explore Our Collection
    </button>
  </div>
  <div className="flex-1">
    <img
      src="https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg"
      alt="Shoe Collection"
      className="w-full h-auto rounded-lg shadow-lg object-cover"
    />
  </div>
</div>
<div className="container mx-auto p-4">
  <h2 className="text-left text-3xl font-semibold mb-6">Top Selling Shoes</h2>

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
};

export default Home;
