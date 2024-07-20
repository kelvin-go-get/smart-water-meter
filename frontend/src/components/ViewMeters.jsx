import { useEffect, useState } from "react";
import "./MetersList.css"; // Import the CSS file

const MetersList = () => {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const response = await fetch("/api/meters/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const mappedData = data.map((item) => ({
          meterId: item._id,
          identifier: item.identifier,
          status: item.status,
          customer: {
            customerId: item.customer._id,
            name: item.customer.name,
            email: item.customer.email,
            prepaidBalance: item.customer.prepaidBalance,
          },
        }));

        setMeters(mappedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMeters();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Meters List</h1>
      <table className="meters-table">
        <thead>
          <tr>
            <th>Meter ID</th>
            <th>Identifier</th>
            <th>Status</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Prepaid Balance</th>
          </tr>
        </thead>
        <tbody>
          {meters.map((meter) => (
            <tr key={meter.meterId}>
              <td>{meter.meterId}</td>
              <td>{meter.identifier}</td>
              <td>{meter.status}</td>
              <td>{meter.customer.customerId}</td>
              <td>{meter.customer.name}</td>
              <td>{meter.customer.email}</td>
              <td>{meter.customer.prepaidBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetersList;
