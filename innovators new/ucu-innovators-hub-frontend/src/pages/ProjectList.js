import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // ...
return (
  <div className="container mt-4">
    <div className="row">
      <div className="col-12">
        <h1 className="text-center">Approved Projects</h1>
      </div>
    </div>
    <div className="row">
      {projects.map(project => (
        <div key={project.id} className="col-md-4 mb-3">  {/* 3 columns on medium+, stack on mobile */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{project.title}</h2>
              <p className="card-text">{project.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ProjectsList;