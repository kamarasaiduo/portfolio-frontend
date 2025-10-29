import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function OAuthDebugger() {
    const { user, isAuthenticated, isAdmin } = useAuth();
    const [testResult, setTestResult] = useState('');

    const testOAuthEndpoint = async () => {
        try {
            setTestResult('Testing OAuth endpoint...');
            const response = await fetch('http://localhost:8080/api/oauth/success', {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });
            
            const data = await response.json();
            setTestResult(`Status: ${response.status}\nData: ${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            setTestResult(`Error: ${error.message}`);
        }
    };

    const testOAuthConfig = async () => {
        try {
            setTestResult('Testing OAuth config...');
            const response = await fetch('http://localhost:8080/api/oauth-test/config', {
                headers: {
                    'Accept': 'application/json',
                },
            });
            
            const data = await response.json();
            setTestResult(`Config: ${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            setTestResult(`Config Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">OAuth Debugger</h2>
            
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Current Auth State:</h3>
                <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                <p><strong>User:</strong> {user ? user.email : 'None'}</p>
                <p><strong>Role:</strong> {user ? user.role : 'None'}</p>
                <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
            </div>

            <div className="space-y-2 mb-4">
                <button
                    onClick={testOAuthEndpoint}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Test OAuth Success Endpoint
                </button>
                <button
                    onClick={testOAuthConfig}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Test OAuth Config
                </button>
            </div>

            {testResult && (
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold mb-2">Test Result:</h3>
                    <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
                </div>
            )}
        </div>
    );
}
