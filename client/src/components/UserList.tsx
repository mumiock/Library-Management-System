import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, TextField, Button, Box, Container, Grid
} from '@mui/material';
import { getUsers, createUser } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(newUser.name, newUser.email);
      setNewUser({ name: '', email: '' });
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          User Management
        </Typography>
      </Box>

      <Paper elevation={3}>
        <Box p={3} mb={4}>
          <Typography variant="h5" gutterBottom>
            Create New User
          </Typography>
          <form onSubmit={handleCreateUser}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  style={{ height: '100%' }}
                >
                  Create User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>

      <Box my={4}>
        <TextField
          fullWidth
          label="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          variant="outlined"
        />
      </Box>

      <TableContainer component={Paper} style={{ maxHeight: 200, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link to={`/users/${user.id}`}>View Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;