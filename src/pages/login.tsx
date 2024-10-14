"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Função para buscar o endereço baseado no CEP
const fetchCep = async (cep: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('user');

    if (isRegistering) {
      // Lógica de cadastro
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email) {
          setMessage('Erro: Email já cadastrado.');
        } else {
          localStorage.setItem(
            'user',
            JSON.stringify({ email, senha: password, ...formData })
          );
          setMessage('Cadastro realizado com sucesso!');
        }
      } else {
        localStorage.setItem(
          'user',
          JSON.stringify({ email, senha: password, ...formData })
        );
        setMessage('Cadastro realizado com sucesso!');
      }
    } else {
      // Lógica de login
      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.email === email && user.senha === password) {
          setMessage('Login realizado com sucesso!');
          setTimeout(() => {
            router.push('/home');
          }, 1000);
        } else {
          setMessage('Erro: Email ou senha incorretos.');
        }
      } else {
        setMessage('Erro: Nenhum usuário registrado encontrado.');
      }
    }
  };

  // Função para buscar o endereço baseado no CEP digitado
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    setFormData({ ...formData, cep });

    if (cep.length === 8) {
      const cepData = await fetchCep(cep);
      if (cepData) {
        setFormData({
          ...formData,
          rua: cepData.logradouro,
          bairro: cepData.bairro,
          cidade: cepData.localidade,
          estado: cepData.uf,
        });
        setMessage('');
      } else {
        setMessage('CEP inválido. Tente novamente.');
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
          {isRegistering && (
            <>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome Completo"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleCepChange}
                placeholder="CEP"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                placeholder="Rua"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Número"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Bairro"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                placeholder="Estado"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </>
          )}

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
