import React, { useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import { useReveal, usePointerFine } from "../../hooks";

/* ---------------- Reveal on scroll ---------------- */

const OFFSETS = {
  up: "0, 34px, 0",
  down: "0, -34px, 0",
  left: "-40px, 0, 0",
  right: "40px, 0, 0",
  none: "0, 0, 0",
};

const RevealBox = styled.div`
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: ${(p) =>
    p.$visible
      ? "none"
      : `translate3d(${OFFSETS[p.$direction] || OFFSETS.up}) scale(${
          p.$direction === "zoom" ? 0.94 : 1
        })`};
  transition: opacity ${(p) => p.$duration}ms var(--ease)
      ${(p) => p.$delay}ms,
    transform ${(p) => p.$duration}ms var(--ease) ${(p) => p.$delay}ms;
  will-change: opacity, transform;
`;

export const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 750,
  className,
  once = true,
  ...rest
}) => {
  const [ref, visible] = useReveal({ once });
  return (
    <RevealBox
      ref={ref}
      className={className}
      $visible={visible}
      $direction={direction}
      $delay={delay}
      $duration={duration}
      {...rest}
    >
      {children}
    </RevealBox>
  );
};

/* ---------------- Section shell + heading ---------------- */

export const Section = styled.section`
  position: relative;
  width: min(1180px, 88%);
  margin: 0 auto;
  padding: clamp(4.5rem, 9vw, 8rem) 0;

  @media (max-width: 840px) {
    width: 90%;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);

  &::before {
    content: "";
    width: 26px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent));
  }
`;

const HeadingBox = styled.div`
  max-width: 640px;
  margin-bottom: clamp(2.5rem, 5vw, 3.75rem);
  ${(p) =>
    p.$center &&
    css`
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    `}

  h2 {
    font-size: clamp(1.9rem, 4.4vw, 3rem);
    margin: 0.9rem 0 0;
  }

  p {
    color: var(--muted);
    margin-top: 1rem;
    font-size: 0.98rem;
  }
`;

export const SectionHeading = ({ eyebrow, title, accent, text, center }) => (
  <HeadingBox $center={center}>
    <Reveal direction="up">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>
        {title} {accent && <span className="gradient-text">{accent}</span>}
      </h2>
      {text && <p>{text}</p>}
    </Reveal>
  </HeadingBox>
);

/* ---------------- Buttons ---------------- */

const buttonBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.7rem;
  border-radius: 50px;
  border: 1px solid transparent;
  font-weight: 500;
  font-size: 0.94rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 500ms var(--ease), box-shadow 400ms var(--ease),
    border-color 400ms var(--ease), color 300ms var(--ease);
  will-change: transform;

  svg {
    font-size: 1.1rem;
    transition: transform 400ms var(--ease);
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase};
  color: #04120f;
  background: var(--gradient);
  background-size: 180% 180%;
  box-shadow: 0 14px 34px -16px rgba(1, 190, 150, 0.9);
  font-weight: 600;
  animation: gradientShift 8s ease-in-out infinite;

  &:hover {
    box-shadow: 0 20px 46px -16px rgba(36, 211, 238, 0.75);
  }
`;

export const GhostButton = styled.button`
  ${buttonBase};
  color: var(--text);
  background: var(--surface);
  border-color: var(--border);
  backdrop-filter: blur(10px);

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

/** Wraps a button so it leans toward the cursor. */
export const Magnetic = ({ children, strength = 0.28 }) => {
  const ref = useRef(null);
  const fine = usePointerFine();

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || !fine) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [fine, strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <MagneticBox
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      $enabled={fine}
    >
      {children}
    </MagneticBox>
  );
};

const MagneticBox = styled.div`
  display: inline-flex;
  transition: transform 600ms var(--ease);
  will-change: transform;
`;

/* ---------------- Chips ---------------- */

export const Chip = styled.button`
  padding: 0.45rem 1.05rem;
  border-radius: 50px;
  font-size: 0.82rem;
  cursor: pointer;
  white-space: nowrap;
  color: ${(p) => (p.$active ? "#04120f" : "var(--muted)")};
  background: ${(p) => (p.$active ? "var(--accent)" : "var(--surface)")};
  border: 1px solid ${(p) => (p.$active ? "var(--accent)" : "var(--border)")};
  transition: all 350ms var(--ease);

  &:hover {
    color: ${(p) => (p.$active ? "#04120f" : "var(--text)")};
    border-color: ${(p) => (p.$active ? "var(--accent)" : "var(--border-strong)")};
    transform: translateY(-2px);
  }
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.22rem 0.6rem;
  border-radius: 6px;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid rgba(1, 190, 150, 0.24);
`;

/* ---------------- Glass card ---------------- */

export const GlassCard = styled.div`
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: border-color 400ms var(--ease), transform 500ms var(--ease),
    box-shadow 500ms var(--ease);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(
      420px circle at var(--mx, 50%) var(--my, 0%),
      rgba(1, 190, 150, 0.14),
      transparent 65%
    );
    transition: opacity 400ms var(--ease);
  }

  &:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow);
  }

  &:hover::after {
    opacity: 1;
  }
`;
