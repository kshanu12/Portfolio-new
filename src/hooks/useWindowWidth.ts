import { useState, useEffect } from "react";

function useWindowWidth() {
        const [windowWidth, setWindowWidth] = useState(null);

        useEffect(() => {
          if (typeof window !== "undefined") {
            const updateWidth = () => setWindowWidth(window.innerWidth);
            updateWidth();
            window.addEventListener("resize", updateWidth);
            return () => window.removeEventListener("resize", updateWidth);
          }
        }, []);
    
    return { windowWidth };
}

export default useWindowWidth;
