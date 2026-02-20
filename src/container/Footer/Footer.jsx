import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { BsLinkedin, BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs';
import DecryptedText from '../../components/ReactBits/DecryptedText/DecryptedText';
import Stepper, { Step } from '../../components/ReactBits/Stepper/Stepper';
import { AppWrap, MotionWrap } from '../../Wrapper';
import './Footer.css';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setLoading(false);
      alert('Email service is currently unavailable. Please contact me directly at krishjain710@gmail.com');
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleString()
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
      })
      .catch((err) => {
        setLoading(false);
        console.error('EmailJS Error:', err);
        alert('Failed to send message. Please try again or contact me at krishjain710@gmail.com');
      });
  };

  const socials = [
    { icon: <BsLinkedin />, url: 'https://www.linkedin.com/in/krisshhjain', label: 'LinkedIn' },
    { icon: <BsGithub />, url: 'https://github.com/krisshhjain', label: 'GitHub' },
    { icon: <BsInstagram />, url: 'https://www.instagram.com/krisshhjain', label: 'Instagram' },
    { icon: <BsTwitterX />, url: 'https://twitter.com/krisshhjain', label: 'X' },
  ];

  return (
    <div className="app__footer">
      <h2 className="head-text">
        <DecryptedText text="Get In Touch" speed={50} maxIterations={10} animateOn="view" />
      </h2>

      <div className="footer__content">
        <div className="footer__form-wrapper glass-card">
          {submitted ? (
            <motion.div
              className="footer__success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="footer__success-icon">🎉</span>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you soon!</p>
              <button className="footer__btn-reset" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}>
                Send Another
              </button>
            </motion.div>
          ) : (
            <Stepper
              initialStep={1}
              onFinalStepCompleted={handleSubmit}
              backButtonText="Back"
              nextButtonText="Continue"
            >
              <Step>
                <div className="footer__step">
                  <h3 className="footer__step-title">Let's start with your name</h3>
                  <p className="footer__step-desc">What should I call you?</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="footer__input"
                  />
                </div>
              </Step>
              <Step>
                <div className="footer__step">
                  <h3 className="footer__step-title">Your email</h3>
                  <p className="footer__step-desc">Where can I reach you?</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="footer__input"
                  />
                </div>
              </Step>
              <Step>
                <div className="footer__step">
                  <h3 className="footer__step-title">Your message</h3>
                  <p className="footer__step-desc">Tell me what you have in mind</p>
                  <textarea
                    name="message"
                    placeholder="Hi Krish, I'd love to..."
                    value={formData.message}
                    onChange={handleChange}
                    className="footer__textarea"
                    rows={5}
                  />
                </div>
              </Step>
            </Stepper>
          )}
        </div>

        <div className="footer__socials">
          <h3 className="footer__socials-title">Or find me on</h3>
          <div className="footer__social-links">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link cursor-target"
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact');