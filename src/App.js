import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddApplication from './pages/AddApplication';
import Applications from './pages/Applications';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ApplicationsProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-application" element={<AddApplication />} />
                <Route path="/applications" element={<Applications />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApplicationsProvider>
    </AuthProvider>
  );
}

export default App;

