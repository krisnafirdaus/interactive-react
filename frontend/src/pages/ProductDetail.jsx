import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Memuat detail produk...</p>;
  if (!product) return <p>Produk tidak ditemukan</p>;

  return (
    <div>
      <Link to="/products">← Kembali ke Daftar Produk</Link>
      <h1>{product.name}</h1>
      <p><strong>Harga:</strong> Rp {product.price?.toLocaleString()}</p>
      <p><strong>Stok:</strong> {product.stock} unit</p>
      <p><strong>Deskripsi:</strong> {product.description}</p>
    </div>
  );
}

export default ProductDetail;