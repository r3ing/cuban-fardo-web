import React from 'react';
import { useEffect, useState } from "react";
import { useClient } from "../../context/clientContext";
import { Layout } from '../system/Layout';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Address from './Address';
import { AddressForm } from './AddressForm';
// import { ListGroup } from 'react-bootstrap';

export function Addresses() {
  const navigate = useNavigate();
  const alert = useAlert();
  const { customer } = useClient();
  // const [addresses, setAdressed] = useState([]);

  useEffect(() => {
    if (!customer) {
      alert.error("Sorry, something went wrong!");
      navigate("/customers");
      return;
    }





    // eslint-disable-next-line
  }, []);


  return (
    <Layout title="Adresses">
      <section className='container mb-4' hidden={true}>
      <h2 className="title text-center mt-5">Add New Addresses</h2>
        <AddressForm/>
      </section>
      <h2 className="title text-center mt-5" hidden={false}>Addresses</h2>
      <section className="content container mt-1 mb-3" hidden={false}>
        {/* <div className=""> */}
          {/* {addresses.length && (<div>
            direcciones
          </div>)} */}

          {/* <div className=''>
            <h2 className="title text-center mt-2">form add address</h2>
            <AddressForm />
          </div> */}

          {/* <div className='card shadow border-warning'> */}
            {/* <h2 className="title text-center mt-2">Addresses</h2> */}
            <Address />
            {/* <Address />
            <Address /> */}
          {/* </div> */}

        {/* </div> */}
      </section>
    </Layout>
  );
}
