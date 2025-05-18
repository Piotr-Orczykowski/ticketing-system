import { useState } from 'react';
import API from './api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            onLogin && onLogin(response.data.user);
        }
        catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <form onSubmit={handeSubmit}>
            <h2>Login</h2>
            <input 
                type="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            /><br />
            <input 
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            /><br />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}