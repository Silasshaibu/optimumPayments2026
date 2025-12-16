// Do not delete this file — paired with Supplies category page
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PRODUCT SUMMARY TRIM
    ========================== */
    const summaries = document.querySelectorAll("p.productSummary");

    summaries.forEach(p => {
        const text = p.textContent.trim();
        if (text.length > 25) {
            p.textContent = text.substring(0, 25) + "...";
        }
    });

    /* =========================
       SUPPLIES HERO CAROUSEL
    ========================== */
    const suppliesSection = document.querySelector(
        ".section.topProducts-carousel-header"
    );

    if (!suppliesSection) return;

    const carouselEl = suppliesSection.querySelector("[data-carousel]");
    if (!carouselEl) return;

    setupCarousel(carouselEl, suppliesSection);
});

function setupCarousel(carouselEl, section) {
    const wrapper = carouselEl.querySelector(".carousel-wrapper");
    const prevBtn = section.querySelector(".carousel-prev");
    const nextBtn = section.querySelector(".carousel-next");

    if (!wrapper || !prevBtn || !nextBtn) return;

    const originalSlides = Array.from(wrapper.children);

    // Clone slides for infinite loop
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    wrapper.insertBefore(lastClone, originalSlides[0]);
    wrapper.appendChild(firstClone);

    const slides = Array.from(wrapper.children);

    let currentIndex = 1; // first real slide
    let slideWidth = carouselEl.getBoundingClientRect().width;
    let isMoving = false;

    // Initial position
    wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    // Responsive resize
    window.addEventListener("resize", () => {
        slideWidth = carouselEl.getBoundingClientRect().width;
        wrapper.style.transition = "none";
        wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    });

    function moveTo(index) {
        if (isMoving) return;
        isMoving = true;

        wrapper.style.transition = "transform 0.4s ease";
        wrapper.style.transform = `translateX(-${slideWidth * index}px)`;

        wrapper.addEventListener(
            "transitionend",
            () => {
                if (slides[index] === firstClone) {
                    wrapper.style.transition = "none";
                    currentIndex = 1;
                    wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                } else if (slides[index] === lastClone) {
                    wrapper.style.transition = "none";
                    currentIndex = originalSlides.length;
                    wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                } else {
                    currentIndex = index;
                }
                isMoving = false;
            },
            { once: true }
        );
    }

    prevBtn.addEventListener("click", () => moveTo(currentIndex - 1));
    nextBtn.addEventListener("click", () => moveTo(currentIndex + 1));
}
