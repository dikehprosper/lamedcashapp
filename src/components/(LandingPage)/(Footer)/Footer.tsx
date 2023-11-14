import "./footer.css";
import Image from "next/image";
import image from "../../../../public/TikTok.svg";

const Footer = () => {
  return (
    <div className="footer">
      <h4>PRENEZ CONTACT AVEC NOUS</h4>
      <p>
        Si vous avez un problème ou des questions pertinentes, utilisez les
        liens ci-dessous pour nous contacter
      </p>
    
      <div className="footer-social-media-icons">
        <div className="footer-img facebook">
          <Image
            src="/Facebook.svg"
            loading='eager'
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="footer-img whatsapp">
          <Image
            src="/Whatsapp.svg"
            loading='eager'
            fill
            style={{ objectFit: "cover" }}
            alt="Picture of the author"
          />
        </div>
        <div className="footer-img tiktok">
          <Image
            src={image}
            loading='eager'
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
