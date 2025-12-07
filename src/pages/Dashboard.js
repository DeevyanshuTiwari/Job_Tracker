import React from 'react';
import { useApplications } from '../contexts/ApplicationsContext';
import './Dashboard.css';

const Dashboard = () => {
  const { applications } = useApplications();

  // Calculate summary statistics
  const totalApplications = applications.length;
  const applied = applications.filter(app => app.status === 'Applied').length;
  const interviewScheduled = applications.filter(app => app.status === 'Interview Scheduled').length;
  const selected = applications.filter(app => app.status === 'Selected').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;

  // Get last 5 applications (sorted by applied date, most recent first)
  const lastFiveApplications = [...applications]
    .sort((a, b) => {
      const dateA = new Date(a.appliedDate || 0);
      const dateB = new Date(b.appliedDate || 0);
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2>Dashboard Summary</h2>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Applications</h3>
            <p className="card-value">{totalApplications}</p>
          </div>
          <div className="summary-card">
            <h3>Applied</h3>
            <p className="card-value">{applied}</p>
          </div>
          <div className="summary-card">
            <h3>Interview Scheduled</h3>
            <p className="card-value">{interviewScheduled}</p>
          </div>
          <div className="summary-card">
            <h3>Selected</h3>
            <p className="card-value">{selected}</p>
          </div>
          <div className="summary-card">
            <h3>Rejected</h3>
            <p className="card-value">{rejected}</p>
          </div>
        </div>

        {/* Last 5 Applications */}
        {lastFiveApplications.length > 0 && (
          <div className="recent-applications">
            <h3>Last 5 Applications</h3>
            <div className="applications-list">
              {lastFiveApplications.map(app => (
                <div key={app.id} className="application-item">
                  <div className="application-info">
                    <h4>{app.companyName}</h4>
                    <p className="job-title">{app.jobTitle}</p>
                    <div className="application-meta">
                      <span className="job-type">{app.jobType}</span>
                      <span className={`status-badge status-${app.status?.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                      {app.appliedDate && (
                        <span className="applied-date">{app.appliedDate}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalApplications === 0 && (
          <div className="empty-state">
            <p>No applications yet. Start by adding your first application!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

