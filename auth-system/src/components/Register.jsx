import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setMessage('Registration successful! Redirecting to setup 2FA...');
      setError('');
      setTimeout(() => navigate("/setup-2fa"), 2000);
    } catch (error) {
      setError('Registration failed: ' + (error.response?.data?.msg || error.message));
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" className="register-container">
      <Typography variant="h4" align="center" gutterBottom className="register-title">
        Register
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-field"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-field"
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
          className="register-field"
        />
        {error && <Alert severity="error" className="register-alert">{error}</Alert>}
        {message && <Alert severity="success" className="register-alert">{message}</Alert>}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;
