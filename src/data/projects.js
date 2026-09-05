/* ------------------------------------------------------------------
   PROJECTS TABLE
   Add a project = add one object below. Fields:
     img    : imported image (put files in assets/images/ScreenShots)
     title  : card title
     tags   : any of the values in `projectFilters` (first tag = badge)
     disc   : short description shown on hover / on mobile
     demo   : optional link (video, live site, repo...)
     year   : optional, shown in the corner of the card
------------------------------------------------------------------ */
import TRUCK from "../assets/images/ScreenShots/2dtruck.jpg";
import ARSHOOT1 from "../assets/images/ScreenShots/arshoot.jpg";
import CASTLEESCAPE from "../assets/images/ScreenShots/castleescape.jpg";
import MakeMeLaugh from "../assets/images/ScreenShots/mml.jpg";
import CVAR from "../assets/images/ScreenShots/cvar.jpg";
import GGJ2k22 from "../assets/images/ScreenShots/ggj2k22.jpg";
import MAZERUNNER from "../assets/images/ScreenShots/mazerunner.jpg";
import KITCHEN from "../assets/images/ScreenShots/Screenshot 2023-10-31 201936.jpg";
import VRSELIM from "../assets/images/ScreenShots/vrselim.jpg";
import VRSPACE from "../assets/images/ScreenShots/vrspace.jpg";
import WAR from "../assets/images/ScreenShots/war.jpg";
import CLOTHSIMULATION from "../assets/images/ScreenShots/cloth simulation.jpg";
import SKINSIMULATION from "../assets/images/ScreenShots/skin simulation.jpg";
import AVAXIAOTC from "../assets/images/ScreenShots/otc avaxia.jpg";
import BLACKHOLESIMULATION from "../assets/images/ScreenShots/blackhole.jpg";
import GGJ2025 from "../assets/images/ScreenShots/ggj 2025.jpg";
import CSJAM from "../assets/images/ScreenShots/Simulate Trading.jpg";
import XPLORE from "../assets/images/ScreenShots/xplore.jpg";
import TRAIN from "../assets/images/ScreenShots/TRAINANIM.jpg";
import WH from "../assets/images/ScreenShots/WritingHackathon.jpg";

// The filter chips above the grid. "All" is added automatically.
export const projectFilters = ["VR", "AR", "Game", "Simulation", "Web", "3D"];

const projects = [
  {
    img: VRSPACE,
    title: "Astronaut Daily Life",
    tags: ["VR", "Simulation"],
    disc: "VR application that simulates the daily activities of an astronaut during their missions.",
    demo: "https://youtu.be/S7E82aBW6-M",
  },
  {
    img: GGJ2025,
    title: "Battle Royale VR",
    tags: ["VR", "Game"],
    disc: "Battle royale VR game — collaborative project made at Global Game Jam 2025, 1st prize winner.",
    demo: "https://youtu.be/kdAYK2cGZFc",
    year: "2025",
  },
  {
    img: BLACKHOLESIMULATION,
    title: "Black Hole Simulation",
    tags: ["Simulation", "3D"],
    disc: "Black hole simulation, built in collaboration with an expert from Illinois State University.",
    demo: "https://youtu.be/DVKuLI-FX1s",
  },
  {
    img: MakeMeLaugh,
    title: "Make Me Laugh",
    tags: ["VR", "Game"],
    disc: "VR game: make the king laugh, or you die. Collaborative project made at Global Game Jam 2024.",
    demo: "https://youtu.be/n25m8NGV0_M",
    year: "2024",
  },
  {
    img: WH,
    title: "Living Library",
    tags: ["VR", "Game"],
    disc: "VR virtual library where you pick a book and live the story from the inside.",
    demo: "https://youtu.be/FGO2_8-W5xI",
  },
  {
    img: XPLORE,
    title: "Salakta Museum",
    tags: ["VR", "3D"],
    disc: "VR experience for the Salakta museum where you live the history of the monuments and interact with them.",
    demo: "https://youtu.be/mDeKvPb0_Qg",
  },
  {
    img: AVAXIAOTC,
    title: "Online Training Center",
    tags: ["VR", "Web"],
    disc: "VR and desktop training platform: browse courses, subscribe and join real-time multiplayer sessions.",
    demo: "https://youtu.be/40cRxQzAc2g",
  },
  {
    img: CSJAM,
    title: "Trading Floor VR",
    tags: ["VR", "Simulation"],
    disc: "VR game simulating the trading process in the stock market.",
    demo: "https://youtu.be/AIHstNZeOJk",
  },
  {
    img: CASTLEESCAPE,
    title: "Castle Escape",
    tags: ["Game", "3D"],
    disc: "3D escape game: solve the puzzles to find your way out of the castle.",
    demo: "https://youtu.be/Hi_71OzzvjE",
  },
  {
    img: SKINSIMULATION,
    title: "Skin Simulation",
    tags: ["Simulation", "3D"],
    disc: "Skin simulation coded from scratch in Unity, based on scientific papers.",
    demo: "https://youtu.be/iQHTSLWyh4E",
  },
  {
    img: CLOTHSIMULATION,
    title: "Cloth & Flag Simulation",
    tags: ["Simulation", "3D"],
    disc: "Flag and cloth simulation coded from scratch in Unity, based on scientific papers.",
    demo: "https://youtu.be/dJ9atuVhLMs",
  },
  {
    img: MAZERUNNER,
    title: "Maze Runner",
    tags: ["Game", "3D"],
    disc: "3D maze game built at university, inspired by the look and feel of the Maze Runner movie.",
    demo: "https://youtu.be/7WvUzBu9X8s",
  },
  {
    img: VRSELIM,
    title: "Electrical Safety VR",
    tags: ["VR", "Simulation"],
    disc: "VR simulation of the hazards an electrical worker faces when safety requirements are ignored.",
    demo: "https://youtu.be/RE_3WBZr6Uk",
  },
  {
    img: WAR,
    title: "Palestine: Before & After",
    tags: ["VR", "3D"],
    disc: "VR application showing Palestine before and after the war.",
    demo: "https://youtu.be/coBBQ_2yao8",
  },
  {
    img: ARSHOOT1,
    title: "AR Monster Defense",
    tags: ["AR", "Game"],
    disc: "AR shooting game: kill the monsters before they destroy every house on the map.",
    demo: "https://youtu.be/cUN-HRnO4Ak",
  },
  {
    img: KITCHEN,
    title: "AR Kitchen Shooter",
    tags: ["AR", "Game"],
    disc: "AR shooting game with 4 lives: hit every dish before it disappears or you lose one.",
    demo: "https://www.youtube.com/watch?v=ChMItHTW-K0",
  },
  {
    img: CVAR,
    title: "AR Portfolio",
    tags: ["AR", "3D"],
    disc: "My CV in augmented reality: scanning my photo reveals an interactive UI describing my profile.",
    demo: "https://youtu.be/nayGb0I30rg?si=_irESmONM-u1F68x&t=218",
  },
  {
    img: GGJ2k22,
    title: "Dual Wars",
    tags: ["Game"],
    disc: "2D mobile game made at GGJ 2k22: a collection of shared-screen mini-games for two players.",
    demo: "https://youtu.be/G7H2QHb9RDs",
    year: "2022",
  },
  {
    img: TRUCK,
    title: "Caterpillar Truck",
    tags: ["Game"],
    disc: "2D game: transport the rocks to the other side of the map before the timer runs out.",
    demo: "https://youtu.be/pWjeMm64jpo",
  },
  {
    img: TRAIN,
    title: "Toy Train",
    tags: ["3D"],
    disc: "3D rendered video of a toy train, modelled and rendered in Blender.",
    demo: "https://www.youtube.com/watch?v=9TlRgjuhS4I",
  },
];

export default projects;
