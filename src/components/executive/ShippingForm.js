import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";

export function ShippingForm({ handleClose, createShipment }) {

  const [shipping, setShipping] = useState({
    weight: 0,
    amount: 0,
    details: ''
  });
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = () => {
      handleClose();
      createShipment(shipping.weight, shipping.amount, shipping.details);
      
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">score</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("weight", {
            required: "Weight is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Please enter a valid Weight"
            }
          })}
          placeholder="Weight in lb"
          onChange={handleInputChange}
          value={shipping.weight}
        />
      </div>
      {errors.weight && <small className="text-danger animated fadeIn">{errors.weight.message}</small>}

      <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">payments</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("amount", {
            required: "Amount is required",
            min: {
              value: 1,
              message: "Please enter a valid Amount"
            },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Please enter a valid Amount"
            }
          })}
          placeholder="Amount"
          onChange={handleInputChange}
          value={shipping.amount}
        />
      </div>
      {errors.amount && <small className="text-danger animated fadeIn">{errors.amount.message}</small>} 

      <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">info</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("details", {
            pattern: {
              value: /^[ +a-zA-Z0-9_-]+$/,
              message: "Please enter a valid Detail"
            }
          })}
          placeholder="Details"
          onChange={handleInputChange}
          value={shipping.details}
        />
      </div>
      {errors.details && <small className="text-danger animated fadeIn">{errors.details.message}</small>}     

      <button className="btn btn-warning mt-3">
        <i className="material-icons icon">save</i>
        Save
      </button>

    </form>
  );
}
