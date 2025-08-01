import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <a href="https://www.linkedin.com/in/krishjain710/" target="_blank" rel="noopener noreferrer">
      <div>
          <FaLinkedin />
      </div>
      </a>
      <a href="https://github.com/krisshhjain" target="_blank" rel="noopener noreferrer">
      <div>
          <FaGithub />
      </div>
      </a>

       {/* To add inst for in future  */}
      {/* <div>
        <a href="https://www.instagram.com/your-instagram-username" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div> */}
    </div>
  );
};

export default SocialMedia;
