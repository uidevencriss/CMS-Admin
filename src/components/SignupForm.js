import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const SignupForm = ({ handleSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await handleSignup(formData);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "350px",
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
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={onSubmit} style={styles.form}>
        <h4 style={styles.header}>Sign Up</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group style={styles.formGroup} controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group style={styles.formGroup} controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group style={styles.formGroup} controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group style={styles.formGroup} controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group style={styles.formGroup} controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
