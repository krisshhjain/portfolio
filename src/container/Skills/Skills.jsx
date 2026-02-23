import React from 'react';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import InfiniteMenu from '../../components/ReactBits/InfiniteMenu/InfiniteMenu';
import './Skills.css';

const C = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_200,c_limit';

const skillItems = [
  { image: `${C}/react_converted_mc6gwo`, title: 'React', description: 'Frontend Library' },
  { image: `${C}/node_converted_proaio`, title: 'Node.js', description: 'Runtime' },
  { image: `${C}/python_converted_zk74ru`, title: 'Python', description: 'Programming' },
  { image: `${C}/javascript_converted_krnnll`, title: 'JavaScript', description: 'Language' },
  { image: `${C}/typescript_converted_a0429i`, title: 'TypeScript', description: 'Language' },
  { image: `${C}/git_converted_t4wjlw`, title: 'Git', description: 'Version Control' },
  { image: `${C}/MongoDB_converted_nrpqdn`, title: 'MongoDB', description: 'Database' },
  { image: `${C}/html_converted_cwltkp`, title: 'HTML5', description: 'Markup' },
  { image: `${C}/css_converted_xxasoc`, title: 'CSS3', description: 'Styling' },
  { image: `${C}/cpp_converted_rtdgov`, title: 'C++', description: 'Language' },
  { image: `${C}/Java_converted_sspyxn`, title: 'Java', description: 'Language' },
  { image: `${C}/aws_converted_pfsyoa`, title: 'AWS', description: 'Cloud' },
  { image: `${C}/figma_converted_sd8vlt`, title: 'Figma', description: 'Design' },
  { image: `${C}/Next.js_converted_gveqrh`, title: 'Next.js', description: 'Framework' },
  { image: `${C}/Express_converted_tauak4`, title: 'Express', description: 'Backend' },
  { image: `${C}/redux_converted_u5vghw`, title: 'Redux', description: 'State Mgmt' },
  { image: `${C}/TailwindCSS_converted_osmwvm`, title: 'Tailwind', description: 'CSS Framework' },
  { image: `${C}/PostgresSQL_converted_jtmley`, title: 'PostgreSQL', description: 'Database' },
  { image: `${C}/MySQL_converted_n113x2`, title: 'MySQL', description: 'Database' },
  { image: `${C}/graphql_converted_d3x1wv`, title: 'GraphQL', description: 'API' },
  { image: `${C}/Postman_converted_d77ile`, title: 'Postman', description: 'API Testing' },
  { image: `${C}/Socket.io_converted_cdgf0m`, title: 'Socket.io', description: 'Real-time' },
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

