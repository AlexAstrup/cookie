import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch('/users/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        // alert('Signed in successfully!');
        // Redirect or navigate here if needed
        navigate('/')
      } else {
        alert('Sign in failed: Check your credentials');
      }
    } catch (error) {
      alert('Error: Could not connect to the server.');
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSignIn} style={styles.button}>Sign In</button>
    </div>
  );
};

const styles = {
  container: { padding: '16px', maxWidth: '300px', margin: '0 auto' },
  input: {
    height: '40px',
    borderColor: 'gray',
    borderWidth: '1px',
    borderStyle: 'solid',
    marginBottom: '12px',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box'
  },
  button: {
    padding: '10px 16px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default SignInScreen;
