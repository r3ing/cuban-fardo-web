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
        <h2 className="heading">Qvan Fardo Express</h2>
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
              <b>Qvan Fardo Express</b> se ha consolidado como la principal
              agencia de entrega de paquetes en Kentucky, ganando la confianza
              tanto de clientes locales como nacionales gracias a su dedicación
              excepcional hacia la excelencia en el servicio. Con una
              trayectoria impecable respaldada por un equipo altamente
              capacitado, esta agencia ha establecido un estándar ejemplar en
              rapidez, seguridad y confiabilidad en la entrega de paquetes. Su
              cobertura se extiende por todo el estado de Kentucky y más allá,
              ofreciendo soluciones de envío tanto para empresas como para
              particulares.
            </p>
            <p>
              <b>Qvan Fardo Express</b> se enorgullece de ofrecer tarifas
              competitivas y un servicio al cliente excepcional, lo que la
              convierte en la opción indiscutible para aquellos que buscan una
              agencia de entrega de paquetes de primer nivel en Kentucky. La
              agencia se destaca por su compromiso inquebrantable con la
              satisfacción del cliente y la eficiencia en la entrega de
              paquetes. Ya sea para enviar documentos importantes, paquetes
              personales o mercancías comerciales, garantizando seguridad y
              puntualidad en cada envío. Su amplia cobertura combinada con
              tarifas competitivas la convierten en la opción preferida para
              aquellos que buscan un servicio de paquetería confiable en
              Kentucky.
            </p>
            <p>
              En resumen, <b>Qvan Fardo Express</b> es la opción indiscutible
              para quienes valoran la calidad, la confiabilidad y el
              profesionalismo en el servicio de entrega de paquetes en el estado
              de Kentucky.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
