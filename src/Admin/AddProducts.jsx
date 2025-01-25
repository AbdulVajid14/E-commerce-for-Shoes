

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../slice/adminSlice';

function AddProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    categories: '',
    images: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const generateNextId = () => {
    if (products.length === 0) return '1';
    const highestId = Math.max(...products.map((p) => parseInt(p.id, 10)), 0);
    return (highestId + 1).toString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productWithId = {
      ...product,
      id: generateNextId(), 
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
    };

    dispatch(createProduct(productWithId))
      .then(() => {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');
        setProduct({
          name: '',
          price: '',
          quantity: '',
          categories: '',
          images: '',
          description: '',
        });
      })
      .catch(() => {
        setErrorMessage('Error adding product. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add New Product</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="p-2 border w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="p-2 border w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="p-2 border w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="categories"
            value={product.categories}
            onChange={handleChange}
            className="p-2 border w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="men">men</option>
            <option value="women">women</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="images"
            value={product.images}
            onChange={handleChange}
            className="p-2 border w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="p-2 border w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Existing Products</h3>
        <ul className="list-disc pl-5">
          {products.map((p) => (
            <li key={p.id} className="mb-2">
              {p.name} - ${p.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddProducts;
