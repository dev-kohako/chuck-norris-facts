import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header className='w-full flex justify-between items-center fixed bg-zinc-300 dark:bg-zinc-900 border-b border-zinc-400 dark:border-zinc-950 drop-shadow-2xl'>
        <a href='/' className='text-zinc-900 py-2 pl-3 font-Pixelify' aria-label="Home page for Chuck Norris Facts">
          Chuck Norris Facts
        </a>
      </header>
    );
  }
}
