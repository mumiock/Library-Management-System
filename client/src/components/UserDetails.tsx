import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Button, TextField, Box, Paper, Grid } from '@mui/material';
import { getUserById, returnBook, updateUser, deleteUser } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  books: {
    past: { id: number; name: string; userScore: number }[];
    present: { id: number; name: string }[];
  };
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (id) {
          const response = await getUserById(parseInt(id));
          setUser(response.data);
        } else {
          console.error('User ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleReturnBook = async (bookId: number) => {
    if (!user) return;
    try {
      const bookToReturn = user.books.present.find(book => book.id === bookId);
      if (bookToReturn) {
        const rating = prompt("Please rate the book from 1 to 5:");
        const score = rating ? parseInt(rating) : 0;
        if (score >= 1 && score <= 5) {
          await returnBook(user.id, bookId, score);
          // Refresh user details after returning the book
          const response = await getUserById(user.id);
          setUser(response.data);
        } else {
          alert("Invalid rating. Please enter a number between 1 and 5.");
        }
      }
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleUpdateUser = async () => {
    if (!editedUser) return;
    try {
      await updateUser(editedUser.id, editedUser.name, editedUser.email);
      const updatedUser = await getUserById(editedUser.id);
      setUser(updatedUser.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    try {
      await deleteUser(user.id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Typography variant="h6" gutterBottom>{user.name}</Typography>
        <Typography variant="body1" gutterBottom>{user.email}</Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, height: 300 }}>
            <Typography variant="h5" gutterBottom>
              Currently Borrowed Books
            </Typography>
            <Box sx={{ height: 220, overflowY: 'auto' }}>
              <List>
                {user.books.present.map((book) => (
                  <ListItem key={book.id}>
                    <ListItemText primary={book.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleReturnBook(book.id)}
                      size="small"
                    >
                      Return
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, height: 300 }}>
            <Typography variant="h5" gutterBottom>
              Previously Borrowed Books
            </Typography>
            <Box sx={{ height: 220, overflowY: 'auto' }}>
              <List>
                {user.books.past.map((book) => (
                  <ListItem key={book.name}>
                    <ListItemText 
                      primary={book.name} 
                      secondary={`User Score: ${book.userScore}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        {isEditing ? (
          <Box>
            <TextField
              label="Name"
              value={editedUser?.name || ''}
              onChange={(e) => setEditedUser({ ...editedUser!, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={editedUser?.email || ''}
              onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Box sx={{ marginTop: 2 }}>
              <Button onClick={handleUpdateUser} variant="contained" color="primary" sx={{ marginRight: 1 }}>
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outlined">
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Edit User
            </Button>
            <Button onClick={handleDeleteUser} variant="contained" color="secondary">
              Delete User
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default UserDetails;