"use client";

import { useState } from 'react';

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

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [cepError, setCepError] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        setCepError('');
      } else {
        setCepError('CEP inválido. Tente novamente.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (formData.senha !== formData.confirmarSenha) {
      setFormError('As senhas não coincidem.');
      return;
    }

    if (!formData.nome || !formData.email || !formData.senha || !formData.cep) {
      setFormError('Preencha todos os campos obrigatórios.');
      return;
    }

    // Se passou nas validações
    setFormError('');
    console.log('Dados do usuário:', formData);

    // Armazenar o usuário no localStorage
    localStorage.setItem('user', JSON.stringify(formData));
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Cadastro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome Completo"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Senha"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            placeholder="Confirmar Senha"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Campo de CEP */}
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleCepChange}
            placeholder="CEP"
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {cepError && <p className="text-red-500 text-sm">{cepError}</p>}

          {/* Campos de endereço preenchidos automaticamente */}
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

          {/* Exibe erros de formulário */}
          {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
