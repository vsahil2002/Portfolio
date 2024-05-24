/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  let menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- DOWNLOAD RESUME -----*/
function downloadPDF() {
  const link = document.createElement("a");
  link.href = "sahilresume1.pdf"; // Path to your PDF file
  link.download = "sahilresume.pdf"; // Name of the file to be downloaded
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
let typingEffect = new Typed(".typedText", {
  strings: ["Freelancer", "Native Developer", "Web Developer"],
  loop: true,
  typeSpeed: 150,
  backSpeed: 100,
  backDelay: 1000,
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

/* -- HOME -- */
sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });

/* -- PROJECT BOX -- */
sr.reveal(".project-box", { interval: 200 });

/* -- HEADINGS -- */
sr.reveal(".top-header", {});

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: true,
});

srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

function onClickTeamcamp() {
  window.open(
    "https://play.google.com/store/search?q=teamcamp&c=apps",
    "_blank"
  );
}

function onClickEarlybird() {
  window.open(
    "https://play.google.com/store/apps/details?id=com.learnwithearlybird.earlybird",
    "_blank"
  );
}

function onClickLinkedin() {
  window.open("https://www.linkedin.com/in/sahil-vasoya-08196b259/", "_blank");
}

function onClickInsta() {
  window.open("https://www.instagram.com/sahil_v2608/", "_blank");
}

function onClickBb() {
  window.open("https://admin.dev.battlebuddies.app/login", "_blank");
}

function showToast(message, type) {
  // Create a new div element for the toast
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  // Add a class based on the message type
  if (type === "success") {
    toast.classList.add("toast-success");
  } else if (type === "warning") {
    toast.classList.add("toast-warning");
  }

  // Append the toast to the body
  document.body.appendChild(toast);

  // Remove the toast after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showSendingToast(message) {
  // Create a new div element for the toast
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  toast.classList.add("toast-success");

  // Append the toast to the body
  document.body.appendChild(toast);
}

function sendMessage() {
  const toast = document.createElement("div");
  const name = document.getElementById("Name");
  const email = document.getElementById("Email");
  const message = document.getElementById("Message");

  let valid = true;

  if (!name.value) {
    name.classList.add("error-border");
    valid = false;
  } else {
    name.classList.remove("error-border");
  }

  if (!email.value) {
    email.classList.add("error-border");
    valid = false;
  } else {
    email.classList.remove("error-border");
  }

  if (!message.value) {
    message.classList.add("error-border");
    valid = false;
  } else {
    message.classList.remove("error-border");
  }

  if (valid) {
    showSendingToast("sending....");
    fetch("https://backendportfolio-blue.vercel.app/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.remove();
        showToast("Message sent successfully!", "success");
        name.value = "";
        email.value = "";
        message.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast("Something went wrong please try again later", "warning");
      });
  } else {
    showToast("Please fill all fields", "warning");
  }
}

document.getElementById("Name").addEventListener("input", function () {
  this.classList.remove("error-border");
});

document.getElementById("Email").addEventListener("input", function () {
  this.classList.remove("error-border");
});

document.getElementById("Message").addEventListener("input", function () {
  this.classList.remove("error-border");
});
