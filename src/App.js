import React from "react";
import styled from "styled-components";
import Navbar from "./components/layout/Navbar";
import CursorGlow from "./components/layout/CursorGlow";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Designs from "./components/sections/Designs";
import Honors from "./components/sections/Honors";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <Page>
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Band>
          <Projects />
        </Band>
        <Designs />
        <Band>
          <Honors />
        </Band>
        <Contact />
      </main>

      <Footer />
    </Page>
  );
}

export default App;

const Page = styled.div`
  position: relative;
  isolation: isolate;
`;

/* Alternating band so long pages keep a rhythm. */
const Band = styled.div`
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.012),
    rgba(255, 255, 255, 0.028)
  );
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
`;
