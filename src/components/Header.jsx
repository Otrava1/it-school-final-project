import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <Link className='navbutton' to="/">Home</Link>
      <Link className='navbutton' to="/library"> Game Library</Link>
      <Link className='navbutton' to='/collection'>Your Collection</Link>
    </header>
  );
}
