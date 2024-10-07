# Library Management System

The Library Management System is a full-stack web application designed to help libraries manage their book inventory, user accounts, and borrowing processes efficiently. This project consists of a React-based frontend, a Node.js backend with Express, and a PostgreSQL database.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- User Management: Create, read, update, and delete library users
- Book Management: Add, edit, delete, and view details of books
- Borrowing System: Allow users to borrow and return books
- Book Ratings: Users can rate books upon return
- Search and Filter: Find books and users easily
- Responsive Design: Works on desktop and mobile devices

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - TypeScript
  - Prisma ORM

- Database:
  - PostgreSQL

## Project Structure

The project is organized into three main directories:

- `client/`: Contains the React frontend application
- `server/`: Houses the Node.js/Express backend
- `database/`: Includes database-related files and Docker setup

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Docker (for running the database)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mumiock/Library-Management-System.git
   cd Library-Management-System
   ```

2. Set up the database:
   ```bash
   cd database
   docker-compose up -d
   ```

3. Install server dependencies and set up the backend:
   ```bash
   cd ../server
   npm install
   cp .env.example .env
   # Edit the .env file with your database credentials
   npx prisma migrate dev
   ```

4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

### Users
- `GET /users`: List all users
- `GET /users/:id`: Get user details
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a user
- `DELETE /users/:id`: Delete a user
- `POST /users/:userId/borrow/:bookId`: Borrow a book
- `POST /users/:userId/return/:bookId`: Return a book

### Books
- `GET /books`: List all books
- `GET /books/:id`: Get book details
- `GET /books/:id/details`: Get detailed book information
- `POST /books`: Create a new book
- `PUT /books/:id`: Update a book
- `DELETE /books/:id`: Delete a book

### Borrowings
- `GET /users/borrowings/current`: Get all currently borrowed books
