"use client";

import { useState } from "react";
import styles from "./auth.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false); // Default to Signup as per request flow
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        password: ""
    });
    const [status, setStatus] = useState("idle");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setMsg("");

        if (!isLogin) {
            // Register
            try {
                const res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();

                if (res.ok) {
                    setStatus("success");
                    setMsg("Account created! Please log in.");
                    setTimeout(() => setIsLogin(true), 1500);
                } else {
                    setStatus("error");
                    setMsg(data.message || "Registration failed");
                }
            } catch (err) {
                setStatus("error");
                setMsg("Something went wrong");
            }
        } else {
            // Login (Mock for MVP)
            // In a real app, verify against DB. Here we just redirect if fields are filled.
            // For true auth, we'd need a login API.
            // Let's at least check if user exists in our local DB via client-side check for demo
            try {
                const res = await fetch("/api/users"); // This endpoint returns all users (safe fields)
                const users = await res.json();

                // Very insecure specific check, but illustrative for the MVP task
                // Since GET /api/users doesn't return passwords, we can't truly verify password here.
                // We'll simulate a login success.

                const userExists = users.find(u => u.email === formData.email);

                if (userExists) {
                    setStatus("success");
                    setMsg("Welcome back!");
                    sessionStorage.setItem("user", JSON.stringify(userExists));
                    setTimeout(() => router.push("/shop"), 1000);
                } else {
                    setStatus("error");
                    setMsg("User not found. Please sign up.");
                }
            } catch (e) {
                setStatus("error");
                setMsg("Login error");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.bgImage}>
                <Image
                    src="/auth_hero_abstract_1766518890525.png"
                    alt="Abstract Background"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <motion.div
                className={styles.authCard}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>{isLogin ? "Welcome Back" : "Join Aura"}</h1>
                <p className={styles.subtitle}>
                    {isLogin ? "Access your design sanctuary" : "Start your journey to a better home"}
                </p>

                {msg && (
                    <div className={`${styles.message} ${status === "success" ? styles.success : styles.error}`}>
                        {msg}
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                className={styles.input}
                                name="name"
                                placeholder="Full Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    className={styles.input}
                                    name="age"
                                    placeholder="Age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                                <input
                                    className={styles.input}
                                    name="phone"
                                    placeholder="Phone No."
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <input
                        className={styles.input}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                        {status === "loading" ? <Loader2 className="spin" style={{ margin: '0 auto' }} /> : (isLogin ? "Log In" : "Create Account")}
                    </button>
                </form>

                <div className={styles.toggleText}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span className={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Log In"}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
