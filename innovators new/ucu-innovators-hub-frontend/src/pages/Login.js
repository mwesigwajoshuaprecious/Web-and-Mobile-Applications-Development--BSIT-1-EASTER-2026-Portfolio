import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);

      // Decode role
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      const role = payload.role;

      // Full reload → forces App.jsx to read token and show correct dashboard
      if (role === 'student') window.location.href = '/student';
      else if (role === 'supervisor') window.location.href = '/supervisor';
      else if (role === 'admin') window.location.href = '/admin';
      else window.location.href = '/';

    } catch (err) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">UCU Innovators Hub</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded mb-4" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 border rounded mb-4" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Login
        </button>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
}