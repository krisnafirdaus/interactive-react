import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Nama wajib diisi';
    else if (form.name.length < 3) err.name = 'Minimal 3 karakter';
    if (!form.email.trim()) err.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Format tidak valid';
    if (!form.password) err.password = 'Password wajib diisi';
    else if (form.password.length < 6) err.password = 'Minimal 6 karakter';
    if (form.password !== form.password_confirmation) err.password_confirmation = 'Password tidak cocok';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch {
      setErrors({ general: 'Gagal terhubung ke server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Daftar Akun</h2>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'password', 'password_confirmation'].map(field => (
          <div key={field} style={{ marginBottom: 15 }}>
            <input
              type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field === 'password_confirmation' ? 'Konfirmasi Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              style={{ width: '100%', padding: 10, borderColor: errors[field] ? 'red' : '#ddd' }}
            />
            {errors[field] && <small style={{ color: 'red' }}>{errors[field]}</small>}
          </div>
        ))}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Mendaftar...' : 'Daftar'}
        </button>
      </form>
      <p>Sudah punya akun? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;