import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../../repositories/ClientRepository";
import { useAlert } from "react-alert";
import { Layout } from "../system/Layout";
import { Table } from "../common/Table";
import { Button } from "react-bootstrap";
import { ADD_NEW_CUSTOMER, LOOK_FOR_CLIENT } from "../common/Costanst";
import { ComboboxAutocomplete } from "../common/ComboboxAutocomplete";
import { CustomerForm } from "./CustomerForm";
import { Modals } from "../common/Modals";
import { useShipment } from "../../context/shipmentContext";

export function Shippings() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { setCustomer } = useShipment();
  const [clients, setClients] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clientSelected, setSelected] = useState(null);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState(null);
  const [modalFooter, setModalFooter] = useState(false);
  //const [buttonClose, setButtonClose] = useState(false);
  const [buttonPrimaryActionLabel, setButtonPrimaryActionLabel] = useState("");
  const [buttonSecondaryActionLabel, setButtonSecondaryActionLabel] =
    useState("");

  const handleClose = () => {
    setVisible(false);
  };

  const getAllClients = async () => {
    setLoading(true);
    const clients = await getClients();
    setLoading(false);
    setClients(clients);
    setModalTitle(LOOK_FOR_CLIENT);
    setDataFiltered(clients);
  };

  const handleSearch = (dataFiltered) => {
    setDataFiltered(dataFiltered);
  };

  //const handleCloseFormNewCustomer = () => setShowModalNewCustomer(false);

  const lookClient = async () => {
    try {
      const clients = await getClients();
      clients.map((c) => {
        c.value = c.id;
        c.label = c.name + " " + c.lastName;
        return c;
      });
      setClients(clients);
      setVisible(true);
      setModalBody(
        <ComboboxAutocomplete options={clients} getSelected={getSelected} />
      );
      setModalFooter(true);
      setButtonPrimaryActionLabel("New Customer");
      setButtonSecondaryActionLabel("New Shipment");
    } catch (error) {
      alert.error("Up, error searching for clients!");
    }
  };

  const getSelected = (selected) => {
    setSelected(selected);
  };

  const setNewClient = (client) => {
    console.log("client: ", client);
  };

  const primaryAction = () => {
    setModalTitle(ADD_NEW_CUSTOMER);
    setModalBody(
      <CustomerForm handleClose={handleClose} setNewClient={setNewClient} />
    );
    setModalFooter(false);
  };

  const secondaryAction = () => {
    setCustomer(clientSelected);
    setVisible(false);
    navigate("/shipping");
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      minWidth: "150px",
      cell: (row) => (
        <>
          <button
            className="btn btn-primary btn-sm btn-table mr-2"
            type="button"
            title="Ver Detalle"
            raised="true"
            primary="true"
            disabled={true}
            onClick={() => {}}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-primary btn-sm btn-table mr-2"
            type="button"
            title="Editar"
            raised="true"
            primary="true"
            disabled={false}
            onClick={() => {}}
          >
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-dark btn-sm btn-table mr-2"
            type="button"
            title="Reenviar Correo"
            raised="true"
            primary="true"
            disabled={false}
            onClick={() => {}}
          >
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    getAllClients();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Shippings">
      {
        <Modals
          visible={visible}
          handleClose={handleClose}
          title={modalTitle}
          body={modalBody}
          footer={modalFooter}
          //buttonClose={buttonClose}
          buttonPrimaryAction={true}
          buttonSecondaryAction={true}
          buttonPrimaryActionLabel={buttonPrimaryActionLabel}
          buttonSecondaryActionLabel={buttonSecondaryActionLabel}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      }
      <main className="contenedor mt-5">
        <div className="card shadow border-warning mb-3">
          <div className="card-header">
            <div className="table-header">
              <h2>Shippings</h2>
              <Button
                className="custom-btn"
                variant="outline-warning"
                onClick={() => {
                  lookClient();
                }}
              >
                New Shipment
              </Button>
            </div>
          </div>
          <div className="card-body">
            {
              <Table
                title="Shipping List"
                data={clients}
                dataFiltered={dataFiltered}
                columns={columns}
                loading={loading}
                handleSearch={handleSearch}
                selectableRows={true}
              />
            }
          </div>
        </div>
      </main>
    </Layout>
  );
}
