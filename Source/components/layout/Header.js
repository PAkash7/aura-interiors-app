"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { ShoppingBag, Search, Menu, Home, Store, Info, Phone, User } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <>
            <header className={styles.header}>
                <div className={`container ${styles.navContainer}`}>
                    <Link href="/" className={styles.logo}>
                        Aura<span>.</span>
                    </Link>

                    <nav className={styles.navLinks}>
                        <Link href="/" className={styles.navLink}>
                            <Home size={18} /> Home
                        </Link>
                        <Link href="/shop" className={styles.navLink}>
                            <Store size={18} /> Shop
                        </Link>
                        <Link href="/about" className={styles.navLink}>
                            <Info size={18} /> About
                        </Link>
                        <Link href="/contact" className={styles.navLink}>
                            <Phone size={18} /> Contact
                        </Link>
                    </nav>

                    <div className={styles.actions}>
                        <button
                            className={styles.iconBtn}
                            aria-label="Search"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={20} />
                        </button>

                        <Link href="/auth" className={styles.iconBtn} aria-label="Account">
                            <User size={20} />
                        </Link>

                        <button
                            className={styles.iconBtn}
                            aria-label="Cart"
                            onClick={() => alert(`You have ${cartCount} items in your cart.`)}
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                        </button>

                        {/* Mobile Menu Trigger - Hidden on desktop via CSS */}
                        <button className={`${styles.iconBtn} ${styles.mobileMenu}`} aria-label="Menu" style={{ display: 'none' }}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
