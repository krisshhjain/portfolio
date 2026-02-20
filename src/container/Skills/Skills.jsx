import React from 'react';
import * as images from '../../assets';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import InfiniteMenu from '../../components/ReactBits/InfiniteMenu/InfiniteMenu';
import './Skills.css';

const skillItems = [
  { image: images.reactPng, title: 'React', description: 'Frontend Library' },
  { image: images.node, title: 'Node.js', description: 'Runtime' },
  { image: images.python, title: 'Python', description: 'Programming' },
  { image: images.javascript, title: 'JavaScript', description: 'Language' },
  { image: images.typescript, title: 'TypeScript', description: 'Language' },
  { image: images.git, title: 'Git', description: 'Version Control' },
  { image: images.MongoDB, title: 'MongoDB', description: 'Database' },
  { image: images.html, title: 'HTML5', description: 'Markup' },
  { image: images.css, title: 'CSS3', description: 'Styling' },
  { image: images.cpp, title: 'C++', description: 'Language' },
  { image: images.Java, title: 'Java', description: 'Language' },
  { image: images.awsLogo, title: 'AWS', description: 'Cloud' },
  { image: images.googleCloudLogo, title: 'GCP', description: 'Cloud' },
  { image: images.figma, title: 'Figma', description: 'Design' },
];

const Skills = () => {
  return (
    <section id="skills" className="app__skills app__skills--free">
      <h2 className="head-text">
        <DecryptedText text="Tech Stack" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <p className="skills__subtitle">Drag to explore the globe</p>

      <div className="skills__globe-wrapper">
        <InfiniteMenu items={skillItems} scale={1} />
      </div>
    </section>
  );
};

export default Skills;

