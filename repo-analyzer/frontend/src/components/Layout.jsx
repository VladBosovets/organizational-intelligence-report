import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <footer className="bg-secondary-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Powered by <span className="font-semibold">IBM Bob AI</span>
          </p>
          <p className="text-xs text-secondary-400 mt-2">
            Organizational Intelligence Report v1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

// Made with Bob
