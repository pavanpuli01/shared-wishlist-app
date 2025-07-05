import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onWishlistChange,
  saveWishlist,
  addLike,
  addDislike
} from './wishlistService';
import './App.css';

export default function WishlistPage({ user }) {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onWishlistChange((items) => {
      setWishlist(items);
    });
    return () => unsubscribe();
  }, []);

  const removeItem = async (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    await saveWishlist(updated);
    setWishlist(updated);
  };

  return (
    <>
      {/* Back Button */}
      <div style={{ padding: '20px 30px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 16px',
            fontWeight: 'bold',
            backgroundColor: '#0061ff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="wishlist-grid">
        {wishlist.map((item, i) => (
          <div key={i} className="wishlist-card">
            <img src={item.imgUrl || item.img} alt={item.name} />

            {/* Product Name and Price aligned */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '8px'
            }}>
              <h3 style={{ fontSize: '18px', color: '#0061ff', margin: 0 }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                ₹{item.price}
              </p>
            </div>

            {/* Metadata */}
            <p style={{ fontSize: '12px', color: '#777', margin: '6px 0 4px' }}>
              Created: {item.createdAt?.toDate?.().toLocaleString() || 'Unknown'}
            </p>
            <p style={{ fontSize: '12px', color: '#555', margin: '0 0 8px' }}>
              Added by: {item.addedBy}
            </p>

            {/* Reaction Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <button
                onClick={() => addLike(item.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                👍
              </button>

              <span style={{
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                flex: 1
              }}>
                {(item.likes || 0) - (item.dislikes || 0)}
              </span>

              <button
                onClick={() => addDislike(item.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f0f0f0',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                👎
              </button>
            </div>

            <button onClick={() => removeItem(i)}>❌ Remove</button>
          </div>
        ))}
      </div>

      {/* Invite Section */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <h3>Invite Others (Mock)</h3>
        <input
          type="email"
          placeholder="Enter friend's email"
          style={{
            padding: '10px',
            width: '280px',
            maxWidth: '80%',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          style={{
            marginLeft: '12px',
            padding: '10px 18px',
            backgroundColor: '#0061ff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ➕ Invite
        </button>
        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
          This is a mock field for demo only.
        </p>
      </div>
    </>
  );
}
