import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div>
        <a href="https://www.linkedin.com/in/krishjain710/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
      <div>
        <a href="https://github.com/krisshhjain" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
      <div>
        <a href="https://www.instagram.com/krisshhjain?igsh=bWhkbjNzajZ5eWU3&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <div>
        <a href="https://x.com/krisshhjain?s=21" target="_blank" rel="noopener noreferrer">
          <FaXTwitter />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
