import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';


const MainLayout = ({ children }) => {
  console.log('MainLayout rendering');  // Debug log
  return (
    <div className='min-h-screen bg-physio-cream/40 flex flex-col'>
      <Header />

      {/*Main Content*/}
      <main className='flex-grow'>

        <Outlet />

      </main>

      {/*Footer*/}
      <footer className='bg-physio-safari shadow-sm mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <p className='text-sm text-physio-chocolate'>©2025 PhysioApp</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;