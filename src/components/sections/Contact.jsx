import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { emailConfig, socials } from "../../data/site";
import services from "../../data/services";
import { Reveal, Section, SectionHeading, PrimaryButton, Magnetic } from "../ui";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    // form.elements (not form.name) — HTMLFormElement.name shadows named access
    const field = (key) => form.elements.namedItem(key).value.trim();
    // These keys are the {{variables}} available in the EmailJS template.
    const data = {
      name: field("name"),
      email: field("email"),
      message: field("message"),
      time: new Date().toLocaleString(),
    };

    if (!data.name || !data.email || !data.message) {
      toast.error("Please fill in every field.");
      return;
    }

    setSending(true);
    const loading = toast.loading("Sending...");

    emailjs
      .send(
        emailConfig.serviceId,
        emailConfig.templateId,
        data,
        emailConfig.publicKey
      )
      .then(
        () => {
          toast.dismiss(loading);
          toast.success("Message sent — talk soon!");
          form.reset();
          setSending(false);
        },
        (err) => {
          // Keep the real reason visible — EmailJS failures are usually
          // account-side (an expired Gmail connection, a quota), not a bad form.
          console.error("EmailJS:", err && (err.status || ""), err && (err.text || err.message));
          toast.dismiss(loading);
          toast.error("Sending failed — please try again in a moment.", {
            duration: 6000,
          });
          setSending(false);
        }
      );
  };

  return (
    <Section id="contact">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0d1018",
            color: "#e9eef7",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        accent="together"
        text="Got a VR idea, a game, a website or just a question? Send a message and I'll get back to you."
      />

      <Grid>
        <Reveal direction="left">
          <Pitch>
            <Status>
              <i />
              Available for freelance &amp; collaborations
            </Status>

            <h3>Tell me about your idea</h3>
            <p>
              Whether it&apos;s an immersive experience, a game, a simulation or
              a website, I&apos;m happy to talk it through — from a first rough
              idea to a detailed brief.
            </p>

            <Label>I can help with</Label>
            <Topics>
              {services.map(({ Icon, title }) => (
                <li key={title}>
                  <Icon />
                  {title}
                </li>
              ))}
            </Topics>

            <Footer>
              <Label>Find me online</Label>
              <SocialRow>
                {socials.map(({ name, url, Icon, image }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    title={name}
                  >
                    {Icon ? <Icon /> : <img src={image} alt="" width={16} />}
                  </a>
                ))}
              </SocialRow>
            </Footer>
          </Pitch>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <Form onSubmit={sendEmail} noValidate>
            <FormTitle>Send a message</FormTitle>
            <label>
              <span className="icon">
                <CgProfile />
              </span>
              <input name="name" type="text" placeholder="Your name" />
            </label>
            <label>
              <span className="icon">
                <MdAlternateEmail />
              </span>
              <input name="email" type="email" placeholder="Your email" />
            </label>
            <label className="area">
              <span className="icon">
                <HiOutlineChatAlt2 />
              </span>
              <textarea name="message" rows="7" placeholder="Tell me about your project..." />
            </label>

            <Magnetic strength={0.18}>
              <PrimaryButton type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send message"} <FiSend />
              </PrimaryButton>
            </Magnetic>
          </Form>
        </Reveal>
      </Grid>
    </Section>
  );
};

export default Contact;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: stretch;

  > div {
    height: 100%;
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const panel = `
  height: 100%;
  padding: clamp(1.4rem, 3vw, 2.1rem);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(12px);
`;

const Pitch = styled.div`
  ${panel};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  /* soft accent glow in the corner */
  &::before {
    content: "";
    position: absolute;
    top: -40%;
    right: -30%;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(1, 190, 150, 0.16), transparent 70%);
    pointer-events: none;
  }

  h3 {
    font-size: clamp(1.35rem, 2.6vw, 1.7rem);
    margin: 1.3rem 0 0.7rem;
  }

  > p {
    color: var(--muted);
    font-size: 0.95rem;
    margin: 0;
  }
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  align-self: flex-start;
  padding: 0.45rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid rgba(1, 190, 150, 0.28);

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulseGlow 2s ease-in-out infinite;
  }
`;

const Label = styled.span`
  display: block;
  margin: 1.7rem 0 0.8rem;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--faint);
`;

const Topics = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 0.85rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: rgba(5, 6, 10, 0.35);
    font-size: 0.86rem;
    color: var(--text);
    transition: border-color 350ms var(--ease), transform 350ms var(--ease);

    svg {
      flex: 0 0 auto;
      font-size: 1.1rem;
      color: var(--accent);
    }

    &:hover {
      border-color: rgba(1, 190, 150, 0.4);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 0.4rem;
`;

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  a {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    transition: all 400ms var(--ease);

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      transform: translateY(-4px);
      box-shadow: 0 14px 26px -16px rgba(1, 190, 150, 0.9);
    }
  }
`;

const FormTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

const Form = styled.form`
  ${panel};
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  label {
    display: flex;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: rgba(5, 6, 10, 0.5);
    overflow: hidden;
    transition: border-color 350ms var(--ease), box-shadow 350ms var(--ease);

    &:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px rgba(1, 190, 150, 0.1);
    }

    .icon {
      display: grid;
      place-items: center;
      width: 48px;
      flex: 0 0 48px;
      font-size: 1.05rem;
      color: var(--muted);
      background: rgba(255, 255, 255, 0.03);
      border-right: 1px solid var(--border);
    }

    &.area {
      flex: 1;
    }

    &.area .icon {
      align-items: flex-start;
      padding-top: 1rem;
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text);
    font-size: 0.94rem;
    resize: vertical;

    &::placeholder {
      color: var(--faint);
    }
  }

  button[type="submit"] {
    margin-top: 0.4rem;
  }

  button:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;
