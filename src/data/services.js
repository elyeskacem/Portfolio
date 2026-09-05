/* ------------------------------------------------------------------
   SERVICES — one object per card.
------------------------------------------------------------------ */
import { GiAce, GiVrHeadset } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import { TbAtom } from "react-icons/tb";

const services = [
  {
    Icon: GiVrHeadset,
    title: "VR / AR Development",
    disc: "Immersive experiences for Meta Quest and mobile AR — training simulators, museums, multiplayer worlds and playful prototypes.",
  },
  {
    Icon: GiAce,
    title: "Game Development",
    disc: "From game-jam prototypes to polished builds: 2D and 3D gameplay, level design, physics, VFX and everything that makes a game feel good.",
  },
  {
    Icon: TbAtom,
    title: "Simulation & Research",
    disc: "Physically-based simulations coded from scratch after scientific papers: cloth, soft bodies, skin and gravitational systems.",
  },
  {
    Icon: CgWebsite,
    title: "Web Development",
    disc: "Full-stack web work: animated, responsive React interfaces on the front, and APIs, databases and real-time services behind them.",
  },
];

export default services;
