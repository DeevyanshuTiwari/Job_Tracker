import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../contexts/ApplicationsContext';
import './AddApplication.css';

const AddApplication = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobType: '',
    status: '',
    location: '',
    appliedDate: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { addApplication } = useApplications();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job Title is required';
    }

    if (!formData.jobType) {
      newErrors.jobType = 'Job Type is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    addApplication(formData);
    setSuccessMessage('Application added!');
    
    // Clear form
    setFormData({
      companyName: '',
      jobTitle: '',
      jobType: '',
      status: '',
      location: '',
      appliedDate: '',
      notes: ''
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="add-application">
      <div className="add-application-container">
        <h2>Add Job Application</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && (
              <span className="error-message">{errors.companyName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title *</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className={errors.jobTitle ? 'error' : ''}
            />
            {errors.jobTitle && (
              <span className="error-message">{errors.jobTitle}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Job Type *</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={errors.jobType ? 'error' : ''}
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.jobType && (
              <span className="error-message">{errors.jobType}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
            >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
            {errors.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
            />
            {errors.location && (
              <span className="error-message">{errors.location}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="appliedDate">Applied Date</label>
            <input
              type="date"
              id="appliedDate"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Add Application</button>
            <button
              type="button"
              onClick={() => navigate('/applications')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
