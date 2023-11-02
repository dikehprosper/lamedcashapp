import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="main">
      <div className="main-img"></div>
      <Hero />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "300px",
          background: "green",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
            display: "flex",
            background: "red",
          }}
        >
          <div style={{ fontSize: "10vw" }}>kjsbvsd</div>
        </div>
      </div>
    </div>
  );
}
