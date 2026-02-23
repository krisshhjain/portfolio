import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import ScrollReveal from '../../components/ReactBits/ScrollReveal/ScrollReveal';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './About.css';

const personalInfo = {
  intro: "I'm a passionate Full Stack Developer and Cloud Enthusiast currently pursuing B.Tech in Computer Science at Bennett University. I love building scalable, performant web applications and exploring cutting-edge technologies.",
  image: 'https://res.cloudinary.com/dtku6vik9/image/upload/v1771860448/profile_gvukop.png',
};

const expertiseAreas = [
  { title: 'Full Stack Development', description: 'Building end-to-end web applications with React, Node.js, and modern frameworks', icon: '🚀', skills: ['React', 'Node.js', 'Next.js', 'Express'] },
  { title: 'Cloud & DevOps', description: 'Deploying and managing applications on cloud platforms with CI/CD', icon: '☁️', skills: ['AWS', 'Docker', 'Git', 'CI/CD'] },
  { title: 'Database Management', description: 'Designing efficient database schemas and working with SQL and NoSQL', icon: '🗄️', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'] },
  { title: 'Problem Solving', description: 'Strong foundation in Data Structures, Algorithms, and competitive programming', icon: '🧩', skills: ['C++', 'Python', 'DSA', 'Java'] },
];

const achievements = [
  { number: '10+', label: 'Projects Built' },
  { number: '500+', label: 'DSA Problems' },
  { number: '5+', label: 'Certifications' },
  { number: '1', label: 'Internship' },
];

const About = () => {
  return (
    <div className="app__about">
      <h2 className="head-text">
        <DecryptedText text="About Me" speed={50} maxIterations={10} animateOn="view" className="about-heading-char" />
      </h2>

      <div className="about__scroll-reveal">
        <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={2} blurStrength={3}>
          {personalInfo.intro}
        </ScrollReveal>
      </div>

      <motion.div
        className="about__achievements"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            className="about__stat glass-card cursor-target"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="about__stat-number">{item.number}</h3>
            <p className="about__stat-label">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="about__expertise">
        {expertiseAreas.map((area, index) => (
          <motion.div
            key={index}
            className="about__expertise-card glass-card cursor-target"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <span className="about__expertise-icon">{area.icon}</span>
            <h3 className="about__expertise-title">{area.title}</h3>
            <p className="about__expertise-desc">{area.description}</p>
            <div className="about__expertise-skills">
              {area.skills.map((skill, i) => (
                <span key={i} className="about__skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), 'about');
