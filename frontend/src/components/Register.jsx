import { useState } from 'react';
import API from '../api';
import { Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', passwordConfirm: '', role: 'customer' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (form.password !== form.passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        if (!agreed) {
            setError('You must agree to the terms of use');
            return;
        }

        if (!form.username || !form.email || !form.password || !form.passwordConfirm) {
            setError('All fields are required');
            return;
        }

        try {
            await API.post('/auth/register', form);
            setMessage('Registration successful! You can now log in.');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
        <header className="bg-neutral-500 text-white text-center py-4 text-xl font-semibold rounded-b-lg">
            Ticketing System
        </header>
        <main className="flex flex-1 items-center justify-center">
            <form className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-xs flex flex-col gap-4 shadow" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {message && <div className="text-green-600 text-sm">{message}</div>}
            <label className="text-sm font-medium">Username</label>
            <input
                type="text"
                name="username"
                placeholder="Your username..."
                className="border rounded px-3 py-2"
                value={form.username}
                onChange={handleChange}
            />
            <label className="text-sm font-medium">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Your email address..."
                className="border rounded px-3 py-2"
                value={form.email}
                onChange={handleChange}
            />
            <label className="text-sm font-medium">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Your Password..."
                className="border rounded px-3 py-2"
                value={form.password}
                onChange={handleChange}
            />
            <label className="text-sm font-medium">Password confirmation</label>
            <input
                type="password"
                name="passwordConfirm"
                placeholder="Repeat Password..."
                className="border rounded px-3 py-2"
                value={form.passwordConfirm}
                onChange={handleChange}
            />
            <label className="flex items-center text-xs">
            <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mr-2"
            />
            I agree to Terms of use
            </label>
            <label className="text-sm font-medium">Role (temporary, will be removed)</label>
            <select
                name="role" // Role selection implemented only for testing puposes - to be removed later
                placeholder="Select your role"
                className="border rounded px-3 py-2"
                value={form.role}
                onChange={handleChange}
                required
            >
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
            </select>
            <button
                type="submit"
                className="bg-neutral-800 text-white rounded py-2 mt-2 hover:bg-neutral-700"
            >
                Register
            </button>
            <div className="flex justify-between text-xs mt-2">
                <Link to="/login" className="underline">Already registered?</Link>
            </div>
            </form>
        </main>
        <footer className="bg-neutral-500 text-white text-xs py-6 px-4 absolute bottom-0 left-0 w-full text-bold">
            © 2025 Piotr Orczykowski
        </footer>
        </div>
    );
}