import React from 'react';
import { Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import logo from '../../assets/img/logo.png';
import { ROUTE_CUSTOMERS, ROUTE_LOGIN } from '../utils/Constant'

export function Header() {
  const {  currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTE_LOGIN);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="barra">
          <Link to="/">
            <Image
              alt="Qvan Fardo Express"
              src={logo}
              width={300}
              height={120}
            />
          </Link>
          <nav className="navegacion">
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              Home
            </NavLink> */}
            {currentUser ? <> <NavLink
              to={ROUTE_CUSTOMERS}
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              Clientes
            </NavLink>
              {/* <NavLink
              to="/shipping"
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              Shippings
            </NavLink> */}
            </> : null}            
            {!currentUser ? (
              <Link to={ROUTE_LOGIN}>
                Entrar
              </Link>
            ) : (
              <Link to="#" onClick={handleLogout}>
                Salir
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
