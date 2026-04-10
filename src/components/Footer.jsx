import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
 
          <h3>Vegetable Classification</h3>
  
        </div>
        
        <div className="footer-tech">
  
          <div className="tech-tags">
            <span>React.js</span>
            <span>FastAPI</span>
            <span>MobileNetV2</span>
            <span>TensorFlow</span>
          </div>
        </div>
        
        <div className="footer-info">
          <h4>Informasi Proyek</h4>
          <p>FINAL - PROJECT</p>
        </div>
      </div>
      
      <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vegetable Classification | MobileNetV2 Architecture</p>
      </div>
    </footer>
  );
};

export default Footer;