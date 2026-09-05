/* ------------------------------------------------------------------
   SITE / PROFILE DATA
   Everything personal lives here. Edit the values, not the components.
------------------------------------------------------------------ */
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import StackIcon from "../assets/images/stack.png";
import Me from "../assets/images/me.jpg";

export const profile = {
  greeting: "Hello, I'm",
  name: "Elyes Kacem",
  // The hero cycles through these one by one.
  roles: [
    "Computer Science Engineer",
    "XR / VR Developer",
    "Game Developer",
    "3D & Simulation Enthusiast",
  ],
  bio: `I'm a computer science engineer building immersive VR/AR experiences, games and
        web applications. I love turning bold ideas into things you can actually walk
        into, play with, and feel.`,
  avatar: Me,
  cv: "CV.pdf", // file lives in /public
  cvFileName: "Elyes Kacem CV.pdf",
  email: "elyeskacem3d@gmail.com",
  phone: "+216 95 578 050",
  phoneHref: "tel:+21695578050",
  locations: ["Manouba, Tunisia", "Bizerte, Tunisia"],
};

// Floating chips around the hero portrait.
export const heroBadges = [
  { label: "Unity", top: "8%", left: "-6%", delay: "0s" },
  { label: "Blender", top: "38%", left: "88%", delay: "0.9s" },
  { label: "Three.js", top: "76%", left: "-4%", delay: "1.8s" },
  { label: "React", top: "92%", left: "72%", delay: "2.6s" },
];

// Small counters under the hero text.
export const stats = [
  { value: "20+", label: "Shipped projects" },
  { value: "10", label: "Awards & honors" },
  { value: "2x", label: "Major of promotion" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "3D Design", href: "#design" },
  { label: "Honors", href: "#honors" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/elyeskacem/",
    Icon: AiFillLinkedin,
  },
  { name: "GitHub", url: "https://github.com/ElyesKacem", Icon: AiFillGithub },
  {
    name: "Instagram",
    url: "https://www.instagram.com/elyes_kacem/",
    Icon: AiOutlineInstagram,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCcAgtI4-m4f0uyxuzMSO6cw",
    Icon: AiFillYoutube,
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/15450130/elyes-kacem",
    image: StackIcon,
  },
];

export const contactChannels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: FiMail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    Icon: FiPhoneCall,
  },
  {
    label: "Based in",
    value: profile.locations.join(" · "),
    href: null,
    Icon: FiMapPin,
  },
];

// EmailJS credentials used by the contact form.
export const emailConfig = {
  serviceId: "service_vjb863n",
  templateId: "template_yk7u2ep",
  publicKey: "5gD_0ucIcIWM-fVnL",
};
