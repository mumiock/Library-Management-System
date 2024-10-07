import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, Box, Container, TextField, Grid
} from '@mui/material';
import { getBorrowedBooks } from '../services/api';

interface BorrowedBook {
  userId: number;
  userName: string;
  bookId: number;
  bookTitle: string;
  borrowDate: string;
}

const BorrowedBooks: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await getBorrowedBooks();
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const filteredBooks = borrowedBooks.filter(book =>
    book.bookTitle.toLowerCase().includes(filterTitle.toLowerCase()) &&
    book.userName.toLowerCase().includes(filterUser.toLowerCase())
  );

  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Currently Borrowed Books
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Filter by Book Title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Filter by User Name"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Borrowed By</TableCell>
              <TableCell>Borrow Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow 
                key={`${book.userId}-${book.bookId}`}
                onClick={() => handleRowClick(book.userId)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              >
                <TableCell>{book.bookTitle}</TableCell>
                <TableCell>{book.userName}</TableCell>
                <TableCell>{new Date(book.borrowDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BorrowedBooks;
