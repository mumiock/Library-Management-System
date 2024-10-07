# Library Management System - Backend

This is the backend server for the Library Management System, a comprehensive solution for managing books, users, and borrowing operations in a library.

## Features

- User management (create, read, update, delete)
- Book management (create, read, update, delete)
- Borrowing and returning books
- Book rating system
- Current borrowings overview

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker (optional, for database)

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Docker (optional, for running the database)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mumiock/Library-Management-System.git
   cd Library-Management-System/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - If using Docker:
     ```bash
     cd ../database
     docker-compose up -d
     ```
   - If using a local PostgreSQL installation, create a new database named `librarydb`

4. Configure the environment:
   - Copy the `.env.example` file to `.env` in the `server` directory
   - Update the `DATABASE_URL` in the `.env` file to match your database configuration

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

The server should now be running on `http://localhost:3001` (or the port specified in your `.env` file).

## API Endpoints

### Users
- `GET /users`: List all users
- `GET /users/:id`: Get user details
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a user
- `DELETE /users/:id`: Delete a user
- `POST /users/:userId/borrow/:bookId`: Borrow a book
- `POST /users/:userId/return/:bookId`: Return a book
- `GET /users/borrowings/current`: Get all current borrowings

### Books
- `GET /books`: List all books
- `GET /books/:id`: Get book details
- `GET /books/:id/details`: Get detailed book information
- `POST /books`: Create a new book
- `PUT /books/:id`: Update a book
- `DELETE /books/:id`: Delete a book

## Development

- To run the server in development mode with hot reloading:
  ```bash
  npm run dev
  ```

- To build the TypeScript files:
  ```bash
  npm run build
  ```

- To start the server using the compiled JavaScript files:
  ```bash
  npm start
  ```

## Database Schema

The database consists of three main tables:

1. `User`: Stores information about library users
2. `Book`: Contains details about books in the library
3. `Borrowing`: Tracks book borrowings and returns

For the complete schema, refer to the `prisma/schema.prisma` file.

## Testing

You can use tools like Postman or curl to test the API endpoints. Here's an example using curl:

```bash
# Get all users
curl http://localhost:3001/users

# Create a new book
curl -X POST -H "Content-Type: application/json" -d '{"title":"New Book","author":"John Doe","year":2023}' http://localhost:3001/books
```

