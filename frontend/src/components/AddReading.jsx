import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAddReadingMutation } from "../slices/apiSlice";

const AddReading = () => {
  const [meter, setMeter] = useState("");
  const [value, setValue] = useState("");
  const [addReading, { isLoading, error, isSuccess }] = useAddReadingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReading({ meter, value }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="meter">
        <Form.Label>Meter</Form.Label>
        <Form.Control
          type="text"
          value={meter}
          onChange={(e) => setMeter(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="value">
        <Form.Label>Value</Form.Label>
        <Form.Control
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Reading"}
      </Button>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {isSuccess && (
        <Alert variant="success">Reading added successfully!</Alert>
      )}
    </Form>
  );
};

export default AddReading;
