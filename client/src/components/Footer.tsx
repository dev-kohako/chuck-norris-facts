import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className='w-full fixed bottom-0 flex justify-center items-center bg-zinc-300 dark:bg-zinc-800 border-t border-zinc-400 dark:border-zinc-950/20 drop-shadow-2xl'
      role="contentinfo"
    >
      <cite className='py-1.5 text-xs lg:text-sm dark:text-zinc-200'>
        &copy; 2024 Chuck Norris Facts
      </cite>
    </footer>
  );
};

export default Footer;