"use client";

import { useState, useEffect } from "react";
import styles from "./SearchOverlay.module.css";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock dictionary still static for now, or could come from DB too
const suggestionsMap = {
    "floor": ["Rug", "Carpet", "Tiles", "Baseboard"],
    "wall": ["Art", "Clock", "Mirror", "Paint"],
    "light": ["Chandelier", "Lamp", "Sconce", "Bulb"],
    "seat": ["Sofa", "Armchair", "Recliner", "Bench"],
    "wood": ["Table", "Chair", "Cabinet", "Flooring"]
};

export default function SearchOverlay({ onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        // Fetch products for search
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setAllProducts(data))
            .catch(err => console.error("Search fetch error", err));
    }, []);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();

        // 1. Dynamic Product Matches
        const productMatches = allProducts.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        ).map(p => ({ type: 'Product', text: p.name, link: `/shop` })); // directing to shop for now

        // 2. Smart Tag Matches
        let tagSuggestions = [];
        Object.keys(suggestionsMap).forEach(key => {
            if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
                tagSuggestions = [...tagSuggestions, ...suggestionsMap[key].map(s => ({ type: 'Suggestion', text: s, link: `/shop?q=${s}` }))];
            }
        });

        setResults([...productMatches, ...tagSuggestions]);

    }, [query, allProducts]);

    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <button className={styles.closeBtn} onClick={onClose}>
                <X size={32} />
            </button>

            <motion.div
                className={styles.searchContainer}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className={styles.inputWrapper}>
                    <Search size={24} color="var(--color-primary)" />
                    <input
                        className={styles.input}
                        placeholder="Search 'floor', 'sofa', 'modern'..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className={styles.results}>
                    {results.length === 0 && query && (
                        <div style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                            No suggestions found. Try "sofa" or "lamp".
                        </div>
                    )}

                    {results.map((res, idx) => (
                        <Link key={idx} href={res.link} onClick={onClose}>
                            <div className={styles.suggestionItem}>
                                <span>{res.text}</span>
                                <span className={styles.suggestionType}>{res.type}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
