import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css'; 

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { token, password });
      setSuccess(response.data.msg);
      setError('');
      
      window.alert('Password reset successful! You will be redirected to the login page.');
      navigate('/login');
    } catch (error) {
      setError('Reset password failed: ' + (error.response?.data?.msg || error.message));
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm" className="reset-password-container">
      <Typography variant="h4" align="center" gutterBottom className="reset-password-title">
        Reset Password
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          label="New Password"
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
          className="reset-password-field"
        />
        <TextField
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          className="reset-password-field"
        />
        {error && <Alert severity="error" className="reset-password-alert">{error}</Alert>}
        {success && <Alert severity="success" className="reset-password-alert">{success}</Alert>}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleResetPassword}
          className="reset-password-button"
        >
          Reset Password
        </Button>
      </form>
    </Container>
  );
}

export default ResetPassword;
