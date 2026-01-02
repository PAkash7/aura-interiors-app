"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "@/components/ui/Button.module.css";
import { Trash2, Plus, Image as ImageIcon } from "lucide-react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('inventory');
    const [products, setProducts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    // New Product State
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        image: "/images/placeholder.png",
        description: ""
    });

    useEffect(() => {
        // Protect Route
        const sessionAdmin = sessionStorage.getItem("isAdmin");
        if (!sessionAdmin) {
            router.push("/admin/login");
        } else {
            setIsAdmin(true);
            fetchData();
        }
    }, [router]);

    const fetchData = async () => {
        try {
            const [prodRes, msgRes, userRes, appRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/contact'),
                fetch('/api/users'),
                fetch('/api/applications')
            ]);

            const prodData = await prodRes.json();
            const msgData = await msgRes.json();
            const userData = userRes.ok ? await userRes.json() : [];
            const appData = appRes.ok ? await appRes.json() : [];

            setProducts(prodData);
            setMessages(msgData);
            setUsers(userData);
            setApplications(appData);
        } catch (e) {
            console.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            setProducts(products.filter(p => p.id !== id));
        } catch (e) {
            alert("Failed to delete");
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
            setMessages(messages.filter(m => m.id !== id));
        } catch (e) { alert("Failed to delete message"); }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
            setUsers(users.filter(u => u.id !== id));
        } catch (e) { alert("Failed to delete user"); }
    };

    const handleDeleteApplication = async (id) => {
        if (!confirm("Are you sure you want to delete this application?")) return;
        try {
            await fetch(`/api/applications?id=${id}`, { method: 'DELETE' });
            setApplications(applications.filter(a => a.id !== id));
        } catch (e) { alert("Failed to delete application"); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const newProduct = await res.json();
                setProducts([...products, newProduct]);
                setFormData({ name: "", category: "", price: "", image: "/images/placeholder.png", description: "" });
                alert("Product added!");
            } else {
                alert("Failed to add product");
            }
        } catch (e) {
            alert("Error adding product");
        }
    };

    if (!isAdmin) return null;

    const tabStyle = (tabName) => ({
        padding: '0.6rem 1.2rem',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: activeTab === tabName ? 'var(--color-primary)' : 'transparent',
        color: activeTab === tabName ? '#fff' : 'inherit',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: '500'
    });

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-full)', padding: '0.3rem' }}>
                        <button onClick={() => setActiveTab('inventory')} style={tabStyle('inventory')}>
                            Inventory
                        </button>
                        <button onClick={() => setActiveTab('messages')} style={tabStyle('messages')}>
                            Messages ({messages.length})
                        </button>
                        <button onClick={() => setActiveTab('users')} style={tabStyle('users')}>
                            Users ({users.length})
                        </button>
                        <button onClick={() => setActiveTab('applications')} style={tabStyle('applications')}>
                            Apps ({applications.length})
                        </button>
                    </div>
                    <button
                        onClick={() => { sessionStorage.removeItem('isAdmin'); router.push('/shop'); }}
                        className={styles.button}
                        style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', height: 'fit-content' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {loading ? <p>Loading data...</p> : (
                <>
                    {activeTab === 'inventory' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                            {/* Add Product Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    padding: '2rem',
                                    borderRadius: 'var(--radius-lg)',
                                    height: 'fit-content'
                                }}
                            >
                                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Plus size={20} /> Add New Product
                                </h2>
                                <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <input
                                        placeholder="Product Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={inputStyle}
                                    />
                                    <input
                                        placeholder="Category (e.g. Sofa, Lamp)"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        style={inputStyle}
                                    />
                                    <input
                                        placeholder="Image URL (start with /images/...)"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        style={inputStyle}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ ...inputStyle, minHeight: '100px' }}
                                    />
                                    <button type="submit" className={styles.button} style={{ justifyContent: 'center' }}>
                                        Add Product
                                    </button>
                                </form>
                            </motion.div>

                            {/* Product List */}
                            <div>
                                <h2 style={{ marginBottom: '1.5rem' }}>Current Inventory</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {products.map(p => (
                                        <motion.div
                                            key={p.id}
                                            layout
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: 'var(--color-surface)',
                                                padding: '1rem 1.5rem',
                                                borderRadius: 'var(--radius-md)',
                                                border: '1px solid var(--color-border)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '50px', height: '50px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#333' }}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <h4 style={{ fontWeight: '600' }}>{p.name}</h4>
                                                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>${p.price} • {p.category}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                style={{
                                                    padding: '0.5rem',
                                                    color: '#ef4444',
                                                    borderRadius: '50%',
                                                    transition: 'background 0.2s',
                                                    cursor: 'pointer',
                                                    border: 'none',
                                                    background: 'transparent'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: '800px', margin: '0 auto' }}
                        >
                            <h2 style={{ marginBottom: '2rem' }}>Customer Inquiries</h2>
                            {messages.length === 0 ? <p>No messages yet.</p> : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {messages.map((msg, i) => (
                                        <div key={i} style={{
                                            backgroundColor: 'var(--color-surface)',
                                            padding: '1.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            position: 'relative'
                                        }}>
                                            <button
                                                onClick={() => handleDeleteMessage(msg.id)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '1rem',
                                                    right: '1rem',
                                                    padding: '0.5rem',
                                                    color: '#ef4444',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingRight: '2rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{msg.name}</h3>
                                                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{msg.email}</p>
                                                </div>
                                                <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>
                                                    {new Date(msg.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p style={{ lineHeight: '1.6', opacity: 0.9 }}>{msg.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'users' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: '800px', margin: '0 auto' }}
                        >
                            <h2 style={{ marginBottom: '2rem' }}>Registered Users</h2>
                            {users.length === 0 ? <p>No users yet.</p> : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    {users.map((u, i) => (
                                        <div key={i} style={{
                                            backgroundColor: 'var(--color-surface)',
                                            padding: '1.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            position: 'relative'
                                        }}>
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '1rem',
                                                    right: '1rem',
                                                    padding: '0.5rem',
                                                    color: '#ef4444',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingRight: '2rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{u.name}</h3>
                                                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Joined: {new Date(u.joined).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6' }}>
                                                <p><strong>Email:</strong> {u.email}</p>
                                                <p><strong>Age:</strong> {u.age || 'N/A'}</p>
                                                <p><strong>Phone:</strong> {u.phone || 'N/A'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'applications' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ maxWidth: '800px', margin: '0 auto' }}
                        >
                            <h2 style={{ marginBottom: '2rem' }}>Job Applications</h2>
                            {applications.length === 0 ? <p>No applications yet.</p> : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {applications.map((app, i) => (
                                        <div key={i} style={{
                                            backgroundColor: 'var(--color-surface)',
                                            padding: '1.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--color-border)',
                                            position: 'relative'
                                        }}>
                                            <button
                                                onClick={() => handleDeleteApplication(app.id)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '1rem',
                                                    right: '1rem',
                                                    padding: '0.5rem',
                                                    color: '#ef4444',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem', paddingRight: '2rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary)' }}>{app.role}</h3>
                                                    <div style={{ fontWeight: '500' }}>{app.name}</div>
                                                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{app.email}</p>
                                                </div>
                                                <div style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                                    <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>
                                                        {new Date(app.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                                <div>
                                                    <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.3rem' }}>Experience</strong>
                                                    {app.experience}
                                                </div>
                                                {app.portfolio && (
                                                    <div>
                                                        <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.3rem' }}>Portfolio</strong>
                                                        <a href={app.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>View Portfolio</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
}

const inputStyle = {
    padding: '0.8rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-background)',
    color: 'inherit',
    fontFamily: 'inherit'
};
