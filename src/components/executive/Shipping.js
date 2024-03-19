import React from "react";
import { useShipment } from "../../context/shipmentContext";
import { Layout } from "../system/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { EditableTable } from "../common/EditableTable";
import { GenericModal } from "../common/GenericModal";
import { CREATE_SHIPMENT, DELIVERY_STATUS_CREATED } from "../common/Costanst";
import { ShippingForm } from "./ShippingForm";
import { generateId } from "../utils/Functions";
import { addShipment } from "../../repositories/ShipmentsRepository";
import { pdfReport } from "../common/PdfReport";
import GridSpinner from "../common/GridSpinner";

export function Shipping() {
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

    navigate("/customers");
  };

  const handleClose = () => {
    setShowModal(false);
  };

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
        <div className="d-flex justify-content-center">
          <div className="col-6 text-center">
            <h1 className="title text-center">Send</h1>
            <p className="font-bold text-gray-700 uppercase">
              <b>Name:</b>{" "}
              <span className="font-normal normal-case">
                {customer.name} {customer.lastName}{" "}
              </span>
              <b>Phone:</b>{" "}
              <span className="font-normal normal-case">{customer.phone}</span>
            </p>
          </div>
          <div className="col-6 text-center">
            <h1 className="title text-center">Receives</h1>
            <div className="">
              <div className="flex items-center">
                <p className="font-bold text-gray-700 uppercase">
                  <b>Beneficiary:</b>{" "}
                  <span className="font-normal normal-case">
                    {address.beneficiary}{" "}
                  </span>
                  <b>Phone:</b>{" "}
                  <span className="font-normal normal-case">
                    {address.phone}
                  </span>
                </p>
              </div>
              <p className="font-bold text-gray-700 uppercase">
                <b>Address:</b>{" "}
                <span className="font-normal normal-case">
                  {address.street !== "" && `${address.street}`}{" "}
                  {address.number !== "" && `#${address.number}`}{" "}
                  {address.betweenStreet !== "" && `%${address.betweenStreet}`}
                  {address.locality !== "" && `, Rpto ${address.locality}`}
                </span>
                <span className="font-normal normal-case">
                  , {address.town}
                </span>
                <span className="font-normal normal-case">
                  , {address.province}
                </span>
                {address.ref && (
                  <>
                    <>, Ref:</>{" "}
                    <span className="font-normal normal-case">
                      {address.ref}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h1 className="title">Product Description</h1>
          <EditableTable
            products={products}
            func={setProducts}
            setShowModal={setShowModal}
          />
        </div>
      </main>
    </Layout>
  );
}
