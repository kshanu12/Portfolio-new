// pages/index.tsx (or .js)
import Landing from "@/components/landing";

export default function Home() {
  return (
    <>
      <img className="image-gradient" src="gradient.png" alt="gradient" />
      <div className="layer-blur" />
      <Landing />
    </>
  );
}
