"use client";

import { useState } from "react";
import styles from "./careers.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Briefcase, ArrowRight, Loader2 } from "lucide-react";

const JOBS = [
    {
        id: "carpenter",
        title: "Master Carpenter",
        type: "Full-time",
        location: "Workshop / On-site",
        description: "Seeking an experienced carpenter to craft bespoke furniture pieces. Must have 5+ years of experience with custom woodworking and installation."
    },
    {
        id: "plumber",
        title: "Expert Plumber",
        type: "Contract",
        location: "On-site",
        description: "Join our renovation team. Responsible for high-end bathroom and kitchen fixture installations. Precision and attention to detail required."
    },
    {
        id: "web-manager",
        title: "Website Manager",
        type: "Remote / Hybrid",
        location: "HQ",
        description: "Manage our digital presence. Oversee e-commerce operations, content updates, and ensure a seamless user experience for our clients."
    },
    {
        id: "general-staff",
        title: "General Household Staff",
        type: "Part-time",
        location: "Multiple Locations",
        description: "Various roles available including cleaning, maintenance, and organization for our premium client properties."
    }
];

export default function CareersPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        experience: "",
        portfolio: ""
    });
    const [status, setStatus] = useState("idle");
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setMsg("Application submitted successfully! We will contact you soon.");
                setFormData({ name: "", email: "", role: "", experience: "", portfolio: "" });
            } else {
                setStatus("error");
                setMsg("Failed to submit application. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setMsg("Something went wrong.");
        }
    };

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <Image
                    src="/careers_hero_workshop_1766519905714.png"
                    alt="Workshop"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
                <div className={styles.overlay} />
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Join the Aura.
                    </motion.h1>
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        We are looking for passionate craftsmen and digital wizards to help us redefine modern living.
                    </motion.p>
                </div>
            </div>

            <div className={styles.section}>
                {/* Job Listings */}
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", marginBottom: "2rem", textAlign: "center" }}>Current Openings</h2>
                <div className={styles.jobsGrid}>
                    {JOBS.map((job, index) => (
                        <motion.div
                            key={job.id}
                            className={styles.jobCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className={styles.jobRole}>{job.title}</h3>
                            <div className={styles.jobMeta}>
                                <span><Briefcase size={14} style={{ marginRight: 5 }} /> {job.type}</span>
                                <span>{job.location}</span>
                            </div>
                            <p className={styles.jobDesc}>{job.description}</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, role: job.title }));
                                    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Apply Now <ArrowRight size={14} style={{ marginLeft: 5 }} />
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Application Form */}
                <div id="application-form" className={styles.formContainer}>
                    <h3 className={styles.formTitle}>Apply Today</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    className={styles.input}
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    className={styles.input}
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Position</label>
                                <select
                                    className={styles.select}
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a Role</option>
                                    {JOBS.map(j => <option key={j.id} value={j.title}>{j.title}</option>)}
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Years of Experience</label>
                                <input
                                    className={styles.input}
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="E.g. 3 years"
                                />
                            </div>
                            <div className={styles.fullWidth}>
                                <label className={styles.label}>Portfolio / Resume Link (Optional)</label>
                                <input
                                    className={styles.input}
                                    name="portfolio"
                                    value={formData.portfolio}
                                    onChange={handleChange}
                                    placeholder="https://"
                                />
                            </div>
                        </div>

                        {msg && (
                            <div className={`${styles.statusMessage} ${status === 'success' ? styles.success : styles.error}`}>
                                {msg}
                            </div>
                        )}

                        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
                            <Button variant="primary" type="submit" disabled={status === "loading"} size="lg">
                                {status === "loading" ? <Loader2 className="spin" /> : "Submit Application"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
