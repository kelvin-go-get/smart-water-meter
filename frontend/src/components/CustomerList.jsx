/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../slices/customerSlice";

const CustomerList = () => {
  const dispatch = useDispatch();
  const {
    customers = [],
    status,
    error,
  } = useSelector((state) => state.customers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCustomers());
    }
  }, [dispatch, status]);

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <ul>
          {Array.isArray(customers) ? (
            customers.map((customer) => (
              <li key={customer._id}>
                {customer.name} - {customer.email}
              </li>
            ))
          ) : (
            <p>No customers found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
