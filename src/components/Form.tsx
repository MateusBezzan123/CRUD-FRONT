import { FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const Form = ({ children, onSubmit, ...props }: FormProps) => {
  return (
    <form onSubmit={onSubmit} {...props} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {children}
    </form>
  );
};

export default Form;
