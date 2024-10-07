import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, MenuItem, Box, Paper, Grid } from '@mui/material';
import { getBookById, getUsers, borrowBook, updateBook, deleteBook, getBookDetails } from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  score: number;
}

interface User {
  id: number;
  name: string;
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | ''>('');
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (id) {
          const bookResponse = await getBookDetails(parseInt(id));
          setBook(bookResponse);
          setEditedBook(bookResponse);
        }
        const usersResponse = await getUsers();
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    if (book) {
      setEditedBook(book);
    }
  }, [book]);

  const handleLendBook = async () => {
    if (selectedUser === '' || !book) return;

    try {
      await borrowBook(selectedUser, book.id);
      // Refresh book details using getBookDetails instead of getBookById
      const updatedBook = await getBookDetails(book.id);
      setBook(updatedBook);
      setSelectedUser('');
    } catch (error) {
      console.error('Error lending book:', error);
    }
  };

  const handleUpdateBook = async () => {
    if (!editedBook) return;
    try {
      await updateBook(editedBook.id, editedBook.title, editedBook.author, editedBook.year);
      const updatedBook = await getBookDetails(editedBook.id);
      setBook(updatedBook);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async () => {
    if (!book) return;
    try {
      await deleteBook(book.id);
      navigate('/books');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book Details
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>{book.title}</Typography>
        <Typography variant="body1">Author: {book.author}</Typography>
        <Typography variant="body1">Year: {book.year || 'N/A'}</Typography>
        <Typography variant="body1">
          Average Score: {book.score === -1 ? 'No ratings yet' : book.score.toFixed(2)}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>Lend Book</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              select
              label="Select User"
              value={selectedUser}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              fullWidth
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLendBook}
              disabled={selectedUser === ''}
              fullWidth
            >
              Lend Book
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        {isEditing ? (
          <Box>
            <Typography variant="h6" gutterBottom>Edit Book</Typography>
            <TextField
              label="Title"
              value={editedBook?.title || ''}
              onChange={(e) => setEditedBook({ ...editedBook!, title: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author"
              value={editedBook?.author || ''}
              onChange={(e) => setEditedBook({ ...editedBook!, author: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              type="number"
              value={editedBook?.year || ''}
              onChange={(e) => setEditedBook({ ...editedBook!, year: parseInt(e.target.value) || undefined })}
              fullWidth
              margin="normal"
            />
            <Box sx={{ marginTop: 2 }}>
              <Button onClick={handleUpdateBook} variant="contained" color="primary" sx={{ marginRight: 1 }}>
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outlined">
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>Actions</Typography>
            <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Edit Book
            </Button>
            <Button onClick={handleDeleteBook} variant="contained" color="secondary">
              Delete Book
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default BookDetails;