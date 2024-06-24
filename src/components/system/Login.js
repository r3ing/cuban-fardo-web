import React, { useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ROUTE_HOME } from "../utils/Constant";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleLoginWithGoogle = async () => {
  //   try {
  //     await loginWithGoogle();
  //     navigate(ROUTE_HOME);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    
    try {      
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(ROUTE_HOME);
    } catch(error) {       
      setError("Usuario o contraseña incorrecta!");
      setLoading(false);
    }
  }

  //if(currentUser) logout();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {currentUser && currentUser.email}
      <div className="w-100" style={{ maxWidth: "100vh" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Bienvenido a PACKRUNNER</h2>            
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="mt-2">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <small className="text-danger animated fadeIn mt-4 ">
                {error}
              </small>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
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
