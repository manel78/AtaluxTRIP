// frontend/pages/login.js
import { useState } from 'react';
import api, { setAuthToken } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      window.location.href = '/';
    } catch (err) {
      setError('Email ou mot de passe invalide');
    }
  }

  return (
    <>
      <Header />
      <main>
        <h1>Connexion</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit">Se connecter</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
