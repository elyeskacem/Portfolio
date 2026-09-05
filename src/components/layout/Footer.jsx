import React from "react";
import styled from "styled-components";
import { FiArrowUp } from "react-icons/fi";
import { navLinks, profile } from "../../data/site";

const Footer = () => {
  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Bar>
      <Inner>
        <span className="copy">
          © {new Date().getFullYear()} {profile.name}. Built with React &amp;
          three.js.
        </span>

        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button type="button" onClick={scrollUp} aria-label="Back to top">
          <FiArrowUp />
        </button>
      </Inner>
    </Bar>
  );
};

export default Footer;

const Bar = styled.footer`
  border-top: 1px solid var(--border);
  background: rgba(5, 6, 10, 0.6);
`;

const Inner = styled.div`
  width: min(1180px, 88%);
  margin: 0 auto;
  padding: 1.6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;

  .copy {
    font-size: 0.82rem;
    color: var(--faint);
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1.1rem;

    a {
      font-size: 0.82rem;
      color: var(--muted);
      transition: color 300ms var(--ease);

      &:hover {
        color: var(--accent);
      }
    }
  }

  button {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: var(--accent);
    background: var(--surface);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 400ms var(--ease);

    &:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 14px 26px -16px rgba(1, 190, 150, 0.9);
    }
  }

  @media (max-width: 840px) {
    width: 90%;
    justify-content: center;
    text-align: center;

    nav {
      justify-content: center;
    }
  }
`;
