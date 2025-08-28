import React, { useState } from 'react';
import { API_CONFIG } from './config/api';

function App() {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('password');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const loginUrl = `${API_CONFIG.backendUrl}/auth/login`;
    console.log('Attempting to log in to:', loginUrl);

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login exitoso: ' + data.access_token);
        console.log('Login successful:', data);
      } else {
        setMessage('Error de login: ' + (data.message || 'Credenciales inválidas'));
        console.error('Login error:', data);
      }
    } catch (error) {
      setMessage('Error de red o servidor: ' + (error as Error).message);
      console.error('Network or server error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>TK Soporte Login</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Backend URL: {API_CONFIG.backendUrl}</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            disabled={isLoading}
          />
          <button
            type="submit"
            style={{ 
              padding: '10px 15px', 
              borderRadius: '4px', 
              border: 'none', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              cursor: isLoading ? 'wait' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        {message && (
          <p style={{ 
            marginTop: '20px', 
            textAlign: 'center', 
            color: message.startsWith('Error') ? '#dc3545' : '#28a745',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: message.startsWith('Error') ? '#f8d7da' : '#d4edda'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;