import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as images from "../../assets";
import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from '../../Wrapper/MotionRap';
import './Experience.scss';

const experiences = [
  {
    id: 1,
    title: 'SDE (Software Developer Engineer) Intern',
    organization: 'Indian Army - Defense Technology',
    period: '2025 - Present',
    description: 'Collaborating with Military personnel to explore cloud and full-stack technologies for real-world operational needs.',
    detailedDescription: 'Working directly with military personnel to develop and implement cutting-edge technology solutions for operational requirements. Focused on cloud infrastructure, full-stack development, and creating robust systems that meet the demanding requirements of defense operations.',
    logo: images.armyLogo,
    images: [
      { url: images.army1, caption: 'Military Technology Integration' },
      { url: images.army2, caption: 'Defense Systems Development' }
    ],
    technologies: ['Cloud Computing', 'Full-Stack Development', 'Military Systems', 'React', 'Node.js', 'AWS', 'Security Systems'],
    type: 'Internship',
    status: 'Current',
    responsibilities: [
      'Develop cloud-based solutions for military operations',
      'Collaborate with defense personnel on technology requirements',
      'Implement secure full-stack applications',
      'Research emerging technologies for defense applications',
      'Maintain high security standards in all development work'
    ],
    achievements: [
      'Successfully deployed cloud infrastructure for operational use',
      'Improved system efficiency by 40% through optimization',
      'Earned commendation for innovative problem-solving approach'
    ]
  }
];

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      <h2 className="head-text">
        Professional <span>Experience</span>
      </h2>
      <p className="p-text experience-description">
        Real-world experience building technology solutions for critical applications
      </p>

      <div className="app__experience-container">
        {/* Left Side - Experience Details */}
        <motion.div 
          className="experience-details"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="details-header">
            <div className="experience-logo">
              <img src={selectedExperience.logo} alt={selectedExperience.organization} />
              <div className={`status-indicator ${selectedExperience.status.toLowerCase()}`}>
                {selectedExperience.status}
              </div>
            </div>
            
            <div className="experience-info">
              <h3>{selectedExperience.title}</h3>
              <h4 className="organization-name">{selectedExperience.organization}</h4>
              <div className="experience-meta">
                <span className="experience-period">{selectedExperience.period}</span>
                <span className="experience-type">{selectedExperience.type}</span>
              </div>
            </div>
          </div>

          <div className="experience-content">
            <div className="description-section">
              <h5>Overview</h5>
              <p>{selectedExperience.detailedDescription}</p>
            </div>

            <div className="responsibilities-section">
              <h5>Key Responsibilities</h5>
              <ul>
                {selectedExperience.responsibilities.map((responsibility, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {responsibility}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="achievements-section">
              <h5>Key Achievements</h5>
              <ul>
                {selectedExperience.achievements.map((achievement, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="technologies-section">
              <h5>Technologies & Skills</h5>
              <div className="tech-tags">
                {selectedExperience.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Visual Content */}
        <motion.div 
          className="experience-visual"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="visual-header">
            <h3>Project Gallery</h3>
            <div className="image-counter">
              {activeImageIndex + 1} / {selectedExperience.images.length}
            </div>
          </div>

          <div className="main-image-viewer">
            <motion.div 
              className="main-image"
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={selectedExperience.images[activeImageIndex].url} 
                alt={selectedExperience.images[activeImageIndex].caption}
              />
              <div className="image-caption">
                {selectedExperience.images[activeImageIndex].caption}
              </div>
            </motion.div>
          </div>

          <div className="image-thumbnails">
            {selectedExperience.images.map((image, index) => (
              <motion.div
                key={index}
                className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={image.url} alt={image.caption} />
              </motion.div>
            ))}
          </div>

          <div className="experience-stats">
            <div className="stat-item">
              <h4>Duration</h4>
              <p>{selectedExperience.period}</p>
            </div>
            <div className="stat-item">
              <h4>Type</h4>
              <p>{selectedExperience.type}</p>
            </div>
            <div className="stat-item">
              <h4>Technologies</h4>
              <p>{selectedExperience.technologies.length}+</p>
            </div>
            <div className="stat-item">
              <h4>Status</h4>
              <p className={selectedExperience.status.toLowerCase()}>{selectedExperience.status}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Experience, 'app__experience'),
  'experience',
  'app__primarybg'
);
