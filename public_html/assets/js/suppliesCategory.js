        // Do not delete this file its paired with supplie category.

        document.addEventListener("DOMContentLoaded", () => {
        const summaries = document.querySelectorAll("p.productSummary");

        summaries.forEach(p => {
            const text = p.textContent.trim();
            if (text.length > 25) {
            p.textContent = text.substring(0, 25) + "...";
            }
        });
        });