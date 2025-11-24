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
} from "../modules/constants";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";

interface indexProps {}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: any } = {
  duration: 1.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
  // ease: [0.6, 0.01, -0.05, 0.9],
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = () => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { error } = useSwr("/api/tweets", fetcher);

  if (error) console.log(error);

  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
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
          <link rel="icon" href="svg/favicon.svg" />
          <link href={OWNER_CANONICAL_URL} rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>{OWNER_NAME}</title>
          <meta name="description" content={OWNER_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={OWNER_NAME} />
          <meta property="og:url" content={OWNER_CANONICAL_URL} />
          <meta property="og:image" content={OWNER_OG_IMAGE} />
          <meta property="og:description" content={OWNER_DESCRIPTION} />
          <meta name="twitter:title" content={OWNER_NAME} />
          <meta name="twitter:description" content={OWNER_DESCRIPTION} />
          <meta name="twitter:image" content={OWNER_OG_IMAGE} />
          <meta name="twitter:card" content={OWNER_TWITTER_CARD} />
          <meta name="twitter:url" content={OWNER_CANONICAL_URL} />
        </Head>
        <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader.mp3" type="audio/mp3" />
        </audio>
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
              <img src="svg/adeola-logo-left.svg" alt="adeola logo" />
            </motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">HTML</p>
              <p className="preloader__text">CSS/SCSS</p>
              <p className="preloader__text">JAVASCRIPT</p>
              <p className="preloader__text">TYPESCRIPT</p>
              <p className="preloader__text">REACT JS</p>
              <p className="preloader__text">NEXT JS</p>
              <p className="preloader__text">FRAMER MOTION</p>
            </motion.div>
          </div>
        </motion.div>
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
              >
                VIEW PROJECTS
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                >
                  &nbsp;
                </div>
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
                href="https://github.com/francescovasturzo"
                rel="noopener"
                target="_blank"
              >
                👾 GH
              </a>
              <a
                href="https://www.linkedin.com/in/adeoladev"
                rel="noopener"
                target="_blank"
              >
                💼 LD
              </a>
              <a
                href="https://www.instagram.com/francescovasturzo_"
                rel="noopener"
                target="_blank"
              >
                {" "}
                📸 IN
              </a>
            </div>
          </div>
        </div>
        <main className="container">
          <section className="section-projects">
            <h1 className="heading-1">
              <span>Who I am</span>
              <small>❓</small>
            </h1>
            <h2 className="section-contact__h2">{OWNER_BIO}</h2>
          </section>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>Yeah, I work hard </span> <small>💼</small>
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
                    <img src={img} alt={project.name + " image"} key={i} />
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
                    rel="noopener"
                    target="_blank"
                    href={project.url}
                    className="project-card__link"
                  >
                    VISIT THE WEBSITE
                  </a>
                  <div className="project-card__socials">
                    {project.dribbble && (
                      <a href={project.dribbble} target="_blank" rel="noopener">
                        <img src="svg/dribble.svg" alt="dribble icon" />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener">
                        <img src="svg/github.svg" alt="github icon" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>Sold Yet? </span> <small>🤙</small>
            </h1>
            <h2 className="section-contact__h2">
              {/* Contact text from constants */}
              {OWNER_DESCRIPTION}
              <a href={`mailto:${OWNER_EMAIL}`} rel="noopener" target="_blank">
                &nbsp; email 📧
              </a>
              .
            </h2>
          </section>
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
            </h1>
            <p className="paragraph">Connect with me online</p>
            <div className="section-socials--links">
              <a href={OWNER_GITHUB} rel="noopener" target="_blank">
                👾 GitHub
              </a>
              <a href={OWNER_TWITTER} rel="noopener" target="_blank">
                🐦 Twitter
              </a>
              <a href={OWNER_LINKEDIN} rel="noopener" target="_blank">
                💼 LinkedIn
              </a>
              <a href={OWNER_INSTAGRAM} rel="noopener" target="_blank">
                📸 Instagram
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <img src="svg/adeola-logo-footer.svg" alt="footer logo" />
          <div className="footer__socials">
            {/* Socials from constants if needed */}
            <a href={OWNER_GITHUB} target="_blank" rel="noopener">
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
