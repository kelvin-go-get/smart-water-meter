import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddCustomerMutation } from "../slices/apiSlice";
import FormContainer from "./FormContainer";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addCustomer, { isLoading, error, isSuccess }] =
    useAddCustomerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer({ name, email }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <Form className="addCustomer" onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Customer"}
        </Button>
        {error && (
          <Alert style={{ color: "black" }} variant="danger">
            {error.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert style={{ color: "black" }} variant="success">
            Customer added successfully!
          </Alert>
        )}
      </Form>
    </FormContainer>
  );
};

export default AddCustomer;
