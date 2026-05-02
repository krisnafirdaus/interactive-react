import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';

function Admin() {
  const { getToken } = useAuth();
  const { data: products, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/products`);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit: Create atau Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/products/${editingId}`
      : `${import.meta.env.VITE_API_URL}/products`;

    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        })
      });
      setForm({ name: '', description: '', price: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert('Gagal: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit: Isi form dengan data produk
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock
    });
    setEditingId(product.id);
  };

  // Delete: Hapus produk
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus produk ini?')) return;
    await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    fetchProducts();
  };

  return (
    <div>
      <h1>Panel Admin — Kelola Produk</h1>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30, padding: 20, background: '#f8f9fa', borderRadius: 8 }}>
        <h3>{editingId ? 'Edit Produk' : 'Tambah Produk'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nama Produk" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Harga" type="number" required />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stok" type="number" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: '8px 20px' }}>
          {loading ? 'Menyimpan...' : editingId ? 'Update' : 'Tambah'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', price: '', stock: '' }); }}>
            Batal
          </button>
        )}
      </form>

      {/* Tabel Produk */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#0D9488', color: 'white' }}>
          <tr>
            <th>ID</th><th>Nama</th><th>Harga</th><th>Stok</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>Rp {p.price?.toLocaleString()}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)} style={{ marginRight: 5 }}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ color: 'red' }}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;