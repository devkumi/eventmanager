import React, {useEffect, useState} from 'react'
import { Outlet, Link,useNavigate } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';

export const Layout = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {

    reactLocalStorage.set('login', false);
    navigate('/login');
    // console.log('Logout');
  };

  const login = reactLocalStorage.get('login');
  useEffect(() => {
    // console.log(login)
    if (login === undefined || login === "false") {
      handleLogout()
    }
  });


  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
