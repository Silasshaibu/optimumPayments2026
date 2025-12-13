// HANDHELD PRODUCTS CATEGORY SCRIPT

        document.addEventListener("DOMContentLoaded", () => {
        const wrapper = document.querySelector(".carouselwithProducts-wrapper");
        const carouselWindow = document.querySelector(".carouselWindow");
        const section = document.querySelector(".home-default-section");
        const viewAllBtn = document.getElementById("viewAllBtn");

        if (!wrapper || !carouselWindow || !section || !viewAllBtn) return;

        let expanded = false;

        viewAllBtn.addEventListener("click", () => {
            expanded = !expanded;

            // Toggle grid styles
            wrapper.classList.toggle("is-grid", expanded);
            section.classList.toggle("is-grid", expanded);

            viewAllBtn.childNodes[0].nodeValue = expanded ? "View less" : "View all";
            viewAllBtn.setAttribute("aria-expanded", expanded);

            if (expanded) {
                /* ✅ GRID MODE (OUT OF CAROUSEL) */
                carouselWindow.style.height = "auto";
                wrapper.style.position = "relative";   // 🔑 KEY FIX
                wrapper.style.transform = "none";
            } else {
                /* ✅ CAROUSEL MODE */
                carouselWindow.style.height = "";
                wrapper.style.position = "";           // restore default
                wrapper.style.transform = "translateX(0)";
            }
        });
    });

   
    // Truncates Product Summary Text on HandHeld Grid Section
    document.addEventListener("DOMContentLoaded", () => {
            const summaries = document.querySelectorAll("p.productSummary");
            summaries.forEach(p => {
                const text = p.textContent.trim();
                if (text.length > 25) {
                    p.textContent = text.substring(0, 25) + "...";
                }
            });
    });