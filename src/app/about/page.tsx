"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import image from "../../../public/Logo.png";

const About = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showContent ? (
        <div>
          <h2>À propos de nous</h2>
          <p>
            Chez Espese, nous nous engageons à simplifier la gestion de vos
            fonds 1XBET. Notre mission est de fournir une plateforme
            transparente et sécurisée qui permet aux utilisateurs de gérer leurs
            finances sans effort. Avec un engagement envers la satisfaction et
            la sécurité des utilisateurs, nous nous efforçons de rendre le
            processus de financement et de retrait de votre compte 1XBET aussi
            fluide que possible. Notre équipe est motivée par la vision de
            redéfinir la façon dont les utilisateurs interagissent avec leurs
            finances de jeu, en garantissant tranquillité d'esprit et commodité
            à chaque étape du processus.
          </p>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            minHeight: "800px",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            className="logo"
            style={{ height: "70px", width: "70px", objectFit: "cover" }}
          >
            <Image
              src={image} // Use the imported image URL
              alt="Description of the image"
              layout="responsive"
              objectFit="cover"
              objectPosition="center center"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default About;
