import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function Signup({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      onAuth(userCred.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}
