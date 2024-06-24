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
import { ROUTE_CUSTOMERS } from "../utils/Constant";

export function Addresses() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer } = useShipment();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (!customer) {
      alert.error("Lo siento, algo salió mal!");
      navigate(ROUTE_CUSTOMERS);
      return;
    }

    getShippingAddress(customer.id).then((data) => {
      setAddresses(data);
    });

    // eslint-disable-next-line
  }, []);

  const deleteAddressfromList = (addressId) => {
    let address = addresses.filter((dir) => dir.id !== addressId);
    setAddresses(address);
  };

  return (
    <Layout title="Adresses">
      <div className="adresses-page">
        <section className="adresses-page-item">
          <h4 className="title text-center capitalize">NUEVA DIRECCIÓN</h4>
          <AddressForm />
        </section>

        {addresses && addresses.length > 0 ? (
          <section className="adresses-page-item">
            <h4 className="title text-center capitalize">DIRECCIONES</h4>
            <Accordion
              defaultActiveKey="0"
              className="shadow-md shadow-orange-300 text-200"
            >
              {addresses.map((address, key) => (
                <Accordion.Item eventKey="0" key={key}>
                  <Address
                    address={address}
                    deleteAddressfromList={deleteAddressfromList}
                  />
                </Accordion.Item>
              ))}
            </Accordion>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
