import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <nav style={{
      padding: '10px 20px',
      background: '#0D9488',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          ShopKita
        </Link>
        <NavLink to="/" style={({isActive}) => ({ color: 'white', opacity: isActive ? 1 : 0.8 })}>
          Home
        </NavLink>
        <NavLink to="/products" style={({isActive}) => ({ color: 'white', opacity: isActive ? 1 : 0.8 })}>
          Produk
        </NavLink>

        {/* Menu untuk user yang sudah login */}
        {isLoggedIn && (
          <NavLink to="/dashboard" style={({isActive}) => ({ color: 'white', opacity: isActive ? 1 : 0.8 })}>
            Dashboard
          </NavLink>
        )}

        {/* Menu admin — hanya muncul jika isAdmin */}
        {isAdmin && (
          <NavLink to="/admin" style={({isActive}) => ({ color: '#FDE68A', fontWeight: isActive ? 'bold' : 'normal' })}>
            Admin
          </NavLink>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {isLoggedIn ? (
          <>
            <span>Halo, {user?.name}</span>
            <button onClick={logout} style={{ padding: '5px 15px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Daftar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;