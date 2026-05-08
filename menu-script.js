// MENU DATA
const menuItems = [
  {
    id: 1,
    name: "Cup Regular",
    description: "Pilihan minuman premium kami.",
    icon: "fa-solid fa-mug-hot",
    sizes: [
      { size: "Latte", price: 15000 },
      { size: "Caramel", price: 15000 },
      { size: "Brownsugar", price: 15000 },
      { size: "Butterscotch", price: 15000 },
      { size: "Hazelnut", price: 15000 },
      { size: "Black Lemonade", price: 15000 },
      { size: "Salted Caramel", price: 15000 },
      { size: "Signature Choco", price: 15000 },
      { size: "Signature Matcha", price: 15000 }
    ]
  },
  {
    id: 2,
    name: "Cup Full Arabica",
    description: "Biji kopi pilihan berkualitas premium.",
    icon: "fa-solid fa-coffee",
    sizes: [
      { size: "Black Arabica (Hot/Ice)", price: 20000 },
      { size: "Latte (Hot/Ice)", price: 25000 },
      { size: "Magic (Hot/Ice)", price: 25000 }
    ]
  },
  {
    id: 3,
    name: "Dokter Kopi VIP",
    description: "Pesan untuk ceremonial.",
    icon: "fa-solid fa-star",
    sizes: [
      { size: "Signature Matcha (Hot/Ice)", price: 45000 }
    ]
  },
  {
    id: 4,
    name: "Bottle 500 ml",
    description: "Minuman untuk dibawa pulang.",
    icon: "fa-solid fa-bottle-water",
    sizes: [
      { size: "Latte", price: 55000 },
      { size: "Butterscotch", price: 55000 },
      { size: "Caramel", price: 55000 },
      { size: "Hazelnut", price: 55000 },
      { size: "Brownsugar", price: 55000 },
      { size: "Black Arabica", price: 55000 },
      { size: "Black Lemonade", price: 65000 },
      { size: "Signature Matcha", price: 65000 },
      { size: "Signature Choco", price: 65000 }
    ]
  },
  {
    id: 5,
    name: "Bottle 1 Liter",
    description: "Hemat untuk rombongan atau acara.",
    icon: "fa-solid fa-glass-water",
    sizes: [
      { size: "Latte", price: 85000 },
      { size: "Butterscotch", price: 85000 },
      { size: "Caramel", price: 85000 },
      { size: "Hazelnut", price: 85000 },
      { size: "Brownsugar", price: 85000 },
      { size: "Black Lemonade", price: 130000 },
    ]
  },
  {
    id: 6,
    name: "Bottle 100 ml",
    description: "Minuman mini praktis untuk dicoba.",
    icon: "fa-solid fa-bottle-water",
    sizes: [
      { size: "Latte", price: 10000 },
      { size: "Caramel", price: 10000 },
      { size: "Brownsugar", price: 10000 },
      { size: "Butterscotch", price: 10000 },
      { size: "Hazelnut", price: 10000 },
      { size: "Black Lemonade", price: 10000 },
      { size: "Salted Caramel", price: 10000 },
      { size: "Signature Choco", price: 10000 },
      { size: "Signature Matcha", price: 10000 }
    ]
  }
];

// CURRENT ORDER STATE
let currentOrder = {
  menuId: null,
  menuName: null,
  selectedSize: null,
  selectedPrice: null
};

// RENDER MENU
function renderMenu() {
  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = "";

  menuItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";

    const minPrice = Math.min(...item.sizes.map(s => s.price));
    const maxPrice = Math.max(...item.sizes.map(s => s.price));

    card.innerHTML = `
      <div class="menu-card-header">
        <i class="${item.icon}"></i>
        <h3>${item.name}</h3>
      </div>
      <div class="menu-card-body">
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-sizes">
          <p>Harga mulai dari</p>
          <div class="size-info">
            <span style="color: #91BDDF; font-weight: 700;">Rp ${minPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
        <button class="order-btn" onclick="openSizePopup(${item.id})">
          <i class="fa-solid fa-shopping-cart"></i> Order
        </button>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

// OPEN SIZE POPUP
function openSizePopup(menuId) {
  const menu = menuItems.find(m => m.id === menuId);
  if (!menu) return;

  currentOrder.menuId = menuId;
  currentOrder.menuName = menu.name;
  currentOrder.selectedSize = null;
  currentOrder.selectedPrice = null;

  // Set popup title
  document.getElementById("popupMenuName").textContent = menu.name;

  // Render size options
  const sizeOptions = document.getElementById("sizeOptions");
  sizeOptions.innerHTML = "";

  menu.sizes.forEach((sizeItem, index) => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.innerHTML = `
      <span>${sizeItem.size}</span>
      <span class="size-price">Rp ${sizeItem.price.toLocaleString('id-ID')}</span>
    `;
    btn.onclick = () => selectSize(index, sizeItem.size, sizeItem.price);
    sizeOptions.appendChild(btn);
  });

  // Show popup
  document.getElementById("sizePopup").classList.add("show");
}

// SELECT SIZE
function selectSize(index, size, price) {
  currentOrder.selectedSize = size;
  currentOrder.selectedPrice = price;

  // Update UI - highlight selected button
  const buttons = document.querySelectorAll(".size-btn");
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.style.borderColor = "#91BDDF";
      btn.style.background = "rgba(145,189,223,0.2)";
    } else {
      btn.style.borderColor = "rgba(145,189,223,0.3)";
      btn.style.background = "transparent";
    }
  });
}

// CLOSE SIZE POPUP
function closeSizePopup() {
  document.getElementById("sizePopup").classList.remove("show");
  currentOrder.selectedSize = null;
  currentOrder.selectedPrice = null;
}

// CONFIRM ORDER & SEND TO WHATSAPP
function confirmOrder() {
  if (!currentOrder.selectedSize || !currentOrder.selectedPrice) {
    alert("Silakan pilih ukuran terlebih dahulu!");
    return;
  }

  const message = `Halo Admin Dokop! 👋\n\nSaya ingin memesan:\n\n📦 Menu: ${currentOrder.selectedSize}\n📏 Ukuran: ${currentOrder.menuName}\n💰 Harga: Rp ${currentOrder.selectedPrice.toLocaleString('id-ID')}\n\nTerima kasih! ☕`;

  // Encode message for WhatsApp
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp API
  const whatsappURL = `https://wa.me/6282260296709?text=${encodedMessage}`;

  // Close popup and redirect
  closeSizePopup();
  window.open(whatsappURL, "_blank");
}

// NAVBAR EFFECT
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(10,10,10,0.88)";
  } else {
    nav.style.background = "rgba(15,15,15,0.65)";
  }
});

// CLOSE POPUP WHEN CLICKING OUTSIDE
document.addEventListener("click", (e) => {
  const popup = document.getElementById("sizePopup");
  const popupBox = document.querySelector(".size-popup-box");

  if (e.target === popup) {
    closeSizePopup();
  }
});

// INITIALIZE ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});
