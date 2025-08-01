import "./App.scss";
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

function App() {
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
      </div>
    </>
  );
}

export default App;
