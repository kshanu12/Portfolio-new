import { useEffect, useRef } from "react";

export const useScrollController = (itemCount, onScroll) => {
  const scrollValueRef = useRef(-1);
  const autoScrollingRef = useRef(true);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const virtualScrollTop = useRef(0);

  useEffect(() => {
    // Calculate virtual document height
    const virtualDocumentHeight = itemCount * window.innerHeight;
    const virtualScrollHeight = virtualDocumentHeight - window.innerHeight;

    // Virtual scroll handler
    const handleVirtualScroll = (deltaY) => {
      const scrollSpeed = 2; // Adjust scroll sensitivity
      virtualScrollTop.current = Math.max(
        0,
        Math.min(
          virtualScrollHeight,
          virtualScrollTop.current + deltaY * scrollSpeed
        )
      );

      const kVal = (virtualScrollTop.current / virtualScrollHeight) * 2 - 1;
      document.body.style.setProperty("--k", kVal);
      scrollValueRef.current = kVal;

      // Handle infinite loop
      if (Math.abs(kVal) > 0.95) {
        virtualScrollTop.current =
          0.5 * (kVal - Math.sign(kVal) + 1) * virtualScrollHeight;
        const newKVal =
          (virtualScrollTop.current / virtualScrollHeight) * 2 - 1;
        document.body.style.setProperty("--k", newKVal);
        scrollValueRef.current = newKVal;
      }

      // Call the callback with the current k value
      if (onScroll) {
        onScroll(scrollValueRef.current);
      }
    };

    // Auto-scroll animation
    const animateScroll = (time) => {
      if (previousTimeRef.current !== undefined && autoScrollingRef.current) {
        const deltaTime = time - previousTimeRef.current;
        const scrollSpeed = 0.00005; // Adjust for desired speed
        const deltaY = scrollSpeed * deltaTime * window.innerHeight;
        handleVirtualScroll(deltaY);
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateScroll);
    };

    // Mouse wheel handler
    const handleWheel = (e) => {
      e.preventDefault();
      autoScrollingRef.current = false;
      handleVirtualScroll(e.deltaY);

      // Resume auto-scroll after a delay
      clearTimeout(handleWheel.timeout);
      handleWheel.timeout = setTimeout(() => {
        autoScrollingRef.current = true;
      }, 1000);
    };

    // Touch handling
    let startY = 0;
    let startScrollTop = 0;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      startScrollTop = virtualScrollTop.current;
      autoScrollingRef.current = false;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const deltaY = startY - e.touches[0].clientY;
      virtualScrollTop.current = startScrollTop;
      handleVirtualScroll(deltaY);
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        autoScrollingRef.current = true;
      }, 500);
    };

    // Mouse drag handling
    let isDragging = false;
    let startMouseY = 0;
    let startDragScrollTop = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      startMouseY = e.clientY;
      startDragScrollTop = virtualScrollTop.current;
      autoScrollingRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaY = startMouseY - e.clientY;
      virtualScrollTop.current = startDragScrollTop;
      handleVirtualScroll(deltaY);
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoScrollingRef.current = true;
      }, 500);
    };

    // Initialize
    const init = () => {
      virtualScrollTop.current = virtualScrollHeight * 0.5;
      const initialK = (virtualScrollTop.current / virtualScrollHeight) * 2 - 1;
      document.body.style.setProperty("--k", initialK);
      scrollValueRef.current = initialK;

      if (onScroll) {
        onScroll(initialK);
      }

      // Start animation
      previousTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animateScroll);
    };

    // Event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    init();

    return () => {
      // Cleanup
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [itemCount, onScroll]);

  return {
    pauseAutoScroll: () => {
      autoScrollingRef.current = false;
    },
    resumeAutoScroll: () => {
      autoScrollingRef.current = true;
    },
    getCurrentK: () => scrollValueRef.current,
  };
};
