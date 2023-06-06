import React from 'react';
import { useEffect, useState } from "react";
// import { getClients } from "../../repositories/ClientRepository";
import { CustomerForm } from "./CustomerForm";
import { Layout } from "../system/Layout";
import { Button } from "react-bootstrap";
import { Table } from "../common/Table";
import { GenericModal } from "../common/GenericModal";
import { ADD_NEW_CUSTOMER, EDIT_CUSTOMER } from "../common/Costanst";
import { useClient } from "../../context/clientContext";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAlert } from "react-alert";


export function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { setCustomer } = useClient();
  const navigate = useNavigate();
  const alert = useAlert();

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
    navigate("/addresses")
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Phone",
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
    const unsub = onSnapshot(collection(db, "client"),
      (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setClients(data);
        setLoading(false);
      },
      (error) => {
        alert.error("Up, error listing customers!!!", error.message);
      });
    return () => {
      unsub();
    }

    // getClients().then((data) => {
    //   console.log(data);
    //   setLoading(false);
    //   setClients(data);
    // });

    // eslint-disable-next-line
  }, []);

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
              <h2 className='title'>Customers</h2>
              <Button
                variant="outline-warning"
                onClick={addClient}
                className="custom-btn"
              >
                <i className="material-icons icon">person_add</i>
                Add Costomer
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
