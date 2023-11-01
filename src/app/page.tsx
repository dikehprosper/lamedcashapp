import Hero from "@/components/Hero";
import {TbArrowBigDownLinesFilled} from "react-icons/tb"

export default function Home() {
  return (
    <main className="main">
      <Hero />
      <section className="hero-down-arrow">
        <TbArrowBigDownLinesFilled className="scroll-down-logo" />
      </section>
    </main>
  );
}
