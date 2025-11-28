import React from "react";
import { useSpeaker } from "../hooks/useSpeaker";
import SEO from "../components/SEO";
import {
  OWNER_NAME,
  OWNER_EMAIL,
  OWNER_GITHUB,
  OWNER_TWITTER,
  OWNER_LINKEDIN,
  OWNER_INSTAGRAM,
  OWNER_CANONICAL_URL,
  OWNER_PROJECTS,
  OWNER_BIO,
  OWNER_DESCRIPTION,
  OWNER_OG_IMAGE,
  OWNER_TWITTER_CARD,
  HERO_PRELOADER_TEXTS,
} from "../modules/constants";
import { cubicBezier, motion } from "framer-motion";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import ReactGa from "react-ga";

interface IndexProps {}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: any } = {
  duration: 5.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
  // ease: [0.6, 0.01, -0.05, 0.9],
};

/**
 * Main page component for Francesco Vasturzo portfolio.
 * Uses custom hooks and modular components for clarity and maintainability.
 */
const Index: React.FC<IndexProps> = () => {
  // Speaker state and toggle logic via custom hook
  const { speakerState, toggleSpeaker } = useSpeaker("muted");
  // Ref for locomotive scroll container
  const refScroll = React.useRef(null);
  let lscroll: any;

  // Effect: Analytics, Locomotive Scroll, Hover Effect, Cursor
  React.useEffect(() => {
    // Track pageview with Google Analytics
    ReactGa.pageview(window.location.pathname + window.location.search);

    // Initialize Locomotive Scroll for smooth scrolling
    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // Update scroll on image load
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // Apply hover-effect to project images
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        if (imgs.length >= 2 && imgs[0] && imgs[1]) {
          new hoverEffect({
            parent: el,
            intensity: 0.2,
            speedIn: el.dataset.speedin || undefined,
            speedOut: el.dataset.speedout || undefined,
            easing: el.dataset.easing || undefined,
            hover: el.dataset.hover || undefined,
            image1: imgs[0].getAttribute("src"),
            image2: imgs[1].getAttribute("src"),
            displacementImage: el.dataset.displacement,
            imagesRatio: 4 / 4, // Keep aspect ratio for portrait images
          });
        }
      }
    );

    // Custom cursor movement
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      if (cursor) {
        cursor.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
      }
    };

    // Clear console for clean debugging
    console.clear();
  }, []);

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <SEO
          title={`${OWNER_NAME} | Full-Stack Developer & Creative Technologist`}
          description={OWNER_DESCRIPTION}
          canonicalUrl={OWNER_CANONICAL_URL}
          ogImage={OWNER_OG_IMAGE}
          twitterCard={OWNER_TWITTER_CARD}
          author={OWNER_NAME}
          keywords="Francesco Vasturzo, web developer, full-stack developer, react, next.js, javascript, typescript, portfolio, creative developer"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: OWNER_NAME,
            url: OWNER_CANONICAL_URL,
            sameAs: [
              OWNER_GITHUB,
              OWNER_LINKEDIN,
              OWNER_TWITTER,
              OWNER_INSTAGRAM,
            ],
          }}
        />
        <audio
          loop
          id="audioPlayer"
          autoPlay
          style={{ display: "none" }}
          aria-label="Background music"
        >
          <source src="sound/preloader.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        {false && (
          <motion.div
            data-scroll
            data-scroll-sticky
            data-scroll-target="#menu-target"
            animate={{ top: "-100vh", transition: { ...transition, delay: 9 } }}
            className="preloader"
          >
            <div className="preloader__wrapper">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { ...transition } }}
                className="preloader__left"
              >
                <img src="svg/fv-logo-left.svg" alt="Francesco Vasturzo logo" />
              </motion.div>
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { ...transition } }}
                className="preloader__right"
              >
                {HERO_PRELOADER_TEXTS.map((text, idx) => (
                  <p className="preloader__text" key={idx}>
                    {text}
                  </p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
        {/* Header section with hero and speaker toggle */}
        <Header
          speakerState={speakerState}
          onSpeakerToggle={toggleSpeaker}
          githubUrl={OWNER_GITHUB}
          linkedinUrl={OWNER_LINKEDIN}
        />
        {/* Main content section */}
        <Content
          bio={OWNER_BIO}
          description={OWNER_DESCRIPTION}
          email={OWNER_EMAIL}
          githubUrl={OWNER_GITHUB}
          linkedinUrl={OWNER_LINKEDIN}
          projects={OWNER_PROJECTS}
        />
        {/* Footer section */}
        <Footer githubUrl={OWNER_GITHUB} />
      </div>
    </>
  );
};

export default Index;
