import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { usePointerFine, usePrefersReducedMotion } from "../../hooks";

/* A soft light that trails the cursor, plus a small ring that grows
   over anything clickable. Desktop / mouse only. */
const CursorGlow = () => {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!fine || reduced) return undefined;
    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || !ring) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const soft = { ...target };
    let frame = 0;
    let hovering = false;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${
        hovering ? 2.1 : 1
      })`;
    };

    const onOver = (e) => {
      hovering = !!e.target.closest(
        "a, button, input, textarea, [data-cursor='hover']"
      );
      ring.style.borderColor = hovering
        ? "rgba(1, 190, 150, 0.9)"
        : "rgba(255, 255, 255, 0.35)";
    };

    const tick = () => {
      soft.x += (target.x - soft.x) * 0.09;
      soft.y += (target.y - soft.y) * 0.09;
      glow.style.transform = `translate3d(${soft.x}px, ${soft.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <Glow ref={glowRef} aria-hidden="true" />
      <Ring ref={ringRef} aria-hidden="true" />
    </>
  );
};

export default CursorGlow;

const Glow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 460px;
  height: 460px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.55;
  background: radial-gradient(
    circle,
    rgba(1, 190, 150, 0.13) 0%,
    rgba(124, 92, 255, 0.07) 38%,
    transparent 68%
  );
`;

const Ring = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  pointer-events: none;
  z-index: 120;
  transition: transform 220ms var(--ease), border-color 260ms var(--ease);
`;
