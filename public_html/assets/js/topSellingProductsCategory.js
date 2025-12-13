    //TOP SELLING PRODUCTS CATEGORY JS FILE
    

    
        document.addEventListener("DOMContentLoaded", () => {
        const wrapper = document.querySelector(".carouselwithProducts-wrapper");
        const products = document.querySelectorAll(".featured-product");

        const leftArrow = document.querySelector(".leftArrow");
        const rightArrow = document.querySelector(".rightArrow");

        let index = 0;

        // Width of ONE product card (including the column gap)
        function getSlideWidth() {
            const card = products[0];
            const style = window.getComputedStyle(wrapper);
            const gap = parseFloat(style.columnGap);
            return card.offsetWidth + gap;
        }

        function updateCarousel() {
            const offset = -(index * getSlideWidth());
            wrapper.style.transform = `translateX(${offset}px)`;
            wrapper.style.transition = "transform 0.5s ease";
        }

        function getVisibleItems() {
            return window.innerWidth <= 550 ? 1 : 2;
        }


        rightArrow.addEventListener("click", () => {
            if (index < products.length - getVisibleItems()) {
                index++;         
                updateCarousel();
            }
        });


        leftArrow.addEventListener("click", () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });

        window.addEventListener("resize", updateCarousel);
    });


    //  Truncate Product Summary On Top Category        
    //  Truncate Characters in product summary top categories← set your character limit here
    
        document.addEventListener("DOMContentLoaded", () => {
            const maxChars = 55; // ← set your character limit here
            const summaries = document.querySelectorAll(".product-summary");

            summaries.forEach(summary => {
                const original = summary.textContent.trim();

                if (original.length > maxChars) {
                    summary.textContent = original.substring(0, maxChars).trim() + "…";
                }
            });
        });