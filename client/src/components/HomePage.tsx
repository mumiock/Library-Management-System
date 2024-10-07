import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Box, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUsers, FaBook, FaBookReader, FaUser, FaBookOpen, FaExchangeAlt } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="white">
            <FaBookReader style={{ fontSize: 40, marginRight: 10, verticalAlign: 'middle' }} />
            Library Management System
          </Typography>
          <Typography variant="h6" align="center" color="white" paragraph>
            Welcome to your one-stop solution for efficient library management
          </Typography>
        </Paper>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaUsers style={{ fontSize: 60, color: '#3f51b5', marginBottom: 20 }} />
                <Typography variant="h4" component="div" gutterBottom color="primary" align="center">
                  Users
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph align="center">
                  Manage library users efficiently. Add new users, update existing ones, and track their borrowing history.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button component={Link} to="/users" variant="contained" color="primary" size="large" startIcon={<FaUser />}>
                    Manage Users
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaBook style={{ fontSize: 60, color: '#f50057', marginBottom: 20 }} />
                <Typography variant="h4" component="div" gutterBottom color="secondary" align="center">
                  Books
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph align="center">
                  Manage your library's book inventory with ease. Add new books, update existing ones, and monitor their availability.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button component={Link} to="/books" variant="contained" color="secondary" size="large" startIcon={<FaBookOpen />}>
                    Manage Books
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FaExchangeAlt style={{ fontSize: 60, color: '#4caf50', marginBottom: 20 }} />
                <Typography variant="h4" component="div" gutterBottom color="success" align="center">
                  Borrowed Books
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph align="center">
                  View all currently borrowed books and their respective borrowers. Monitor lending activities efficiently.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button component={Link} to="/borrowed-books" variant="contained" color="success" size="large" startIcon={<FaExchangeAlt />}>
                    View Borrowed Books
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;