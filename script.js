/* =========================================================
   SSP STRUCTOVA
   JAVASCRIPT
========================================================= */


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections = document.querySelectorAll(
    "main[id], section[id]"
);

const navLinks = document.querySelectorAll(
    ".navbar-nav .nav-link"
);


window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});



/* =========================================================
   MOBILE MENU CLOSE
========================================================= */

const mobileLinks =
    document.querySelectorAll(
        ".navbar-nav .nav-link"
    );


mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const navbar =
            document.querySelector(".navbar-collapse");

        if (
            navbar.classList.contains("show")
        ) {

            const button =
                document.querySelector(
                    ".navbar-toggler"
                );

            button.click();

        }

    });

});

/* =========================================
   SSP STRUCTOVA - ABOUT JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const languageButtons =
        document.querySelectorAll(".language-btn");

    const languageElements =
        document.querySelectorAll("[data-lang]");


    /* =========================================
       LANGUAGE SWITCH
    ========================================= */

    languageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedLanguage =
                button.getAttribute("data-language");


            /* -------------------------
               Show / Hide Text
            ------------------------- */

            languageElements.forEach(function (element) {

                const elementLanguage =
                    element.getAttribute("data-lang");

                if (elementLanguage === selectedLanguage) {

                    element.classList.remove("d-none");

                } else {

                    element.classList.add("d-none");

                }

            });


            /* -------------------------
               Active Button
            ------------------------- */

            languageButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            /* -------------------------
               Save Language
            ------------------------- */

            localStorage.setItem(
                "sspLanguage",
                selectedLanguage
            );

        });

    });


    /* =========================================
       LOAD SAVED LANGUAGE
    ========================================= */

    const savedLanguage =
        localStorage.getItem("sspLanguage");


    if (savedLanguage) {

        const savedButton =
            document.querySelector(
                `.language-btn[data-language="${savedLanguage}"]`
            );

        if (savedButton) {

            savedButton.click();

        }

    } else {

        /*
         * English is default.
         * No action required.
         */

        languageElements.forEach(function (element) {

            if (element.getAttribute("data-lang") === "hi") {

                element.classList.add("d-none");

            }

        });

    }

});


// project section


/* =========================================
   SSP STRUCTOVA
   PROJECT FILTER JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons =
        document.querySelectorAll(".project-filter");

    const projectCards =
        document.querySelectorAll(".project-card");

    const projectCount =
        document.getElementById("projectCount");


    /* =====================================
       PROJECT FILTER
    ===================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter =
                button.getAttribute("data-filter");


            /* Remove active from all */

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* Add active */

            button.classList.add("active");


            let visibleCount = 0;


            /* Filter projects */

            projectCards.forEach(function (card) {

                const location =
                    card.getAttribute("data-location");


                const isVisible =
                    selectedFilter === "all" ||
                    selectedFilter === location;


                if (isVisible) {

                    card.classList.remove(
                        "project-hidden"
                    );


                    card.classList.remove(
                        "project-filter-show"
                    );


                    /*
                     * Re-trigger animation
                     */

                    void card.offsetWidth;


                    card.classList.add(
                        "project-filter-show"
                    );


                    visibleCount++;

                } else {

                    card.classList.add(
                        "project-hidden"
                    );

                }

            });


            /* Update counter */

            projectCount.textContent =
                visibleCount;

        });

    });


    /* =====================================
       INITIAL COUNT
    ===================================== */

    projectCount.textContent =
        projectCards.length;


    /* =====================================
       CARD ENTRANCE ANIMATION
    ===================================== */

    projectCards.forEach(function (card, index) {

        card.style.animationDelay =
            `${index * 70}ms`;

    });

});



// services page start  

/* =========================================
   SSP STRUCTOVA
   SERVICES JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards =
        document.querySelectorAll(".service-card");


    /* =====================================
       SCROLL REVEAL
    ====================================== */

    if ("IntersectionObserver" in window) {

        const serviceObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "service-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        serviceCards.forEach(function (card, index) {

            card.style.transitionDelay =
                `${index * 70}ms`;

            serviceObserver.observe(card);

        });

    }


    /* =====================================
       SERVICE CARD CLICK EFFECT
    ====================================== */

    serviceCards.forEach(function (card) {

        card.addEventListener("click", function () {

            serviceCards.forEach(function (item) {

                item.classList.remove(
                    "service-selected"
                );

            });

            card.classList.add(
                "service-selected"
            );

        });

    });

});



// vlog section

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("vlogSlider");

    const cards =
        document.querySelectorAll(".vlog-card");

    const nextButton =
        document.getElementById("vlogNext");

    const prevButton =
        document.getElementById("vlogPrev");

    const dotsContainer =
        document.getElementById("vlogDots");


    if (!slider || !cards.length) {
        return;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const AUTO_SLIDE_TIME = 2000;

    const TOTAL_RUNTIME = 30 * 60 * 1000;

    let currentIndex = 0;

    let autoSlide;

    let runtimeTimer;

    let isPaused = false;


    /* =====================================================
       CREATE DOTS
    ===================================================== */

    cards.forEach(function (card, index) {

        const dot =
            document.createElement("button");

        dot.className = "vlog-dot";

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            "Go to vlog " + (index + 1)
        );


        dot.addEventListener(
            "click",
            function () {

                currentIndex = index;

                moveToCard(currentIndex);

                restartAutoSlide();

            }
        );


        dotsContainer.appendChild(dot);

    });


    const dots =
        document.querySelectorAll(".vlog-dot");


    /* =====================================================
       GET CARD WIDTH
    ===================================================== */

    function getCardStep() {

        const card = cards[0];

        const cardWidth =
            card.offsetWidth;

        const sliderStyle =
            window.getComputedStyle(slider);

        const gap =
            parseFloat(sliderStyle.gap) || 0;

        return cardWidth + gap;
    }


    /* =====================================================
       MOVE TO CARD
    ===================================================== */

    function moveToCard(index) {

        if (index >= cards.length) {

            currentIndex = 0;

        }

        if (index < 0) {

            currentIndex =
                cards.length - 1;

        }


        const step =
            getCardStep();


        slider.scrollTo({

            left:
                currentIndex * step,

            behavior: "smooth"

        });


        updateDots();

    }


    /* =====================================================
       UPDATE DOTS
    ===================================================== */

    function updateDots() {

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextSlide() {

        currentIndex++;

        if (currentIndex >= cards.length) {

            currentIndex = 0;

        }

        moveToCard(currentIndex);

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousSlide() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                cards.length - 1;

        }

        moveToCard(currentIndex);

    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    nextButton.addEventListener(
        "click",
        function () {

            nextSlide();

            restartAutoSlide();

        }
    );


    prevButton.addEventListener(
        "click",
        function () {

            previousSlide();

            restartAutoSlide();

        }
    );


    /* =====================================================
       AUTO SLIDE
       Every 2 Seconds
    ===================================================== */

    function startAutoSlide() {

        clearInterval(autoSlide);


        autoSlide =
            setInterval(function () {

                if (!isPaused) {

                    nextSlide();

                }

            }, AUTO_SLIDE_TIME);

    }


    /* =====================================================
       RESTART AUTO SLIDE
    ===================================================== */

    function restartAutoSlide() {

        startAutoSlide();

    }


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    slider.addEventListener(
        "mouseenter",
        function () {

            isPaused = true;

        }
    );


    slider.addEventListener(
        "mouseleave",
        function () {

            isPaused = false;

        }
    );


    /* =====================================================
       30 MINUTE RUNTIME
    ===================================================== */

    runtimeTimer =
        setTimeout(function () {

            clearInterval(autoSlide);

            isPaused = true;

        }, TOTAL_RUNTIME);


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            moveToCard(currentIndex);

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateDots();

    startAutoSlide();

});




// team js 

document.addEventListener("DOMContentLoaded", function () {

    const teamCards =
        document.querySelectorAll(".team-card");


    if (!teamCards.length) {
        return;
    }


    /* =====================================================
       SCROLL ANIMATION
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const teamObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "team-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        teamCards.forEach(function (card, index) {

            card.style.transitionDelay =
                `${index * 100}ms`;

            teamObserver.observe(card);

        });

    } else {

        teamCards.forEach(function (card) {

            card.classList.add(
                "team-visible"
            );

        });

    }


    /* =====================================================
       SOCIAL ICON ACCESSIBILITY
    ===================================================== */

    const socialLinks =
        document.querySelectorAll(
            ".team-social a"
        );


    socialLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    link.getAttribute("href");

                if (href === "#") {

                    event.preventDefault();

                }

            }
        );

    });

});



// footer section

/* =========================================================
   FOOTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------
       CURRENT YEAR
    ----------------------------------------- */

    const footerYear =
        document.getElementById("footerYear");

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }


    /* -----------------------------------------
       BACK TO TOP
    ----------------------------------------- */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* -----------------------------------------
       NEWSLETTER
    ----------------------------------------- */

    const subscribeForm =
        document.getElementById(
            "footerSubscribe"
        );

    const emailInput =
        document.getElementById(
            "footerEmail"
        );


    if (subscribeForm && emailInput) {

        subscribeForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    emailInput.value.trim();


                if (!email) {

                    emailInput.focus();

                    return;

                }


                if (!email.includes("@")) {

                    emailInput.focus();

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                const button =
                    subscribeForm.querySelector(
                        "button"
                    );


                button.innerHTML =
                    '<i class="bi bi-check-circle-fill"></i> Subscribed';


                button.style.background =
                    "#22c55e";


                emailInput.value = "";


                setTimeout(function () {

                    button.innerHTML =
                        'Subscribe <i class="bi bi-send-fill"></i>';

                    button.style.background =
                        "";

                }, 3000);

            }
        );

    }


    /* -----------------------------------------
       SOCIAL LINKS
    ----------------------------------------- */

    const socialLinks =
        document.querySelectorAll(
            ".footer-socials a"
        );


    socialLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                if (
                    link.getAttribute("href") === "#"
                ) {

                    event.preventDefault();

                }

            }
        );

    });


    /* -----------------------------------------
       FOOTER REVEAL
    ----------------------------------------- */

    const footer =
        document.querySelector(".site-footer");


    if (
        footer &&
        "IntersectionObserver" in window
    ) {

        const footerObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "footer-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        footerObserver.observe(footer);

    }

});









// from js start 







/* =========================================================
   START YOUR PROJECT FORM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("startProjectForm");

    const successBox =
        document.getElementById("projectSuccess");

    const newProjectBtn =
        document.getElementById("newProjectBtn");

    const progress =
        document.getElementById("formProgress");

    const message =
        document.getElementById("projectMessage");

    const messageCount =
        document.getElementById("messageCount");


    /* =====================================================
       YOUR BUSINESS WHATSAPP NUMBER
       
       IMPORTANT:
       Replace this with your actual WhatsApp Business
       number including country code.

       Example:
       919876543210

       Do NOT use +, spaces or brackets.
    ===================================================== */

    const BUSINESS_WHATSAPP =
        "8226801720";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const clientName =
        document.getElementById("clientName");

    const clientEmail =
        document.getElementById("clientEmail");

    const clientMobile =
        document.getElementById("clientMobile");

    const clientState =
        document.getElementById("clientState");

    const district =
        document.getElementById("district");

    const projectLocation =
        document.getElementById("projectLocation");

    const projectType =
        document.getElementById("projectType");

    const requiredService =
        document.getElementById("requiredService");

    const projectArea =
        document.getElementById("projectArea");

    const budget =
        document.getElementById("budget");

    const startDate =
        document.getElementById("startDate");

    const timeline =
        document.getElementById("timeline");

    const agreement =
        document.getElementById("formAgreement");


    /* =====================================================
       DATE MIN = TODAY
    ===================================================== */

    if (startDate) {

        const today =
            new Date().toISOString().split("T")[0];

        startDate.min = today;

    }


    /* =====================================================
       MESSAGE CHARACTER COUNT
    ===================================================== */

    if (message && messageCount) {

        message.addEventListener(
            "input",
            function () {

                messageCount.textContent =
                    message.value.length;

            }
        );

    }


    /* =====================================================
       MOBILE NUMBER
       ONLY NUMBERS
    ===================================================== */

    if (clientMobile) {

        clientMobile.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

            }
        );

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        const fields = [
            clientName,
            clientEmail,
            clientMobile,
            district,
            projectLocation,
            projectType,
            requiredService,
            projectArea,
            budget,
            startDate,
            timeline,
            message
        ];

        let filled = 0;

        fields.forEach(function (field) {

            if (
                field &&
                field.value.trim() !== ""
            ) {

                filled++;

            }

        });


        const percentage =
            Math.round(
                (filled / fields.length) * 100
            );


        if (progress) {

            progress.textContent =
                percentage + "%";

        }

    }


    const allInputs =
        form.querySelectorAll(
            "input, select, textarea"
        );


    allInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            updateProgress
        );

        input.addEventListener(
            "change",
            updateProgress
        );

    });


    /* =====================================================
       ERROR
    ===================================================== */

    function showError(
        field,
        messageText
    ) {

        const group =
            field.closest(".form-group");

        if (!group) return;

        group.classList.add(
            "form-invalid"
        );

        const error =
            group.querySelector(
                ".field-error"
            );

        if (error) {

            error.textContent =
                messageText;

        }

    }


    function clearErrors() {

        const groups =
            form.querySelectorAll(
                ".form-group"
            );

        groups.forEach(function (group) {

            group.classList.remove(
                "form-invalid"
            );

            const error =
                group.querySelector(
                    ".field-error"
                );

            if (error) {

                error.textContent = "";

            }

        });

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearErrors();


            let valid = true;


            /* CLIENT NAME */

            if (
                clientName.value.trim().length < 2
            ) {

                showError(
                    clientName,
                    "Please enter your name."
                );

                valid = false;

            }


            /* EMAIL */

            if (
                !validEmail(
                    clientEmail.value.trim()
                )
            ) {

                showError(
                    clientEmail,
                    "Please enter a valid email."
                );

                valid = false;

            }


            /* MOBILE */

            if (
                !/^[6-9]\d{9}$/
                    .test(
                        clientMobile.value.trim()
                    )
            ) {

                showError(
                    clientMobile,
                    "Enter a valid 10-digit mobile number."
                );

                valid = false;

            }


            /* DISTRICT */

            if (!district.value) {

                showError(
                    district,
                    "Please select your district."
                );

                valid = false;

            }


            /* LOCATION */

            if (
                projectLocation.value.trim()
                    .length < 2
            ) {

                showError(
                    projectLocation,
                    "Please enter project location."
                );

                valid = false;

            }


            /* PROJECT TYPE */

            if (!projectType.value) {

                showError(
                    projectType,
                    "Please select project type."
                );

                valid = false;

            }


            /* SERVICE */

            if (!requiredService.value) {

                showError(
                    requiredService,
                    "Please select a service."
                );

                valid = false;

            }


            /* AGREEMENT */

            if (!agreement.checked) {

                alert(
                    "Please confirm the information provided."
                );

                valid = false;

            }


            /* STOP */

            if (!valid) {

                const firstInvalid =
                    form.querySelector(
                        ".form-invalid input, .form-invalid select"
                    );

                if (firstInvalid) {

                    firstInvalid.focus();

                }

                return;

            }


            /* =================================================
               CONTACT METHOD
            ================================================= */

            const contactMethod =
                document.querySelector(
                    'input[name="contactMethod"]:checked'
                );


            const selectedContact =
                contactMethod
                    ? contactMethod.value
                    : "WhatsApp";


            /* =================================================
               DATE FORMAT
            ================================================= */

            let formattedDate =
                "Not specified";


            if (startDate.value) {

                const date =
                    new Date(
                        startDate.value
                    );

                formattedDate =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }


            /* =================================================
               WHATSAPP MESSAGE
            ================================================= */

            const whatsappMessage = `

🏗️ *NEW PROJECT ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━

👋 *Welcome to SSP STRUCTOVA!*

Thank you for choosing us for your project.
We have received a new project enquiry.

*CLIENT DETAILS*
━━━━━━━━━━━━━━━━━━━━━━
👤 Client Name: ${clientName.value.trim()}
📧 Email: ${clientEmail.value.trim()}
📱 Mobile: ${clientMobile.value.trim()}

*PROJECT LOCATION*
━━━━━━━━━━━━━━━━━━━━━━
📍 State: ${clientState.value}
📍 District: ${district.value}
📌 Project Location: ${projectLocation.value.trim()}

*PROJECT DETAILS*
━━━━━━━━━━━━━━━━━━━━━━
🏢 Project Type: ${projectType.value}
🛠️ Required Service: ${requiredService.value}
📐 Area / Quantity: ${projectArea.value.trim() || "Not specified"}
💰 Estimated Budget: ${budget.value || "Not specified"}

*PROJECT TIMELINE*
━━━━━━━━━━━━━━━━━━━━━━
📅 Expected Start: ${formattedDate}
⏱️ Expected Timeline: ${timeline.value || "Not specified"}

*CONTACT PREFERENCE*
━━━━━━━━━━━━━━━━━━━━━━
📞 Preferred Contact: ${selectedContact}

*ADDITIONAL REQUIREMENT*
━━━━━━━━━━━━━━━━━━━━━━
${message.value.trim() || "No additional requirement provided."}

━━━━━━━━━━━━━━━━━━━━━━
🏗️ *SSP STRUCTOVA*
*Construction • Design • Execution*

Thank you for trusting SSP STRUCTOVA.
We look forward to discussing your project
and building something great together. 🤝

━━━━━━━━━━━━━━━━━━━━━━
Generated from SSP STRUCTOVA Website
            `.trim();


            /* =================================================
               WHATSAPP URL
            ================================================= */

            const whatsappURL =
                "https://wa.me/" +
                BUSINESS_WHATSAPP +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* =================================================
               BUTTON LOADING
            ================================================= */

            const submitButton =
                document.getElementById(
                    "projectSubmitBtn"
                );


            const originalButton =
                submitButton.innerHTML;


            submitButton.disabled = true;


            submitButton.innerHTML =
                `
                <span>Preparing Enquiry...</span>
                <i class="bi bi-hourglass-split"></i>
                `;


            /* =================================================
               SUCCESS
            ================================================= */

            setTimeout(function () {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButton;


                successBox.classList.add(
                    "show"
                );


                successBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                /*
                 * Open WhatsApp
                 */

                window.open(
                    whatsappURL,
                    "_blank"
                );


            }, 700);

        }
    );


    /* =====================================================
       NEW ENQUIRY
    ===================================================== */

    if (newProjectBtn) {

        newProjectBtn.addEventListener(
            "click",
            function () {

                form.reset();

                clearErrors();

                messageCount.textContent =
                    "0";

                progress.textContent =
                    "0%";

                successBox.classList.remove(
                    "show"
                );


                form.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    updateProgress();

});


