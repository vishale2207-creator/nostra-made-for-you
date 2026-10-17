<<<<<<< HEAD
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");

function setNavigationOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  setNavigationOpen(isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setNavigationOpen(false);
  });
});

document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavigationOpen(false);
  if (event.key === "Escape") closeCart();
});

const heroImage = document.querySelector("[data-hero-image]");
const heroCaption = document.querySelector("[data-hero-caption]");
const heroCount = document.querySelector("[data-hero-count]");
const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    alt: "Model in a relaxed neutral outfit standing in warm sunlight",
    caption: "THE EVERYDAY EDIT",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    alt: "Model in an easy seasonal outfit",
    caption: "YOUR EVERYDAY HERO",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    alt: "Model in a light, effortless outfit",
    caption: "WEEKEND, YOUR WAY",
  },
];
let currentSlide = 0;

function showHeroSlide(offset) {
  currentSlide = (currentSlide + offset + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[currentSlide];
  heroImage.src = slide.src;
  heroImage.alt = slide.alt;
  heroCaption.textContent = slide.caption;
  heroCount.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(heroSlides.length).padStart(2, "0")}`;
}

document.querySelector(".hero-prev").addEventListener("click", () => showHeroSlide(-1));
document.querySelector(".hero-next").addEventListener("click", () => showHeroSlide(1));

let pointerStartX = null;

heroImage.parentElement.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  pointerStartX = event.clientX;
});

heroImage.parentElement.addEventListener("pointerup", (event) => {
  if (pointerStartX === null) return;
  const distance = event.clientX - pointerStartX;
  pointerStartX = null;
  if (Math.abs(distance) < 45) return;
  showHeroSlide(distance < 0 ? 1 : -1);
});

heroImage.parentElement.addEventListener("pointercancel", () => {
  pointerStartX = null;
});

const collectionProducts = [
  {
    name: "The Sunday Shirt",
    detail: "Soft cotton · Cloud",
    price: "$78",
    label: "JUST LANDED",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=80",
    alt: "A light cotton shirt ready for everyday wear",
    keywords: "shirt top cotton white cloud everyday",
  },
  {
    name: "The Weekender Trouser",
    detail: "Relaxed linen · Oat",
    price: "$96",
    label: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
    alt: "Relaxed linen trousers in a warm neutral tone",
    keywords: "trouser trousers pants linen oat neutral bestseller",
  },
  {
    name: "The Anywhere Knit",
    detail: "Organic cotton · Moss",
    price: "$112",
    label: "JUST LANDED",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    alt: "A soft everyday knit in a muted shade",
    keywords: "knit knitwear sweater organic cotton moss green",
  },
  {
    name: "The Daylight Dress",
    detail: "Airy tencel · Sienna",
    price: "$124",
    label: "FEELS LIKE SUMMER",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    alt: "A flowing dress in a soft natural color",
    keywords: "dress tencel airy sienna summer",
  },
  {
    name: "The Sunday Tee",
    detail: "Everyday cotton · Chalk",
    price: "$48",
    label: "EASY DOES IT",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    alt: "A classic cotton tee in a light neutral color",
    keywords: "tee t-shirt cotton chalk white casual",
  },
  {
    name: "The Slow Morning Layer",
    detail: "Soft jersey · Sand",
    price: "$84",
    label: "A LITTLE LAYER",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
    alt: "A soft sand-colored layer for cool mornings",
    keywords: "layer jacket sand soft jersey neutral",
  },
  {
    name: "The Long Weekend",
    detail: "Easy denim · Blue",
    price: "$108",
    label: "MADE TO MOVE",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    alt: "Everyday blue denim with a comfortable fit",
    keywords: "jeans denim blue weekend pants",
  },
  {
    name: "The Sunday Market Bag",
    detail: "Everyday carry · Natural",
    price: "$56",
    label: "TAKE IT ALONG",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    alt: "A simple everyday bag in a natural shade",
    keywords: "bag tote market natural accessory",
  },
];

const mensProducts = [
  {
    name: "The Field Overshirt",
    detail: "Brushed cotton · Olive",
    price: "$108",
    label: "EVERYDAY LAYER",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
    alt: "Men's relaxed smart-casual outfit with an overshirt",
    keywords: "men mens overshirt jacket olive cotton",
  },
  {
    name: "The Off-Duty Tee",
    detail: "Organic cotton · White",
    price: "$44",
    label: "A GOOD BASIC",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
    alt: "Men's simple cotton t-shirt styled for everyday",
    keywords: "men mens tee t-shirt cotton white",
  },
  {
    name: "The Easygoing Knit",
    detail: "Soft knit · Stone",
    price: "$96",
    label: "MADE FOR LAYERING",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    alt: "Men's soft knitwear in an understated neutral color",
    keywords: "men mens knit sweater stone neutral",
  },
  {
    name: "The Everywear Chino",
    detail: "Cotton twill · Khaki",
    price: "$92",
    label: "JUST LANDED",
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=80",
    alt: "Men's relaxed chinos for everyday wear",
    keywords: "men mens chinos trousers pants khaki cotton",
  },
];

const beachwearProducts = [
  {
    name: "The Saltwater Shirt",
    detail: "Airy cotton · White",
    price: "$72",
    label: "BEACH DAY",
    image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=900&q=80",
    alt: "Bright, relaxed beachside scene for a summer outfit",
  },
  {
    name: "The Coastline Short",
    detail: "Lightweight · Sea blue",
    price: "$64",
    label: "MADE FOR SUN",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    alt: "Turquoise ocean and sandy shore on a sunny beach day",
  },
];

const gymwearProducts = [
  {
    name: "The Move Easy Tee",
    detail: "Breathable jersey · Black",
    price: "$52",
    label: "READY TO MOVE",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    alt: "Athlete training in a breathable workout shirt",
  },
  {
    name: "The Active Short",
    detail: "Stretch fabric · Graphite",
    price: "$68",
    label: "GYM TO GO",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    alt: "Modern gym interior ready for a workout",
  },
];

const collectionSearch = document.querySelector("#collection-search");
const searchResults = document.querySelector(".search-product-grid");
const searchResultsCount = document.querySelector(".search-results-count");
const noSearchResults = document.querySelector(".no-search-results");
const viewMoreButton = document.querySelector(".view-more-button");
const visibleCollectionCount = 4;
let showAllCollectionProducts = false;

const favoritesGrid = document.querySelector(".favorites-grid");
const favoritesEmpty = document.querySelector(".favorites-empty");
const favoritesMessage = document.querySelector(".favorites-message");
const favoritesCount = document.querySelector(".favorites-count");
const favoritesStorageKey = "nostra-favorites";
const bagCountElement = document.querySelector(".bag-count");
const bagLink = document.querySelector(".bag-link");
const bagStorageKey = "nostra-bag";
const cartLayer = document.querySelector(".cart-layer");
const cartDrawer = document.querySelector(".cart-drawer");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartHeadingCount = document.querySelector(".cart-heading-count");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartCloseButton = document.querySelector(".cart-close");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartContinueButton = document.querySelector(".cart-continue");
let favoriteProducts = new Map();
let favoritesStorageAvailable = true;
let bagProducts = new Map();
let bagStorageAvailable = true;
let previouslyFocusedElement = null;

try {
  const storedFavorites = JSON.parse(localStorage.getItem(favoritesStorageKey) || "[]");
  if (Array.isArray(storedFavorites)) {
    favoriteProducts = new Map(
      storedFavorites
        .filter((product) => product && typeof product.id === "string" && typeof product.name === "string")
        .map((product) => [product.id, product]),
    );
  }
} catch (error) {
  favoritesStorageAvailable = false;
  favoritesMessage.textContent = "Favorites could not be loaded from this browser.";
  console.error("Unable to load saved Nostra favorites.", error);
}

try {
  const storedBag = JSON.parse(localStorage.getItem(bagStorageKey) || "[]");
  if (Array.isArray(storedBag)) {
    bagProducts = new Map(
      storedBag
        .filter((item) => item && item.product && typeof item.id === "string" && Number.isInteger(item.quantity) && item.quantity > 0)
        .map((item) => [item.id, { product: item.product, quantity: item.quantity }]),
    );
  }
} catch (error) {
  bagStorageAvailable = false;
  console.error("Unable to load the Nostra shopping bag.", error);
}

function getProductId(product) {
  return product.image.split("?")[0];
}

function updateBagCount() {
  const totalItems = [...bagProducts.values()].reduce((total, item) => total + item.quantity, 0);
  bagCountElement.textContent = String(totalItems);
  cartHeadingCount.textContent = `(${totalItems})`;
  bagLink.setAttribute(
    "aria-label",
    `Shopping bag, ${totalItems} ${totalItems === 1 ? "item" : "items"}`,
  );
}

function parsePrice(price) {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid product price: ${price}`);
  }
  return value;
}

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function renderCart() {
  const items = [...bagProducts.entries()];
  const totalItems = items.reduce((total, [, item]) => total + item.quantity, 0);
  let subtotal = 0;

  const rows = items.map(([id, item]) => {
    const unitPrice = parsePrice(item.product.price);
    subtotal += unitPrice * item.quantity;

    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img class="cart-item-image" src="${item.product.image}" alt="${item.product.alt}" />
      <div class="cart-item-details">
        <h3>${item.product.name}</h3>
        <p>${item.product.detail}</p>
        <span class="cart-item-price">${formatPrice(unitPrice)}</span>
        <div class="cart-item-actions">
          <div class="cart-quantity" aria-label="Quantity for ${item.product.name}">
            <button type="button" data-cart-action="decrease" data-cart-id="${id}" aria-label="Decrease quantity of ${item.product.name}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-cart-id="${id}" aria-label="Increase quantity of ${item.product.name}">+</button>
          </div>
          <button class="cart-remove" type="button" data-cart-action="remove" data-cart-id="${id}">Remove</button>
        </div>
      </div>
      <span class="cart-line-total">${formatPrice(unitPrice * item.quantity)}</span>
    `;
    return row;
  });

  cartItems.replaceChildren(...rows);
  cartEmpty.hidden = totalItems > 0;
  cartItems.hidden = totalItems === 0;
  cartSubtotal.textContent = formatPrice(subtotal);
  updateBagCount();
}

function openCart() {
  previouslyFocusedElement = document.activeElement;
  cartLayer.hidden = false;
  requestAnimationFrame(() => {
    cartLayer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartCloseButton.focus();
  });
}

function closeCart() {
  if (cartLayer.hidden) return;

  cartLayer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (cartLayer.classList.contains("is-open")) return;
    cartLayer.hidden = true;
    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  }, 350);
}

function saveBag() {
  if (!bagStorageAvailable) return;

  try {
    localStorage.setItem(
      bagStorageKey,
      JSON.stringify([...bagProducts].map(([id, item]) => ({ id, ...item }))),
    );
  } catch (error) {
    bagStorageAvailable = false;
    console.error("Unable to save the Nostra shopping bag.", error);
  }
}

function createAddToBagButton(product) {
  const button = document.createElement("button");
  button.className = "add-to-bag-button";
  button.type = "button";
  button.dataset.bagId = getProductId(product);
  button.textContent = "Add to bag";
  button.setAttribute("aria-label", `Add ${product.name} to bag`);
  return button;
}

function createFavoriteButton(product, className = "favorite-button") {
  const isFavorite = favoriteProducts.has(getProductId(product));
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.dataset.favoriteId = getProductId(product);
  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute(
    "aria-label",
    `${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`,
  );
  button.textContent = isFavorite ? "♥" : "♡";
  return button;
}

function getProductFromCard(card) {
  const image = card.querySelector(".product-image-link img");
  return {
    id: image.src.split("?")[0],
    image: image.src,
    alt: image.alt,
    name: card.querySelector(".product-info h3").textContent.trim(),
    detail: card.querySelector(".product-info p").textContent.trim(),
    price: card.querySelector(".product-price").textContent.trim(),
    label: card.querySelector(".product-label").textContent.trim(),
  };
}

function addFavoriteControl(card, product) {
  const imageLink = card.querySelector(".product-image-link");
  const media = document.createElement("div");
  media.className = "product-media";
  imageLink.before(media);
  media.append(
    imageLink,
    createFavoriteButton(product),
    createAddToBagButton(product),
  );
}

function updateFavoriteControls() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const button = card.querySelector(".favorite-button");
    if (!button) return;

    const product = getProductFromCard(card);
    const isFavorite = favoriteProducts.has(product.id);
    button.setAttribute("aria-pressed", String(isFavorite));
    button.setAttribute(
      "aria-label",
      `${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`,
    );
    button.textContent = isFavorite ? "♥" : "♡";
  });
}

function renderFavorites() {
  const products = [...favoriteProducts.values()];
  favoritesGrid.replaceChildren(...products.map(createProductCard));
  favoritesCount.textContent = String(products.length);
  favoritesEmpty.hidden = products.length > 0;
  updateFavoriteControls();
}

function saveFavorites() {
  if (!favoritesStorageAvailable) return;

  try {
    localStorage.setItem(favoritesStorageKey, JSON.stringify([...favoriteProducts.values()]));
  } catch (error) {
    favoritesStorageAvailable = false;
    favoritesMessage.textContent = "Favorites are saved for this visit, but could not be stored in this browser.";
    console.error("Unable to save Nostra favorites.", error);
  }
}

document.addEventListener("click", (event) => {
  const cartAction = event.target.closest("[data-cart-action]");
  if (cartAction) {
    const id = cartAction.dataset.cartId;
    const item = bagProducts.get(id);
    if (!item) return;

    if (cartAction.dataset.cartAction === "remove" ||
      (cartAction.dataset.cartAction === "decrease" && item.quantity === 1)) {
      bagProducts.delete(id);
    } else if (cartAction.dataset.cartAction === "decrease") {
      bagProducts.set(id, { ...item, quantity: item.quantity - 1 });
    } else if (cartAction.dataset.cartAction === "increase") {
      bagProducts.set(id, { ...item, quantity: item.quantity + 1 });
    }

    saveBag();
    renderCart();
    return;
  }

  if (event.target.closest(".cart-close, .cart-backdrop, .cart-continue")) {
    closeCart();
    return;
  }

  if (event.target.closest(".bag-link")) {
    event.preventDefault();
    renderCart();
    openCart();
    return;
  }

  const bagButton = event.target.closest(".add-to-bag-button");
  if (bagButton) {
    const card = bagButton.closest(".product-card");
    if (!card) return;

    const product = getProductFromCard(card);
    const productId = getProductId(product);
    const existingItem = bagProducts.get(productId);
    bagProducts.set(productId, {
      product,
      quantity: (existingItem?.quantity || 0) + 1,
    });
    saveBag();
    renderCart();
    bagButton.textContent = "Added to bag";
    openCart();
    window.setTimeout(() => {
      if (bagButton.isConnected) bagButton.textContent = "Add to bag";
    }, 1400);
    return;
  }

  const button = event.target.closest(".favorite-button");
  if (!button) return;

  const card = button.closest(".product-card");
  if (!card) return;

  const product = getProductFromCard(card);
  if (favoriteProducts.has(product.id)) {
    favoriteProducts.delete(product.id);
  } else {
    favoriteProducts.set(product.id, product);
  }
  saveFavorites();
  renderFavorites();
});

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <a class="product-image-link" href="#bestsellers" aria-label="Shop ${product.name}">
      <img src="${product.image}" alt="${product.alt}" loading="lazy" />
      <span class="product-label">${product.label}</span>
    </a>
    <div class="product-info">
      <div><h3>${product.name}</h3><p>${product.detail}</p></div>
      <span class="product-price">${product.price}</span>
    </div>
  `;
  addFavoriteControl(card, product);
  return card;
}

function renderCollectionResults() {
  const searchTerms = collectionSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = collectionProducts.filter((product) => {
    const searchableText = `${product.name} ${product.detail} ${product.keywords}`.toLowerCase();
    return searchTerms.every((term) => searchableText.includes(term));
  });

  const visibleProducts = showAllCollectionProducts
    ? matches
    : matches.slice(0, visibleCollectionCount);
  searchResults.replaceChildren(...visibleProducts.map(createProductCard));

  searchResultsCount.textContent = `${matches.length} ${matches.length === 1 ? "piece" : "pieces"} to explore`;
  noSearchResults.hidden = matches.length > 0;
  viewMoreButton.hidden = matches.length <= visibleCollectionCount;
  viewMoreButton.setAttribute("aria-expanded", String(showAllCollectionProducts));
  viewMoreButton.textContent = showAllCollectionProducts ? "View less" : "View more";
}

collectionSearch.addEventListener("input", () => {
  showAllCollectionProducts = false;
  renderCollectionResults();
});
const collectionSearchForm = document.querySelector(".collection-search-form");
collectionSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCollectionResults();
});
collectionSearchForm.addEventListener("reset", () => {
  requestAnimationFrame(renderCollectionResults);
});
viewMoreButton.addEventListener("click", () => {
  showAllCollectionProducts = !showAllCollectionProducts;
  renderCollectionResults();
});
renderCollectionResults();

document.querySelectorAll("#new-arrivals .product-card").forEach((card) => {
  addFavoriteControl(card, getProductFromCard(card));
});

document.querySelector(".mens-product-grid").replaceChildren(
  ...mensProducts.map(createProductCard),
);
document.querySelector(".beach-product-grid").replaceChildren(
  ...beachwearProducts.map(createProductCard),
);
document.querySelector(".gym-product-grid").replaceChildren(
  ...gymwearProducts.map(createProductCard),
);
renderFavorites();
renderCart();

document.querySelector("#current-year").textContent = new Date().getFullYear();

const newsletterForm = document.querySelector(".newsletter-form");
const formMessage = document.querySelector(".form-message");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;

  formMessage.textContent = "You're on the list. Thanks for being here!";
  newsletterForm.reset();
});
=======
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");

function setNavigationOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  setNavigationOpen(isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setNavigationOpen(false);
  });
});

document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavigationOpen(false);
  if (event.key === "Escape") closeCart();
});

const heroImage = document.querySelector("[data-hero-image]");
const heroCaption = document.querySelector("[data-hero-caption]");
const heroCount = document.querySelector("[data-hero-count]");
const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    alt: "Model in a relaxed neutral outfit standing in warm sunlight",
    caption: "THE EVERYDAY EDIT",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    alt: "Model in an easy seasonal outfit",
    caption: "YOUR EVERYDAY HERO",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    alt: "Model in a light, effortless outfit",
    caption: "WEEKEND, YOUR WAY",
  },
];
let currentSlide = 0;

function showHeroSlide(offset) {
  currentSlide = (currentSlide + offset + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[currentSlide];
  heroImage.src = slide.src;
  heroImage.alt = slide.alt;
  heroCaption.textContent = slide.caption;
  heroCount.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(heroSlides.length).padStart(2, "0")}`;
}

document.querySelector(".hero-prev").addEventListener("click", () => showHeroSlide(-1));
document.querySelector(".hero-next").addEventListener("click", () => showHeroSlide(1));

let pointerStartX = null;

heroImage.parentElement.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  pointerStartX = event.clientX;
});

heroImage.parentElement.addEventListener("pointerup", (event) => {
  if (pointerStartX === null) return;
  const distance = event.clientX - pointerStartX;
  pointerStartX = null;
  if (Math.abs(distance) < 45) return;
  showHeroSlide(distance < 0 ? 1 : -1);
});

heroImage.parentElement.addEventListener("pointercancel", () => {
  pointerStartX = null;
});

const {
  women: collectionProducts,
  men: mensProducts,
  beachwear: beachwearProducts,
  gymwear: gymwearProducts,
} = window.NOSTRA_CATALOG;

const collectionSearch = document.querySelector("#collection-search");
const searchResults = document.querySelector(".search-product-grid");
const searchResultsCount = document.querySelector(".search-results-count");
const noSearchResults = document.querySelector(".no-search-results");
const viewMoreButton = document.querySelector(".view-more-button");
const visibleCollectionCount = 4;
let showAllCollectionProducts = false;

const favoritesGrid = document.querySelector(".favorites-grid");
const favoritesEmpty = document.querySelector(".favorites-empty");
const favoritesMessage = document.querySelector(".favorites-message");
const favoritesCount = document.querySelector(".favorites-count");
const favoritesStorageKey = "nostra-favorites";
const bagCountElement = document.querySelector(".bag-count");
const bagLink = document.querySelector(".bag-link");
const bagStorageKey = "nostra-bag";
const cartLayer = document.querySelector(".cart-layer");
const cartDrawer = document.querySelector(".cart-drawer");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartHeadingCount = document.querySelector(".cart-heading-count");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartCloseButton = document.querySelector(".cart-close");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartContinueButton = document.querySelector(".cart-continue");
let favoriteProducts = new Map();
let favoritesStorageAvailable = true;
let bagProducts = new Map();
let bagStorageAvailable = true;
let previouslyFocusedElement = null;

try {
  const storedFavorites = JSON.parse(localStorage.getItem(favoritesStorageKey) || "[]");
  if (Array.isArray(storedFavorites)) {
    favoriteProducts = new Map(
      storedFavorites
        .filter((product) => product && typeof product.id === "string" && typeof product.name === "string")
        .map((product) => [product.id, product]),
    );
  }
} catch (error) {
  favoritesStorageAvailable = false;
  favoritesMessage.textContent = "Favorites could not be loaded from this browser.";
  console.error("Unable to load saved Nostra favorites.", error);
}

try {
  const storedBag = JSON.parse(localStorage.getItem(bagStorageKey) || "[]");
  if (Array.isArray(storedBag)) {
    bagProducts = new Map(
      storedBag
        .filter((item) => item && item.product && typeof item.id === "string" && Number.isInteger(item.quantity) && item.quantity > 0)
        .map((item) => [item.id, { product: item.product, quantity: item.quantity }]),
    );
  }
} catch (error) {
  bagStorageAvailable = false;
  console.error("Unable to load the Nostra shopping bag.", error);
}

function getProductId(product) {
  return product.image.split("?")[0];
}

function updateBagCount() {
  const totalItems = [...bagProducts.values()].reduce((total, item) => total + item.quantity, 0);
  bagCountElement.textContent = String(totalItems);
  cartHeadingCount.textContent = `(${totalItems})`;
  bagLink.setAttribute(
    "aria-label",
    `Shopping bag, ${totalItems} ${totalItems === 1 ? "item" : "items"}`,
  );
}

function parsePrice(price) {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid product price: ${price}`);
  }
  return value;
}

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function renderCart() {
  const items = [...bagProducts.entries()];
  const totalItems = items.reduce((total, [, item]) => total + item.quantity, 0);
  let subtotal = 0;

  const rows = items.map(([id, item]) => {
    const unitPrice = parsePrice(item.product.price);
    subtotal += unitPrice * item.quantity;

    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img class="cart-item-image" src="${item.product.image}" alt="${item.product.alt}" />
      <div class="cart-item-details">
        <h3>${item.product.name}</h3>
        <p>${item.product.detail}${item.product.size ? ` · Size ${item.product.size}` : ""}</p>
        <span class="cart-item-price">${formatPrice(unitPrice)}</span>
        <div class="cart-item-actions">
          <div class="cart-quantity" aria-label="Quantity for ${item.product.name}">
            <button type="button" data-cart-action="decrease" data-cart-id="${id}" aria-label="Decrease quantity of ${item.product.name}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-cart-id="${id}" aria-label="Increase quantity of ${item.product.name}">+</button>
          </div>
          <button class="cart-remove" type="button" data-cart-action="remove" data-cart-id="${id}">Remove</button>
        </div>
      </div>
      <span class="cart-line-total">${formatPrice(unitPrice * item.quantity)}</span>
    `;
    return row;
  });

  cartItems.replaceChildren(...rows);
  cartEmpty.hidden = totalItems > 0;
  cartItems.hidden = totalItems === 0;
  cartSubtotal.textContent = formatPrice(subtotal);
  updateBagCount();
}

function openCart() {
  previouslyFocusedElement = document.activeElement;
  cartLayer.hidden = false;
  requestAnimationFrame(() => {
    cartLayer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartCloseButton.focus();
  });
}

function closeCart() {
  if (cartLayer.hidden) return;

  cartLayer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (cartLayer.classList.contains("is-open")) return;
    cartLayer.hidden = true;
    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  }, 350);
}

function saveBag() {
  if (!bagStorageAvailable) return;

  try {
    localStorage.setItem(
      bagStorageKey,
      JSON.stringify([...bagProducts].map(([id, item]) => ({ id, ...item }))),
    );
  } catch (error) {
    bagStorageAvailable = false;
    console.error("Unable to save the Nostra shopping bag.", error);
  }
}

function createAddToBagButton(product) {
  const button = document.createElement("button");
  button.className = "add-to-bag-button";
  button.type = "button";
  button.dataset.bagId = getProductId(product);
  button.textContent = "Add to bag";
  button.setAttribute("aria-label", `Add ${product.name} to bag`);
  return button;
}

function createFavoriteButton(product, className = "favorite-button") {
  const isFavorite = favoriteProducts.has(getProductId(product));
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.dataset.favoriteId = getProductId(product);
  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute(
    "aria-label",
    `${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`,
  );
  button.textContent = isFavorite ? "♥" : "♡";
  return button;
}

function getProductFromCard(card) {
  const image = card.querySelector(".product-image-link img");
  return {
    id: image.src.split("?")[0],
    image: image.src,
    alt: image.alt,
    name: card.querySelector(".product-info h3").textContent.trim(),
    detail: card.querySelector(".product-info p").textContent.trim(),
    price: card.querySelector(".product-price").textContent.trim(),
    label: card.querySelector(".product-label").textContent.trim(),
  };
}

function addFavoriteControl(card, product) {
  const imageLink = card.querySelector(".product-image-link");
  const media = document.createElement("div");
  media.className = "product-media";
  imageLink.before(media);
  media.append(
    imageLink,
    createFavoriteButton(product),
    createAddToBagButton(product),
  );
}

function updateFavoriteControls() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const button = card.querySelector(".favorite-button");
    if (!button) return;

    const product = getProductFromCard(card);
    const isFavorite = favoriteProducts.has(product.id);
    button.setAttribute("aria-pressed", String(isFavorite));
    button.setAttribute(
      "aria-label",
      `${isFavorite ? "Remove" : "Add"} ${product.name} ${isFavorite ? "from" : "to"} favorites`,
    );
    button.textContent = isFavorite ? "♥" : "♡";
  });
}

function renderFavorites() {
  const products = [...favoriteProducts.values()];
  favoritesGrid.replaceChildren(...products.map(createProductCard));
  favoritesCount.textContent = String(products.length);
  favoritesEmpty.hidden = products.length > 0;
  updateFavoriteControls();
}

function saveFavorites() {
  if (!favoritesStorageAvailable) return;

  try {
    localStorage.setItem(favoritesStorageKey, JSON.stringify([...favoriteProducts.values()]));
  } catch (error) {
    favoritesStorageAvailable = false;
    favoritesMessage.textContent = "Favorites are saved for this visit, but could not be stored in this browser.";
    console.error("Unable to save Nostra favorites.", error);
  }
}

document.addEventListener("click", (event) => {
  const cartAction = event.target.closest("[data-cart-action]");
  if (cartAction) {
    const id = cartAction.dataset.cartId;
    const item = bagProducts.get(id);
    if (!item) return;

    if (cartAction.dataset.cartAction === "remove" ||
      (cartAction.dataset.cartAction === "decrease" && item.quantity === 1)) {
      bagProducts.delete(id);
    } else if (cartAction.dataset.cartAction === "decrease") {
      bagProducts.set(id, { ...item, quantity: item.quantity - 1 });
    } else if (cartAction.dataset.cartAction === "increase") {
      bagProducts.set(id, { ...item, quantity: item.quantity + 1 });
    }

    saveBag();
    renderCart();
    return;
  }

  if (event.target.closest(".cart-close, .cart-backdrop, .cart-continue")) {
    closeCart();
    return;
  }

  if (event.target.closest(".bag-link")) {
    event.preventDefault();
    renderCart();
    openCart();
    return;
  }

  const bagButton = event.target.closest(".add-to-bag-button");
  if (bagButton) {
    const card = bagButton.closest(".product-card");
    if (!card) return;

    const product = getProductFromCard(card);
    const productId = getProductId(product);
    const existingItem = bagProducts.get(productId);
    bagProducts.set(productId, {
      product,
      quantity: (existingItem?.quantity || 0) + 1,
    });
    saveBag();
    renderCart();
    bagButton.textContent = "Added to bag";
    openCart();
    window.setTimeout(() => {
      if (bagButton.isConnected) bagButton.textContent = "Add to bag";
    }, 1400);
    return;
  }

  const button = event.target.closest(".favorite-button");
  if (!button) return;

  const card = button.closest(".product-card");
  if (!card) return;

  const product = getProductFromCard(card);
  if (favoriteProducts.has(product.id)) {
    favoriteProducts.delete(product.id);
  } else {
    favoriteProducts.set(product.id, product);
  }
  saveFavorites();
  renderFavorites();
});

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <a class="product-image-link" href="#bestsellers" aria-label="Shop ${product.name}">
      <img src="${product.image}" alt="${product.alt}" loading="lazy" />
      <span class="product-label">${product.label}</span>
    </a>
    <div class="product-info">
      <div><h3>${product.name}</h3><p>${product.detail}</p></div>
      <span class="product-price">${product.price}</span>
    </div>
  `;
  addFavoriteControl(card, product);
  return card;
}

function renderCollectionResults() {
  const searchTerms = collectionSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = collectionProducts.filter((product) => {
    const searchableText = `${product.name} ${product.detail} ${product.keywords}`.toLowerCase();
    return searchTerms.every((term) => searchableText.includes(term));
  });

  const visibleProducts = showAllCollectionProducts
    ? matches
    : matches.slice(0, visibleCollectionCount);
  searchResults.replaceChildren(...visibleProducts.map(createProductCard));

  searchResultsCount.textContent = `${matches.length} ${matches.length === 1 ? "piece" : "pieces"} to explore`;
  noSearchResults.hidden = matches.length > 0;
  viewMoreButton.hidden = matches.length <= visibleCollectionCount;
  viewMoreButton.setAttribute("aria-expanded", String(showAllCollectionProducts));
  viewMoreButton.textContent = showAllCollectionProducts ? "View less" : "View more";
}

collectionSearch.addEventListener("input", () => {
  showAllCollectionProducts = false;
  renderCollectionResults();
});
const collectionSearchForm = document.querySelector(".collection-search-form");
collectionSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCollectionResults();
});
collectionSearchForm.addEventListener("reset", () => {
  requestAnimationFrame(renderCollectionResults);
});
viewMoreButton.addEventListener("click", () => {
  showAllCollectionProducts = !showAllCollectionProducts;
  renderCollectionResults();
});
renderCollectionResults();

document.querySelectorAll("#new-arrivals .product-card").forEach((card) => {
  addFavoriteControl(card, getProductFromCard(card));
});

document.querySelector(".mens-product-grid").replaceChildren(
  ...mensProducts.map(createProductCard),
);
document.querySelector(".beach-product-grid").replaceChildren(
  ...beachwearProducts.map(createProductCard),
);
document.querySelector(".gym-product-grid").replaceChildren(
  ...gymwearProducts.map(createProductCard),
);
renderFavorites();
renderCart();

document.querySelector("#current-year").textContent = new Date().getFullYear();

const newsletterForm = document.querySelector(".newsletter-form");
const formMessage = document.querySelector(".form-message");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;

  formMessage.textContent = "You're on the list. Thanks for being here!";
  newsletterForm.reset();
});
>>>>>>> b6d0279 (collection updated)
