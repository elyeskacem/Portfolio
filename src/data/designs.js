/* ------------------------------------------------------------------
   3D DESIGN GALLERY  ·  the only file you edit for this section
   ------------------------------------------------------------------
   HOW TO ADD YOUR OWN WORK
   1. Drop the renders in:  src/assets/images/3d/
   2. Import them at the top:
        import ROBOT_FRONT from "../assets/images/3d/robot-front.jpg";
        import ROBOT_SIDE  from "../assets/images/3d/robot-side.jpg";
        import ROBOT_BACK  from "../assets/images/3d/robot-back.jpg";
   3. List them in `images`, first one = the cover:
        images: [ROBOT_FRONT, ROBOT_SIDE, ROBOT_BACK],

   One image is fine too: images: [ROBOT_FRONT].
   With several, visitors sweep the mouse across the card to turn the piece,
   and the lightbox gets thumbnails, arrows and swipe.
   Leave `images: []` and the card shows a styled "In production" placeholder.

   Fields:
     title       : name of the piece
     category    : also used to build the filter chips
     software    : array of tools, shown as small tags
     year        : string, shown next to the title
     description : one or two sentences, shown in the lightbox
     images      : list of imported images (angles), first = cover
     link        : optional external link (LinkedIn, ArtStation, YouTube...)
     featured    : true = wide 16:9 card (good for landscape renders)
------------------------------------------------------------------ */
import TRAIN from "../assets/images/ScreenShots/TRAINANIM.jpg";
import BLACKHOLE from "../assets/images/ScreenShots/blackhole.jpg";

// Online Training Center — VR lounge: wide shot, window corner, alternate
// angle, wing logo detail, ceiling arches, nebula window close-up
import OTC_MAIN from "../assets/images/Design Online Training Center/Screenshot 2026-09-24 223701.png";
import OTC_CORNER from "../assets/images/Design Online Training Center/Screenshot 2026-09-24 223636.png";
import OTC_ANGLE from "../assets/images/Design Online Training Center/Screenshot 2026-09-24 223808.png";
import OTC_LOGO from "../assets/images/Design Online Training Center/Screenshot 2026-09-24 223720.png";
import OTC_CEILING from "../assets/images/Design Online Training Center/Screenshot 2026-09-24 223852.png";
import OTC_NEBULA from "../assets/images/Design Online Training Center/Screenshot 2026-09-24 223936.png";

// Canyon Bus — hero shot, wide establishing, interior, top-down layout
import BUS_HERO from "../assets/images/Design Render/1771367249787.jpg";
import BUS_WIDE from "../assets/images/Design Render/1771367249958.jpg";
import BUS_INTERIOR from "../assets/images/Design Render/1771367250142.jpg";
import BUS_TOP from "../assets/images/Design Render/1771367250114.jpg";

// Opel Vectra B — front 3/4, rear 3/4, side, top
import OPEL_FRONT from "../assets/images/3d/opel-vectra-1.jpg";
import OPEL_REAR from "../assets/images/3d/opel-vectra-4.jpg";
import OPEL_SIDE from "../assets/images/3d/opel-vectra-2.jpg";
import OPEL_TOP from "../assets/images/3d/opel-vectra-3.jpg";

// Volkswagen Golf 6 — front 3/4, rear 3/4, rear close, rear, tail light
import GOLF_FRONT from "../assets/images/3d/golf6-2.jpg";
import GOLF_REAR34 from "../assets/images/3d/golf6-5.jpg";
import GOLF_REAR_CLOSE from "../assets/images/3d/golf6-1.jpg";
import GOLF_REAR from "../assets/images/3d/golf6-4.jpg";
import GOLF_DETAIL from "../assets/images/3d/golf6-3.jpg";

const designs = [
  {
    title: "Volkswagen Golf 6",
    category: "Vehicle",
    software: ["Blender", "Cycles"],
    year: "2025",
    description:
      "My family's Golf 6, rebuilt in Blender. The project was a chance to push modelling, texturing and studio lighting together — down to the tail lights and the plate.",
    images: [GOLF_DETAIL, GOLF_REAR_CLOSE, GOLF_FRONT, GOLF_REAR34, GOLF_REAR],
    link: "https://www.linkedin.com/posts/elyeskacem_blender-3d-modeling-activity-7348995658986487808-o1-E",
    featured: true,
  },
  {
    title: "Opel Vectra B",
    category: "Vehicle",
    software: ["Blender", "Cycles"],
    year: "2024",
    description:
      "My first complete 3D model: the 1996 Opel Vectra B that has been in the family since 1997. Modelled, textured and lit from scratch in Blender — a piece of personal history rebuilt polygon by polygon.",
    images: [OPEL_FRONT, OPEL_REAR, OPEL_SIDE, OPEL_TOP],
    link: "https://www.linkedin.com/posts/elyeskacem_blender-3d-modeling-activity-7231215850496655361-Pels",
    featured: true,
  },
  {
    title: "Training Center Lounge",
    category: "Environment",
    software: ["Blender", "Unity"],
    year: "2026",
    description:
      "A sci-fi lounge built for the Online Training Center platform — a panoramic window onto space, soft blue lighting and a conference table where learners meet between sessions.",
    images: [OTC_MAIN, OTC_CORNER, OTC_ANGLE, OTC_LOGO, OTC_CEILING, OTC_NEBULA],
    link: "https://youtu.be/40cRxQzAc2g",
    featured: true,
  },
  {
    title: "Canyon Bus",
    category: "Environment",
    software: ["Blender", "Unity"],
    year: "2026",
    description:
      "A stylised low-poly bus crossing a sun-baked canyon — modelling, environment art and lighting built from scratch, with a top-down pass for blocking out the scene.",
    images: [BUS_HERO, BUS_WIDE, BUS_INTERIOR, BUS_TOP],
    featured: true,
  },
  {
    title: "Toy Train",
    category: "Product Render",
    software: ["Blender", "Cycles"],
    year: "2024",
    description:
      "Stylised toy train modelled, textured and rendered in Blender, then animated as a short looping sequence.",
    images: [TRAIN],
    link: "https://www.youtube.com/watch?v=9TlRgjuhS4I",
  },
  {
    title: "Black Hole",
    category: "VFX & Shading",
    software: ["Unity", "HLSL"],
    year: "2024",
    description:
      "Gravitational lensing shader written from scratch, based on scientific papers and reviewed with a researcher from Illinois State University.",
    images: [BLACKHOLE],
    link: "https://youtu.be/DVKuLI-FX1s",
  },
];

export default designs;
