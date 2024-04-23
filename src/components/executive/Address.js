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

  const removeAddress = () => {
    deleteAddress(customer.id, address.id);

    deleteAddressfromList(address.id);

    alert.success("Dirección eliminada!");
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
              <b>Phone:</b> {""}
              <span className="font-normal normal-case">{address.phone}</span>
            </p>
          </div>
          <p className="font-bold text-gray-700 uppercase">
            <b>Address:</b> {""}
            <span className="font-normal normal-case">
              {address.street !== "" && `${address.street}`}
              {address.number !== "" && ` #${address.number}`}
              {address.betweenStreet !== "" && ` e/ ${address.betweenStreet}`}
              {address.locality !== "" && `, ${address.locality}`}
            </span>
          </p>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 uppercase">
              <span className="font-normal normal-case">
                <b>Town:</b> {address.town}
              </span>
            </p>
            <p className="font-bold text-gray-700 uppercase">
              <span className="font-normal normal-case">
                <b>Province:</b> {address.province}
              </span>
            </p>
          </div>
          {address.ref && (
            <p className="font-bold text-gray-700 uppercase">
              <span className="font-normal normal-case"><b>Ref:</b> {address.ref}</span>
            </p>
          )}

          {address.ci && (
            <p className="font-bold text-gray-700 uppercase">
              <b>Ci:</b>{" "}
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

            {/* <Button
                variant="outline-warning"
                className="table-btn"
                onClick={() => {}}
                disabled={true}
              >
                <i className="material-icons icon">edit_square</i>
              </Button> */}

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
