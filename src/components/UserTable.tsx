interface User {
  nome: string;
  email: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <table className="table-auto w-full bg-white shadow-md rounded my-6">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Nome</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Endereço</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="bg-gray-100 border-t">
            <td className="px-4 py-2">{user.nome}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{`${user.rua}, ${user.numero} - ${user.bairro}, ${user.cidade} - ${user.estado}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
