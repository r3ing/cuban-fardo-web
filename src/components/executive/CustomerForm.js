import React from 'react';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addOrEditClient } from "../../repositories/ClientRepository";
import { useAlert } from "react-alert";
import {useShipment } from "../../context/shipmentContext";
import { useNavigate } from "react-router-dom";
import { useOffice } from "../../context/officeContex";
import {ROUTE_ADDRESSES} from '../common/Costanst'

export function CustomerForm({ handleClose }) {
  const alert = useAlert();
  const navigate = useNavigate();
  const { customer, setCustomer } = useShipment();
  const { office } = useOffice();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      let msg = '';
      
      if(!customer.id) {
        msg = "Cliente creado exitosamente.";
        customer.branch = office.state;
      } else {
        msg = "Cliente actualizado exitosamente.";
      }

      await addOrEditClient(customer);
      handleClose();
      navigate(ROUTE_ADDRESSES)
      alert.success(msg);      
    } catch (error) {
      alert.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value.toUpperCase() });
  };

  useEffect(() => {
    if (customer) {
      setValue("name", customer.name);
      setValue("lastName", customer.lastName);
      setValue("phone", customer.phone);
    }
  }, [customer, setValue]);


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
            required: "Agregue el nombre del cliente.",
            pattern: {
              value:  /^[a-zA-ZáéíóúñÑ ]*$/,
              message: "Escriba un nombre de cliente válido."
            }
          })}
          placeholder="Nombre"
          onChange={handleInputChange}          
        />
      </div>
      {errors.name && <small className="text-danger animated fadeIn">{errors.name.message}</small>}

      <div className="form-group input-group mt-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("lastName", {
            required: "Agregue el apellido del cliente.",
            pattern: {
              value: /^[a-zA-ZáéíóúñÑ ]*$/,
              message: "Escriba un apellido válido."
            }
          })}
          placeholder="Apellidos"
          onChange={handleInputChange}
        />
      </div>
      {errors.lastName && <small className="text-danger animated fadeIn">{errors.lastName.message}</small>}

      <div className="form-group input-group mt-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          type="tel"
          className="form-control"
          {...register("phone", {
            required: "Agregue un número de teléfono.",
            minLength: { value: 10, message: "Agregue un teléfono válido." },
            maxLength: { value: 10, message: "Agregue un teléfono válido." },
            pattern: { value: /^[0-9]*$/, message: "Agregue un teléfono válido." },
          })}
          placeholder="Teléfono"
          onChange={handleInputChange}
        />
      </div>
      {errors.phone && <small className="text-danger animated fadeIn">{errors.phone.message}</small>}

      <button className="btn btn-warning mt-2">
        <i className="material-icons icon">save</i>
        Guardar
      </button>
    </form>
  );
}
