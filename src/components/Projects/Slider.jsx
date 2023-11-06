import React, { useRef } from "react";
import Slider from "react-slick";
import Project from "./Project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import TRUCK from "../../assets/images/ScreenShots/2dtruck.jpg";
import ARSHOOT1 from "../../assets/images/ScreenShots/arshoot.jpg";
import CASTLEESCAPE from "../../assets/images/ScreenShots/castleescape.jpg";
import CVAR from "../../assets/images/ScreenShots/cvar.jpg";
import GGJ2k22 from "../../assets/images/ScreenShots/ggj2k22.jpg";
import MAZERUNNER from "../../assets/images/ScreenShots/mazerunner.jpg";
import KITCHEN from "../../assets/images/ScreenShots/Screenshot 2023-10-31 201936.jpg";
import VRSELIM from "../../assets/images/ScreenShots/vrselim.jpg";
import VRSPACE from "../../assets/images/ScreenShots/vrspace.jpg";

let data = [
  {
    img: VRSPACE,
    disc: "VR application that simulates the daily activities of an astronaut during their missions.",
    demo: "https://youtu.be/S7E82aBW6-M",
  },
  {
    img: MAZERUNNER,
    disc: "3D Maze Game that I made as project in my university, and I tried to make it looks like the movie : Mazer Runner.",
    demo: "https://youtu.be/7WvUzBu9X8s",
  },
  {
    img: CASTLEESCAPE,
    disc: "3D Game of Castle escape : you need to resolve the puzzle to get outside of the castle.",
    demo: "https://youtu.be/Hi_71OzzvjE",
  },
  {
    img: TRUCK,
    disc: "2D Game for a Caterpillar truck : You need to transport the rocks to the otherside of the map before the time finish.",
    demo: "https://youtu.be/pWjeMm64jpo",
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
];

var settings = {
  className: "center",
  centerMode: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};
const SliderComp = () => {
  const arrowRef = useRef(null);
  let sliderProject = "";
  sliderProject = data.map((item, i) => <Project item={item} key={i} />);
  return (
    <Container>
      <Slider ref={arrowRef} {...settings}>
        {sliderProject}
      </Slider>
      <Buttons>
        <button onClick={() => arrowRef.current.slickPrev()} className="back">
          <IoIosArrowBack />
        </button>
        <button onClick={() => arrowRef.current.slickNext()} className="next">
          <IoIosArrowForward />
        </button>
      </Buttons>
    </Container>
  );
};

export default SliderComp;

const Container = styled.div`
  position: relative;
`;

const Buttons = styled.div`
  button {
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    color: #01be96;
    border: none;
    position: absolute;
    top: 45%;
    right: -1rem;
  }

  .back {
    left: -1rem;
  }
`;
