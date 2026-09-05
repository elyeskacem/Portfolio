import React from "react";
import styled from "styled-components";
import services from "../../data/services";
import skills from "../../data/skills";
import { Reveal, Section, SectionHeading, GlassCard } from "../ui";
import { useTilt, usePointerFine } from "../../hooks";

const ServiceCard = ({ item, index }) => {
  const fine = usePointerFine();
  const tilt = useTilt({ max: 7, scale: 1.015, disabled: !fine });
  const { Icon, title, disc } = item;

  return (
    <Card {...tilt}>
      <em>0{index + 1}</em>
      <span className="icon">
        <Icon />
      </span>
      <h3>{title}</h3>
      <p>{disc}</p>
    </Card>
  );
};

const Services = () => (
  <Section id="services">
    <SectionHeading
      eyebrow="What I do"
      title="Services I"
      accent="offer"
      text="From immersive headsets to the browser — I design and build the whole experience, then make sure it runs smoothly."
    />

    <Grid>
      {services.map((item, i) => (
        <Reveal key={item.title} direction="up" delay={i * 90}>
          <ServiceCard item={item} index={i} />
        </Reveal>
      ))}
    </Grid>

    <Reveal direction="up" delay={120}>
      <MarqueeStrip>
        <div className="track">
          {[...skills, ...skills].map((skill, i) => (
            <span key={`${skill}-${i}`}>
              {skill}
              <i>◆</i>
            </span>
          ))}
        </div>
      </MarqueeStrip>
    </Reveal>
  </Section>
);

export default Services;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.2rem;

  > div {
    height: 100%;
  }
`;

const Card = styled(GlassCard)`
  height: 100%;
  padding: 1.9rem 1.6rem;
  transform-style: preserve-3d;

  em {
    position: absolute;
    top: 1.1rem;
    right: 1.3rem;
    font-family: "Space Grotesk", sans-serif;
    font-style: normal;
    font-size: 1.6rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.05);
    transition: color 400ms var(--ease);
  }

  .icon {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    font-size: 1.65rem;
    color: var(--accent);
    background: var(--gradient-soft);
    border: 1px solid var(--border);
    transition: transform 500ms var(--ease), color 400ms var(--ease);
  }

  h3 {
    font-size: 1.15rem;
    margin: 1.15rem 0 0.6rem;
  }

  p {
    font-size: 0.9rem;
    color: var(--muted);
    margin: 0;
  }

  &:hover em {
    color: rgba(1, 190, 150, 0.22);
  }

  &:hover .icon {
    transform: translateY(-4px) rotate(-8deg);
    color: var(--accent-2);
  }
`;

const MarqueeStrip = styled.div`
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding: 1rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );

  .track {
    display: flex;
    width: max-content;
    animation: marquee 32s linear infinite;
  }

  &:hover .track {
    animation-play-state: paused;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 1.4rem;
    padding-right: 1.4rem;
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.95rem;
    color: var(--muted);
    white-space: nowrap;
  }

  i {
    font-size: 0.5rem;
    color: var(--accent);
    font-style: normal;
  }
`;
