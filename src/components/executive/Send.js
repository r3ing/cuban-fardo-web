import React from "react";

export default function Send({customer}) {
  return (
    <section className="contenedor">
      <div className="col-6 text-center text-uppercase">
        <h4 className="title text-center">ENVÍA</h4>
        <p className="font-bold text-gray-700 uppercase">
          <b>Nombre:</b>{" "}
          <span className="font-normal normal-case">
            {customer.name} {customer.lastName}{" "}
          </span>
          <b>Teléfono:</b>{" "}
          <span className="font-normal normal-case">{customer.phone}</span>
        </p>
      </div>
    </section>
  );
}
