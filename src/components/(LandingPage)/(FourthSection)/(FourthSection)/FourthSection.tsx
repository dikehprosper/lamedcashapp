import "./fourthSection.css";
import FirstQuestion from "../(components)/(FirstQuestion)/FirstQuestion";
import SecondQuestion from "../(components)/(FirstQuestion)/FirstQuestion";

const FourthSection = () => {
  return (
    <div className="component_400">
      <h2>Questions fréquemment posées</h2>
      <div className="body_400">
        <FirstQuestion />
        <SecondQuestion />
      </div>
    </div>
  );
};
export default FourthSection;
