import "./secondQuestion.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import AnimateHeight from "react-animate-height";

const SecondQuestion = ({height, adjustHeight}:any) => {
  return (
    <div
      className="body_innerbody_601"
      aria-expanded={height !== 0}
      aria-controls="example-panel"
      onClick={adjustHeight}
    >
      <div className="body_innerbody_604">
        <p>
          Puis-je désigner un compte spécifique pour mes retraits de fonds ?
        </p>
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
          <p>
            Oui, vous pouvez désigner un montant spécifique pour votre retrait
            de fonds, mais il devrait être le même pour votre demande de retrait
            effectuée sur la plateforme 1xbet.
          </p>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default SecondQuestion;
