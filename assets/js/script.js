const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("section[id]")];
const glow = document.getElementById("cursorGlow");
const year = document.getElementById("year");
const typingEl = document.getElementById("typing");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

year.textContent = new Date().getFullYear();

// Header state
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Mobile navigation
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Active section link
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

// Typing effect
const words = ["PHP & MySQL", "React", "Next.js", "JavaScript", "Responsive UI"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = words[wordIndex];
  typingEl.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = deleting ? 42 : 75;

  if (!deleting && charIndex === current.length + 1) {
    deleting = true;
    speed = 1150;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    charIndex = 0;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 260;
  }

  setTimeout(typeLoop, speed);
}
typeLoop();

// Cursor glow - desktop only
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

// Demo contact form
form.addEventListener("submit", e => {
  e.preventDefault();
  formNote.textContent = "Form UI is ready — connect it with your PHP/API mail handler to send emails.";
  formNote.classList.add("success");
});

document.addEventListener("DOMContentLoaded", function () {

    const skillsSection = document.querySelector(".skills-section");
    const skillsHeading = document.querySelector(".skills-heading");
    const skillCards = document.querySelectorAll(".skill-card");

    if (!skillsSection) {
        return;
    }



    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    // Heading show
                    if (skillsHeading) {
                        skillsHeading.classList.add("show");
                    }

                    // Cards show one by one
                    skillCards.forEach(function (card, index) {

                        setTimeout(function () {
                            card.classList.add("show");
                        }, index * 100);

                    });

                    // Run only one time
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    observer.observe(skillsSection);


    /* =====================================
       3D CARD TILT EFFECT
    ===================================== */

    skillCards.forEach(function (card) {

        card.addEventListener("mousemove", function (event) {

            // Desktop only
            if (window.innerWidth <= 992) {
                return;
            }

            const cardRect = card.getBoundingClientRect();

            const mouseX = event.clientX - cardRect.left;
            const mouseY = event.clientY - cardRect.top;

            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;

            const rotateX =
                ((mouseY - centerY) / centerY) * -4;

            const rotateY =
                ((mouseX - centerX) / centerX) * 4;

            card.style.transform = `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;
        });


        /* Mouse leave */

        card.addEventListener("mouseleave", function () {

            if (card.classList.contains("show")) {

                card.style.transform = `
                    perspective(800px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0)
                `;

            }

        });

    });

});

/* =========================================
   EDUCATION SCROLL ANIMATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const educationItems =
            document.querySelectorAll(
                ".education-reveal"
            );


        if(
            "IntersectionObserver"
            in window
        ){

            const educationObserver =
                new IntersectionObserver(

                    function(entries){

                        entries.forEach(
                            function(entry){

                                if(
                                    entry.isIntersecting
                                ){

                                    entry.target
                                        .classList
                                        .add(
                                            "education-visible"
                                        );

                                    educationObserver
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold: .12
                    }

                );


            educationItems.forEach(
                function(item,index){

                    item.style.setProperty(
                        "--education-delay",
                        `${index * 100}ms`
                    );

                    educationObserver
                        .observe(item);

                }
            );

        }

        else{

            educationItems.forEach(
                function(item){

                    item.classList.add(
                        "education-visible"
                    );

                }
            );

        }

    }
);


document.addEventListener("DOMContentLoaded", function () {

  const revealElements =
    document.querySelectorAll(".contact-reveal");

  const contactForm =
    document.getElementById("contactForm");

  const message =
    document.getElementById("contactMessage");

  const messageCount =
    document.getElementById("messageCount");


  /* ===============================
     SCROLL REVEAL
  =============================== */

  const observer = new IntersectionObserver(
    function (entries, observer) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.15
    }
  );


  revealElements.forEach(function (element, index) {

    element.style.transitionDelay =
      `${index * 120}ms`;

    observer.observe(element);

  });



  /* ===============================
     MESSAGE CHARACTER COUNT
  =============================== */

  if (message && messageCount) {

    message.setAttribute("maxlength", "1000");

    message.addEventListener("input", function () {

      messageCount.textContent =
        message.value.length;

    });

  }



  /* ===============================
     FORM VALIDATION
  =============================== */

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      function (event) {

        let isValid = true;

        const requiredFields =
          contactForm.querySelectorAll(
            "[required]"
          );


        requiredFields.forEach(
          function (field) {

            const formGroup =
              field.closest(".form-group");

            const error =
              formGroup.querySelector(
                ".form-error"
              );


            formGroup.classList.remove(
              "has-error"
            );

            error.textContent = "";


            /* Empty field */

            if (!field.value.trim()) {

              isValid = false;

              formGroup.classList.add(
                "has-error"
              );

              error.textContent =
                "This field is required.";

              return;
            }


            /* Email validation */

            if (field.type === "email") {

              const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (
                !emailPattern.test(
                  field.value.trim()
                )
              ) {

                isValid = false;

                formGroup.classList.add(
                  "has-error"
                );

                error.textContent =
                  "Please enter a valid email address.";

              }

            }

          }
        );


        /* Stop submit if error */

        if (!isValid) {

          event.preventDefault();

          const firstError =
            contactForm.querySelector(
              ".has-error input, .has-error textarea"
            );

          if (firstError) {
            firstError.focus();
          }

        }

      }
    );

  }



  /* ===============================
     REMOVE ERROR WHILE TYPING
  =============================== */

  const formInputs =
    document.querySelectorAll(
      ".contact-form input, .contact-form textarea"
    );


  formInputs.forEach(function (input) {

    input.addEventListener(
      "input",
      function () {

        const formGroup =
          input.closest(".form-group");

        if (
          formGroup &&
          formGroup.classList.contains(
            "has-error"
          )
        ) {

          formGroup.classList.remove(
            "has-error"
          );

          const error =
            formGroup.querySelector(
              ".form-error"
            );

          if (error) {
            error.textContent = "";
          }

        }

      }
    );

  });

});


