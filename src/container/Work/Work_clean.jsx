import React from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import AppWrap from '../../Wrapper/AppWrap';
import './Work.scss';
import * as images from "../../assets";
import MotionWrap from '../../Wrapper/MotionRap';

// Local works data
const worksData = [
  {
    title: "EcoSort",
    description: "EcoSort is a smart waste management system that uses AI and IoT technologies to optimize waste collection and recycling processes. It provides real-time data analytics and insights to improve sustainability efforts.",
    projectLink: "https://github.com/krisshhjain/EcoSort",
    codeLink: "https://github.com/krisshhjain/EcoSort",
    imgUrl: images.ecosort,
    tags: ["React.js"],
  },
  {
    title: "Portfolio",
    description: "My portfolio website showcases my skills, projects, and achievements in web development. It includes detailed project descriptions, code repositories, and a contact section, providing a professional overview of my work, experience, and technical expertise in full-stack development.",
    projectLink: "https://krishjain.app/",
    codeLink: "https://github.com/krisshhjain/portfolio/",
    imgUrl: images.potfoliologo,
    tags: ["React.js"],
  },
  {
    title: "Pineapple Muzic",
    description: "PineApple Muzic is a modern, responsive music streaming app built with React, TypeScript, and Tailwind CSS. It features artist profiles, album browsing, search, and a Spotify-style player, offering a sleek, dark-themed interface and fictionalized music data.",
    projectLink: "https://pine-apple-music.vercel.app/",
    codeLink: "https://github.com/krisshhjain/PineAPPLE-Music/",
    imgUrl: images.Pineapple_muzic,
    tags: ["React.js", "TypeScript"],
  },
  {
    title: "DataZen",
    description: "I have created DataZen, a modern cloud storage and file management platform. It enables secure uploads, efficient organization, and seamless access to your files, leveraging Next.js for a fast, responsive, and user-friendly experience.",
    projectLink: "https://github.com/krisshhjain/DataZen",
    codeLink: "https://github.com/krisshhjain/DataZen",
    imgUrl: images.Datazen,
    tags: ["Under Development"],
  },
];

const Work = () => {
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {worksData.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={work.imgUrl} alt={work.title} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex" style={{
                backgroundColor: work.tags[0] === 'Under Development' ? '#ff4444' : '#f2f2f2',
                color: work.tags[0] === 'Under Development' ? 'white' : 'black'
              }}>
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work, 'app__works'), 'work', 'app__primarybg');
