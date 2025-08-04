import React from 'react';
import { motion } from 'framer-motion';
import * as images from "../../assets";
import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from '../../Wrapper/MotionRap';
import './Schooling.scss';

const schoolingData = [
  {
    level: 'Bachelor of Technology',
    institution: 'Bennett University',
    period: 'August 2023 - September 2027',
    subjects: ['Computer Science', 'Data Structures', 'Algorithms', 'Software Engineering', 'Database Management', 'Computer Networks'],
    achievements: [
      'Currently pursuing BTech in Computer Science',
      'Strong focus on practical programming and software development',
      'Active participation in coding competitions and tech events',
      'Internship at Indian Army - Defense Technology'
    ],
    description: 'Pursuing Bachelor of Technology in Computer Science with emphasis on modern software development, cloud computing, and emerging technologies. Gaining hands-on experience through internships and real-world projects.',
    imgUrl: images.BU,
    highlights: ['Computer Science', 'Current Student', 'Tech Focus']
  },
  {
    level: 'Higher Secondary',
    institution: 'Rockwoods High School - India',
    period: 'April 2021 - March 2023',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    achievements: [
      'Strong foundation in Science and Mathematics',
      'Participated in Academic competitions',
      'Consistent academic performance'
    ],
    description: 'Focused on Science stream with Mathematics, building analytical and problem-solving skills that form the foundation of my engineering journey.',
    imgUrl: images.RHS,
    highlights: ['PCM Stream', 'Academic Excellence']
  },
  {
    level: 'Secondary Education',
    institution: 'Birla Public School, Pilani',
    period: 'April 2015 - March 2021',
    subjects: ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    achievements: [
      'Student Council Member',
      'Participated in multiple MUN as Chair and Vice Chair',
      'Most Promising Student award in 2020',
      'School Topper in various subjects'
    ],
    description: 'Comprehensive education with strong emphasis on leadership, communication skills, and academic excellence. Active participation in Model United Nations and student governance.',
    imgUrl: images.BPS,
    highlights: ['Leadership', 'MUN Expert', 'All-rounder']
  }
];

const Schooling = () => {
  return (
    <div className="app__schooling">
      <h2 className="head-text">
        My <span>Academic</span> Foundation
      </h2>
      
      <div className="app__schooling-portfolio">
        {schoolingData.map((school, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 80 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.3,
              type: "spring",
              stiffness: 80
            }}
            className="schooling-card"
          >
            <div className="school-header">
              <div className="school-image">
                <img src={school.imgUrl} alt={school.institution} />
                {school.grade && <div className="grade-badge">{school.grade}</div>}
              </div>
              <div className="school-info">
                <h3 className="bold-text">{school.level}</h3>
                <h4 className="school-name">{school.institution}</h4>
                <span className="school-period">{school.period}</span>
              </div>
            </div>

            {school.description && <p className="p-text school-desc">{school.description}</p>}

            {school.highlights && school.highlights.length > 0 && (
              <div className="highlights">
                {school.highlights.map((highlight, hIndex) => (
                  <span key={hIndex} className="highlight-tag">
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <div className="subjects-section">
              <h5>Key Subjects</h5>
              <div className="subjects">
                {school.subjects.map((subject, sIndex) => (
                  <motion.span 
                    key={sIndex} 
                    className="subject-tag"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: sIndex * 0.1 }}
                  >
                    {subject}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="achievements-section">
              <h5>Key Achievements</h5>
              <ul className="achievements-list">
                {school.achievements.map((achievement, aIndex) => (
                  <motion.li 
                    key={aIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: aIndex * 0.1 }}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Schooling, 'app__schooling-section'),
  'schooling',
  'app__whitebg'
);
