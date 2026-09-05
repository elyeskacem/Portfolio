import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { FiPlay, FiPlus } from "react-icons/fi";
import projects, { projectFilters } from "../../data/projects";
import { Reveal, Section, SectionHeading, Chip, Tag } from "../ui";
import { useTilt, usePointerFine } from "../../hooks";

const STEP = 6;

const ProjectCard = ({ item, index }) => {
  const fine = usePointerFine();
  const tilt = useTilt({ max: 6, scale: 1.01, disabled: !fine });

  return (
    <Card {...tilt} style={{ animationDelay: `${(index % STEP) * 70}ms` }}>
      <figure>
        <img src={item.img} alt={item.title} loading="lazy" />
        <span className="shade" />
      </figure>

      <div className="body">
        <div className="top">
          <Tag>{item.tags[0]}</Tag>
          {item.year && <small>{item.year}</small>}
        </div>
        <h3>{item.title}</h3>
        <p>{item.disc}</p>
        {item.demo && (
          <a href={item.demo} target="_blank" rel="noreferrer">
            <FiPlay /> Watch demo
          </a>
        )}
      </div>
    </Card>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(STEP);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter]
  );

  const visible = filtered.slice(0, limit);
  const filters = ["All", ...projectFilters];

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
                setLimit(STEP);
              }}
            >
              {name}
              {name !== "All" && (
                <b>
                  {projects.filter((p) => p.tags.includes(name)).length}
                </b>
              )}
            </Chip>
          ))}
        </Filters>
      </Reveal>

      <Grid>
        {visible.map((item, i) => (
          <ProjectCard key={`${filter}-${item.title}`} item={item} index={i} />
        ))}
      </Grid>

      {limit < filtered.length && (
        <More>
          <button type="button" onClick={() => setLimit((v) => v + STEP)}>
            <FiPlus /> Show more ({filtered.length - limit} left)
          </button>
        </More>
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
  opacity: 0;
  animation: popIn 620ms var(--ease) forwards;
  transition: border-color 400ms var(--ease), box-shadow 500ms var(--ease),
    transform 500ms var(--ease);

  figure {
    position: relative;
    margin: 0;
    aspect-ratio: 16 / 10;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 900ms var(--ease), filter 600ms var(--ease);
      filter: saturate(0.85) contrast(1.02);
    }

    .shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(5, 6, 10, 0) 35%,
        rgba(5, 6, 10, 0.85) 100%
      );
    }
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

  &:hover img {
    transform: scale(1.07);
    filter: saturate(1.1) contrast(1.05);
  }
`;

const More = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.6rem;

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.8rem;
    border-radius: 50px;
    color: var(--muted);
    background: var(--surface);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 400ms var(--ease);

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      transform: translateY(-3px);
    }
  }
`;
