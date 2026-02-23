import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    logo: `${C}/armyLogo_stnojn`,
    color: '#5227FF',
    highlights: [
      'Built secure MERN applications for internal Army workflows, reducing manual effort by 40%.',
      'Designed APIs, schemas, and RBAC, improving data security and access control by 50%.',
      'Delivered scalable, production-ready systems, increasing operational efficiency by 30%.',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'RBAC', 'REST APIs'],
    gallery: [`${C}/army1_converted_tgj1c1`, `${C}/army2_converted_ij6pfa`],
  },
  {
    title: 'Software Developer Engineer Intern',
    organization: 'Indian Army – Mhow, India',
    location: 'On-Site',
    period: 'Jun 2025 – Aug 2025',
    logo: `${C}/armyLogo_stnojn`,
    color: '#06D6A0',
    highlights: [
      'Built an internal cloud platform, improving workflow efficiency by ~30%.',
      'Optimized backend APIs and database queries, reducing response time by ~20%.',
      'Delivered production-ready components based on real operational requirements in a mission-critical environment.',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Cloud', 'Git'],
    gallery: [`${C}/army1_converted_tgj1c1`, `${C}/army2_converted_ij6pfa`],
  },
];

const cardVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.3, delay: 0.1 } } },
  exit: { height: 0, opacity: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.15 } } }
};

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [galleryData, setGalleryData] = useState(null);

  const toggle = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="app__experience">
      <h2 className="head-text">
        <DecryptedText text="Experience" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <div className="exp__timeline">
        <div className="exp__timeline-line" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className={`exp__card ${expandedIndex === index ? 'exp__card--active' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true, margin: '-40px' }}
            style={{ '--card-accent': exp.color }}
          >
            {/* Timeline dot */}
            <div className="exp__dot" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}55` }} />

            {/* Collapsed header — always visible, clickable */}
            <div className="exp__card-header cursor-target" onClick={() => toggle(index)}>
              <div className="exp__logo">
                <img src={exp.logo} alt={exp.organization} />
              </div>

              <div className="exp__meta">
                <h3 className="exp__title">{exp.title}</h3>
                <p className="exp__org">{exp.organization}</p>
                <div className="exp__badges">
                  <span className="exp__period">{exp.period}</span>
                  <span className="exp__location" style={{ color: exp.color }}>{exp.location}</span>
                </div>
              </div>

              <div className={`exp__chevron ${expandedIndex === index ? 'exp__chevron--open' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Expandable details */}
            <AnimatePresence initial={false}>
              {expandedIndex === index && (
                <motion.div
                  className="exp__details"
                  variants={cardVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="exit"
                >
                  <div className="exp__details-inner">
                    {/* Highlights */}
                    <ul className="exp__highlights">
                      {exp.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                        >
                          <span className="exp__highlight-marker" style={{ background: exp.color }} />
                          {h}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="exp__tech-row">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="exp__tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25 + i * 0.04 }}
                          style={{ borderColor: `${exp.color}33`, color: exp.color }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Gallery button */}
                    {exp.gallery && exp.gallery.length > 0 && (
                      <button
                        className="exp__gallery-btn cursor-target"
                        onClick={(e) => { e.stopPropagation(); setGalleryData(exp); }}
                        style={{ borderColor: `${exp.color}44` }}
                      >
                        📸 View Photos ({exp.gallery.length})
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Gallery overlay */}
      <AnimatePresence>
        {galleryData && (
          <motion.div
            className="exp__gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryData(null)}
          >
            <motion.div
              className="exp__gallery-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="exp__gallery-close" onClick={() => setGalleryData(null)}>✕</button>
              <div className="exp__gallery-grid">
                {galleryData.gallery.map((img, i) => (
                  <img key={i} src={img} alt={`${galleryData.organization} - ${i + 1}`} className="exp__gallery-img" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppWrap(MotionWrap(Experience, 'app__experience'), 'experience');
