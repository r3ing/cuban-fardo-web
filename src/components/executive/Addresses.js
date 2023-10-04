import React from 'react';
import { useEffect } from "react";
import { useClient } from "../../context/clientContext";
import { Layout } from '../system/Layout';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
// import Address from './Address';
// import { AddressForm } from './AddressForm';
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
      {/* <section className='container mb-4' hidden={true}>
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
      {/* <Address /> */}
      {/* <Address />
            <Address /> */}
      {/* </div> */}

      {/* </div> */}
      {/*  </section> */}

      <h2 className="title text-center mt-5" hidden={false}>Addresses</h2>
      <section className='container mb-4'>
        <Accordion className='shadow-md shadow-orange-300 text-200'>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>

    </Layout>
  );
}
