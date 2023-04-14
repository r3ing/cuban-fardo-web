import React from 'react';
import { ListGroup } from "react-bootstrap";
import { useClient } from "../../context/clientContext";
import { Layout } from "../system/Layout";
import { getShippingAddress } from "../../repositories/AddressRepository";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

export function Shipping() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer } = useClient();

  // const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState([]);

  // const getAllShippingAddress = async () => {
  //   //setLoading(true);
  //   const data = await getShippingAddress(customer.id);
  //   console.log(data);
  //   setShippingAddress(data);
  //   //setLoading(false);
  //   //setClients(clients);
  // };

  useEffect(() => {
    if (!customer) {
      alert.error("Sorry, something went wrong!");
      navigate("/customers");
      return;
    } 


      // setLoading(true);
      //TO DO
      // getShippingAddress(customer.id).then((data) => {
      getShippingAddress("5oZQCByyvRkrioobW6eF").then((data) => {  
        // setLoading(false);
        setShippingAddress(data);
      });

    
    // eslint-disable-next-line
  }, []);

  console.log(shippingAddress);

  return (
    <Layout title="Shipping">
      <main className="contenedor">
        <h1 className="heading">New Shipment</h1>
        <div className="row">
          <div className="col-6 text-center">
            <h1 className="title text-center">Shipping Address</h1>
            {shippingAddress.length && (
              <div className="mt-3">
                <ListGroup>
                  {shippingAddress.map((address) => (
                    <ListGroup.Item
                      action
                      href="#link1"
                      key={address.id}
                      className={"mb-2 border-primary rounded-top" + (address.default ? "active" : "")}
                    >
                      <p className="uppercase font-bold text-2xl">
                        {address.beneficiary} - {address.phone}
                      </p>
                      <p className="text-2xl text-orange-300 font-bold">
                        {address.street} #{address.number} %
                        {address.betweenStreet}, {}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </div>
          <div className="col-4">
            <h1 className="title text-center">Shipping Address</h1>

            

            <button className="btn btn-lg btn-outline-warning custom-btn mt-3">
              New Shipping Address
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
