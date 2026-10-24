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

/* The visit-counting switch on the privacy page.
 *
 * Why this exists rather than a consent banner. Since 5 February 2026 UK rules
 * no longer need consent for first party analytics cookies whose only job is
 * measuring how a site is used, but they do require two things: the visitor is
 * told clearly what the cookies are for, and the visitor has a simple, free way
 * to object. The privacy page does the telling. This is the objecting.
 *
 * It is deliberately the first thing in this file: `ga-disable-<id>` has to be
 * true BEFORE gtag.js loads in the head, otherwise the first page view is sent
 * before the switch is read. That is the whole point of the exercise, so this
 * block must stay above everything else.
 *
 * Only reads. It does not set the flag for anyone who has not asked.
 */
(function () {
  const ID = "G-DZZT654SCD";
  const KEY = "yt_ga_off";

  /* The inline script in the head has already set the flag if the visitor had
     switched counting off. It is read here rather than set here so the page
     knows which way the button should read. */
  let off = window["ga-disable-" + ID] === true || false;
  try { if (window.localStorage.getItem(KEY) === "1") off = true; } catch (e) {}

  const box = document.querySelector("[data-optout]");
  if (!box) return;

  const state = box.querySelector("[data-optout-state]");
  const button = box.querySelector("[data-optout-toggle]");
  if (!state || !button) return;

  function paint() {
    if (off) {
      state.textContent = "Visit counting is off in this browser. Nothing about your visit is being sent.";
      button.textContent = "Turn visit counting back on";
    } else {
      state.textContent = "Visit counting is on in this browser.";
      button.textContent = "Turn visit counting off";
    }
  }

  button.addEventListener("click", function () {
    off = !off;
    try {
      if (off) window.localStorage.setItem(KEY, "1");
      else window.localStorage.removeItem(KEY);
    } catch (e) { /* a browser that refuses storage keeps the session setting */ }
    window["ga-disable-" + ID] = off;
    paint();
  });

  paint();
})();

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

  const RULES = [
    { id: "full-name", blank: "Add your name so we know who to ask for." },
    { id: "business-name", blank: "Add your business name." },
    {
      id: "email",
      blank: "Add your email so we can send your invite.",
      bad: "That email does not look right. Check it and try again.",
      test: function (value) { return EMAIL.test(value); },
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

/* The early access band, its button and its short-clip slot came off the page on
 * 2026-10-22, so the code that revealed and played the clip came off with them.
 */

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
  let nudged = false;

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

  /* One small sideways move the first time the row comes into view. Motion is
     the only thing that teaches a swipe without adding a word to the page. It
     happens once, never if the device asked for less motion, and never if the
     person has already touched it. */
  function nudge() {
    if (nudged || reduced || stopped) return;
    nudged = true;
    track.scrollTo({ left: offsetFor(current) + 46, behavior: "smooth" });
    window.setTimeout(function () {
      if (!stopped) track.scrollTo({ left: offsetFor(current), behavior: "smooth" });
    }, 480);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { nudge(); start(); }
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

/* Calculators for the tools pages. Each block checks its own marker and
 * returns if it is not on the page, so one page never breaks another.
 */
(function () {
  var fmt = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var fmt0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  var pct = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  var vat = document.querySelector("[data-vat-calc]");
  if (vat) {
    var vAmt = vat.querySelector("[data-vat-amount]");
    var vRate = vat.querySelector("[data-vat-rate]");
    var vMode = vat.querySelector("[data-vat-mode]");
    var vRes = vat.querySelector("[data-vat-result]");
    function vatUpdate() {
      var a = Math.max(0, Number(vAmt.value) || 0);
      var r = Number(vRate.value) || 0;
      var m = vMode.value;
      var rate = r / 100;
      var net, vatAmt, total;
      if (m === "add") { net = a; vatAmt = net * rate; total = net + vatAmt; vRes.textContent = fmt.format(net) + " plus " + fmt.format(vatAmt) + " VAT is " + fmt.format(total) + " at " + r + "%. Net " + fmt.format(net) + ". VAT " + fmt.format(vatAmt) + ". Total " + fmt.format(total) + "."; }
      else { total = a; net = r === 0 ? total : total / (1 + rate); vatAmt = total - net; vRes.textContent = fmt.format(total) + " holds " + fmt.format(vatAmt) + " VAT at " + r + "%. Net " + fmt.format(net) + ". VAT " + fmt.format(vatAmt) + "."; }
    }
    vAmt.addEventListener("input", vatUpdate); vRate.addEventListener("change", vatUpdate); vMode.addEventListener("change", vatUpdate); vatUpdate();
  }

  var rvc = document.querySelector("[data-remove-vat-calc]");
  if (rvc) {
    var rAmt = rvc.querySelector("[data-rvc-amount]");
    var rRate = rvc.querySelector("[data-rvc-rate]");
    var rRes = rvc.querySelector("[data-rvc-result]");
    function rvcUpdate() {
      var total = Math.max(0, Number(rAmt.value) || 0);
      var r = Number(rRate.value) || 0;
      var rate = r / 100;
      var net = r === 0 ? total : total / (1 + rate);
      var vatAmt = total - net;
      rRes.textContent = fmt.format(total) + " at " + r + "% holds " + fmt.format(vatAmt) + " VAT. Net " + fmt.format(net) + ".";
    }
    rAmt.addEventListener("input", rvcUpdate); rRate.addEventListener("change", rvcUpdate); rvcUpdate();
  }

  var cis = document.querySelector("[data-cis-calc]");
  if (cis) {
    var cGross = cis.querySelector("[data-cis-gross]");
    var cMat = cis.querySelector("[data-cis-materials]");
    var cVat = cis.querySelector("[data-cis-vat]");
    var cRate = cis.querySelector("[data-cis-rate]");
    var cRes = cis.querySelector("[data-cis-result]");
    function cisUpdate() {
      var gross = Math.max(0, Number(cGross.value) || 0);
      var mat = Math.max(0, Number(cMat.value) || 0);
      var vatAmt = Math.max(0, Number(cVat.value) || 0);
      var r = Number(cRate.value) || 0;
      var liable = Math.max(0, gross - mat - vatAmt);
      var ded = liable * (r / 100);
      var paid = gross - ded;
      cRes.textContent = "Labour for CIS " + fmt.format(liable) + ". CIS at " + r + "% is " + fmt.format(ded) + ". You pay " + fmt.format(paid) + " and send " + fmt.format(ded) + " to HMRC.";
    }
    cGross.addEventListener("input", cisUpdate); cMat.addEventListener("input", cisUpdate); cVat.addEventListener("input", cisUpdate); cRate.addEventListener("change", cisUpdate); cisUpdate();
  }

  var jp = document.querySelector("[data-job-profit-calc]");
  if (jp) {
    var jInc = jp.querySelector("[data-jp-income]");
    var jMat = jp.querySelector("[data-jp-materials]");
    var jLab = jp.querySelector("[data-jp-labour]");
    var jOth = jp.querySelector("[data-jp-other]");
    var jRes = jp.querySelector("[data-jp-result]");
    function jpUpdate() {
      var inc = Math.max(0, Number(jInc.value) || 0);
      var mat = Math.max(0, Number(jMat.value) || 0);
      var lab = Math.max(0, Number(jLab.value) || 0);
      var oth = Math.max(0, Number(jOth.value) || 0);
      var costs = mat + lab + oth;
      var profit = inc - costs;
      var margin = inc > 0 ? (profit / inc) * 100 : 0;
      jRes.textContent = "Costs " + fmt.format(costs) + ". Profit " + fmt.format(profit) + ". Margin " + pct.format(margin) + "%.";
    }
    jInc.addEventListener("input", jpUpdate); jMat.addEventListener("input", jpUpdate); jLab.addEventListener("input", jpUpdate); jOth.addEventListener("input", jpUpdate); jpUpdate();
  }
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
