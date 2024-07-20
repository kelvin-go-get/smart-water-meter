import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import "./ViewCustomers.css"; // Import the CSS file

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" className="spinner" />;

  if (error)
    return (
      <Alert variant="danger" className="alert">
        Error loading customers: {error.message}
      </Alert>
    );

  return (
    <div className="view-customers-container">
      <h1 className="title">Customer List</h1>
      <Table striped bordered hover className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Prepaid Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.prepaidBalance}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(customer._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewCustomers;
