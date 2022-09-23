import { Image } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export function Header() {
  const { loginWithGoogle, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/shippings");
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
              alt="Cuban Fardo"
              src="/img/logo.svg"
              width={300}
              height={100}
            />
          </Link>
          <nav className="navegacion">
            <NavLink
              to="/"
              class={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? "navegacion-active" : ""
                }
              >
                Customers
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/shipping"
                className={({ isActive }) =>
                  isActive ? "navegacion-active" : ""
                }
              >
                Shippings
              </NavLink>
            )}

            <Link
              to="/about"
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              About us
            </Link>
            <Link
              to="/support"
              className={({ isActive }) =>
                isActive ? "navegacion-active" : ""
              }
            >
              Help
            </Link>
            {!user ? (
              <Link to="#" onClick={handleLoginWithGoogle}>
                Sign In
              </Link>
            ) : (
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
