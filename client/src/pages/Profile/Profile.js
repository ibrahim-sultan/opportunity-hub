import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    experience: user?.experience || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // Here you would typically make an API call to update the profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-section">
            <h2>Personal Information</h2>
            {isEditing ? (
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className="profile-info">
                <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
              </div>
            )}
          </div>

          <div className="profile-section">
            <h2>About Me</h2>
            {isEditing ? (
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>
            ) : (
              <p>{user?.bio || 'No bio provided'}</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Skills & Experience</h2>
            {isEditing ? (
              <div className="form-group">
                <label>Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    skills: e.target.value.split(',').map(skill => skill.trim())
                  }))}
                  placeholder="JavaScript, React, Node.js"
                />
                <label>Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe your experience..."
                />
              </div>
            ) : (
              <div>
                <p><strong>Skills:</strong> {user?.skills?.join(', ') || 'No skills added'}</p>
                <p><strong>Experience:</strong> {user?.experience || 'No experience provided'}</p>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="profile-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
