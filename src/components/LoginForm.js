import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const LoginForm = ({ handleSubmit, onSignup,error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    handleSubmit({ email, password });
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
    },
    form: {
      padding: "30px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "400px",
    },
    header: {
      textAlign: "center",
      marginBottom: "15px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    button: {
      display: "block",
      margin: "20px auto 0",
      width: "100%",
    },
    signupLink: {
      display: "block",
      textAlign: "center",
      marginTop: "10px",
      color: "#007bff",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
        
      <Form onSubmit={onSubmit} style={styles.form}>
      {error && <Alert variant="danger">{error}</Alert>}
        <h4 style={styles.header}>Login</h4>
        <Form.Group style={styles.formGroup} controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group style={styles.formGroup} controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>

        <a style={styles.signupLink} onClick={onSignup} role="button">
          Don't have an account? Sign up
        </a>
      </Form>
    </div>
  );
};

export default LoginForm;
