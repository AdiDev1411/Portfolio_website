import { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const requestRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Optimize handlers with useCallback
  const onMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseDown = useCallback(() => setClicked(true), []);
  const onMouseUp = useCallback(() => setClicked(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);

  // Animation loop using requestAnimationFrame
  const animateCursor = useCallback(() => {
    if (!cursorDotRef.current || !cursorOutlineRef.current) return;
    
    // Update cursor positions directly with current mouse position
    cursorDotRef.current.style.left = `${mousePos.current.x}px`;
    cursorDotRef.current.style.top = `${mousePos.current.y}px`;
    
    cursorOutlineRef.current.style.left = `${mousePos.current.x}px`;
    cursorOutlineRef.current.style.top = `${mousePos.current.y}px`;
    
    // Continue animation loop
    requestRef.current = requestAnimationFrame(animateCursor);
  }, []);

  // Setup event listeners
  useEffect(() => {
    // Handle link hover events
    const handleLinkHoverEvents = () => {
      const elements = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
      
      elements.forEach(el => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
      
      return () => {
        elements.forEach(el => {
          el.removeEventListener("mouseenter", () => setLinkHovered(true));
          el.removeEventListener("mouseleave", () => setLinkHovered(false));
        });
      };
    };

    // Set up event listeners
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);
    
    // Set up link hover detection and cleanup
    const cleanupHoverEvents = handleLinkHoverEvents();

    // Clean up
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      if (cleanupHoverEvents) {
        cleanupHoverEvents();
      }
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, animateCursor]);

  // Only render if not on a touch device
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className="cursor-dot" 
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : 1})`,
        }}
      />
      <div 
        ref={cursorOutlineRef} 
        className="cursor-outline" 
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : linkHovered ? 1.5 : 1})`,
          width: linkHovered ? '40px' : '36px',
          height: linkHovered ? '40px' : '36px'
        }}
      />
    </>
  );
};

export default CustomCursor; 