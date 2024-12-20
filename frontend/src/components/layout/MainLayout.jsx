import React from 'react';
import logo from '../../assets/logo.svg'


const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-physio-cream flex flex-col'>
      {/*Header*/}
      <header className='bg-physio-tan shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'> {/* Flex-Container für Logo und Text */}
              <img
                src={logo}
                alt="PhysioApp Logo"
                className="h-16 w-auto"
              />
              <h1 className='text-2xl font-bold text-physio-chocolate ml-3'>PhysioApp</h1>
            </div>
            <button className='px-4 py-2 rounded-md bg-physio-chocolate text-physio-cream hover:bg-physio-amber transition-colors duration-200'>
              Login
            </button>
          </div>
        </div>
      </header>

      {/*Main Content*/}
      <main className='flex-grow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 '>
          {children}
        </div>
      </main>

      {/*Footer*/}
      <footer className='bg-physio-tan shadow-sm mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <p className='text-sm text-physio-chocolate'>©2025 PhysioApp</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;