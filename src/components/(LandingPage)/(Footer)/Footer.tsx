import "./footer.css";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";
import createTranslation from "next-translate/createTranslation";

const Footer = () => {
  const { t, lang } = createTranslation("home");
  return (
    <div className="footer">
      <h4>{t("contact us")}</h4>
      <p>{t("contact us description")}</p>

      <div className="footer-social-media-icons">
        <div className="footer-img facebook">
          <Image
            src="/Facebook.svg"
            loading="eager"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="footer-img whatsapp">
          <Image
            src="/Whatsapp.svg"
            loading="eager"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="footer-img tiktok">
          <Image
            src={image}
            loading="eager"
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
