import { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditMeter = () => {
  const [meter, setMeter] = useState({
    identifier: "",
    status: "",
    customer: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch meter");
        }
        const data = await response.json();
        setMeter(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMeter();
  }, [id]);

  const handleChange = (e) => {
    setMeter({ ...meter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meter),
      });
      if (!response.ok) {
        throw new Error("Failed to update meter");
      }
      const data = await response.json();
      setSuccess("Meter updated successfully!");
      navigate("/manage-meters"); // Redirect after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Edit Meter</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Identifier</Form.Label>
          <Form.Control
            type="text"
            name="identifier"
            value={meter.identifier}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            name="status"
            value={meter.status}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control
            type="text"
            name="customer"
            value={meter.customer}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Meter
        </Button>
      </Form>
    </Container>
  );
};

export default EditMeter;
