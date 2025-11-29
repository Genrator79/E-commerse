import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import Card from '../components/Common/Card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            // Error handled in context
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <h2 className="text-3xl font-sans font-bold text-center mb-8">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
                <p className="mt-6 text-center text-soft-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default Login;
