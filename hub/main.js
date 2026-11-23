import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const motion = gsap.matchMedia();
motion.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".hero-copy > *", {
    y: 28,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    clearProps: "all",
  });
  gsap.from(".stage-window", {
    y: 50,
    rotation: -10,
    opacity: 0,
    duration: 1.1,
    delay: 0.18,
    ease: "back.out(1.2)",
    clearProps: "all",
  });
  for (const element of document.querySelectorAll("[data-reveal]")) {
    gsap.from(element, {
      y: 45,
      opacity: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true },
      clearProps: "all",
    });
  }
  gsap.to(".progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });
});
