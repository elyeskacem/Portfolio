import React from "react";
import styled from "styled-components";
import SliderComp from "./Slider";
import { Zoom } from "react-awesome-reveal";

import Grid from "@mui/material/Grid";

import TRUCK from "../../assets/images/ScreenShots/2dtruck.jpg";
import ARSHOOT1 from "../../assets/images/ScreenShots/arshoot.jpg";
import CASTLEESCAPE from "../../assets/images/ScreenShots/castleescape.jpg";
import MakeMeLaugh from "../../assets/images/ScreenShots/mml.jpg";
import CVAR from "../../assets/images/ScreenShots/cvar.jpg";
import GGJ2k22 from "../../assets/images/ScreenShots/ggj2k22.jpg";
import MAZERUNNER from "../../assets/images/ScreenShots/mazerunner.jpg";
import KITCHEN from "../../assets/images/ScreenShots/Screenshot 2023-10-31 201936.jpg";
import VRSELIM from "../../assets/images/ScreenShots/vrselim.jpg";
import VRSPACE from "../../assets/images/ScreenShots/vrspace.jpg";
import WAR from "../../assets/images/ScreenShots/war.png";
import CLOTHSIMULATION from "../../assets/images/ScreenShots/cloth simulation.jpg";
import SKINSIMULATION from "../../assets/images/ScreenShots/skin simulation.jpg";
import AVAXIAOTC from "../../assets/images/ScreenShots/otc avaxia.jpg";
import Project from "./Project";

let data = [
  {
    img: VRSPACE,
    disc: "VR application that simulates the daily activities of an astronaut during their missions.",
    demo: "https://youtu.be/S7E82aBW6-M",
  },

  {
    img: MakeMeLaugh,
    disc: "VR Application : You need to make the king laugh, or you die. - Collaborative project, made in Global Game Jam 2024",
    demo: "https://youtu.be/n25m8NGV0_M",
  },

  {
    img: CASTLEESCAPE,
    disc: "3D Game of Castle escape : you need to resolve the puzzle to get outside of the castle.",
    demo: "https://youtu.be/Hi_71OzzvjE",
  },
  {
    img: AVAXIAOTC,
    disc: "Online training center VR and desktop app. You can navigate in courses and make subscriptions, and have a real time session with other ( multiplayer ).",
    demo: "https://youtu.be/40cRxQzAc2g",
  },
  {
    img: TRUCK,
    disc: "2D Game for a Caterpillar truck : You need to transport the rocks to the otherside of the map before the time finish.",
    demo: "https://youtu.be/pWjeMm64jpo",
  },

  {
    img: SKINSIMULATION,
    disc: "Skin simulation based on scientific articles, Coding it from scratch, made with Unity",
    demo: "https://youtu.be/iQHTSLWyh4E",
  },
  {
    img: CLOTHSIMULATION,
    disc: "Flag simulation based on scientific articles, Coding it from scratch, made with Unity",
    demo: "https://youtu.be/dJ9atuVhLMs",
  },
  {
    img: MAZERUNNER,
    disc: "3D Maze Game that I made as project in my university, and I tried to make it looks like the movie : Mazer Runner.",
    demo: "https://youtu.be/7WvUzBu9X8s",
  },
  {
    img: GGJ2k22,
    disc: "2D Game : Collaborated project during the GGJ 2k22 : it has many minigames for two players , shared screen.",
    demo: "https://youtu.be/G7H2QHb9RDs",
  },
  {
    img: ARSHOOT1,
    disc: "AR Shooting Game : You need to kill the monsters before they distroy all houses of the map.",
    demo: "https://youtu.be/cUN-HRnO4Ak",
  },
  {
    img: KITCHEN,
    disc: "AR Shooting Game : You have 4 lifes. You need to shoot all foods before it disappear, otherwise you will lsoe a life.",
    demo: "https://www.youtube.com/watch?v=ChMItHTW-K0",
  },
  {
    img: CVAR,
    disc: "AR Portfolio : I created my CV with AR. By detecting my photo , you will see an interactive UI that describe my profile.",
    demo: "https://youtu.be/nayGb0I30rg?si=_irESmONM-u1F68x&t=218",
  },

  {
    img: VRSELIM,
    disc: "VR project that simulates potential hazards an electrical worker may encounter when neglecting safety precautions and requirements.",
    demo: "https://youtu.be/RE_3WBZr6Uk",
  },
  {
    img: WAR,
    disc: "VR application that simulates the aspect of Palestine before and after the war.",
    demo: "https://youtu.be/coBBQ_2yao8",
  },
];

const Projects = () => {
  const [showAllProjects, SetshowAllProjects] = React.useState(false);
  let sliderProject = "";
  sliderProject = data.map((item, i) => (
    <Grid key={i}>
      <Project item={item} />
    </Grid>
  ));
  return (
    <Container id="project">
      <Zoom>
        <h1>
          Recent <span className="green">Projects</span>
        </h1>
        <p>These are some of my 3D projects.</p>
      </Zoom>
      {showAllProjects ? (
        <>
          {data.map((item, i) => (
            <>
              <Project w={50} item={item} />
            </>
          ))}
        </>
      ) : (
        <Slide>
          <SliderComp data={data} />
        </Slide>
      )}
      <br />
      <b
        style={{ cursor: "pointer" }}
        onClick={() => {
          SetshowAllProjects(!showAllProjects);
        }}
      >
        {showAllProjects ? "See less" : "See all"}
      </b>
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  text-align: center;
  position: relative;
  @media (max-width: 840px) {
    width: 90%;
  }
  h1 {
    font-size: 1.9rem;
  }

  p {
    width: 28rem;
    margin: 0 auto;
    padding: 1rem 0;
    font-size: 0.9rem;
    @media (max-width: 500px) {
      width: 90%;
    }
  }
`;

const Slide = styled.div``;
