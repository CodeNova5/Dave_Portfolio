import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = false,
  glassmorphism = false
}: CardProps) {
  const baseStyles = 'rounded-xl overflow-hidden transition-all duration-300';

  const glassStyles = glassmorphism
    ? 'bg-slate-800/30 backdrop-blur-xl border border-slate-700/50'
    : 'bg-slate-800/50 border border-slate-700/30';

  const hoverStyles = hover
    ? 'hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30'
    : '';

  return (
    <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
