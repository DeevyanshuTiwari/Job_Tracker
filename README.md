# Job Application Tracker

A React-based job application tracking system that allows users to manage their job applications with features like search, filter, sort, and pagination.

## Features

- **Authentication**: Fake authentication system with role-based access
- **Protected Routes**: Secure routes that require login
- **Add Applications**: Form to add new job applications with validation
- **View Applications**: Table view with search, filter, sort, and pagination
- **Dashboard**: Summary cards showing application statistics
- **Edit/Delete**: Edit and delete applications (bonus features)

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

### Login
- Use any email and password (minimum 6 characters)
- For manager role, use: `hrmanager@gmail.com`
- For regular user role, use any other email

### Routes
- `/` - Home/Landing page
- `/login` - Login page
- `/dashboard` - Dashboard with summary (Protected)
- `/add-application` - Add new application form (Protected)
- `/applications` - View all applications table (Protected)

## Technologies Used

- React 18
- React Router DOM v6
- Context API for state management
- CSS for styling

