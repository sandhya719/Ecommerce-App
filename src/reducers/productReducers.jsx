import { ADD_PRODUCT,DELETE_PRODUCT, EDIT_PRODUCT, FETCH_PRODUCTS, SORT_PRODUCTS } from '../actions/productActions';

// initial state for products
const initialState = {
  products: [],
};

// product reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
        products: action.payload,
        error: null,
      };

      case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload.productId),
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload.productId
            ? { ...product, ...action.payload.updatedData }
            : product
        ),
      };
    case SORT_PRODUCTS:
      const { sortType } = action.payload;
      const sortedProducts = [...state.products];
      let updatedSortType;

      // Toggle sorting order
      if (sortType === state.sortType) {
        updatedSortType = null; // Reset sorting if clicking on the same button
        sortedProducts.reverse(); // Reverse the order
      } else {
        updatedSortType = sortType;
        // Implement sorting logic based on sortType
        switch (sortType) {
          case 'PRICE_LOW_TO_HIGH':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'PRICE_HIGH_TO_LOW':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          default:
            break;
        }
      }

      return {
        ...state,
        products: sortedProducts,
        sortType: updatedSortType,
      };

    default:
      return state;
  }
};

export default productsReducer;
