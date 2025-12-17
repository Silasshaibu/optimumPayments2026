  (function initBannerCarousel() {

  document.querySelectorAll(".banner-carousel").forEach(carousel => {

    const wrapper = carousel.querySelector(".banner-wrapper");
    const slides  = Array.from(wrapper.children);
    const prevBtn = carousel.querySelector(".banner-prev");
    const nextBtn = carousel.querySelector(".banner-next");

    if (slides.length < 2) return;

    const firstClone = slides[0].cloneNode(true);
    const lastClone  = slides[slides.length - 1].cloneNode(true);

    wrapper.prepend(lastClone);
    wrapper.append(firstClone);

    let index = 1;
    let width = slides[0].offsetWidth;
    let isAnimating = false;

    function setPosition(noAnim = false) {
      wrapper.style.transition = noAnim ? "none" : "transform 0.45s ease-in-out";
      wrapper.style.transform = `translateX(-${index * width}px)`;
    }

    function moveTo(newIndex) {
      if (isAnimating) return;
      isAnimating = true;

      index = newIndex;
      setPosition();

      wrapper.addEventListener("transitionend", () => {

        if (index === 0) {
          index = slides.length;
          setPosition(true);
        }

        if (index === slides.length + 1) {
          index = 1;
          setPosition(true);
        }

        isAnimating = false;
      }, { once: true });
    }

    nextBtn?.addEventListener("click", () => moveTo(index + 1));
    prevBtn?.addEventListener("click", () => moveTo(index - 1));

    window.addEventListener("resize", () => {
      width = slides[0].offsetWidth;
      setPosition(true);
    });

    setPosition(true);
  });

})();