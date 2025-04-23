import Header from "@/components/header";
import Landing from "@/components/landing";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <img className="image-gradient" src="gradient.png" alt="gradient" />
      <div className="layer-blur" />
      <Header />
      <Landing />
    </>
  );
}
