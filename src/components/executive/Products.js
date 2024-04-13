import React from "react";
import { useShipment } from "../../context/shipmentContext";
import { Layout } from "../system/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { EditableTable } from "../common/EditableTable";
import { GenericModal } from "../common/GenericModal";
import { CREATE_SHIPMENT, DELIVERY_STATUS_CREATED, SHIPMENT_CREATED } from "../common/Costanst";
import { ShippingForm } from "./ShippingForm";
import { generateId } from "../utils/Functions";
import { addShipment } from "../../repositories/ShipmentsRepository";
import { pdfReport } from "../common/PdfReport";
import GridSpinner from "../common/GridSpinner";
import { ROUTE_CUSTOMERS } from "../common/Costanst";
import Send from "./Send";
import Receives from "./Receives";

export function Products() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer, address, setArticles } = useShipment();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(false);

  const spinnerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const createShipment = async (weight, amount, details) => {
    let articles = "";

    products.forEach((p) => {
      //articles += p.qty + ":" + p.product.trim() + ";";
      p.product = p.product.toUpperCase().trim();
    });

    setArticles(articles);

    let shipping = {
      weight: weight,
      amount: amount,
      details: details,
      client: `/client/${customer.id}`,
      createDate: Date.now(),
      articles: products,
      province: address.province,
      shippingAddress: `/client/${customer.id}/shippingAddress/${address.id}`,
      status: DELIVERY_STATUS_CREATED,
      tracking: generateId(),
    };

    const fileName = `${shipping.tracking}-${address.province}.pdf`;

    let sender = {
      name: customer.name + " " + customer.lastName,
      phone: customer.phone,
    };

    let receives = {
      name: address.beneficiary,
      phone: address.phone,
      address:
        address.street +
        " #" +
        address.number +
        " % " +
        address.betweenStreet +
        ", Rpto " +
        address.locality +
        ", " +
        address.town +
        ", " +
        address.province +  
        ", CI: " + 
        address.ci,
    };


    shipping.sender = sender;
    shipping.receives = receives;

    setSpinnerShow(true);

    await pdfReport(shipping, fileName);

    addShipment(shipping);

    setSpinnerShow(false);

    alert.success(SHIPMENT_CREATED);

    navigate(ROUTE_CUSTOMERS);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!customer) {
      alert.error("Sorry, something went wrong!");
      navigate(ROUTE_CUSTOMERS);
      return;
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Shipping">
      <GenericModal
        showModal={showModal}
        handleClose={handleClose}
        title={CREATE_SHIPMENT}
        body={
          <ShippingForm
            handleClose={handleClose}
            createShipment={createShipment}
          />
        }
        buttonClose={true}
        footer={false}
      />

      <GridSpinner visible={spinnerShow} style={spinnerStyle} />

      <main className="contenedor mt-4">
        <section className="d-flex justify-content-center">
          <Send customer={customer} />
          <Receives address={address} />
        </section>
        <section className="mt-3">
          <h5 className="title text-center">DESCRIPCIÓN PRODUCTOS</h5>

          <EditableTable
            products={products}
            func={setProducts}
            setShowModal={setShowModal}
          />
        </section>
      </main>
    </Layout>
  );
}
