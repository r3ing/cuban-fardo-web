import React from "react";
import { useEffect, useState } from "react";
import { useShipment } from "../../context/shipmentContext";
import { getShippingAddress } from "../../repositories/AddressRepository";
import { Layout } from "../system/Layout";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Address from "./Address";
import { AddressForm } from "./AddressForm";

export function Addresses() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer } = useShipment();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (!customer) {
      alert.error("Sorry, something went wrong!");
      navigate("/customers");
      return;
    }

    getShippingAddress(customer.id).then((data) => {      
      setAddresses(data);
    });    

    // eslint-disable-next-line
  }, []);

  const deleteAddressfromList = (addressId) => {
    let address = addresses.filter(dir => dir.id !== addressId);
    setAddresses(address);
  }

  return (
    <Layout title="Adresses">
      <div className="adresses-page">
        <section className="adresses-page-item">
          <h2 className="title text-center mt-5">New Address</h2>
          <AddressForm />
        </section>
        {addresses && addresses.length > 0 ? (
          <section className="adresses-page-item">
            <h2 className="title text-center mt-5">Addresses</h2>
            <Accordion defaultActiveKey="0" className="shadow-md shadow-orange-300 text-200">
              {addresses.map((address, key) => (
                <Accordion.Item eventKey="0" key={key}>
                  <Address address={address} deleteAddressfromList={deleteAddressfromList}/>
                </Accordion.Item>
              ))}
            </Accordion>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
