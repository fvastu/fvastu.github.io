import { cubicBezier, motion } from "framer-motion";
import {
  OWNER_EMAIL,
  OWNER_GITHUB,
  OWNER_TWITTER,
  OWNER_LINKEDIN,
  OWNER_INSTAGRAM,
  OWNER_PROJECTS,
} from "../../modules/constants";

const openTransition = {
  duration: 1.1,
  delay: 1.2,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

const openTopTransition = {
  duration: 1.1,
  delay: 1.3,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

const openBottomTransition = {
  duration: 1.1,
  delay: 1.7,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

const closedTansition = {
  duration: 1,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

export const MobileNavigation = ({ variants, isOpen }: any) => (
  <motion.div
    data-scroll
    data-scroll-sticky
    data-scroll-target="#menu-target"
    variants={variants}
    className="menu-wrapper"
  >
    <motion.div
      animate={
        isOpen
          ? { opacity: 1, transition: openTransition }
          : { opacity: 0, transition: closedTansition }
      }
    >
      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openTopTransition }
            : { opacity: 0, transition: closedTansition }
        }
        className="navigation-top"
      >
        <div className="navigation-top__left">
          <h4 className="navigation-h4">DONT BE A STRANGER</h4>
          <div className="navigation-top__left--links">
            <a href={OWNER_GITHUB} rel="noopener" target="_blank">
              👾 GH
            </a>
            <a href={OWNER_TWITTER} rel="noopener" target="_blank">
              🐦 TW
            </a>
            <a href={OWNER_LINKEDIN} rel="noopener" target="_blank">
              💼 LD
            </a>
            <a href={OWNER_INSTAGRAM} rel="noopener" target="_blank">
              📸 IN
            </a>
          </div>
        </div>
        <div className="navigation-top__right">
          <h4 className="navigation-h4">HAVE AN IDEA?</h4>
          <a
            href={`mailto:${OWNER_EMAIL}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Tell me about it
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openBottomTransition }
            : { opacity: 0, transition: closedTansition }
        }
        className="navigation-bottom"
      >
        <h4 className="navigation-h4">FEATURED PROJECTS</h4>
        <div className="navigation-bottom__projects">
          {OWNER_PROJECTS.slice(0, 3).map((project, idx) => (
            <a
              key={idx}
              target="_blank"
              rel="noopener"
              href={project.url}
              className="navigation-bottom__projects-card"
            >
              {/* Use first image if available, else fallback */}
              <img
                src={project.images[0] || "webp/placeholder.webp"}
                alt={project.name}
              />
              <h2>
                {project.name}
                {project.subtitle && (
                  <>
                    <br />
                    {project.subtitle}
                  </>
                )}
              </h2>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);
