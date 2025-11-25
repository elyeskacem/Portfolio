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
import MAJOR2023 from "../../assets/images/major2023.jpg";
import MAJOR2024 from "../../assets/images/major2024.jpg";
import FPGGJ2025 from "../../assets/images/FPGGJ2025.jpg";
import CSJAM from "../../assets/images/CSJAM.jpg";
import HACKTHEHERITAGE from "../../assets/images/HackTheHeritage.jpg";
import WT from "../../assets/images/wt hack.jpg";

let clients = [
  
  {
    title: "1st Prize at Hack The Heritage Hackathon - 2025",
    img_url: HACKTHEHERITAGE ,

    disc: `Our team was thrilled to win first place at the CSJAM Hackathon. We created a VR-powered digital platform that brings the Salakta Archaeological Museum to life through immersive virtual exploration and interactive artifact discovery. It’s our way of combining technology and culture, making history more engaging and accessible. The award ceremony was held under the patronage of Mrs. Amina Srarfi, Minister of Cultural Affairs, during the 34th Heritage Month and International Museum Day, with the presence of cultural leaders and national heritage officials. Even though others have already shared about the event, I wanted to take a moment to highlight the journey, the teamwork, and the vision behind what we built.`,
  },
 {
    title: "2nd Prize at CSJAM hackathon 1.0 - 2025",
    img_url: CSJAM,

    disc: `Our team was thrilled to win second place at the CSJAM Hackathon, a highly competitive game development event. Together, we created a VR simulation game focused on business management, where players can experience the challenges and strategies involved in running a company.`,
  },
   
  {
    title: "1st Prize at Global Game Jam Tunisia - 2025",
    img_url: FPGGJ2025,

    disc: `I'm so glad to have the 1st prize with my brave team ISAMMerse on the Global Game Jam Tunisia 2025. We have created a Battle Royal VR Game, where the player can play with his friends in a virtual world. This game was a great challenge for us, and we are so proud of the result. We have learned a lot from this experience, and we are looking forward to the next challenge.`,
  },
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
    title: "3th Prize at Creative Writing Hackathon - 2025",
    img_url: WT ,

    disc: `We got the 3th prize at Creative Writing Hackathon. Our team developed an innovative VR application that transforms traditional storytelling into an immersive experience. By integrating virtual reality technology, we aimed to captivate users and bring stories to life in a way that transcends conventional reading methods. This project not only showcased our creativity but also highlighted the potential of VR in enhancing literary experiences.`,
  },
  {
    title: "Major of the Promotion 2024",
    img_url: MAJOR2024,

    disc: `I am thrilled to announce that I have once again been honored as the major of the promotion for the class of 2024 at my university. This consecutive recognition underscores my unwavering commitment to academic excellence and continuous personal growth. Achieving this distinction for a second year in a row is a profound honor and a source of great pride. It further inspires me to pursue my goals with even greater determination and dedication.`,
  },
 
  {
    title: "Major of the Promotion 2023",
    img_url: MAJOR2023,

    disc: `I am proud to share that I was honored as the major of the promotion for the class of 2023 at my university. This recognition reflects my dedication, hard work, and commitment to academic excellence throughout my studies. It is a testament to the support and encouragement I received from my professors, peers, and family. This achievement motivates me to continue striving for excellence in all my future endeavors.`,
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
