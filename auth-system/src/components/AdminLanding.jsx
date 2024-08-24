import React from 'react';
import { Typography, Container, Paper, Grid, Button } from '@mui/material';
import { People, Report, Settings, AddCircle, Visibility, Dashboard } from '@mui/icons-material';
import './AdminLanding.css'; 

function AdminLanding() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom align="center" className="admin-landing-title">
        Welcome, Admin!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="admin-landing-paper">
            <div className="admin-landing-icon">
              <People fontSize="large" />
            </div>
            <Typography variant="h5">User Management</Typography>
            <Typography variant="body1" className="admin-landing-description">
              Manage and oversee all user accounts, including creating new accounts, editing existing ones, and deleting users.
            </Typography>
            <Button variant="contained" color="primary" className="admin-landing-button">
              View All Users
            </Button>
            <Button variant="outlined" color="secondary" className="admin-landing-button">
              Add New User
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="admin-landing-paper">
            <div className="admin-landing-icon">
              <Report fontSize="large" />
            </div>
            <Typography variant="h5">Reports</Typography>
            <Typography variant="body1" className="admin-landing-description">
              Access and analyze system reports, view activity logs, and generate detailed reports for administrative review.
            </Typography>
            <Button variant="contained" color="primary" className="admin-landing-button">
              View Reports
            </Button>
            <Button variant="outlined" color="secondary" className="admin-landing-button">
              Generate New Report
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="admin-landing-paper">
            <div className="admin-landing-icon">
              <Settings fontSize="large" />
            </div>
            <Typography variant="h5">Administrative Tasks</Typography>
            <Typography variant="body1" className="admin-landing-description">
              Perform system configurations, manage user roles and permissions, and adjust system settings to optimize performance.
            </Typography>
            <Button variant="contained" color="secondary" className="admin-landing-button">
              Manage Roles
            </Button>
            <Button variant="outlined" color="primary" className="admin-landing-button">
              System Settings
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminLanding;
