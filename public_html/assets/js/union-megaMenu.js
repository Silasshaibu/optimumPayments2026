const UnionMegaMenu = {
  data: {
    "For Venues": {
      type: "group",
      slug: "Tools to help venues operate smarter and grow revenue.",
      items: [
        { title: "Point of Sale", slug: "Fast, reliable POS.", href: "/pos" },
        { title: "Guest-Led Ordering", slug: "QR ordering.", href: "/guest-ordering" }
      ]
    },
    "For Guests": {
      type: "group",
      slug: "Better guest experiences.",
      items: [
        { title: "Digital Menus", slug: "Always updated.", href: "/digital-menus" },
        { title: "Waitlist", slug: "Reduce lines.", href: "/waitlist" }
      ]
    }
  },

  init() {
    this.toggle = document.getElementById("unionMegaMenuToggle");
    this.menu = document.getElementById("unionMegaMenu");
    this.left = document.getElementById("unionMegaMenuLeft");
    this.right = document.getElementById("unionMegaMenuRight");
    this.closeBtn = this.menu.querySelector(".union-mega-menu__close");

    this.toggle.onclick = () => this.toggleMenu();
    this.closeBtn.onclick = () => this.closeMenu();

    this.renderLeft();
    this.openFirst();
  },

  toggleMenu() {
    const open = this.menu.classList.toggle("open");
    this.toggle.setAttribute("aria-expanded", open);
  },

  closeMenu() {
    this.menu.classList.remove("open");
    this.toggle.setAttribute("aria-expanded", "false");
  },

  renderLeft() {
    this.left.innerHTML = "";

    Object.entries(this.data).forEach(([label, cfg]) => {
      const btn = document.createElement("button");
      btn.className = "union-mega-menu__nav-item";
      btn.innerHTML = `
        <div class="union-mega-menu__nav-text">
          <div class="union-mega-menu__nav-title">${label}</div>
          <div class="union-mega-menu__nav-slug">${cfg.slug}</div>
        </div>
        <span class="union-mega-menu__caret">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon unionMegaMenu">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      `;

      btn.onmouseenter = () => this.activate(btn, cfg.items);
      this.left.appendChild(btn);
    });
  },

  activate(btn, items) {
    this.left.querySelectorAll(".union-mega-menu__nav-item").forEach(el => {
      el.classList.remove("active");
      el.querySelector(".union-mega-menu__caret").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon unionMegaMenu">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>`;
    });

    btn.classList.add("active");
    btn.querySelector(".union-mega-menu__caret").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon unionMegaMenu">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
      </svg>`;

    this.renderRight(items);
  },

  openFirst() {
    const first = this.left.querySelector(".union-mega-menu__nav-item");
    if (first) {
      const label = first.querySelector(".union-mega-menu__nav-title").textContent;
      this.activate(first, this.data[label].items);
    }
  },

  renderRight(items) {
    this.right.innerHTML = `
      <ul class="union-mega-menu__children">
        ${items.map(i => `
          <li class="union-mega-menu__child-item">
            <a href="${i.href}">
              <strong>${i.title}</strong>
              <div>${i.slug}</div>
            </a>
          </li>`).join("")}
      </ul>`;
  }
};

document.addEventListener("DOMContentLoaded", () => UnionMegaMenu.init());