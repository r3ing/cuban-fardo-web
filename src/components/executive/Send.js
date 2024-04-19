import React from "react";
import { useShipment } from "../../context/shipmentContext";

export default function Send() {
  const { customer } = useShipment();
  return (
    <div className="col-6 text-center text-uppercase">
      <h5 className="title text-center">ENVÍA</h5>
      <p className="font-bold text-gray-700 uppercase">
        <b>Nombre:</b>{" "}
        <span className="font-normal normal-case">
          {customer.name} {customer.lastName}{" "}
        </span>{" "}
        <b> Teléfono:</b>{" "}
        <span className="font-normal normal-case">{customer.phone}</span>
      </p>
    </div>
  );
}
