import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  FiMaximize2,
  FiX,
  FiArrowLeft,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
} from "react-icons/fi";
import { TbVectorTriangle } from "react-icons/tb";
import { usePointerFine, useScrollLock } from "../../hooks";

/* ------------------------------------------------------------------
   Shared gallery pieces: a card image area that turns between angles on
   hover, and a lightbox with thumbnails. Used by both Projects and the
   3D Design section, which differ only in the details they show.
------------------------------------------------------------------ */

/** Every view of an item. Accepts `images: [...]`, or a single `img`/`image`. */
export const imagesOf = (item) => {
  if (Array.isArray(item.images)) return item.images.filter(Boolean);
  const single = item.img || item.image;
  return single ? [single] : [];
};

/** Sweeping across the picture scrubs through the angles, like a turntable. */
export const useScrub = (count) => {
  const [view, setView] = useState(0);
  const fine = usePointerFine();

  const onMouseMove = useCallback(
    (e) => {
      if (!fine || count < 2) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      setView(Math.min(count - 1, Math.max(0, Math.floor(ratio * count))));
    },
    [fine, count]
  );

  const onMouseLeave = useCallback(() => setView(0), []);

  return { view, setView, scrub: { onMouseMove, onMouseLeave } };
};

/* ---------------- card media ---------------- */

export const Media = ({ images, title, view, ratio = "4 / 3", scrub, emptyLabel = "In production" }) => (
  <Figure $ratio={ratio} {...scrub}>
    {images.length ? (
      images.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt={images.length > 1 ? `${title} — view ${i + 1}` : title}
          loading="lazy"
          className={i === view ? "on" : ""}
        />
      ))
    ) : (
      <div className="placeholder">
        <TbVectorTriangle />
        <span>{emptyLabel}</span>
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
  </Figure>
);

/* ---------------- lightbox ---------------- */

export const Lightbox = ({ items, index, initialView = 0, onClose, onStep, renderMeta }) => {
  const item = items[index];
  const images = item ? imagesOf(item) : [];
  const count = images.length;
  const [view, setView] = useState(initialView);
  const touchX = useRef(null);
  useScrollLock(Boolean(item));

  // a new item starts on the angle it was opened on (0 when stepping)
  useEffect(() => {
    setView(initialView);
  }, [index, initialView]);

  // arrows over the image cycle angles within this item
  const cycle = useCallback(
    (dir) => setView((v) => (v + dir + count) % count),
    [count]
  );

  // keyboard walks every angle, then moves on to the next item
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
          {renderMeta(item)}
          <small>
            {index + 1} / {items.length}
          </small>
        </div>
      </Panel>
    </Overlay>
  );
};

/* ---------------- styles ---------------- */

const Figure = styled.figure`
  position: relative;
  margin: 0;
  aspect-ratio: ${(p) => p.$ratio};
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
    z-index: 2;

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
    z-index: 2;

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
    z-index: 2;
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

    .tags {
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
