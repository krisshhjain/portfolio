import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './Schooling.css';

const education = [
  {
    institution: 'Bennett University',
    degree: 'B.Tech Computer Science',
    period: '2023 - 2027',
    logo: '',
    description: 'Pursuing a B.Tech in Computer Science and Engineering with a focus on full-stack development and machine learning.',
    subjects: ['Data Structures & Algorithms', 'DBMS', 'OS', 'Computer Networks', 'Machine Learning'],
    grade: '9.0 CGPA',
    color: '#5227FF',
  },
  {
    institution: 'BPS Public School',
    degree: 'Senior Secondary (XII)',
    period: '2021 - 2023',
    logo: '',
    description: 'Completed senior secondary education with a strong academic record in science and mathematics.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'],
    grade: '90%',
    color: '#06D6A0',
  },
  {
    institution: 'Ryan Holiday School',
    degree: 'Secondary (X)',
    period: '2019 - 2021',
    logo: '',
    description: 'Strong foundation in academics with distinction in mathematics and sciences.',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
    grade: '92%',
    color: '#FF6B6B',
  },
];

const Schooling = () => {
  return (
    <div className="app__schooling">
      <h2 className="head-text">
        <DecryptedText text="Education" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <div className="schooling__timeline">
        <div className="schooling__line" />
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className="schooling__card glass-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true, margin: '-50px' }}
            style={{ '--edu-color': edu.color }}
          >
            <div className="schooling__dot" style={{ background: edu.color }} />
            <div className="schooling__card-header">
              <div className="schooling__logo">
                <img src={edu.logo} alt={edu.institution} />
              </div>
              <div className="schooling__meta">
                <h3>{edu.institution}</h3>
                <p className="schooling__degree">{edu.degree}</p>
                <span className="schooling__period">{edu.period}</span>
              </div>
              <span className="schooling__grade" style={{ color: edu.color }}>{edu.grade}</span>
            </div>
            <p className="schooling__desc">{edu.description}</p>
            <div className="schooling__subjects">
              {edu.subjects.map((s, i) => (
                <span key={i} className="schooling__subject-tag">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Schooling, 'app__schooling'), 'education');
