import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around">
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/cadastro">Cadastro</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/recuperacao">Recuperação de Senha</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
