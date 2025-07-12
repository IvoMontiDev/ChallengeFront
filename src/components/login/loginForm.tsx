import { useState } from 'react';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './loginStyles/LoginForm.css';
export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok || !data.token || !data.username) {
      throw new Error(data.message);
    }

    login(data.token, { username: data.username });
    navigate('/');
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error desconocido');
    setIsLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-icon"><FiLogIn /></div>
      <h2 className="login-title">Iniciar Sesión</h2>
      <p className="login-subtitle">Ingresa tus credenciales para acceder</p>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <h2 className="input-title">Usuario</h2>
          <div className="input-wrapper">
            <span className="icon"><FiUser /></span>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="input-group">
          <h2 className="input-title">Contraseña</h2>
          <div className="input-wrapper">
            <span className="icon"><FiLock /></span>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}