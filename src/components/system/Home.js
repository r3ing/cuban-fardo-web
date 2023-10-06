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
              Cuban Fardo Express se ha consolidado como la principal agencia de
              paquetería en Kentucky, ganándose la confianza de clientes locales
              y nacionales gracias a su compromiso inquebrantable con la
              excelencia en el servicio. Con una trayectoria impecable y un
              equipo altamente capacitado, esta agencia ha establecido un
              estándar ejemplar en términos de rapidez, seguridad y
              confiabilidad en la entrega de paquetes. Su cobertura abarca todo
              el estado de Kentucky y más allá, brindando soluciones de envío
              para empresas y particulares. Además, Cuban Fardo Express se
              enorgullece de ofrecer tarifas competitivas y un excepcional
              servicio al cliente, lo que la convierte en la elección
              indiscutible para quienes buscan una agencia de paquetería de
              primer nivel en Kentucky. Con Cuban Fardo Express, tus envíos
              están en las manos más seguras y eficientes del negocio.
            </p>
            <p>
              Se ha ganado una merecida reputación como la
              agencia de paquetería líder en Kentucky. Con años de experiencia
              en el mercado, esta empresa se destaca por su compromiso
              inquebrantable con la satisfacción del cliente y la eficiencia en
              la entrega de paquetes. Ya sea que necesites enviar documentos
              importantes, paquetes personales o mercancía comercial, Cuban
              Fardo Express garantiza la seguridad y la puntualidad en cada
              envío. Su amplia cobertura a nivel estatal, combinada con tarifas
              competitivas, hace que sea la elección evidente para aquellos que
              buscan un servicio de paquetería confiable. Además, su dedicación
              al servicio al cliente y la capacidad de adaptarse a las
              necesidades individuales hacen que Cuban Fardo Express sea la
              opción preferida en Kentucky. En resumen, si buscas una agencia de
              paquetería de confianza que ofrezca calidad y profesionalismo,
              Cuban Fardo Express es la elección indiscutible en el estado de
              Kentucky.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
