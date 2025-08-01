import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as images from "../../assets";
import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from '../../Wrapper/MotionRap';
import './Certifications.scss';

const certifications = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    organization: 'freeCodeCamp',
    date: '2024',
    description: 'Comprehensive certification covering React, Node.js, Express, and MongoDB',
    imgUrl: images.reactPng,
    credentialUrl: '#',
    pdfUrl: '/certificates/fullstack-cert.pdf', // You'll add these PDFs
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    status: 'Completed'
  },
  {
    id: 2,
    title: 'JavaScript Algorithms and Data Structures',
    organization: 'freeCodeCamp',
    date: '2023',
    description: 'Advanced JavaScript programming and algorithmic thinking',
    imgUrl: images.javascript,
    credentialUrl: '#',
    pdfUrl: '/certificates/javascript-cert.pdf',
    skills: ['JavaScript', 'Algorithms', 'Data Structures'],
    status: 'Completed'
  },
  {
    id: 3,
    title: 'AWS Cloud Practitioner',
    organization: 'Amazon Web Services',
    date: '2024',
    description: 'Foundational understanding of AWS Cloud concepts and services',
    imgUrl: images.amazon,
    credentialUrl: '#',
    pdfUrl: '/certificates/aws-cert.pdf',
    skills: ['AWS', 'Cloud Computing', 'DevOps'],
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Python Programming',
    organization: 'Coursera',
    date: '2023',
    description: 'Object-oriented programming and data analysis with Python',
    imgUrl: images.python,
    credentialUrl: '#',
    pdfUrl: '/certificates/python-cert.pdf',
    skills: ['Python', 'OOP', 'Data Analysis'],
    status: 'Completed'
  },
  {
    id: 5,
    title: 'React Native Development',
    organization: 'Meta',
    date: '2024',
    description: 'Mobile app development with React Native framework',
    imgUrl: images.reactPng,
    credentialUrl: '#',
    pdfUrl: '/certificates/react-native-cert.pdf',
    skills: ['React Native', 'Mobile Development', 'JavaScript'],
    status: 'In Progress'
  },
  {
    id: 6,
    title: 'Machine Learning Specialization',
    organization: 'Stanford University',
    date: '2024',
    description: 'Comprehensive ML course covering algorithms and applications',
    imgUrl: images.python,
    credentialUrl: '#',
    pdfUrl: '/certificates/ml-cert.pdf',
    skills: ['Machine Learning', 'Python', 'TensorFlow'],
    status: 'In Progress'
  }
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(certifications[0]);

  return (
    <>
      <h2 className="head-text">
        My <span>Certifications</span> & Achievements
      </h2>
      <p className="p-text cert-description">
        Continuous learning and professional development through industry-recognized certifications
      </p>

      <div className="app__certifications-container">
        {/* Left Side - Certifications List */}
        <motion.div 
          className="certifications-list"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >


          <div className="certificates-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className={`cert-item ${selectedCert.id === cert.id ? 'active' : ''}`}
                onClick={() => setSelectedCert(cert)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="cert-item-header">
                  <div className="cert-icon">
                    <img src={cert.imgUrl} alt={cert.organization} />
                  </div>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <p className="cert-org">{cert.organization}</p>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <div className={`status-badge ${cert.status.toLowerCase().replace(' ', '-')}`}>
                    {cert.status}
                  </div>
                </div>
                
                <div className="cert-skills">
                  {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag-mini">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="skill-tag-mini more">+{cert.skills.length - 3}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Certificate Preview */}
        <motion.div 
          className="certificate-preview"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="preview-header">
            <h3>{selectedCert.title}</h3>
            <div className="preview-actions">
              <motion.button 
                className="action-btn view-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full
              </motion.button>
              <motion.button 
                className="action-btn download-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download
              </motion.button>
            </div>
          </div>

          <div className="pdf-viewer">
            {/* Placeholder for PDF viewer - you can integrate react-pdf or similar */}
            <div className="pdf-placeholder">
              <div className="pdf-icon">📄</div>
              <h4>Certificate Preview</h4>
              <p>{selectedCert.title}</p>
              <p className="pdf-org">{selectedCert.organization}</p>
              <div className="pdf-details">
                <div className="detail-item">
                  <strong>Date Earned:</strong> {selectedCert.date}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <span className={`status ${selectedCert.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedCert.status}
                  </span>
                </div>
                <div className="detail-item">
                  <strong>Description:</strong>
                  <p>{selectedCert.description}</p>
                </div>
              </div>
              
              <div className="skills-section">
                <strong>Skills Covered:</strong>
                <div className="skills-list">
                  {selectedCert.skills.map((skill, index) => (
                    <span key={index} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="preview-footer">
            <motion.a 
              href={selectedCert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="verify-link"
              whileHover={{ scale: 1.02 }}
            >
              🔗 Verify Credential
            </motion.a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Certifications, 'app__certifications'),
  'certifications',
  'app__whitebg'
);
