import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from '../../Wrapper/MotionRap';
import './Certifications.scss';
import * as images from "../../assets";

// Import certification images
import infosysLogo from '../../assets/Certification images/infosys.jpeg';
import ibmLogo from '../../assets/Certification images/IBM.jpeg';
import ucsdLogo from '../../assets/Certification images/UCSD.png';
import universityColoradoLogo from '../../assets/Certification images/universitycolorado.jpeg';
import googleLogo from '../../assets/Certification images/google.jpeg';
import mongodbLogo from '../../assets/Certification images/mongodb.jpg';
import awsLogo from '../../assets/Certification images/aws.png';

// Import certificate images
import cppCert from '../../assets/Certifications jpg/Programmiing-Using-C++.jpg';
import webDevCert from '../../assets/Certifications jpg/Getting-Started-with-Front-End-and-Web-Development.jpg';
import dataStructuresCert from '../../assets/Certifications jpg/Data-Structures.jpg';
import networkCommCert from '../../assets/Certifications jpg/Fundamentals-of-Network-Communication.jpg';
import p2pProtocolsCert from '../../assets/Certifications jpg/P2p-Protocols-and-Local-Area-Networks.jpg';
import osCert from '../../assets/Certifications jpg/Operating-System-And-you.jpg';
import algorithmCert from '../../assets/Certifications jpg/Algorithmic-Toolbox.jpg';
import combProbCert from '../../assets/Certifications jpg/Combinatorics-and-Probability.jpg';
import mongodbCert from '../../assets/Certifications jpg/Mongodb.jpg';
import awsCert from '../../assets/Certifications jpg/AWS.jpg';

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
    imgUrl: infosysLogo,
    certificateImage: cppCert,
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
    imgUrl: ibmLogo,
    certificateImage: webDevCert,
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
    imgUrl: ucsdLogo,
    certificateImage: dataStructuresCert,
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
    imgUrl: universityColoradoLogo,
    certificateImage: networkCommCert,
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
    imgUrl: universityColoradoLogo,
    certificateImage: p2pProtocolsCert,
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
    imgUrl: googleLogo,
    certificateImage: osCert,
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
    imgUrl: ucsdLogo,
    certificateImage: algorithmCert,
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
    imgUrl: ucsdLogo,
    certificateImage: combProbCert,
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
    imgUrl: mongodbLogo,
    certificateImage: mongodbCert,
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
    imgUrl: awsLogo,
    certificateImage: awsCert,
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
    // If organization logo fails, show a generic fallback icon
    e.target.style.display = 'none';
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
