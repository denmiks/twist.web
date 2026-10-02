/* ============================================================
   Twist Assistant — local FAQ chatbot
   No API key, no external service. Answers common buyer
   questions in English or Tagalog, then hands off to a human.
   Content lives in BOT.copy / BOT.intents so it is easy to edit.
   ============================================================ */

(function () {
  "use strict";

  var BOT = {
    contact: {
      phone: "+63 927 150 6339",
      phoneHref: "tel:+639271506339",
      email: "mangofrescoph@gmail.com",
      messenger: "https://www.facebook.com/mangofrescoph/",
      lazada: "https://s.lazada.com.ph/s.Z7be90?c=y",
      address: "2509 Andrade St., Sta. Cruz, Manila, Philippines 1014"
    },

    copy: {
      en: {
        langPrompt: "Hi! I'm the Twist Assistant. Before we start, would you like to chat in English or Tagalog?",
        intro: "Great — let's do this in English. I can help with our products, pack sizes, ordering, delivery, and contact details. What would you like to know?",
        typeSomething: "You can also type your question below.",
        langSwitched: "Switched to English. How can I help?",
        topics: "Our products",
        notFound: "I'm not sure about that one yet. I can help with products, prices, pack sizes, ordering and quotes, delivery coverage, or contact details.",
        notFoundSoon: "If it's a detailed question, our team can answer it directly:",
        human: "You can reach the team here:",
        fallbackChips: ["Our products", "Price list", "Packs & shelf life", "Ordering & quotes", "Delivery & coverage", "Location & contact"]
      },
      tl: {
        langPrompt: "Hi! Ako ang Twist Assistant. Bago mag-usap, gusto mo bang mag-chat sa English o Tagalog?",
        intro: "Sige, mag-usap tayo sa Tagalog. Makatutulong ako sa mga produkto, pack sizes, ordering, delivery, at contact details. Ano ang gusto mong malaman?",
        typeSomething: "Puwede mo ring i-type ang tanong mo sa ibaba.",
        langSwitched: "Nakatayo na sa English. Paano kita matutulungan?",
        topics: "Ang aming mga produkto",
        notFound: "Hindi ko pa alam ang detalye na iyon. Makatutulong ako sa produkto, presyo, pack sizes, ordering at quotes, delivery coverage, o contact details.",
        notFoundSoon: "Kung detalyado ang tanong, direktang sasagotin ito ng aming team:",
        human: "Maari mong i-contact ang team dito:",
        fallbackChips: ["Mga produkto", "Presyo", "Packs at shelf life", "Ordering at quotes", "Delivery at coverage", "Location at contact"]
      }
    },

    /* Each intent holds the answer in both languages plus keywords used
       to match what the visitor typed. */
    intents: [
      {
        id: "products",
        keywords: ["product", "products", "what do you sell", "what do you offer", "line", "catalog", "catalogue", "items", "what have you got"],
        tlKeywords: ["produkto", "mga produkto", "ano ang mayroon", "ano ang inyong", "linya", "items", "itong"],
        en: "We supply three fruit-based lines:\n\n• Mango Purée — pulped and pasteurized, no additives. Brix is tested and held consistent batch to batch.\n• Pure Calamansi — pure calamansi with no additives.\n• Concentrated Iced Tea — concentrated tea for consistent flavour across beverage programs.\n\nAll are graded for taste, texture, sweetness, and acidity before packing.",
        tl: "May tatlong linya ng produkto kami:\n\n• Mango Purée — kinudkud at pasteurized, walang additives. Sinusuri ang Brix para consistent sa bawat batch.\n• Pure Calamansi — pure na calamansi, walang additives.\n• Concentrated Iced Tea — concentrated tea para consistent na lasa sa beverage programs.\n\nSinusuri ang bawat batch para sa lasa, consistency, at kalidad bago i-pack."
      },
      {
        id: "mango",
        keywords: ["mango", "mango puree", "mango pureé", "purée", "puree", "brix"],
        tlKeywords: ["mango", "m puree", "pure", "brix"],
        en: "Mango Purée\n\n• Format: 1 kg and 5 kg foodservice packs\n• Price: 1 kg — ₱320 | 5 kg — ₱1,349\n• Pulped and pasteurized, no additives\n• Brix tested per batch, so recipes don't need adjusting\n• Best for: milkshakes, smoothies, mango juice, ice cream, desserts, sauces, and fillings\n• Shelf life: 1 year unopened",
        tl: "Mango Purée\n\n• Format: 1 kg at 5 kg foodservice pack\n• Kinudkud at pasteurized, walang additives\n• Brix ang sinusuri kada batch, kaya hindi na kailangang i-adjust ang recipe\n• Best for: milkshake, smoothie, mango juice, ice cream, desserts, sauces, at fillings\n• Shelf life: 1 year kapag hindi pa binubuksan"
      },
      {
        id: "calamansi",
        keywords: ["calamansi", "calamancy", "citrus", "lime"],
        tlKeywords: ["calamansi", "citrus"],
        en: "Pure Calamansi\n\n• Format: 1 kg and 5 kg packs\n• Price: 1 kg — ₱320 | 5 kg — ₱1,349\n• Pure calamansi with no additives\n• Best for: calamansi drinks, dressings, marinades, and other kitchen applications\n• Shelf life: 1 year unopened",
        tl: "Pure Calamansi\n\n• Format: 1 kg at 5 kg packs\n• Presyo: 1 kg — ₱320 | 5 kg — ₱1,349\n• Pure na calamansi, walang additives\n• Best for: calamansi drinks, dressings, marinades, at iba pang gamit sa kusina\n• Shelf life: 1 year kapag hindi pa binubuksan"
      },
      {
        id: "tea",
        keywords: ["iced tea", "ice tea", "tea", "concentrate", "concentrated"],
        tlKeywords: ["tea", "iced tea", "concentrate"],
        en: "Concentrated Iced Tea\n\n• Format: 1 kg pack\n• Price: ₱299\n• Concentrated iced tea built for consistent flavour across beverage programs\n• Use: mix with water and serve chilled\n• Shelf life: 1 year unopened",
        tl: "Concentrated Iced Tea\n\n• Format: 1 kg pack\n• Presyo: ₱299\n• Concentrated iced tea para consistent na lasa sa beverage programs\n• Gamit: i-mix sa tubig at i-serve na chilled\n• Shelf life: 1 year kapag hindi pa binubuksan"
      },
      {
        id: "packs",
        keywords: ["pack", "packs", "size", "sizes", "format", "shelf life", "expiry", "expiration", "how long", "storage", "store"],
        tlKeywords: ["pack", "size", "format", "shelf life", "expiry", "ilang buhay", "storage", "imbak"],
        en: "Pack sizes and shelf life:\n\n• Mango Purée — 1 kg and 5 kg\n• Pure Calamansi — 1 kg and 5 kg\n• Concentrated Iced Tea — 1 kg\n\nAll three keep a 1 year shelf life unopened. For bigger volumes or a custom supply plan, we can align volume, pack size, and delivery schedule to how your business orders.",
        tl: "Pack sizes at shelf life:\n\n• Mango Purée — 1 kg at 5 kg\n• Pure Calamansi — 1 kg at 5 kg\n• Concentrated Iced Tea — 1 kg\n\nIsa taon ang shelf life ng lahat kapag hindi pa binubuksan. Para sa malaking volume o custom supply plan, kaya naming i-align ang volume, pack size, at delivery schedule sa paraan ng pag-order ng inyo."
      },
      {
        id: "ordering",
        keywords: ["order", "ordering", "how to order", "buy", "purchase", "lazada", "shop", "cart", "checkout"],
        tlKeywords: ["order", "mag-order", "paano mag-order", "bumili", "lazada", "checkout"],
        en: "Here's how to order:\n\n• Businesses — send us your volume, pack size, and delivery schedule through the contact page, and we'll prepare a quote.\n• Small orders and retail — order through our Lazada account: [Lazada store](https://s.lazada.com.ph/s.Z7be90?c=y)\n• Messenger, phone, or email also work.",
        tl: "Ganito ang paraan ng pag-order:\n\n• Para sa negosyo — ipadala sa amin ang volume, pack size, at delivery schedule sa Contact page, at maghahanda kami ng quote.\n• Para sa maliit na order at retail — mag-order sa aming Lazada account: [Lazada store](https://s.lazada.com.ph/s.Z7be90?c=y)\n• Maaari rin sa Messenger, telepono, o email."
      },
      {
        id: "pricing",
        keywords: ["price", "prices", "pricing", "cost", "how much", "quote", "quotation", "budget", "discount", "pesos", "piso", "php", "price list"],
        tlKeywords: ["price", "magkano", "presyo", "quote", "discount", "halaga", "piso", "pesos", "listahan ng presyo"],
        en: "Here is our current price list:\n\n• Mango Purée — 1 kg: ₱320 | 5 kg: ₱1,349\n• Pure Calamansi — 1 kg: ₱320 | 5 kg: ₱1,349\n• Concentrated Iced Tea — 1 kg: ₱299\n\nFor larger volumes or a custom supply plan, send us your requirements and we'll confirm the best rate for you.",
        tl: "Ito ang kasalukuyang price list namin:\n\n• Mango Purée — 1 kg: ₱320 | 5 kg: ₱1,349\n• Pure Calamansi — 1 kg: ₱320 | 5 kg: ₱1,349\n• Concentrated Iced Tea — 1 kg: ₱299\n\nPara sa malaking volume o custom supply plan, ipadala sa amin ang inyong kinakailangan at kumpirmahin namin ang pinakamabuting presyo para sa inyo."
      },
      {
        id: "delivery",
        keywords: ["delivery", "deliver", "shipping", "ship", "lead time", "schedule", "coverage", "area", "metro manila", "province", "pasal"],
        tlKeywords: ["delivery", "hatid", "ship", "lead time", "schedule", "coverage", " lugar", "pasal"],
        en: "Our chilled trucks run fixed routes into Metro Manila and nearby provinces. Next-day delivery is available for standing orders. If you tell us your area and order frequency, we'll confirm whether you're on a route.\n\nFor smaller orders, you can also order through our Lazada account and have it delivered: [Lazada store](https://s.lazada.com.ph/s.Z7be90?c=y)",
        tl: "May mga chilled trucks kami na may fixed routes sa Metro Manila at mga karatig na probinsiya. Available ang next-day delivery para sa standing orders. Sabihin sa amin ang inyong area at dalas ng order para masabi namin kung nasa route kayo.\n\nPara sa mas maliliit na order, puwede rin kay mag-order sa aming Lazada account at ipadala: [Lazada store](https://s.lazada.com.ph/s.Z7be90?c=y)"
      },
      {
        id: "location",
        keywords: ["location", "address", "where", "office", "address?", "map", "directions", "nasa", "saan"],
        tlKeywords: ["location", "address", "saan", "nasa", "lokasyon", "direksyon"],
        en: "We're at 2509 Andrade St., Sta. Cruz, Manila, Philippines 1014. You can also find us on the map on our Contact page.",
        tl: "Nasa 2509 Andrade St., Sta. Cruz, Manila, Philippines 1014 kami. Makikita rin namin sa mapa sa Contact page."
      },
      {
        id: "contact",
        keywords: ["contact", "phone", "email", "messenger", "call", "text", "number", "reach", "facebook"],
        tlKeywords: ["contact", "telepono", "email", "messenger", "tawagan", "number", "facebook"],
        en: "You can reach us here:",
        tl: "I-reach kami dito:",
        links: true
      },
      {
        id: "who",
        keywords: ["who are you", "about", "company", "story", "history", "founded", "established", "founder", "third generation", "family"],
        tlKeywords: ["kayo", "about", "company", "story", "historia", "batay", "founded", "pamilya", "third generation"],
        en: "TWIST PH is a small Filipino fruit and beverage company established in 2018. Our ancestors were already trading mangoes at the market, and today the third generation of the family runs the business. We supply restaurants, cafés, hotels, beverage and food manufacturers, caterers, and exporters.",
        tl: "Ang TWIST PH ay maliit na Filipino fruit at beverage company na itinatag noong 2018. Nanlalaro na ang aming mga ninuno sa pagbebenta ng mangga sa palengke, at ngayon ang third generation ng pamilya ang nagpapatakbo ng negosyo. Naglilingkod kami sa mga restaurant, café, hotel, beverage at food manufacturer, caterer, at exporter."
      },
      {
        id: "bulk",
        keywords: ["bulk", "volume", "supply plan", "custom", "contract", "standing order", "recurring", "large order", "wholesale"],
        tlKeywords: ["bulk", "volume", "supply plan", "custom", "contract", "standing order", "malaking order", "wholesale"],
        en: "Yes — we can build a supply plan around your volume, pack size, and delivery days. Send us an estimate of your monthly usage and we'll suggest the most practical format and schedule.",
        tl: "Oo — kaya kaming bumuo ng supply plan batay sa inyong volume, pack size, at delivery days. Ipadala sa amin ang tinatayang monthly usage at miae-suggest namin ang pinakapractical na format at schedule."
      },
      {
        id: "thanks",
        keywords: ["thanks", "thank you", "salamat", "tanke", "great", "perfect"],
        tlKeywords: ["salamat", "tanke", "maraming salamat", "okay", "sig"],
        en: "You're welcome! Anything else I can help you with?",
        tl: "Walang anuman! May iba pa akong matutulungan?"
      },
      {
        id: "greeting",
        keywords: ["hi", "hello", "hey", "kumusta", "good morning", "good afternoon", "magandang"],
        tlKeywords: ["hi", "hello", "hey", "kumusta", "magandang"],
        en: "Hello! Good to hear from you. What would you like to know about Twist?",
        tl: "Kumusta! Sayang makakinggan mo. Ano ang gusto mong malaman tungkol sa Twist?"
      }
    ]
  };

  /* ---------------- Intent matching ---------------- */

  function normalise(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[.,!?¡¿"'`’]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function scoreIntent(text, lang) {
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < BOT.intents.length; i++) {
      var intent = BOT.intents[i];
      /* Tagalog questions often mix English product words, so both
         keyword lists are always considered. */
      var words = (intent.keywords || []).concat(lang === "tl" ? (intent.tlKeywords || []) : []);
      var score = 0;
      for (var w = 0; w < words.length; w++) {
        var keyword = normalise(words[w]);
        if (!keyword) continue;
        if (text === keyword) score += 1000;
        else if (text.indexOf(keyword) !== -1) score += keyword.length;
      }
      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    }
    return bestScore >= 4 ? best : null;
  }

  function looksTagalog(text) {
    var t = normalise(text);
    return /\b(po|magkano|salamat|kumusta|ano|paano|mag-order|sana|pwede|kaya|ba)\b/.test(t);
  }

  /* Fruits we don't currently carry, so the bot doesn't mis-answer an
     "do you have X?" question with a product we do sell. */
  var OTHER_PRODUCTS = [
    "durian", "duran", "pineapple", "papaya", "jackfruit", "langka", "lanzones",
    "mangosteen", "manggoston", "coconut", "niog", "lychee", "litsiyas",
    "rambutan", "atis", "soursop", "guava", "watermelon", "melon", "pomelo",
    "peach", "strawberry", "banana", "lemon", "orange", "sitaw", "marang"
  ];

  function findOtherProduct(text) {
    for (var i = 0; i < OTHER_PRODUCTS.length; i++) {
      if (text.indexOf(OTHER_PRODUCTS[i]) !== -1) return OTHER_PRODUCTS[i];
    }
    return null;
  }

  /* ---------------- Widget ---------------- */

  var STORE_KEY = "twist-chat-lang";
  var state = { lang: "en", stage: "language", misses: 0 };

  try {
    var saved = window.localStorage.getItem(STORE_KEY);
    if (saved === "en" || saved === "tl") {
      state.lang = saved;
      state.stage = "main";
    }
  } catch (e) {}

  var launcher, panel, log, chips, input, openBtn, widget, langBar;

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function build() {
    var wrap = el("div", "chat-widget");
    widget = wrap;

    launcher = el("button", "chat-launcher");
    launcher.type = "button";
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-controls", "twist-chat-panel");
    launcher.setAttribute("aria-label", "Chat with the Twist assistant");
    launcher.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M20.5 12.3c0 4-3.8 7.2-8.5 7.2a9.8 9.8 0 0 1-2.6-.35L4.6 20.7l1.2-3.2A6.9 6.9 0 0 1 3.5 12.3C3.5 8.3 7.3 5.1 12 5.1s8.5 3.2 8.5 7.2z"/>' +
      '<path d="M9 11.6h6M9 14.4h4"/>' +
      "</svg>" +
      '<span class="chat-launcher-ring" aria-hidden="true"></span>' +
      '<span class="chat-badge" aria-hidden="true">1</span>';
    launcher.addEventListener("click", function () {
      isOpen() ? close() : open();
    });

    panel = el("div", "chat-panel");
    panel.id = "twist-chat-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Twist assistant");
    panel.hidden = true;

    var head = el("div", "chat-head");
    head.innerHTML =
      '<span class="chat-avatar" aria-hidden="true">T</span>' +
      '<span class="chat-head-text"><strong>Twist Assistant</strong>' +
      '<span class="chat-head-status">Fruit &amp; beverage supply</span></span>';
    var closeBtn = el("button", "chat-close", "&times;");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.addEventListener("click", close);
    head.appendChild(closeBtn);

    log = el("div", "chat-log");
    log.setAttribute("role", "log");
    log.setAttribute("aria-live", "polite");

    /* Always-visible language buttons */
    langBar = el("div", "chat-langbar");
    langBar.setAttribute("role", "group");
    langBar.setAttribute("aria-label", "Chat language");
    [["en", "English"], ["tl", "Tagalog"]].forEach(function (pair) {
      var btn = el("button", "chat-lang-btn", pair[1]);
      btn.type = "button";
      btn.setAttribute("data-lang", pair[0]);
      btn.setAttribute("aria-pressed", pair[0] === state.lang ? "true" : "false");
      btn.addEventListener("click", function () {
        if (state.stage === "language") switchLanguage(pair[0], false);
        else if (state.lang !== pair[0]) switchLanguage(pair[0], true);
      });
      langBar.appendChild(btn);
    });

    chips = el("div", "chat-chips");

    var form = el("form", "chat-form");
    input = el("input", "chat-input");
    input.type = "text";
    input.autocomplete = "off";
    input.setAttribute("aria-label", "Type your question");
    input.placeholder = "Type your question";
    var send = el("button", "chat-send", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12h13M12.5 6.5 18.5 12l-6 5.5"/></svg>');
    send.type = "submit";
    send.setAttribute("aria-label", "Send message");
    form.appendChild(input);
    form.appendChild(send);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submitInput();
    });

    var foot = el("div", "chat-foot");
    foot.innerHTML =
      '<span>Automated assistant</span><span aria-hidden="true">&bull;</span>' +
      '<a href="contact.html">Contact a human</a>';

    panel.appendChild(head);
    panel.appendChild(langBar);
    panel.appendChild(log);
    panel.appendChild(chips);
    panel.appendChild(form);
    panel.appendChild(foot);

    wrap.appendChild(panel);
    wrap.appendChild(launcher);
    document.body.appendChild(wrap);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) close();
    });
    document.addEventListener("click", function (event) {
      if (isOpen() && !wrap.contains(event.target)) close();
    });
  }

  function isOpen() {
    return panel && !panel.hidden;
  }

  function open() {
    panel.hidden = false;
    widget.classList.add("chat-widget--open");
    launcher.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    syncLangButtons();
    if (!log.childNodes.length) greet();
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) input.focus();
  }

  function close() {
    panel.hidden = true;
    widget.classList.remove("chat-widget--open");
    launcher.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
  }

  /* ---------------- Messaging ---------------- */

  function formatText(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\n/g, "<br>")
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+|mailto:[^)\s]+|tel:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  function push(role, text) {
    var bubble = el("div", "chat-msg chat-msg--" + role, formatText(text));
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
    return bubble;
  }

  function pushTyping() {
    var node = el("div", "chat-msg chat-msg--bot chat-typing", "<i></i><i></i><i></i>");
    log.appendChild(node);
    log.scrollTop = log.scrollHeight;
    return node;
  }

  function reply(text, delay) {
    var typing = pushTyping();
    window.setTimeout(function () {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      push("bot", text);
    }, delay || 550);
  }

  function contactBlock(lang) {
    var c = BOT.contact;
    return (
      lang + "\n\n" +
      "[Messenger](" + c.messenger + ") &nbsp;&bull;&nbsp; " +
      "[" + c.phone + "](" + c.phoneHref + ") &nbsp;&bull;&nbsp; " +
      "[Email](" + "mailto:" + c.email + ")"
    );
  }

  function setChips(items) {
    chips.innerHTML = "";
    items.forEach(function (item) {
      var chip = el("button", "chat-chip", item.label);
      chip.type = "button";
      chip.addEventListener("click", function () {
        if (item.onClick) item.onClick();
        else handleMessage(item.value);
      });
      chips.appendChild(chip);
    });
  }

  function topicChips() {
    var c = BOT.copy[state.lang];
    var labels = c.fallbackChips;
    var values = ["products", "pricing", "packs", "ordering", "delivery", "contact"];
    return values.map(function (value, index) {
      return { label: labels[index], value: value };
    });
  }

  function greet() {
    if (state.stage === "language") {
      push("bot", BOT.copy.en.langPrompt);
      setChips([
        { label: "English", onClick: function () { switchLanguage("en", false); } },
        { label: "Tagalog", onClick: function () { switchLanguage("tl", false); } }
      ]);
      return;
    }
    push("bot", state.lang === "en" ? BOT.copy.en.intro : BOT.copy.tl.intro);
    setChips(topicChips());
  }

  function syncLangButtons() {
    if (!langBar) return;
    var buttons = langBar.querySelectorAll(".chat-lang-btn");
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute("data-lang") === state.lang;
      buttons[i].classList.toggle("is-active", active);
      buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function switchLanguage(lang, announce) {
    state.lang = lang;
    state.stage = "main";
    syncLangButtons();
    try {
      window.localStorage.setItem(STORE_KEY, lang);
    } catch (e) {}
    if (announce) reply(BOT.copy[lang].langSwitched);
    else reply(BOT.copy[lang].intro);
    setChips(topicChips());
  }

  function submitInput() {
    var value = input.value.trim();
    if (!value) return;
    input.value = "";
    push("user", value);
    handleMessage(value);
  }

  function handleMessage(raw) {
    var text = normalise(raw);

    if (state.stage === "language") {
      if (/(tagalog|tl|filipino)/.test(text)) return switchLanguage("tl", false);
      if (/(english|en|inglish)/.test(text)) return switchLanguage("en", false);
      if (text) {
        push("user", raw);
        var guess = looksTagalog(raw) ? "tl" : "en";
        switchLanguage(guess, false);
      }
      return;
    }

    if (/(tagalog|filipino)/.test(text) && state.lang === "en") return switchLanguage("tl", true);
    if (/(english|inglish)/.test(text) && state.lang === "tl") return switchLanguage("en", true);

    var byChip = { products: "products", packs: "packs", pricing: "pricing", ordering: "ordering", delivery: "delivery", contact: "contact" };
    var intentId = null;

    var intent = null;
    var other = findOtherProduct(text);

    if (other) {
      state.misses = 0;
      if (state.lang === "en") {
        reply(
          "We currently carry Mango Purée, Pure Calamansi, and Concentrated Iced Tea — no " + other + " products at the moment. " +
          "If you need it, our team can confirm availability for you.", 450);
      } else {
        reply(
          "Sa ngayon ay Mango Purée, Pure Calamansi, at Concentrated Iced Tea lang ang meron kami — wala pang " + other + " produkto. " +
          "Kung kailangan ninyo, maaaring i-confirm ng team namin ang availability.", 450);
      }
      setChips(topicChips().concat([{
        label: state.lang === "en" ? "Ask our team" : "Tanungin ang team",
        onClick: function () {
          var c = BOT.copy[state.lang];
          reply(c.human + "\n\n" + contactBlock(c.human), 400);
        }
      }]));
      return;
    }

    if (text === "products" || /\bproducts?\b/.test(text) && text.length < 12) intentId = byChip.products;
    if (!intentId) {
      if (/\bprice\b|\bpricing\b|\bcost\b|how much|magkano|\bpresyo\b|\bquote\b|\bdiscount\b/.test(text)) intentId = "pricing";
      else if (/\bpacks?\b|\bshelf\b|\bsizes?\b/.test(text) && text.length < 14) intentId = byChip.packs;
      else if (/\border\b|\bbu(y|ying)\b|lazada|checkout|\bquote\b|\bprice\b/.test(text)) intentId = byChip.ordering;
      else if (/\bdeliver(y)?\b|\bship(ping)?\b|lead time|\broute\b|coverage/.test(text)) intentId = byChip.delivery;
      else if (/\bcontact\b|\bphone\b|\bemail\b|messenger|\bcall\b|\breach\b/.test(text)) intentId = byChip.contact;
    }
    if (!intentId) intentId = /\b(where|address|location|saan|nasa)\b/.test(text) ? "location" : null;

    var intent = intentId ? findIntent(intentId) : scoreIntent(text, state.lang);

    if (!intent) {
      state.misses += 1;
      if (state.lang === "en" && looksTagalog(raw) && state.misses === 1) {
        return switchLanguage("tl", true);
      }
      var c = BOT.copy[state.lang];
      var body = state.misses > 1
        ? c.notFound + "\n\n" + c.notFoundSoon + "\n" + contactBlock(c.human)
        : c.notFound;
      reply(body, 500);
      setChips(topicChips().concat([{
        label: state.lang === "en" ? "Talk to our team" : "Kausapin ang team",
        onClick: function () {
          var cc = BOT.copy[state.lang];
          reply(cc.human + "\n\n" + contactBlock(cc.human), 400);
        }
      }]));
      return;
    }

    state.misses = 0;
    var copy = BOT.copy[state.lang];
    if (intent.links) {
      reply(intent[state.lang] + "\n\n" + contactBlock(copy.human), 450);
    } else {
      reply(intent[state.lang], 450);
    }
    setChips(topicChips());
  }

  function findIntent(id) {
    for (var i = 0; i < BOT.intents.length; i++) {
      if (BOT.intents[i].id === id) return BOT.intents[i];
    }
    return null;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();