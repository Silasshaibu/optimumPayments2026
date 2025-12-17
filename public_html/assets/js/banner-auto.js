

(function bannerAutoFadeBezier() {

  const AUTO_INTERVAL = 5000;
  const FADE_DURATION = 900; // MUST match CSS opacity duration

  document.querySelectorAll(".banner-carousel").forEach(carousel => {

    const wrapper = carousel.querySelector(".banner-wrapper");
    const slides  = wrapper ? Array.from(wrapper.children) : [];

    if (!wrapper || slides.length < 2) return;

    let index = 0;
    let width = slides[0].offsetWidth;
    let timer = null;

    function setPosition(noAnim = false) {
      wrapper.style.transition = noAnim
        ? "none"
        : "transform 0.45s ease-in-out, opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)";

      wrapper.style.transform = `translateX(-${index * width}px)`;
    }

    function fadeReset() {
      wrapper.classList.add("is-fading");

      setTimeout(() => {
        index = 0;
        setPosition(true);

        requestAnimationFrame(() => {
          wrapper.classList.remove("is-fading");
        });

      }, FADE_DURATION);
    }

    function nextSlide() {
      index++;

      if (index >= slides.length) {
        fadeReset();
        return;
      }

      setPosition();
    }

    function startAuto() {
      timer = setInterval(nextSlide, AUTO_INTERVAL);
    }

    function stopAuto() {
      clearInterval(timer);
    }

    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);

    window.addEventListener("resize", () => {
      width = slides[0].offsetWidth;
      setPosition(true);
    });

    setPosition(true);
    startAuto();

  });

})();