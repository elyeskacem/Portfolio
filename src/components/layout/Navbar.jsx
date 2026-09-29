import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GiCandleFlame } from "react-icons/gi";
import { navLinks } from "../../data/site";
import {
  useMediaQuery,
  useScrollLock,
  useScrollProgress,
  useScrollSpy,
} from "../../hooks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ids = useMemo(() => navLinks.map((l) => l.href.replace("#", "")), []);
  const active = useScrollSpy(ids);
  const progress = useScrollProgress();
  const isDesktop = useMediaQuery("(min-width: 901px)");

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

  // Leaving the menu open while resizing up to desktop would strand it.
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  const isActive = (href) => active === href.replace("#", "");

  return (
    <>
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

          <Links>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "active" : ""}
              >
                {link.label}
              </a>
            ))}
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

      {/* Deliberately outside <Bar>: an ancestor with backdrop-filter becomes
          the containing block for fixed children, which squashed this overlay
          into the 72px header and stacked every link on top of the others. */}
      <MobileMenu $open={open} aria-hidden={!open}>
        <nav>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "active" : ""}
              style={{ "--i": i }}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <em>0{i + 1}</em>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <MobileCta
          href="#contact"
          $open={open}
          style={{ "--i": navLinks.length }}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          Let&apos;s talk
        </MobileCta>
      </MobileMenu>
    </>
  );
};

export default Navbar;

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* sits above the mobile overlay so the logo and close button stay usable */
  z-index: 120;
  transition: background 500ms var(--ease), border-color 500ms var(--ease),
    backdrop-filter 500ms var(--ease);
  background: ${(p) =>
    p.$scrolled && !p.$open ? "rgba(5, 6, 10, 0.72)" : "transparent"};
  border-bottom: 1px solid
    ${(p) => (p.$scrolled && !p.$open ? "var(--border)" : "transparent")};
  backdrop-filter: ${(p) => (p.$scrolled && !p.$open ? "blur(14px)" : "none")};
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
  position: relative; /* z-index does nothing on a static element */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
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
    display: none;
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

const Burger = styled.button`
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: ${(p) => (p.$open ? "transparent" : "var(--surface)")};
  cursor: pointer;
  z-index: 2;

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 17px;
    height: 1.6px;
    background: var(--text);
    border-radius: 2px;
    transition: transform 420ms var(--ease);
  }

  span:first-child {
    transform: ${(p) =>
      p.$open
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, calc(-50% - 4px))"};
  }

  span:last-child {
    transform: ${(p) =>
      p.$open
        ? "translate(-50%, -50%) rotate(-45deg)"
        : "translate(-50%, calc(-50% + 4px))"};
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 900px) {
    position: fixed;
    inset: 0;
    z-index: 110;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* clears the header, and lets the list scroll on short screens */
    padding: calc(var(--nav-h) + 1.25rem) 1.75rem 2rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: radial-gradient(
        60% 40% at 100% 0%,
        rgba(1, 190, 150, 0.16),
        transparent 70%
      ),
      linear-gradient(160deg, #070810 0%, #0c0f18 100%);
    clip-path: ${(p) =>
      p.$open ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)"};
    visibility: ${(p) => (p.$open ? "visible" : "hidden")};
    transition: clip-path 700ms var(--ease),
      visibility 0s linear ${(p) => (p.$open ? "0s" : "700ms")};

    nav {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* scoped to nav: a bare "a" here outranks MobileCta's own rules and
       strips its padding and centering */
    nav a {
      display: flex;
      align-items: baseline;
      gap: 0.85rem;
      padding: 0.85rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      font-family: "Space Grotesk", sans-serif;
      /* shrinks on narrow phones rather than wrapping over itself */
      font-size: clamp(1.35rem, 7vw, 1.9rem);
      line-height: 1.2;
      color: var(--text);
      opacity: ${(p) => (p.$open ? 1 : 0)};
      transform: translateY(${(p) => (p.$open ? "0" : "16px")});
      transition: opacity 450ms var(--ease) calc(150ms + var(--i) * 65ms),
        transform 450ms var(--ease) calc(150ms + var(--i) * 65ms),
        color 300ms var(--ease);

      em {
        flex: 0 0 auto;
        font-size: 0.7rem;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.1em;
        color: var(--accent);
      }

      &.active {
        color: var(--accent);
      }
    }
  }

  /* landscape phones: start at the top so nothing is cut off */
  @media (max-width: 900px) and (max-height: 620px) {
    justify-content: flex-start;

    nav a {
      padding: 0.55rem 0;
      font-size: clamp(1.1rem, 6vw, 1.45rem);
    }
  }
`;

const MobileCta = styled.a`
  ${ctaStyles};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 100%;
  margin-top: 1.75rem;
  padding: 0.95rem 1.35rem;
  text-align: center;
  font-size: 1rem;
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(1, 190, 150, 0.1);
  opacity: ${(p) => (p.$open ? 1 : 0)};
  transition: opacity 450ms var(--ease) calc(150ms + var(--i) * 65ms);
`;
