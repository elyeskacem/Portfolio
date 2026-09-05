import React from "react";
import styled from "styled-components";
import { FiDownload, FiArrowRight, FiArrowDown } from "react-icons/fi";
import ParticleField from "../three/ParticleField";
import { Reveal, PrimaryButton, GhostButton, Magnetic, Eyebrow } from "../ui";
import { profile, socials, stats, heroBadges } from "../../data/site";
import { useTypewriter } from "../../hooks";

const Hero = () => {
  const role = useTypewriter(profile.roles);

  const downloadCv = () => {
    const link = document.createElement("a");
    link.href = profile.cv;
    link.download = profile.cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Wrapper id="home">
      <ParticleField />

      <Content>
        <Texts>
          <Reveal direction="up" delay={80}>
            <Eyebrow>{profile.greeting}</Eyebrow>
          </Reveal>

          <Name aria-label={profile.name}>
            {profile.name.split("").map((char, i) => (
              <span
                key={`${char}-${i}`}
                className="gradient-text"
                style={{ animationDelay: `${i * 45}ms` }}
                aria-hidden="true"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </Name>

          <Role>
            <span>{role}</span>
            <i />
          </Role>

          <Reveal direction="up" delay={260}>
            <Bio>{profile.bio}</Bio>
          </Reveal>

          <Reveal direction="up" delay={340}>
            <Actions>
              <Magnetic>
                <PrimaryButton type="button" onClick={downloadCv}>
                  Download CV <FiDownload />
                </PrimaryButton>
              </Magnetic>
              <Magnetic>
                <GhostButton
                  as="a"
                  href="#projects"
                  data-cursor="hover"
                >
                  View my work <FiArrowRight />
                </GhostButton>
              </Magnetic>
            </Actions>
          </Reveal>

          <Reveal direction="up" delay={420}>
            <Socials>
              {socials.map(({ name, url, Icon, image }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                >
                  {Icon ? <Icon /> : <img src={image} alt="" width={17} />}
                </a>
              ))}
            </Socials>
          </Reveal>

          <Reveal direction="up" delay={500}>
            <Stats>
              {stats.map((item) => (
                <div key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </div>
              ))}
            </Stats>
          </Reveal>
        </Texts>

        <Reveal direction="zoom" delay={200} duration={900}>
          <Portrait>
            <div className="ring" />
            <div className="halo" />
            <div className="mirror">
              <img src={profile.avatar} alt={profile.name} />
            </div>
            {heroBadges.map((badge) => (
              <span
                key={badge.label}
                className="badge"
                style={{
                  top: badge.top,
                  left: badge.left,
                  animationDelay: badge.delay,
                }}
              >
                {badge.label}
              </span>
            ))}
          </Portrait>
        </Reveal>
      </Content>

      <ScrollCue href="#services" aria-label="Scroll to content">
        <span>Scroll</span>
        <FiArrowDown />
      </ScrollCue>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: calc(var(--nav-h) + 2.5rem) 0 5rem;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: min(1180px, 88%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }

  @media (max-width: 840px) {
    width: 90%;
  }
`;

const Texts = styled.div`
  max-width: 620px;
`;

const Name = styled.h1`
  font-size: clamp(2.6rem, 7.5vw, 4.6rem);
  line-height: 1.02;
  margin: 0.9rem 0 0.6rem;
  letter-spacing: -0.03em;

  span {
    display: inline-block;
    opacity: 0;
    transform: translateY(28px) rotateX(-40deg);
    animation: letterIn 850ms var(--ease) forwards;
  }

  @keyframes letterIn {
    to {
      opacity: 1;
      transform: none;
    }
  }
`;

const Role = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  justify-content: inherit;
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(1.05rem, 2.4vw, 1.5rem);
  color: var(--text);
  min-height: 2.1rem;

  i {
    display: inline-block;
    width: 2px;
    height: 1.25em;
    background: var(--accent);
    animation: caret 1s steps(2, start) infinite;
  }

  @keyframes caret {
    50% {
      opacity: 0;
    }
  }

  @media (max-width: 940px) {
    justify-content: center;
  }
`;

const Bio = styled.p`
  margin-top: 1.2rem;
  color: var(--muted);
  font-size: 1rem;
  max-width: 33rem;

  @media (max-width: 940px) {
    margin-inline: auto;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.1rem;

  @media (max-width: 940px) {
    justify-content: center;
  }

  @media (max-width: 420px) {
    width: 100%;

    > div,
    button,
    a {
      width: 100%;
    }
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 2rem;

  a {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
    transition: all 420ms var(--ease);

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      transform: translateY(-4px) rotate(-6deg);
      box-shadow: 0 14px 26px -16px rgba(1, 190, 150, 0.9);
    }
  }

  @media (max-width: 940px) {
    justify-content: center;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: clamp(1.4rem, 4vw, 2.8rem);
  margin-top: 2.4rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--border);

  div {
    display: flex;
    flex-direction: column;
  }

  b {
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(1.3rem, 3vw, 1.7rem);
    color: var(--text);
  }

  span {
    font-size: 0.78rem;
    color: var(--faint);
  }

  @media (max-width: 940px) {
    justify-content: center;
  }
`;

const Portrait = styled.div`
  position: relative;
  width: min(24rem, 78vw);
  aspect-ratio: 1;
  display: grid;
  place-items: center;

  .ring {
    position: absolute;
    inset: -6%;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(1, 190, 150, 0.75) 90deg,
      transparent 190deg,
      rgba(124, 92, 255, 0.65) 280deg,
      transparent 360deg
    );
    mask: radial-gradient(circle, transparent 61%, #000 62%);
    -webkit-mask: radial-gradient(circle, transparent 61%, #000 62%);
    animation: spinSlow 14s linear infinite;
  }

  .halo {
    position: absolute;
    inset: 12%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(1, 190, 150, 0.28),
      transparent 68%
    );
    filter: blur(18px);
    animation: pulseGlow 5s ease-in-out infinite;
  }

  .mirror {
    position: relative;
    transform: scaleX(-1);
    animation: float 6s ease-in-out infinite;

    img {
      width: 100%;
      filter: drop-shadow(0 26px 40px rgba(0, 0, 0, 0.55));
    }
  }

  .badge {
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 0.35rem 0.8rem;
    font-size: 0.74rem;
    letter-spacing: 0.04em;
    color: var(--text);
    background: rgba(10, 12, 19, 0.75);
    border: 1px solid var(--border-strong);
    border-radius: 50px;
    backdrop-filter: blur(10px);
    white-space: nowrap;
    animation: float 5.5s ease-in-out infinite;
  }

  @media (max-width: 940px) {
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    .badge {
      font-size: 0.66rem;
      padding: 0.25rem 0.6rem;
    }
  }
`;

const ScrollCue = styled.a`
  position: absolute;
  left: 50%;
  bottom: 1.6rem;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--faint);
  transition: color 300ms var(--ease);

  svg {
    animation: float 2.4s ease-in-out infinite;
  }

  &:hover {
    color: var(--accent);
  }

  @media (max-width: 940px) {
    display: none;
  }
`;
