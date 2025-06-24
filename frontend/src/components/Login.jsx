import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.user.role);

            //Navigate based on user role
            switch (response.data.user.role) {
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                case 'agent':
                    navigate('/agent-dashboard');
                    break;
                case 'customer':
                    navigate('/customer-dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
        catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-neutral-500 text-white text-center py-4 text-xl font-semibold rounded-b-lg">
        Ticketing System
      </header>
      <main className="flex flex-1 items-center justify-center">
        <form className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-xs flex flex-col gap-4 shadow" onSubmit={handleSubmit}>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Your email address..."
            className="border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Your Password..."
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-neutral-800 text-white rounded py-2 mt-2 hover:bg-neutral-700"
          >
            Sign In
          </button>
          <div className="flex justify-between text-xs mt-2">
            <a href="#" className="underline">Forgot password?</a>
            <Link to="/register" className="underline">Not registered?</Link>
          </div>
        </form>
      </main>
      <footer className="bg-neutral-500 text-white text-xs py-6 px-4 absolute bottom-0 left-0 w-full text-bold">
        © 2025 Piotr Orczykowski
      </footer>
    </div>
  );
}