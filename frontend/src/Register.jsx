import { useState } from 'react';
import API from './api';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'customer' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await API.post('/auth/register', form);
            setMessage('Registration successful! You can now log in.');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                name="username"
                placeholder='Username'
                value={form.username}
                onChange={handleChange}
                required
            /><br />
            <input 
                type="email"
                name="email"
                placeholder='Email'
                value={form.email}
                onChange={handleChange}
                required
            /><br />
            <input 
                type="password"
                name="password"
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                required
            /><br />
            <select name="role" value={form.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
            </select><br />
            <button type="submit">Register</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}