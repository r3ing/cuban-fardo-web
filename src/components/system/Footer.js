import React from 'react';
//import { Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';


export function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor contenido">
        <p className="copyright">
          © 2023 CUBAN FARDO EXPRESS | All rights reserved
        </p>
        <nav className="footer-nav">
          <ExternalLink href="https://www.facebook.com/people/Cuban-Fardo-Express/100078088684414/">
            <span>Facebook</span>
          </ExternalLink>
          <ExternalLink href="https://www.google.com/maps/place/CUBAN+FARDO+EXPRESS+env%C3%ADo+de+paquetes+y+remesas+a+Cuba/@38.2051113,-85.7692277,17z/data=!4m14!1m7!3m6!1s0x886913b013e9cbc5:0xdaaf50f5bf791f7f!2sCUBAN+FARDO+EXPRESS+env%C3%ADo+de+paquetes+y+remesas+a+Cuba!8m2!3d38.2051072!4d-85.7643568!16s%2Fg%2F11rr7xwh2n!3m5!1s0x886913b013e9cbc5:0xdaaf50f5bf791f7f!8m2!3d38.2051072!4d-85.7643568!16s%2Fg%2F11rr7xwh2n">
            <span>Google Maps</span>
          </ExternalLink>
          <ExternalLink href="https://api.whatsapp.com/send?phone=15026192769">
            <span>Whatsapp</span>
          </ExternalLink>
        </nav>
      </div>
    </footer>
  );
}
