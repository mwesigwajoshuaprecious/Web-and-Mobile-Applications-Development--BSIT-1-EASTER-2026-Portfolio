import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalComments: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [projectsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/projects', { headers }),
          axios.get('http://localhost:5000/api/users', { headers })
        ]);

        setStats({
          totalUsers: usersRes.data.length || 0,
          totalProjects: projectsRes.data.length || 0,
          totalComments: 0
        });

        setRecentProjects(projectsRes.data.slice(0, 5) || []);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAdminData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Admin</h2>
          <p className="text-gray-600">Manage the UCU Innovators Hub platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Projects</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">{stats.totalProjects}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium">Total Comments</h3>
            <p className="text-3xl font-bold text-purple-700 mt-2">{stats.totalComments}</p>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Recent Projects</h3>
          </div>
          <div className="p-6">
            {recentProjects.length === 0 ? (
              <p className="text-gray-500">No projects yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700">Title</th>
                      <th className="px-4 py-2 text-left text-gray-700">Author</th>
                      <th className="px-4 py-2 text-left text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map(project => (
                      <tr key={project.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-800">{project.title}</td>
                        <td className="px-4 py-2 text-gray-600">{project.User?.name || 'Unknown'}</td>
                        <td className="px-4 py-2">
                          <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                            {project.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-gray-500 text-sm">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
