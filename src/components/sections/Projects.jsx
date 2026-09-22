import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { FiPlay, FiPlus } from "react-icons/fi";
import projects, { projectFilters } from "../../data/projects";
import { Reveal, Section, SectionHeading, Chip, Tag, ShowMore } from "../ui";
import { Lightbox, Media, imagesOf, useScrub } from "../ui/Gallery";
import { useTilt, usePointerFine } from "../../hooks";

const STEP = 6;

const ProjectCard = ({ item, index, onOpen }) => {
  const fine = usePointerFine();
  const tilt = useTilt({ max: 6, scale: 1.01, disabled: !fine });
  const images = imagesOf(item);
  const { view, scrub } = useScrub(images.length);

  const open = () => onOpen(index, view);

  return (
    <Card
      {...tilt}
      style={{ animationDelay: `${(index % STEP) * 70}ms` }}
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
        ratio="16 / 10"
        emptyLabel="Coming soon"
      />

      <div className="body">
        <div className="top">
          <Tag>{item.tags[0]}</Tag>
          {item.year && <small>{item.year}</small>}
        </div>
        <h3>{item.title}</h3>
        <p>{item.disc}</p>
        {item.demo && (
          <a
            href={item.demo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FiPlay /> Watch demo
          </a>
        )}
      </div>
    </Card>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(null);
  const [startView, setStartView] = useState(0);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter]
  );

  const visible = showAll ? filtered : filtered.slice(0, STEP);
  const filters = ["All", ...projectFilters];

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
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Recent"
        accent="projects"
        text="Virtual reality, augmented reality, games and simulations — built solo, at hackathons and with teams."
      />

      <Reveal direction="up">
        <Filters>
          {filters.map((name) => (
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
              {name !== "All" && (
                <b>{projects.filter((p) => p.tags.includes(name)).length}</b>
              )}
            </Chip>
          ))}
        </Filters>
      </Reveal>

      <Grid>
        {visible.map((item, i) => (
          <ProjectCard
            key={`${filter}-${item.title}`}
            item={item}
            index={i}
            onOpen={openAt}
          />
        ))}
      </Grid>

      {!showAll && filtered.length > visible.length && (
        <ShowMore>
          <button type="button" onClick={() => setShowAll(true)}>
            <FiPlus /> Show all {filtered.length} projects
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
              <Tag>{item.tags[0]}</Tag>
              <h3>{item.title}</h3>
              <p>{item.disc}</p>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
                {item.year && <span>{item.year}</span>}
              </div>
              {item.demo && (
                <a href={item.demo} target="_blank" rel="noreferrer">
                  <FiPlay /> Watch demo
                </a>
              )}
            </>
          )}
        />
      )}
    </Section>
  );
};

export default Projects;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2.2rem;

  b {
    margin-left: 0.4rem;
    font-size: 0.68rem;
    font-weight: 500;
    opacity: 0.6;
  }

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
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
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

  figure img {
    filter: saturate(0.85) contrast(1.02);
  }

  .body {
    position: relative;
    padding: 1.1rem 1.25rem 1.35rem;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    small {
      color: var(--faint);
      font-size: 0.75rem;
    }
  }

  h3 {
    font-size: 1.12rem;
    margin: 0.7rem 0 0.45rem;
  }

  p {
    font-size: 0.85rem;
    color: var(--muted);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 0.9rem;
    font-size: 0.83rem;
    color: var(--accent);
    transition: gap 300ms var(--ease);

    &:hover {
      gap: 0.75rem;
    }
  }

  &:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow);
  }

  &:hover figure img {
    transform: scale(1.07);
    filter: saturate(1.1) contrast(1.05);
  }

  &:hover .zoom {
    opacity: 1;
    transform: none;
  }
`;
