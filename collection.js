const catalog = window.NOSTRA_CATALOG;
const allProducts = [
  ...catalog.women,
  ...catalog.men,
  ...catalog.beachwear,
  ...catalog.gymwear,
];

const productsGrid = document.querySelector(".collection-page-grid");
const queryInput = document.querySelector("#collection-page-query");
const categoryFilter = document.querySelector("#filter-category");
const sizeFilter = document.querySelector("#filter-size");
const priceFilter = document.querySelector("#filter-price");
const filtersForm = document.querySelector(".collection-filters");
const searchForm = document.querySelector(".collection-page-search");
const resultsCount = document.querySelector(".collection-page-count");
const emptyMessage = document.querySelector(".collection-page-empty");
const viewMoreButton = document.querySelector(".collection-view-more");
const favoritesCount = document.querySelector(".favorites-count");
const bagCount = document.querySelector(".bag-count");
const bagLink = document.querySelector(".bag-link");
const cartLayer = document.querySelector(".cart-layer");
const cartDrawer = document.querySelector(".cart-drawer");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartHeadingCount = document.querySelector(".cart-heading-count");
const cartSubtotal = document.querySelector(".cart-subtotal");
const cartCloseButton = document.querySelector(".cart-close");
const cartContinueButton = document.querySelector(".cart-continue");
const pageSize = 8;
let showAllProducts = false;
let lastFocusedElement = null;

const favoritesKey = "nostra-favorites";
const bagKey = "nostra-bag";
let favorites = new Set();
let bag = new Map();

function readStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.error(`Unable to read ${key} from this browser.`, error);
    return fallback;
  }
}

const savedFavorites = readStoredValue(favoritesKey, []);
if (Array.isArray(savedFavorites)) {
  favorites = new Map(
    savedFavorites
      .filter((product) => product && typeof product.id === "string")
      .map((product) => [product.id, product]),
  );
}

const savedBag = readStoredValue(bagKey, []);
if (Array.isArray(savedBag)) {
  bag = new Map(
    savedBag
      .filter((item) =>
        item &&
        item.product &&
        typeof item.id === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
      )
      .map((item) => [item.id, { product: item.product, quantity: item.quantity }]),
  );
}

function getProductId(product) {
  return product.image.split("?")[0];
}

function getBagId(product) {
  return `${getProductId(product)}::${product.size}`;
}

function getProductPrice(product) {
  const price = Number.parseFloat(product.price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(price)) throw new Error(`Invalid product price: ${product.price}`);
  return price;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  const productId = getProductId(product);
  const initialSize = product.sizes.includes("M") ? "M" : product.sizes[0];
  const sizeOptions = product.sizes
    .map((size) => `<option value="${size}"${size === initialSize ? " selected" : ""}>${size}</option>`)
    .join("");

  card.innerHTML = `
    <div class="product-media">
      <a class="product-image-link" href="index.html#bestsellers" aria-label="Shop ${product.name}">
        <img src="${product.image}" alt="${product.alt}" loading="lazy" />
        <span class="product-label">${product.label}</span>
      </a>
      <button
        class="favorite-button"
        type="button"
        data-favorite-id="${productId}"
        aria-pressed="${favorites.has(productId)}"
        aria-label="${favorites.has(productId) ? "Remove" : "Add"} ${product.name} ${favorites.has(productId) ? "from" : "to"} favorites"
      >${favorites.has(productId) ? "♥" : "♡"}</button>
      <button class="add-to-bag-button" type="button" aria-label="Add ${product.name} to bag">Add to bag</button>
    </div>
    <div class="product-info">
      <div><h3>${product.name}</h3><p>${product.detail}</p></div>
      <span class="product-price">${product.price}</span>
      <label class="product-size-field">
        Size
        <select class="product-size-select" aria-label="Choose size for ${product.name}">${sizeOptions}</select>
      </label>
    </div>
  `;
  return card;
}

function matchingProducts() {
  const terms = queryInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const category = categoryFilter.value;
  const size = sizeFilter.value;
  const priceRange = priceFilter.value;

  return allProducts.filter((product) => {
    const searchable = `${product.name} ${product.detail} ${product.keywords || ""} ${product.category}`.toLowerCase();
    if (!terms.every((term) => searchable.includes(term))) return false;
    if (category !== "all" && product.category !== category) return false;
    if (size !== "all" && !product.sizes.includes(size)) return false;

    const price = getProductPrice(product);
    if (priceRange === "under-75" && price >= 75) return false;
    if (priceRange === "75-100" && (price < 75 || price > 100)) return false;
    if (priceRange === "over-100" && price < 100) return false;
    return true;
  });
}

function renderProducts() {
  const matches = matchingProducts();
  const visible = showAllProducts ? matches : matches.slice(0, pageSize);
  productsGrid.replaceChildren(...visible.map(createProductCard));
  resultsCount.textContent = `${matches.length} ${matches.length === 1 ? "piece" : "pieces"}`;
  emptyMessage.hidden = matches.length > 0;
  viewMoreButton.hidden = matches.length <= pageSize;
  viewMoreButton.textContent = showAllProducts ? "View less" : "View more";
  viewMoreButton.setAttribute("aria-expanded", String(showAllProducts));
}

function saveFavorites() {
  try {
    localStorage.setItem(favoritesKey, JSON.stringify([...favorites.values()]));
  } catch (error) {
    console.error("Unable to save Nostra favorites.", error);
  }
  favoritesCount.textContent = String(favorites.size);
}

function saveBag() {
  try {
    localStorage.setItem(bagKey, JSON.stringify([...bag].map(([id, item]) => ({ id, ...item }))));
  } catch (error) {
    console.error("Unable to save the Nostra shopping bag.", error);
  }
}

function updateBagCount() {
  const count = [...bag.values()].reduce((total, item) => total + item.quantity, 0);
  bagCount.textContent = String(count);
  cartHeadingCount.textContent = `(${count})`;
  bagLink.setAttribute("aria-label", `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`);
}

function renderBag() {
  let subtotal = 0;
  const entries = [...bag.entries()];
  const rows = entries.map(([id, item]) => {
    const price = getProductPrice(item.product);
    subtotal += price * item.quantity;
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img class="cart-item-image" src="${item.product.image}" alt="${item.product.alt}" />
      <div class="cart-item-details">
        <h3>${item.product.name}</h3>
        <p>${item.product.detail}${item.product.size ? ` · Size ${item.product.size}` : ""}</p>
        <span class="cart-item-price">${formatPrice(price)}</span>
        <div class="cart-item-actions">
          <div class="cart-quantity" aria-label="Quantity for ${item.product.name}">
            <button type="button" data-cart-action="decrease" data-cart-id="${id}" aria-label="Decrease quantity of ${item.product.name}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-cart-id="${id}" aria-label="Increase quantity of ${item.product.name}">+</button>
          </div>
          <button class="cart-remove" type="button" data-cart-action="remove" data-cart-id="${id}">Remove</button>
        </div>
      </div>
      <span class="cart-line-total">${formatPrice(price * item.quantity)}</span>
    `;
    return row;
  });

  cartItems.replaceChildren(...rows);
  const count = [...bag.values()].reduce((total, item) => total + item.quantity, 0);
  cartItems.hidden = count === 0;
  cartEmpty.hidden = count > 0;
  cartSubtotal.textContent = formatPrice(subtotal);
  updateBagCount();
}

function openBag() {
  lastFocusedElement = document.activeElement;
  cartLayer.hidden = false;
  requestAnimationFrame(() => {
    cartLayer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartCloseButton.focus();
  });
}

function closeBag() {
  if (cartLayer.hidden) return;
  cartLayer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (cartLayer.classList.contains("is-open")) return;
    cartLayer.hidden = true;
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }, 350);
}

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const isOpen = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  document.querySelector(".main-navigation").classList.toggle("is-open", isOpen);
});

document.querySelector(".main-navigation").addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector(".menu-toggle").setAttribute("aria-label", "Open navigation");
    document.querySelector(".main-navigation").classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBag();
});

document.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-button");
  if (favoriteButton) {
    const id = favoriteButton.dataset.favoriteId;
    if (favorites.has(id)) favorites.delete(id);
    else {
      const product = allProducts.find((entry) => getProductId(entry) === id);
      if (!product) return;
      favorites.set(id, { ...product, id });
    }
    saveFavorites();
    const isFavorite = favorites.has(id);
    favoriteButton.textContent = isFavorite ? "♥" : "♡";
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.setAttribute(
      "aria-label",
      `${isFavorite ? "Remove" : "Add"} ${favoriteButton.closest(".product-card").querySelector("h3").textContent} ${isFavorite ? "from" : "to"} favorites`,
    );
    return;
  }

  const cartAction = event.target.closest("[data-cart-action]");
  if (cartAction) {
    const item = bag.get(cartAction.dataset.cartId);
    if (!item) return;
    if (cartAction.dataset.cartAction === "remove" ||
      (cartAction.dataset.cartAction === "decrease" && item.quantity === 1)) {
      bag.delete(cartAction.dataset.cartId);
    } else if (cartAction.dataset.cartAction === "decrease") {
      bag.set(cartAction.dataset.cartId, { ...item, quantity: item.quantity - 1 });
    } else {
      bag.set(cartAction.dataset.cartId, { ...item, quantity: item.quantity + 1 });
    }
    saveBag();
    renderBag();
    return;
  }

  if (event.target.closest(".bag-link")) {
    event.preventDefault();
    renderBag();
    openBag();
    return;
  }

  if (event.target.closest(".cart-close, .cart-backdrop, .cart-continue")) {
    closeBag();
    return;
  }

  const addButton = event.target.closest(".add-to-bag-button");
  if (!addButton) return;
  const card = addButton.closest(".product-card");
  const product = allProducts.find((entry) =>
    entry.name === card.querySelector("h3").textContent.trim(),
  );
  if (!product) return;

  const size = card.querySelector(".product-size-select").value;
  const selectedProduct = { ...product, size };
  const id = getBagId(selectedProduct);
  const existing = bag.get(id);
  bag.set(id, { product: selectedProduct, quantity: (existing?.quantity || 0) + 1 });
  saveBag();
  renderBag();
  addButton.textContent = "Added to bag";
  openBag();
  window.setTimeout(() => {
    if (addButton.isConnected) addButton.textContent = "Add to bag";
  }, 1400);
});

queryInput.addEventListener("input", () => {
  showAllProducts = false;
  renderProducts();
});

categoryFilter.addEventListener("change", renderProducts);
sizeFilter.addEventListener("change", renderProducts);
priceFilter.addEventListener("change", renderProducts);
filtersForm.addEventListener("reset", () => {
  requestAnimationFrame(renderProducts);
});
searchForm.addEventListener("reset", () => {
  requestAnimationFrame(renderProducts);
});
searchForm.addEventListener("submit", (event) => event.preventDefault());

viewMoreButton.addEventListener("click", () => {
  showAllProducts = !showAllProducts;
  renderProducts();
});

favoritesCount.textContent = String(favorites.size);
renderProducts();
renderBag();
document.querySelector("#current-year").textContent = new Date().getFullYear();
