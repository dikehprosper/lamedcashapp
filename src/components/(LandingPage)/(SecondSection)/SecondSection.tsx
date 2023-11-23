import React from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import "./secondSection.css";
import Link from "next/link";

const SecondSection = () => {
  return (
    <div className='secondSection-container'>
      <h2>Nous offrons</h2>
      <div className='secondSection-box'>
        <div className='secondSection-box-inner animate-pop-in '>
          <div>
            {" "}
            <AiFillThunderbolt className='secondSection-icons' />
          </div>
          <h5>Rapide et facile</h5>
          <p>
            Dites adieu à la gestion compliquée de vos fonds 1XBET. Avec Espese,
            le financement et les retraits ne sont qu&apos;à quelques clics de
            distance.
          </p>
        </div>
        <div className='secondSection-box-inner animate-pop-in '>
          <div>
            <BsShieldLock className='secondSection-icons' />
          </div>
          <h5>Sécurité et commodité</h5>
          <p>
            Vos fonds, à votre façon. Nous accordons la priorité à la sécurité
            et à la commodité, garantissant votre tranquillité d&apos;esprit à
            chaque transaction.
          </p>
        </div>
        <div className='secondSection-box-inner animate-pop-in '>
          <div>
            {" "}
            <MdOutlineSupportAgent className='secondSection-icons' />
          </div>
          <h5>Support 24/7</h5>
          <p>
            Nous sommes là pour vous à toute heure du jour et de la nuit. Notre
            équipe d&apos;assistance dévouée est prête à vous aider à tout
            moment et n&apos;importe où.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
