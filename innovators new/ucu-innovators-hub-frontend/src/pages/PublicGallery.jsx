import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PublicGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/public');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center text-xl mt-10">Loading approved projects...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Approved Projects</h1>

      {projects.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No approved projects yet. Be the first to submit one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies && project.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Faculty: <span className="font-medium">{project.faculty}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Submitted by: <span className="font-medium">{project.User?.name || 'Unknown'}</span>
              </p>

              <div className="flex gap-3">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    GitHub →
                  </a>
                )}
                <Link 
                  to={`/project/${project.id}`} 
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}