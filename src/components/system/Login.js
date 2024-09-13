import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ROUTE_HOME } from "../utils/Constant";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const { login, currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(ROUTE_HOME);
    } catch (error) {
      setError("Usuario o contraseña incorrecta!");
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if (currentUser) {
        await logout();
      }
    };
    checkIfLoggedIn();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
       <div className="w-100" style={{ maxWidth: "50vh" }}>
       <h2 className="text-center mb-4 title">Bienvenido a PACKRUNNER</h2>
        <Card>
          <Card.Body>            
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="password" className="mt-2">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <small className="text-danger animated fadeIn mt-4 ">
                {error}
              </small>
              <Button disabled={loading} className="w-100 mt-3 btn-warning" type="submit">
                Entrar
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
