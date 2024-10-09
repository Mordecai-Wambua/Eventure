import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import '../styles/navigation.css';

export default function Navigation() {
  return (
    <>
      <div className='container'>
        <img
          className='w-44 h-14 cursor-pointer'
          src={assets.logo}
          alt='logo'
        />
        <ul>
          <NavLink>
            <li>Home</li>
            <hr />
          </NavLink>
          <NavLink>
            <li>About</li>
            <hr />
          </NavLink>
          <NavLink>
            <li>Contact</li>
            <hr />
          </NavLink>
        </ul>
      </div>
    </>
  );
}
