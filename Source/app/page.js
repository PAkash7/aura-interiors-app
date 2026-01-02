"use client";

import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { useEffect, useState } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // Fetch a few products for trending section
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setTrending(data.slice(0, 3)))
      .catch(e => console.error("Err", e));
  }, []);

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <motion.div style={{ y: y1 }} className={styles.heroImage}>
          <Image
            src="/aura_home_hero_lux_1766518050947.png"
            alt="Luxury Interior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        </motion.div>

        <div className={styles.heroContent}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Design Your Dream <br />
            <span className={styles.highlight}>Sanctuary.</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of living. Premium furniture and decor tailored to your soul by Aura AI.
          </motion.p>

          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/shop">
              <Button variant="primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Explore Collection
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => document.querySelector('[class*="toggleBtn"]')?.click()}
              style={{ color: 'white', borderColor: 'white', padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              Talk to Aura AI
            </Button>
          </motion.div>
        </div>
      </section>

      {/* AI FEATURE SECTION */}
      <section className={styles.aiSection}>
        <div className={styles.aiContent}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles size={48} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
            <h2 className={styles.aiTitle}>Meet Your Personal Designer</h2>
            <p className={styles.aiDesc}>
              Not sure what matches your vibe? Just chat with Aura. Our advanced AI understands texture, color theory, and mood to recommend the perfect pieces for your space.
            </p>
          </motion.div>

          <motion.div
            className={styles.aiVisual}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>“I want a cozy, minimalist reading display”</h3>
              <Button
                variant="primary"
                onClick={() => document.querySelector('[class*="toggleBtn"]')?.click()}
              >
                Try Aura Now <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRENDING ITEMS */}
      <section className={styles.trending}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Trending This Week</h2>
          <Link href="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

