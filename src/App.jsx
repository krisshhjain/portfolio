import React, { useState } from 'react';
import './App.css';

import { Header, About, Work, Skills, Certifications, Footer, Experience, Gallery } from './container';
import { Navbar } from './components';
import ClickSpark from './components/ReactBits/ClickSpark/ClickSpark';
import TargetCursor from './components/ReactBits/TargetCursor/TargetCursor';
import CurvedLoop from './components/ReactBits/CurvedLoop/CurvedLoop';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <ThemeProvider>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <ClickSpark sparkColor="#8B5CF6" sparkSize={8} sparkRadius={20} sparkCount={10} duration={500}>
        <div className="app">
          <TargetCursor spinDuration={2.5} hideDefaultCursor parallaxOn hoverDuration={0.2} />
          <Navbar />
          <Header />
          <CurvedLoop
            marqueeText="Full Stack Developer ✦ Cloud Enthusiast ✦ Open Source ✦ DSA Practitioner ✦ "
            speed={1.5}
            curveAmount={200}
            direction="left"
            interactive
          />
          <About />
          <Gallery />
          <Experience />
          <Work />
          <Certifications />
          <Skills />
          <Footer />

          {/* Mobile bottom navigation */}
          <nav className="mobile-bottom-nav">
            <a href="#home" className="mobile-bottom-nav__item">
              <span className="mobile-bottom-nav__icon">🏠</span>
              Home
            </a>
            <a href="#about" className="mobile-bottom-nav__item">
              <span className="mobile-bottom-nav__icon">👤</span>
              About
            </a>
            <a href="#work" className="mobile-bottom-nav__item">
              <span className="mobile-bottom-nav__icon">💼</span>
              Work
            </a>
            <a href="#skills" className="mobile-bottom-nav__item">
              <span className="mobile-bottom-nav__icon">⚡</span>
              Skills
            </a>
            <a href="#contact" className="mobile-bottom-nav__item">
              <span className="mobile-bottom-nav__icon">✉️</span>
              Contact
            </a>
          </nav>
        </div>
      </ClickSpark>
    </ThemeProvider>
  );
};

export default App;
