import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='w-full flex justify-between items-center fixed top-0 bg-zinc-300 dark:bg-zinc-800 border-b border-zinc-400 dark:border-zinc-950/20 shadow-lg' role='banner'>
      <a href='/' className='text-zinc-900 py-2 pl-3 md:pl-5 text-lg md:text-xl dark:text-zinc-200' aria-label="Home page for Chuck Norris Facts">
        Chuck Norris Facts
      </a>
    </header>
  );
};

export default Header;
