
  const logos = document.querySelectorAll('.partners-grid .logo');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  logos.forEach((logo, index) => {
    logo.style.setProperty('--delay', `${index * 80}ms`);
    observer.observe(logo);
  });