/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { setCountry } from '../../redux/country/country';
import './Nav.css';

const Nav = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((openMenu) => !openMenu);
  };

  const countrySelect = (country) => {
    setCountry(dispatch, country);
  };

  const links = [
    {
      path: 'continents',
      text: 'Continents',
    },
  ];

  return (
    <nav className="navBar">
      <div className="logo-container">
        <h1>World Pollution</h1>
      </div>
      {openMenu ? (<AiOutlineClose onClick={() => toggleMenu()} className="menu-icon" />) : (<AiOutlineMenu onClick={() => toggleMenu()} className="menu-icon" />)}
      <ul className="navUl">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className="nav-link"
              onClick={() => { countrySelect({}); }}
            >
              <span>{link.text.toUpperCase()}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
