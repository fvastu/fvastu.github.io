import React, { useState } from "react";
import Head from "next/head";
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
import { Navigation } from "../components/Navigation/Navigation";
import ReactGa from "react-ga";

interface indexProps {}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: any } = {
  duration: 5.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
  // ease: [0.6, 0.01, -0.05, 0.9],
};

const index: React.FC<indexProps> = () => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    // ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // image hover effect
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
            imagesRatio: 4 / 4, // Mantieni il rapporto per immagini portrait
          });
        }
      }
    );

    // header cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor!.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

    console.clear();
    // Owner info removed
  }, []);

  const handleSpeaker = () => {
    const audio = document.querySelector("#audioPlayer") as HTMLVideoElement;

    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  };

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" type="image/svg+xml" />
          <link href={OWNER_CANONICAL_URL} rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>
            {OWNER_NAME} | Full-Stack Developer & Creative Technologist
          </title>
          <meta name="description" content={OWNER_DESCRIPTION} />
          <meta
            name="keywords"
            content="Francesco Vasturzo, web developer, full-stack developer, react, next.js, javascript, typescript, portfolio, creative developer"
          />
          <meta name="author" content={OWNER_NAME} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`${OWNER_NAME} | Full-Stack Developer`}
          />
          <meta property="og:url" content={OWNER_CANONICAL_URL} />
          <meta property="og:image" content={OWNER_OG_IMAGE} />
          <meta
            property="og:image:alt"
            content={`${OWNER_NAME} portfolio preview`}
          />
          <meta property="og:description" content={OWNER_DESCRIPTION} />
          <meta property="og:site_name" content={OWNER_NAME} />
          <meta property="og:locale" content="en_US" />

          {/* Twitter */}
          <meta name="twitter:card" content={OWNER_TWITTER_CARD} />
          <meta
            name="twitter:title"
            content={`${OWNER_NAME} | Full-Stack Developer`}
          />
          <meta name="twitter:description" content={OWNER_DESCRIPTION} />
          <meta name="twitter:image" content={OWNER_OG_IMAGE} />
          <meta
            name="twitter:image:alt"
            content={`${OWNER_NAME} portfolio preview`}
          />
          <meta name="twitter:url" content={OWNER_CANONICAL_URL} />
          <meta name="twitter:creator" content="@francescovasturzo" />

          {/* JSON-LD Structured Data for Person */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
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
              }),
            }}
          />
        </Head>
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
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                <span>turning ideas into </span> <br />
                <span>real life </span>
                <span className="header__hero--heading-gradient">
                  products{" "}
                </span>
              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
                aria-label="View my projects"
              >
                VIEW PROJECTS
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <button
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                  aria-label={
                    speakerState === "muted"
                      ? "Unmute background music"
                      : "Mute background music"
                  }
                  aria-pressed={speakerState === "muted"}
                >
                  <span className="sr-only">
                    {speakerState === "muted" ? "Audio playing" : "Audio muted"}
                  </span>
                </button>
                <div className="speaker__muted">
                  <img src="svg/muted.svg" alt="muted icon" />
                </div>
                <div className="speaker__unmuted">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.599976"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect1-anim"
                    />
                    <rect
                      x="9"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect2-anim"
                    />
                    <rect
                      x="4.79999"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect3-anim"
                    />
                    {/* <rect
                      x="13.2"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect4-anim"
                    /> */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
              <a
                href={OWNER_GITHUB}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Visit my GitHub profile"
              >
                👾 GH
              </a>
              <a
                href={OWNER_LINKEDIN}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Visit my LinkedIn profile"
              >
                💼 LD
              </a>
            </div>
          </div>
        </div>
        <main className="container" role="main">
          <section className="section-projects" aria-labelledby="about-heading">
            <h1 id="about-heading" className="heading-1">
              <span>so...Who am I</span>
              <small role="img" aria-label="question mark">
                ❓
              </small>
            </h1>
            <h2 className="section-contact__h2">{OWNER_BIO}</h2>
          </section>
          <section
            id="sectionProjects"
            className="section-projects"
            aria-labelledby="projects-heading"
          >
            <h1 id="projects-heading" className="heading-1">
              <span>Yeah, I work hard </span>{" "}
              <small role="img" aria-label="briefcase">
                💼
              </small>
            </h1>
            <p className="paragraph">
              Each project is unique. Here are some of my works.
            </p>

            {/* Projects rendered from constants */}
            {OWNER_PROJECTS.map((project, idx) => (
              <div className="project-card" key={idx}>
                <div className="project-card__left">
                  <h4 className="heading-4">{project.tech}</h4>
                </div>
                <div
                  className="project-card__middle"
                  data-displacement={
                    project.displacement || "webp/myDistorsionImage.webp"
                  }
                >
                  {project.images?.map((img: string, i: number) => (
                    <img
                      style={{ objectFit: "cover" }}
                      src={img}
                      alt={project.name + " image"}
                      key={i}
                    />
                  ))}
                </div>
                <div className="project-card__right">
                  <h2
                    data-scroll
                    data-scroll-offset="35%"
                    data-scroll-repeat={true}
                    data-scroll-class={project.scrollClass}
                    className="heading-2"
                  >
                    {project.name}
                    {project.subtitle && (
                      <>
                        <br />
                        {project.subtitle}
                      </>
                    )}
                  </h2>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={project.url}
                    className="project-card__link"
                    aria-label={`Visit ${project.name} website`}
                  >
                    VISIT THE WEBSITE
                  </a>
                  <div className="project-card__socials">
                    {project.dribbble && (
                      <a
                        href={project.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} on Dribbble`}
                      >
                        <img src="svg/dribble.svg" alt="Dribbble icon" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} source code on GitHub`}
                      >
                        <img src="svg/github.svg" alt="GitHub icon" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section
            className="section-contact"
            aria-labelledby="contact-heading"
          >
            <h1 id="contact-heading" className="heading-1">
              <span>Sold Yet? </span>{" "}
              <small role="img" aria-label="call me hand">
                🤙
              </small>
            </h1>
            <h2 className="section-contact__h2">
              {/* Contact text from constants */}
              {OWNER_DESCRIPTION}
              <a
                href={`mailto:${OWNER_EMAIL}`}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Send me an email"
              >
                &nbsp; email{" "}
                <span role="img" aria-label="email icon">
                  📧
                </span>
              </a>
              .
            </h2>
          </section>
          <section
            className="section-socials"
            aria-labelledby="socials-heading"
          >
            <h1 id="socials-heading" className="heading-1">
              <span>Dont be a stranger!</span>{" "}
              <small role="img" aria-label="waving hand">
                👋
              </small>
            </h1>
            <p className="paragraph">Connect with me online</p>
            <div className="section-socials--links">
              <a
                href={OWNER_GITHUB}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Follow me on GitHub"
              >
                <span role="img" aria-label="alien monster">
                  👾
                </span>{" "}
                GitHub
              </a>
              <a
                href={OWNER_LINKEDIN}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Connect with me on LinkedIn"
              >
                <span role="img" aria-label="briefcase">
                  💼
                </span>{" "}
                LinkedIn
              </a>
            </div>
          </section>
        </main>
        <footer className="footer" role="contentinfo">
          <img src="svg/logo-footer.svg" alt="Francesco Vasturzo logo" />
          <div className="footer__socials">
            {/* Socials from constants if needed */}
            <a
              href={OWNER_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
            >
              <img src="svg/github.svg" alt="GitHub logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
