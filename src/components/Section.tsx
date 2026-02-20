import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
  id?: string;
}

export default function Section({
  children,
  className = '',
  container = true,
  id
}: SectionProps) {
  const content = container ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : children;

  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      {content}
    </section>
  );
}
