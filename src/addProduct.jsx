import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './actions/productActions'
import { toast } from 'react-toastify';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    rating: '',
    link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(productData));

    // Clear the form after submitting
    setProductData({
      name: '',
      description: '',
      price: '',
      rating: '',
      link: '',
    });
    toast.success("product addded successfully")
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <br />

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </label>
        <br />

        <label>
          Link:
          <input
            type="url"
            name="link"
            value={productData.image}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
