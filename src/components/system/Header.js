import React from 'react';
import { Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import logo from '../../assets/img/logo.png';

export function Header() {
  const { loginWithGoogle, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
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
            {user ? <> <NavLink
              to="/customers"
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
            {/* <Link
              to="/"
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              About us
            </Link>
            <Link
              to="/"
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              Help
            </Link> */}
            {!user ? (
              <Link to="#" onClick={handleLoginWithGoogle}>
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
