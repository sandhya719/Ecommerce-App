import { db } from "../firebaseInit"
import { addDoc, collection, doc,deleteDoc,getDocs } from 'firebase/firestore';

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const FETCH_CART_DATA = 'FETCH_CART_DATA';


// Action Creators for fetching,adding and remove from cart
export const fetchCartData = () => async (dispatch) => {
  try {
    // Fetch cart items from Firestore collection named 'cart'
    const cartCollection = collection(db, 'cart');
    const cartItemsSnapshot = await getDocs(cartCollection);
    const cartItems = cartItemsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    dispatch({
      type: FETCH_CART_DATA,
      payload: cartItems,
    });
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};

export const addToCart = (item) => async (dispatch, getState) => {
  try {
    // Check if the item already exists in the cart
    const { cartItems } = getState().cart;
    console.log("cartItems: ", cartItems);
    const itemExists = cartItems.find((cartItem) => cartItem.id == item.id);
    console.log("itemExists: ", itemExists);

    if (itemExists) {
      console.warn('Item already exists in the cart.');
      return;  // Do not proceed with adding the item again
    }

    // Add item to Firestore collection named 'cart'
    const cartCollection = collection(db, 'cart');
    const addedItemRef = await addDoc(cartCollection, item);
    const addedItem = { ...item, id: addedItemRef.id };

    dispatch({
      type: ADD_TO_CART,
      payload: addedItem,
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};


  export const removeFromCart = (itemId) => async (dispatch) => {
    try {
      // Remove item from Firestore collection named 'cart'
      const cartItemRef = doc(db, 'cart', itemId);
      await deleteDoc(cartItemRef);
  
      dispatch({
        type: REMOVE_FROM_CART,
        payload: itemId,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
