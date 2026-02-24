import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './Experience.css';

const C = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_800,c_limit,fl_progressive';

const experiences = [
  {
    title: 'MERN Stack Developer',
    organization: 'Southern Command – Indian Army',
    location: 'Remote',
    period: 'Aug 2025 – Oct 2025',
    duration: '3 months',
    logo: `${C}/armyLogo_stnojn`,
    color: '#5227FF',
    gradient: 'linear-gradient(135deg, #5227FF 0%, #7B5BFF 100%)',
    highlights: [
      'Built secure MERN applications for internal Army workflows, reducing manual effort by 40%.',
      'Designed APIs, schemas, and RBAC, improving data security and access control by 50%.',
      'Delivered scalable, production-ready systems, increasing operational efficiency by 30%.',
    ],
    impact: [
      { value: '40%', label: 'Manual effort reduced' },
      { value: '50%', label: 'Security improved' },
      { value: '30%', label: 'Efficiency gained' },
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'RBAC', 'REST APIs'],
    gallery: [
      `${C}/1769596000768_converted_r7fsaa`,
      `${C}/20260224_183739023_iOS_converted_jilotc`,
    ],
  },
  {
    title: 'Software Developer Engineer Intern',
    organization: 'Indian Army – Mhow, India',
    location: 'On-Site',
    period: 'Jun 2025 – Aug 2025',
    duration: '3 months',
    logo: `${C}/armyLogo_stnojn`,
    color: '#06D6A0',
    gradient: 'linear-gradient(135deg, #06D6A0 0%, #0AEFB7 100%)',
    highlights: [
      'Built an internal cloud platform, improving workflow efficiency by ~30%.',
      'Optimized backend APIs and database queries, reducing response time by ~20%.',
      'Delivered production-ready components based on real operational requirements in a mission-critical environment.',
    ],
    impact: [
      { value: '30%', label: 'Workflow optimized' },
      { value: '20%', label: 'Response time cut' },
      { value: '100%', label: 'Production-ready' },
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Cloud', 'Git'],
    gallery: [
      `${C}/army2_converted_ij6pfa`,
      `${C}/20250721_110552554_iOS_converted_k7n3hx`,
      `${C}/army1_converted_tgj1c1`,
      `${C}/20250616_072849061_iOS_converted_khb6qa`,
      `${C}/20250615_134917063_iOS_converted_r910eq`,
      `${C}/20250612_125951784_iOS_converted_wvkkfe`,
    ],
  },
];

/* ── Animated counter ── */
const AnimatedValue = ({ value, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <span ref={ref} className="exp__impact-value" style={{ color }}>
      {isInView ? value : '0%'}
    </span>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryData, setGalleryData] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const exp = experiences[activeIndex];

  /* Reset carousel on tab change */
  useEffect(() => { setCarouselIdx(0); }, [activeIndex]);

  /* Auto-rotate carousel every 2 seconds */
  useEffect(() => {
    if (!exp.gallery || exp.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % exp.gallery.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeIndex, exp.gallery]);

  return (
    <div className="app__experience">
      <h2 className="head-text">
        <DecryptedText text="Experience" speed={50} maxIterations={10} animateOn="view" />
      </h2>
      <p className="exp__subtitle">Where I've contributed and grown as a developer</p>

      {/* ── Role Selector Tabs ── */}
      <div className="exp__tabs">
        {experiences.map((e, i) => (
          <button
            key={i}
            className={`exp__tab cursor-target ${activeIndex === i ? 'exp__tab--active' : ''}`}
            onClick={() => setActiveIndex(i)}
            style={{ '--tab-color': e.color }}
          >
            <div className="exp__tab-indicator" style={{ background: e.gradient }} />
            <img src={e.logo} alt={e.organization} className="exp__tab-logo" />
            <div className="exp__tab-info">
              <span className="exp__tab-title">{e.title}</span>
              <span className="exp__tab-period">{e.period}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Main Content (animated on switch) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="exp__content"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ '--accent': exp.color, '--accent-gradient': exp.gradient }}
        >
          {/* ── Top Row: Header + Gallery ── */}
          <div className="exp__hero">
            {/* Left: Role info */}
            <div className="exp__hero-info">
              <div className="exp__hero-badges">
                <span className="exp__badge exp__badge--location" style={{ color: exp.color, borderColor: `${exp.color}44` }}>
                  <span className="exp__badge-dot" style={{ background: exp.color }} />
                  {exp.location}
                </span>
                <span className="exp__badge exp__badge--duration">
                  {exp.duration}
                </span>
              </div>
              <h3 className="exp__hero-title">{exp.title}</h3>
              <p className="exp__hero-org">{exp.organization}</p>
              <span className="exp__hero-period">{exp.period}</span>

              {/* Tech Stack */}
              <div className="exp__tech-stack">
                {exp.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="exp__tech-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    style={{ borderColor: `${exp.color}30`, background: `${exp.color}0A` }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right: Auto-rotating carousel */}
            <div className="exp__hero-gallery">
              {exp.gallery && exp.gallery.length > 0 && (
                <div
                  className="exp__gallery-preview cursor-target"
                  onClick={() => { setGalleryData(exp); setGalleryIdx(carouselIdx); }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeIndex}-${carouselIdx}`}
                      src={exp.gallery[carouselIdx]}
                      alt={`${exp.organization} - ${carouselIdx + 1}`}
                      className="exp__gallery-thumb"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  <div className="exp__gallery-overlay-hint">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                    <span>View Photos</span>
                  </div>
                  {/* Dot indicators */}
                  <div className="exp__carousel-dots">
                    {exp.gallery.map((_, i) => (
                      <span
                        key={i}
                        className={`exp__carousel-dot ${i === carouselIdx ? 'exp__carousel-dot--active' : ''}`}
                        style={i === carouselIdx ? { background: exp.color } : {}}
                      />
                    ))}
                  </div>
                  <div className="exp__gallery-count">{carouselIdx + 1}/{exp.gallery.length}</div>
                </div>
              )}
            </div>
          </div>

          {/* ── Impact Metrics ── */}
          <div className="exp__impacts">
            {exp.impact.map((item, i) => (
              <motion.div
                key={i}
                className="exp__impact-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="exp__impact-glow" style={{ background: `${exp.color}15` }} />
                <AnimatedValue value={item.value} color={exp.color} />
                <span className="exp__impact-label">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* ── Highlights ── */}
          <div className="exp__highlights-section">
            <h4 className="exp__section-title">
              <span className="exp__section-line" style={{ background: exp.gradient }} />
              Key Contributions
            </h4>
            <ul className="exp__highlights">
              {exp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="exp__highlight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="exp__highlight-icon" style={{ background: exp.gradient }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="exp__highlight-text">{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Gallery Lightbox ── */}
      <AnimatePresence>
        {galleryData && (
          <motion.div
            className="exp__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryData(null)}
          >
            <motion.div
              className="exp__lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="exp__lightbox-close cursor-target" onClick={() => setGalleryData(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="exp__lightbox-main">
                <img src={galleryData.gallery[galleryIdx]} alt={`${galleryData.organization} - ${galleryIdx + 1}`} />
              </div>

              {galleryData.gallery.length > 1 && (
                <div className="exp__lightbox-thumbs">
                  {galleryData.gallery.map((img, i) => (
                    <button
                      key={i}
                      className={`exp__lightbox-thumb cursor-target ${galleryIdx === i ? 'exp__lightbox-thumb--active' : ''}`}
                      onClick={() => setGalleryIdx(i)}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}

              <div className="exp__lightbox-info">
                <span className="exp__lightbox-org">{galleryData.organization}</span>
                <span className="exp__lightbox-counter">{galleryIdx + 1} / {galleryData.gallery.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppWrap(MotionWrap(Experience, 'app__experience'), 'experience');
