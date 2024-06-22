import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className='w-full fixed bottom-0 flex justify-center items-center bg-zinc-300 dark:bg-zinc-900 border-t border-zinc-400 dark:border-zinc-950 drop-shadow-2xl'>
        <cite className='py-1.5 text-xs'>&copy; 2024 Chuck Norris Facts</cite>
      </footer>
    );
  }
}