document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#main-header");
  const menuOpenButton = document.querySelector("#menu-open-button");
  const menuCloseButton = document.querySelector("#menu-close-button");
  const menuOverlay = document.querySelector("#menu-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollThreshold = 50;

  const showHeader = () => {
    if (!header) return;
    header.classList.remove(
      "-translate-y-full",
      "opacity-0",
      "pointer-events-none",
    );
    header.classList.add("translate-y-0", "opacity-100", "bg-[#252525]");
  };

  const hideHeader = () => {
    if (!header) return;
    header.classList.add(
      "-translate-y-full",
      "opacity-0",
      "pointer-events-none",
    );
    header.classList.remove("translate-y-0", "opacity-100");
  };

  const syncHeaderState = () => {
    if (
      document.body.classList.contains("show-mobile-menu") ||
      window.scrollY <= scrollThreshold
    ) {
      showHeader();
    } else {
      hideHeader();
    }
  };

  // Mobile Menu Logic
  if (menuOpenButton) {
    menuOpenButton.addEventListener("click", () => {
      document.body.classList.add("show-mobile-menu");
      syncHeaderState();
    });
  }

  if (menuCloseButton) {
    menuCloseButton.addEventListener("click", () => {
      document.body.classList.remove("show-mobile-menu");
      syncHeaderState();
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      document.body.classList.remove("show-mobile-menu");
      syncHeaderState();
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("show-mobile-menu");
      syncHeaderState();
    });
  });

  // Hide navbar while scrolling, show again at top.
  if (header) {
    header.classList.add(
      "transition-all",
      "duration-500",
      "translate-y-0",
      "opacity-100",
    );
    window.addEventListener("scroll", syncHeaderState);
    syncHeaderState();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  const popupCaption = document.getElementById("popupCaption");
  const popupPrice = document.getElementById("popupPrice");
  const popupMaterial = document.getElementById("popupMaterial");

  const productLinks = document.querySelectorAll(".product-link");

  productLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the image inside the clicked link
      const img = this.querySelector("img");

      // 1. Update the Image and Caption
      popupImg.src = img.src;
      popupCaption.textContent = img.alt;

      // 2. Update the Cost and Material using .dataset
      // .dataset.cost matches data-cost in HTML
      popupPrice.textContent = img.dataset.cost;
      popupMaterial.textContent = img.dataset.material;

      // 3. Show the popup
      popup.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  // Close logic (click anywhere outside the image container)
  popup.addEventListener("click", (e) => {
    if (e.target.id === "imagePopup" || e.target.tagName === "SPAN") {
      popup.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });
});

const scrollUpBtn = document.querySelector(".scroll-up-btn");

function toggleScrollUpButton() {
  if (window.scrollY > 400) {
    scrollUpBtn.classList.add("show");
  } else {
    scrollUpBtn.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Event Listeners
window.addEventListener("scroll", toggleScrollUpButton);
scrollUpBtn.addEventListener("click", scrollToTop);

// Optional: Auto-hide after some time when at top (nice UX)
setTimeout(() => {
  if (window.scrollY === 0) {
    scrollUpBtn.classList.remove("show");
  }
}, 1000);

let cartItems = 0;

function addToBag() {
  cartItems++;
  const badge = document.getElementById("bag-count");

  // Update text content
  badge.textContent = cartItems;

  // Show badge if it was hidden
  if (cartItems > 0) {
    badge.classList.remove("hidden");
  }

  // Optional: Add a little "pop" animation when adding
  badge.classList.add("scale-125");
  setTimeout(() => {
    badge.classList.remove("scale-125");
  }, 200);
}

// Example: Attach this to your "Shop Now" button for testing
document
  .querySelector('a[href="./addToCart.html"]')
  .addEventListener("click", function (e) {
    e.preventDefault(); // Stop page jump for testing
    addToBag();
  });




  