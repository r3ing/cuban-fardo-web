import React from "react";

export default function Receives({address}) {
  return (
    <section className="contenedor">
      <div className="col-6 text-center text-uppercase">
        <h4 className="title text-center text-lg">RECIBE</h4>
        <div className="text-uppercase">
          <div className="flex items-center">
            <p className="font-bold text-gray-700 uppercase">
              <b>Beneficiario:</b>{" "}
              <span className="font-normal normal-case">
                {address.beneficiary}{" "}
              </span>
              <b>Teléfono:</b>{" "}
              <span className="font-normal normal-case">{address.phone}</span>
            </p>
          </div>
          <p className="font-bold text-gray-700 uppercase">
            <b>Dirección:</b>{" "}
            <span className="font-normal normal-case">
              {address.street !== "" && `${address.street}`}{" "}
              {address.number !== "" && `#${address.number}`}{" "}
              {address.betweenStreet !== "" && `%${address.betweenStreet}`}
              {address.locality !== "" && `, Rpto ${address.locality}`}
            </span>
            <span className="font-normal normal-case">, {address.town}</span>
            <span className="font-normal normal-case">
              , {address.province}
            </span>
            {address.ref && (
              <>
                <>, Ref:</>{" "}
                <span className="font-normal normal-case">{address.ref}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
