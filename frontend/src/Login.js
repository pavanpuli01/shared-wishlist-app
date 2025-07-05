import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      onAuth(userCred.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}
