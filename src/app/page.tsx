import Hero from "@/components/(LandingPage)/(Hero)/(Hero)/Hero";
import SecondSection from "@/components/(LandingPage)/(SecondSection)/SecondSection";
import ThirdSection from "@/components/(LandingPage)/(ThirdSection)/(ThirdSection)/ThirdSection";
import FourthSection from "@/components/(LandingPage)/(FourthSection)/(FourthSection)/FourthSection";

export default function Home() {
  return (
    <div className="main">
      <div className="main-img"></div>
      <Hero />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </div>
  );
}
