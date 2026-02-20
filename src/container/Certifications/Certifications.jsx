import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as images from '../../assets';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import CircularGallery from '../../components/ReactBits/CircularGallery/CircularGallery';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './Certifications.css';

const certifications = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    logo: images.awsLogo,
    credential: images.awsCertification,
    color: '#FF9900',
  },
  {
    title: 'Algorithmic Toolbox',
    issuer: 'UC San Diego (Coursera)',
    date: '2024',
    logo: images.ucsdLogo,
    credential: images.algoToolboxCert,
    color: '#0056D2',
  },
  {
    title: 'Combinatorics & Probability',
    issuer: 'UC San Diego (Coursera)',
    date: '2024',
    logo: images.ucsdLogo,
    credential: images.combinatoricsCert,
    color: '#0056D2',
  },
  {
    title: 'Data Structures',
    issuer: 'UC San Diego (Coursera)',
    date: '2024',
    logo: images.ucsdLogo,
    credential: images.dataStructuresCert,
    color: '#0056D2',
  },
  {
    title: 'Network Communication Fundamentals',
    issuer: 'University of Colorado (Coursera)',
    date: '2024',
    logo: images.uColoradoLogo,
    credential: images.networkCommCert,
    color: '#CFB87C',
  },
  {
    title: 'Front-End & Web Development',
    issuer: 'IBM (Coursera)',
    date: '2024',
    logo: images.ibmLogo,
    credential: images.frontEndCert,
    color: '#006699',
  },
  {
    title: 'MongoDB for Developers',
    issuer: 'MongoDB University',
    date: '2024',
    logo: images.mongodbLogo,
    credential: images.mongodbCert,
    color: '#00ED64',
  },
  {
    title: 'Operating Systems',
    issuer: 'Google (Coursera)',
    date: '2024',
    logo: images.googleCloudLogo,
    credential: images.osCert,
    color: '#4285F4',
  },
  {
    title: 'P2P Protocols & LANs',
    issuer: 'University of Colorado (Coursera)',
    date: '2024',
    logo: images.uColoradoLogo,
    credential: images.p2pCert,
    color: '#CFB87C',
  },
  {
    title: 'Programming Using C++',
    issuer: 'Infosys Springboard',
    date: '2024',
    logo: images.infosysLogo,
    credential: images.cppCert,
    color: '#007CC3',
  },
];

// Build items for CircularGallery — use LOGO images for gallery display
const galleryItems = certifications.map(cert => ({
  image: cert.logo,
  text: cert.title,
}));

const Certifications = () => {
  const [selected, setSelected] = useState(null);

  const handleItemClick = useCallback((index) => {
    setSelected(certifications[index]);
  }, []);

  return (
    <div className="app__certifications">
      <h2 className="head-text">
        <DecryptedText text="Certifications" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <p className="certifications__hint">
        Scroll or drag to explore • Click to view
      </p>

      <div className="certifications__gallery-wrapper">
        <CircularGallery
          items={galleryItems}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          onItemClick={handleItemClick}
        />
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="cert-modal__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            {/* Decorative expanding rings */}
            <motion.div
              className="cert-modal__ring cert-modal__ring--1"
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.div
              className="cert-modal__ring cert-modal__ring--2"
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            />

            <motion.div
              className="cert-modal__card"
              initial={{ scale: 0.3, opacity: 0, rotateX: 40, y: 100 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: -20, y: 60 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 250,
                mass: 0.8,
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <motion.div
                className="cert-modal__accent"
                style={{ background: selected.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              <button className="cert-modal__close" onClick={() => setSelected(null)}>
                <span>✕</span>
              </button>

              <motion.div
                className="cert-modal__header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <div className="cert-modal__logo" style={{ borderColor: selected.color + '40' }}>
                  <img src={selected.logo} alt={selected.issuer} />
                </div>
                <div>
                  <h3 className="cert-modal__title">{selected.title}</h3>
                  <p className="cert-modal__issuer">{selected.issuer} • {selected.date}</p>
                </div>
              </motion.div>

              <motion.div
                className="cert-modal__img-wrapper"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={selected.credential}
                  alt={selected.title}
                  className="cert-modal__img"
                />
                {/* Shimmer effect on image */}
                <motion.div
                  className="cert-modal__shimmer"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppWrap(MotionWrap(Certifications, 'app__certifications'), 'certifications');
