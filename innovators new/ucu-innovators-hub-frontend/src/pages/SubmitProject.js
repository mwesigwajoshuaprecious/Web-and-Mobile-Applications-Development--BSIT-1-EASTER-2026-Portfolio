import React, { useState } from 'react';
import { submitProject } from '../services/api';

const SubmitProject = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', technologies: '', githubLink: '',
    faculty: '', department: '', year: '', teamMembers: '', document: null
  });

  const onChange = (e) => {
    if (e.target.name === 'document') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    try {
      await submitProject(data);
      alert('Project submitted');
    } catch (err) {
      console.error(err);
    }
  };

  return (
     <div className="container">
      <div className="card">
        <h2>Submit New Project</h2>

        <form onSubmit={onSubmit} encType="multipart/form-data">
          <input name="title" onChange={onChange} placeholder="Project Title" />

          <textarea
            name="description"
            onChange={onChange}
            placeholder="Project Description"
          ></textarea>

          <input name="category" onChange={onChange} placeholder="Category" />

          <input
            name="technologies"
            onChange={onChange}
            placeholder="Technologies Used"
          />

          <input
            name="githubLink"
            onChange={onChange}
            placeholder="GitHub Link"
          />

          <input name="faculty" onChange={onChange} placeholder="Faculty" />

          <input
            name="department"
            onChange={onChange}
            placeholder="Department"
          />

          <input
            name="year"
            type="number"
            onChange={onChange}
            placeholder="Year"
          />

          <input
            name="teamMembers"
            onChange={onChange}
            placeholder="Team Members"
          />

          <input type="file" name="document" onChange={onChange} />

          <div className="btn-group">
            <button type="submit" className="btn-primary">
              Submit Project
            </button>

            <button type="button" className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
  
export default SubmitProject;