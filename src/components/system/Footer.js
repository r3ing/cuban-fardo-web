import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor contenido">
        <p className="copyright">
          © 2022 CUBAN FARDO EXPRESS | All rights reserved
        </p>
        <nav className="footer-nav">
          <Link to="/">Facebook</Link>
          <Link to="/about">Instagrant</Link>
          <Link to="/support">Whatstapp</Link>
        </nav>
      </div>
    </footer>
  );
}
