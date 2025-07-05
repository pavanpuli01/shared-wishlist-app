import React, { useState, useEffect } from 'react';

export default function ProductModal({ onClose, onSave, user, initialData }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setImgUrl(initialData.imgUrl || initialData.img);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !imgUrl.trim()) {
      return alert("Please fill in all fields.");
    }

    const newProduct = {
      name: name.trim(),
      price: parseInt(price),
      imgUrl: imgUrl.trim(),
      addedBy: user.email,
    };

    onSave(newProduct);
    onClose(); // close modal after save
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 10 }}>{initialData ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>
            {initialData ? '💾 Save Changes' : '➕ Add Product'}
          </button>
          <button type="button" onClick={onClose} style={cancelStyle}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const modalStyle = {
  background: '#fff',
  padding: 30,
  borderRadius: 10,
  boxShadow: '0 5px 20px rgba(0,0,0,0.25)',
  width: '90%',
  maxWidth: 400,
};

const buttonStyle = {
  backgroundColor: '#0061ff',
  color: 'white',
  padding: '10px',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};

const cancelStyle = {
  backgroundColor: '#ccc',
  padding: '10px',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};
