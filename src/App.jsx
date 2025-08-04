import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./container/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Work from "./container/Work/Work";
import About from "./container/About/About";
import Skills from "./container/Skills/Skills";
import Certifications from "./container/Certifications/Certifications";
import Experience from "./container/Experience/Experience";
import Schooling from "./container/Schooling/Schooling";
import Footer from "./container/Footer/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation/BackgroundAnimation";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import SocialMedia from "./components/SocialMedia";
import NavigationDots from "./components/NavigationDots";

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'schooling', 'experience', 'work', 'certifications', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="app">
        {/* Global Futuristic Background Elements */}
        <div className="global-floating-elements">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-hexagon"></div>
          <div className="floating-hexagon"></div>
          <div className="floating-hexagon"></div>
          <div className="floating-hexagon"></div>
          <div className="floating-line"></div>
          <div className="floating-line"></div>
          <div className="floating-line"></div>
          <div className="floating-line"></div>
          <div className="floating-diamond"></div>
          <div className="floating-diamond"></div>
          <div className="floating-wave"></div>
          <div className="floating-wave"></div>
        </div>
        
        <BackgroundAnimation />
        <Navbar />
        <Header />
        <About />
        <Schooling />
        <Experience />
        <Work />
        <Certifications />
        <Skills />
        <Footer /> 
        <BottomNavigation />
        
        {/* Global Social Media - Always Visible */}
        <div className="app__global-social">
          <SocialMedia />
        </div>
        
        {/* Global Navigation Dots - Always Visible */}
        <div className="app__global-navigation">
          <NavigationDots active={activeSection} />
        </div>
      </div>
    </>
  );
}

export default App;
