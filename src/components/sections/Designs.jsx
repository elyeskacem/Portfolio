import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FiMaximize2, FiX, FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";
import { TbVectorTriangle } from "react-icons/tb";
import designs from "../../data/designs";
import Sculpture from "../three/Sculpture";
import { Reveal, Section, SectionHeading, Chip, Tag } from "../ui";
import { useScrollLock, useTilt, usePointerFine } from "../../hooks";

/* ---------------- one gallery card ---------------- */

const DesignCard = ({ item, index, onOpen }) => {
  const fine = usePointerFine();
  const tilt = useTilt({ max: 6, scale: 1.01, disabled: !fine });

  return (
    <Card
      {...tilt}
      $featured={item.featured}
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => onOpen(index)}
      data-cursor="hover"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(index)}
    >
      <figure>
        {item.image ? (
          <img src={item.image} alt={item.title} loading="lazy" />
        ) : (
          <div className="placeholder">
            <TbVectorTriangle />
            <span>In production</span>
          </div>
        )}
        <span className="shade" />
        <span className="zoom">
          <FiMaximize2 />
        </span>
      </figure>

      <div className="body">
        <div className="top">
          <Tag>{item.category}</Tag>
          <small>{item.year}</small>
        </div>
        <h3>{item.title}</h3>
        <div className="software">
          {item.software.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

/* ---------------- lightbox ---------------- */

const Lightbox = ({ items, index, onClose, onStep }) => {
  const item = items[index];
  useScrollLock(Boolean(item));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  if (!item) return null;

  return (
    <Overlay onClick={onClose} role="dialog" aria-modal="true">
      <button className="close" type="button" onClick={onClose} aria-label="Close">
        <FiX />
      </button>
      <button
        className="nav prev"
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
      >
        <FiArrowLeft />
      </button>
      <button
        className="nav next"
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
      >
        <FiArrowRight />
      </button>

      <Panel onClick={(e) => e.stopPropagation()}>
        <div className="visual">
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : (
            <div className="placeholder">
              <TbVectorTriangle />
            </div>
          )}
        </div>
        <div className="meta">
          <Tag>{item.category}</Tag>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="software">
            {item.software.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer">
              Open project <FiExternalLink />
            </a>
          )}
          <small>
            {index + 1} / {items.length}
          </small>
        </div>
      </Panel>
    </Overlay>
  );
};

/* ---------------- section ---------------- */

const Designs = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(designs.map((d) => d.category)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () => (filter === "All" ? designs : designs.filter((d) => d.category === filter)),
    [filter]
  );

  const step = useCallback(
    (dir) =>
      setOpen((current) =>
        current === null
          ? null
          : (current + dir + items.length) % items.length
      ),
    [items.length]
  );

  return (
    <Section id="design">
      <SectionHeading
        eyebrow="3D Design"
        title="Modelling, shading &"
        accent="rendering"
        text="Pieces built in Blender and Unity — product renders, environments, shaders and physics studies. Grab the sculpture on the right and spin it."
      />

      <Intro>
        <Reveal direction="left">
          <div className="copy">
            <h3>From first blockout to final frame</h3>
            <p>
              I model, texture, light and render everything myself — whether the
              result is a still image, an animated sequence, or an asset that
              has to run at 90 frames per second inside a headset. Real-time
              constraints shape how I build, so the same piece can end up in a
              render and in a game.
            </p>
            <ul>
              <li>Modelling, UVs and texturing in Blender</li>
              <li>Real-time shading, VFX and lighting in Unity</li>
              <li>Physics studies: cloth, soft bodies, gravity</li>
            </ul>
          </div>
        </Reveal>
        <Reveal direction="right" delay={120}>
          <Sculpture height={360} />
        </Reveal>
      </Intro>

      <Reveal direction="up">
        <Filters>
          {categories.map((name) => (
            <Chip
              key={name}
              type="button"
              $active={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </Chip>
          ))}
        </Filters>
      </Reveal>

      <Grid>
        {items.map((item, i) => (
          <DesignCard
            key={`${filter}-${item.title}`}
            item={item}
            index={i}
            onOpen={setOpen}
          />
        ))}
      </Grid>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      )}
    </Section>
  );
};

export default Designs;

/* ---------------- styles ---------------- */

const Intro = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);

  .copy {
    h3 {
      font-size: 1.35rem;
      margin-bottom: 0.9rem;
    }

    p {
      color: var(--muted);
      font-size: 0.94rem;
    }

    code {
      font-size: 0.84rem;
      color: var(--accent);
      background: var(--accent-soft);
      padding: 0.1rem 0.4rem;
      border-radius: 5px;
    }

    ul {
      margin-top: 1.2rem;
      list-style: none;
      display: grid;
      gap: 0.6rem;
    }

    li {
      position: relative;
      padding-left: 1.5rem;
      font-size: 0.9rem;
      color: var(--muted);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.55em;
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: var(--gradient);
      }
    }
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;

  @media (max-width: 620px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.3rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  grid-column: ${(p) => (p.$featured ? "span 2" : "span 1")};
  position: relative;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  animation: popIn 620ms var(--ease) forwards;
  transition: border-color 400ms var(--ease), box-shadow 500ms var(--ease),
    transform 500ms var(--ease);

  figure {
    position: relative;
    margin: 0;
    aspect-ratio: ${(p) => (p.$featured ? "16 / 9" : "4 / 3")};
    overflow: hidden;
    background: linear-gradient(140deg, #0b1a1a, #131126);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 900ms var(--ease), filter 700ms var(--ease);
    }

    .placeholder {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
      justify-items: center;
      gap: 0.4rem;
      text-align: center;
      padding: 1rem;
      background: radial-gradient(
          80% 70% at 50% 0%,
          rgba(1, 190, 150, 0.18),
          transparent 70%
        ),
        repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.03) 0 10px,
          transparent 10px 20px
        );

      svg {
        font-size: 2.4rem;
        color: var(--accent);
        opacity: 0.75;
        animation: float 5s ease-in-out infinite;
      }

      span {
        font-size: 0.78rem;
        color: var(--muted);
      }

      code {
        font-size: 0.72rem;
        color: var(--accent);
      }
    }

    .shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(5, 6, 10, 0) 40%,
        rgba(5, 6, 10, 0.8) 100%
      );
    }

    .zoom {
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: var(--text);
      background: rgba(5, 6, 10, 0.6);
      border: 1px solid var(--border-strong);
      backdrop-filter: blur(8px);
      opacity: 0;
      transform: translateY(-6px);
      transition: all 400ms var(--ease);
    }
  }

  .body {
    padding: 1.05rem 1.2rem 1.25rem;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    small {
      color: var(--faint);
      font-size: 0.75rem;
    }
  }

  h3 {
    font-size: 1.1rem;
    margin: 0.65rem 0 0.55rem;
  }

  .software {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;

    span {
      font-size: 0.72rem;
      color: var(--muted);
      padding: 0.16rem 0.55rem;
      border-radius: 5px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.02);
    }
  }

  &:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow);
  }

  &:hover img {
    transform: scale(1.06);
    filter: saturate(1.12);
  }

  &:hover .zoom {
    opacity: 1;
    transform: none;
  }

  @media (max-width: 780px) {
    grid-column: span 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 3rem);
  background: rgba(3, 4, 8, 0.82);
  backdrop-filter: blur(14px);
  animation: popIn 320ms var(--ease);

  .close,
  .nav {
    position: absolute;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: var(--text);
    background: var(--surface-strong);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 350ms var(--ease);
    z-index: 2;

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
    }
  }

  .close {
    top: 1.3rem;
    right: 1.3rem;
  }

  .prev {
    left: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .next {
    right: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (max-width: 700px) {
    .prev {
      left: 0.5rem;
    }
    .next {
      right: 0.5rem;
    }
  }
`;

const Panel = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  width: min(1000px, 100%);
  max-height: 86vh;
  border-radius: var(--radius);
  border: 1px solid var(--border-strong);
  background: #0a0c13;
  overflow: hidden;
  box-shadow: 0 40px 90px -40px rgba(0, 0, 0, 1);

  .visual {
    background: #05060a;
    display: grid;
    place-items: center;
    min-height: 240px;

    img {
      width: 100%;
      height: 100%;
      max-height: 86vh;
      object-fit: contain;
    }

    .placeholder {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      min-height: 260px;
      color: var(--accent);
      font-size: 3rem;
      background: radial-gradient(
        70% 60% at 50% 40%,
        rgba(1, 190, 150, 0.16),
        transparent 70%
      );
    }
  }

  .meta {
    padding: 1.8rem 1.7rem;
    overflow-y: auto;

    h3 {
      font-size: 1.5rem;
      margin: 0.8rem 0 0.7rem;
    }

    p {
      color: var(--muted);
      font-size: 0.92rem;
    }

    .software {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-top: 1.2rem;

      span {
        font-size: 0.74rem;
        color: var(--muted);
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        border: 1px solid var(--border);
      }
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
      color: var(--accent);
      font-size: 0.9rem;
      transition: gap 300ms var(--ease);

      &:hover {
        gap: 0.8rem;
      }
    }

    small {
      display: block;
      margin-top: 1.6rem;
      color: var(--faint);
      font-size: 0.75rem;
    }
  }

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    max-height: 88vh;
    overflow-y: auto;

    .visual img {
      max-height: 42vh;
    }
  }
`;
