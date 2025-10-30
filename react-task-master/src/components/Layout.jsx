import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const navigationLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/posts', text: 'Posts' }
  ];

  const footerLinks = [
    { to: '/privacy', text: 'Privacy Policy' },
    { to: '/terms', text: 'Terms of Service' },
    { to: '/contact', text: 'Contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        brandName="Task Manager"
        links={navigationLinks}
      />
      
      <main className="flex-grow">
        {children}
      </main>

      <Footer links={footerLinks} />
    </div>
  );
};

export default Layout;