import React from 'react';
import { Typography, Container, Grid, Paper, Button } from '@mui/material';
import { Settings, LibraryBooks, Notifications, Help } from '@mui/icons-material';
import { motion } from 'framer-motion';

function UserLanding() {
  return (
    <Container maxWidth="md" style={styles.container}>
      <Typography variant="h3" gutterBottom style={styles.header}>
        Welcome, User!
      </Typography>
      <Typography variant="body1" style={styles.subheader}>
        This is your dashboard. Manage your account, access content, and explore more.
      </Typography>
      
      <Grid container spacing={4} style={styles.gridContainer}>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper style={styles.card}>
              <Settings style={styles.icon} />
              <Typography variant="h5" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="body2">
                Update your profile, change your password, and manage security settings.
              </Typography>
              <Button variant="contained" color="primary" style={styles.button}>
                Manage Settings
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper style={styles.card}>
              <LibraryBooks style={styles.icon} />
              <Typography variant="h5" gutterBottom>
                Content Library
              </Typography>
              <Typography variant="body2">
                Access your saved content, recently viewed items, and more.
              </Typography>
              <Button variant="contained" color="primary" style={styles.button}>
                View Content
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper style={styles.card}>
              <Notifications style={styles.icon} />
              <Typography variant="h5" gutterBottom>
                Notifications
              </Typography>
              <Typography variant="body2">
                Check your recent notifications and alerts.
              </Typography>
              <Button variant="contained" color="primary" style={styles.button}>
                View Notifications
              </Button>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper style={styles.card}>
              <Help style={styles.icon} />
              <Typography variant="h5" gutterBottom>
                Support
              </Typography>
              <Typography variant="body2">
                Need help? Contact support or browse FAQs.
              </Typography>
              <Button variant="contained" color="primary" style={styles.button}>
                Get Support
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

const styles = {
  container: {
    marginTop: '50px',
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  subheader: {
    marginBottom: '30px',
    color: '#757575',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  card: {
    padding: '20px',
    textAlign: 'left',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: '40px',
    color: '#3f51b5',
  },
};

export default UserLanding;
