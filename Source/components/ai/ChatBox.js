"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatBox.module.css";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateAIResponse } from "@/lib/ai-logic";
import Button from "../ui/Button";

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hi! I'm Aura AI. Tell me about your dream room style." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const response = await generateAIResponse(userMsg.content);
            const aiMsg = {
                role: 'ai',
                content: response.text,
                products: response.products
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.chatWrapper}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.chatWindow}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.header}>
                            <Sparkles size={18} />
                            <span>Aura Assistant</span>
                            <button onClick={() => setIsOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className={styles.messages}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                                    <p>{msg.content}</p>
                                    {msg.products && msg.products.length > 0 && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            {msg.products.map(p => (
                                                <div key={p.id} className={styles.productCard}>
                                                    {/* Placeholder image logic if needed */}
                                                    <div className={styles.productInfo}>
                                                        <h4>{p.name}</h4>
                                                        <p>${p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {loading && <div className={`${styles.message} ${styles.ai}`}>Thinking...</div>}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className={styles.inputArea} onSubmit={handleSubmit}>
                            <input
                                className={styles.input}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type 'modern sofa'..."
                            />
                            <Button type="submit" variant="primary" style={{ padding: '0.5rem' }}>
                                <Send size={16} />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={styles.toggleBtn}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
