import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user, isAdmin } = useAuth();

    return (
        <div style={{ maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ccc', borderRadius: 5 }}>
            <h2>Dashboard</h2>
            <p>Selamat datang, {user?.name}!</p>
            <p>Email: {user?.email}</p>
            <p>Role: {isAdmin ? 'Admin' : 'User'}</p>

            {isAdmin && (
                <div style={{ marginTop: 20, padding: 15, background: '#f9f9f9', borderRadius: 5 }}>
                    <h3>Panel Admin</h3>
                    <p>Di sini Anda dapat mengelola produk, melihat laporan penjualan, dan melakukan tugas admin lainnya.</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;