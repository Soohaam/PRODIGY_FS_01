import React from 'react';
import { Container, Typography } from '@mui/material';
import './Homepage.css';

function Homepage() {
  return (
    <Container maxWidth="md" className="homepage-container">
      <Typography variant="h2" className="homepage-title" gutterBottom>
        Welcome to the Authentication System
      </Typography>
      <Typography variant="h6" className="homepage-subtitle" gutterBottom>
        Your gateway to secure and efficient access management
      </Typography>
      <Typography variant="body1" className="homepage-text">
        Our platform provides top-notch authentication services, ensuring that your data remains safe and secure. 
        Whether you are a user looking to access your account or an admin managing the system, we offer a seamless 
        experience tailored to your needs.
      </Typography>
      <Typography variant="body1" className="homepage-text">
        Explore our features:
        <ul>
          <li>Secure user login and registration.</li>
          <li>Two-Factor Authentication (2FA) for enhanced security.</li>
          <li>Admin dashboard for user and system management.</li>
          <li>Real-time monitoring and reporting.</li>
        </ul>
      </Typography>
      <Typography variant="body1" className="homepage-text">
        Join us today and take control of your digital security with ease and confidence.
      </Typography>
    </Container>
  );
}

export default Homepage;
