import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="sm" className="footer-container">
        <Typography variant="body1" align="center" className="footer-text">
          © 2024 Auth System. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" className="footer-links">
          <Link href="#" color="inherit" className="footer-link">Privacy Policy</Link> | 
          <Link href="#" color="inherit" className="footer-link">Terms of Service</Link>
        </Typography>
        <div className="footer-icons">
          <Link href="https://github.com" color="inherit" className="footer-icon">
            <GitHub />
          </Link>
          <Link href="https://linkedin.com" color="inherit" className="footer-icon">
            <LinkedIn />
          </Link>
          <Link href="https://twitter.com" color="inherit" className="footer-icon">
            <Twitter />
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
