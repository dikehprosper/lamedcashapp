import "./about.css";
import React from "react";
import Image from "next/image";
import image from "../../../public/about-section.webp";
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
          loading='eager'
          alt="background"
        />
        <div className="AboutSection2-text">
          <h3>Nos services</h3>
          <p>
            1. <b>Financement</b>:  Avec Espese, vous pouvez facilement
            approvisionner votre compte 1XBET sans aucun problème. Notre
            processus rationalisé garantit des transactions rapides et
            sécurisées, vous permettant de vous concentrer sur ce qui compte
            vraiment : le frisson du jeu.
          </p>
          <p>
            2. <b>Retrait</b>:  Dites adieu aux
            processus de retrait complexes. Espese propose un système de retrait
            simple et efficace, garantissant que vos fonds sont transférés de
            manière transparente vers votre compte personnel ou désigné, vous
            donnant un contrôle total sur vos gains.
          </p>
          <p>
            3. <b>Assistance 24h/24 et 7j/7</b>:  Nous comprenons que des questions et des préoccupations peuvent survenir à tout moment. C&apos;est pourquoi notre équipe d&apos;assistance dédiée est disponible 24 heures sur 24 pour vous aider. Qu&apos;il s&apos;agisse d&apos;une question concernant une transaction ou d&apos;une demande générale, notre équipe d&apos;assistance est là pour vous fournir une assistance rapide et fiable, garantissant une expérience fluide et sans stress.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
