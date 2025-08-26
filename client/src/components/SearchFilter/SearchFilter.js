import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [stipend, setStipend] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      type,
      category,
      location,
      stipend
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setType('');
    setCategory('');
    setLocation('');
    setStipend('');
    onFilterChange({
      searchTerm: '',
      type: '',
      category: '',
      location: '',
      stipend: ''
    });
  };

  return (
    <div className="search-filter">
      <h3>Filter Opportunities</h3>
      
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search by title or organization..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
          className="search-input"
        />
      </div>

      <div className="filter-row">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            handleFilterChange();
          }}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="internship">Internship</option>
          <option value="volunteer">Volunteer</option>
          <option value="training">Training</option>
          <option value="mentorship">Mentorship</option>
        </select>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange();
          }}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Engineering">Engineering</option>
          <option value="Research">Research</option>
        </select>

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            handleFilterChange();
          }}
          className="filter-select"
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Austin">Austin</option>
          <option value="Seattle">Seattle</option>
        </select>

        <select
          value={stipend}
          onChange={(e) => {
            setStipend(e.target.value);
            handleFilterChange();
          }}
          className="filter-select"
        >
          <option value="">All Stipends</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="1000+">$1000+</option>
          <option value="2000+">$2000+</option>
        </select>
      </div>

      <button onClick={handleReset} className="reset-btn">
        Reset Filters
      </button>
    </div>
  );
};

export default SearchFilter;
