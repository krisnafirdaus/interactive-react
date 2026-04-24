import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.email) err.email = 'Email wajib diisi';
    if (!form.password) err.password = 'Password wajib diisi';
    if (Object.keys(err).length > 0) { setErrors(err); return; }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setErrors({ general: data.message || 'Login gagal' });
      }
    } catch {
      setErrors({ general: 'Gagal terhubung ke server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="Email" style={{ width: '100%', padding: 10 }} />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>
        <div style={{ marginBottom: 15 }}>
          <input type="password" name="password" value={form.password} onChange={handleChange}
            placeholder="Password" style={{ width: '100%', padding: 10 }} />
          {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Masuk...' : 'Login'}
        </button>
      </form>
      <p>Belum punya akun? <Link to="/register">Daftar</Link></p>
    </div>
  );
}

export default Login;