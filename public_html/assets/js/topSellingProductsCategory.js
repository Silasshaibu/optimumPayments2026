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