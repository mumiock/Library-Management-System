import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, TextField, Button, Box, Container, Grid
} from '@mui/material';
import { getBooks, createBook } from '../services/api';

interface Book {
  id: number;
  title: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '' });
  const [filterTitle, setFilterTitle] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBook(newBook.title, newBook.author, parseInt(newBook.year) || undefined);
      setNewBook({ title: '', author: '', year: '' });
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  // This filtered list updates automatically when filterTitle changes
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filterTitle.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Book Management
        </Typography>
      </Box>

      <Paper elevation={3}>
        <Box p={3} mb={4}>
          <Typography variant="h5" gutterBottom>
            Create New Book
          </Typography>
          <form onSubmit={handleCreateBook}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Year"
                  type="number"
                  value={newBook.year}
                  onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
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
                  Create Book
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>

      <Box my={4}>
        <TextField
          fullWidth
          label="Filter by Title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          variant="outlined"
        />
      </Box>

      <Box sx={{ height: '200px', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>
                    <Link to={`/books/${book.id}`}>View Details</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default BookList;