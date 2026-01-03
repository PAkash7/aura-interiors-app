"use client";

import styles from "./Button.module.css";
import { motion } from "framer-motion";

export default function Button({ 
  children, 
  variant = "primary", 
  fullWidth = false, 
  className = "",
  onClick,
  ...props 
}) {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
