import React, { useState } from "react";
import styled from "styled-components";
import { FaTrophy } from "react-icons/fa";
import honors from "../../data/honors";
import { Reveal, Section, SectionHeading, Tag } from "../ui";

/* These photos range from 16:9 to portrait. The frame follows each image's own
   shape so nothing is cropped, but stays inside these bounds so one tall
   portrait cannot tower over the rest of the timeline. */
const MIN_RATIO = 0.85;
const MAX_RATIO = 1.78;
const clampRatio = (r) => Math.min(MAX_RATIO, Math.max(MIN_RATIO, r));

const HonorItem = ({ item, side }) => {
  const [expanded, setExpanded] = useState(false);
  const [ratio, setRatio] = useState(null);

  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.target;
    if (w && h) setRatio(clampRatio(w / h));
  };

  return (
    <Row $side={side}>
      <Reveal direction={side === "left" ? "right" : "left"}>
        <Card>
          <figure style={{ aspectRatio: ratio || 1.6 }}>
            {/* blurred copy fills the leftover space on odd shapes */}
            <img className="backdrop" src={item.img} alt="" aria-hidden="true" />
            <img
              className="shot"
              src={item.img}
              alt={item.title}
              loading="lazy"
              onLoad={onLoad}
            />
            <span className="shade" />
            <Tag>{item.place}</Tag>
          </figure>
          <div className="body">
            <h3>{item.title}</h3>
            <small>{item.event}</small>
            <p className={expanded ? "open" : ""}>{item.disc}</p>
            <button type="button" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Read less" : "Read more"}
            </button>
          </div>
        </Card>
      </Reveal>

      <Marker>
        <span className="dot">
          <FaTrophy />
        </span>
        <b>{item.year}</b>
      </Marker>
    </Row>
  );
};

const Honors = () => (
  <Section id="honors">
    <SectionHeading
      eyebrow="Honors"
      title="Some cherished"
      accent="memories"
      text="Hackathon wins, jam prizes and academic honors — the moments that keep me building."
      center
    />

    <Timeline>
      <span className="rail" />
      {honors.map((item, i) => (
        <HonorItem
          key={item.title}
          item={item}
          side={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </Timeline>
  </Section>
);

export default Honors;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.4rem);

  .rail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      transparent,
      rgba(1, 190, 150, 0.5) 12%,
      rgba(124, 92, 255, 0.45) 88%,
      transparent
    );
  }

  @media (max-width: 860px) {
    .rail {
      left: 18px;
      transform: none;
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.4rem;

  > div:first-child {
    grid-column: ${(p) => (p.$side === "left" ? 1 : 3)};
    grid-row: 1;
  }

  > div:last-child {
    grid-column: 2;
    grid-row: 1;
  }

  @media (max-width: 860px) {
    grid-template-columns: auto 1fr;
    gap: 1rem;

    > div:first-child {
      grid-column: 2;
    }

    > div:last-child {
      grid-column: 1;
    }
  }
`;

const Marker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;

  .dot {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    font-size: 0.85rem;
    color: var(--accent);
    background: #080a11;
    border: 1px solid rgba(1, 190, 150, 0.4);
    box-shadow: 0 0 0 6px rgba(1, 190, 150, 0.06);
    transition: all 400ms var(--ease);
  }

  b {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.8rem;
    color: var(--faint);
  }

  @media (max-width: 860px) {
    b {
      display: none;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition: border-color 400ms var(--ease), transform 500ms var(--ease),
    box-shadow 500ms var(--ease);

  figure {
    position: relative;
    margin: 0;
    overflow: hidden;
    background: #0a0c12;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* the whole photo, never cropped */
    .shot {
      object-fit: contain;
      z-index: 1;
      transition: transform 900ms var(--ease);
    }

    .backdrop {
      object-fit: cover;
      filter: blur(26px) saturate(1.3);
      transform: scale(1.2);
      opacity: 0.45;
    }

    .shade {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(
        180deg,
        rgba(5, 6, 10, 0.1) 45%,
        rgba(5, 6, 10, 0.72) 100%
      );
    }

    span:last-child {
      position: absolute;
      bottom: 0.8rem;
      left: 0.9rem;
      z-index: 3;
    }
  }

  .body {
    padding: 1.3rem 1.4rem 1.4rem;

    h3 {
      font-size: 1.15rem;
    }

    small {
      display: block;
      margin: 0.35rem 0 0.7rem;
      color: var(--accent);
      font-size: 0.78rem;
      letter-spacing: 0.04em;
    }

    p {
      font-size: 0.85rem;
      color: var(--muted);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &.open {
        -webkit-line-clamp: unset;
        display: block;
      }
    }

    button {
      margin-top: 0.7rem;
      padding: 0;
      background: none;
      border: none;
      color: var(--accent);
      font-size: 0.8rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &:hover {
    border-color: var(--border-strong);
    transform: translateY(-3px);
    box-shadow: var(--shadow);
  }

  &:hover .shot {
    transform: scale(1.05);
  }

`;
