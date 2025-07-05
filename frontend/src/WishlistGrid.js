import React from 'react';
import { useNavigate } from 'react-router-dom';

const sampleProducts = [
  {
    name: "Noise Smartwatch",
    price: 2999,
    img: "https://m.media-amazon.com/images/I/71NqG9bBp7L._SL1500_.jpg"
  },
  {
    name: "Sony Headphones",
    price: 4999,
    img: "https://m.media-amazon.com/images/I/61v5ZUny03L._SL1500_.jpg"
  },
  {
    name: "Boat Bluetooth Speaker",
    price: 1499,
    img: "https://m.media-amazon.com/images/I/71RD3vsjIYL._SL1500_.jpg"
  },
  {
    name: "JBL Earbuds",
    price: 3999,
    img: "https://m.media-amazon.com/images/I/61QWgMogJFL._SL1500_.jpg"
  },
  {
    name: "Samsung Galaxy M13",
    price: 9499,
    img: "https://m.media-amazon.com/images/I/817WWpaFo1L._SL1500_.jpg"
  },
  {
    name: "Logitech Mouse",
    price: 899,
    img: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SL1500_.jpg"
  },
  {
    name: "Redmi Power Bank",
    price: 1299,
    img: "https://m.media-amazon.com/images/I/71-OkZk7eBL._SL1500_.jpg"
  },
  {
    name: "HP Wireless Keyboard",
    price: 1599,
    img: "https://m.media-amazon.com/images/I/71XA6D1S1KL._SL1500_.jpg"
  },
  {
    name: "OnePlus Buds Z2",
    price: 4999,
    img: "https://m.media-amazon.com/images/I/618xlk1G+JL._SL1500_.jpg"
  },
  {
    name: "Canon DSLR Camera",
    price: 38999,
    img: "https://m.media-amazon.com/images/I/61M5fAzw8ML._SL1500_.jpg"
  },
  {
    name: "Sony Soundbar",
    price: 8999,
    img: "https://m.media-amazon.com/images/I/71XCRhXZtBL._SL1500_.jpg"
  },
  {
    name: "Dell Laptop",
    price: 45999,
    img: "https://m.media-amazon.com/images/I/61h3Q9nZpZL._SL1500_.jpg"
  },
  {
    name: "Samsung Monitor",
    price: 10499,
    img: "https://m.media-amazon.com/images/I/81PjdwU6ljL._SL1500_.jpg"
  },
  {
    name: "Mi Smart TV",
    price: 16999,
    img: "https://m.media-amazon.com/images/I/71KD7gXSkKL._SL1500_.jpg"
  },
  {
    name: "Fire TV Stick",
    price: 2499,
    img: "https://m.media-amazon.com/images/I/71q1YyspQDL._SL1500_.jpg"
  },
  {
    name: "Apple AirPods Pro",
    price: 18999,
    img: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg"
  },
  {
    name: "ASUS Gaming Laptop",
    price: 64999,
    img: "https://m.media-amazon.com/images/I/71y4XjzDymL._SL1500_.jpg"
  },
  {
    name: "Lenovo Tablet",
    price: 8999,
    img: "https://m.media-amazon.com/images/I/71iMLyUOXDL._SL1500_.jpg"
  },
  {
    name: "Realme Watch",
    price: 2199,
    img: "https://m.media-amazon.com/images/I/61K9L3Bz0dL._SL1500_.jpg"
  },
  {
    name: "Echo Dot (4th Gen)",
    price: 3499,
    img: "https://m.media-amazon.com/images/I/61u0y9ADElL._SL1500_.jpg"
  },
];

export default function WishlistGrid({ user }) {
  const navigate = useNavigate();

  const handleGoToWishlist = () => {
    navigate("/wishlist");
  };

  return (
    <div className="wishlist-grid">
      {sampleProducts.map((item, i) => (
        <div key={i} className="wishlist-card">
          <button className="wishlist-toggle" onClick={handleGoToWishlist}>
            🧡
          </button>
          <img src={item.img} alt={item.name} />
          <h3>{item.name}</h3>
          <p><strong>₹{item.price}</strong></p>
        </div>
      ))}
    </div>
  );
}
