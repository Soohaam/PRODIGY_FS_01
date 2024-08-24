import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/admin/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin-landing');
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <Container maxWidth="sm" className="admin-login-container">
      <Typography variant="h4" align="center" gutterBottom className="admin-login-title">
        Admin Login
      </Typography>
      <form noValidate autoComplete="off">
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
          className="admin-login-field"
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
          className="admin-login-field"
        />
        {error && <Typography color="error" align="center" className="admin-login-error">{error}</Typography>}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleLogin}
          className="admin-login-button"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default AdminLogin;
