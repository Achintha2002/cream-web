# Raani Organic Cream - MERN Stack

This project has been migrated from a static HTML site to a full MERN stack (MongoDB, Express, React, Node.js) application.

## Prerequisites

You must have **Node.js** installed on your machine.
Download it from: https://nodejs.org/

## Project Structure

- `client/`: The React frontend (built with Vite + Tailwind CSS).
- `server/`: The Node.js/Express backend API.

## Getting Started

### 1. Setup the Client (Frontend)

Open a terminal and navigate to the `client` folder:

```bash
cd client
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`.

### 2. Setup the Server (Backend)

Open a new terminal and navigate to the `server` folder:

```bash
cd server
npm install
npm start
```

The server will start at `http://localhost:5000`.

### Database Configuration

The server is configured to connect to a MongoDB database.
- By default, it tries to connect to `mongodb://localhost:27017/raani_cream`.
- For production, create a `.env` file in the `server` directory and add your MongoDB Atlas connection string:
  
  ```
  MONGODB_URI=your_connection_string_here
  PORT=5000
  ```

## Features

- **Modern React Architecture**: Component-based UI using React Router for navigation.
- **Tailwind CSS**: Custom theme with organic color palette and animations.
- **Responsive Design**: Mobile-first approach with a custom mobile menu.
- **Backend API**: ready-to-scale Express server structure.
