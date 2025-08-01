import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from '../../Wrapper/AppWrap';
import './Skills.scss';
import MotionWrap1 from "../../Wrapper/MotionRap1"

// import all images as a namespace object
import * as images from '../../assets';

const skillsData = [
  { name: 'API', icon: images.api, bgColor: '#ffffff' },
  { name: 'CSS', icon: images.css, bgColor: '#ffffff' },
  { name: 'Figma', icon: images.figma, bgColor: '#ffffff' },
  { name: 'Git', icon: images.git, bgColor: '#ffffff' },
  { name: 'HTML', icon: images.html, bgColor: '#ffffff' },
  { name: 'JavaScript', icon: images.javascript, bgColor: '#ffffff' },
  { name: 'Node.js', icon: images.node, bgColor: '#ffffff' },
  { name: 'React', icon: images.reactPng, bgColor: '#ffffff' },
  { name: 'Redux', icon: images.redux, bgColor: '#ffffff' },
  { name: 'Sass', icon: images.sass, bgColor: '#ffffff' },
  { name: 'TypeScript', icon: images.typescript, bgColor: '#ffffff' },
  { name: 'Next.js', icon: images.Nextjs, bgColor: '#ffffff' },
  { name: 'MongoDB', icon: images.MongoDB, bgColor: '#ffffff' },
  { name: 'Express', icon: images.Express, bgColor: '#ffffff' },
  { name: 'Java', icon: images.Java, bgColor: '#ffffff' },
  { name: 'PostgreSQL', icon: images.PostgresSQL, bgColor: '#ffffff' },
  { name: 'MySQL', icon: images.MySQL, bgColor: '#ffffff' },
  { name: 'Tailwind CSS', icon: images.TailwindCSS, bgColor: '#ffffff' },
  { name: 'Postman', icon: images.Postman, bgColor: '#ffffff' },
  { name: 'Socket.io', icon: images.Socketio, bgColor: '#ffffff' },
];


const Skills = () => {
  return (
    <>
      <h2 className="head-text">My Skills</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skillsData.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.9 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={skill.icon} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
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

