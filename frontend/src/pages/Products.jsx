import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://localhost:8000/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red'}} >Error: {error}</p>;

    return (
    <div>
      <h1>Daftar Produk</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3>{product.name}</h3>
            <p>Rp {product.price?.toLocaleString()}</p>
            <p>Stok: {product.stock}</p>
            {/* Link ke detail produk dengan ID dinamis */}
            <Link to={`/products/${product.id}`} style={{ color: '#0D9488' }}>
              Lihat Detail →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;