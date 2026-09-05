/* ------------------------------------------------------------------
   3D DESIGN GALLERY  ·  the only file you edit for this section
   ------------------------------------------------------------------
   HOW TO ADD YOUR OWN WORK
   1. Drop the render in:  src/assets/images/3d/my-render.jpg
   2. Import it at the top: import MYRENDER from "../assets/images/3d/my-render.jpg";
   3. Add an entry below with `image: MYRENDER`.

   Leave `image: null` and the card shows a styled placeholder — handy
   while you are still rendering. Fields:
     title       : name of the piece
     category    : also used to build the filter chips
     software    : array of tools, shown as small tags
     year        : string, shown next to the title
     description : one or two sentences, shown in the lightbox
     image       : imported image or null
     link        : optional external link (ArtStation, YouTube, Sketchfab...)
     featured    : true = the card spans two columns on desktop
------------------------------------------------------------------ */
import TRAIN from "../assets/images/ScreenShots/TRAINANIM.jpg";
import BLACKHOLE from "../assets/images/ScreenShots/blackhole.jpg";
import CLOTH from "../assets/images/ScreenShots/cloth simulation.jpg";
import SKIN from "../assets/images/ScreenShots/skin simulation.jpg";
import CASTLE from "../assets/images/ScreenShots/castleescape.jpg";
import MUSEUM from "../assets/images/ScreenShots/xplore.jpg";

const designs = [
  {
    title: "Toy Train",
    category: "Product Render",
    software: ["Blender", "Cycles"],
    year: "2024",
    description:
      "Stylised toy train modelled, textured and rendered in Blender, then animated as a short looping sequence.",
    image: TRAIN,
    link: "https://www.youtube.com/watch?v=9TlRgjuhS4I",
    featured: true,
  },
  {
    title: "Black Hole",
    category: "VFX & Shading",
    software: ["Unity", "HLSL"],
    year: "2024",
    description:
      "Gravitational lensing shader written from scratch, based on scientific papers and reviewed with a researcher from Illinois State University.",
    image: BLACKHOLE,
    link: "https://youtu.be/DVKuLI-FX1s",
  },
  {
    title: "Cloth Study",
    category: "Simulation",
    software: ["Unity", "C#"],
    year: "2023",
    description:
      "Mass-spring cloth solver implemented from scratch — wind forces, constraints and collision handling.",
    image: CLOTH,
    link: "https://youtu.be/dJ9atuVhLMs",
  },
  {
    title: "Soft Skin",
    category: "Simulation",
    software: ["Unity", "C#"],
    year: "2023",
    description:
      "Soft-body skin deformation experiment: elasticity, damping and volume preservation on a deformable mesh.",
    image: SKIN,
    link: "https://youtu.be/iQHTSLWyh4E",
  },
  {
    title: "Castle Interior",
    category: "Environment",
    software: ["Blender", "Unity"],
    year: "2023",
    description:
      "Modular castle environment: props, lighting mood and baked lightmaps built for a real-time puzzle game.",
    image: CASTLE,
  },
  {
    title: "Salakta Museum",
    category: "Environment",
    software: ["Blender", "Unity"],
    year: "2025",
    description:
      "Archaeological monuments reconstructed in 3D for an immersive museum experience.",
    image: MUSEUM,
    link: "https://youtu.be/mDeKvPb0_Qg",
  },
  {
    title: "Your Next Render",
    category: "Character",
    software: ["Blender", "Substance"],
    year: "Soon",
    description:
      "Placeholder card. Drop an image in src/assets/images/3d/, import it in src/data/designs.js and this becomes a real piece.",
    image: null,
  },
  {
    title: "Work In Progress",
    category: "Concept",
    software: ["Blender"],
    year: "Soon",
    description:
      "Another free slot — duplicate any entry in src/data/designs.js to add a new one.",
    image: null,
  },
];

export default designs;
