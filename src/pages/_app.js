import "@/styles/globals.css";
import Layout from "@/components/layout";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
