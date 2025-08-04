import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from '../../Wrapper/AppWrap';
import './Skills.scss';
import MotionWrap1 from "../../Wrapper/MotionRap1"

// import all images as a namespace object
import * as images from '../../assets';

const skillsData = [
  { name: 'C++', icon: images.cpp, bgColor: '#0066CC', category: 'Programming' },
  { name: 'JavaScript', icon: images.javascript, bgColor: '#F7DF1E', category: 'Programming' },
  { name: 'Java', icon: images.Java, bgColor: '#ED8B00', category: 'Programming' },
  { name: 'Python', icon: images.python, bgColor: '#3776AB', category: 'Programming' },
  { name: 'TypeScript', icon: images.typescript, bgColor: '#3178C6', category: 'Programming' },
  { name: 'React', icon: images.reactPng, bgColor: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: images.Nextjs, bgColor: '#000000', category: 'Frontend' },
  { name: 'HTML', icon: images.html, bgColor: '#E34F26', category: 'Frontend' },
  { name: 'CSS', icon: images.css, bgColor: '#1572B6', category: 'Frontend' },
  { name: 'Sass', icon: images.sass, bgColor: '#CC6699', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: images.TailwindCSS, bgColor: '#06B6D4', category: 'Frontend' },
  { name: 'Node.js', icon: images.node, bgColor: '#339933', category: 'Backend' },
  { name: 'Express', icon: images.Express, bgColor: '#000000', category: 'Backend' },
  { name: 'MongoDB', icon: images.MongoDB, bgColor: '#47A248', category: 'Database' },
  { name: 'PostgreSQL', icon: images.PostgresSQL, bgColor: '#336791', category: 'Database' },
  { name: 'MySQL', icon: images.MySQL, bgColor: '#4479A1', category: 'Database' },
  { name: 'Redux', icon: images.redux, bgColor: '#764ABC', category: 'Tools' },
  { name: 'Git', icon: images.git, bgColor: '#F05032', category: 'Tools' },
  { name: 'Figma', icon: images.figma, bgColor: '#F24E1E', category: 'Tools' },
  { name: 'Postman', icon: images.Postman, bgColor: '#FF6C37', category: 'Tools' },
  { name: 'Socket.io', icon: images.Socketio, bgColor: '#010101', category: 'Tools' },
  { name: 'API', icon: images.api, bgColor: '#009688', category: 'Tools' },
];


const Skills = () => {
  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'Database', 'Tools'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredSkills = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <>
      <h2 className="head-text">
        My <span>Technical Skills</span>
      </h2>

      <div className="app__skills-filter">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`app__skills-filter-item ${selectedCategory === category ? 'item-active' : ''}`}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {filteredSkills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="skill-icon-container app__flex"
                style={{ 
                  background: `linear-gradient(135deg, ${skill.bgColor}, ${skill.bgColor}dd)`,
                  boxShadow: `0 10px 30px ${skill.bgColor}33`
                }}
              >
                <img src={skill.icon} alt={skill.name} />
                <div className="skill-glow" style={{ background: skill.bgColor }}></div>
              </div>
              <p className="skill-name">{skill.name}</p>
              <div className="skill-category">{skill.category}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap1(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);

