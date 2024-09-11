import Hero from "@/components/(LandingPage)/(Hero)/(Hero)/Hero";
import SecondSection from "@/components/(LandingPage)/(SecondSection)/SecondSection";
import ThirdSection from "@/components/(LandingPage)/(ThirdSection)/(ThirdSection)/ThirdSection";
import FourthSection from "@/components/(LandingPage)/(FourthSection)/(FourthSection)/FourthSection";
import FifthSection from "@/components/(LandingPage)/(FifthSection)/FifthSection";
import Footer from "@/components/(LandingPage)/(Footer)/Footer";
import PrivacyFooter from "@/components/(LandingPage)/(Footer)/PrivacyFooter";
import Banner from "@/components/Banner/Banner";
export default function Home() {
  return (
    <>
      <div className='main'>
        <div className='home-banner'>{/* <Banner /> */}</div>
        <Hero />
        <FifthSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <Footer />
        <PrivacyFooter />
      </div>
    </>
  );
}
