import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { addOrEditClient } from "../../repositories/ClientRepository";
import { useAlert } from "react-alert";
import {useShipment } from "../../context/shipmentContext";
import { useNavigate } from "react-router-dom";

export function CustomerForm({ handleClose }) {
  const alert = useAlert();
  const navigate = useNavigate();
  const { customer, setCustomer } = useShipment();
  const [client, setClient] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddres: [],
    shipping: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async () => {
    try {
      const msg = client.id ? "Customer updated cuccessfully" : "Customer created cuccessfully";
      //await addOrEditClient(client);
      handleClose();
      setCustomer(client);
      navigate("/addresses")
      alert.success(msg);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  useEffect(() => {
    if (customer) {
      setClient(customer)
    }
  }, [customer]);


  return (
    <form className="card card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[a-zA-Z ]*$/,
              message: "Please enter a valid Name"
            }
          })}
          placeholder="First Name"
          onChange={handleInputChange}
          value={client.name}
        />
      </div>
      {errors.name && <small className="text-danger animated fadeIn">{errors.name.message}</small>}

      <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("lastName", {
            required: "Last Name is required",
            pattern: {
              value: /^[a-zA-Z ]*$/,
              message: "Please enter a valid Last Name"
            }
          })}
          placeholder="Last Name"
          onChange={handleInputChange}
          value={client.lastName}
        />
      </div>
      {errors.lastName && <small className="text-danger animated fadeIn">{errors.lastName.message}</small>}

      <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          type="tel"
          className="form-control"
          {...register("phone", {
            required: "Phone is required",
            minLength: { value: 10, message: "Invalid format Phone" },
            maxLength: { value: 10, message: "Invalid format Phone" },
            pattern: { value: /^[0-9]*$/, message: "Invalid format Phone" },
          })}
          placeholder="Phone"
          onChange={handleInputChange}
          value={client.phone}
        />
      </div>
      {errors.phone && <small className="text-danger animated fadeIn">{errors.phone.message}</small>}

      <button className="btn btn-warning mt-3">
        <i className="material-icons icon">save</i>
        Save
      </button>
    </form>
  );
}
