import React from 'react';
import StaggeredMenu from '../ReactBits/StaggeredMenu/StaggeredMenu';
import { krishjainLogo } from '../../assets';
import './Navbar.css';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
  { label: 'Moments', ariaLabel: 'Go to gallery section', link: '#gallery' },
  { label: 'Experience', ariaLabel: 'Go to experience section', link: '#experience' },
  { label: 'Work', ariaLabel: 'Go to work section', link: '#work' },
  { label: 'Skills', ariaLabel: 'Go to skills section', link: '#skills' },
  { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' },
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/krishjain710/' },
  { label: 'GitHub', link: 'https://github.com/krisshhjain' },
  { label: 'Instagram', link: 'https://www.instagram.com/krisshhjain' },
  { label: 'X', link: 'https://x.com/krisshhjain' },
];

const Navbar = () => {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen={true}
      colors={['#B19EEF', '#5227FF']}
      logoUrl={krishjainLogo}
      accentColor="#5227FF"
      isFixed={true}
    />
  );
};

export default Navbar;
