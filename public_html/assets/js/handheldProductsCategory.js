/* ==========================================================
   HANDHELD PRODUCT GRID + SUMMARY + HERO CAROUSEL
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     SHARED HELPERS
     ========================================================== */
  function isMobile() {
    return window.innerWidth < 768;
  }

  /* ==========================================================
     HANDHELD PRODUCT GRID TOGGLE
     ========================================================== */
  const section = document.querySelector(".handheld");
  if (section) {
    const productGrid = section.querySelector(".handheld__carousel.handheld__grid");
    const toggleBtn = section.querySelector(".js-handheld-toggle");

    if (productGrid && toggleBtn) {
      const toggleLabel = toggleBtn.querySelector("span");
      const items = Array.from(productGrid.querySelectorAll(".handheld__item"));
      const summaries = document.querySelectorAll(".handheld-productSummary");

      let isExpanded = false;

      const ITEM_COUNTS = {
        desktop: { collapsed: 6, expanded: 8 },
        mobile: { collapsed: 6, expanded: 8 }
      };

      function setVisibleItems(count) {
        items.forEach((item, index) => {
          item.style.display = index < count ? "block" : "none";
        });
      }

      function applyGridColumns() {
        productGrid.style.gridTemplateColumns = isMobile()
          ? "repeat(2, 1fr)"
          : isExpanded
            ? "repeat(2, 1fr)"
            : "repeat(3, 1fr)";
      }

      function applyCollapsed() {
        isExpanded = false;
        toggleLabel.textContent = "View all";
        applyGridColumns();
        setVisibleItems(ITEM_COUNTS[isMobile() ? "mobile" : "desktop"].collapsed);
      }

      function applyExpanded() {
        isExpanded = true;
        toggleLabel.textContent = "View less";
        applyGridColumns();
        setVisibleItems(ITEM_COUNTS[isMobile() ? "mobile" : "desktop"].expanded);
      }

      toggleBtn.addEventListener("click", () => {
        isExpanded ? applyCollapsed() : applyExpanded();
      });

      /* ==========================================================
         SUMMARY TRUNCATION
         ========================================================== */
      function truncateSummaries() {
        summaries.forEach(el => {
          const fullText =
            el.getAttribute("data-fulltext") || el.textContent.trim();

          if (!el.hasAttribute("data-fulltext")) {
            el.setAttribute("data-fulltext", fullText);
          }

          const maxLength = isMobile() ? 18 : 32;
          el.textContent =
            fullText.length > maxLength
              ? fullText.slice(0, maxLength) + "…"
              : fullText;
        });
      }

      window.addEventListener("resize", () => {
        isExpanded ? applyExpanded() : applyCollapsed();
        truncateSummaries();
      });

      applyCollapsed();
      truncateSummaries();
    }
  }

  /* ==========================================================
     HANDHELD HERO CAROUSEL (BANNER SLIDES)
     ========================================================== */
  document
    .querySelectorAll("[data-carousel]")
    .forEach(initHandheldCarousel);

  function initHandheldCarousel(carouselEl) {
    const track = carouselEl.querySelector(".handheld__track");
    if (!track) return;

    const section = carouselEl.closest(".handheld");
    if (!section) return;

    const prevBtn = section.querySelector(".js-handheld-prev");
    const nextBtn = section.querySelector(".js-handheld-next");
    if (!prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    if (slides.length < 2) return;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.insertBefore(lastClone, slides[0]);
    track.appendChild(firstClone);

    const allSlides = Array.from(track.children);

    let index = 1;
    let slideWidth = carouselEl.offsetWidth;
    let isAnimating = false;
    let autoSlideInterval;

    const slideDuration = 1200;

    function toggleArrows(enable) {
      prevBtn.toggleAttribute("disabled", !enable);
      nextBtn.toggleAttribute("disabled", !enable);
    }

    if (2 === 1) {
      toggleArrows(true);
    } else {
      toggleArrows(false);
      startAutoSlide();
    }

    function setPosition(noAnim = false) {
      track.style.transition = noAnim
        ? "none"
        : `transform ${slideDuration}ms ease`;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }

    function updateWidth() {
      slideWidth = carouselEl.offsetWidth;
      setPosition(true);
    }

    window.addEventListener("resize", updateWidth);
    setPosition(true);

    function moveTo(newIndex) {
      if (isAnimating) return;
      isAnimating = true;
      index = newIndex;
      setPosition();

      track.addEventListener(
        "transitionend",
        () => {
          if (allSlides[index] === firstClone) {
            index = 1;
            setPosition(true);
          }
          if (allSlides[index] === lastClone) {
            index = slides.length;
            setPosition(true);
          }
          isAnimating = false;
        },
        { once: true }
      );
    }

    prevBtn.addEventListener("click", () => moveTo(index - 1));
    nextBtn.addEventListener("click", () => moveTo(index + 1));

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        moveTo(index + 1);
      }, 4000);
    }

    carouselEl.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)
    );
    carouselEl.addEventListener("mouseleave", startAutoSlide);
  }
});
