import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Adjust this if your server runs on a different port

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getUsers = () => api.get('/users');
export const getUserById = (id: number) => api.get(`/users/${id}`);
export const getBooks = () => api.get('/books');
export const getBookById = (id: number) => api.get(`/books/${id}`);
export const borrowBook = (userId: number, bookId: number) => api.post(`/users/${userId}/borrow/${bookId}`);
export const returnBook = async (userId: number, bookId: number, rating: number) => {
  const response = await api.post(`/users/${userId}/return/${bookId}`, { score: rating });
  return response.data;
};

// Book endpoints
export const createBook = (title: string, author: string, year?: number) => api.post('/books', { title, author, year });
export const updateBook = (id: number, title?: string, author?: string, year?: number) => api.put(`/books/${id}`, { title, author, year });
export const deleteBook = (id: number) => api.delete(`/books/${id}`);

// User endpoints
export const createUser = (name: string, email: string) => api.post('/users', { name, email });
export const updateUser = (id: number, name?: string, email?: string) => api.put(`/users/${id}`, { name, email });
export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export const getBookDetails = async (id: number) => {
  const response = await api.get(`/books/${id}/details`);
  return response.data;
};

export const getBorrowedBooks = () => api.get('/users/borrowings/current');

export default api;
