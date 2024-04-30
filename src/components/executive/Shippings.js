import React from 'react';
import { useEffect, useState } from "react";
import { getShipments } from "../../repositories/ShipmentsRepository";
import { CustomerForm } from "./CustomerForm";
import { Layout } from "../system/Layout";
import { Button } from "react-bootstrap";
import { Table } from "../common/Table";
import { GenericModal } from "../common/GenericModal";
import { ADD_NEW_CUSTOMER, EDIT_CUSTOMER, ROUTE_ADDRESSES } from "../common/Costanst";
import { useShipment } from "../../context/shipmentContext";
import { useNavigate } from "react-router-dom";
//import { useAlert } from "react-alert";



export function Shippings() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { setCustomer } = useShipment();
  const navigate = useNavigate();
  //const alert = useAlert();

  const handleClose = () => { 
    setShowModal(false); 
  };

  const handelShowModal = () => {
    setShowModal(true);
  };

  const addClient = () => {
    setCustomer(null);
    setEdit(false);
    handelShowModal();
  }

  const editClient = (row) => {
    setEdit(true);
    setCustomer(row);
    handelShowModal();
  }

  const addAddress = (row) => {
    setCustomer(row);
    navigate(ROUTE_ADDRESSES)
  }

  const columns = [
    {
      name: "CODIGO",      
      selector: (row) => row.name,
    },
    {
      name: "NOMBRE",      
      selector: (row) => row.name,
    },
    {
      name: "APELLIDOS",
      selector: (row) => row.lastName,
    },
    {
      name: "TELÉFONO",
      selector: (row) => row.phone,
    },
    {
      minWidth: "100px",
      cell: (row) => (
        <>
          <Button
            variant="outline-warning"
            className="table-btn"
            onClick={() => editClient(row)}
            disabled={false}>
            <i className="material-icons icon">edit_square</i>
          </Button>
          <Button
            variant="outline-success"
            onClick={() => addAddress(row)}
            disabled={false}
            className="table-btn"
          >
            <i className="material-icons icon">emoji_transportation</i>
          </Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    setLoading(true);

    getShipments().then((data) => {     
       setLoading(false);
       setShipments(data);
    });

    // eslint-disable-next-line
  }, []);

  console.log('shipments: ',shipments);

  return (
    <Layout title="Customers">
      <GenericModal
        showModal={showModal}
        handleClose={handleClose}
        title={edit ? EDIT_CUSTOMER : ADD_NEW_CUSTOMER}
        body={<CustomerForm handleClose={handleClose} />}
        buttonClose={true}
        footer={false}
      />
      <main className="contenedor mt-5">
        <div className="card shadow border-warning mb-3">
          <div className="card-header">
            <div className="table-header">
              <h4 className='table-title mt-1'>CLientes</h4>
              <Button
                variant="outline-warning"
                onClick={addClient}
                className="custom-btn"
              >
                <i className="material-icons icon">person_add</i>
                Nuevo Cliente
              </Button>
            </div>
          </div>
          <div className="card-body">
            {
              <Table
                title="customers List"
                data={[]}
                columns={columns}
                loading={loading}
                canSearch={true}
                searchCriteria={["name", "lastName", "phone"]}
                selectableRows={false}
              />
            }
          </div>
        </div>
      </main>
    </Layout>
  );
}
