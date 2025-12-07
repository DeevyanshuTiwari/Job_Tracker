import React, { useState, useMemo } from 'react';
import { useApplications } from '../contexts/ApplicationsContext';
import './Applications.css';

const Applications = () => {
  const { applications, updateApplication, deleteApplication } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('companyName');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const itemsPerPage = 5;

  // Filter and search
  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(app => {
        const searchValue = searchTerm.toLowerCase();
        if (searchField === 'companyName') {
          return app.companyName?.toLowerCase().includes(searchValue);
        } else {
          return app.jobTitle?.toLowerCase().includes(searchValue);
        }
      });
    }

    // Filter by job type
    if (jobTypeFilter !== 'All') {
      filtered = filtered.filter(app => app.jobType === jobTypeFilter);
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    return filtered;
  }, [applications, searchTerm, searchField, jobTypeFilter, statusFilter]);

  // Sort
  const sortedApplications = useMemo(() => {
    if (!sortBy) return filteredApplications;

    const sorted = [...filteredApplications];
    sorted.sort((a, b) => {
      if (sortBy === 'companyName') {
        const comparison = a.companyName?.localeCompare(b.companyName) || 0;
        return sortOrder === 'asc' ? comparison : -comparison;
      } else if (sortBy === 'appliedDate') {
        const dateA = new Date(a.appliedDate || 0);
        const dateB = new Date(b.appliedDate || 0);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }
      return 0;
    });
    return sorted;
  }, [filteredApplications, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = sortedApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'appliedDate' ? 'desc' : 'asc');
    }
  };

  const resetSort = () => {
    setSortBy(null);
    setSortOrder('asc');
  };

  const handleEdit = (application) => {
    setEditingId(application.id);
    setEditFormData({
      companyName: application.companyName || '',
      jobTitle: application.jobTitle || '',
      jobType: application.jobType || '',
      status: application.status || '',
      location: application.location || '',
      appliedDate: application.appliedDate || '',
      notes: application.notes || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (id) => {
    updateApplication(id, editFormData);
    setEditingId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      if (paginatedApplications.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Get unique job types and statuses for filters
  const jobTypes = ['All', ...new Set(applications.map(app => app.jobType).filter(Boolean))];
  const statuses = ['All', 'Applied', 'Interview Scheduled', 'Rejected', 'Selected'];

  return (
    <div className="applications">
      <div className="applications-container">
        <h2>Job Applications</h2>

        {/* Search and Filters */}
        <div className="controls">
          <div className="search-section">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="search-select"
            >
              <option value="companyName">Search by Company Name</option>
              <option value="jobTitle">Search by Job Title</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select
              value={jobTypeFilter}
              onChange={(e) => {
                setJobTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Buttons */}
        <div className="sort-buttons">
          <button
            onClick={() => handleSort('companyName')}
            className={`btn btn-sort ${sortBy === 'companyName' ? 'active' : ''}`}
          >
            Sort by Company (A-Z)
          </button>
          <button
            onClick={() => handleSort('appliedDate')}
            className={`btn btn-sort ${sortBy === 'appliedDate' ? 'active' : ''}`}
          >
            Sort by Applied Date (Newest → Oldest)
          </button>
          <button
            onClick={resetSort}
            className="btn btn-sort"
          >
            Reset Sorting
          </button>
        </div>

        {/* Table */}
        {paginatedApplications.length === 0 ? (
          <div className="no-results">
            <p>No applications found.</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Job Type</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplications.map(app => (
                    <tr key={app.id}>
                      {editingId === app.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="companyName"
                              value={editFormData.companyName}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="jobTitle"
                              value={editFormData.jobTitle}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <select
                              name="jobType"
                              value={editFormData.jobType}
                              onChange={handleEditChange}
                              className="edit-input"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Internship">Internship</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                            </select>
                          </td>
                          <td>
                            <select
                              name="status"
                              value={editFormData.status}
                              onChange={handleEditChange}
                              className="edit-input"
                            >
                              <option value="Applied">Applied</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Selected">Selected</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="location"
                              value={editFormData.location}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="appliedDate"
                              value={editFormData.appliedDate}
                              onChange={handleEditChange}
                              className="edit-input"
                            />
                          </td>
                          <td>
                            <button
                              onClick={() => handleSaveEdit(app.id)}
                              className="btn-action btn-save"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="btn-action btn-cancel"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{app.companyName}</td>
                          <td>{app.jobTitle}</td>
                          <td>{app.jobType}</td>
                          <td>
                            <span className={`status-badge status-${app.status?.toLowerCase().replace(' ', '-')}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>{app.location}</td>
                          <td>{app.appliedDate || 'N/A'}</td>
                          <td>
                            <button
                              onClick={() => handleEdit(app)}
                              className="btn-action btn-edit"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="btn-action btn-delete"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-pagination"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="btn btn-pagination"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;

