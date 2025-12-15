
/* ================= DATA ================= */

const miniMegaMenuData = [
  {
    title: "Website Design",
    description: "Premium designs at your finger tips",
    cta: "Explore",
    image: "../assets/images/services/web-design.webp",
    href: "#"
  },
  {
    title: "3D Printing",
    description: "1-stop shopping for all your 3D-printed needs",
    cta: "Order Now",
    image: "../assets/images/services/3d-printing.webp",
    href: "#"
  },
  {
    title: "Branding",
    description: "We can handle all form of your branding needs",
    cta: "Order Now",
    image: "../assets/images/services/branding.webp",
    href: "#"
  },
  {
    title: "Social Media Marketing",
    description: "Let market your product on your socials",
    cta: "Order Now",
    image: "../assets/images/services/social-media.webp",
    href: "#"
  }
];

/* ================= RENDER ================= */

const miniServicesGrid = document.getElementById("miniServicesGrid");

function renderMiniMegaMenu() {
  miniServicesGrid.innerHTML = "";

  miniMegaMenuData.forEach(item => {
    const card = document.createElement("div");
    card.className = "mini-service-card";

    card.innerHTML = `
      <img
        class="mini-service-image"
        src="${item.image}"
        alt="${item.title}"
        loading="lazy"
      />

      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.href}">${item.cta}</a>
    `;

    miniServicesGrid.appendChild(card);
  });
}

/* ================= INIT ================= */

renderMiniMegaMenu();