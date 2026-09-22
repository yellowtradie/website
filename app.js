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
