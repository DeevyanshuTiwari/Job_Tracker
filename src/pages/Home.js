import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="home-container">
        <h1>Job Application Tracker</h1>
        <p className="subtitle">Keep track of all your job applications in one place</p>
        
        {!user ? (
          <div className="home-actions">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            <Link to="/add-application" className="btn btn-secondary">Add Application</Link>
          </div>
        )}

        <div className="features">
          <div className="feature-card">
            <h3>Track Applications</h3>
            <p>Keep track of all your job applications with detailed information</p>
          </div>
          <div className="feature-card">
            <h3>Search & Filter</h3>
            <p>Easily search and filter through your applications</p>
          </div>
          <div className="feature-card">
            <h3>Dashboard View</h3>
            <p>Get a quick summary of your application status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

