import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from '../../Wrapper/MotionRap';
import './Certifications.scss';
import * as images from "../../assets";

// Skill to logo mapping
const skillLogos = {
  'C++': images.cpp,
  'OOP': images.cpp,
  'Programming': images.cpp,
  'Data Structures': images.api,
  'HTML': images.html,
  'CSS': images.css,
  'JavaScript': images.javascript,
  'Web Development': images.reactPng,
  'Algorithms': images.api,
  'Problem Solving': images.api,
  'Analysis': images.api,
  'Networking': images.api,
  'Protocols': images.api,
  'Security': images.api,
  'Infrastructure': images.api,
  'P2P Protocols': images.api,
  'LAN': images.api,
  'Distributed Systems': images.api,
  'Operating Systems': images.api,
  'System Administration': images.api,
  'Linux': images.api,
  'Computational Thinking': images.api,
  'Mathematics': images.api,
  'Probability': images.api,
  'Combinatorics': images.api,
  'Statistics': images.api,
  'MongoDB': images.MongoDB,
  'NoSQL': images.MongoDB,
  'Database Design': images.MongoDB,
  'Data Modeling': images.MongoDB,
  'AWS': images.api,
  'Cloud Computing': images.api,
  'DevOps': images.api,
};

const certifications = [
  {
    id: 1,
    title: 'Programming using C++',
    organization: 'Infosys',
    platform: 'Coursera',
    date: '09/2024',
    description: 'Comprehensive course covering C++ programming fundamentals, object-oriented programming, and advanced concepts',
    imgUrl: '/src/assets/Certification images/infosys.jpeg',
    certificateImage: '/src/assets/Certifications jpg/Programmiing-Using-C++.jpg',
    skills: ['C++', 'OOP', 'Programming', 'Data Structures'],
    category: 'Programming'
  },
  {
    id: 2,
    title: 'IBM Web Development',
    organization: 'IBM',
    platform: 'Coursera',
    date: '10/2024',
    description: 'Full-stack web development course covering modern web technologies and frameworks',
    imgUrl: '/src/assets/Certification images/IBM.jpeg',
    certificateImage: '/src/assets/Certifications jpg/Getting-Started-with-Front-End-and-Web-Development.jpg',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    category: 'Web Development'
  },
  {
    id: 3,
    title: 'Data Structures',
    organization: 'University Of California San Diego',
    platform: 'Coursera',
    date: '11/2024',
    description: 'Advanced data structures and algorithms course focusing on efficient problem-solving techniques',
    imgUrl: '/src/assets/Certification images/UCSD.png',
    certificateImage: '/src/assets/Certifications jpg/Data-Structures.jpg',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving', 'Analysis'],
    category: 'Data & Algorithms'
  },
  {
    id: 4,
    title: 'Fundamentals of Computer Networks',
    organization: 'University of Colorado System',
    platform: 'Coursera',
    date: '01/2025',
    description: 'Network protocols, architecture, and security fundamentals',
    imgUrl: '/src/assets/Certification images/universitycolorado.jpeg',
    certificateImage: '/src/assets/Certifications jpg/Fundamentals-of-Network-Communication.jpg',
    skills: ['Networking', 'Protocols', 'Security', 'Infrastructure'],
    category: 'Networking'
  },
  {
    id: 5,
    title: 'Peer To Peer Protocols and Local Area Networks',
    organization: 'University of Colorado System',
    platform: 'Coursera',
    date: '04/2025',
    description: 'Advanced networking concepts focusing on P2P protocols and LAN technologies',
    imgUrl: '/src/assets/Certification images/universitycolorado.jpeg',
    certificateImage: '/src/assets/Certifications jpg/P2p-Protocols-and-Local-Area-Networks.jpg',
    skills: ['P2P Protocols', 'LAN', 'Networking', 'Distributed Systems'],
    category: 'Networking'
  },
  {
    id: 6,
    title: 'OS & You',
    organization: 'Google',
    platform: 'Coursera',
    date: '04/2025',
    description: 'Operating systems fundamentals and system administration concepts',
    imgUrl: '/src/assets/Certification images/google.jpeg',
    certificateImage: '/src/assets/Certifications jpg/Operating-System-And-you.jpg',
    skills: ['Operating Systems', 'System Administration', 'Linux', 'Security'],
    category: 'Systems'
  },
  {
    id: 7,
    title: 'Algorithmic Toolbox',
    organization: 'University Of California San Diego',
    platform: 'Coursera',
    date: '04/2025',
    description: 'Advanced algorithms and computational thinking for problem-solving',
    imgUrl: '/src/assets/Certification images/UCSD.png',
    certificateImage: '/src/assets/Certifications jpg/Algorithmic-Toolbox.jpg',
    skills: ['Algorithms', 'Problem Solving', 'Computational Thinking', 'Analysis'],
    category: 'Data & Algorithms'
  },
  {
    id: 9,
    title: 'Combinatorics and Probability',
    organization: 'University Of California San Diego',
    platform: 'Coursera',
    date: '07/2025',
    description: 'Mathematical foundations of combinatorics and probability theory',
    imgUrl: '/src/assets/Certification images/UCSD.png',
    certificateImage: '/src/assets/Certifications jpg/Combinatorics-and-Probability.jpg',
    skills: ['Mathematics', 'Probability', 'Combinatorics', 'Statistics'],
    category: 'Mathematics'
  },
  {
    id: 10,
    title: 'Introduction to MongoDB',
    organization: 'MongoDB',
    platform: 'Coursera',
    date: '07/2025',
    description: 'Database fundamentals and MongoDB development techniques',
    imgUrl: '/src/assets/Certification images/mongodb.jpg',
    certificateImage: '/src/assets/Certifications jpg/Mongodb.jpg',
    skills: ['MongoDB', 'NoSQL', 'Database Design', 'Data Modeling'],
    category: 'Database'
  },
  {
    id: 11,
    title: 'AWS Cloud Technical Essentials',
    organization: 'AWS',
    platform: 'Coursera',
    date: '08/2025',
    description: 'Cloud computing fundamentals and AWS services overview',
    imgUrl: '/src/assets/Certification images/aws.png',
    certificateImage: '/src/assets/Certifications jpg/AWS.jpg',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure', 'DevOps'],
    category: 'Cloud'
  }
];

const categories = ['All', 'Programming', 'Web Development', 'Data & Algorithms', 'Networking', 'Systems', 'Mathematics', 'Database', 'Cloud'];

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCertification, setSelectedCertification] = useState(null);

  const filteredCertifications = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  const handleImageError = (e) => {
    // If organization logo fails, show a fallback
    e.target.src = '/src/assets/Certification images/default-cert.png';
    e.target.onerror = null; // Prevent infinite loop
  };

  const CertificationCard = ({ certification }) => (
    <motion.div
      className="certification-card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedCertification(certification)}
    >
      <div className="certification-image">
        <img 
          src={certification.imgUrl} 
          alt={certification.organization}
          onError={handleImageError}
        />
      </div>
      <div className="certification-content">
        <h3>{certification.title}</h3>
        <p className="organization">{certification.organization}</p>
        <p className="platform">{certification.platform}</p>
        <p className="date">{certification.date}</p>
        <div className="skills">
          {certification.skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skillLogos[skill] && (
                <img 
                  src={skillLogos[skill]} 
                  alt={skill}
                  className="skill-icon"
                />
              )}
              <span className="skill-text">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const CertificationPreview = ({ certification }) => (
    <motion.div
      className="certification-preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="preview-header">
        <h2>{certification.title}</h2>
        <button 
          className="close-btn"
          onClick={() => setSelectedCertification(null)}
        >
          ×
        </button>
      </div>
      <div className="preview-content">
        <div className="preview-image">
          <img 
            src={certification.certificateImage} 
            alt={certification.title}
          />
        </div>
        <div className="preview-details">
          <div className="org-info">
            <img 
              src={certification.imgUrl} 
              alt={certification.organization}
              onError={handleImageError}
            />
            <div>
              <h3>{certification.organization}</h3>
              <p>{certification.platform}</p>
              <p>{certification.date}</p>
            </div>
          </div>
          <p className="description">{certification.description}</p>
          <div className="skills-section">
            <h4>Skills Covered:</h4>
            <div className="skills">
              {certification.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skillLogos[skill] && (
                    <img 
                      src={skillLogos[skill]} 
                      alt={skill}
                      className="skill-icon"
                    />
                  )}
                  <span className="skill-text">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="app__certifications">
      <h2 className="head-text">
        My <span>Certifications</span>
      </h2>

      <div className="app__certifications-filter">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`app__certifications-filter-item ${selectedCategory === category ? 'item-active' : ''}`}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="app__certifications-portfolio">
        {filteredCertifications.map((certification, index) => (
          <CertificationCard 
            key={certification.id} 
            certification={certification} 
          />
        ))}
      </div>

      {selectedCertification && (
        <div className="certification-preview-overlay">
          <CertificationPreview certification={selectedCertification} />
        </div>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(Certifications, 'app__certifications'),
  'certifications',
  'app__whitebg',
);
