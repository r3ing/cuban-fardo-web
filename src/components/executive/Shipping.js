import React from 'react';
import { useShipment } from "../../context/shipmentContext";
import { Layout } from "../system/Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

export function Shipping() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer, address } = useShipment();

  console.log("customer: ", customer);
  console.log("address", address);


  useEffect(() => {
    if (!customer) {
      alert.error("Sorry, something went wrong!");
      navigate("/customers");
      return;
    }   
    
    // eslint-disable-next-line
  }, []);



  return (
    <Layout title="Shipping">
      <main className="contenedor">
        <h1 className="heading">New Shipment</h1>
        <div className="row">
          <div className="col-6 text-center">
            <h1 className="title text-center">Shipping Address</h1>
            
          </div>
          <div className="col-4">
            <h1 className="title text-center">Shipping Address</h1>
          </div>
        </div>
      </main>
    </Layout>
  );
}
