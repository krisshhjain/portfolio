import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import * as images from '../../assets';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import CardSwap, { Card } from '../../components/ReactBits/CardSwap/CardSwap';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './Work.css';

const projects = [
  {
    title: 'DataZen',
    description: 'A secure cloud storage and file management platform with encrypted file storage, real-time collaboration via WebSockets, admin dashboard with user management, temporary accounts, storage quotas, activity logging, voice/video capabilities, and automated maintenance—deployed on AWS with MongoDB.',
    stack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'Docker', 'Nginx', 'AWS'],
    image: images.projDatazen,
    github: 'https://github.com/krisshhjain',
    color: '#5227FF',
  },
  {
    title: 'FlowForge',
    description: 'An AI-powered web application that transforms natural language into structured, interactive visual diagrams—flowcharts, timelines, trees, or network graphs. Users simply type ideas and the system intelligently converts them into visual thinking tools.',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Gemini API'],
    image: images.projFlowforge,
    github: 'https://github.com/krisshhjain',
    color: '#06D6A0',
  },
  {
    title: 'Ayursutra',
    description: 'A full-stack Ayurvedic healthcare platform with patient and practitioner portals, appointment scheduling, therapy programs, progress tracking, reviews, chat, notifications, and an admin dashboard—with a Docker-ready backend and modern Vite React frontend.',
    stack: ['TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    image: images.projAyursutra,
    github: 'https://github.com/krisshhjain',
    color: '#FF6B6B',
  },
  {
    title: 'Judgement (Oh Hell)',
    description: 'A real-time multiplayer trick-taking card game with intelligent bot opponents, dynamic bidding, strategic AI with difficulty levels, polished animations, and immersive UI. Emphasizes precision, control, and calculated risk.',
    stack: ['React', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB'],
    image: images.projJudgement,
    github: 'https://github.com/krisshhjain',
    color: '#FFD93D',
  },
  {
    title: 'Pineapple Muzic',
    description: 'A modern, responsive music streaming app featuring artist profiles, album browsing, search, and a Spotify-style player—offering a sleek, dark-themed interface with fictionalized music data.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    image: images.projPineapple,
    github: 'https://github.com/krisshhjain',
    color: '#FF9F43',
  },
  {
    title: 'ShopSphere',
    description: 'A full-stack e-commerce platform with three portals: Super Admin for oversight, Seller Dashboard for product/order management, and a Customer Storefront with futuristic glassmorphic UI, cart, wishlist, checkout, and order tracking.',
    stack: ['Next.js', 'React', 'MongoDB', 'Mongoose', 'REST API'],
    image: images.projShopsphere,
    github: 'https://github.com/krisshhjain',
    color: '#54A0FF',
  },
  {
    title: 'Spam Mail Detection',
    description: 'Detects spam vs ham emails using a labeled CSV dataset. Preprocesses email text, converts it into numeric features via TF-IDF, trains a machine-learning classifier, and predicts whether new messages are spam.',
    stack: ['Python', 'Scikit-learn', 'TF-IDF', 'ML'],
    image: images.projEcosort,
    github: 'https://github.com/krisshhjain',
    color: '#A29BFE',
  },
  {
    title: 'Portfolio',
    description: 'This Vite-powered React portfolio showcases work, skills, experience, and certifications with smooth navigation, interactive UI bits (galleries, menus, text effects), background animations, a splash screen, and responsive design.',
    stack: ['React', 'Vite', 'Framer Motion', 'WebGL', 'GSAP', 'CSS3'],
    image: images.projPortfolio,
    github: 'https://github.com/krisshhjain',
    color: '#FD79A8',
  },
];

const textVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -15, filter: 'blur(6px)', transition: { duration: 0.25 } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};

const tagVariant = {
  initial: { opacity: 0, scale: 0.7 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.7 }
};

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex] || projects[0];

  return (
    <div className="app__work">
      <h2 className="head-text">
        <DecryptedText text="My Projects" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <div className="work__layout">
        {/* Left: animated project details */}
        <div className="work__details">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="work__details-inner"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div className="work__details-counter" variants={textVariants}>
                <span className="work__counter-current" style={{ color: project.color }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="work__counter-sep">/</span>
                <span className="work__counter-total">{String(projects.length).padStart(2, '0')}</span>
              </motion.div>

              <motion.h3 className="work__details-title" variants={textVariants} style={{ color: project.color }}>
                {project.title}
              </motion.h3>

              <motion.p className="work__details-desc" variants={textVariants}>
                {project.description}
              </motion.p>

              <motion.div className="work__details-stack" variants={staggerContainer}>
                {project.stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="work__details-tag"
                    variants={tagVariant}
                    style={{ borderColor: `${project.color}44`, color: project.color }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="work__details-github cursor-target"
                variants={textVariants}
                style={{ '--btn-color': project.color }}
              >
                <AiFillGithub />
                <span>View Code</span>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: CardSwap image stack */}
        <div className="work__cards-area">
          <CardSwap
            cardDistance={40}
            verticalDistance={45}
            delay={6000}
            pauseOnHover={false}
            width={340}
            height={240}
            skewAmount={4}
            easing="elastic"
            onActiveChange={(idx) => setActiveIndex(idx)}
          >
            {projects.map((proj, i) => (
              <Card key={i} className="work__image-card">
                <img src={proj.image} alt={proj.title} draggable={false} />
              </Card>
            ))}
          </CardSwap>
          <p className="work__click-hint">Click card to browse</p>
        </div>
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Work, 'app__work'), 'work');