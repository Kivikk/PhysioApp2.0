import React, { children } from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-physio-cream' flex flex-col>
      {/*Header*/}
      <header className='bg-physio-tan shadov-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <h1 className='text-2xl font-bold text-physio-chocolate'>PhysioApp</h1>
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