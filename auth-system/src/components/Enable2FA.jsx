import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Enable2FA.css';  

function Enable2FA() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEnable2FA = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/2fa/enable', { email });
      setMessage(response.data.msg);
      setError('');
      navigate('/');
    } catch (error) {
      setError('Failed to enable 2FA: ' + (error.response?.data?.msg || error.message));
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" className="enable-2fa-container">
      <Typography variant="h4" align="center" gutterBottom className="enable-2fa-title">
        Enable 2FA
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="enable-2fa-field"
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleEnable2FA}
        className="enable-2fa-button"
      >
        Enable 2FA
      </Button>
      {message && <Alert severity="success" className="enable-2fa-alert">{message}</Alert>}
      {error && <Alert severity="error" className="enable-2fa-alert">{error}</Alert>}
    </Container>
  );
}

export default Enable2FA;
