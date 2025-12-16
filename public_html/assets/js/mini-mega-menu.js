
/* ================= DATA ================= */

const miniMegaMenuData = [
  {
    title: "Website Design",
    description: "Premium designs at your finger tips",
    cta: "Explore",
    image: "../assets/images/MobileMenuImages/Website_Design.jpg",
    href: "/public_html/pages/digital-services.html"
  },
  {
    title: "3D Printing",
    description: "1-stop shopping for all your 3D-printed needs",
    cta: "Post Your Brief",
    image: "../assets/images/MobileMenuImages/3dModelingForPrints.jpg",
    href: "/public_html/pages/digital-services.html"
  },
  {
    title: "Branding",
    description: "We can handle all form of your branding needs",
    cta: "Explore",
    image: "../assets/images/MobileMenuImages/Branding.jpg",
    href: "/public_html/pages/digital-services.html"
  },
  {
    title: "Social Media Marketing",
    description: "Let market your product on your socials",
    cta: "View Pricing Options",
    image: "../assets/images/MobileMenuImages/SocialMediaMarketing-01.jpg",
    href: "/public_html/pages/digital-services.html"
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