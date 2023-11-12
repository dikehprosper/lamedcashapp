
import "./firstQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";

const FirstQuestion = ({height, adjustHeight}:any) => {
  return (
    <div
      className="body_innerbody_501"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
    >
      <div className="body_innerbody_504">
        <p>Comment se déroule le processus de retrait avec Espece ?</p>
        {height === 0 ? (
          <MdOutlineKeyboardArrowUp fontSize="32px" color="#bdff00" />
        ) : (
          <MdOutlineKeyboardArrowDown fontSize="32px" color="#bdff00" />
        )}
      </div>
      <AnimateHeight
        id="example-panel"
        duration={400}
        height={height}
        className="animate-height"
      >
        <div className="requirements-container">
          <p>Conditions De Retrait Des Espèces :</p>
          <ul>
            <li>1. Votre identifiant 1xbet</li>
            <li>2. Code de retrait 1Xbet obtenu depuis la plateforme 1xbet</li>
            <li>3. Montante</li>
            <li>4. Votre nom et numéro MOMO</li>
          </ul>
          <p>
            Après avoir fourni ces informations, votre demande de retrait sera
            traité.
          </p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default FirstQuestion;
