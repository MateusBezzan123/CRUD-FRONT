"use client";

export default function Home() {
  const users = [
    { nome: "João", email: "joao@example.com", endereco: "Rua 1, 123, Bairro A" },
    { nome: "Maria", email: "maria@example.com", endereco: "Rua 2, 456, Bairro B" },
  ];

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
            {users.map((user, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{user.nome}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
