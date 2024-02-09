import React from 'react';
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Navbar = () => {

  // accessing cartItems from the store
  const cartItems = useSelector((state)=>state.cart.cartItems)
  
  return (
    <div className="navbar">
      <div className="left-side">
        <Link to="/" className="logo">
          Ecommerce
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <div className="add-product">
          <Link to="/add-product" className="nav-link">
            Add Product
            <span className="plus-symbol">+</span>
          </Link>
        </div>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
      </div>
      <div className="right-side">
        <div className="user-info">
          <span className="user-name">John Doe</span>
          <span className='symbol'><IoPersonCircleOutline /></span>
          <span className='cartCount'>{cartItems.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
