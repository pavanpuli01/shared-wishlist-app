import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import ProductGrid from './ProductGrid';
import WishlistPage from './WishlistPage';
import './App.css';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [wishlistCount, setWishlistCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const userCred = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      sessionStorage.setItem('user', JSON.stringify(userCred.user));
      setUser(userCred.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.clear();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
          <p>
            {isLogin ? 'New here?' : 'Already have an account?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)} className="link-text">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="navbar">
        <h1>🛍️ Shared Wishlist</h1>

        <div className="navbar-buttons">
          <div className="navbar-buttons-row">
            {location.pathname === '/' && (
              <button onClick={() => navigate('/wishlist')}>
                ❤️ Wishlist ({wishlistCount})
              </button>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="navbar-user">{user.email}</div>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={<ProductGrid user={user} onWishlistUpdate={setWishlistCount} />}
        />
        <Route path="/wishlist" element={<WishlistPage user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
