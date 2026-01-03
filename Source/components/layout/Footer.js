import Link from "next/link";
import styles from "./Footer.module.css";
import { Instagram, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>Aura.</h3>
                        <p>Elevating home interiors with AI-driven design By Akash Pandey</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Shop</h4>
                        <div className={styles.links}>
                            <Link href="/shop">All Products</Link>
                            <Link href="/shop/living">Living Room</Link>
                            <Link href="/shop/bedroom">Bedroom</Link>
                            <Link href="/shop/kitchen">Kitchen</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Company</h4>
                        <div className={styles.links}>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact</Link>
                            <Link href="/careers">Careers</Link>
                            <Link href="/admin/login">Admin Login</Link>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Follow Us</h4>
                        <div className={styles.links}>
                            <a href="https://www.instagram.com/py_.akash?igsh=dWxlbm10Mzlma211" target="_blank" aria-label="Instagram" className={styles.socialLink}>
                                <Instagram size={20} /> Instagram
                            </a>
                            <a href="#" aria-label="Twitter" className={styles.socialLink}>
                                <Twitter size={20} /> Twitter
                            </a>
                            <a href="https://wa.me/919473703881" target="_blank" aria-label="WhatsApp" className={styles.socialLink}>
                                <MessageCircle size={20} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Aura Interiors. All rights reserved.</p>
                    <p>Designed by Akash Pandey with NEXT-GEN AI</p>
                </div>
            </div>
        </footer>
    );
}
