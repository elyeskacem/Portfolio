import React, { useRef } from "react";
import Slider from "react-slick";
import Project from "./Project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

let data = [
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698769673/evqc2rbkutgqltbmtcio.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum! Lorem",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698773229/ify0ojyzmyjtwtueqtkx.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698773234/nnin0tbji5ux0f4do92m.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698773861/hjsnrptfwi6ckbrmx6uh.jpg",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698779770/cjsjar78u2kra1g84scz.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698780095/k7jgnkuichvovylcq6nx.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698780091/saakn9as6dfymgocjol9.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
  },
  {
    img: "https://res.cloudinary.com/dkzq4epny/image/upload/v1698774150/gkcb0raxpndmpn9xpeqy.png",
    disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!",
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
