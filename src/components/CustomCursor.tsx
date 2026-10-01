import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop mouse (fine pointer)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          'button, a, input, select, textarea, [data-interactive="true"], [role="button"]'
        );
        setIsHovered(!!isInteractive);
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop for organic cursor motion
    const loop = () => {
      const ease = 0.35; // Responsive yet smooth tracking
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
      style={{
        transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`,
      }}
    >
      {/* Precision pointer origin dot at exact (0,0) */}
      <div
        className={`absolute -top-1 -left-1 rounded-full transition-all duration-150 ${
          isHovered
            ? 'w-2.5 h-2.5 -top-1.25 -left-1.25 bg-[#E86A78] shadow-[0_0_10px_#E86A78]'
            : 'w-2 h-2 bg-[#24131F] border border-[#FFF9F5]'
        }`}
      />

      {/* Sugarcane Stalk Icon Pointer */}
      <div
        className={`relative origin-top-left transition-all duration-200 ${
          isPressed
            ? 'scale-90 rotate-[-12deg]'
            : isHovered
            ? 'scale-125 rotate-[-20deg]'
            : 'scale-100 rotate-[-8deg]'
        }`}
        style={{
          marginLeft: '4px',
          marginTop: '4px',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Subtle glow when hovered */}
          {isHovered && (
            <ellipse
              cx="14"
              cy="16"
              rx="12"
              ry="14"
              fill="#E86A78"
              fillOpacity="0.25"
              className="animate-pulse"
            />
          )}

          {/* Sugarcane leaf shoots branching from upper node */}
          <path
            d="M9 7 C 6 3, 3 3, 1 5 C 4 7, 7 8, 9 8"
            fill="#B8C98A"
            stroke="#24131F"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 5 C 14 1, 18 1, 20 2 C 17 5, 14 6, 12 7"
            fill="#8BAA54"
            stroke="#24131F"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Sugarcane Stalk Segment 1 (Top) */}
          <rect
            x="8"
            y="7"
            width="6"
            height="7"
            rx="1.5"
            fill="#B8C98A"
            stroke="#24131F"
            strokeWidth="1.2"
          />
          {/* Segment 1 highlight line */}
          <line
            x1="9.5"
            y1="8.5"
            x2="9.5"
            y2="12.5"
            stroke="#FFF9F5"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Cane Node Ring 1 */}
          <rect
            x="7.5"
            y="13"
            width="7"
            height="2"
            rx="1"
            fill="#E86A78"
            stroke="#24131F"
            strokeWidth="1"
          />

          {/* Sugarcane Stalk Segment 2 (Middle) */}
          <rect
            x="8"
            y="14.5"
            width="6"
            height="7"
            rx="1.5"
            fill="#A7BD72"
            stroke="#24131F"
            strokeWidth="1.2"
          />
          {/* Segment 2 highlight line */}
          <line
            x1="9.5"
            y1="16"
            x2="9.5"
            y2="20"
            stroke="#FFF9F5"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Cane Node Ring 2 */}
          <rect
            x="7.5"
            y="20.5"
            width="7"
            height="2"
            rx="1"
            fill="#F4A261"
            stroke="#24131F"
            strokeWidth="1"
          />

          {/* Sugarcane Stalk Segment 3 (Bottom) */}
          <rect
            x="8"
            y="22"
            width="6"
            height="6.5"
            rx="1.5"
            fill="#98AE62"
            stroke="#24131F"
            strokeWidth="1.2"
          />
          {/* Segment 3 highlight line */}
          <line
            x1="9.5"
            y1="23.5"
            x2="9.5"
            y2="27"
            stroke="#FFF9F5"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Bottom Cut Base */}
          <ellipse
            cx="11"
            cy="28"
            rx="2.5"
            ry="1"
            fill="#FFF9F5"
            stroke="#24131F"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
