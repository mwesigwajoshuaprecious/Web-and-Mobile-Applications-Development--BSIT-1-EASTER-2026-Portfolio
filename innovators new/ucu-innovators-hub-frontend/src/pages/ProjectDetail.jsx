import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/public`)
      .then(res => {
        const found = res.data.find(p => p.id === parseInt(id));
        setProject(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!project) return <p className="text-center mt-20 text-xl">Loading project...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
        
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold">Faculty</p>
            <p>{project.faculty}</p>
          </div>
          <div>
            <p className="font-semibold">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((t, i) => (
                <span key={i} className="bg-blue-100 px-4 py-1 rounded-full text-sm">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {project.githubLink && (
          <a href={project.githubLink} target="_blank" className="mt-8 inline-block text-blue-600 text-xl hover:underline" rel="noreferrer">
            View on GitHub →
          </a>
        )}
        
        {project.document && (
          <a href={`http://localhost:5000${project.document}`} target="_blank" className="block mt-4 text-blue-600" rel="noreferrer">
            📄 Download Project Document (PDF)
          </a>
        )}
      </div>
    </div>
  );
}