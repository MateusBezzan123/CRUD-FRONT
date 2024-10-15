"use client";

import { useState, useEffect } from 'react';

interface User {
  nome: string;
  email: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      setUsers(users); 
    } else {
      console.error('Nenhum usuário encontrado no localStorage.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Lista de Usuários</h1>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{user.nome}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {`${user.rua}, ${user.numero}, ${user.bairro}, ${user.cidade}, ${user.estado}`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2" colSpan={3}>
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

