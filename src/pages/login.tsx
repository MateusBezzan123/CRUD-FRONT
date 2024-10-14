"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('user');

    if (isRegistering) {
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email) {
          setMessage('Erro: Email já cadastrado.');
        } else {
          localStorage.setItem(
            'user',
            JSON.stringify({ email, senha: password })
          );
          setMessage('Cadastro realizado com sucesso!');
        }
      } else {
        localStorage.setItem(
          'user',
          JSON.stringify({ email, senha: password })
        );
        setMessage('Cadastro realizado com sucesso!');
      }
    } else {
      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.email === email && user.senha === password) {
          setMessage('Login realizado com sucesso!');
          setTimeout(() => {
            router.push('/home');
          }, 0);
        } else {
          setMessage('Erro: Email ou senha incorretos.');
        }
      } else {
        setMessage('Erro: Nenhum usuário registrado encontrado.');
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setMessage('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isRegistering ? 'Cadastrar-se' : 'Entrar'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Senha"
          />

          {message && (
            <p className={`text-sm text-center ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-4">
          {isRegistering ? (
            <p className="text-sm">
              Já tem uma conta?{' '}
              <button
                onClick={toggleForm}
                className="text-purple-500 hover:text-purple-700 font-semibold"
              >
                Faça login aqui
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Não tem uma conta?{' '}
              <button
                onClick={toggleForm}
                className="text-purple-500 hover:text-purple-700 font-semibold"
              >
                Cadastre-se aqui
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
