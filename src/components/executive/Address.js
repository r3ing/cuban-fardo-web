import React from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { useShipment } from "../../context/shipmentContext";

const Address = ({ address }) => {
  const navigate = useNavigate();
  const { setAddress } = useShipment();

  const attachAddress = () => {
    setAddress(address);
    navigate("/shipping");
  };

  return (
    <>
      <Accordion.Header>
        <div className="adresses-title">
          <b>{address.beneficiary}</b>
          <b>
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
              {address.street !== "" && `${address.street}`}{" "}
              {address.number !== "" && `#${address.number}`}{" "}
              {address.betweenStreet !== "" && `%${address.betweenStreet}`}
              {", "}
              {address.locality !== "" && `Rpto ${address.locality}`}{" "}
            </span>
          </p>
          <div className="flex items-center">
            <p className="font-bold text-gray-700 uppercase">
              <b>Town:</b> {""}
              <span className="font-normal normal-case">{address.town}</span>
            </p>
            <p className="font-bold text-gray-700 uppercase">
              <b>Province:</b> {""}
              <span className="font-normal normal-case">
                {address.province}
              </span>
            </p>
          </div>
          {address.ref && (
            <p className="font-bold text-gray-700 uppercase">
              <b>Ref:</b> {""}
              <span className="font-normal normal-case">{address.ref}</span>
            </p>
          )}

          <div className="adresses-actions text-end">
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
              disabled={false}
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
