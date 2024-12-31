import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const LoginForm = ({ handleSubmit, onSignup, error }) => {
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
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      padding: "20px",
    },
    form: {
      padding: "30px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
      width: "400px",
      maxWidth: "90%",
      textAlign: "center",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
      fontSize: "14px",
      color: "#555",
    },
    input: {
      display: "block",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      padding: "10px",
      fontSize: "16px",
      marginBottom: "10px",
    },
    button: {
      display: "block",
      width: "100%",
      backgroundColor: "#6a11cb",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    alert: {
      marginBottom: "20px",
    },
    logo: {
      width: "50px", // Adjust size as needed
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={onSubmit} style={styles.form}>
      <img src="/favicon.ico" alt="Logo" style={styles.logo} />

        {error && (
          <Alert variant="danger" style={styles.alert}>
            {error}
          </Alert>
        )}
        <h4 style={styles.header}>Login</h4>
        <Form.Group style={styles.formGroup} controlId="formBasicEmail">
          <Form.Label style={styles.label}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </Form.Group>

        <Form.Group style={styles.formGroup} controlId="formBasicPassword">
          <Form.Label style={styles.label}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>

        {/* <a
          style={styles.signupLink}
          onMouseOver={(e) => (e.target.style.color = styles.signupLinkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.signupLink.color)}
          onClick={onSignup}
          role="button"
        >
          Don't have an account? Sign up
        </a> */}
      </Form>
    </div>
  );
};

export default LoginForm;
