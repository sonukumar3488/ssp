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


