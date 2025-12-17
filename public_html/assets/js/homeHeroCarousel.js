
/* ===============================
   HOME HERO CAROUSEL SCRIPT
   (FIXES 2 → 6 APPLIED)
   =============================== */

const root = document.querySelector(".homeHero-carousel");
const wrapper = root.querySelector(".carousel-wrapper");
const indicator = root.querySelector(".carousel-indicator");

let slides = root.querySelectorAll(".carousel-wrapper .slide");

let index = 1;
let interval = null;
const autoSlideTime = 3000;

/* ===============================
   CLONE FIRST & LAST SLIDES
   =============================== */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

wrapper.appendChild(firstClone);
wrapper.insertBefore(lastClone, slides[0]);

slides = root.querySelectorAll(".carousel-wrapper .slide");

let slideWidth = slides[0].clientWidth;
let dragThreshold = slideWidth * 0.2;

/* ===============================
   INITIAL POSITION
   =============================== */
wrapper.style.transform = `translateX(-${slideWidth * index}px)`;

/* ===============================
   INDICATOR SETUP
   =============================== */
const realSlideCount = slides.length - 2;

for (let i = 0; i < realSlideCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.index = i + 1;
    dot.setAttribute("role", "button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

    const progress = document.createElement("span");
    progress.classList.add("progress");

    dot.appendChild(progress);
    indicator.appendChild(dot);
}

function resetProgressBars() {
    const bars = indicator.querySelectorAll(".progress");
    bars.forEach(bar => {
        bar.style.animation = "none";
        bar.offsetHeight;
        bar.style.animation = "";
    });
}

function startProgressBar() {
    // if (window.innerWidth > 768) return;

    const active = indicator.querySelector(".dot.active .progress");
    if (!active) return;

    active.style.animationDuration = `${autoSlideTime}ms`;
}

function updateIndicator() {
    const dots = indicator.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));

    let activeIndex = index - 1;
    if (activeIndex < 0) activeIndex = realSlideCount - 1;
    if (activeIndex >= realSlideCount) activeIndex = 0;

    dots[activeIndex].classList.add("active");

    resetProgressBars();
    startProgressBar();
}

updateIndicator();

/* ===============================
   SLIDE CONTROLS
   =============================== */
function nextSlide() {
    if (index >= slides.length - 1) return;
    index++;
    moveToIndex();
}

function prevSlide() {
    if (index <= 0) return;
    index--;
    moveToIndex();
}

function moveToIndex() {
    wrapper.style.transition = "transform 0.5s ease-in-out";
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
    updateIndicator();
}

/* ===============================
   INFINITE LOOP FIX
   =============================== */
wrapper.addEventListener("transitionend", () => {
    if (!slides[index].classList.contains("clone")) return;

    wrapper.style.transition = "none";

    if (index === 0) {
        index = slides.length - 2;
    } else if (index === slides.length - 1) {
        index = 1;
    }

    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
    updateIndicator();
});

/* ===============================
   AUTOPLAY
   =============================== */
function startAutoSlide() {
    stopAutoSlide();
    interval = setInterval(nextSlide, autoSlideTime);
}

function stopAutoSlide() {
    clearInterval(interval);
}

wrapper.addEventListener("mouseenter", stopAutoSlide);
wrapper.addEventListener("mouseleave", startAutoSlide);

/* ===============================
   ARROWS
   =============================== */
root.querySelector(".next").addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

root.querySelector(".prev").addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

/* ===============================
   DOT CLICK NAVIGATION (FIX #2)
   =============================== */
indicator.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (!dot) return;

    stopAutoSlide();
    index = Number(dot.dataset.index);
    moveToIndex();
    startAutoSlide();
});

/* ===============================
   RESPONSIVE RESIZE (FIX #3)
   =============================== */
window.addEventListener("resize", () => {
    slideWidth = slides[0].clientWidth;
    dragThreshold = slideWidth * 0.2;
    wrapper.style.transition = "none";
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
    syncTranslate();
});

/* ===============================
   DRAG / SWIPE SUPPORT (FIX #4 & #6)
   =============================== */
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = null;

function getPositionX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function setSliderPosition() {
    wrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
    if (isDragging) {
        setSliderPosition();
        requestAnimationFrame(animation);
    }
}

function dragStart(e) {
    stopAutoSlide();
    isDragging = true;
    startX = getPositionX(e);
    prevTranslate = -slideWidth * index;
    wrapper.style.transition = "none";
    animationID = requestAnimationFrame(animation);
}

function dragMove(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startX;
}

function dragEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -dragThreshold) index++;
    else if (movedBy > dragThreshold) index--;

    index = Math.max(0, Math.min(index, slides.length - 1));

    moveToIndex();
    syncTranslate();
    startAutoSlide();
}

wrapper.addEventListener("mousedown", dragStart);
window.addEventListener("mousemove", dragMove);
window.addEventListener("mouseup", dragEnd);

wrapper.addEventListener("touchstart", dragStart, { passive: true });
wrapper.addEventListener("touchmove", dragMove, { passive: true });
wrapper.addEventListener("touchend", dragEnd);

/* Prevent image dragging */
wrapper.querySelectorAll("img").forEach(img => {
    img.addEventListener("dragstart", e => e.preventDefault());
});

/* ===============================
   SYNC HELPERS
   =============================== */
function syncTranslate() {
    prevTranslate = -slideWidth * index;
    currentTranslate = prevTranslate;
}

syncTranslate();

/* ===============================
   START
   =============================== */
startAutoSlide();