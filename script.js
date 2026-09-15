/* =========================================================
   DAUD MABONI — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const header = document.getElementById("siteHeader");

if (header) {
    window.addEventListener(
        "scroll",
        () => {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 35
            );
        },
        { passive: true }
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menu = document.getElementById("mobileMenu");
const mobileNav = document.getElementById("mobileNav");

if (menu && mobileNav) {

    menu.addEventListener("click", () => {

        const open =
            mobileNav.classList.toggle("open");

        menu.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );

        menu.classList.toggle(
            "active",
            open
        );

    });


    mobileNav
        .querySelectorAll("a")
        .forEach((a) => {

            a.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                menu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menu.classList.remove("active");

            });

        });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
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


    revealElements.forEach((el) => {

        observer.observe(el);

    });

} else {

    revealElements.forEach((el) => {

        el.classList.add("visible");

    });

}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const glow =
    document.querySelector(".cursor-glow");

if (glow) {

    window.addEventListener(
        "pointermove",
        (e) => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener("click", (e) => {

            const href =
                link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target =
                document.querySelector(href);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


/* =========================================================
   COPYRIGHT YEAR
   ========================================================= */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   HERO IMAGE SLIDESHOW
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const slideshow =
            document.querySelector(
                ".hero-slideshow"
            );

        if (!slideshow) {
            return;
        }


        const slides =
            Array.from(
                slideshow.querySelectorAll(
                    ".hero-slide"
                )
            );


        const progress =
            Array.from(
                slideshow.querySelectorAll(
                    ".hero-slide-progress span"
                )
            );


        /* -----------------------------------------
           SAFETY CHECK
           ----------------------------------------- */

        if (slides.length === 0) {
            return;
        }


        /* -----------------------------------------
           SETTINGS
           ----------------------------------------- */

        const SLIDE_DURATION = 5000;

        const TRANSITION_LOCK = 1000;


        /* -----------------------------------------
           STATE
           ----------------------------------------- */

        let currentSlide = 0;

        let slideshowTimer = null;

        let isTransitioning = false;


        /* -----------------------------------------
           SHOW SLIDE
           ----------------------------------------- */

        function showSlide(index) {

            if (isTransitioning) {
                return;
            }


            if (index >= slides.length) {
                index = 0;
            }


            if (index < 0) {
                index = slides.length - 1;
            }


            if (index === currentSlide) {
                updateProgress(index);
                return;
            }


            isTransitioning = true;


            slides.forEach(
                (slide, i) => {

                    slide.classList.toggle(
                        "active",
                        i === index
                    );

                }
            );


            updateProgress(index);


            currentSlide = index;


            setTimeout(() => {

                isTransitioning = false;

            }, TRANSITION_LOCK);

        }


        /* -----------------------------------------
           PROGRESS INDICATORS
           ----------------------------------------- */

        function updateProgress(index) {

            progress.forEach(
                (indicator, i) => {

                    indicator.classList.toggle(
                        "active",
                        i === index
                    );

                }
            );

        }


        /* -----------------------------------------
           NEXT SLIDE
           ----------------------------------------- */

        function nextSlide() {

            const next =
                currentSlide + 1;

            showSlide(next);

        }


        /* -----------------------------------------
           PREVIOUS SLIDE
           ----------------------------------------- */

        function previousSlide() {

            const previous =
                currentSlide - 1;

            showSlide(previous);

        }


        /* -----------------------------------------
           START AUTOPLAY
           ----------------------------------------- */

        function startSlideshow() {

            stopSlideshow();


            slideshowTimer =
                setInterval(
                    () => {

                        nextSlide();

                    },
                    SLIDE_DURATION
                );

        }


        /* -----------------------------------------
           STOP AUTOPLAY
           ----------------------------------------- */

        function stopSlideshow() {

            if (slideshowTimer) {

                clearInterval(
                    slideshowTimer
                );

                slideshowTimer = null;

            }

        }


        /* -----------------------------------------
           RESET AUTOPLAY
           ----------------------------------------- */

        function resetSlideshow() {

            startSlideshow();

        }


        /* -----------------------------------------
           PROGRESS CLICK
           ----------------------------------------- */

        progress.forEach(
            (indicator, index) => {

                indicator.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();

                        if (
                            index === currentSlide
                        ) {
                            return;
                        }

                        showSlide(index);

                        resetSlideshow();

                    }
                );

            }
        );


        /* -----------------------------------------
           CLICK IMAGE
           ----------------------------------------- */

        slideshow.addEventListener(
            "click",
            (event) => {

                /*
                 * If the user clicked a progress
                 * indicator, don't also advance.
                 */

                if (
                    event.target.closest(
                        ".hero-slide-progress"
                    )
                ) {
                    return;
                }


                nextSlide();

                resetSlideshow();

            }
        );


        /* -----------------------------------------
           KEYBOARD SUPPORT
           ----------------------------------------- */

        slideshow.setAttribute(
            "tabindex",
            "0"
        );


        slideshow.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    nextSlide();

                    resetSlideshow();

                }


                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    previousSlide();

                    resetSlideshow();

                }

            }
        );


        /* -----------------------------------------
           TOUCH SWIPE
           ----------------------------------------- */

        let touchStartX = 0;

        let touchEndX = 0;


        slideshow.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.touches[0].clientX;

            },
            {
                passive: true
            }
        );


        slideshow.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].clientX;


                const distance =
                    touchStartX - touchEndX;


                /*
                 * Ignore tiny movements.
                 */

                if (
                    Math.abs(distance) < 50
                ) {
                    return;
                }


                if (distance > 0) {

                    /* Swipe LEFT */

                    nextSlide();

                } else {

                    /* Swipe RIGHT */

                    previousSlide();

                }


                resetSlideshow();

            },
            {
                passive: true
            }
        );


        /* -----------------------------------------
           PAUSE WHEN HOVERING
           ----------------------------------------- */

        slideshow.addEventListener(
            "mouseenter",
            () => {

                stopSlideshow();

            }
        );


        slideshow.addEventListener(
            "mouseleave",
            () => {

                startSlideshow();

            }
        );


        /* -----------------------------------------
           PAUSE WHEN TAB IS HIDDEN
           ----------------------------------------- */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    stopSlideshow();

                } else {

                    startSlideshow();

                }

            }
        );


        /* -----------------------------------------
           REDUCED MOTION
           ----------------------------------------- */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        if (reducedMotion.matches) {

            stopSlideshow();

        } else {

            startSlideshow();

        }


        /* -----------------------------------------
           INITIAL STATE
           ----------------------------------------- */

        slides.forEach(
            (slide, index) => {

                slide.classList.toggle(
                    "active",
                    index === 0
                );

            }
        );


        updateProgress(0);

    }
);