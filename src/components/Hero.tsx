import React from "react";
import Image from "next/image";
import CustomButton from "./CustomBotton";

const hero = () => {
  return (
    <>
      <div className="hero large-device">
        <div
          style={{
            width: "70%",
            height: "80%",
            position: "relative",
            paddingLeft: "50px",
          }}
        >
          <section className="hero-text">
            <h1 className="hero-title animate-pop-in">
              <span className="hero-span">Votre Solution</span> Tout-En-Un Pour
              Des Transactions 1XBET
              <span className="hero-span"> Sans Effort</span>.
            </h1>
            <p className="hero-subtitle animate-pop-in">
              Effectuez facilement vos dépôts et retraits vers et depuis votre
              compte 1XBET.
            </p>
            <div className="hero_button_container">
              <CustomButton
                containerStyles="hero-button animate-pop-in deposit"
                title="Dépôt"
              />
              <CustomButton
                containerStyles="hero-button animate-pop-in"
                title="Retrait"
              />
            </div>
          </section>
        </div>
        <div className="hero-img">
          <Image
            src="/image.svg"
            fill
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            alt="Picture of the background"
          />
        </div>
      </div>

      <div className="small-device">
        <div className="small-device-hero">
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 30,
              right: 30,
              height: "37%",
              alignItems: "end",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "end",
            }}
          >
            <div>
              <h1 className="hero-title animate-pop-in">
                <span className="hero-span">Votre Solution</span> Tout-En-Un
                Pour Des Transactions 1XBET
                <span className="hero-span"> Sans Effort</span>.
              </h1>
            </div>
          </div>
          <Image
            src="/mainBackgroundMobile.svg"
            fill
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            alt="Picture of the background"
          />
        </div>
        <div
          style={{
            display: "flex",
            minHeight: "15vh",
            width: "100%",
            justifyContent: "start",
            flexDirection: "column",
            padding: "25px 75px 25px 35px",
            gap: "20px",
          }}
        >
          <div className="hero-subtitle animate-pop-in">
            Effectuez facilement vos dépôts et retraits vers et depuis votre
            compte 1XBET.
          </div>
          <div className="hero_button_container">
            <CustomButton
              containerStyles="hero-button animate-pop-in deposit"
              title="Dépôt"
            />
            <CustomButton
              containerStyles="hero-button animate-pop-in"
              title="Retrait"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default hero;

{
  /* <section className="big_device_hero hero-content">
        <section className="hero-text">
          <h1 className="hero-title animate-pop-in">
            <span className="hero-span">Votre Solution</span> Tout-En-Un Pour
            Des Transactions 1XBET
            <span className="hero-span"> Sans Effort</span>.
          </h1>
          <p className="hero-subtitle animate-pop-in">
            Effectuez facilement vos dépôts et retraits vers et depuis votre
            compte 1XBET.
          </p>
          <div className="hero_button_container">
            <CustomButton
              containerStyles="hero-button animate-pop-in deposit"
              title="Dépôt"
            />
            <CustomButton
              containerStyles="hero-button animate-pop-in"
              title="Retrait"
            />
          </div>
        </section>
        <section className="hero-img">
          <div className="hero-logo"></div>
        </section>
      </section>

      <section className="small_device_hero hero-content_small">
        <div
          className="small_device_hero_background"
          style={{
            width: "100%",
            height: "430px",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <section className="hero-text">
            <h1 className="hero-title animate-pop-in">
              <span className="hero-span">Votre Solution</span> Tout-En-Un Pour
              Des Transactions 1XBET
              <span className="hero-span"> Sans Effort</span>.
            </h1>
          </section>
          <section className="hero-img">
            <div className="hero-logo"></div>
          </section>
        </div>
        <section className="hero-subtitle-small">
          <p className="hero-subtitle_small animate-pop-in">
            Effectuez facilement vos dépôts et retraits vers et depuis votre
            compte 1XBET
          </p>
          <div className="hero_button_container">
            <CustomButton
              containerStyles="hero-button animate-pop-in deposit"
              title="Dépôt"
            />
            <CustomButton
              containerStyles="hero-button animate-pop-in"
              title="Retrait"
            />
          </div>
        </section>
      </section> */
}
