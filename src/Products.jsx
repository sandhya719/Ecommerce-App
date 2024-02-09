import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./actions/cartActions";
import {
  deleteProduct,
  editProduct,
  fetchProducts,
  sortProducts,
} from "./actions/productActions";
import { toast } from "react-toastify";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  const [sortType, setSortType] = useState(false);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 0,
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    toast.success("Products Displayed Successfully")
  }, [dispatch]);

  const renderStars = (rating, productId) => {
    const stars = [];
  
    const handleStarClick = (clickedRating) => {
      console.log(`Star clicked for product ${productId} with rating ${clickedRating}`);
    };
  
    for (let i = 0; i < 5; i++) {
      const isColored = i < rating;
      const starStyle = {
        color: isColored ? "#ffc107" : "#282b35",
        cursor: "pointer",
      };
  
      stars.push(
        <CiStar
          key={i}
          style={starStyle}
          onClick={() => handleStarClick(i + 1)} 
        />
      );
    }
  
    return stars;
  };
  

  const handleSortByPrice = () => {
    setSortType(true);
    dispatch(sortProducts("PRICE_LOW_TO_HIGH"));
    toast.success("Products Sorted Successfully")
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Product Added Successfully")
  };
  
  

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
  
    setEditedData({
      title: productToEdit.title,
      description: productToEdit.description,
      price: productToEdit.price,
      rating: productToEdit.rating,
    });
  
    setEditingProductId(productId);
  };
  

  const handleSaveEdit = () => {
    dispatch(editProduct(editingProductId, editedData));
    toast.success("Products Edited Successfully")
    setEditingProductId(null);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    toast.success("Products Deleted Successfully")
  };

  return (
    <div>
      {editingProductId !== null ? (
        <div className="edit-form">
          <input
            type="text"
            placeholder="Name"
            value={editedData.title}
            onChange={(e) =>
              setEditedData({ ...editedData, title: e.target.value })
            }
            className="edit-input"
          />
          <textarea
            placeholder="Description"
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
            className="edit-textarea"
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            value={editedData.price}
            onChange={(e) =>
              setEditedData({ ...editedData, price: e.target.value })
            }
            className="edit-input"
          />
          <input
            type="number"
            placeholder="Rating"
            value={editedData.rating}
            onChange={(e) =>
              setEditedData({ ...editedData, rating: e.target.value })
            }
            className="edit-input"
          />
          <button
            onClick={handleSaveEdit}
            className="edit-btn"
          >
            Save
          </button>
          <button
            onClick={() => setEditingProductId(null)}
            className="edit-btn"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="products-container">
          <button className="sort-btn" onClick={handleSortByPrice}>
            {sortType ? "Cancel" : "Sort by Price"}
          </button>
          <div className="products-list">
            {Array.isArray(products) ? (
              products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="title-container">
                    <div>
                      <p>{product.title}</p>
                      <p>&#8377;{product.price}</p>
                    </div>
                    <div>{renderStars(product.rating, product.id)}</div>

                  </div>
                  <div className="description">
                    <div>
                      <p
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                    <div className="cart-btn">
                      <button onClick={() => handleAddToCart(product)}>
                        Add To Cart
                      </button>
                      <div className="edit-delete">
                      <div onClick={() => handleEdit(product.id)}>
                          <MdModeEdit />
                        </div>
                        <div onClick={() => handleDelete(product.id)}>
                          <MdDelete />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;