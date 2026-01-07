// frontend/components/Header.js
import Link from 'next/link';
import { useEffect } from 'react';
import { setAuthToken } from '../utils/api';

export default function Header() {
  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;
    if (token) setAuthToken(token);
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setAuthToken(null);
    window.location.href = '/';
  }

  return (
    <header>
      <nav>
        <Link href="/">Accueil</Link> |{' '}
        <Link href="/login">Connexion</Link> |{' '}
        <Link href="/register">Inscription</Link> |{' '}
        <button onClick={logout}>Déconnexion</button>
      </nav>
    </header>
  );
}

  