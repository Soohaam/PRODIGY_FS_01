import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <AppBar position="static" style={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Auth System
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/admin-login">
            Admin Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className="floating-circles">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Header;
