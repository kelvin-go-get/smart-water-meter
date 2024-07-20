/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { useGetReadingsQuery } from "../slices/apiSlice";

const ViewReadings = () => {
  const { data: readings = [], isLoading, error } = useGetReadingsQuery();

  if (isLoading) return <Spinner animation="border" />;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Meter</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {readings.map((reading) => (
          <tr key={reading._id}>
            <td>{reading.meter.identifier}</td>
            <td>{reading.value}</td>
            <td>{new Date(reading.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ViewReadings;
