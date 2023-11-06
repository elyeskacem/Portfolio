import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from "react-awesome-reveal";
import HonorsSlider from "./HonorsSlider";
import GGJ from "../../assets/images/ScreenShots/ggj.jpg";
import Space from "../../assets/images/ScreenShots/win2.jpg";
import Win1 from "../../assets/images/ScreenShots/win1.jpg";
import WinKid from "../../assets/images/ScreenShots/winkid.jpg";

let clients = [
  {
    title: "1st Prize at Space Hack Tunisia - 2023",
    img_url: Space,

    disc: `I teamed up with three of my classmates for an exciting hackathon adventure. In just 24 hours, we managed to create a captivating VR application that simulates the daily activities of an astronaut during their missions. This groundbreaking application serves as an introductory gateway for those eager to embark on space adventures, offering a unique and immersive training experience.`,
  },
  {
    title: "1st Prize at Coding Universe - 2023",
    img_url: Win1,

    disc: `My friend and I collaborated on a project with a budget of SGD 9, dedicated to addressing workplace safety concerns during his initial training on machine operation. Together, we developed an innovative AR application designed to simulate the machine's functions. This application will be used to provide comprehensive training to operators, helping them avoid accidents and ensuring a safer work environment.`,
  },
  {
    title: "Best 10 Project at GGJ Tunisia 2K22",
    img_url: GGJ,

    disc: `My friend and I took part in an online event called the Global Game Jam. The theme of the event was "Duality." During this jam, we developed a mobile game which we aptly named "Dual Wars." This game features a collection of mini-games designed for two players who share the same screen. This experience taught us valuable lessons in patience and provided us with numerous insights and skills.`,
  },
  {
    title: "1st Place at Smart Kids Competition - 2010",
    img_url: WinKid,

    disc: `I was an enthusiastic member of the Smart Kids Club, an educational platform that taught us the art of performing speedy calculations through the application of algorithms. We eagerly absorbed these mathematical skills and put them into practice using various techniques. Upon mastering three modules, the club arranged a competition that gathered participants from cities across Tunisia, each competing within their respective modules. I was honored to secure the top position in Chapter 3, showcasing my proficiency in this fascinating realm of mathematics.`,
  },
];
var settings = {
  dots: true,
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
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Honors = () => {
  const arrowRef = useRef(null);
  let clientDisc = "";
  clientDisc = clients.map((item, i) => <HonorsSlider item={item} key={i} />);
  return (
    <Container id="client">
      <Slide direction="left">
        <span className="green">Honors</span>
        <h1>Some cherished memories</h1>
      </Slide>
      <Testimonials>
        <Slider ref={arrowRef} {...settings}>
          {clientDisc}
        </Slider>
        <Buttons>
          <button onClick={() => arrowRef.current.slickPrev()}>
            <IoIosArrowBack />
          </button>
          <button onClick={() => arrowRef.current.slickNext()}>
            <IoIosArrowForward />
          </button>
        </Buttons>
      </Testimonials>
      {/* <Testimonials>
        <Slider ref={arrowRef} {...settings}>
          {clientDisc}
        </Slider>
        <Buttons>
          <button onClick={() => arrowRef.current.slickPrev()}>
            <IoIosArrowBack />
          </button>
          <button onClick={() => arrowRef.current.slickNext()}>
            <IoIosArrowForward />
          </button>
        </Buttons>
      </Testimonials> */}
    </Container>
  );
};

export default Honors;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 0;

  @media (max-width: 840px) {
    width: 90%;
  }

  span {
    font-weight: 700;
    text-transform: uppercase;
  }

  h1 {
    padding-top: 1rem;
    text-transform: capitalize;
  }

  .slick-list,
  .slick-slider,
  .slick-track {
    padding: 0;
  }

  .slick-dots {
    text-align: left;
    margin-left: 1rem;
  }

  .slick-dots li button:before {
    content: "";
  }

  .slick-dots li button {
    width: 9px;
    height: 4px;
    background: linear-gradient(
      159deg,
      rgb(45, 45, 58) 0%,
      rgb(43, 43, 53) 100%
    );
    padding: 0.1rem;
    margin-top: 1rem;
    transition: all 400ms ease-in-out;
    border-radius: 50px;
  }

  .slick-dots li.slick-active button {
    background: #01be96;
    width: 15px;
  }

  .slick-dots li {
    margin: 0;
  }
`;

const Testimonials = styled.div`
  margin-top: 2rem;
  position: relative;
`;
const Buttons = styled.div`
  position: absolute;
  right: 0.7rem;
  bottom: -2rem;

  button {
    background-color: transparent;
    margin-left: 0.5rem;
    border: none;
    color: #01be96;
    cursor: pointer;
    font-size: 1.1rem;
  }

  @media (max-width: 530px) {
    display: none;
  }
`;
