import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart,fetchCartData } from "./actions/cartActions";
import { toast } from "react-toastify";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
    toast.success("fetching cart data successfully")
  }, [dispatch]);

  const handleRemoveCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("product removed from cart successfully")
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems && cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems &&
            cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-item">
                  <div>
                    <p>{item.title}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => handleRemoveCart(item.id)}>
                      Remove from Cart
                    </button>
                  </div>
                  <div className="cart-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
