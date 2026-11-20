const products = [
  {
    id: "revitalift-serum",
    name: "Revitalift 1.5% Pure Hyaluronic Acid Serum",
    category: "Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=85",
    description: "A hydrating serum formulated with 1.5% pure hyaluronic acid to help plump the look of skin and reduce the appearance of fine lines.",
  },
  {
    id: "micellar-water",
    name: "Micellar Cleansing Water",
    category: "Cleanser",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=400&q=85",
    description: "A gentle no-rinse cleanser that lifts makeup, oil, and impurities while respecting the skin's natural moisture barrier.",
  },
  {
    id: "bright-reveal",
    name: "Bright Reveal Dark Spot Exfoliant",
    category: "Exfoliant",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=85",
    description: "An exfoliating treatment designed to help improve skin tone and visibly reduce dark spots and uneven texture.",
  },
  {
    id: "uv-fluid",
    name: "UV Defender Daily Invisible Fluid",
    category: "Sunscreen",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=85",
    description: "A lightweight broad-spectrum daily facial sunscreen that helps protect skin from UV damage without a heavy finish.",
  },
  {
    id: "revitalift-cream",
    name: "Revitalift Anti-Wrinkle Firming Cream",
    category: "Moisturizer",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=85",
    description: "A smoothing moisturizer that helps firm the feel of skin and visibly soften the appearance of wrinkles.",
  },
  {
    id: "glycolic-cleanser",
    name: "Glycolic-BHA Daily Peeling Toner",
    category: "Treatment",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=85",
    description: "A resurfacing toner with glycolic acid and BHA to help refine pores and improve skin texture. Use gradually and avoid mixing with additional exfoliating actives.",
  },
];

const productTranslations = {
  es: {
    "revitalift-serum": ["Sérum Revitalift Ácido Hialurónico Puro 1.5%", "Sérum", "Un sérum hidratante formulado con ácido hialurónico puro al 1.5% para ayudar a rellenar la piel y reducir líneas finas."],
    "micellar-water": ["Agua Micelar Limpiadora", "Limpiador", "Un limpiador suave sin aclarado que elimina maquillaje, grasa e impurezas mientras respeta la barrera natural de la piel."],
    "bright-reveal": ["Bright Reveal Exfoliante para Manchas Oscuras", "Exfoliante", "Un tratamiento exfoliante que ayuda a mejorar el tono de la piel y reduce visiblemente manchas oscuras y textura irregular."],
    "uv-fluid": ["UV Defender Fluido Invisible Diario", "Protector solar", "Un protector solar facial ligero de amplio espectro que ayuda a proteger la piel del daño UV con un acabado invisible."],
    "revitalift-cream": ["Crema Reafirmante Antarrugas Revitalift", "Hidratante", "Una crema suavizante que ayuda a reafirmar la piel y reduce visiblemente la apariencia de arrugas."],
    "glycolic-cleanser": ["Tónico Peel Diario con Ácido Glicólico-BHA", "Tratamiento", "Un tónico renovador con ácido glicólico y BHA que ayuda a perfeccionar los poros y mejorar la textura."],
  },
  zh: {
    "revitalift-serum": ["Revitalift 1.5% 纯玻尿酸精华", "精华液", "含有1.5%纯玻尿酸的保湿精华，可帮助饱满肌肤、减少细纹外观。"],
    "micellar-water": ["卸妆洁肤水", "洁面", "温和无需冲洗的卸妆水，可清除彩妆、油脂和杂质，同时呵护肌肤天然屏障。"],
    "bright-reveal": ["亮白焕采暗斑去角质产品", "去角质", "有助于改善肤色、淡化暗斑并提升肌肤质感的焕肤护理。"],
    "uv-fluid": ["UV Defender 隐形防晒日间乳", "防晒", "轻薄广谱防晒乳，可帮助抵御紫外线损伤，妆感清透。"],
    "revitalift-cream": ["Revitalift 抗皱紧致面霜", "保湿霜", "帮助提升肌肤紧致感，并淡化皱纹外观的平滑型保湿霜。"],
    "glycolic-cleanser": ["乙醇酸-BHA 日常焕肤爽肤水", "护理", "含乙醇酸和BHA的焕肤水，可帮助细致毛孔并改善肌肤质地。"],
  },
  pt: {
    "revitalift-serum": ["Sérum Revitalift Ácido Hialurônico Puro 1.5%", "Sérum", "Um sérum hidratante com 1.5% de ácido hialurônico puro para ajudar a preencher a pele e suavizar linhas finas."],
    "micellar-water": ["Água Micelar de Limpeza", "Limpeza", "Um limpador suave que remove maquiagem, oleosidade e impurezas sem enxágue, respeitando a barreira natural da pele."],
    "bright-reveal": ["Bright Reveal Esfoliante para Manchas", "Esfoliante", "Um tratamento esfoliante que ajuda a uniformizar o tom da pele e reduzir visivelmente manchas escuras e textura irregular."],
    "uv-fluid": ["UV Defender Fluido Invisível Diário", "Protetor solar", "Um protetor solar facial leve de amplo espectro que ajuda a proteger contra danos UV com acabamento discreto."],
    "revitalift-cream": ["Creme Firmador Antirrugas Revitalift", "Hidratante", "Um creme suavizante que ajuda a firmar a pele e reduzir visivelmente a aparência de rugas."],
    "glycolic-cleanser": ["Tônico Peeling Diário Glicólico-BHA", "Tratamento", "Um tônico renovador com ácido glicólico e BHA que ajuda a refinar poros e melhorar a textura da pele."],
  },
};

function localizedProduct(product) {
  if (currentLanguage === "en") return product;
  const translated = productTranslations[currentLanguage]?.[product.id];
  return translated ? { ...product, name: translated[0], category: translated[1], description: translated[2] } : product;
}

const selected = new Set();
const grid = document.querySelector("#product-grid");
const selectedList = document.querySelector("#selected-list");
const selectionCount = document.querySelector("#selection-count");
const generateButton = document.querySelector("#generate-button");
const chat = document.querySelector("#chat");
const chatMessages = document.querySelector("#chat-messages");
const closeChat = document.querySelector("#close-chat");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatSend = document.querySelector("#chat-send");
const clearSelectionButton = document.querySelector("#clear-selection");
const productDialog = document.querySelector("#product-dialog");
const dialogName = document.querySelector("#dialog-name");
const dialogCategory = document.querySelector("#dialog-category");
const dialogDescription = document.querySelector("#dialog-description");
const dialogClose = document.querySelector("#dialog-close");
const productSearch = document.querySelector("#product-search");
const categoryFilters = document.querySelector("#category-filters");
const noResults = document.querySelector("#no-results");
const languageSelect = document.querySelector("#language-select");
const floatingChatToggle = document.querySelector("#floating-chat-toggle");
const floatingChatPanel = document.querySelector("#floating-chat-panel");
const floatingChatClose = document.querySelector("#floating-chat-close");
const floatingChatForm = document.querySelector("#floating-chat-form");
const floatingChatInput = document.querySelector("#floating-chat-input");
const floatingChatMessages = document.querySelector("#floating-chat-messages");
let conversation = [];
let floatingConversation = [];
let activeCategory = "All";
const flippedProducts = new Set();

const storageKey = "loreal-routine-selected-products";
const languageStorageKey = "loreal-routine-language";
let currentLanguage = localStorage.getItem(languageStorageKey) || "en";

const translations = {
  en: {
    eyebrow: "SKINCARE ROUTINE", heroTitle: "Build your perfect routine",
    intro: "Choose the products you use, and we'll organize them into a simple daily routine.",
    step: "STEP 1 OF 2", chooseProducts: "Choose your products", clearAll: "Clear all",
    searchProducts: "Search products", searchPlaceholder: "Search by name or keyword",
    noResults: "No matching products found.", selectedProducts: "Your selected products",
    generateRoutine: "Generate my routine", yourPlan: "YOUR PERSONALIZED PLAN", yourRoutine: "Your routine",
    followUpLabel: "Ask a follow-up question", followUpPlaceholder: "Ask a follow-up...",
    send: "Send", beautyLabel: "LOREAL BEAUTY", assistantTitle: "Skincare Assistant",
    assistantGreeting: "Hi! Ask me about skincare or your selected routine.",
    assistantLabel: "Ask the skincare assistant", assistantPlaceholder: "Ask a question...",
    chat: "Chat", sources: "Sources", thinking: "Thinking...", generating: "Generating...",
    selectedCount: (count) => `${count} selected`, noSelected: "No products selected",
    senderYou: "You", senderAssistant: "Assistant",
  },
  es: {
    eyebrow: "RUTINA DE CUIDADO DE LA PIEL", heroTitle: "Crea tu rutina perfecta",
    intro: "Elige los productos que usas y te ayudaremos a organizarlos en una rutina diaria sencilla.",
    step: "PASO 1 DE 2", chooseProducts: "Elige tus productos", clearAll: "Borrar todo",
    searchProducts: "Buscar productos", searchPlaceholder: "Busca por nombre o palabra clave",
    noResults: "No se encontraron productos.", selectedProducts: "Tus productos seleccionados",
    generateRoutine: "Crear mi rutina", yourPlan: "TU PLAN PERSONALIZADO", yourRoutine: "Tu rutina",
    followUpLabel: "Haz una pregunta de seguimiento", followUpPlaceholder: "Haz una pregunta...",
    send: "Enviar", beautyLabel: "LOREAL BEAUTY", assistantTitle: "Asistente de cuidado de la piel",
    assistantGreeting: "¡Hola! Pregúntame sobre el cuidado de la piel o tu rutina seleccionada.",
    assistantLabel: "Pregunta al asistente", assistantPlaceholder: "Haz una pregunta...",
    chat: "Chat", sources: "Fuentes", thinking: "Pensando...", generating: "Creando...",
    selectedCount: (count) => `${count} seleccionados`, noSelected: "No hay productos seleccionados",
    senderYou: "Tú", senderAssistant: "Asistente",
  },
  zh: {
    eyebrow: "护肤日常", heroTitle: "打造您的专属护肤流程",
    intro: "选择您使用的产品，我们会将它们整理成简单的日常护肤步骤。",
    step: "第 1 步，共 2 步", chooseProducts: "选择您的产品", clearAll: "全部清除",
    searchProducts: "搜索产品", searchPlaceholder: "按名称或关键词搜索",
    noResults: "未找到匹配的产品。", selectedProducts: "您选择的产品",
    generateRoutine: "生成我的护肤流程", yourPlan: "您的个性化方案", yourRoutine: "您的护肤流程",
    followUpLabel: "提出后续问题", followUpPlaceholder: "提出问题...",
    send: "发送", beautyLabel: "LOREAL BEAUTY", assistantTitle: "护肤助手",
    assistantGreeting: "你好！可以询问护肤问题或您选择的护肤流程。",
    assistantLabel: "询问护肤助手", assistantPlaceholder: "请输入问题...",
    chat: "聊天", sources: "来源", thinking: "正在思考...", generating: "正在生成...",
    selectedCount: (count) => `已选择 ${count} 件`, noSelected: "未选择任何产品",
    senderYou: "你", senderAssistant: "助手",
  },
  pt: {
    eyebrow: "ROTINA DE CUIDADOS COM A PELE", heroTitle: "Crie sua rotina perfeita",
    intro: "Escolha os produtos que você usa e nós os organizaremos em uma rotina diária simples.",
    step: "ETAPA 1 DE 2", chooseProducts: "Escolha seus produtos", clearAll: "Limpar tudo",
    searchProducts: "Pesquisar produtos", searchPlaceholder: "Pesquise por nome ou palavra-chave",
    noResults: "Nenhum produto correspondente.", selectedProducts: "Produtos selecionados",
    generateRoutine: "Gerar minha rotina", yourPlan: "SEU PLANO PERSONALIZADO", yourRoutine: "Sua rotina",
    followUpLabel: "Faça uma pergunta complementar", followUpPlaceholder: "Faça uma pergunta...",
    send: "Enviar", beautyLabel: "LOREAL BEAUTY", assistantTitle: "Assistente de cuidados",
    assistantGreeting: "Olá! Pergunte sobre cuidados com a pele ou sua rotina selecionada.",
    assistantLabel: "Pergunte ao assistente", assistantPlaceholder: "Faça uma pergunta...",
    chat: "Chat", sources: "Fontes", thinking: "Pensando...", generating: "Gerando...",
    selectedCount: (count) => `${count} selecionados`, noSelected: "Nenhum produto selecionado",
    senderYou: "Você", senderAssistant: "Assistente",
  },
};

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = "ltr";
  languageSelect.value = currentLanguage;
  localStorage.setItem(languageStorageKey, currentLanguage);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) element.textContent = translations[currentLanguage][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = translations[currentLanguage][key];
  });
  renderCategoryFilters();
  renderProducts();
  renderSelection();
}

languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));

function appendChatResponse(routine, citations = []) {
  const turn = document.createElement("div");
  turn.className = "chat-turn assistant";
  const sender = document.createElement("span");
  sender.className = "chat-sender";
  sender.textContent = translations[currentLanguage].senderAssistant;
  const message = document.createElement("p");
  message.className = "chat-message";
  message.textContent = routine;
  turn.append(sender, message);
  chatMessages.appendChild(turn);

  if (citations.length > 0) {
    const sources = document.createElement("div");
    sources.className = "chat-citations";

    const heading = document.createElement("p");
    heading.className = "chat-citations-heading";
    heading.textContent = translations[currentLanguage].sources;
    sources.appendChild(heading);

    const list = document.createElement("ol");
    citations.forEach((citation) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = citation.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = citation.title;
      item.appendChild(link);
      list.appendChild(item);
    });
    sources.appendChild(list);
    chatMessages.appendChild(sources);
  }
}

async function readRoutineResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.toLowerCase().includes("application/json");
  if (!isJson) {
    if (!response.ok) throw new Error(`${fallbackMessage} (HTTP ${response.status})`);
    throw new Error(`${fallbackMessage} (invalid JSON response)`);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    console.error("Unable to parse the routine response:", error);
  }

  if (!response.ok) {
    console.error("Server Error Detail:", data);
    if (typeof data?.error === "string" && data.error) throw new Error(data.error);
    throw new Error(`${fallbackMessage} (HTTP ${response.status})`);
  }

  if (!data) throw new Error(`${fallbackMessage} (invalid JSON response)`);
  return data;
}

function loadSelection() {
  try {
    const savedIds = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(savedIds)) return;

    const validIds = new Set(products.map((product) => product.id));
    savedIds.forEach((id) => {
      if (validIds.has(id)) selected.add(id);
    });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function persistSelection() {
  localStorage.setItem(storageKey, JSON.stringify([...selected]));
}

function renderCategoryFilters() {
  const allLabel = { en: "All", es: "Todos", zh: "全部", pt: "Todos" }[currentLanguage];
  const categoryLabels = {
    en: {},
    es: { Serum: "Sérum", Cleanser: "Limpiador", Exfoliant: "Exfoliante", Sunscreen: "Protector solar", Moisturizer: "Hidratante", Treatment: "Tratamiento" },
    zh: { Serum: "精华液", Cleanser: "洁面", Exfoliant: "去角质", Sunscreen: "防晒", Moisturizer: "保湿霜", Treatment: "护理" },
    pt: { Serum: "Sérum", Cleanser: "Limpeza", Exfoliant: "Esfoliante", Sunscreen: "Protetor solar", Moisturizer: "Hidratante", Treatment: "Tratamento" },
  };
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="category-filter${activeCategory === category ? " active" : ""}"
          type="button"
          data-category="${category}"
          aria-pressed="${activeCategory === category}"
        >
          ${category === "All" ? allLabel : (categoryLabels[currentLanguage][category] || category)}
        </button>
      `,
    )
    .join("");
}

function getFilteredProducts() {
  const query = productSearch.value.trim().toLowerCase();
  return products.filter((product) => {
    const localized = localizedProduct(product);
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const searchableText = `${localized.name} ${localized.category} ${localized.description}`.toLowerCase();
    return matchesCategory && (!query || searchableText.includes(query));
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  noResults.hidden = filteredProducts.length > 0;
  grid.innerHTML = filteredProducts
    .map((product) => {
      const localized = localizedProduct(product);
      const viewDetails = { en: "View details", es: "Ver detalles", zh: "查看详情", pt: "Ver detalhes" }[currentLanguage];
      const flipBack = { en: "Back", es: "Volver", zh: "返回", pt: "Voltar" }[currentLanguage];
      return `
        <article class="product-item${flippedProducts.has(product.id) ? " flipped" : ""}" data-flip-card="${product.id}">
          <div class="product-flipper">
            <div class="product-front">
              <button
                class="product-card${selected.has(product.id) ? " selected" : ""}"
                type="button"
                data-product-id="${product.id}"
                aria-pressed="${selected.has(product.id)}"
                aria-label="${selected.has(product.id) ? "Unselect" : "Select"} ${localized.name}"
              >
                <img class="product-image" src="${product.image}" alt="" />
                <span class="product-meta">
                  <span class="product-category">${localized.category}</span>
                  <span class="product-name">${localized.name}</span>
                </span>
              </button>
              <button class="details-toggle" type="button" data-flip-id="${product.id}" aria-expanded="${flippedProducts.has(product.id)}">
                ${viewDetails} <span aria-hidden="true">↻</span>
              </button>
            </div>
            <div class="product-back" aria-label="${localized.name}">
              <span class="product-category">${localized.category}</span>
              <h3>${localized.name}</h3>
              <p>${localized.description}</p>
              <button class="details-toggle back-toggle" type="button" data-flip-id="${product.id}" aria-expanded="${flippedProducts.has(product.id)}">
                ${flipBack} <span aria-hidden="true">↻</span>
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSelection() {
  const count = selected.size;
  selectionCount.textContent = translations[currentLanguage].selectedCount(count);
  generateButton.disabled = count === 0;
  clearSelectionButton.hidden = count === 0;

  if (count === 0) {
    selectedList.innerHTML = `<p class="empty-selection">${translations[currentLanguage].noSelected}</p>`;
    return;
  }

  selectedList.innerHTML = products
    .filter((product) => selected.has(product.id))
    .map((product) => {
      const localized = localizedProduct(product);
      return `
        <span class="selected-chip">
          ${localized.name}
          <button class="chip-remove" type="button" data-remove-id="${product.id}" aria-label="Remove ${localized.name}">
            ×
          </button>
        </span>
      `;
    })
    .join("");
}

function toggleProduct(productId) {
  if (selected.has(productId)) {
    selected.delete(productId);
  } else {
    selected.add(productId);
  }

  persistSelection();
  renderProducts();
  renderSelection();
}

function openProductDetails(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const localized = localizedProduct(product);

  dialogName.textContent = localized.name;
  dialogCategory.textContent = localized.category;
  dialogDescription.textContent = localized.description;
  productDialog.showModal();
}

clearSelectionButton.addEventListener("click", () => {
  selected.clear();
  persistSelection();
  conversation = [];
  chat.hidden = true;
  renderProducts();
  renderSelection();
});

productSearch.addEventListener("input", renderProducts);

categoryFilters.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-category]");
  if (!filter) return;
  activeCategory = filter.dataset.category;
  renderCategoryFilters();
  renderProducts();
});

function setFloatingChatOpen(isOpen) {
  floatingChatPanel.hidden = !isOpen;
  floatingChatToggle.setAttribute("aria-expanded", String(isOpen));
  floatingChatToggle.setAttribute("aria-label", isOpen ? "Close skincare chat" : "Open skincare chat");
  if (isOpen) floatingChatInput.focus();
}

floatingChatToggle.addEventListener("click", () => {
  setFloatingChatOpen(floatingChatPanel.hidden);
});

floatingChatClose.addEventListener("click", () => setFloatingChatOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !floatingChatPanel.hidden) setFloatingChatOpen(false);
});

floatingChatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = floatingChatInput.value.trim();
  if (!question) return;

  const selectedProducts = products.filter((product) => selected.has(product.id));
  floatingConversation.push({ role: "user", content: question });
  floatingChatInput.value = "";

  const userTurn = document.createElement("div");
  userTurn.className = "floating-chat-turn user";
  const userSender = document.createElement("span");
  userSender.className = "floating-chat-sender";
  userSender.textContent = translations[currentLanguage].senderYou;
  const userMessage = document.createElement("p");
  userMessage.className = "floating-chat-message user";
  userMessage.textContent = question;
  userTurn.append(userSender, userMessage);
  floatingChatMessages.appendChild(userTurn);

  const loadingMessage = document.createElement("p");
  loadingMessage.className = "floating-chat-message loading";
  loadingMessage.textContent = translations[currentLanguage].thinking;
  floatingChatMessages.appendChild(loadingMessage);
  floatingChatMessages.scrollTop = floatingChatMessages.scrollHeight;

  try {
    const response = await fetch("/api/routine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts, conversation: floatingConversation }),
    });
    const data = await readRoutineResponse(response, "Unable to answer that question.");

    loadingMessage.remove();
    const assistantTurn = document.createElement("div");
    assistantTurn.className = "floating-chat-turn assistant";
    const assistantSender = document.createElement("span");
    assistantSender.className = "floating-chat-sender";
    assistantSender.textContent = translations[currentLanguage].senderAssistant;
    const assistantMessage = document.createElement("p");
    assistantMessage.className = "floating-chat-message assistant";
    assistantMessage.textContent = data.routine;
    assistantTurn.append(assistantSender, assistantMessage);
    floatingChatMessages.appendChild(assistantTurn);
    floatingConversation.push({ role: "assistant", content: data.routine });
  } catch (error) {
    loadingMessage.className = "floating-chat-message error";
    loadingMessage.textContent = error.message;
  } finally {
    floatingChatMessages.scrollTop = floatingChatMessages.scrollHeight;
  }
});

grid.addEventListener("click", (event) => {
  const flipButton = event.target.closest("[data-flip-id]");
  if (flipButton) {
    const productId = flipButton.dataset.flipId;
    if (flippedProducts.has(productId)) {
      flippedProducts.delete(productId);
    } else {
      flippedProducts.add(productId);
    }
    const card = document.querySelector(`[data-flip-card="${productId}"]`);
    card?.classList.toggle("flipped", flippedProducts.has(productId));
    card?.querySelectorAll("[data-flip-id]").forEach((button) => {
      button.setAttribute("aria-expanded", String(flippedProducts.has(productId)));
    });
    return;
  }

  const card = event.target.closest("[data-product-id]");
  if (card) {
    toggleProduct(card.dataset.productId);
  }
});

selectedList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-id]");
  if (removeButton) {
    toggleProduct(removeButton.dataset.removeId);
  }
});

generateButton.addEventListener("click", async () => {
  if (selected.size === 0) return;

  const selectedProducts = products.filter((product) => selected.has(product.id));
  conversation = [];
  chat.hidden = false;
  const creatingText = {
    en: "Creating your personalized routine...",
    es: "Creando tu rutina personalizada...",
    zh: "正在创建您的个性化护肤流程...",
    pt: "Criando sua rotina personalizada...",
  }[currentLanguage];
  chatMessages.innerHTML = `<p class="chat-message loading">${creatingText}</p>`;
  generateButton.disabled = true;
  generateButton.innerHTML = `${translations[currentLanguage].generating} <span aria-hidden="true">·</span>`;

  try {
    const response = await fetch("/api/routine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts, conversation }),
    });

    const data = await readRoutineResponse(response, "Unable to generate a routine.");

    chatMessages.innerHTML = "";
    appendChatResponse(data.routine, data.citations);
    conversation.push({ role: "assistant", content: data.routine });
    chat.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    chatMessages.innerHTML = "";
    const message = document.createElement("p");
    message.className = "chat-message error";
    message.textContent = error.message;
    chatMessages.appendChild(message);
  } finally {
    generateButton.disabled = selected.size === 0;
    generateButton.innerHTML = `<span data-i18n="generateRoutine">${translations[currentLanguage].generateRoutine}</span> <span aria-hidden="true">→</span>`;
  }
});

closeChat.addEventListener("click", () => {
  chat.hidden = true;
});

dialogClose.addEventListener("click", () => productDialog.close());

productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question || chatSend.disabled) return;

  const selectedProducts = products.filter((product) => selected.has(product.id));
  conversation.push({ role: "user", content: question });
  chatInput.value = "";

  const userTurn = document.createElement("div");
  userTurn.className = "chat-turn user";
  const sender = document.createElement("span");
  sender.className = "chat-sender";
  sender.textContent = translations[currentLanguage].senderYou;
  const userMessage = document.createElement("p");
  userMessage.className = "chat-message";
  userMessage.textContent = question;
  userTurn.append(sender, userMessage);
  chatMessages.appendChild(userTurn);

  const loadingMessage = document.createElement("p");
  loadingMessage.className = "chat-message loading";
  loadingMessage.textContent = translations[currentLanguage].thinking;
  chatMessages.appendChild(loadingMessage);
  chatSend.disabled = true;

  try {
    const response = await fetch("/api/routine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts, conversation }),
    });

    const data = await readRoutineResponse(response, "Unable to answer that question.");

    loadingMessage.remove();
    appendChatResponse(data.routine, data.citations);
    conversation.push({ role: "assistant", content: data.routine });
  } catch (error) {
    loadingMessage.className = "chat-message error";
    loadingMessage.textContent = error.message;
  } finally {
    chatSend.disabled = false;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

loadSelection();
applyLanguage(localStorage.getItem(languageStorageKey) || "en");
