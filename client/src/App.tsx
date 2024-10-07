import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import HomePage from './components/HomePage';
import BorrowedBooks from './components/BorrowedBooks';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
