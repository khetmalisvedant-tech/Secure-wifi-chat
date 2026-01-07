import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input style={styles.input} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input style={styles.input} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: 'white',
  },
  title: { fontSize: '28px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' },
  input: { padding: '10px', borderRadius: '6px', border: 'none' },
  button: { padding: '10px', background: '#4CAF50', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' },
  message: { marginTop: '15px' },
};

export default Register;
