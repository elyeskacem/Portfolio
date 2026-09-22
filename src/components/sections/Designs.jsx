import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  FiMaximize2,
  FiX,
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
} from "react-icons/fi";
import { TbVectorTriangle } from "react-icons/tb";
import designs from "../../data/designs";
import Sculpture from "../three/Sculpture";
import { Reveal, Section, SectionHeading, Chip, Tag } from "../ui";
import { useScrollLock, useTilt, usePointerFine } from "../../hooks";

/** Every view of a piece. Accepts `images: [...]` or the older `image`. */
const imagesOf = (item) => {
  if (Array.isArray(item.images)) return item.images.filter(Boolean);
  return item.image ? [item.image] : [];
};

/* ---------------- one gallery card ---------------- */

const DesignCard = ({ item, index, onOpen }) => {
  const fine = usePointerFine();
  const tilt = useTilt({ max: 6, scale: 1.01, disabled: !fine });
  const images = imagesOf(item);
  const [view, setView] = useState(0);

  // Moving across the picture scrubs through the angles, like a turntable.
  const scrub = (e) => {
    if (!fine || images.length < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setView(Math.min(images.length - 1, Math.max(0, Math.floor(ratio * images.length))));
  };

  const open = () => onOpen(index, view);

  return (
    <Card
      {...tilt}
      $featured={item.featured}
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={open}
      data-cursor="hover"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
    >
      <figure onMouseMove={scrub} onMouseLeave={() => setView(0)}>
        {images.length ? (
          images.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={images.length > 1 ? `${item.title} — view ${i + 1}` : item.title}
              loading="lazy"
              className={i === view ? "on" : ""}
            />
          ))
        ) : (
          <div className="placeholder">
            <TbVectorTriangle />
            <span>In production</span>
          </div>
        )}
        <span className="shade" />
        {images.length > 1 && (
          <>
            <span className="count">
              <FiLayers /> {images.length} views
            </span>
            <span className="views" aria-hidden="true">
              {images.map((_, i) => (
                <i key={i} className={i === view ? "on" : ""} />
              ))}
            </span>
          </>
        )}
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

const Lightbox = ({ items, index, initialView, onClose, onStep }) => {
  const item = items[index];
  const images = item ? imagesOf(item) : [];
  const count = images.length;
  const [view, setView] = useState(initialView);
  const touchX = useRef(null);
  useScrollLock(Boolean(item));

  // a new piece starts on the angle it was opened on (0 when stepping)
  useEffect(() => {
    setView(initialView);
  }, [index, initialView]);

  // arrows over the image cycle angles within this piece
  const cycle = useCallback(
    (dir) => setView((v) => (v + dir + count) % count),
    [count]
  );

  // keyboard walks every angle, then moves on to the next piece
  const walk = useCallback(
    (dir) => {
      const next = view + dir;
      if (count > 1 && next >= 0 && next < count) setView(next);
      else onStep(dir);
    },
    [view, count, onStep]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") walk(1);
      if (e.key === "ArrowLeft") walk(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, walk]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) cycle(dx < 0 ? 1 : -1);
  };

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
          <div className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {count ? (
              images.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={count > 1 ? `${item.title} — view ${i + 1}` : item.title}
                  className={i === view ? "on" : ""}
                />
              ))
            ) : (
              <div className="placeholder">
                <TbVectorTriangle />
              </div>
            )}

            {count > 1 && (
              <>
                <button
                  className="angle left"
                  type="button"
                  aria-label="Previous view"
                  onClick={() => cycle(-1)}
                >
                  <FiChevronLeft />
                </button>
                <button
                  className="angle right"
                  type="button"
                  aria-label="Next view"
                  onClick={() => cycle(1)}
                >
                  <FiChevronRight />
                </button>
                <span className="angle-count">
                  {view + 1} / {count}
                </span>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="thumbs">
              {images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  className={i === view ? "on" : ""}
                  aria-label={`Show view ${i + 1}`}
                  onClick={() => setView(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
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
  const [startView, setStartView] = useState(0);

  const items = useMemo(
    () => (filter === "All" ? designs : designs.filter((d) => d.category === filter)),
    [filter]
  );

  // open on whichever angle the card was showing
  const openAt = useCallback((index, view = 0) => {
    setStartView(view);
    setOpen(index);
  }, []);

  const step = useCallback(
    (dir) => {
      setStartView(0);
      setOpen((current) =>
        current === null
          ? null
          : (current + dir + items.length) % items.length
      );
    },
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
            onOpen={openAt}
          />
        ))}
      </Grid>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          initialView={startView}
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

/* Two big columns: renders deserve the room, and an even count never leaves
   a gap the way mixed-width cards do. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 430px), 1fr));
  gap: 1.3rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
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

    /* every angle is stacked; the active one fades in */
    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 380ms var(--ease-soft), transform 900ms var(--ease),
        filter 700ms var(--ease);

      &.on {
        opacity: 1;
      }
    }

    .count {
      position: absolute;
      top: 0.9rem;
      left: 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.28rem 0.65rem;
      border-radius: 50px;
      font-size: 0.7rem;
      letter-spacing: 0.04em;
      color: var(--text);
      background: rgba(5, 6, 10, 0.62);
      border: 1px solid var(--border-strong);
      backdrop-filter: blur(8px);

      svg {
        color: var(--accent);
      }
    }

    .views {
      position: absolute;
      left: 0.9rem;
      right: 0.9rem;
      bottom: 0.75rem;
      display: flex;
      gap: 4px;

      i {
        flex: 1;
        height: 3px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.25);
        transition: background 300ms var(--ease);

        &.on {
          background: var(--accent);
        }
      }
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

  &:hover figure img {
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

  /* On phones the side arrows would sit on top of the image and thumbnails,
     so every control moves into a bar above the panel. Same breakpoint as
     the panel's single-column layout. */
  @media (max-width: 780px) {
    place-items: start center;
    padding: 4.4rem 0.8rem 0.8rem;

    .close,
    .prev,
    .next {
      top: 0.9rem;
      transform: none;
    }

    .close {
      right: 0.8rem;
    }

    .prev {
      left: 0.8rem;
    }

    .next {
      left: calc(0.8rem + 52px);
      right: auto;
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
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .stage {
    position: relative;
    /* flex-basis auto, so the size below is honoured (flex: 1 zeroes it) */
    flex: 1 0 auto;
    /* close to the 16:9 renders, so they are not framed by thick black bands */
    aspect-ratio: 16 / 10;
    min-height: 280px;
    max-height: min(68vh, 560px);
    touch-action: pan-y;

    > img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0;
      transition: opacity 380ms var(--ease-soft);

      &.on {
        opacity: 1;
      }
    }

    .angle {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      font-size: 1.15rem;
      color: var(--text);
      background: rgba(5, 6, 10, 0.6);
      border: 1px solid var(--border-strong);
      backdrop-filter: blur(8px);
      cursor: pointer;
      transition: all 300ms var(--ease);

      &:hover {
        color: var(--accent);
        border-color: var(--accent);
      }

      &.left {
        left: 0.8rem;
      }

      &.right {
        right: 0.8rem;
      }
    }

    .angle-count {
      position: absolute;
      top: 0.8rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.2rem 0.65rem;
      border-radius: 50px;
      font-size: 0.72rem;
      color: var(--text);
      background: rgba(5, 6, 10, 0.6);
      border: 1px solid var(--border);
    }

    .placeholder {
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      color: var(--accent);
      font-size: 3rem;
      background: radial-gradient(
        70% 60% at 50% 40%,
        rgba(1, 190, 150, 0.16),
        transparent 70%
      );
    }
  }

  .thumbs {
    display: flex;
    gap: 0.5rem;
    padding: 0.7rem;
    overflow-x: auto;
    border-top: 1px solid var(--border);
    scrollbar-width: thin;

    button {
      flex: 0 0 auto;
      width: 72px;
      aspect-ratio: 4 / 3;
      padding: 0;
      border-radius: 8px;
      border: 2px solid transparent;
      background: #0d1018;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.55;
      transition: opacity 300ms var(--ease), border-color 300ms var(--ease);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        opacity: 0.9;
      }

      &.on {
        opacity: 1;
        border-color: var(--accent);
      }
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
    max-height: calc(100vh - 5.2rem);
    max-height: calc(100dvh - 5.2rem);
    overflow-y: auto;

    .stage {
      flex: none;
      min-height: 0;
      height: 42vh;
    }
  }
`;
