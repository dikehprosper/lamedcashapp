import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../../public/about-section.png";
const AboutSection = () => {
  return (
    <>
      <div className="AboutSection">
        <h2>À propos de nous</h2>
        <p>
          Chez Espese, nous nous engageons à simplifier la gestion de vos fonds
          1XBET. Notre mission est de fournir une plateforme transparente et
          sécurisée qui permet aux utilisateurs de gérer leurs finances sans
          effort. Avec un engagement envers la satisfaction et la sécurité des
          utilisateurs, nous nous efforçons de rendre le processus de
          financement et de retrait de votre compte 1XBET aussi fluide que
          possible. Notre équipe est motivée par la vision de redéfinir la façon
          dont les utilisateurs interagissent avec leurs finances de jeu, en
          garantissant tranquillité d&apos;esprit et commodité à chaque étape du
          processus.
        </p>
      </div>
      <div className="AboutSection2">
        <Image
          fill
          src={image}
          style={{ objectFit: "cover" }}
          loading="lazy"
          alt="background"
        />
        <div className="AboutSection2-text">
          <h3>irnosnvoioibrber</h3>
<p>3. 24/7 Support: We understand that questions and concerns may arise at any time.  why our dedicated support team is available round the clock to assist you. Whether  a query about a transaction or a general inquiry, our support team is here to provide you with prompt and reliable assistance, ensuring a smooth and stress-free experience.</p>
<p>3. 24/7 Support: We understand that questions and concerns may arise at any time.  why our dedicated support team is available round the clock to assist you. Whether  a query about a transaction or a general inquiry, our support team is here to provide you with prompt and reliable assistance, ensuring a smooth and stress-free experience.</p>
<p>3. 24/7 Support: We understand that questions and concerns may arise at any time.  why our dedicated support team is available round the clock to assist you. Whether a query about a transaction or a general inquiry, our support team is here to provide you with prompt and reliable assistance, ensuring a smooth and stress-free experience.</p>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
