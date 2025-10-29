import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
"/src/assets/slide1.jpg",
 "/src/assets/slide2.jpg",
 "/src/assets/slide3.jpg",
];

export default function Slideshow() {
  const slideRef = useRef(null);
  const [index, setIndex] = useState(1); // logical index (1-based)
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTime = 500; // ms
  const autoSlideTime = 3000; // ms

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => handleNext(), autoSlideTime);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle slide transform & infinite loop
  useEffect(() => {
    const slideContainer = slideRef.current;
    if (!slideContainer) return;

    slideContainer.style.transition = isTransitioning
      ? `transform ${transitionTime}ms ease-in-out`
      : "none";
    slideContainer.style.transform = `translateX(-${index * 100}%)`;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      if (index === 0) setIndex(images.length);
      else if (index === images.length + 1) setIndex(1);
    };

    slideContainer.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slideContainer.removeEventListener("transitionend", handleTransitionEnd);
  }, [index, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  };

  // Drag/Swipe
  const startPos = useRef(0);
  const isDragging = useRef(false);

  const handleDragStart = (x) => {
    startPos.current = x;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleDragMove = (x) => {
    if (!isDragging.current) return;
    const dx = x - startPos.current;
    slideRef.current.style.transition = "none";
    slideRef.current.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`;
  };

  const handleDragEnd = (x) => {
    if (!isDragging.current) return;
    const dx = x - startPos.current;
    isDragging.current = false;

    if (dx > 50) handlePrev();
    else if (dx < -50) handleNext();
    else {
      slideRef.current.style.transition = `transform ${transitionTime}ms ease-in-out`;
      slideRef.current.style.transform = `translateX(-${index * 100}%)`;
    }

    setIsPaused(false);
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        shadow-lg
        mt-6
        mb-12
        flex
        justify-center
        items-center
        w-full
        max-w-[85vw]
        md:max-w-5xl
        md:mb-8
        sm:max-w-full
        sm:mb-4
        min-h-[600px]    // <-- increased height
        md:min-h-[600px]
      "
      style={{
        marginLeft: "5px",
        marginRight: "5px",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={(e) => handleDragEnd(e.clientX)}
      onMouseLeaveCapture={(e) => handleDragEnd(e.clientX)}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
    >
      {/* Slides */}
      <div ref={slideRef} className="flex w-full items-center h-full">
        {extendedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="w-full h-full flex-shrink-0 object-contain select-none bg-black"
            style={{ minHeight: "600px", maxHeight: "600px" }} // increased image height
            draggable={false}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              idx + 1 === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setIndex(idx + 1);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
