(function initBannerCarousel() {

  const wrapper = document.querySelector("#banner-wrapper");
  const slides  = wrapper ? Array.from(wrapper.children) : [];
  const btnPrev = document.querySelector("#banner-prev");
  const btnNext = document.querySelector("#banner-next");

  if (!wrapper || slides.length < 2) return;

  /* ===============================
     CONFIG
  =============================== */
  const AUTO_AND_MANUAL = (1 === 1); // 🔁 change condition here
  const SLIDE_DURATION = 900;        // ms
  const AUTO_INTERVAL  = 6000;       // ms

  /* ===============================
     CLONE SLIDES FOR INFINITE LOOP
  =============================== */
  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[slides.length - 1].cloneNode(true);

  wrapper.insertBefore(lastClone, slides[0]);
  wrapper.appendChild(firstClone);

  const allSlides = Array.from(wrapper.children);

  /* ===============================
     STATE
  =============================== */
  let index = 1;
  let slideWidth = slides[0].clientWidth;
  let isAnimating = false;
  let autoTimer = null;

  /* ===============================
     CORE FUNCTIONS
  =============================== */
  function setPosition(noAnim = false) {
    wrapper.style.transition = noAnim
      ? "none"
      : `transform ${SLIDE_DURATION}ms ease-in-out`;

    wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function updateWidth() {
    slideWidth = slides[0].clientWidth;
    setPosition(true);
  }

  function moveTo(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    index = newIndex;
    setPosition();

    wrapper.addEventListener(
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

  /* ===============================
     MANUAL CONTROLS (ALWAYS ALLOWED)
  =============================== */
  btnNext?.addEventListener("click", () => moveTo(index + 1));
  btnPrev?.addEventListener("click", () => moveTo(index - 1));

  /* ===============================
     AUTO SLIDE (CONDITIONAL)
  =============================== */
  function startAuto() {
    autoTimer = setInterval(() => {
      moveTo(index + 1);
    }, AUTO_INTERVAL);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  if (AUTO_AND_MANUAL) {
    startAuto();

    // Pause on hover (desktop UX polish)
    wrapper.addEventListener("mouseenter", stopAuto);
    wrapper.addEventListener("mouseleave", startAuto);
  }

  /* ===============================
     INIT
  =============================== */
  window.addEventListener("resize", updateWidth);
  setPosition(true);

})();
