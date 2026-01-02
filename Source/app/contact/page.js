"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./contact.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Loader2, Send } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [statusMsg, setStatusMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setStatusMsg('Thank you! Your message has been sent.');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setStatusMsg(data.message || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('error');
            setStatusMsg('Failed to send message. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Visual Side */}
                <motion.div
                    className={styles.imageSide}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src="/contact_page_hero_1766518378230.png"
                        alt="Contact Us"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.overlay} />
                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 2, color: 'white' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Lets Create Together.</h3>
                        <p style={{ opacity: 0.9 }}>Connect with our design team today.</p>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    className={styles.contentSide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className={styles.title}>Get in <span className={styles.highlight}>Touch</span>.</h1>
                    <p className={styles.desc}>
                        Whether you need design advice, product details, or just want to say hello, we are here for you.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input
                                className={styles.input}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Message</label>
                            <textarea
                                className={styles.textarea}
                                rows={5}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Tell us what you're looking for..."
                            />
                        </div>

                        {statusMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`${styles.statusMessage} ${status === 'success' ? styles.statusSuccess : styles.statusError}`}
                            >
                                {statusMsg}
                            </motion.div>
                        )}

                        <Button variant="primary" type="submit" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
                            {status === 'loading' ? <Loader2 className="spin" size={20} /> : <><Send size={18} style={{ marginRight: '8px' }} /> Send Message</>}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
