export const authenticate = (email: string, senha: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.email === email && user.senha === senha) {
      return true;
    }
    return false;
  };
  