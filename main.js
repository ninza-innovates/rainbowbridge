const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");
const year = document.querySelector("#year");
const form = document.querySelector("#brief-form");
const error = document.querySelector("#form-error");
const thanks = document.querySelector("#thanks");
const thanksBody = document.querySelector("#thanks-body");
const copyBtn = document.querySelector("#copy-brief");

year.textContent = String(new Date().getFullYear());

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

function briefText(data) {
  return [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Company: ${data.get("company")}`,
    `Need: ${data.get("need")}`,
    "",
    data.get("message"),
  ].join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  error.hidden = true;

  if (!form.checkValidity()) {
    error.hidden = false;
    error.textContent = "Add your name, work email, company, need, and a short brief.";
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const text = briefText(data);
  const subject = encodeURIComponent(`RainbowBridge briefing — ${data.get("company")}`);
  const body = encodeURIComponent(text);
  window.location.href = `mailto:support@rainbowbridge.org?subject=${subject}&body=${body}`;

  thanksBody.textContent = text;
  form.hidden = true;
  thanks.hidden = false;
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(thanksBody.textContent);
    copyBtn.textContent = "Copied";
  } catch {
    copyBtn.textContent = "Select the note above";
  }
});
