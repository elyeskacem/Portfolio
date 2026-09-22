import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { FiExternalLink, FiPlus } from "react-icons/fi";
import designs from "../../data/designs";
import Sculpture from "../three/Sculpture";
import { Reveal, Section, SectionHeading, Chip, Tag, ShowMore } from "../ui";
import { Lightbox, Media, imagesOf, useScrub } from "../ui/Gallery";
import { useTilt, usePointerFine } from "../../hooks";

const STEP = 6;

/* ---------------- one gallery card ---------------- */

const DesignCard = ({ item, index, onOpen }) => {
  const fine = usePointerFine();
  const tilt = useTilt({ max: 6, scale: 1.01, disabled: !fine });
  const images = imagesOf(item);
  const { view, scrub } = useScrub(images.length);

  const open = () => onOpen(index, view);

  return (
    <Card
      {...tilt}
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={open}
      data-cursor="hover"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
    >
      <Media
        images={images}
        title={item.title}
        view={view}
        scrub={scrub}
        ratio={item.featured ? "16 / 9" : "4 / 3"}
      />

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

/* ---------------- section ---------------- */

const Designs = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(designs.map((d) => d.category)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(null);
  const [startView, setStartView] = useState(0);

  const items = useMemo(
    () => (filter === "All" ? designs : designs.filter((d) => d.category === filter)),
    [filter]
  );

  const visible = showAll ? items : items.slice(0, STEP);

  // open on whichever angle the card was showing
  const openAt = useCallback((index, view = 0) => {
    setStartView(view);
    setOpen(index);
  }, []);

  const step = useCallback(
    (dir) => {
      setStartView(0);
      setOpen((current) =>
        current === null ? null : (current + dir + visible.length) % visible.length
      );
    },
    [visible.length]
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
              onClick={() => {
                setFilter(name);
                setShowAll(false);
              }}
            >
              {name}
            </Chip>
          ))}
        </Filters>
      </Reveal>

      <Grid>
        {visible.map((item, i) => (
          <DesignCard
            key={`${filter}-${item.title}`}
            item={item}
            index={i}
            onOpen={openAt}
          />
        ))}
      </Grid>

      {!showAll && items.length > visible.length && (
        <ShowMore>
          <button type="button" onClick={() => setShowAll(true)}>
            <FiPlus /> Show all {items.length} pieces
          </button>
        </ShowMore>
      )}

      {open !== null && (
        <Lightbox
          items={visible}
          index={open}
          initialView={startView}
          onClose={() => setOpen(null)}
          onStep={step}
          renderMeta={(item) => (
            <>
              <Tag>{item.category}</Tag>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="tags">
                {item.software.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer">
                  Open project <FiExternalLink />
                </a>
              )}
            </>
          )}
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
`;
