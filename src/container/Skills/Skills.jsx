import React, { useState, useEffect } from 'react';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import LogoLoop from '../../components/ReactBits/LogoLoop/LogoLoop';
import './Skills.css';

const C = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_200,c_limit';

/* Split skills into two rows for visual variety */
const row1 = [
  { src: `${C}/react_converted_mc6gwo`, alt: 'React', title: 'React' },
  { src: `${C}/node_converted_proaio`, alt: 'Node.js', title: 'Node.js' },
  { src: `${C}/python_converted_zk74ru`, alt: 'Python', title: 'Python' },
  { src: `${C}/javascript_converted_krnnll`, alt: 'JavaScript', title: 'JavaScript' },
  { src: `${C}/typescript_converted_a0429i`, alt: 'TypeScript', title: 'TypeScript' },
  { src: `${C}/git_converted_t4wjlw`, alt: 'Git', title: 'Git' },
  { src: `${C}/MongoDB_converted_nrpqdn`, alt: 'MongoDB', title: 'MongoDB' },
  { src: `${C}/html_converted_cwltkp`, alt: 'HTML5', title: 'HTML5' },
  { src: `${C}/css_converted_xxasoc`, alt: 'CSS3', title: 'CSS3' },
  { src: `${C}/cpp_converted_rtdgov`, alt: 'C++', title: 'C++' },
  { src: `${C}/Java_converted_sspyxn`, alt: 'Java', title: 'Java' },
];

const row2 = [
  { src: `${C}/aws_converted_pfsyoa`, alt: 'AWS', title: 'AWS' },
  { src: `${C}/figma_converted_sd8vlt`, alt: 'Figma', title: 'Figma' },
  { src: `${C}/Next.js_converted_gveqrh`, alt: 'Next.js', title: 'Next.js' },
  { src: `${C}/Express_converted_tauak4`, alt: 'Express', title: 'Express' },
  { src: `${C}/redux_converted_u5vghw`, alt: 'Redux', title: 'Redux' },
  { src: `${C}/TailwindCSS_converted_osmwvm`, alt: 'Tailwind', title: 'Tailwind' },
  { src: `${C}/PostgresSQL_converted_jtmley`, alt: 'PostgreSQL', title: 'PostgreSQL' },
  { src: `${C}/MySQL_converted_n113x2`, alt: 'MySQL', title: 'MySQL' },
  { src: `${C}/graphql_converted_d3x1wv`, alt: 'GraphQL', title: 'GraphQL' },
  { src: `${C}/Postman_converted_d77ile`, alt: 'Postman', title: 'Postman' },
  { src: `${C}/Socket.io_converted_cdgf0m`, alt: 'Socket.io', title: 'Socket.io' },
];

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const logoH = isMobile ? 32 : 50;
  const logoGap = isMobile ? 28 : 56;

  const renderSkill = (item) => (
    <div className="skills__item">
      <img src={item.src} alt={item.alt} draggable={false} />
      <span className="skills__item-name">{item.alt}</span>
    </div>
  );
  return (
    <section id="skills" className="app__skills app__skills--free">
      <h2 className="head-text">
        <DecryptedText text="Tech Stack" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <p className="skills__subtitle">Hover to pause & see skill names</p>

      <div className="skills__loops">
        <div className="skills__loop-row">
          <LogoLoop
            logos={row1}
            speed={80}
            direction="left"
            logoHeight={logoH}
            gap={logoGap}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#050510"
            renderItem={renderSkill}
            ariaLabel="Tech skills row 1"
          />
        </div>
        <div className="skills__loop-row">
          <LogoLoop
            logos={row2}
            speed={60}
            direction="right"
            logoHeight={logoH}
            gap={logoGap}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#050510"
            renderItem={renderSkill}
            ariaLabel="Tech skills row 2"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
