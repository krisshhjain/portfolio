import React ,{ useState , useEffect } from 'react'
import './About.scss'
import{ motion } from 'framer-motion';
import * as images from "../../assets"; // relative path from Navbar.jsx
import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from '../../Wrapper/MotionRap';

const personalInfo = {
  name: "Krish Jain",
  title: "SDE Intern @ MCTE, Indian Army | MERN Stack Developer | DSA Practitioner | Cloud Enthusiast | Open Source Contributor",
  location: "Noida, Uttar Pradesh, India",
  tagline: "Curiosity drives me, code defines me.",
  summary: "I'm a Computer Science undergrad with a builder's mindset and a passion for leveraging tech to solve real-world problems. From crafting full-stack web apps using the MERN stack to experimenting with private cloud infrastructure, I enjoy taking ideas from zero to functional.",
  philosophy: "Actively solving DSA questions to sharpen my problem-solving abilities, I thrive on clean design patterns, intuitive UI/UX, and scalable backends, whether it's deploying cloud-native apps or debugging a stubborn API call at 2 AM.",
  lifestyle: "Outside the IDE, I believe in discipline. Whether it's a 6AM treadmill climb or a clean codebase. Currently exploring the intersection of cloud computing, scalable backend systems, and intelligent frontends.",
  contact: {
    mobile: "9205568858",
    email: "krishjain710@gmail.com",
    linkedin: "www.linkedin.com/in/krishjain710"
  }
};

const expertiseAreas = [
  {
    title: 'Cloud Computing & AWS',
    description: 'Learning to build cloud-native applications, AWS services, and scalable infrastructure.',
    imgUrl: images.about01,
    skills: ['AWS', 'Cloud Architecture', 'Infrastructure', 'DevOps']
  },
  {
    title: 'MERN Stack Development',
    description: 'Full-stack expertise in MongoDB, Express.js, React, and Node.js with focus on clean architecture and performance.',
    imgUrl: images.about02,
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js']
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Strong problem-solving foundation with active practice in competitive programming and algorithmic thinking.',
    imgUrl: images.about03,
    skills: ['DSA', 'Problem Solving', 'Algorithms', 'Optimization']
  },
  {
    title: 'System Design & Architecture',
    description: 'Building scalable systems with clean design patterns, focusing on maintainable and efficient solutions.',
    imgUrl: images.about04,
    skills: ['System Design', 'Architecture', 'Scalability', 'Clean Code']
  }
];

const achievements = [
  {
    icon: '🎖️',
    title: 'Military Technology',
    value: 'SDE Intern @ Indian Army',
    description: 'Contributing to defense technology solutions'
  },
  {
    icon: '☁️',
    title: 'Cloud Enthusiast',
    value: 'AWS Cloud Practitioner',
    description: 'Cloud Technical Essentials & Architecture'
  },
  {
    icon: '💻',
    title: 'Programming',
    value: 'C++ & MERN',
    description: 'Multi-language proficiency'
  },
  {
    icon: '📚',
    title: 'Education',
    value: 'Bennett University',
    description: 'Computer Science BTech (2023-2027)'
  }
];

const About = () => {
  return (
    <>
      <h2 className='head-text'>
        About <span>Krish Jain</span>
        <br />
        <span className="subtitle">Curiosity drives me, code defines me</span>
      </h2>

      {/* Personal Introduction */}
      <motion.div 
        className="about-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="intro-content">
          <div className="intro-text">
            <p className="intro-summary">{personalInfo.summary}</p>
            <p className="intro-philosophy">{personalInfo.philosophy}</p>
            <p className="intro-lifestyle">{personalInfo.lifestyle}</p>
          </div>
          <div className="intro-image">
            <motion.img 
              src={images.profile} 
              alt="Krish Jain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Achievement Stats */}
      <motion.div 
        className="achievement-stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="stat-card"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="stat-icon">{achievement.icon}</div>
            <h3 className="stat-title">{achievement.title}</h3>
            <p className="stat-value">{achievement.value}</p>
            <span className="stat-description">{achievement.description}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Expertise Areas */}
      <div className="expertise-section">
        <h3 className="section-title">Areas of Expertise</h3>
        <div className="app__profiles">
          {expertiseAreas.map((area, index) => (
            <motion.div
              whileInView={{opacity:1}}
              whileHover={{scale:1.05, y: -10}}
              transition={{duration: 0.5, type: 'tween'}}
              className='app__profile-item'
              key={area.title + index}
            >
              <div className="profile-image-container">
                <img src={area.imgUrl} alt={area.title}/>
                <div className="image-overlay"></div>
              </div>
              <h2 className='bold-text'>{area.title}</h2>
              <p className='p-text'>{area.description}</p>
              <div className="skill-tags">
                {area.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <motion.div 
        className="contact-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3>Let's Connect!</h3>
        <p>Building something exciting, cloud-native, or want to discuss clean architecture and systems thinking?</p>
        <div className="contact-links">
          <a href={`mailto:${personalInfo.contact.email}`} className="contact-link email">
            📧 {personalInfo.contact.email}
          </a>
          <a href={`https://${personalInfo.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-link linkedin">
            💼 LinkedIn
          </a>
        </div>
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
