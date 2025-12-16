document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       ELEMENTS
    =============================== */

    const topCategorySection = document.querySelector(".topCategory-section");
    if (!topCategorySection) return;

    const topCategoryWrapper =
        topCategorySection.querySelector(".topCategory-wrapper");

    const topCategoryProducts =
        topCategorySection.querySelectorAll(".topCategory-product");

    const topCategoryLeftArrow =
        topCategorySection.querySelector(".topCategory-leftArrow");

    const topCategoryRightArrow =
        topCategorySection.querySelector(".topCategory-rightArrow");

    const topCategoryViewAllBtn =
        document.getElementById("topCategoryViewAll");


    if (!topCategoryWrapper || !topCategoryProducts.length || !topCategoryViewAllBtn) {
        return;
    }

    const topCategoryViewAllLabel =
        topCategoryViewAllBtn.querySelector(".topCategory-viewAllLabel");

    let currentIndex = 0;

    function updateArrowState() {
    const visibleItems = getVisibleItems();
    const maxIndex = topCategoryProducts.length - visibleItems;

    const leftBtn = topCategoryLeftArrow?.parentElement;
    const rightBtn = topCategoryRightArrow?.parentElement;

    // If grid mode → lock both arrows
    if (topCategorySection.classList.contains("is-grid")) {
        leftBtn?.classList.add("is-disabled");
        rightBtn?.classList.add("is-disabled");
        return;
    }

    // Lock left arrow at start
    if (currentIndex <= 0) {
        leftBtn?.classList.add("is-disabled");
    } else {
        leftBtn?.classList.remove("is-disabled");
    }

    // Lock right arrow at end
    if (currentIndex >= maxIndex) {
        rightBtn?.classList.add("is-disabled");
    } else {
        rightBtn?.classList.remove("is-disabled");
    }
}

function loadProductBackground(product) {
    if (product.dataset.loaded === "true") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const { bgDesktop, bgMobile } = product.dataset;

    product.style.backgroundImage =
        `url(${isMobile ? bgMobile : bgDesktop})`;

    product.dataset.loaded = "true";
}


    /* ===============================
       CAROUSEL HELPERS
    =============================== */

    function getSlideWidth() {
        const firstCard = topCategoryProducts[0];
        const gap =
            parseFloat(getComputedStyle(topCategoryWrapper).columnGap) || 16;

        return firstCard.offsetWidth + gap;
    }

    function getVisibleItems() {
        return window.innerWidth <= 550 ? 1 : 2;
    }

    function updateTopCategoryCarousel() {
        // 🚫 Do nothing in grid mode
        if (topCategorySection.classList.contains("is-grid")) return;

        const maxIndex =
            topCategoryProducts.length - getVisibleItems();

        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        topCategoryWrapper.style.transform =
            `translateX(-${currentIndex * getSlideWidth()}px)`;

        topCategoryWrapper.style.transition = "transform 0.5s ease";
        updateArrowState(); // 🔑
    }

    /* ===============================
       CAROUSEL CONTROLS
    =============================== */

    topCategoryRightArrow?.addEventListener("click", () => {
        currentIndex++;
        updateTopCategoryCarousel();
    });

    topCategoryLeftArrow?.addEventListener("click", () => {
        currentIndex--;
        updateTopCategoryCarousel();
    });

    window.addEventListener("resize", () => {
        updateTopCategoryCarousel();
        updateTopCategoryBackgrounds();
        updateArrowState(); // 🔑
    });

    /* ===============================
       VIEW ALL / VIEW LESS TOGGLE
    =============================== */

    topCategoryViewAllBtn.addEventListener("click", () => {
        const isGrid =
            topCategorySection.classList.toggle("is-grid");

        // Button always shows the NEXT action
        topCategoryViewAllLabel.textContent =
            isGrid ? "View less" : "View all";

        topCategoryViewAllBtn.setAttribute(
            "aria-expanded",
            isGrid.toString()
        );

        // Reset carousel when leaving grid
        if (!isGrid) {
            currentIndex = 0;
            updateTopCategoryCarousel();
        }
        updateArrowState(); // 🔑
    });

    /* ===============================
       RESPONSIVE BACKGROUND IMAGES
    =============================== */

    function updateTopCategoryBackgrounds() {
        const isMobile = window.innerWidth <= 768;

        topCategoryProducts.forEach(product => {
            const desktopBg = product.dataset.bgDesktop;
            const mobileBg = product.dataset.bgMobile;

            if (desktopBg && mobileBg) {
                product.style.backgroundImage =
                    `url(${isMobile ? mobileBg : desktopBg})`;
            }
        });
    }

    /* ===============================
       PRODUCT SUMMARY TRUNCATION
    =============================== */

    const maxChars = 55;
    const productSummaries =
        topCategorySection.querySelectorAll(".topCategory-productSummary");

    productSummaries.forEach(summary => {
        const text = summary.textContent.trim();
        if (text.length > maxChars) {
            summary.textContent = text.slice(0, maxChars) + "…";
        }
    });

    /* ===============================
       INIT
    =============================== */

    updateTopCategoryCarousel();
    updateTopCategoryBackgrounds();

});