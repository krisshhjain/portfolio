import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './Header.css';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import RotatingText from '../../components/ReactBits/RotatingText/RotatingText';
import LightRays from '../../components/ReactBits/LightRays/LightRays';
import TextType from '../../components/ReactBits/TextType/TextType';

const S = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_200,c_limit';
const P = 'https://res.cloudinary.com/dtku6vik9/image/upload/v1771860448/profile_gvukop.png';

/* ── tiny particle canvas ── */
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82, 39, 255, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="header__particles" />;
};

/* ── orbiting badges ── */
const orbitSkills = [
  { img: `${S}/react_converted_mc6gwo`, label: 'React', angle: 0 },
  { img: `${S}/node_converted_proaio`, label: 'Node', angle: 60 },
  { img: `${S}/python_converted_zk74ru`, label: 'Python', angle: 120 },
  { img: `${S}/MongoDB_converted_nrpqdn`, label: 'Mongo', angle: 180 },
  { img: `${S}/aws_converted_pfsyoa`, label: 'Cloud', angle: 240 },
  { img: `${S}/javascript_converted_krnnll`, label: 'JS', angle: 300 },
];

/* ── tech dock ── */
const dockItems = [
  { img: `${S}/react_converted_mc6gwo`, label: 'React' },
  { img: `${S}/node_converted_proaio`, label: 'Node.js' },
  { img: `${S}/python_converted_zk74ru`, label: 'Python' },
  { img: `${S}/typescript_converted_a0429i`, label: 'TypeScript' },
  { img: `${S}/git_converted_t4wjlw`, label: 'Git' },
];

const Header = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 25 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 25 });

  const handleMouse = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  /* stagger children */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div id="home" className="app__header" ref={containerRef} onMouseMove={handleMouse}>
      {/* Backgrounds */}
      <div className="header__lightrays"><LightRays raysOrigin="top-center" raysColor="#5227FF" raysSpeed={0.8} lightSpread={0.6} rayLength={2.5} followMouse mouseInfluence={0.08} noiseAmount={0.02} distortion={0.1} fadeDistance={1} saturation={1.2} /></div>
      <ParticleField />
      <div className="header__noise" />

      {/* Content grid */}
      <motion.div className="header__grid" variants={container} initial="hidden" animate="show">

        {/* ── LEFT: glass card with text ── */}
        <motion.div className="header__info-card" variants={fadeUp}>
          <div className="header__info-glass">
            <div className="header__greeting">
              <span className="header__wave">👋</span>
              <TextType
                text={["Hello there, I hope you're having a good day.", "Welcome to my portfolio!", "Let's build something amazing."]}
                typingSpeed={60}
                deletingSpeed={35}
                pauseDuration={2000}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                className="header__greeting-typed"
              />
            </div>

            <h1 className="header__name">
              <span className="header__name-fill">
                <DecryptedText text="Krish" speed={50} maxIterations={12} animateOn="view" />
              </span>
              <span className="header__name-stroke">
                <DecryptedText text=" Jain" speed={50} maxIterations={12} animateOn="view" />
              </span>
            </h1>

            <div className="header__tagline">
              <span className="header__tagline-static">I'm a</span>
              <span className="header__tagline-dynamic">
                <RotatingText
                  texts={['Full Stack Developer', 'Cloud Enthusiast', 'Open Source Contributor', 'Problem Solver']}
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </span>
            </div>

            <p className="header__description">
              Building performant, beautiful &amp; scalable web experiences.
              Passionate about crafting digital products that make a real difference.
            </p>

            <div className="header__cta">
              <a href="#contact" className="header__btn header__btn--primary cursor-target">
                <span className="header__btn-glow" />
                Get In Touch
              </a>
              <a href="#work" className="header__btn header__btn--outline cursor-target">
                <span className="header__btn-border" />
                View Work
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: 3D parallax image ── */}
        <motion.div className="header__visual" variants={fadeUp}>
          <motion.div
            className="header__img-3d"
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
          >
            <div className="header__img-wrapper">
              <img src={P} alt="Krish Jain" />
              <div className="header__img-ring" />
              <motion.div className="header__img-glow" style={{ x: glowX, y: glowY }} />
            </div>

            {/* Orbiting skill badges */}
            <div className="header__orbit">
              {orbitSkills.map((skill, i) => (
                <div
                  key={i}
                  className="header__orbit-badge"
                  style={{ '--orbit-angle': `${skill.angle}deg`, '--orbit-delay': `${-i * 2}s` }}
                >
                  <img src={skill.img} alt={skill.label} />
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Floating tech dock ── */}
      <motion.div className="header__dock" variants={fadeUp} initial="hidden" animate="show">
        {dockItems.map((item, i) => (
          <motion.div key={i} className="header__dock-item cursor-target" whileHover={{ scale: 1.35, y: -6 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
            <img src={item.img} alt={item.label} />
            <span className="header__dock-tooltip">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <div className="header__scroll-indicator">
        <div className="header__scroll-mouse"><div className="header__scroll-dot" /></div>
        <span className="header__scroll-text">Scroll</span>
      </div>
    </div>
  );
};

export default Header;
