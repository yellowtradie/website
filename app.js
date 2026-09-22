/* YellowTradie early access.
 *
 * Every "Get early access" control on the page opens the signup modal. The
 * modal posts the details to Formspree as JSON, delivered by form xrpbqypw.
 * That endpoint is a public URL by design, so it is safe to keep in the repo.
 *
 * If FORM_ENDPOINT is ever set back to "REPLACE_ME" the form drops into
 * preview mode: it validates properly, shows the real success state, and keeps
 * the signup in the browser instead of sending it anywhere. A banner says so
 * on screen so a preview can never be mistaken for a working signup.
 */

const FORM_ENDPOINT = "https://formspree.io/f/xrpbqypw";

(function () {
  const modal = document.querySelector("[data-signup-modal]");
  if (!modal) return;

  const panel = modal.querySelector(".modal-panel");
  const form = modal.querySelector("[data-signup-form]");
  const status = modal.querySelector("[data-signup-status]");
  const formError = modal.querySelector("[data-signup-form-error]");
  const submitButton = form.querySelector("button[type=submit]");
  const gotcha = form.querySelector("[name=_gotcha]");
  const previewBanner = document.querySelector("[data-preview-banner]");

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  /* Digits, spaces, dashes, brackets and an optional leading +. Nine digits
     after the first character, which is the shortest number worth accepting. */
  const PHONE = /^[+(\d][\d\s()-]{8,}$/;

  const RULES = [
    { id: "full-name", blank: "Add your name so we know who to ask for." },
    { id: "business-name", blank: "Add your business name." },
    {
      id: "email",
      blank: "Add your email so we can send your invite.",
      bad: "That email does not look right. Check it and try again.",
      test: function (value) { return EMAIL.test(value); },
    },
    {
      id: "phone",
      blank: "Add a phone number so we can reach you.",
      bad: "That phone number does not look right. Check it and try again.",
      test: function (value) { return PHONE.test(value); },
    },
  ].map(function (rule) {
    rule.input = form.querySelector("#" + rule.id);
    rule.error = form.querySelector("#" + rule.id + "-error");
    return rule;
  });

  function clearError(rule) {
    rule.error.textContent = "";
    rule.error.hidden = true;
    rule.input.removeAttribute("aria-invalid");
  }

  function showError(rule, message) {
    rule.error.textContent = message;
    rule.error.hidden = false;
    rule.input.setAttribute("aria-invalid", "true");
  }

  function check(rule) {
    const value = rule.input.value.trim();
    if (!value) {
      showError(rule, rule.blank);
      return false;
    }
    if (rule.test && !rule.test(value)) {
      showError(rule, rule.bad);
      return false;
    }
    clearError(rule);
    return true;
  }

  RULES.forEach(function (rule) {
    rule.input.addEventListener("input", function () { clearError(rule); });
  });

  const isLive = FORM_ENDPOINT && FORM_ENDPOINT !== "REPLACE_ME";
  if (!isLive && previewBanner) previewBanner.hidden = false;

  /* ---------------------------------------------------------------- modal -- */

  let opener = null;

  function openModal() {
    opener = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    const first = form.hidden ? status : RULES[0].input;
    if (first && first.focus) first.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (opener && opener.focus) opener.focus();
  }

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-open-signup]"),
    function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        openModal();
      });
    }
  );

  Array.prototype.forEach.call(
    modal.querySelectorAll("[data-close-signup]"),
    function (trigger) { trigger.addEventListener("click", closeModal); }
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  /* Keep Tab inside the panel while it is open. */
  modal.addEventListener("keydown", function (event) {
    if (event.key !== "Tab") return;
    const focusable = Array.prototype.filter.call(
      panel.querySelectorAll("button, input, a[href], [tabindex]"),
      function (el) {
        return !el.disabled && el.tabIndex >= 0 && el.offsetParent !== null;
      }
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* --------------------------------------------------------------- submit -- */

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    formError.hidden = true;

    let firstBad = null;
    RULES.forEach(function (rule) {
      if (!check(rule) && !firstBad) firstBad = rule;
    });
    if (firstBad) {
      firstBad.input.focus();
      return;
    }

    if (gotcha.value) return; // honeypot: quietly drop bots

    const payload = {
      fullName: form.querySelector("#full-name").value.trim(),
      businessName: form.querySelector("#business-name").value.trim(),
      email: form.querySelector("#email").value.trim(),
      phone: form.querySelector("#phone").value.trim(),
      source: "yellowtradie.com",
      signed_up_at: new Date().toISOString(),
      _subject: "YellowTradie early access request",
    };

    submitButton.disabled = true;
    const label = submitButton.textContent;
    submitButton.textContent = "Sending...";

    try {
      if (isLive) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Request failed with " + response.status);
      } else {
        const list = JSON.parse(localStorage.getItem("yellowtradie_signups") || "[]");
        list.push(payload);
        localStorage.setItem("yellowtradie_signups", JSON.stringify(list));
        console.info("[preview] signup stored locally, not sent:", payload);
      }

      form.hidden = true;
      status.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = label;
      status.focus();
    } catch (error) {
      submitButton.disabled = false;
      submitButton.textContent = label;
      formError.textContent =
        "Something went wrong at our end. Try again, or email hello@yellowtradie.com.";
      formError.hidden = false;
    }
  });
})();

/* The early access band carries a short vertical clip. The file is dropped in
 * later, so the slot only appears once the video really loads. A missing file
 * leaves the band exactly as it was, with no broken box and no empty space.
 * Drop the clip at assets/tiktok.mp4 and bump the ?v= if it is ever replaced.
 */
(function () {
  const slot = document.querySelector("[data-video-slot]");
  if (!slot) return;

  const clip = slot.querySelector("video");
  if (!clip) return;

  function show() {
    slot.hidden = false;
    const started = clip.play();
    if (started && started.catch) started.catch(function () {});
  }

  clip.addEventListener("loadeddata", show);
  clip.addEventListener("error", function () { slot.hidden = true; }, true);

  /* Tap to pause or resume, because the clip carries no controls. */
  clip.addEventListener("click", function () {
    if (clip.paused) show();
    else clip.pause();
  });

  clip.load();
})();

/* The "See it in 30 seconds" carousel.
 *
 * Five real app screens. On a phone they are swiped; on a desktop they can be
 * paged with the numbered dots. It advances on its own every few seconds,
 * which is the looping demo, and stops for good the moment somebody touches
 * it. Nothing moves at all if the person has asked their device for less
 * motion, and nothing moves while the carousel is off screen.
 */
(function () {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-slide]"));
  const dots = Array.prototype.slice.call(carousel.querySelectorAll("[data-slide-to]"));
  if (!track || slides.length < 2 || !dots.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DELAY = 4500;

  let current = 0;
  let stopped = false;
  let timer = null;

  function offsetFor(index) {
    return slides[index].offsetLeft - slides[0].offsetLeft;
  }

  function paint() {
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-current", i === current);
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }

  function goTo(index, smooth) {
    current = (index + slides.length) % slides.length;
    track.scrollTo({ left: offsetFor(current), behavior: smooth ? "smooth" : "auto" });
    paint();
  }

  function start() {
    if (timer || stopped || reduced) return;
    timer = window.setInterval(function () {
      if (!document.hidden) goTo(current + 1, true);
    }, DELAY);
  }

  function stop() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) start();
        else stop();
      });
    }, { threshold: 0.35 }).observe(carousel);
  } else {
    start();
  }

  /* One touch and it is the person's carousel, not ours. */
  ["pointerdown", "touchstart", "wheel", "keydown"].forEach(function (type) {
    carousel.addEventListener(type, function () { stopped = true; stop(); }, { passive: true });
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      goTo(Number(dot.getAttribute("data-slide-to")), true);
    });
  });

  /* Keep the dots honest when the track is swiped by hand. */
  let settle = null;
  track.addEventListener("scroll", function () {
    if (settle) return;
    settle = window.setTimeout(function () {
      settle = null;
      let nearest = 0;
      let best = Infinity;
      slides.forEach(function (slide, i) {
        const distance = Math.abs(offsetFor(i) - track.scrollLeft);
        if (distance < best) { best = distance; nearest = i; }
      });
      if (nearest !== current) { current = nearest; paint(); }
    }, 120);
  }, { passive: true });

  window.addEventListener("resize", function () { goTo(current, false); });
})();

/* The missed call calculator.
 *
 * Two sliders and one sum. Every figure is the person's own: nothing here is
 * an estimate from us, and the page says so underneath. The output is written
 * from two numbers, so there is nothing to parse and nothing to trust.
 */
(function () {
  const calc = document.querySelector("[data-calc]");
  if (!calc) return;

  const calls = calc.querySelector("[data-calc-calls]");
  const worth = calc.querySelector("[data-calc-worth]");
  const callsOut = calc.querySelector("[data-calc-calls-out]");
  const worthOut = calc.querySelector("[data-calc-worth-out]");
  const result = calc.querySelector("[data-calc-result]");
  if (!calls || !worth || !result) return;

  const pounds = new Intl.NumberFormat("en-GB", {
    style: "currency", currency: "GBP", maximumFractionDigits: 0,
  });

  function update() {
    const missed = Number(calls.value);
    const value = Number(worth.value);

    callsOut.textContent = String(missed);
    worthOut.textContent = pounds.format(value);

    if (missed === 0) {
      result.innerHTML =
        "You do not miss calls. When one slips through on a busy day, the message is still taken.";
      return;
    }

    result.innerHTML = "That is about <strong>" + pounds.format(missed * value * 52) +
      "</strong> a year in jobs that went to whoever picked up first.";
  }

  calls.addEventListener("input", update);
  worth.addEventListener("input", update);
  update();
})();

/* The button under his thumb.
 *
 * Phones only (the stylesheet owns that rule). It appears once the hero is
 * behind you and goes away again when you scroll back up. It never appears
 * while the preview banner is on screen, because two bars stacked at the
 * bottom of a phone is worse than none.
 */
(function () {
  const bar = document.querySelector("[data-sticky-cta]");
  const hero = document.querySelector(".hero");
  if (!bar || !hero) return;

  const previewBanner = document.querySelector("[data-preview-banner]");
  if (previewBanner && !previewBanner.hidden) return;

  /* Read the hero's own bottom edge rather than an observer's ratio. An
     element that has just left the top of the screen reports an intersection
     of exactly zero, which is the one case an observer gets vague about. */
  let shown = false;
  let queued = false;

  function update() {
    queued = false;
    const past = hero.getBoundingClientRect().bottom <= 80;
    if (past === shown) return;
    shown = past;

    if (past) {
      bar.hidden = false;
      window.requestAnimationFrame(function () { bar.classList.add("is-visible"); });
    } else {
      bar.classList.remove("is-visible");
      bar.hidden = true;
    }
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
