import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { setProducts, editProduct } from "../slice/adminSlice";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);
const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5001/products");
      dispatch(setProducts(response.data)); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteProduct = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`http://localhost:5001/products/${productToDelete.id}`); 
        dispatch(setProducts(products.filter((product) => product.id !== productToDelete.id)));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: currentProduct.id,
      name: e.target.name.value,
      price: parseFloat(e.target.price.value),
      quantity: parseInt(e.target.quantity.value, 10),
      categories: e.target.category.value,
      images: e.target.image.value,
      description: e.target.description.value,
    };
    try {
      await dispatch(editProduct({ id: currentProduct.id, updatedProduct }));
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const filteredProducts = products.filter((product) =>
    selectedCategory === "All"
      ? true
      : product.categories?.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div>
      <h2 className="text-xl font-bold">Products</h2>
      <div className="flex space-x-4 mb-4">
        {["All", "Men", "Women"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-4 flex justify-end">
        <Link to="/admin/add" className="bg-green-500 text-white px-4 py-2 rounded">Add Product</Link>
      </div>
      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">{product.categories}</td>
                <td className="border p-2"><img src={product.images} alt={product.name} className="h-12 w-12 object-cover" /></td>
                <td className="border p-2">
                  <button onClick={() => { setProductToDelete(product); setIsDeleteModalOpen(true); }} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  <button onClick={() => { setIsEditing(true); setCurrentProduct(product); }} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input type="text" name="name" defaultValue={currentProduct.name} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price</label>
                <input type="number" name="price" defaultValue={currentProduct.price} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Quantity</label>
                <input type="number" name="quantity" defaultValue={currentProduct.quantity} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select name="category" defaultValue={currentProduct.categories} className="p-2 border w-full" required>
                  <option value="men">men</option>
                  <option value="women">women</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input type="text" name="image" defaultValue={currentProduct.images} className="p-2 border w-full" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea name="description" defaultValue={currentProduct.description} className="p-2 border w-full" required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
            {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-md">
            <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
            <p className="mb-4">Do you really want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Products;
