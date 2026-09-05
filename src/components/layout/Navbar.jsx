import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GiCandleFlame } from "react-icons/gi";
import { navLinks } from "../../data/site";
import { useScrollProgress, useScrollSpy, useScrollLock } from "../../hooks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ids = useMemo(() => navLinks.map((l) => l.href.replace("#", "")), []);
  const active = useScrollSpy(ids);
  const progress = useScrollProgress();

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Bar $scrolled={scrolled} $open={open}>
      <Progress style={{ transform: `scaleX(${progress})` }} />
      <Inner>
        <Logo href="#home" onClick={() => setOpen(false)}>
          <span className="flame">
            <GiCandleFlame />
          </span>
          <b>
            Elyes<i>.</i>
          </b>
        </Logo>

        <Links $open={open}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.replace("#", "") ? "active" : ""}
              style={{ "--i": i }}
              onClick={() => setOpen(false)}
            >
              <em>0{i + 1}</em>
              {link.label}
            </a>
          ))}
          <MobileCta href="#contact" onClick={() => setOpen(false)}>
            Let&apos;s talk
          </MobileCta>
        </Links>

        <Cta href="#contact">Let&apos;s talk</Cta>

        <Burger
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          $open={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </Burger>
      </Inner>
    </Bar>
  );
};

export default Navbar;

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  transition: background 500ms var(--ease), border-color 500ms var(--ease),
    backdrop-filter 500ms var(--ease);
  background: ${(p) =>
    p.$scrolled || p.$open ? "rgba(5, 6, 10, 0.72)" : "transparent"};
  border-bottom: 1px solid
    ${(p) => (p.$scrolled && !p.$open ? "var(--border)" : "transparent")};
  backdrop-filter: ${(p) => (p.$scrolled || p.$open ? "blur(14px)" : "none")};
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 100%;
  transform-origin: left;
  background: var(--gradient);
  transition: transform 120ms linear;
`;

const Inner = styled.nav`
  width: min(1180px, 88%);
  margin: 0 auto;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 840px) {
    width: 90%;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 101;
  font-family: "Space Grotesk", sans-serif;

  .flame {
    display: grid;
    place-items: center;
    font-size: 1.45rem;
    color: var(--accent);
    filter: drop-shadow(0 0 10px rgba(1, 190, 150, 0.6));
    animation: pulseGlow 3s ease-in-out infinite;
  }

  b {
    font-size: 1.12rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  i {
    color: var(--accent);
    font-style: normal;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1.9rem;

  a {
    position: relative;
    font-size: 0.92rem;
    color: var(--muted);
    transition: color 320ms var(--ease);

    em {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px;
      height: 1px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 420ms var(--ease);
    }

    &:hover,
    &.active {
      color: var(--text);
    }

    &:hover::after,
    &.active::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  @media (max-width: 900px) {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 1.3rem;
    background: linear-gradient(160deg, #070810 0%, #0c0f18 100%);
    clip-path: ${(p) =>
      p.$open ? "circle(140% at 100% 0)" : "circle(0% at 100% 0)"};
    transition: clip-path 750ms var(--ease);
    z-index: 100;

    a {
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.85rem;
      color: var(--text);
      display: flex;
      align-items: baseline;
      gap: 0.7rem;
      opacity: ${(p) => (p.$open ? 1 : 0)};
      transform: translateY(${(p) => (p.$open ? "0" : "18px")});
      transition: opacity 500ms var(--ease)
          calc(120ms + var(--i) * 70ms),
        transform 500ms var(--ease) calc(120ms + var(--i) * 70ms),
        color 300ms var(--ease);

      em {
        display: block;
        font-size: 0.72rem;
        font-style: normal;
        letter-spacing: 0.1em;
        color: var(--accent);
      }

      &::after {
        display: none;
      }

      &.active {
        color: var(--accent);
      }
    }
  }
`;

const ctaStyles = `
  padding: 0.62rem 1.35rem;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  transition: all 400ms var(--ease);
`;

const Cta = styled.a`
  ${ctaStyles};

  &:hover {
    color: #04120f;
    background: var(--accent);
    border-color: var(--accent);
    box-shadow: 0 12px 30px -14px rgba(1, 190, 150, 0.9);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileCta = styled.a`
  display: none;

  @media (max-width: 900px) {
    ${ctaStyles};
    display: inline-block;
    margin-top: 1rem;
    font-size: 1rem !important;
    color: var(--accent) !important;
    border-color: var(--accent);
  }
`;

const Burger = styled.button`
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  cursor: pointer;
  z-index: 101;

  span {
    position: absolute;
    left: 50%;
    width: 17px;
    height: 1.6px;
    background: var(--text);
    border-radius: 2px;
    transition: transform 420ms var(--ease), opacity 200ms var(--ease);
  }

  span:first-child {
    transform: ${(p) =>
      p.$open
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, calc(-50% - 4px))"};
    top: 50%;
  }

  span:last-child {
    transform: ${(p) =>
      p.$open
        ? "translate(-50%, -50%) rotate(-45deg)"
        : "translate(-50%, calc(-50% + 4px))"};
    top: 50%;
  }

  @media (max-width: 900px) {
    display: block;
  }
`;
