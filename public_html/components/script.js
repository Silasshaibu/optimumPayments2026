const toggle = document.getElementById("dropdownToggle");
const body = document.getElementById("dropdownBody");

toggle.addEventListener("click", () => {
    body.style.display = body.style.display === "block" ? "none" : "block";
    toggle.classList.toggle("dropdown-open");
});
