import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
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
              { val: '2+', lbl: 'Years Exp' },
              { val: '15+', lbl: 'Projects' },
              { val: '5+', lbl: 'Tech Stacks' },
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

        {/* ── Decorative elements ── */}
        <div className="header__deco header__deco--tl" />
        <div className="header__deco header__deco--br" />
        <motion.span className="header__side-tag header__side-tag--l" variants={fadeUp}>Portfolio / 2026</motion.span>
        <motion.span className="header__side-tag header__side-tag--r" variants={fadeUp}>Scroll ↓</motion.span>

      </motion.div>
    </div>
  );
};

export default Header;
