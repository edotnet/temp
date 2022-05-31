import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import logo from '../assets/img/logo_dark.png';
import slide1 from '../assets/img/slide1.png';
import slide2 from '../assets/img/slide2.png';
import slide3 from '../assets/img/slide3.png';
import slide4 from '../assets/img/slide4.png';
import slide5 from '../assets/img/slide5.png';
import slide6 from '../assets/img/slide6.png';
import slide7 from '../assets/img/slide7.png';
import slide8 from '../assets/img/slide8.png';
import slide9 from '../assets/img/slide59.png';
import znak_small from '../assets/img/znak_small.svg';
import combinedshape from '../assets/img/combinedshape.svg';

import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export const HomePage = (props) => {
  return(
    <div>
      <section>
        <div className='backbg'>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <h1 className='heading'>PREPAiRE IS AN ECOSYSTEM</h1>
              </Grid>
              <Grid item xs={4} md={4}>
                <p>AI accelerated drug discovery, allowing for a fast-track discovery and repurposing of existing molecule, intelligent clinical design and coupled with in-house manufacturing.</p>
                <p><strong>PREPAiRE</strong>  purposely integrate target identification, validation, lead discovery, optimization, drug synthesis and preclinical testing into a single platform.</p>
                <p>Many of the bottlenecks in drug discovery and development could be alleviated if only we could predict earlier in the disease process which drugs are likely to work and for which patients. At PREPAiRE, we are enabling better predictions throughout the pharmaceutical value chain in a single platform.</p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </section>
      <section>
        <div className='video-sec'>
          <div className='video-sec-bg'>
            <a className='play-link' href='./#'>
              <div className='play-icon'>
                <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="none" d="M49.5 25c0 13.5-10.9 24.5-24.5 24.5S.6 38.5.6 25 11.5.6 25 .6 49.5 11.5 49.5 25z"></path>
                  <path fill="#302361" d="M25 50c13.8 0 25-11.2 25-25S38.8 0 25 0 0 11.2 0 25s11.2 25 25 25zm-5-33.3l14.2 8.8L20 34.3V16.7z"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className='founding-vision'>
          <Container maxWidth="lg">
            <h1>Our Founding Vision</h1>
            <Grid container>
              <Grid item xs={4} md={4}  style= {{position: 'relative'}}>
                <img className='arrows' src={combinedshape} alt="combined shape"/>
                <p className='text1'>Our platform accelerates the drug development process by integrating disease models spanning in-vitro cellular systems, in-silico machine learning models and insitro models.</p>
              </Grid>
              <Grid item xs={8} md={8}>
                <p className='text2'>These models, combined with robotic chemical systems capable of navigating a chemical space based on learned general associations between molecular structures and reactivity, it is possible to identify a range of chemical reactions and products that ultimately lead to the discovery of new molecules that can ultimately become new specialty treatments.</p>
              </Grid>
            </Grid>
            <div className='atom-line'></div>
            <Grid container spacing={2} style= {{position: 'relative'}}>
              <Grid item xs={2} md={2}>
                <img className="smallicon" src={znak_small} alt="small ball" />
              </Grid>
              <Grid item xs={10} md={10}>
                <p className='text3'>
                  <strong>The founding vision of PREPAiRE</strong> — is that it is possible to integrate target identification and validation, lead discovery and optimization, drug synthesis, and pre-clinical testing into a single platform.
                </p>
              </Grid>
            </Grid>
          </Container>
          <Container className="founding-container" maxWidth="xlg">
            <Slider className="slickslider" {...settings}>
              <div> <img src={slide4} alt="img4"/></div>
              <div><img src={slide5} alt="img5"/></div>
              <div><img src={slide2} alt="img2"/></div>
              <div><img src={slide1} alt="img1"/></div>
              <div><img src={slide3} alt="img3"/></div>
            </Slider>
          </Container>
          <section className='fundamental'>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <div className='block'>
                    <h2>AI fundamental ethics</h2>
                    <p className="fundamental-text1">At PREPAiRE, we’re proud of our participation of pushing forward the science of drug development. We believe AI can be of extraordinary benefit to the world, but only if held to the highest ethical standards.</p>
                    <p className="fundamental-text2">Technology is not value neutral, and technologists must take responsibility for the ethical and social impact of their work.</p>
                    <p className="fundamental-text3">As history attests, technological innovation in itself is no guarantee of broader social progress. The development of AI creates important and complex questions. Its impact on society—and on all our lives—is not something that should be left to chance. Beneficial outcomes and protections against harms must be actively fought for and built-in from the beginning.</p>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>
          <section className="design">
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <div className='block'>
                    <h2>Inclusive Research & Design</h2>
                    <p className='design-text1'>At <strong>Prepaire</strong> , equity and inclusion are core values which we seek to promote among our Partner organizations, in our own work, and throughout the greater AI field, including in machine learning and other automated decision-making systems.</p>
                    <p className='design-text2'>The <strong>Prepaire</strong>  Partner Program is currently creating resources to help R&D and Pharmaceutical companies more effectively engage one another to develop drugs responsibly. Ultimately, this work seeks to achieve a more holistic reimagining of how drugs are developed and deployed around the world.</p>
                    <a className="design-btn" href="./#" >DRUG INTERACTION</a>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <img src="https://thumb.tildacdn.com/tild6137-3864-4939-b262-343833653932/-/format/webp/1.png" alt=""/>
                </Grid>
              </Grid>
            </Container>
          </section>
          <section className='features'>
            <Container className="features-container" maxWidth="lg">
            <Grid container spacing={2} style= {{position: 'relative'}}>
              <Grid item xs={4} md={4}>
                  <h2>Explore Our Features</h2>
              </Grid>
              <Grid item xs={8} md={8}>
                <p className="features-text1">Our AI expertise extends beyond our ranks. Collaborations with top universities, start-ups, and established technology companies boost PREPAiRE’s ability to meet social and market needs.</p>
              </Grid>
            </Grid>
            <Grid container spacing={2} style= {{position: 'relative'}}>
              <Grid item xs={4} md={4}>
                <img className='feature-arrows' src={combinedshape} alt="combined shape"/>
              </Grid>
              <Grid item xs={2} md={2}>
                <img className="feature-smallicon" src={znak_small} alt="small ball" />
              </Grid>
              <Grid item xs={6} md={6}>
                <p className='features-text2'>
                No single organisation can master all. It’s too big. It’s a worldwide ecosystem of brilliant minds and spectacular tools, scattered through tens of thousands of companies and universities.
                </p>
              </Grid>
            </Grid>
            </Container>
            <Slider className="slickslider" {...settings}>
              <div> <img src={slide9} alt="img9"/></div>
              <div><img src={slide8} alt="img8"/></div>
              <div><img src={slide6} alt="img6"/></div>
              <div><img src={slide7} alt="img7"/></div>
            </Slider>
          </section>
          <section className="scientific">
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <div className='block'>
                    <h2>Progressive Scientific Collaboration</h2>
                    <p className='scientific-text1'>We collaborate with institutions such as <strong>Stanford</strong>, <strong>MIT</strong> and the <strong>University of Cambridge</strong>. Our Alliances with <strong>Nvidia</strong>, <strong>Google</strong> and <strong>Microsoft Azure</strong> enable us to run models at scale</p>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <p className='scientific-text2'>PREPAiRE has identified the leading minds and forged relationships to strengthen our strategy-through-execution capabilities. We continuously monitor emerging technology players. Amid the countless vendors and startups, we’ve identified those with both market-leading solutions and the capacity to deliver. We are forging strategic relationships with leading innovators and companies</p>
                </Grid>
              </Grid>
            </Container>
          </section>
        </div>
      </section>
    </div>
  );
}
