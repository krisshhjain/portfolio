import React from 'react'
import './Header.scss'
import {motion} from 'framer-motion'
import * as images from "../../assets"; // relative path from Navbar.jsx
import AppWrap from '../../Wrapper/AppWrap';

const scaleVarients = {
  whileInView:{
    scale : [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Header = () => {
  return (
    <div className='app__header app__flex'>
      {/* Enhanced Floating Elements */}
      <div className="header-floating-elements">
        <div className="floating-code">{"{ }"}</div>
        <div className="floating-code">{"< />"}</div>
        <div className="floating-code">{"💻"}</div>
        <div className="floating-code">{"⚡"}</div>
        <div className="floating-code">{"🚀"}</div>
      </div>

      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className='app__header-info'
      >
        <div className='app__header-badge'>
          <motion.div 
            className="badge-cmp app__flex"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="wave-emoji">👋</span>
            <div style={{marginLeft:20}}>
              <p className='p-text'>Hello, I am</p>
              <h1 className="head-text">Krish Jain</h1>
            </div>
          </motion.div>

          <motion.div 
            className="role-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="role-title">SDE Intern @ Indian Army</h2>
            <p className="role-subtitle">Building defense technology solutions with cutting-edge cloud and full-stack technologies</p>
          </motion.div>

          <div className="tag-cmp app__flex">
            <motion.p 
              className='p-text tech-tag'
              whileHover={{ scale: 1.1, color: "#2563eb" }}
            >
              Cloud Computing
            </motion.p>
            <motion.p 
              className='p-text tech-tag'
              whileHover={{ scale: 1.1, color: "#f59e0b" }}
            >
              MERN Stack
            </motion.p>
            <motion.p 
              className='p-text tech-tag'
              whileHover={{ scale: 1.1, color: "#10b981" }}
            >
              DSA Expert
            </motion.p>
          </div>

          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.a 
              href="mailto:krishjain710@gmail.com"
              className="cta-button primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
            <motion.a 
              href="#work"
              className="cta-button secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </motion.div>

          <motion.div 
            className="quick-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Months @ Army</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Learning</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 1, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <motion.img 
          src={images.profile} 
          alt="Krish Jain - SDE Intern"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          whileInView={{ scale: [0, 1], rotate: [0, 360] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
          src={images.circle}
          alt="profile_circle"
          className='overlay_circle'
        />
      </motion.div>

      <motion.div
        variants={scaleVarients}
        whileInView={scaleVarients.whileInView}
        className='app__header-circles'
      >
        {[
          { img: images.Nextjs, label: "Next.js" },
          { img: images.cpp, label: "C++" },
          { img: images.node, label: "Node.js" }
        ].map((tech, index) => (
          <motion.div 
            className="circle-cmp app__flex" 
            key={`circle-${index}`}
            whileHover={{ 
              scale: 1.2, 
              rotate: 10,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <img src={tech.img} alt={tech.label} />
            <span className="tech-label">{tech.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AppWrap(Header,'home')
