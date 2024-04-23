import React from "react";
import { useShipment } from "../../context/shipmentContext";

export default function Receives() {
  const { address } = useShipment();
  return (
    <div className="col-6 text-center text-uppercase">
      <h5 className="title text-center text-lg">RECIBE</h5>
      <div className="text-uppercase">
        <p className="font-bold text-gray-700 uppercase">
          <b>Beneficiario:</b>{" "}
          <span className="font-normal normal-case">
            {address.beneficiary}{" "}
          </span>
          <b>Teléfono:</b>{" "}
          <span className="font-normal normal-case">{address.phone}</span>
          {address.ci && (
            <span className="font-normal normal-case">
              <b> CI: </b>
              {address.ci}
            </span>
          )}
        </p>
        <p className="font-bold text-gray-700 uppercase">
          <b>Dirección:</b>{" "}
          <span className="font-normal normal-case">
            {address.street !== "" && `${address.street}`}
            {address.number !== "" && ` #${address.number}`}
            {address.betweenStreet !== "" && ` e/ ${address.betweenStreet}`}
            {address.locality !== "" && `, ${address.locality}`}
          </span>
          <span className="font-normal normal-case">, {address.town}</span>
          <span className="font-normal normal-case">, {address.province}</span>
          {address.ref && (
            <>
              <span className="font-normal normal-case">
                , <b>Ref:</b> {address.ref}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
