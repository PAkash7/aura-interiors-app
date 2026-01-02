"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "@/components/ui/Button.module.css"; // Reusing button styles for consistency

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // Simplified for MVP
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, this would verify against a secure API.
        // For this local MVP demo, we use hardcoded credentials.
        if (username === "admin" && password === "admin123") {
            // Simple session management: just store a flag
            sessionStorage.setItem("isAdmin", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h1 style={{ marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Admin Login</h1>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'transparent',
                            color: 'inherit'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'transparent',
                            color: 'inherit'
                        }}
                    />

                    {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

                    <button type="submit" className={styles.button} style={{ width: '100%', justifyContent: 'center' }}>
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
