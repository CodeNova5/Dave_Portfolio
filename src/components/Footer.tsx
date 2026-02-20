import { Link } from 'react-router-dom';
import { Terminal, MessageCircle, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const socials = [
    { icon: MessageCircle, href: 'https://wa.me/2349072089091', label: 'WhatsApp' },
    { icon: Phone, href: 'tel:+2349072089091', label: 'Phone' },
    { icon: Mail, href: 'mailto:codenova02@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <Terminal className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="text-xl font-bold text-white">Dave</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Systems builder and AI automation engineer. Creating solutions that scale businesses efficiently.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            {currentYear} Dave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
