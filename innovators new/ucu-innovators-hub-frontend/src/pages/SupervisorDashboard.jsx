import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SupervisorDashboard() {
  const [pendingProjects, setPendingProjects] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/public', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // Show only pending (you can improve backend later)
        setPendingProjects(res.data.filter(p => p.status === 'pending'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.put(`http://localhost:5000/api/projects/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(`Project ${action === 'approve' ? 'Approved' : 'Rejected'}!`);
      window.location.reload();
    } catch (err) {
      alert('Failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="text-4xl font-bold mb-8">Supervisor Dashboard - Pending Projects</h1>
        
        {pendingProjects.length === 0 ? (
          <p className="text-xl text-gray-500">No pending projects at the moment.</p>
        ) : (
          <div className="space-y-6">
            {pendingProjects.map(project => (
              <div key={project.id} className="bg-white rounded-3xl shadow p-8">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <p className="text-sm text-gray-500 mt-4">Submitted by: {project.User?.name}</p>

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={() => handleAction(project.id, 'approve')}
                    className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700"
                  >
                    ✅ Approve
                  </button>
                  <button 
                    onClick={() => handleAction(project.id, 'reject')}
                    className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}