import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined, VpnKeyOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [step, setStep] = useState('login'); 
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setStep('verify');
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.msg || error.message));
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-2fa', { email, twoFactorCode });
      localStorage.setItem('token', response.data.token);
      navigate('/user-landing'); 
    } catch (error) {
      setError('2FA verification failed: ' + (error.response?.data?.msg || error.message));
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Typography variant="h4" align="center" gutterBottom className="login-title">
        {step === 'login' ? 'Login' : 'Verify 2FA Code'}
      </Typography>
      <form noValidate autoComplete="off">
        {step === 'login' ? (
          <>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
              className="login-field"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className="login-field"
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogin}
              className="login-button"
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="2FA Code"
              variant="outlined"
              fullWidth
              margin="normal"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlined />
                  </InputAdornment>
                ),
              }}
              className="login-field"
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleVerify}
              className="login-button"
            >
              Verify Code
            </Button>
          </>
        )}
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={handleForgotPassword}
          className="forgot-password-button"
        >
          Forgot Password?
        </Button>
        {error && <Typography color="error" align="center" className="login-error">{error}</Typography>}
      </form>
    </Container>
  );
}

export default Login;
