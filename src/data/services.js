/* ------------------------------------------------------------------
   SERVICES — one object per card.
------------------------------------------------------------------ */
import { GiAce, GiVrHeadset, GiCube } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import { BiAbacus } from "react-icons/bi";
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
    Icon: CgWebsite,
    title: "Frontend Development",
    disc: "Turning design concepts into fast, responsive interfaces with modern React — animated, accessible and pleasant to use on any screen.",
  },
  {
    Icon: BiAbacus,
    title: "Backend Development",
    disc: "APIs, databases and real-time services that keep applications running smoothly and securely behind the scenes.",
  },
  {
    Icon: GiCube,
    title: "3D Design & Rendering",
    disc: "Modelling, texturing, lighting and rendering in Blender — product shots, environments and animated sequences.",
  },
  {
    Icon: TbAtom,
    title: "Simulation & Research",
    disc: "Physically-based simulations coded from scratch after scientific papers: cloth, soft bodies, skin and gravitational systems.",
  },
];

export default services;
