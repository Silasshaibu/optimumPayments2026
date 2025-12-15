 
    /* ==========================
    Active Nav Item
    ========================== */
    document.addEventListener("DOMContentLoaded", () => {
        const navItems = document.querySelectorAll(".one > li");

        navItems.forEach(item => {
            item.addEventListener("click", () => {
                navItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
            });
        });
    });

    
    /* ==========================
    Mobile Adjustments
    ========================== */
    function updateMobileView() {
        const shopBtn = document.getElementById("shopBtn");
        const searchLi = document.getElementById("searchSectionMain");
        const mobileSection = document.querySelector(".mobile-Section");
        const originalParent = document.querySelector(".searchAndstore-NavSection");

        if (!shopBtn) return;

        if (window.innerWidth <= 1200) {
            shopBtn.textContent = "Store";
            shopBtn.classList.remove("btn-primary");
            shopBtn.classList.add("btn-primary-sm");

            if (searchLi && mobileSection && !mobileSection.contains(searchLi)) {
                mobileSection.appendChild(searchLi);
            }
        } else {
            shopBtn.textContent = "Shop for Supplies";
            shopBtn.classList.remove("btn-primary-sm");
            shopBtn.classList.add("btn-primary");

            if (searchLi && originalParent && !originalParent.contains(searchLi)) {
                originalParent.appendChild(searchLi);
            }
        }
    }

    window.addEventListener("DOMContentLoaded", updateMobileView);
    window.addEventListener("resize", updateMobileView);
