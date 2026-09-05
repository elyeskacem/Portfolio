/* ------------------------------------------------------------------
   HONORS TIMELINE — newest first. Fields:
     place : badge shown on the marker (1st Prize, Honor, Top 10...)
     event : where it happened
     year  : shown on the timeline rail
     title : card title
     img   : imported image
     disc  : the story
------------------------------------------------------------------ */
import GGJ from "../assets/images/ScreenShots/ggj.jpg";
import Space from "../assets/images/ScreenShots/win2.jpg";
import Win1 from "../assets/images/ScreenShots/win1.jpg";
import WinKid from "../assets/images/ScreenShots/winkid.jpg";
import MAJOR2023 from "../assets/images/major2023.jpg";
import MAJOR2024 from "../assets/images/major2024.jpg";
import FPGGJ2025 from "../assets/images/FPGGJ2025.jpg";
import CSJAM from "../assets/images/CSJAM.jpg";
import HACKTHEHERITAGE from "../assets/images/HackTheHeritage.jpg";
import WT from "../assets/images/wt hack.jpg";

const honors = [
  {
    place: "1st Prize",
    event: "Hack The Heritage Hackathon",
    year: "2025",
    title: "1st Prize at Hack The Heritage",
    img: HACKTHEHERITAGE,
    disc: "Our team won first place with a VR-powered platform that brings the Salakta Archaeological Museum to life through immersive virtual exploration and interactive artifact discovery — our way of combining technology and culture to make history more engaging and accessible. The award ceremony was held under the patronage of Mrs. Amina Srarfi, Minister of Cultural Affairs, during the 34th Heritage Month and International Museum Day, with cultural leaders and national heritage officials present.",
  },
  {
    place: "2nd Prize",
    event: "CSJAM Hackathon 1.0",
    year: "2025",
    title: "2nd Prize at CSJAM Hackathon 1.0",
    img: CSJAM,
    disc: "Our team was thrilled to win second place at the CSJAM Hackathon, a highly competitive game development event. Together we created a VR simulation game focused on business management, where players experience the challenges and strategies involved in running a company.",
  },
  {
    place: "1st Prize",
    event: "Global Game Jam Tunisia",
    year: "2025",
    title: "1st Prize at Global Game Jam Tunisia",
    img: FPGGJ2025,
    disc: "So glad to take the 1st prize with my brave team ISAMMerse at Global Game Jam Tunisia 2025. We created a battle royale VR game where players fight alongside their friends in a virtual world. It was a great challenge, we learned a lot from the experience and we are looking forward to the next one.",
  },
  {
    place: "3rd Prize",
    event: "Creative Writing Hackathon",
    year: "2025",
    title: "3rd Prize at Creative Writing Hackathon",
    img: WT,
    disc: "Our team developed a VR application that transforms traditional storytelling into an immersive experience. By integrating virtual reality we aimed to captivate users and bring stories to life in a way that goes beyond conventional reading, showing the potential of VR for literary experiences.",
  },
  {
    place: "Honor",
    event: "University",
    year: "2024",
    title: "Major of the Promotion 2024",
    img: MAJOR2024,
    disc: "Honored once again as major of the promotion for the class of 2024. This consecutive recognition underscores my commitment to academic excellence and continuous personal growth, and inspires me to pursue my goals with even greater determination.",
  },
  {
    place: "Honor",
    event: "University",
    year: "2023",
    title: "Major of the Promotion 2023",
    img: MAJOR2023,
    disc: "Honored as major of the promotion for the class of 2023. This recognition reflects the dedication and hard work put into my studies, and the support I received from my professors, peers and family.",
  },
  {
    place: "1st Prize",
    event: "Space Hack Tunisia",
    year: "2023",
    title: "1st Prize at Space Hack Tunisia",
    img: Space,
    disc: "I teamed up with three classmates for a 24-hour hackathon and we built a VR application that simulates the daily activities of an astronaut during their missions — an introductory gateway for anyone eager to embark on space adventures, offering a unique and immersive training experience.",
  },
  {
    place: "1st Prize",
    event: "Coding Universe",
    year: "2023",
    title: "1st Prize at Coding Universe",
    img: Win1,
    disc: "With a budget of SGD 9, a friend and I built an AR application that simulates machine operation for workplace safety training. It is used to train operators, help them avoid accidents and make the work environment safer.",
  },
  {
    place: "Top 10",
    event: "Global Game Jam Tunisia",
    year: "2022",
    title: "Best 10 Project at GGJ Tunisia 2K22",
    img: GGJ,
    disc: "A friend and I took part in the online Global Game Jam on the theme Duality. We developed a mobile game called Dual Wars, a collection of shared-screen mini-games for two players. The experience taught us patience and gave us a lot of new skills.",
  },
  {
    place: "1st Place",
    event: "Smart Kids Competition",
    year: "2010",
    title: "1st Place at Smart Kids Competition",
    img: WinKid,
    disc: "As a member of the Smart Kids Club I learned the art of fast mental calculation through algorithms. After completing three modules, the club organised a national competition gathering participants from cities across Tunisia, and I secured the top position in Chapter 3.",
  },
];

export default honors;
