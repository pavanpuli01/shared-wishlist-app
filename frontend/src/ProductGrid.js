// src/ProductGrid.js
import React, { useEffect, useState } from 'react';
import { getWishlist, saveWishlist } from './wishlistService';
import './App.css';

export default function ProductGrid({ user, onWishlistUpdate }) {
  const [wishlist, setWishlist] = useState([]);

  const products = [
    {
      id: 'p1',
      name: 'Noise ColorFit Smartwatch',
      price: 2499,
      img : 'https://m.media-amazon.com/images/I/41O7YJM+9+L._SY300_SX300_.jpg'
    },
    {
      id: 'p2',
      name: 'Sony WH-CH520 Headphones',
      price: 4599,
      img: 'https://m.media-amazon.com/images/I/318RvHnDwHL._SX300_SY300_QL70_FMwebp_.jpg'
    },
    {
      id: 'p3',
      name: 'Redmi 20000mAh Power Bank',
      price: 1799,
      img: 'https://m.media-amazon.com/images/I/311bYGEO5WL._SX300_SY300_QL70_FMwebp_.jpg'
    },
    {
      id: 'p4',
      name: 'boAt Rockerz 255 Pro+',
      price: 1599,
      img: 'https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SL1500_.jpg'
    },
    {
      id: 'p5',
      name: 'Amazon Echo Dot (4th Gen)',
      price: 3499,
      img: 'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'
    },
    {
      id: 'p6',
      name: 'HP Wireless Keyboard & Mouse',
      price: 2199,
      img: 'https://m.media-amazon.com/images/I/61ZRU9gnbxL._SL1500_.jpg'
    },
    {
      id: 'p7',
      name: 'Logitech HD Webcam C270',
      price: 2399,
      img: 'https://m.media-amazon.com/images/I/51BmSwjFu5L._SX679_.jpg'
    },
    {
      id: 'p8',
      name: 'Realme Buds Wireless 2 Neo',
      price: 1299,
      img: 'https://m.media-amazon.com/images/I/71AvQd3VzqL._SL1500_.jpg'
    },
    {
      id: 'p9',
      name: 'Cosmic Byte Gaming Mouse',
      price: 749,
      img: 'https://m.media-amazon.com/images/I/31ZbDusBjaL._SX300_SY300_QL70_FMwebp_.jpg'
    },
    {
      id: 'p10',
      name: 'Lenovo 15.6" Backpack',
      price: 999,
      img: 'https://m.media-amazon.com/images/I/71uMciapNnL._SX679_.jpg'
    },
    {
      id: 'p11',
      name: 'Zebronics Portable Speaker',
      price: 899,
      img: 'https://m.media-amazon.com/images/I/71A9Vo1BatL._SL1500_.jpg'
    },
    {
      id: 'p12',
      name: 'TP-Link Wi-Fi Range Extender',
      price: 1699,
      img: 'https://m.media-amazon.com/images/I/21UL+nawiNL._SY300_SX300_.jpg'
    },
    {
      id: 'p13',
      name: 'Samsung 64GB microSD Card',
      price: 699,
      img: 'https://m.media-amazon.com/images/I/61rnCkrurxL._SX679_.jpg'
    },
    {
      id: 'p14',
      name: 'Apple 20W USB-C Adapter',
      price: 1699,
      img: 'https://m.media-amazon.com/images/I/61vtLhO6fDL._SL1500_.jpg'
    },
    {
      id: 'p15',
      name: 'MI Smart LED Bulb 9W',
      price: 799,
      img: 'https://m.media-amazon.com/images/I/41KHbARuHLS._SY445_SX342_QL70_FMwebp_.jpg'
    },
    {
      id: 'p16',
      name: 'SanDisk 128GB Pen Drive',
      price: 1099,
      img: 'https://m.media-amazon.com/images/I/51cBP0cdI-L._SL1000_.jpg'
    },
    {
      id: 'p17',
      name: 'boAt Airdopes 141',
      price: 1499,
      img: 'https://m.media-amazon.com/images/I/61KNJav3S9L._SL1500_.jpg'
    },
    {
      id: 'p18',
      name: 'Fire-Boltt Phoenix Smartwatch',
      price: 2999,
      img: 'https://m.media-amazon.com/images/I/61Y8u2y5XOL._SY450_.jpg'
    },
    {
      id: 'p19',
      name: 'Dell Wireless Mouse WM126',
      price: 649,
      img: 'https://m.media-amazon.com/images/I/21pXw6a4moL._SY300_SX300_QL70_FMwebp_.jpg'
    },
    {
      id: 'p20',
      name: 'Portronics Mport 31C USB Hub',
      price: 1099,
      img: 'https://m.media-amazon.com/images/I/41C6odOsPNL._SY450_.jpg'
    }
  ];

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getWishlist();
      setWishlist(data || []);
      onWishlistUpdate?.(data.length);
    };
    fetchWishlist();
  }, [onWishlistUpdate]);

  const addToWishlist = async (product) => {
    if (wishlist.find(item => item.id === product.id)) return;
    const updated = [...wishlist, { ...product, addedBy: user.email }];
    await saveWishlist(updated);
    setWishlist(updated);
    onWishlistUpdate?.(updated.length);
  };

  return (
    <div className="wishlist-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="wishlist-card"
          style={{
            height: '310px',
            width: '275px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '12px'
          }}
        >
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: '100%',
              height: '240px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '1px solid #ddd',
              marginBottom: '8px'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}>
            <h3 style={{
              fontSize: '14px',
              color: '#0061ff',
              margin: 0,
              fontWeight: 700,
              flex: 1
            }}>{product.name}</h3>
            <span style={{
              fontWeight: 'bold',
              fontSize: '15px',
              fontWeight: 800,
              color: '#444',
              marginLeft: '8px'
            }}>₹{product.price}</span>
          </div>
          <button
            style={{ width: '100%' }}
            onClick={() => addToWishlist(product)}
          >
            {wishlist.some(item => item.id === product.id)
              ? '✅ Added'
              : 'Add to Wishlist'}
          </button>
        </div>
      ))}
    </div>
  );
}
