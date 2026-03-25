import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'student',
    faculty: '', department: ''
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      alert('Account created successfully!');
      window.location.href = '/login';   // go to login after register
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Create Account</h2>
        
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-xl mb-4" 
          value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        
        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl mb-4" 
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl mb-4" 
          value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        
        <select className="w-full p-3 border rounded-xl mb-4" 
          value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="student">Student</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
        
        <input type="text" placeholder="Faculty (e.g. Computing)" className="w-full p-3 border rounded-xl mb-4" 
          value={form.faculty} onChange={e => setForm({...form, faculty: e.target.value})} />
        
        <input type="text" placeholder="Department (e.g. IT)" className="w-full p-3 border rounded-xl mb-6" 
          value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
        
        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700">
          Register
        </button>
        
        <p className="text-center mt-6 text-sm">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </form>
    </div>
  );
}