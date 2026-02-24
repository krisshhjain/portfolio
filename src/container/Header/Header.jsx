import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import './Header.css';

const PROFILE = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_600,c_limit/profilepic1_zn0qss';

/* ── Floating particles ── */
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3, dx: (Math.random() - 0.5) * 0.18,
        dy: (Math.random() - 0.5) * 0.18, opacity: Math.random() * 0.25 + 0.05,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82, 39, 255, ${p.opacity})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="header__particles" />;
};

const Header = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 60, damping: 20 });
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), { stiffness: 60, damping: 20 });

  /* Hide social icons when scrolled past the hero */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const socialsOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);

  const handleMouse = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }, [mouseX, mouseY]);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
  };

  return (
    <div id="home" className="app__header" ref={containerRef} onMouseMove={handleMouse}>
      <ParticleField />
      <div className="header__noise" />
      <div className="header__orb header__orb--1" />
      <div className="header__orb header__orb--2" />
      <div className="header__orb header__orb--3" />

      <p className="header__mobile-quip">
        PC-only was the plan… but the nerd in me said "we're shipping mobile too"
      </p>

      <motion.div className="header__layout" variants={stagger} initial="hidden" animate="show">


        {/* ══════════════════════════════════
            MAIN EDITORIAL BLOCK
            ══════════════════════════════════ */}
        <div className="header__hero-block">

          {/* Row 1 */}
          <motion.div className="header__row header__row--1" variants={fadeUp}>
            <span className="header__text-serif">Building</span>
            <span className="header__text-bold">The</span>
            <span className="header__text-thin">Future</span>
          </motion.div>

          {/* Row 2  — image + text */}
          <motion.div className="header__row header__row--2" variants={fadeUp}>
            <span className="header__text-outline">With</span>

            <motion.div className="header__portrait" style={{ x: imgX, y: imgY }} variants={scaleIn}>
              <div className="header__portrait-frame">
                <img src={PROFILE} alt="Krish Jain" draggable={false} />
                <div className="header__portrait-shine" />
              </div>
              <div className="header__portrait-glow" />
              <div className="header__portrait-ring" />
            </motion.div>

            <span className="header__text-gradient">AI</span>
          </motion.div>

          {/* Row 3 */}
          <motion.div className="header__row header__row--3" variants={fadeUp}>
            <span className="header__text-bold">&</span>
            <span className="header__text-gradient-alt">Code</span>
            <span className="header__text-symbol">✦</span>
          </motion.div>
        </div>

        {/* ── Bottom section — centered ── */}
        <motion.div className="header__bottom" variants={fadeUp}>
          <div className="header__stats">
            {[
              { val: '1+', lbl: 'Year of Exp' },
              { val: '10+', lbl: 'Projects' },
              { val: '10+', lbl: 'Certifications' },
            ].map((s, i) => (
              <div key={i} className="header__stat">
                <span className="header__stat-val">{s.val}</span>
                <span className="header__stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>

          <p className="header__bio-line">
            <strong>Krish Jain</strong> — AI/ML & Full-Stack Developer
          </p>

          <div className="header__cta">
            <a href="#contact" className="header__btn header__btn--primary cursor-target">
              <span className="header__btn-glow" />
              Let's Talk
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <a href="#work" className="header__btn header__btn--ghost cursor-target">
              <span className="header__btn-border" />
              View Work
            </a>
          </div>
        </motion.div>

        <motion.span className="header__side-tag header__side-tag--l" variants={fadeUp}>Portfolio / 2026</motion.span>
        <motion.span className="header__side-tag header__side-tag--r" variants={fadeUp}>Scroll ↓</motion.span>

      </motion.div>

      {/* ── Social icons — bottom left ── */}
      <motion.div className="header__socials" style={{ opacity: socialsOpacity, pointerEvents: socialsOpacity.get?.() === 0 ? 'none' : 'auto' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <a href="https://www.linkedin.com/in/krishjain710/" target="_blank" rel="noopener noreferrer" className="header__social-icon cursor-target" aria-label="LinkedIn" data-tooltip="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        </a>
        <a href="https://github.com/krisshhjain" target="_blank" rel="noopener noreferrer" className="header__social-icon cursor-target" aria-label="GitHub" data-tooltip="GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
        </a>
        <a href="https://www.instagram.com/krisshhjain" target="_blank" rel="noopener noreferrer" className="header__social-icon cursor-target" aria-label="Instagram" data-tooltip="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        </a>
        <a href="https://x.com/krisshhjain" target="_blank" rel="noopener noreferrer" className="header__social-icon cursor-target" aria-label="X" data-tooltip="X (Twitter)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
      </motion.div>
    </div>
  );
};

export default Header;
