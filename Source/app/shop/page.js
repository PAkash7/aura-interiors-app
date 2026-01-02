"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/shop/ProductCard";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (e) {
                console.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Our Collection</h1>
            </header>
            <div style={{ padding: '4rem', textAlign: 'center' }}>Loading collections...</div>
        </div>
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Our Collection</h1>
                <p className={styles.subtitle}>Curated pieces for the modern home.</p>
            </header>

            <div className={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
