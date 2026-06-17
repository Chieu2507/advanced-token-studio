// ==========================================
// 1. GLOBAL STATE (Bộ lưu trữ cấu trúc màu chuẩn hóa kèm Hover Tone phân tách)
// ==========================================
const fullThemeState = {
  light: {
    background: "#ffffff",
    headingText: "#0a0a0a",
    bodyText: "#404040",
    accent: "#171717",
    salePrice: "#c2410c",
    primaryButton_background: "#0a0a0a",
    primaryButton_label: "#ffffff",
    primaryButton_outline: "#0a0a0a",
    secondaryButton_background: "#ffffff",
    secondaryButton_label: "#0a0a0a",
    secondaryButton_outline: "#0a0a0a",
    tertiaryButton_label: "#0a0a0a",
    featuredCard_background: "#ffffff",
    featuredCard_borderColor: "#e5e5e5",
    productCard_background: "#ffffff",
    productCard_borderColor: "#e5e5e5",
    pricingCard_background: "#fafafa",
    pricingCard_borderColor: "#e5e5e5",
    ctaCard_background: "#fafafa",
    ctaCard_borderColor: "#e5e5e5",
    mediaCard_background: "#f5f5f5",
    mediaCard_borderColor: "#e5e5e5",
    formInput_background: "#ffffff",
    formInput_color: "#0a0a0a",
    formInput_borderColor: "#d4d4d4",
    saleBadge_background: "#0a0a0a",
    saleBadge_text: "#ffffff",
    soldOutBadge_background: "#737373",
    soldOutBadge_text: "#ffffff",
    tag1_background: "#f5f5f5",
    tag1_text: "#0a0a0a",
    tag2_background: "#0a0a0a",
    tag2_text: "#ffffff",
    // Hover Tone: Âm pha white, Dương pha black
    primaryButton_hover_background_tone: -15,
    primaryButton_hover_label_tone: 10,
    primaryButton_hover_outline_tone: -15,
    secondaryButton_hover_background_tone: 12,
    secondaryButton_hover_label_tone: -10,
    secondaryButton_hover_outline_tone: 12,
    tertiaryButton_hover_label_tone: 30,
  },
  dark: {
    background: "#0a0a0a",
    headingText: "#fafafa",
    bodyText: "#a3a3a3",
    accent: "#fafafa",
    salePrice: "#f97316",
    primaryButton_background: "#fafafa",
    primaryButton_label: "#0a0a0a",
    primaryButton_outline: "#fafafa",
    secondaryButton_background: "#0a0a0a",
    secondaryButton_label: "#fafafa",
    secondaryButton_outline: "#fafafa",
    tertiaryButton_label: "#fafafa",
    featuredCard_background: "#171717",
    featuredCard_borderColor: "#262626",
    productCard_background: "#171717",
    productCard_borderColor: "#262626",
    pricingCard_background: "#171717",
    pricingCard_borderColor: "#262626",
    ctaCard_background: "#171717",
    ctaCard_borderColor: "#262626",
    mediaCard_background: "#262626",
    mediaCard_borderColor: "#404040",
    formInput_background: "#171717",
    formInput_color: "#fafafa",
    formInput_borderColor: "#404040",
    saleBadge_background: "#fafafa",
    saleBadge_text: "#0a0a0a",
    soldOutBadge_background: "#404040",
    soldOutBadge_text: "#a3a3a3",
    tag1_background: "#262626",
    tag1_text: "#fafafa",
    tag2_background: "#fafafa",
    tag2_text: "#0a0a0a",
    primaryButton_hover_background_tone: 15,
    primaryButton_hover_label_tone: -10,
    primaryButton_hover_outline_tone: 15,
    secondaryButton_hover_background_tone: -15,
    secondaryButton_hover_label_tone: 10,
    secondaryButton_hover_outline_tone: -15,
    tertiaryButton_hover_label_tone: -25,
  },
  accent: {
    background: "#171717",
    headingText: "#ffffff",
    bodyText: "#d4d4d4",
    accent: "#ffffff",
    salePrice: "#fdba74",
    primaryButton_background: "#ffffff",
    primaryButton_label: "#171717",
    primaryButton_outline: "#ffffff",
    secondaryButton_background: "#171717",
    secondaryButton_label: "#ffffff",
    secondaryButton_outline: "#ffffff",
    tertiaryButton_label: "#ffffff",
    featuredCard_background: "#262626",
    featuredCard_borderColor: "#404040",
    productCard_background: "#262626",
    productCard_borderColor: "#404040",
    pricingCard_background: "#262626",
    pricingCard_borderColor: "#404040",
    ctaCard_background: "#262626",
    ctaCard_borderColor: "#404040",
    mediaCard_background: "#404040",
    mediaCard_borderColor: "#525252",
    formInput_background: "#262626",
    formInput_color: "#ffffff",
    formInput_borderColor: "#525252",
    saleBadge_background: "#ffffff",
    saleBadge_text: "#171717",
    soldOutBadge_background: "#525252",
    soldOutBadge_text: "#d4d4d4",
    tag1_background: "#404040",
    tag1_text: "#ffffff",
    tag2_background: "#ffffff",
    tag2_text: "#171717",
    primaryButton_hover_background_tone: -10,
    primaryButton_hover_label_tone: 15,
    primaryButton_hover_outline_tone: -10,
    secondaryButton_hover_background_tone: 20,
    secondaryButton_hover_label_tone: -15,
    secondaryButton_hover_outline_tone: 20,
    tertiaryButton_hover_label_tone: -15,
  },
};

let currentActiveScheme = "light";
let isThemeBuilderActive = false;
let saveBtn = null;

// ==========================================
// 2. CORE RENDERING ENGINE (Ánh xạ Token & Hình học)
// ==========================================

function applyTokensToPreview() {
  const state = fullThemeState[currentActiveScheme];
  const canvas = document.getElementById("previewCanvas");

  if (!canvas) return;

  // 1. Core Background & Text
  canvas.style.backgroundColor = state.background;
  
  const dynH1 = document.getElementById("dyn-h1");
  if (dynH1) dynH1.style.color = state.headingText;
  
  const dynP = document.getElementById("dyn-p");
  if (dynP) dynP.style.color = state.bodyText;

  document.querySelectorAll('.demo-section-title, .card-head-txt').forEach(el => {
    el.style.color = state.headingText;
  });
  
  document.querySelectorAll(".card-body-txt").forEach(el => {
    el.style.color = state.bodyText;
  });

  const dynPrice = document.getElementById("dyn-price");
  if (dynPrice) dynPrice.style.color = state.salePrice;
  
  const oldPrice = document.getElementById('dyn-old-price');
  if (oldPrice) {
    oldPrice.style.color = state.bodyText;
    oldPrice.style.opacity = '0.7';
  }

  // 2. Buttons Style Normal
  const pBtn = document.getElementById("p-btn");
  if (pBtn) {
    pBtn.style.backgroundColor = state.primaryButton_background;
    pBtn.style.color = state.primaryButton_label;
    pBtn.style.borderColor = state.primaryButton_outline;
  }

  const pricingBtn = document.getElementById("pricing-primary-btn");
  if (pricingBtn) {
    pricingBtn.style.backgroundColor = state.primaryButton_background;
    pricingBtn.style.color = state.primaryButton_label;
    pricingBtn.style.borderColor = state.primaryButton_outline;
  }

  const sBtn = document.getElementById("s-btn");
  if (sBtn) {
    sBtn.style.backgroundColor = state.secondaryButton_background;
    sBtn.style.color = state.secondaryButton_label;
    sBtn.style.borderColor = state.secondaryButton_outline;
  }

  const tBtn = document.getElementById("t-btn");
  if (tBtn) {
    tBtn.style.color = state.tertiaryButton_label;
  }

  // 3. Inject toán học Hover Tone vào CSS Variables trên Canvas
  // Primary Button Hover CSS Variables
  canvas.style.setProperty('--beae-btn-pr-bg', state.primaryButton_background);
  canvas.style.setProperty('--beae-btn-pr-bg-mix-target', state.primaryButton_hover_background_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-pr-bg-tone-abs', Math.abs(state.primaryButton_hover_background_tone));

  canvas.style.setProperty('--beae-btn-pr-lbl', state.primaryButton_label);
  canvas.style.setProperty('--beae-btn-pr-lbl-mix-target', state.primaryButton_hover_label_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-pr-lbl-tone-abs', Math.abs(state.primaryButton_hover_label_tone));

  canvas.style.setProperty('--beae-btn-pr-outline', state.primaryButton_outline);
  canvas.style.setProperty('--beae-btn-pr-outline-mix-target', state.primaryButton_hover_outline_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-pr-outline-tone-abs', Math.abs(state.primaryButton_hover_outline_tone));

  // Secondary Button Hover CSS Variables
  canvas.style.setProperty('--beae-btn-se-bg', state.secondaryButton_background);
  canvas.style.setProperty('--beae-btn-se-bg-mix-target', state.secondaryButton_hover_background_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-se-bg-tone-abs', Math.abs(state.secondaryButton_hover_background_tone));

  canvas.style.setProperty('--beae-btn-se-lbl', state.secondaryButton_label);
  canvas.style.setProperty('--beae-btn-se-lbl-mix-target', state.secondaryButton_hover_label_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-se-lbl-tone-abs', Math.abs(state.secondaryButton_hover_label_tone));

  canvas.style.setProperty('--beae-btn-se-outline', state.secondaryButton_outline);
  canvas.style.setProperty('--beae-btn-se-outline-mix-target', state.secondaryButton_hover_outline_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-se-outline-tone-abs', Math.abs(state.secondaryButton_hover_outline_tone));

  // Tertiary Button Hover CSS Variables
  canvas.style.setProperty('--beae-btn-te-lbl', state.tertiaryButton_label);
  canvas.style.setProperty('--beae-btn-te-lbl-mix-target', state.tertiaryButton_hover_label_tone < 0 ? 'white' : 'black');
  canvas.style.setProperty('--beae-btn-te-lbl-tone-abs', Math.abs(state.tertiaryButton_hover_label_tone));

  // 4. Card Mapped Surfaces
  const fCard = document.getElementById("f-card");
  if (fCard) {
    fCard.style.backgroundColor = state.featuredCard_background;
    fCard.style.borderColor = state.featuredCard_borderColor;
  }
  
  const prodCard = document.getElementById("prod-card");
  if (prodCard) {
    prodCard.style.backgroundColor = state.productCard_background;
    prodCard.style.borderColor = state.productCard_borderColor;
  }
  
  const pricingCard = document.getElementById("pricing-card");
  if (pricingCard) {
    pricingCard.style.backgroundColor = state.pricingCard_background;
    pricingCard.style.borderColor = state.pricingCard_borderColor;
  }
  
  const pricingPrice = document.getElementById("pricing-price");
  if (pricingPrice) pricingPrice.style.color = state.salePrice;

  const ctaCard = document.getElementById("cta-card");
  if (ctaCard) {
    ctaCard.style.backgroundColor = state.ctaCard_background;
    ctaCard.style.borderColor = state.ctaCard_borderColor;
  }

  const mediaCard = document.getElementById("media-card");
  if (mediaCard) {
    mediaCard.style.backgroundColor = state.mediaCard_background; 
    mediaCard.style.borderColor = state.mediaCard_borderColor;
  }

  // 5. Form Elements Mapped Surfaces
  const fInput = document.getElementById("demo-form-input");
  const fSelect = document.getElementById("demo-form-select");
  [fInput, fSelect].forEach((el) => {
    if (el) {
      el.style.backgroundColor = state.formInput_background;
      el.style.color = state.formInput_color;
      el.style.borderColor = state.formInput_borderColor;
    }
  });

  // 6. Badges & System Tags Mapped Surfaces
  const bSale = document.getElementById("b-sale");
  if (bSale) {
    bSale.style.backgroundColor = state.saleBadge_background;
    bSale.style.color = state.saleBadge_text;
  }
  const bSold = document.getElementById("b-sold");
  if (bSold) {
    bSold.style.backgroundColor = state.soldOutBadge_background;
    bSold.style.color = state.soldOutBadge_text;
  }
  const t1Badge = document.getElementById("t1-badge");
  if (t1Badge) {
    t1Badge.style.backgroundColor = state.tag1_background;
    t1Badge.style.color = state.tag1_text;
  }
  const t2Badge = document.getElementById("t2-badge");
  if (t2Badge) {
    t2Badge.style.backgroundColor = state.tag2_background;
    t2Badge.style.color = state.tag2_text;
  }

  // Áp dụng luôn trục hình học hình khối
  applyGeometryTokens();
}

function applyGeometryTokens() {
  const sizeEl = document.getElementById("btn-global-size");
  if (!sizeEl) return; // Bảo vệ nếu DOM chưa sẵn sàng hoàn toàn

  const fontSize = sizeEl.value + "px";
  const letterSpacing = document.getElementById("btn-global-spacing").value;
  const fontWeight = document.getElementById("btn-global-weight").value;
  const height = document.getElementById("btn-geo-height").value + "px";
  const padding = document.getElementById("btn-geo-padding").value + "px";
  const borderRadius = document.getElementById("btn-geo-radius").value + "px";

  const prBorder = document.getElementById("btn-pr-border").value + "px";
  const prShadowY = document.getElementById("btn-pr-shadow-y").value + "px";
  const prShadowBlur = document.getElementById("btn-pr-shadow-blur").value + "px";
  const prShadowColor = `rgba(0,0,0,${document.getElementById("btn-pr-shadow-opacity").value})`;

  const seBorder = document.getElementById("btn-se-border").value + "px";
  const seShadowY = document.getElementById("btn-se-shadow-y").value + "px";
  const seShadowBlur = document.getElementById("btn-se-shadow-blur").value + "px";
  const seShadowColor = `rgba(0,0,0,${document.getElementById("btn-se-shadow-opacity").value})`;

  const teUnderline = document.getElementById("btn-te-underline").value;
  const teOffset = document.getElementById("btn-te-offset").value + "px";

  const pBtn = document.getElementById("p-btn");
  const sBtn = document.getElementById("s-btn");
  const tBtn = document.getElementById("t-btn");
  const pricingBtn = document.getElementById("pricing-primary-btn");

  [pBtn, sBtn, tBtn].forEach((btn) => {
    if (btn) {
      btn.style.fontSize = fontSize;
      btn.style.letterSpacing = letterSpacing;
      btn.style.fontWeight = fontWeight;
    }
  });
  [pBtn, sBtn, pricingBtn].forEach((btn) => {
    if (btn) {
      btn.style.height = height;
      btn.style.paddingLeft = padding;
      btn.style.paddingRight = padding;
      btn.style.borderRadius = borderRadius;
    }
  });
  if (pBtn) {
    pBtn.style.borderWidth = prBorder;
    pBtn.style.boxShadow = `0 ${prShadowY} ${prShadowBlur} ${prShadowColor}`;
  }
  if (pricingBtn) {
    pricingBtn.style.borderWidth = prBorder;
    pricingBtn.style.boxShadow = `0 ${prShadowY} ${prShadowBlur} ${prShadowColor}`;
  }
  if (sBtn) {
    sBtn.style.borderWidth = seBorder;
    sBtn.style.boxShadow = `0 ${seShadowY} ${seShadowBlur} ${seShadowColor}`;
  }
  if (tBtn) {
    tBtn.style.textDecoration = teUnderline;
    tBtn.style.textUnderlineOffset = teOffset;
  }

  const demoGrid = document.getElementById("demo-grid");
  if (demoGrid) {
    const gridGapUnits = document.getElementById("space-grid-gap-desk").value;
    demoGrid.style.gap = gridGapUnits * 4 + "px";
  }

  const fCard = document.getElementById("f-card");
  if (fCard) {
    fCard.style.borderWidth = document.getElementById("card-feat-border").value + "px";
    fCard.style.borderRadius = document.getElementById("card-feat-radius").value + "px";
    fCard.style.padding = document.getElementById("card-feat-padding").value * 4 + "px";
    fCard.style.gap = document.getElementById("card-feat-gap").value * 4 + "px";
  }

  const prodCard = document.getElementById("prod-card");
  if (prodCard) {
    prodCard.style.borderWidth = document.getElementById("card-prod-border").value + "px";
    prodCard.style.borderRadius = document.getElementById("card-prod-radius").value + "px";
    prodCard.style.padding = document.getElementById("card-prod-padding").value * 4 + "px";
    prodCard.style.gap = document.getElementById("card-prod-gap").value * 4 + "px";
  }

  const pricingCard = document.getElementById("pricing-card");
  if (pricingCard) {
    pricingCard.style.borderWidth = document.getElementById("card-pricing-border").value + "px";
    pricingCard.style.borderRadius = document.getElementById("card-pricing-radius").value + "px";
    pricingCard.style.padding = document.getElementById("card-pricing-padding").value * 4 + "px";
    pricingCard.style.gap = document.getElementById("card-pricing-gap").value * 4 + "px";
  }

  const ctaCard = document.getElementById("cta-card");
  if (ctaCard) {
    ctaCard.style.borderWidth = document.getElementById("card-cta-border").value + "px";
    ctaCard.style.borderRadius = document.getElementById("card-cta-radius").value + "px";
    ctaCard.style.padding = document.getElementById("card-cta-padding").value * 4 + "px";
    ctaCard.style.gap = document.getElementById("card-cta-gap").value * 4 + "px";
  }

  const mediaCard = document.getElementById("media-card");
  if (mediaCard) {
    mediaCard.style.borderWidth = document.getElementById("card-media-border").value + "px";
    mediaCard.style.borderRadius = document.getElementById("card-media-radius").value + "px";
    mediaCard.style.padding = document.getElementById("card-media-padding").value * 4 + "px";
    mediaCard.style.gap = document.getElementById("card-media-gap").value * 4 + "px";
  }

  const fInput = document.getElementById("demo-form-input");
  const fSelect = document.getElementById("demo-form-select");
  if (fInput && fSelect) {
    const formBorder = document.getElementById("form-input-border").value + "px";
    const formRadius = document.getElementById("form-input-radius").value + "px";
    const formPadding = document.getElementById("form-input-padding").value * 2 + "px";
    const formHeight = document.getElementById("form-input-height").value * 12 + "px"; 
    [fInput, fSelect].forEach((el) => {
      el.style.borderWidth = formBorder;
      el.style.borderRadius = formRadius;
      el.style.padding = formPadding;
      el.style.height = formHeight;
    });
  }

  const badgeBorder = document.getElementById("badge-default-border").value + "px";
  const badgeRadius = document.getElementById("badge-default-radius").value + "px";
  const badgePadUnit = document.getElementById("badge-default-padding").value;
  document.querySelectorAll(".badge-style, .tag-style").forEach((badge) => {
    badge.style.borderWidth = badgeBorder;
    badge.style.borderRadius = badgeRadius;
    badge.style.padding = `${badgePadUnit * 3}px ${badgePadUnit * 8}px`;
  });
}

// ==========================================
// 3. DATA SYNCHRONIZATION (Đồng bộ ngược State lên Inputs)
// ==========================================

function syncInputsFromState() {
  const state = fullThemeState[currentActiveScheme];
  Object.keys(state).forEach((tokenKey) => {
    // Sync các ô chỉnh màu gốc (Hex/Color Picker)
    const colorPickers = document.querySelectorAll(`.color-preview[data-token="${tokenKey}"]`);
    const textInputs = document.querySelectorAll(`.hex-input[data-token="${tokenKey}"]`);
    colorPickers.forEach((p) => (p.value = state[tokenKey]));
    textInputs.forEach((t) => (t.value = state[tokenKey]));

    // Sync thanh trượt Tone của Hover
    if (tokenKey.endsWith('_tone')) {
      const sliders = document.querySelectorAll(`.tone-slider[data-token="${tokenKey}"]`);
      sliders.forEach((slider) => {
        slider.value = state[tokenKey];
        const displaySign = state[tokenKey] > 0 ? "+" : "";
        const displayEl = document.getElementById(`display-${tokenKey}`);
        if (displayEl) {
          displayEl.innerText = `${displaySign}${state[tokenKey]}%`;
        }
      });
    }
  });
}

// ==========================================
// 4. EVENT CONTROLLERS & INTERACTION SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const themeBuilderBtn = document.getElementById("edit-toggle-btn");
  const axisMenuContent = document.querySelector(".axis-menu-content");
  const personalityMenuContent = document.querySelector(".theme-list-content");
  const configPanelContent = document.querySelector(".config-panel-content");
  const tbAxisOptionsContent = document.querySelector(".tb-axis-options-content");

  // Khởi tạo trạng thái ban đầu của Preview Canvas
  syncInputsFromState();
  applyTokensToPreview();

  // --- TRỤC ĐIỀU KHIỂN BUILDER PANEL (ON / OFF) ---
  if (themeBuilderBtn) {
    themeBuilderBtn.addEventListener("click", () => {
      if (!isThemeBuilderActive) {
        isThemeBuilderActive = true;
        themeBuilderBtn.classList.add("cancel-btn");
        
        if (axisMenuContent) axisMenuContent.style.display = "block";
        if (configPanelContent) configPanelContent.style.display = "block";
        if (personalityMenuContent) {
          personalityMenuContent.style.display = "none";
          personalityMenuContent.classList.remove("open");
        }
        if (tbAxisOptionsContent) {
          tbAxisOptionsContent.style.display = "block";
          tbAxisOptionsContent.classList.add("open");
        }
        initChangeListeners();
      } else {
        isThemeBuilderActive = false;
        themeBuilderBtn.classList.remove("cancel-btn");
        
        if (axisMenuContent) axisMenuContent.style.display = "none";
        if (configPanelContent) configPanelContent.style.display = "none";
        if (personalityMenuContent) {
          personalityMenuContent.style.display = "block";
          personalityMenuContent.classList.add("open");
        }
        if (tbAxisOptionsContent) {
          tbAxisOptionsContent.style.display = "";
          tbAxisOptionsContent.classList.remove("open");
        }
        removeSaveButton();
      }
    });
  }

  // --- QUAN SÁT SỰ THAY ĐỔI ĐỂ TẠO NÚT SAVE BIÊN TẬP ---
  function showSaveButton() {
    if (saveBtn || !themeBuilderBtn) return;

    saveBtn = document.createElement("button");
    saveBtn.id = "tb-save-btn";
    saveBtn.innerText = "Save";
    saveBtn.className = "toolbar-btn save-btn"; 

    themeBuilderBtn.parentNode.insertBefore(saveBtn, themeBuilderBtn);

    saveBtn.addEventListener("click", () => {
      alert("Đã lưu cấu hình thành công!");
      removeSaveButton();
    });
  }

  function removeSaveButton() {
    if (saveBtn) {
      saveBtn.remove();
      saveBtn = null;
    }
  }

  function initChangeListeners() {
    document.querySelectorAll(".personality-item").forEach(item => {
      item.removeEventListener("click", handleUserChange);
      item.addEventListener("click", handleUserChange);
    });

    document.querySelectorAll(".scheme-visual-card, input[type='color'], .hex-input, .tone-slider").forEach(el => {
      const eventType = el.tagName === "INPUT" ? "input" : "click";
      el.removeEventListener(eventType, handleUserChange);
      el.addEventListener(eventType, handleUserChange);
    });
  }

  function handleUserChange() {
    if (isThemeBuilderActive) {
      showSaveButton();
    }
  }

  // --- EVENT: THANH TRƯỢT HOVER TONE SLIDERS ---
  document.querySelectorAll(".tone-slider").forEach((slider) => {
    slider.addEventListener("input", (e) => {
      const token = e.target.getAttribute("data-token");
      const val = parseInt(e.target.value);
      
      fullThemeState[currentActiveScheme][token] = val;
      
      const displaySign = val > 0 ? "+" : "";
      const displayEl = document.getElementById(`display-${token}`);
      if (displayEl) displayEl.innerText = `${displaySign}${val}%`;
      
      applyTokensToPreview();
    });
  });

  // --- EVENT: CHUYỂN SUB-TAB NORMAL / HOVER CHO BUTTONS ---
  document.querySelectorAll(".sub-tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parentContainer = e.target.closest(".accordion-content");
      if (!parentContainer) return;
      
      parentContainer.querySelectorAll(".sub-tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.style.background = "transparent";
          b.style.color = "#737373";
      });
      btn.classList.add("active");
      btn.style.background = "#ffffff";
      btn.style.color = "#0a0a0a";
      
      const stateType = btn.getAttribute("data-state");
      const normalPane = parentContainer.querySelector("#pane-btn-normal");
      const hoverPane = parentContainer.querySelector("#pane-btn-hover");
      
      if (normalPane && hoverPane) {
        if (stateType === "normal") {
          normalPane.style.display = "flex";
          hoverPane.style.display = "none";
        } else {
          normalPane.style.display = "none";
          hoverPane.style.display = "flex";
        }
      }
    });
  });

  // --- EVENT: ĐỔI TRẠNG THÁI SURFACE SCHEME (LIGHT / DARK / ACCENT) ---
  document.querySelectorAll(".scheme-visual-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".scheme-visual-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      currentActiveScheme = card.getAttribute("data-scheme");
      syncInputsFromState();
      applyTokensToPreview();
    });
  });

  // --- EVENT: CHỈNH SỬA Ô NHẬP MÀU SẮC (HEX VÀ COLOR PICKER) ---
  document.querySelectorAll(".color-preview").forEach((picker) => {
    picker.addEventListener("input", (e) => {
      const token = e.target.getAttribute("data-token");
      const val = e.target.value;
      document.querySelectorAll(`.hex-input[data-token="${token}"]`).forEach((t) => (t.value = val));
      fullThemeState[currentActiveScheme][token] = val;
      applyTokensToPreview();
    });
  });

  document.querySelectorAll(".hex-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const token = e.target.getAttribute("data-token");
      const val = e.target.value;
      if (val.length === 7 && val.startsWith("#")) {
        document.querySelectorAll(`.color-preview[data-token="${token}"]`).forEach((p) => (p.value = val));
        fullThemeState[currentActiveScheme][token] = val;
        applyTokensToPreview();
      }
    });
  });

  // --- EVENT: ĐIỀU KHIỂN CHUYỂN TRỤC CHỨC NĂNG (AXIS SWITCHER) ---
  const axisItems = document.querySelectorAll("#axisMenu .axis-item");
  const contentSections = document.querySelectorAll(".axis-content-section");
  const conditionalHeaders = {
    colors: document.getElementById("surface-selector-wrapper"),
    typography: document.getElementById("font-selector-wrapper"),
    buttons: document.getElementById("blueprint-buttons-header"),
    cards: document.getElementById("blueprint-cards-header"),
    spacing: document.getElementById("blueprint-spacing-header"),
    form: document.getElementById("blueprint-form-header"),
    badge: document.getElementById("blueprint-badge-header"),
  };

  axisItems.forEach((item) => {
    item.addEventListener("click", () => {
      axisItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      contentSections.forEach((s) => s.classList.remove("active"));
      const targetAxis = item.getAttribute("data-target");
      const targetSection = document.getElementById(`axis-${targetAxis}`);
      if (targetSection) targetSection.classList.add("active");

      Object.keys(conditionalHeaders).forEach((key) => {
        if (conditionalHeaders[key]) conditionalHeaders[key].style.display = "none";
      });

      if (conditionalHeaders[targetAxis]) {
        conditionalHeaders[targetAxis].style.display =
          targetAxis === "colors" || targetAxis === "typography" ? "block" : "flex";
      }
    });
  });

  // --- EVENT: CHUYỂN SUB VARIANT TABS TRONG CÁC TRỤC HÌNH HỌC ---
  document.querySelectorAll(".variant-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const parent = tab.parentElement;
      parent.querySelectorAll(".variant-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const targetVariant = tab.getAttribute("data-variant");
      const section = tab.closest(".axis-content-section");
      if (section) {
        section.querySelectorAll(".variant-config-pane").forEach((p) => p.classList.remove("active"));
        const targetPane = section.querySelector(`#pane-${targetVariant}`);
        if (targetPane) targetPane.classList.add("active");
      }
    });
  });

  // --- EVENT: LẮNG NGHE INPUTS SỐ, SELECT, TEXT ĐỂ RENDER HÌNH HỌC THỜI GIAN THỰC ---
  document.querySelectorAll(".number-input, .select-input, .text-input").forEach((input) => {
      input.addEventListener("input", applyGeometryTokens);
      input.addEventListener("change", applyGeometryTokens);
  }); 

  // --- EVENT: THAY ĐỔI FONT CHỮ GLOBAL ---
  document.querySelectorAll(".font-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("change", (e) => {
      const targetFont = e.target.getAttribute("data-target-font");
      const selectedFont = e.target.value;
      if (targetFont === "heading") {
        const dynH1 = document.getElementById("dyn-h1");
        if (dynH1) dynH1.style.fontFamily = selectedFont;
        const subH1 = document.getElementById("sub-h1");
        if (subH1) subH1.innerText = `${selectedFont}, 56px, 600, Line: 1.1`;
      } else if (targetFont === "body") {
        const dynP = document.getElementById("dyn-p");
        if (dynP) dynP.style.fontFamily = selectedFont;
        const subP = document.getElementById("sub-p");
        if (subP) subP.innerText = `${selectedFont}, 18px, 400, Line: 1.6`;
      }
    });
  });

  // --- EVENT: ACCORDION TOGGLE ĐÓNG/MỞ DANH MỤC ---
  document.querySelectorAll(".accordion-header").forEach((h) => {
    h.addEventListener("click", () => {
      const content = h.nextElementSibling;
      if (content) {
        content.style.display = content.style.display === "none" || content.style.display === "" ? "flex" : "none";
      }
    });
  });
});