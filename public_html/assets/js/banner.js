// (function initBannerCarousel() {

//   const bannerWrapper = document.querySelector("#banner-bannerWrapper");
//   const bannerSlides  = bannerWrapper ? Array.from(bannerWrapper.children) : [];
//   const btnPrevBanner = document.querySelector("#banner-prev");
//   const btnNextBanner = document.querySelector("#banner-next");

//   if (!bannerWrapper || bannerSlides.length < 2) return;

//   /* ===============================
//      CONFIG
//   =============================== */
//   const AUTO_AND_MANUAL = (1 === 1); // 🔁 change condition here
//   const SLIDE_DURATION = 900;        // ms
//   const AUTO_INTERVAL  = 6000;       // ms

//   /* ===============================
//      CLONE SLIDES FOR INFINITE LOOP
//   =============================== */
//   const firstClone = bannerSlides[0].cloneNode(true);
//   const lastClone  = bannerSlides[bannerSlides.length - 1].cloneNode(true);

//   bannerWrapper.insertBefore(lastClone, bannerSlides[0]);
//   bannerWrapper.appendChild(firstClone);

//   const allSlides = Array.from(bannerWrapper.children);

//   /* ===============================
//      STATE
//   =============================== */
//   let index = 1;
//   let slideWidth = bannerSlides[0].clientWidth;
//   let isAnimating = false;
//   let autoTimer = null;

//   /* ===============================
//      CORE FUNCTIONS
//   =============================== */
//   function setPosition(noAnim = false) {
//     bannerWrapper.style.transition = noAnim
//       ? "none"
//       : `transform ${SLIDE_DURATION}ms ease-in-out`;

//     bannerWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
//   }

//   function updateWidth() {
//     slideWidth = bannerSlides[0].clientWidth;
//     setPosition(true);
//   }

//   function moveTo(newIndex) {
//     if (isAnimating) return;
//     isAnimating = true;

//     index = newIndex;
//     setPosition();

//     bannerWrapper.addEventListener(
//       "transitionend",
//       () => {
//         if (allSlides[index] === firstClone) {
//           index = 1;
//           setPosition(true);
//         }

//         if (allSlides[index] === lastClone) {
//           index = bannerSlides.length;
//           setPosition(true);
//         }

//         isAnimating = false;
//       },
//       { once: true }
//     );
//   }

//   /* ===============================
//      MANUAL CONTROLS (ALWAYS ALLOWED)
//   =============================== */
//   btnNextBanner?.addEventListener("click", () => moveTo(index + 1));
//   btnPrevBanner?.addEventListener("click", () => moveTo(index - 1));

//   /* ===============================
//      AUTO SLIDE (CONDITIONAL)
//   =============================== */
//   function startAuto() {
//     autoTimer = setInterval(() => {
//       moveTo(index + 1);
//     }, AUTO_INTERVAL);
//   }

//   function stopAuto() {
//     clearInterval(autoTimer);
//   }

//   if (AUTO_AND_MANUAL) {
//     startAuto();

//     // Pause on hover (desktop UX polish)
//     bannerWrapper.addEventListener("mouseenter", stopAuto);
//     bannerWrapper.addEventListener("mouseleave", startAuto);
//   }

//   /* ===============================
//      INIT
//   =============================== */
//   window.addEventListener("resize", updateWidth);
//   setPosition(true);

// })();
