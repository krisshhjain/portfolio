import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaEllipsisH } from 'react-icons/fa';
import "./BottomNavigation.scss";

const BottomNavigation = ({ active }) => {
  const [showMore, setShowMore] = useState(false);

  const mainSections = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "about", icon: "👤", label: "About" },
    { id: "schooling", icon: "🎓", label: "Education" },
    { id: "experience", icon: "💼", label: "Experience" },
    { id: "work", icon: "🚀", label: "Projects" }
  ];

  const moreSections = [
    { id: "certifications", icon: "📜", label: "Certifications" },
    { id: "skills", icon: "⚡", label: "Skills" },
    { id: "contact", icon: "📞", label: "Contact" }
  ];

  const socialLinks = [
    { url: "https://www.linkedin.com/in/krishjain710/", icon: FaLinkedin, label: "LinkedIn" },
    { url: "https://github.com/krisshhjain", icon: FaGithub, label: "GitHub" },
    { url: "https://www.instagram.com/krisshhjain?igsh=bWhkbjNzajZ5eWU3&utm_source=qr", icon: FaInstagram, label: "Instagram" },
    { url: "https://x.com/krisshhjain?s=21", icon: FaTwitter, label: "Twitter" }
  ];

  return (
    <div className="bottom-navigation">
      <div className="bottom-nav-container">
        {mainSections.map((section) => (
          <a
            href={`#${section.id}`}
            key={section.id}
            className={`bottom-nav-item ${active === section.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
          </a>
        ))}
        
        <div className="bottom-nav-item more-menu">
          <button 
            className="more-button"
            onClick={() => setShowMore(!showMore)}
          >
            <FaEllipsisH className="nav-icon" />
            <span className="nav-label">More</span>
          </button>
          
          {showMore && (
            <div className="more-dropdown">
              <div className="more-sections">
                {moreSections.map((section) => (
                  <a
                    href={`#${section.id}`}
                    key={section.id}
                    className={`dropdown-item ${active === section.id ? 'active' : ''}`}
                    onClick={() => setShowMore(false)}
                  >
                    <span className="nav-icon">{section.icon}</span>
                    <span className="nav-label">{section.label}</span>
                  </a>
                ))}
              </div>
              
              <div className="social-divider"></div>
              
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    href={social.url}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item"
                    onClick={() => setShowMore(false)}
                  >
                    <social.icon className="social-icon" />
                    <span className="social-label">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
