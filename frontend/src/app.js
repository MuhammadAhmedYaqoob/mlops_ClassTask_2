import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';
    try {
      const res = await axios.post(endpoint, form);
      if (isLogin) {
        setToken(res.data.token);
        setMessage('Login successful');
      } else {
        setMessage('Signup successful, please login.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password: </label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={toggleMode} style={{ marginTop: '20px' }}>
        {isLogin ? 'Go to Signup' : 'Go to Login'}
      </button>
      {message && <p>{message}</p>}
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;
