import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { contactChannels, emailConfig, socials, profile } from "../../data/site";
import { Reveal, Section, SectionHeading, PrimaryButton, Magnetic } from "../ui";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const form = e.target;
    // form.elements (not form.name) — HTMLFormElement.name shadows named access
    const field = (key) => form.elements.namedItem(key).value.trim();
    const data = {
      name: field("name"),
      email: field("email"),
      message: field("message"),
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
        () => {
          toast.dismiss(loading);
          toast.error("Something went wrong. Try again or email me directly.");
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
        text="Got a VR idea, a game, a website or just a question? My inbox is always open."
      />

      <Grid>
        <Reveal direction="left">
          <Info>
            <Status>
              <i />
              Available for freelance &amp; collaborations
            </Status>

            {contactChannels.map(({ label, value, href, Icon }) => (
              <Channel key={label}>
                <span className="icon">
                  <Icon />
                </span>
                <div>
                  <small>{label}</small>
                  {href ? <a href={href}>{value}</a> : <p>{value}</p>}
                </div>
              </Channel>
            ))}

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
          </Info>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <Form onSubmit={sendEmail} noValidate>
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
              <textarea name="message" rows="6" placeholder="Tell me about your project..." />
            </label>

            <Magnetic strength={0.18}>
              <PrimaryButton type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send message"} <FiSend />
              </PrimaryButton>
            </Magnetic>

            <small>
              Prefer email? <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </small>
          </Form>
        </Reveal>
      </Grid>
    </Section>
  );
};

export default Contact;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(1.5rem, 4vw, 3rem);

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
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
  margin-bottom: 0.6rem;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 0 rgba(1, 190, 150, 0.6);
    animation: pulseGlow 2s ease-in-out infinite;
  }
`;

const Channel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  transition: all 400ms var(--ease);

  .icon {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    border-radius: 12px;
    font-size: 1.1rem;
    color: var(--accent);
    background: var(--gradient-soft);
    border: 1px solid var(--border);
  }

  small {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--faint);
  }

  a,
  p {
    font-size: 0.92rem;
    color: var(--text);
    margin: 0;
    transition: color 300ms var(--ease);
  }

  a:hover {
    color: var(--accent);
  }

  &:hover {
    border-color: var(--border-strong);
    transform: translateX(4px);
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1rem;

  a {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    font-size: 1.05rem;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    transition: all 400ms var(--ease);

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      transform: translateY(-4px);
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: clamp(1.2rem, 3vw, 1.9rem);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(12px);

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

  small {
    color: var(--faint);
    font-size: 0.8rem;

    a {
      color: var(--accent);
    }
  }
`;
