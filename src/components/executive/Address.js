import React from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { useShipment } from "../../context/shipmentContext";
import { useAlert } from "react-alert";
import { deleteAddress } from "../../repositories/AddressRepository";
import { ROUTE_PRODUCTS } from "../common/Costanst";

const Address = ({ address, deleteAddressfromList }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer, setAddress } = useShipment();

  if (!address) return;

  const attachAddress = () => {
    setAddress(address);
    navigate(ROUTE_PRODUCTS);
  };

  const setAddressForEdit = () => {
    setAddress(address);
  }

  const removeAddress = () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta Dirección?") ===
      true
    ) {
      deleteAddress(customer.id, address.id);
      deleteAddressfromList(address.id);
      alert.success("Dirección eliminada!");
    }
  };

  return (
    <>
      <Accordion.Header>
        <div className="container adresses-title">
          <b className="text-start">{address.beneficiary}</b>
          <b className="text-end">
            {address.town}, {address.province}
          </b>
        </div>
      </Accordion.Header>
      <Accordion.Body className="shadow-md shadow-orange-300">
        <div className="">
          <div className="flex items-center">
            <p className="font-bold text-gray-700 uppercase">
              <b>Teléfono:</b> {""}
              <span className="font-normal normal-case">{address.phone}</span>
            </p>
          </div>
          <p className="font-bold text-gray-700 uppercase">
            <b>Dirección:</b> {""}
            <span className="font-normal normal-case">
              {address.street !== "" && `${address.street}`}
              {address.number !== "" && ` #${address.number}`}
              {address.betweenStreet !== "" && ` E/ ${address.betweenStreet}`}
              {address.locality !== "" && `, ${address.locality}`}
            </span>
          </p>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 uppercase">
              <span className="font-normal normal-case">
                <b>Municipio:</b> {address.town}
              </span>
            </p>
            <p className="font-bold text-gray-700 uppercase">
              <span className="font-normal normal-case">
                <b>Provincia:</b> {address.province}
              </span>
            </p>
          </div>
          {address.ref && (
            <p className="font-bold text-gray-700 uppercase">
              <span className="font-normal normal-case">
                <b>Referencia:</b> {address.ref}
              </span>
            </p>
          )}

          {address.ci && (
            <p className="font-bold text-gray-700 uppercase">
              <b>CI:</b>{" "}
              <span className="font-normal normal-case">{address.ci}</span>
            </p>
          )}

          <div className="adresses-actions text-end">
            <Button
              variant="outline-danger"
              className="table-btn"
              onClick={removeAddress}
            >
              <i className="material-icons icon">delete</i>
            </Button>

            <Button
                variant="outline-warning"
                className="table-btn"
                onClick={setAddressForEdit}
              >
                <i className="material-icons icon">edit_square</i>
              </Button>

            <Button
              variant="outline-success"
              onClick={attachAddress}
              className="table-btn"
            >
              <i className="material-icons icon">emoji_transportation</i>
            </Button>
          </div>
        </div>
      </Accordion.Body>
    </>
  );
};

export default Address;
