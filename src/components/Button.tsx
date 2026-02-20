import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  to?: string;
  external?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  external,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950';

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 shadow-lg shadow-slate-900/50',
    outline: 'border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
