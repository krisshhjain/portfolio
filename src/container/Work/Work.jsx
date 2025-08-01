import React from 'react';
import { motion } from 'framer-motion';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import AppWrap from '../../Wrapper/AppWrap'; // Adjust if AppWrap is elsewhere
import './Work.scss'; // Make sure this file exists
import * as images from "../../assets"; // relative path from Navbar.jsx
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
    projectLink: "https://anubhav-eight.vercel.app/",
    codeLink: "https://github.com/Anubhav88s/potfolio",
    imgUrl: images.potfoliologo,
    tags: ["React.js"],
  },
  {
    title: "Netflix",
    description: "I have created a Netflix frontend clone that replicates the original platform’s interface. It features a responsive layout, movie thumbnails, category sections, and smooth navigation, providing a visually appealing and user-friendly browsing experience.",
    projectLink: "https://github.com/Anubhav88s/Netflix_frontend",
    codeLink: "https://github.com/Anubhav88s/Netflix_frontend",
    imgUrl: images.Netflix,
    tags: ["HTML/CSS"],
  },
  {
    title: "X.com",
    description: "I have created a Twitter frontend clone using Tailwind CSS that closely resembles the original platform’s interface. It includes a responsive layout, tweet sections, sidebars, and smooth navigation for a clean and modern user experience.",
    projectLink: "https://github.com/Anubhav88s/twitter_frontend",
    codeLink: "https://github.com/Anubhav88s/twitter_frontend",
    imgUrl: images.X_logo,
    tags: ["Tailwind"],
  },
  {
    title: "Sync-Fit",
    description: "Sync Fit is a personalized fitness and diet app that provides customized workout plans and diet charts based on user goals like bulking or weight loss, maintaining correct weight . It tracks progress and collaborates with food suppliers and local gyms for user best experience      .",
    projectLink: "https://github.com/Anubhav88s/Sync-Fit",
    codeLink: "https://github.com/Anubhav88s/Sync-Fit",
    imgUrl: images.SyncFit,
    tags: ["Next.Js"],
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

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap( MotionWrap(Work, 'app__works'),'work', 'app__primarybg');
