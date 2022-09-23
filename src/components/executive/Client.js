import { useEffect, useState } from "react";
import { getClients } from "../../repositories/ClientRepository";
import { CustomerForm } from "./CustomerForm";
import { Layout } from "../system/Layout";
import { Button } from "react-bootstrap";
import { Table } from "../common/Table";
import { GenericModal } from "../common/GenericModal";
import { ADD_NEW_CUSTOMER } from "../common/Costanst";

export function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const getAllClients = async () => {
  //   setLoading(true);
  //   try {
  //     const clients = await getClients();
  //     setLoading(false);
  //     setClients(clients);
  //     setDataFiltered(clients);
  //   } catch (error) {
  //     setLoading(false);
  //     alert.error('Up, error listing customers!');
  //   }
  // };

  const handleClose = () => setShowModal(false);

  const handelShowModal = () => {
    setShowModal(true);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    // {
    //   name: "Email",
    //   selector: (row) => row.email,
    // },
    {
      name: "Phone",
      selector: (row) => row.phone,
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
    setLoading(true);
    getClients().then((data) => {
      setLoading(false);
      setClients(data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Customers">
      <GenericModal
        showModal={showModal}
        handleClose={handleClose}
        title={ADD_NEW_CUSTOMER}
        body={<CustomerForm handleClose={handleClose} />}
        buttonClose={true}
        footer={false}
      />
      <main className="contenedor mt-5">
        <div className="card shadow border-warning mb-3">
          <div className="card-header">
            <div className="table-header">
              <h2>Customers</h2>
              <Button
                variant="outline-warning"
                // title="New Costomer"
                onClick={handelShowModal}
                className="custom-btn"
              >
                {/* <i className="material-icons">person_add</i> */}
                New Costomer
              </Button>
            </div>
          </div>
          <div className="card-body">
            {
              <Table
                title="customers List"
                data={clients}
                columns={columns}
                loading={loading}
                canSearch={true}
                selectableRows={false}
              />
            }
          </div>
        </div>
      </main>
    </Layout>

    // <div className="container p-6">
    //     <h3 className="text-center">Customer Record</h3>
    //   <div className="row">
    //     <ClientInfo />
    //   </div>
    //   <div className="row">
    //     { /*<Address /> */}
    //   </div>
    //   <div className="pt-5">
    //     <ul className="nav nav-tabs">
    //       <li className="nav-item">
    //         <a className="nav-link active" data-bs-toggle="tab" href="#addresses">
    //           Addresses
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" data-bs-toggle="tab" href="#shipments">
    //           Shipments
    //         </a>
    //       </li>
    //     </ul>
    //     <div id="myTabContent" className="tab-content">
    //       <div className="tab-pane fade active show" id="addresses">
    //         <Addresses />
    //       </div>
    //       <div className="tab-pane fade" id="shipments">
    //         <Shipments />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
