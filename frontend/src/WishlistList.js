import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WishlistList({ user }) {
  const [wishlists, setWishlists] = useState([]);
  const [newWishlistName, setNewWishlistName] = useState('');

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const res = await axios.get('http://localhost:5000/wishlists');
      const userWishlists = res.data.filter(w => w.createdBy === user.email);
      if (userWishlists.length === 0) {
        await createDemoWishlist();
      } else {
        setWishlists(userWishlists);
      }
    } catch (err) {
      console.error('Error fetching wishlists:', err);
    }
  };

  const createDemoWishlist = async () => {
    try {
      await axios.post('http://localhost:5000/wishlists', {
        name: 'Demo Wishlist',
        items: [
          {
            name: 'Noise Smartwatch',
            price: 2999,
            imgUrl: 'https://m.media-amazon.com/images/I/71NqG9bBp7L._SL1500_.jpg',
            addedBy: user.email,
          },
          {
            name: 'Sony Headphones',
            price: 4999,
            imgUrl: 'https://m.media-amazon.com/images/I/61v5ZUny03L._SL1500_.jpg',
            addedBy: user.email,
          }
        ],
        createdBy: user.email
      });
      fetchWishlists(); // re-fetch after creating
    } catch (err) {
      console.error('Error creating demo wishlist:', err);
    }
  };

  const createWishlist = async () => {
    if (!newWishlistName.trim()) return;
    try {
      await axios.post('http://localhost:5000/wishlists', {
        name: newWishlistName,
        items: [],
        createdBy: user.email
      });
      setNewWishlistName('');
      fetchWishlists();
    } catch (err) {
      console.error('Error creating wishlist:', err);
    }
  };

  const addProduct = async (id, name, price, imgUrl) => {
    try {
      const wishlist = wishlists.find(w => w.id === id);
      const updatedItems = [...wishlist.items, { name, price, imgUrl, addedBy: user.email }];
      await axios.put(`http://localhost:5000/wishlists/${id}`, {
        ...wishlist,
        items: updatedItems
      });
      fetchWishlists();
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const removeProduct = async (id, index) => {
    try {
      const wishlist = wishlists.find(w => w.id === id);
      const updatedItems = wishlist.items.filter((_, i) => i !== index);
      await axios.put(`http://localhost:5000/wishlists/${id}`, {
        ...wishlist,
        items: updatedItems
      });
      fetchWishlists();
    } catch (err) {
      console.error('Error removing product:', err);
    }
  };

  return (
    <div>
      <h2>Create Wishlist</h2>
      <input
        placeholder="Wishlist name"
        value={newWishlistName}
        onChange={(e) => setNewWishlistName(e.target.value)}
      />
      <button onClick={createWishlist}>Create</button>

      <h2>Your Wishlists</h2>
      {wishlists.map(w => (
        <div key={w.id} className="wishlist-card">
          <h3>{w.name}</h3>
          <p>Created by: {w.createdBy}</p>

          <AddProductForm onAdd={(n, p, i) => addProduct(w.id, n, p, i)} />

          {w.items?.map((item, idx) => (
            <div key={idx} className="product-item">
              <div>
                <img src={item.imgUrl} alt={item.name} />
                <strong>{item.name}</strong> – ₹{item.price}<br />
                <small>Added by: {item.addedBy}</small>
              </div>
              <button onClick={() => removeProduct(w.id, idx)}>❌</button>
            </div>
          ))}

          <p>Invite someone (mock): <input placeholder="email@example.com" /></p>
        </div>
      ))}
    </div>
  );
}

function AddProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleSubmit = () => {
    if (!name || !price || !imgUrl) return alert("Fill all fields");
    onAdd(name, parseInt(price), imgUrl);
    setName('');
    setPrice('');
    setImgUrl('');
  };

  return (
    <div>
      <input placeholder="Product name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Image URL" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
      <button onClick={handleSubmit}>➕ Add Product</button>
    </div>
  );
}
