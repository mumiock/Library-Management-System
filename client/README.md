# Library Management System - Client

This is the client-side application for the Library Management System. It's built using React and provides a user interface for managing books, users, and borrowing operations.

## Getting Started

These instructions will help you set up and run the client-side application on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/mumiock/Library-Management-System.git
   cd library-management/client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits, and you will see any lint errors in the console.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects the create-react-app configuration (one-way operation)

## Features

- User Management: View, create, update, and delete users
- Book Management: View, create, update, and delete books
- Borrowing System: Allow users to borrow and return books
- Book Ratings: Users can rate books upon return

## Project Structure

- `src/components`: React components for different pages and features
- `src/services`: API service for communicating with the backend
- `src/types`: TypeScript type definitions

## Key Components

- `HomePage`: The main landing page of the application
- `UserList`: Displays a list of users and allows creating new users
- `UserDetails`: Shows detailed information about a user and their borrowed books
- `BookList`: Displays a list of books and allows creating new books
- `BookDetails`: Shows detailed information about a book and allows lending operations
- `BorrowedBooks`: Displays a list of currently borrowed books

## API Integration

The application uses Axios to communicate with the backend API. The API service is defined in `src/services/api.ts`.

## Styling

The application uses Material-UI for styling and layout. Custom styles can be found in individual component files.

## Learn More

To learn more about the technologies used in this project:

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Material-UI Documentation](https://mui.com/)
