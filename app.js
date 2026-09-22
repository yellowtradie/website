/* YellowTradie early access form.
 *
 * ONE thing to set before this page goes live: FORM_ENDPOINT below.
 * Until it is set the form runs in preview mode: it validates properly,
 * shows the real success state, and stores the signup in the browser
 * instead of sending it anywhere. A small banner says so on screen so a
 * preview can never be mistaken for a working signup.
 */

const FORM_ENDPOINT = "REPLACE_ME";

(function () {
  const form = document.querySelector("[data-signup-form]");
  if (!form) return;

  const status = document.querySelector("[data-signup-status]");
  const button = form.querySelector("button[type=submit]");
  const emailField = form.querySelector("#email");
  const errorField = form.querySelector("[data-signup-error]");
  const previewBanner = document.querySelector("[data-preview-banner]");

  const isLive = FORM_ENDPOINT && FORM_ENDPOINT !== "REPLACE_ME";
  if (!isLive && previewBanner) previewBanner.hidden = false;

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fail(message) {
    errorField.textContent = message;
    errorField.hidden = false;
    emailField.setAttribute("aria-invalid", "true");
    emailField.focus();
  }

  function clearError() {
    errorField.textContent = "";
    errorField.hidden = true;
    emailField.removeAttribute("aria-invalid");
  }

  emailField.addEventListener("input", clearError);

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearError();

    const email = emailField.value.trim();

    if (!email) return fail("Add your email so we can send your invite.");
    if (!EMAIL.test(email)) return fail("That email does not look right. Check it and try again.");

    if (form.querySelector("[name=company]").value) return; // honeypot: quietly drop bots

    const payload = {
      email: email,
      source: "yellowtradie.com",
      signed_up_at: new Date().toISOString(),
    };

    button.disabled = true;
    const label = button.textContent;
    button.textContent = "Sending...";

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
      status.focus();
    } catch (error) {
      button.disabled = false;
      button.textContent = label;
      form.hidden = false;
      fail("Something went wrong at our end. Try again, or email hello@yellowtradie.com.");
    }
  });
})();
