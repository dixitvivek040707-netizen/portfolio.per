/* Edit this section when adding verified projects. Keep it empty until you have project details to publish. */
const projects = [];

const projectGrid = document.querySelector("#project-grid");
if (projectGrid) {
  if (projects.length === 0) {
    projectGrid.innerHTML = `
      <div class="empty-projects">
        <span class="empty-symbol" aria-hidden="true">✳</span>
        <div><h3>The canvas is open.</h3><p>Project details will appear here as they’re ready to share. No sample work or results are presented as Vivek’s work.</p></div>
      </div>`;
  } else {
    projectGrid.innerHTML = projects.map((project, index) => `
      <article class="project-card">
        <div class="project-visual" role="img" aria-label="${escapeHTML(project.imageAlt || `${project.title} project preview`)}">
          ${project.image ? `<img src="${escapeHTML(project.image)}" alt="" loading="lazy" />` : `<span class="project-placeholder-mark" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>`}
          <span class="project-num">${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</span>
        </div>
        <div class="project-meta"><div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p></div><span class="project-index">↗</span></div>
        <div class="project-tags">${(project.technologies || []).map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        <p class="project-contribution">${escapeHTML(project.contribution || "")}</p>
        <div class="project-links">${project.demo ? `<a href="${safeURL(project.demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>` : ""}${project.source ? `<a href="${safeURL(project.source)}" target="_blank" rel="noopener noreferrer">Source code ↗</a>` : ""}</div>
      </article>`).join("");
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function safeURL(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["https:", "http:"].includes(url.protocol) ? escapeHTML(url.href) : "#";
  } catch {
    return "#";
  }
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const motionButton = document.querySelector("#motion-toggle");
const motionLabel = motionButton?.querySelector(".motion-label");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionEnabled = !reducedMotion.matches;
function setMotionEnabled(enabled) {
  motionEnabled = enabled;
  document.documentElement.classList.toggle("motion-off", !enabled);
  motionButton?.setAttribute("aria-pressed", String(!enabled));
  motionButton?.setAttribute("aria-label", enabled ? "Turn off animations" : "Turn on animations");
  if (motionLabel) motionLabel.textContent = enabled ? "MOTION ON" : "MOTION OFF";
  if (!enabled) document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
if (motionButton) {
  setMotionEnabled(!reducedMotion.matches);
  motionButton.addEventListener("click", () => {
    setMotionEnabled(document.documentElement.classList.contains("motion-off"));
  });
  reducedMotion.addEventListener?.("change", (event) => setMotionEnabled(!event.matches));
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }));
}

const revealTargets = document.querySelectorAll(".section-kicker, .about-grid, .about-note, .skills-heading, .skill-group, .skills-footnote, .work-heading, .project-card, .empty-projects, .work-bottom, .contact-grid");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

const glow = document.querySelector(".pointer-glow");
if (glow && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });
}

const phrases = ["creative digital experiences", "thoughtful web interfaces", "ideas for the open web"];
const rotator = document.querySelector(".role-rotator");
if (rotator && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let phraseIndex = 0;
  window.setInterval(() => {
    if (!motionEnabled) return;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    rotator.animate([{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300, easing: "ease-out" });
    rotator.textContent = phrases[phraseIndex];
  }, 3200);
}

const scrollProgress = document.querySelector(".scroll-progress span");
if (scrollProgress) {
  let progressFrame = 0;
  const updateProgress = () => {
    if (progressFrame) return;
    progressFrame = window.requestAnimationFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      scrollProgress.style.transform = `scaleX(${progress})`;
      progressFrame = 0;
    });
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();
}

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion.matches) {
  document.querySelectorAll(".button, .nav-resume").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      if (!motionEnabled) return;
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
      element.style.setProperty("--hover-x", `${x.toFixed(1)}px`);
      element.style.setProperty("--hover-y", `${y.toFixed(1)}px`);
    }, { passive: true });
    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--hover-x");
      element.style.removeProperty("--hover-y");
    });
  });
}

const EMAILJS_CONFIG = Object.freeze({
  serviceId: "service_0l0n87s",
  templateId: "template_3032eop",
  publicKey: "zGjDbSx6OXkjy-KXw",
});

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");
if (form && status && submitButton) {
  let lastSentAt = 0;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.classList.remove("error");

    if (!form.reportValidity()) {
      status.textContent = "Please complete each required field with a valid email address.";
      status.classList.add("error");
      return;
    }
    if (form.elements.website.value.trim()) {
      status.textContent = "Please try again or email me directly.";
      status.classList.add("error");
      return;
    }
    if (Date.now() - lastSentAt < 5000) {
      status.textContent = "Please wait a few seconds before sending another message.";
      status.classList.add("error");
      return;
    }
    if (!window.emailjs) {
      status.textContent = "The contact service did not load. Please email me directly instead.";
      status.classList.add("error");
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    submitButton.innerHTML = 'Sending <span aria-hidden="true">…</span>';
    status.textContent = "Sending your message…";
    try {
      window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      await window.emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form);
      lastSentAt = Date.now();
      form.reset();
      status.textContent = "Thanks — your message was sent. I’ll be in touch.";
    } catch (error) {
      console.error("EmailJS submission failed.", error);
      status.textContent = "Your message could not be sent. Please try again or email me directly.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
      submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
    }
  });
}
