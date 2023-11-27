import React from "react";
import { Image } from "react-bootstrap";
//import { useAuth } from "../../context/authContext";
import { Layout } from "./Layout";
import image from "../../assets/img/nosotros.jpg";

export function Home() {
  //const { user } = useAuth();

  return (
    <Layout title="Home">
      <main className="contenedor">
        <h2 className="heading">Cuban Fardo Express</h2>
        {/* <h1>Welcome {user.displayName || user.email}</h1> */}

        <div className="about-content">
          <Image
            className="main-image"
            width={600}
            height={450}
            alt="About us"
            src={image}
          />
          <div>
            <p>
              Cuban Fardo Express has established itself as the premier package delivery agency in Kentucky, 
              earning the trust of local and national customers through its unwavering commitment to service excellence.
              With an impeccable track record and a highly trained team, this agency has set an exemplary standard in terms of speed,
              security and reliability in package delivery. Its coverage encompasses the entire state of Kentucky and beyond,
              providing shipping solutions for businesses and individuals. In addition, Cuban Fardo Express prides itself
              on offering competitive rates and exceptional customer service, making it the undisputed choice for those
              looking for a premier package delivery agency in Kentucky. Kentucky's premier parcel delivery agency.
              With Cuban Fardo Express, your shipments are in the safest, most efficient hands in the business.
            </p>
            <p>
              It has earned a well-deserved reputation as Kentucky's leading parcel delivery agency.
              With years of experience in the market, this company stands out for its unwavering commitment 
              to customer to customer satisfaction and efficiency in package delivery. package delivery. 
              Whether you need to ship important documents important documents, personal packages or 
              commercial merchandise, Cuban Fardo Express guarantees safety and timeliness in every shipment. 
              Its extensive statewide coverage, combined with competitive rates, makes it the obvious choice for those
              competitive rates, makes it the obvious choice for those looking for a looking for reliable parcel service. 
              In addition, its dedication service and the ability to adapt to individual needs make Cuban Fardo Express 
              the individual needs make Cuban Fardo Express the preferred choice in Kentucky. In short, if you're 
              looking for a reliable agency that offers quality and professionalism, Cuban Fardo Express is the 
              undisputed choice in the state of Kentucky.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
