import React, { useState } from 'react';
import axios from 'axios';

function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/evaluate', { username, password });
            setCourses(response.data.courses);
            console.log("res=> "+ JSON.stringify(response.data.courses));
        } catch (error) {
            setError('Error submitting form');
            console.error('Error:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {error && <p>{error}</p>}
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>{course.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Home