import { collection, addDoc,doc,updateDoc,deleteDoc,onSnapshot  } from 'firebase/firestore';
import { db } from '../firebaseInit';

// actions for adding,deleting,editing,fetching,sorting products
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';

// action creator for fetching products
export const fetchProducts = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_PRODUCTS });
  
      try {
        // Fetch data from the API
        const response = await fetch('https://fakestoreapi.com/products');
        const apiData = await response.json();
  
        // Add data to the 'products' collection in Firestore
        const productsCollection = collection(db, 'products');
        for (const productData of apiData) {
          await addDoc(productsCollection, productData);
        } 
        
        // Set up a real-time listener for the 'products' collection
        onSnapshot(productsCollection, (snapshot) => {
          const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
          dispatch({
            type: FETCH_PRODUCTS, 
            payload: products,
          });
        });
      } catch (error) {
        console.error('Error fetching and storing products:', error);
      }
    };
  };

  // action creator for adding product
  export const addProduct = (newProductData) => {
    return async (dispatch) => {
      try {
        // Add a new document to the 'products' collection
        const productsCollection = collection(db, 'products');
        const addedDocRef = await addDoc(productsCollection, newProductData);
        const addedProduct = { ...newProductData, id: addedDocRef.id };
  
        dispatch({
          type: ADD_PRODUCT,
          payload: addedProduct,
        });
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  };


  // action creator for deleting product
  export const deleteProduct = (productId) => {
    return async (dispatch) => {
      try {
        // Delete document from the 'products' collection
        const productDocRef = doc(db, 'products', productId);
        await deleteDoc(productDocRef);
  
        dispatch({
          type: DELETE_PRODUCT,
          payload: { productId },
        });
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
  };

// action creator for edit product details
export const editProduct = (productId, updatedData) => {
    return async (dispatch) => {
      try {
        // Update document in the 'products' collection
        const productDocRef = doc(db, 'products', productId);
        await updateDoc(productDocRef, updatedData);
  
        dispatch({
          type: EDIT_PRODUCT,
          payload: { productId, updatedData },
        });
      } catch (error) {
        console.error('Error editing product:', error);
      }
    };
  };

  // action creator for sorting products
  export const sortProducts = (sortType) => {
    return {
      type: SORT_PRODUCTS,
      payload: { sortType },
    };
  };

