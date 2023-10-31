import React from "react";
import { GiAce } from "react-icons/gi";
import { BiAbacus } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import Card from "./Card";
import { Slide } from "react-awesome-reveal";

const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
        <h4>
          My <span className="green">services</span>
        </h4>
        <h1>What I Do</h1>
      </Slide>
      <Cards>
        <Slide direction="left">
          <Card
            Icon={GiAce}
            title={"Game development"}
            disc={`As a game developer, I bring digital worlds to life. I can make Virtual Reality apps, Augmented Reality apps, 2D and 3D games.`}
          />
        </Slide>
        <Slide direction="up">
          <Card
            Icon={CgWebsite}
            title={"Frontend development"}
            disc={`As a front-end developer, my focus is on turning design concepts into visually stunning websites, ensuring that the user experience is seamless and captivating.`}
          />
        </Slide>
        <Slide direction="right">
          <Card
            Icon={BiAbacus}
            title={"Backend development"}
            disc={`As a back-end developer, I build the foundation of web applications, ensuring they run smoothly and securely behind the scenes.`}
          />
        </Slide>
      </Cards>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
