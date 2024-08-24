import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setSuccess('Password reset link sent to your email.');
      setTimeout(() => navigate('/login'), 3000); 
    } catch (error) {
      setError('Failed to send password reset link: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <Typography color="error" align="center" style={{ marginTop: '20px' }}>{error}</Typography>}
        {success && <Typography color="primary" align="center" style={{ marginTop: '20px' }}>{success}</Typography>}
        <Button 
          variant="contained" 
          color="secondary" 
          fullWidth 
          onClick={handleSubmit} 
          style={{ marginTop: '20px' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Request Password Reset'}
        </Button>
      </form>
    </Container>
  );
}

export default ForgotPassword;
