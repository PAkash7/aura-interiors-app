"use client";

import styles from "./ProductCard.module.css";
import Button from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        {product.name.charAt(0)}
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price}>${product.price}</div>
            </div>
            <div className={styles.actions}>
                <Button variant="primary" fullWidth onClick={handleAddToCart}>
                    <ShoppingBag size={18} /> Add to Cart
                </Button>
            </div>
        </div>
    );
}
