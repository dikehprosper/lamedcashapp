import React from "react";
import Image from "next/image";
import CustomButton from "../(components)/CustomBotton";
import mainBackgroundMobile from "../../../../../public/mainBackgroundMobile.webp";
import image from "../../../../../public/image8.webp";
import "./hero.css";
const hero = () => {
  return (
    <>
      <div className='hero large-device'>
        <div
          style={{
            width: "70%",
            height: "80%",
            position: "relative",
            paddingLeft: "50px",
          }}
        >
          <section className='hero-text'>
            <h1 className='hero-title animate-pop-in'>
              <span className='hero-span'>Votre Solution</span> Tout-En-Un Pour
              Des Transactions 1XBET
              <span className='hero-span'> Sans Effort</span>.
            </h1>
            <p className='hero-subtitle animate-pop-in'>
              Effectuez facilement vos dépôts et retraits vers et depuis votre
              compte 1XBET.
            </p>
            <div className='hero_button_container'>
              <CustomButton
                containerStyles='hero-button animate-pop-in deposit'
                title='Dépôt'
              />
              <CustomButton
                containerStyles='hero-button animate-pop-in'
                title='Retrait'
              />
            </div>
          </section>
        </div>
        <div className='hero-img'>
          <Image
            src={image}
            fill
            loading='eager'
            quality={100}
            style={{
              objectFit: "cover",
            }}
            sizes='(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw'
            alt='Picture of the background'
          />
        </div>
      </div>
      <div className='small-device'>
        <div className='small-device-hero'>
          <div
            style={{
              position: "fixed",
              top: 20,
              left: 30,
              right: 30,
              height: "40%",
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "end",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <h1 className='hero-title animate-pop-in'>
                <span className='hero-span'>Votre Solution</span> Tout-En-Un
                Pour Des Transactions 1XBET
                <span className='hero-span'> Sans Effort</span>.
              </h1>
              <p className='hero-subtitle animate-pop-in'>
                Effectuez facilement vos dépôts et retraits vers et depuis votre
                compte 1XBET.
              </p>
              <div className='hero_button_container'>
                <CustomButton
                  containerStyles='hero-button animate-pop-in deposit'
                  title='Dépôt'
                />
                <CustomButton
                  containerStyles='hero-button animate-pop-in'
                  title='Retrait'
                />
              </div>
            </div>
          </div>
          <Image
            src={mainBackgroundMobile}
            fill
            loading='eager'
            quality={100}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            alt='Picture of the background'
          />
        </div>
      </div>
    </>
  );
};

export default hero;
