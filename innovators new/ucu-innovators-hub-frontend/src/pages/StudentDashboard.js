import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [userName, setUserName] = useState('');
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Get user name from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.name || 'Student');
    }
  }, []);

  // Fetch student's own projects
  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/my', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyProjects();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Form state
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', technologies: '', 
    githubLink: '', faculty: '', department: '', teamMembers: ''
  });
  const [documentFile, setDocumentFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(formData).forEach(key => fd.append(key, formData[key]));
    if (documentFile) fd.append('document', documentFile);

    try {
      await axios.post('http://localhost:5000/api/projects', fd, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      alert('Project submitted successfully!');
      setShowForm(false);
      window.location.reload(); // refresh list
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <button 
            onClick={logout}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-4xl font-bold">Welcome, {userName}!</h2>
          <p className="text-gray-600 mt-2">Manage and submit your innovative projects</p>
        </div>

        {/* My Projects Section - exactly like your screenshot */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">My Projects</h3>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              + Submit New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-10 text-center">
              <p className="text-gray-500">No projects submitted yet. Start by submitting your first project!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {projects.map(p => (
                <div key={p.id} className="bg-gray-50 p-6 rounded-xl flex justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{p.title}</h4>
                    <p className="text-sm text-gray-500">{p.status.toUpperCase()}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-medium ${p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <h3 className="text-2xl font-bold mb-6">Submit New Project</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input 
                type="text" 
                placeholder="Project Title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                placeholder="Project Description" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <input 
                type="text" 
                placeholder="Category" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                placeholder="Technologies Used" 
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="url" 
                placeholder="GitHub Link" 
                value={formData.githubLink}
                onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                placeholder="Faculty" 
                value={formData.faculty}
                onChange={(e) => setFormData({...formData, faculty: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                placeholder="Department" 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                placeholder="Team Members" 
                value={formData.teamMembers}
                onChange={(e) => setFormData({...formData, teamMembers: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <label className="block text-gray-700 font-medium mb-2">Upload Document (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700">
                Submit Project
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="w-full text-gray-500 py-3">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}