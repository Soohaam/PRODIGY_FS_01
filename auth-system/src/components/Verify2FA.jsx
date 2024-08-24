import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, IconButton, Alert } from '@mui/material';
import { Lock, LockOpen } from '@mui/icons-material';
import axios from 'axios';
import './Verify2FA.css'; 

function Verify2FA() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/2fa/verify', { code });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage('Verification failed: ' + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <Container maxWidth="sm" className="verify-2fa-container">
      <Typography variant="h4" align="center" gutterBottom className="verify-2fa-title">
        Verify Two-Factor Authentication
      </Typography>
      <div className="verify-2fa-icon">
        <Lock fontSize="large" />
      </div>
      <TextField
        label="2FA Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="verify-2fa-field"
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleVerify}
        className="verify-2fa-button"
      >
        Verify Code
      </Button>
      {message && (
        <Alert severity={message.includes('failed') ? 'error' : 'success'} className="verify-2fa-alert">
          {message}
        </Alert>
      )}
    </Container>
  );
}

export default Verify2FA;
