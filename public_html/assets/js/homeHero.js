   document.querySelectorAll("[data-carousel]").forEach(setupCarousel);

    function setupCarousel(carouselEl) {
        const wrapper = carouselEl.querySelector(".carousel-wrapper");

        // Locate controls inside the same section
        const section = carouselEl.closest(".section");
        const prevBtn = section.querySelector(".carousel-prev");
        const nextBtn = section.querySelector(".carousel-next");

        const originalSlides = Array.from(wrapper.children);

        // Clone for looping
        const firstClone = originalSlides[0].cloneNode(true);
        const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

        wrapper.insertBefore(lastClone, originalSlides[0]);
        wrapper.appendChild(firstClone);

        const slides = Array.from(wrapper.children);

        let currentIndex = 1; // First REAL slide
        let slideWidth = carouselEl.getBoundingClientRect().width;
        let isMoving = false;

        // Initial position
        wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        // Responsive update
        function updateSlideWidth() {
            slideWidth = carouselEl.getBoundingClientRect().width;
            wrapper.style.transition = "none";
            wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
        window.addEventListener("resize", updateSlideWidth);

        function moveTo(index) {
            if (isMoving) return; 
            isMoving = true;

            wrapper.style.transition = "transform 0.4s ease";
            wrapper.style.transform = `translateX(-${slideWidth * index}px)`;

            wrapper.addEventListener(
                "transitionend",
                () => {
                    // If at clone at end → jump back to actual first
                    if (slides[index] === firstClone) {
                        wrapper.style.transition = "none";
                        currentIndex = 1;
                        wrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                    }
                    // If at clone at beginning → jump back to actual last
                    else if (slides[index] === lastClone) {
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