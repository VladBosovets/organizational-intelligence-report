import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Network, AlertTriangle, Target } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/dependencies', label: 'Dependencies', icon: Network },
    { path: '/risk', label: 'Risk Analysis', icon: AlertTriangle },
    { path: '/efficiency', label: 'Efficiency', icon: Target }
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-md border-b border-secondary-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">
                Org Intelligence
              </h1>
              <p className="text-xs text-secondary-600">
                Repository Analysis
              </p>
            </div>
          </Link>
          
          {location.pathname !== '/' && (
            <nav className="flex space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg
                    transition-colors duration-200
                    ${isActive(path)
                      ? 'bg-primary-500 text-white'
                      : 'text-secondary-700 hover:bg-secondary-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// Made with Bob
