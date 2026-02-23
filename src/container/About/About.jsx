import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from '../../components/ReactBits/ScrollReveal/ScrollReveal';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './About.css';

const PROFILE_LG = 'https://res.cloudinary.com/dtku6vik9/image/upload/f_auto,q_auto,w_600,c_fill,g_face/profile_p6rqtm';

/* ── Count-up animation hook ── */
const CountUp = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target, 10);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = numericTarget / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Data ── */
const expertise = [
  {
    title: 'AI / ML',
    desc: 'Deep learning, NLP & computer vision — building intelligent systems.',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'],
    accent: '#5227FF',
  },
  {
    title: 'Full Stack',
    desc: 'End-to-end web apps with modern frameworks and clean architecture.',
    skills: ['React', 'Node.js', 'Next.js', 'Express'],
    accent: '#06D6A0',
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Deploying & orchestrating apps on cloud-native platforms.',
    skills: ['AWS', 'Docker', 'Git', 'CI/CD'],
    accent: '#22D3EE',
  },
  {
    title: 'Problem Solving',
    desc: 'Competitive programming & strong algorithmic fundamentals.',
    skills: ['C++', 'Python', 'DSA', 'Java'],
    accent: '#F472B6',
  },
];

const milestones = [
  { val: 10, suffix: '+', label: 'Projects' },
  { val: 500, suffix: '+', label: 'DSA Problems' },
  { val: 5, suffix: '+', label: 'Certifications' },
  { val: 1, suffix: '', label: 'Internship' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
};

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  /* Parallax values for cards */
  const cardY1 = useTransform(scrollYProgress, [0.3, 0.8], [40, -20]);
  const cardY2 = useTransform(scrollYProgress, [0.3, 0.8], [60, -10]);

  return (
    <div className="app__about" ref={sectionRef}>

      {/* ── Header row: label + heading with avatar ── */}
      <motion.div
        className="about__header"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.span className="about__label" variants={fadeUp}>// who i am</motion.span>
        <motion.div className="about__heading-row" variants={fadeUp}>
          <h2 className="about__heading">
            <span className="about__heading-serif">About</span>
            <span className="about__heading-gradient">Me</span>
          </h2>
        </motion.div>
      </motion.div>

      {/* ── Bio + Spotlight portrait row ── */}
      <div className="about__bio-row">
        <motion.div
          className="about__bio"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <ScrollReveal baseOpacity={0.08} enableBlur baseRotation={1} blurStrength={3}>
            AI/ML developer and full-stack engineer in the making at Bennett University, building intelligent systems that learn and beautiful interfaces that delight. I don't just write code, I craft solutions that push boundaries.
          </ScrollReveal>
        </motion.div>

        <motion.div
          className="about__spotlight-wrap"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
          variants={scaleIn}
        >
          <div className="about__spotlight">
            <div className="about__spotlight-beam" />
            <div className="about__spotlight-img-wrap">
              <img src={PROFILE_LG} alt="Krish Jain" className="about__spotlight-img" draggable={false} />
            </div>
            <div className="about__spotlight-glow" />
          </div>
        </motion.div>
      </div>

      {/* ── Milestones — count-up ── */}
      <motion.div
        className="about__milestones"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        {milestones.map((m, i) => (
          <motion.div key={i} className="about__milestone" variants={fadeUp}>
            <span className="about__milestone-val">
              <CountUp target={m.val} suffix={m.suffix} />
            </span>
            <span className="about__milestone-lbl">{m.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Expertise — parallax grid ── */}
      <motion.div
        className="about__expertise"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.span className="about__label" variants={fadeUp}>// what i do</motion.span>
        <div className="about__expertise-grid">
          {expertise.map((area, i) => (
            <motion.div
              key={i}
              className="about__card cursor-target"
              variants={fadeUp}
              style={{ y: i % 2 === 0 ? cardY1 : cardY2 }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <div className="about__card-accent" style={{ background: area.accent }} />
              <h3 className="about__card-title">{area.title}</h3>
              <p className="about__card-desc">{area.desc}</p>
              <div className="about__card-skills">
                {area.skills.map((s, j) => (
                  <span key={j} className="about__card-tag" style={{ borderColor: `${area.accent}40`, color: area.accent }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), 'about');
