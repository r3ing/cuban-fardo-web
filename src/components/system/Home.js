import React from 'react';
import { Image } from "react-bootstrap";
//import { useAuth } from "../../context/authContext";
import { Layout } from "./Layout";
import image from '../../assets/img/nosotros.jpg';

export function Home() {
  //const { user } = useAuth();

  return (
    <Layout title="Home">
      <main className="contenedor">
        <h2 className="heading">Cuban Fardo Express</h2>
        {/* <h1>Welcome {user.displayName || user.email}</h1> */}

        <div className="about-content">
          <Image
            width={600}
            height={450}
            alt="About us"
            src={image}
          />
          <div>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet.
            </p>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
