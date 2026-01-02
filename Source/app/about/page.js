"use client";

import styles from "./page.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Heart, ShieldCheck } from "lucide-react";

export default function About() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Redefining Modern Living.</h1>
                    <p>
                        Aura Interiors is more than just a furniture store. We are a convergence of premium design curation and advanced AI, dedicated to helping you discover pieces that resonate with your soul.
                    </p>
                    <p>
                        Born from a passion for aesthetics and technology, we believe your home should be a reflection of who you are—effortlessly stylish, deeply personal, and unapologetically bold.
                    </p>
                </motion.div>
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Image
                        src="/about_us_hero_1766517792511.png"
                        alt="Minimalistic Interior Studio"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </motion.div>
            </div>

            <motion.div
                className={styles.stats}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.statItem}>
                    <h3>2024</h3>
                    <p>Founded with Vision</p>
                </div>
                <div className={styles.statItem}>
                    <h3>500+</h3>
                    <p>Curated Pieces</p>
                </div>
                <div className={styles.statItem}>
                    <h3>100%</h3>
                    <p>AI Personalization</p>
                </div>
            </motion.div>

            <div className={styles.values}>
                <h2>Why Choose Aura?</h2>
                <div className={styles.valueGrid}>
                    <motion.div
                        className={styles.valueCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Award size={40} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                        <h3>Premium Curation</h3>
                        <p>Every piece in our collection is handpicked for its quality, craftsmanship, and timeless aesthetic.</p>
                    </motion.div>

                    <motion.div
                        className={styles.valueCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Heart size={40} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                        <h3>AI-Driven Design</h3>
                        <p>Our Aura AI understands your unique style language to suggest items that fit perfectly in your space.</p>
                    </motion.div>

                    <motion.div
                        className={styles.valueCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <ShieldCheck size={40} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                        <h3>Quality Promise</h3>
                        <p>We partner with the world&apos;s best artisans to ensure that your furniture lasts a lifetime.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
