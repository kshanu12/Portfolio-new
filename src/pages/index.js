import Header from "@/components/header";
import Landing from "@/components/landing";

export default function Home() {
  return (
    <>
      <img className="image-gradient" src="gradient.png" alt="gradient" />
      <div className="layer-blur" />
      <Header />
      <Landing />
    </>
  );
}
