import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAnalytics } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../hooks/useAuth';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchAnalytics = async () => {
        const { data } = await getAnalytics();
        setAnalytics(data);
      };
      fetchAnalytics();
    }
  }, [user]);

  const chartData = {
    labels: analytics.projectsPerFaculty?.map(f => f.faculty) || [],
    datasets: [{ label: 'Projects per Faculty', data: analytics.projectsPerFaculty?.map(f => f.count) || [] }],
  };
  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Dashboard</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
