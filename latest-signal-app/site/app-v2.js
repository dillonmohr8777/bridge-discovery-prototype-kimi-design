(function () {
  "use strict";

  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(title, message) {
    if (!toast) return;
    toast.querySelector("strong").textContent = title;
    toast.querySelector("span").textContent = message || "";
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3300);
  }

  // Performance-aware app polish. Touch and lower-power devices keep the
  // dimensional styling while skipping continuous ambient movement.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prefersLiteMotion = window.matchMedia("(pointer: coarse)").matches
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  document.documentElement.classList.toggle("perf-lite", Boolean(prefersReducedMotion || prefersLiteMotion));

  // Global quick switcher. The labels follow Tori's approved Phase 2 map.
  function initCommandPalette() {
    const palette = document.createElement("div");
    palette.className = "command-palette";
    palette.id = "commandPalette";
    palette.setAttribute("aria-hidden", "true");
    palette.innerHTML = `
      <div class="command-backdrop" data-command-close></div>
      <section class="command-dialog" role="dialog" aria-modal="true" aria-labelledby="commandTitle">
        <header class="command-head">
          <div>
            <span class="command-kicker">Bridge quick switch</span>
            <h2 id="commandTitle">Go anywhere in Bridge</h2>
          </div>
          <button class="command-close" type="button" data-command-close aria-label="Close quick switch">Esc</button>
        </header>
        <label class="command-search">
          <span aria-hidden="true">/</span>
          <input id="commandInput" type="search" autocomplete="off" placeholder="Search spaces and actions" aria-label="Search Bridge spaces and actions">
          <kbd>Ctrl K</kbd>
        </label>
        <div class="command-results" id="commandResults">
          <p class="command-group-label">Spaces</p>
          <div class="command-grid">
            <a class="command-item" href="/community" data-command-search="community news people feed daily signal">
              <span class="command-mark">N</span><span><strong>Community News</strong><small>People, visual stories, and private daily signals</small></span><b aria-hidden="true">01</b>
            </a>
            <a class="command-item" href="/studio" data-command-search="create studio campaign creative compliance">
              <span class="command-mark">C</span><span><strong>Create</strong><small>Upload, target, and review compliant campaigns</small></span><b aria-hidden="true">02</b>
            </a>
            <a class="command-item" href="/business" data-command-search="my profile business verified contacts identity permissions">
              <span class="command-mark">P</span><span><strong>My Profile</strong><small>Manage identity, contacts, verification, and access</small></span><b aria-hidden="true">03</b>
            </a>
            <a class="command-item" href="/signal" data-command-search="explore nationwide signal map market product brand strain service favorites">
              <span class="command-mark">E</span><span><strong>Explore</strong><small>Search markets, products, brands, and services</small></span><b aria-hidden="true">04</b>
            </a>
          </div>
          <p class="command-group-label">Quick actions</p>
          <div class="command-actions">
            <a href="/community" data-command-search="community news post daily signal">Open Community News</a>
            <a href="/studio" data-command-search="new campaign generate creative">Create a campaign</a>
            <a href="/business" data-command-search="profile contacts verification access">Review profile contacts</a>
            <a href="/signal" data-command-search="explore nationwide regional signal city map">Explore the nationwide network</a>
          </div>
          <p class="command-empty" hidden>No matching Bridge space. Try a broader search.</p>
        </div>
        <footer class="command-footer"><span>Use Tab to move</span><span>Enter to open</span><span>Esc to close</span></footer>
      </section>`;
    document.body.append(palette);

    const input = palette.querySelector("#commandInput");
    const searchItems = Array.from(palette.querySelectorAll("[data-command-search]"));
    const emptyState = palette.querySelector(".command-empty");
    let returnFocus = null;
    let suppressSearchOpen = false;

    function filterCommands() {
      const query = input.value.trim().toLowerCase();
      let visible = 0;
      searchItems.forEach((item) => {
        const matches = !query || item.dataset.commandSearch.includes(query);
        item.hidden = !matches;
        if (matches) visible += 1;
      });
      emptyState.hidden = visible !== 0;
    }

    function openPalette(trigger) {
      if (palette.classList.contains("open") || document.getElementById("ageGate")?.classList.contains("open")) return;
      returnFocus = trigger || document.activeElement;
      palette.classList.add("open");
      palette.setAttribute("aria-hidden", "false");
      document.body.classList.add("command-open");
      input.value = "";
      filterCommands();
      window.setTimeout(() => input.focus(), 30);
    }

    function closePalette() {
      if (!palette.classList.contains("open")) return;
      palette.classList.remove("open");
      palette.setAttribute("aria-hidden", "true");
      document.body.classList.remove("command-open");
      if (returnFocus instanceof HTMLElement) {
        suppressSearchOpen = true;
        returnFocus.focus();
        window.setTimeout(() => { suppressSearchOpen = false; }, 0);
      }
    }

    palette.querySelectorAll("[data-command-close]").forEach((control) => control.addEventListener("click", closePalette));
    palette.querySelectorAll("a").forEach((link) => link.addEventListener("click", closePalette));
    input.addEventListener("input", filterCommands);

    document.querySelectorAll(".searchbox input:not([data-local-search])").forEach((search) => {
      search.setAttribute("readonly", "");
      search.setAttribute("aria-haspopup", "dialog");
      search.setAttribute("aria-controls", "commandPalette");
      // Open on click or Enter/Space, not on focus: keyboard users can Tab
      // through the topbar without the dialog hijacking their pass.
      search.addEventListener("click", () => { if (!suppressSearchOpen) openPalette(search); });
      search.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!suppressSearchOpen) openPalette(search);
        }
      });
    });

    const landingActions = document.querySelector(".landing-nav .landing-links");
    if (landingActions) {
      const launcher = document.createElement("button");
      launcher.className = "command-launcher";
      launcher.type = "button";
      launcher.innerHTML = "<span>Quick switch</span><kbd>Ctrl K</kbd>";
      launcher.addEventListener("click", () => openPalette(launcher));
      landingActions.prepend(launcher);
    }

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        palette.classList.contains("open") ? closePalette() : openPalette();
        return;
      }
      if (!palette.classList.contains("open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
      }
      if (event.key === "Tab") {
        const focusable = Array.from(palette.querySelectorAll('button:not([hidden]), input:not([hidden]), a:not([hidden])'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  function initViewportReveals() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll(
      ".page-head > *, .panel, .suite-card, .signal-visual, .visual-story-card, .contact-review, .explore-card, .route-handoff, .dark-panel, .opportunity"
    ));
    if (!targets.length) return;
    document.documentElement.classList.add("motion-ready");
    targets.forEach((target, index) => {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-order", String(index % 4));
    });
    function settleReveal(target) {
      target.classList.remove("reveal-ready", "is-revealed");
      target.style.removeProperty("--reveal-order");
    }
    function reveal(target) {
      if (target.classList.contains("is-revealed")) return;
      target.classList.add("is-revealed");
      target.addEventListener("transitionend", () => settleReveal(target), { once: true });
      window.setTimeout(() => settleReveal(target), 1200);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -5%" });
    targets.forEach((target) => observer.observe(target));
    // Safety net: nothing stays hidden if the observer never fires
    // (prints, saved captures, unusual embedders).
    window.setTimeout(() => targets.forEach(reveal), 4000);
  }

  initCommandPalette();
  initViewportReveals();

  document.querySelectorAll("[data-toast]").forEach((element) => {
    element.addEventListener("click", () => {
      const [title, message] = element.dataset.toast.split("|");
      showToast(title, message);
    });
  });

  document.querySelectorAll("[data-toggle-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const [onLabel, offLabel] = button.dataset.toggleAction.split("|");
      const active = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(active));
      showToast(active ? onLabel : offLabel, active ? "The action is reflected in this prototype." : "The action was reversed.");
    });
  });

  document.querySelectorAll("[data-follow]").forEach((button) => {
    button.addEventListener("click", () => {
      const following = button.textContent.trim() === "Following";
      button.textContent = following ? "Follow" : "Following";
      button.classList.toggle("primary", !following);
      button.classList.toggle("secondary", following);
      showToast(following ? "Unfollowed" : "Following", "Your network preferences have been updated.");
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      showToast(`${button.textContent.trim()} feed`, "Feed relevance updated without exposing popularity metrics.");
    });
  });

  // Tori asked to compare a staggered digital-newspaper feed with a simpler
  // vertical pattern. The same content switches between both treatments.
  const feedGrid = document.querySelector("[data-feed-grid]");
  document.querySelectorAll("[data-feed-layout]").forEach((button) => {
    button.addEventListener("click", () => {
      const layout = button.dataset.feedLayout;
      if (!feedGrid || !layout) return;
      feedGrid.dataset.layout = layout;
      document.querySelectorAll("[data-feed-layout]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      showToast(layout === "newspaper" ? "News grid selected" : "Classic feed selected", layout === "newspaper" ? "A visual, staggered scan of the network." : "A focused, single-column reading path.");
    });
  });

  // Landing age gate. This matches the stated 30-day retention instead of session-only storage.
  const ageGate = document.getElementById("ageGate");
  if (ageGate) {
    const key = "bridge-age-confirmed-until";
    const confirmedUntil = Number(window.localStorage.getItem(key) || 0);
    if (confirmedUntil < Date.now()) {
      ageGate.classList.add("open");
      document.body.style.overflow = "hidden";
      window.setTimeout(() => ageGate.querySelector("[data-age-confirm]")?.focus(), 50);
    }
    ageGate.querySelector("[data-age-confirm]")?.addEventListener("click", () => {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      window.localStorage.setItem(key, String(Date.now() + thirtyDays));
      ageGate.classList.remove("open");
      document.body.style.overflow = "";
      showToast("Welcome to Bridge", "Your age confirmation is stored on this device for 30 days.");
    });
    ageGate.querySelector("[data-age-exit]")?.addEventListener("click", () => {
      showToast("Access not confirmed", "Close this prototype if you do not meet your local age requirement.");
    });
  }

  // Daily Signal interaction.
  const pollOptions = Array.from(document.querySelectorAll("[data-poll]"));
  const submitVote = document.getElementById("submitVote");
  const pollResults = document.getElementById("pollResults");
  let selectedPoll = "";

  pollOptions.forEach((option) => {
    option.addEventListener("click", () => {
      selectedPoll = option.dataset.poll;
      pollOptions.forEach((item) => {
        const selected = item === option;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-checked", String(selected));
      });
      if (submitVote) submitVote.disabled = false;
    });
  });

  submitVote?.addEventListener("click", () => {
    if (!selectedPoll || !pollResults) return;
    const results = [
      ["Recommendation", 38],
      ["Product information", 31],
      ["Price or promotion", 19],
      ["Brand values", 12]
    ];
    pollResults.innerHTML = `
      <p class="eyebrow">1,285 qualified responses</p>
      ${results.map(([label, value]) => `<div class="result-row"><strong>${label}</strong><span>${value}%</span><div class="result-bar"><span style="width:${value}%"></span></div></div>`).join("")}
      <p class="privacy-note">Response recorded as “${selectedPoll}.” Only aggregated cohorts of 50 or more are released.</p>`;
    pollOptions.forEach((item) => { item.disabled = true; });
    submitVote.disabled = true;
    submitVote.textContent = "Response submitted";
    showToast("Signal received", "Your answer is private and contributes only to qualified aggregate results.");
  });

  // Campaign Studio.
  const campaignCanvas = document.getElementById("campaignCanvas");
  const canvasHeadline = document.getElementById("canvasHeadline");
  const canvasBody = document.getElementById("canvasBody");
  const canvasKicker = document.getElementById("canvasKicker");
  const canvasAccess = document.getElementById("canvasAccess");
  const canvasAsset = document.getElementById("canvasAsset");
  const assetUpload = document.getElementById("assetUpload");
  const assetStatus = document.getElementById("assetStatus");
  const sensitiveContent = document.getElementById("sensitiveContent");
  const audienceInputs = Array.from(document.querySelectorAll('input[name="campaignAudience"]'));

  function updateAudienceAccess() {
    const selected = audienceInputs.filter((input) => input.checked).map((input) => input.value);
    const protectedPost = Boolean(sensitiveContent?.checked);
    if (canvasAccess) {
      canvasAccess.textContent = selected.length
        ? `${selected.join(" + ")} · ${protectedPost ? "Verified access only" : "Public promotion"}`
        : "Choose at least one audience";
      canvasAccess.classList.toggle("protected", protectedPost);
    }
    const publish = document.getElementById("publishButton");
    if (publish) publish.disabled = selected.length === 0;
  }

  audienceInputs.forEach((input) => input.addEventListener("change", updateAudienceAccess));
  sensitiveContent?.addEventListener("change", () => {
    const publicAudience = audienceInputs.find((input) => input.value === "Adults 21+");
    if (sensitiveContent.checked) {
      if (publicAudience) {
        publicAudience.checked = false;
        publicAudience.disabled = true;
      }
      const businessAudiences = audienceInputs.filter((input) => input !== publicAudience);
      if (!businessAudiences.some((input) => input.checked)) businessAudiences.forEach((input) => { input.checked = true; });
      showToast("Protected business content", "Public access was removed. Only verified retailers and industry professionals can receive this post.");
    } else if (publicAudience) {
      publicAudience.disabled = false;
    }
    updateAudienceAccess();
  });

  assetUpload?.addEventListener("change", () => {
    const file = assetUpload.files?.[0];
    if (!file || !assetStatus) return;
    const allowed = /\.(png|jpe?g|webp|pdf)$/i.test(file.name);
    const withinLimit = file.size <= 25 * 1024 * 1024;
    if (!allowed || !withinLimit) {
      assetUpload.value = "";
      assetStatus.textContent = !allowed ? "Use a PNG, JPG, WEBP, or PDF file." : "Choose a file smaller than 25 MB.";
      if (canvasAsset) canvasAsset.hidden = true;
      showToast("Asset not added", assetStatus.textContent);
      return;
    }
    assetStatus.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB · Ready for preview`;
    if (canvasAsset) {
      canvasAsset.hidden = false;
      canvasAsset.textContent = file.name;
    }
    showToast("Asset attached", "The file remains local in this prototype and will travel with the draft's audience and review context.");
  });

  document.getElementById("campaignType")?.addEventListener("change", (event) => {
    if (canvasKicker) canvasKicker.textContent = `${event.target.value} · ${document.getElementById("campaignMarket")?.value || "Selected market"}`;
  });

  updateAudienceAccess();

  function selectVariant(variant) {
    document.querySelectorAll("[data-variant]").forEach((item) => item.classList.toggle("active", item === variant));
    const [headline, body, kicker] = variant.dataset.variant.split("|");
    if (canvasHeadline) canvasHeadline.textContent = headline;
    if (canvasBody) canvasBody.textContent = body;
    if (canvasKicker) canvasKicker.textContent = kicker;
  }

  document.querySelectorAll("[data-variant]").forEach((variant) => variant.addEventListener("click", () => selectVariant(variant)));

  document.getElementById("campaignFormat")?.addEventListener("change", (event) => {
    if (!campaignCanvas) return;
    const formats = { square: "1 / 1", portrait: "4 / 5", wide: "16 / 9" };
    campaignCanvas.style.aspectRatio = formats[event.target.value] || "1 / 1";
    showToast("Format updated", event.target.options[event.target.selectedIndex].text);
  });

  document.getElementById("generateCampaign")?.addEventListener("click", () => {
    const message = document.getElementById("campaignMessage")?.value.trim();
    const market = document.getElementById("campaignMarket")?.value;
    if (!message) {
      showToast("Add a core message", "Campaign generation needs a clear business objective.");
      return;
    }
    const candidates = [
      ["Useful information. Stronger conversations.", "Turn curiosity into a clearer, more responsible starting point."],
      ["Make the next question a better one.", "Straightforward education for adults who want more context and less hype."],
      ["Clarity connects us.", "A practical field guide made for responsible conversations across the community."]
    ];
    document.querySelectorAll("[data-variant]").forEach((variant, index) => {
      const copy = candidates[index];
      variant.dataset.variant = `${copy[0]}|${copy[1]}|Bridge campaign · ${market} 21+`;
      variant.querySelector(".variant-preview span").textContent = copy[0];
    });
    const first = document.querySelector("[data-variant]");
    if (first) selectVariant(first);
    showToast("Three directions generated", "Each direction retains the campaign's market and audience context.");
  });

  document.getElementById("publishButton")?.addEventListener("click", () => {
    showToast("Routed to compliance review", "The creative, audience, market, claims check, and license state travel together.");
  });

  document.getElementById("downloadCampaign")?.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const context = canvas.getContext("2d");
    context.fillStyle = "#07050B";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#4B0082";
    context.lineWidth = 70;
    context.beginPath();
    context.arc(980, 40, 340, 0, Math.PI * 2);
    context.stroke();
    context.strokeStyle = "rgba(124,58,237,.35)";
    context.lineWidth = 58;
    context.beginPath();
    context.arc(980, 40, 445, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#B983FF";
    context.font = "700 24px Montserrat, Arial";
    context.fillText((canvasKicker?.textContent || "BRIDGE CAMPAIGN").toUpperCase(), 86, 108);
    context.fillStyle = "#FFFFFF";
    context.font = "700 78px Poppins, Arial";
    wrapCanvasText(context, canvasHeadline?.textContent || "Bridge campaign", 86, 650, 820, 82);
    context.fillStyle = "rgba(255,255,255,.68)";
    context.font = "400 28px Inter, Arial";
    wrapCanvasText(context, canvasBody?.textContent || "", 86, 880, 720, 40);
    context.fillStyle = "#FFFFFF";
    context.font = "800 32px Poppins, Arial";
    context.fillText("BRI", 820, 1000);
    context.fillStyle = "#A960FF";
    context.fillText("DGE", 878, 1000);
    const link = document.createElement("a");
    link.download = "bridge-campaign-prototype.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("PNG downloaded", "A 1080 × 1080 prototype creative was generated locally.");
  });

  function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(/\s+/);
    let line = "";
    let currentY = y;
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (context.measureText(test).width > maxWidth && line) {
        context.fillText(line, x, currentY);
        line = word;
        currentY += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) context.fillText(line, x, currentY);
  }

  // Business profile view and insight controls.
  document.querySelectorAll("[data-profile-view]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-profile-view]").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      const publicView = tab.dataset.profileView === "public";
      const description = document.getElementById("profileDescription");
      if (description) {
        description.textContent = publicView
          ? "Maryland processor focused on practical education and responsible adult-use conversations. Follow for public product and community updates."
          : "Maryland processor creating dependable education tools and retail-ready product programs. Open to verified retailer, testing, and field-sales relationships.";
      }
      document.querySelectorAll("[data-profile-private]").forEach((element) => { element.hidden = publicView; });
      showToast(publicView ? "Public profile" : "B2B profile", publicView ? "Private commercial fields are now hidden." : "Verified partnership and buying fields are now visible.");
    });
  });

  document.querySelector("[data-contact-confirm]")?.addEventListener("click", (event) => {
    const review = event.currentTarget.closest(".contact-review");
    review?.classList.add("confirmed");
    const title = review?.querySelector("strong");
    const description = review?.querySelector("p");
    if (title) title.textContent = "Contacts confirmed for this cycle";
    if (description) description.textContent = "Sales and accounting responsibilities are current. Bridge will request confirmation again in 90 days.";
    event.currentTarget.disabled = true;
    event.currentTarget.textContent = "Confirmed";
    showToast("Contacts confirmed", "The profile audit history now reflects this prototype confirmation.");
  });

  document.querySelector("[data-contact-update]")?.addEventListener("click", () => {
    showToast("Contact editor opened", "A production build would verify the new responsible person before changing protected profile access.");
  });

  const chartSets = {
    all: [[78, "38%"], [64, "31%"], [40, "19%"], [25, "12%"]],
    new: [[86, "43%"], [70, "34%"], [29, "14%"], [18, "9%"]],
    repeat: [[62, "30%"], [58, "28%"], [55, "27%"], [31, "15%"]]
  };

  document.querySelectorAll("[data-chart-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-chart-filter]").forEach((item) => item.classList.toggle("active", item === button));
      const values = chartSets[button.dataset.chartFilter];
      document.querySelectorAll("#insightChart .bar").forEach((bar, index) => {
        bar.style.setProperty("--value", `${values[index][0]}%`);
        bar.querySelector("strong").textContent = values[index][1];
      });
      showToast("Cohort updated", `${button.textContent.trim()} · Qualified aggregate only.`);
    });
  });

  document.getElementById("directorySearch")?.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll("[data-directory]").forEach((row) => {
      row.hidden = Boolean(query) && !row.dataset.directory.includes(query);
    });
  });

  // Nationwide Explore filters and favorites.
  const exploreCards = Array.from(document.querySelectorAll("[data-explore]"));
  const exploreSearch = document.getElementById("exploreSearch");
  const exploreState = document.getElementById("exploreState");
  const exploreCategory = document.getElementById("exploreCategory");
  const exploreProduct = document.getElementById("exploreProduct");
  const exploreFavorites = document.getElementById("exploreFavorites");
  const exploreResultCount = document.getElementById("exploreResultCount");
  const exploreEmpty = document.getElementById("exploreEmpty");
  const exploreEmptyTitle = document.getElementById("exploreEmptyTitle");
  const exploreEmptyCopy = document.getElementById("exploreEmptyCopy");

  function applyExploreFilters() {
    if (!exploreCards.length) return;
    const query = exploreSearch?.value.trim().toLowerCase() || "";
    const state = exploreState?.value || "all";
    const stateLabel = exploreState?.selectedOptions?.[0]?.textContent || "the selected state";
    const category = exploreCategory?.value || "all";
    const product = exploreProduct?.value || "all";
    const favoritesOnly = exploreFavorites?.getAttribute("aria-pressed") === "true";
    let visible = 0;
    exploreCards.forEach((card) => {
      const matches = (!query || card.dataset.explore.includes(query))
        && (state === "all" || card.dataset.state === state)
        && (category === "all" || card.dataset.category === category)
        && (product === "all" || card.dataset.product.split(" ").includes(product))
        && (!favoritesOnly || card.dataset.favorite === "true");
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    const recordLabel = visible === 1 ? "sample record" : "sample records";
    const hasAdditionalFilters = Boolean(query || category !== "all" || product !== "all" || favoritesOnly);
    if (exploreResultCount) {
      if (state !== "all") exploreResultCount.textContent = `${visible} ${recordLabel} · ${stateLabel}`;
      else if (hasAdditionalFilters) exploreResultCount.textContent = `${visible} ${recordLabel} · Nationwide filter`;
      else exploreResultCount.textContent = `${visible} ${recordLabel} · 4 states represented`;
    }
    if (visible === 0 && exploreEmptyTitle && exploreEmptyCopy) {
      if (state !== "all") {
        exploreEmptyTitle.textContent = `No sample records for ${stateLabel} yet.`;
        exploreEmptyCopy.textContent = "The nationwide state selector is complete. This prototype currently includes illustrative records in Maryland, Massachusetts, New Jersey, and Virginia. Choose another state or clear the filter.";
      } else {
        exploreEmptyTitle.textContent = "No sample records match these filters.";
        exploreEmptyCopy.textContent = "Clear a filter or broaden the search to see more of the prototype network.";
      }
    }
    if (exploreEmpty) exploreEmpty.hidden = visible !== 0;
  }

  [exploreSearch, exploreState, exploreCategory, exploreProduct].forEach((control) => {
    control?.addEventListener(control.tagName === "INPUT" ? "input" : "change", applyExploreFilters);
  });
  exploreFavorites?.addEventListener("click", () => {
    const active = exploreFavorites.getAttribute("aria-pressed") !== "true";
    exploreFavorites.setAttribute("aria-pressed", String(active));
    exploreFavorites.classList.toggle("primary", active);
    applyExploreFilters();
  });
  document.querySelectorAll("[data-favorite-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-explore]");
      if (!card) return;
      const saved = card.dataset.favorite !== "true";
      card.dataset.favorite = String(saved);
      button.classList.toggle("active", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = saved ? "Saved" : "Save";
      button.setAttribute("aria-label", `${saved ? "Remove" : "Add"} ${card.querySelector("h3")?.textContent || "profile"} ${saved ? "from" : "to"} favorites`);
      applyExploreFilters();
      showToast(saved ? "Saved to favorites" : "Removed from favorites", "Your Explore view now reflects this preference.");
    });
  });

  applyExploreFilters();

  document.getElementById("exportInsights")?.addEventListener("click", () => {
    const csv = "cohort,recommendation,information,price,values,sample\nMaryland adults 21+,38,31,19,12,1284\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bridge-illustrative-insights.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    showToast("CSV exported", "The file contains aggregate illustrative data and methodology fields only.");
  });

  // Signal Exchange regional discovery prototype.
  const marketNodes = Array.from(document.querySelectorAll("[data-market]"));
  const signalMapMount = document.getElementById("signalLiveMap");
  const signalMapPanel = signalMapMount?.closest(".pulse-map");
  const signalMapStatus = document.getElementById("signalMapStatus");
  const signalLiveMapEnabled = signalMapMount?.dataset.liveMap === "enabled";
  let signal3DMap = null;
  let signalMapAttempted = false;

  function setSignalMapFallback(message) {
    signalMapPanel?.classList.remove("is-live");
    signalMapMount?.setAttribute("aria-hidden", "true");
    if (signalMapStatus) signalMapStatus.textContent = message || "Illustrative regional fallback";
  }

  function focusSignalMap(node) {
    if (!signal3DMap) return;
    const lat = Number(node.dataset.lat);
    const lng = Number(node.dataset.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    signal3DMap.center = { lat, lng, altitude: 0 };
    signal3DMap.range = Number(node.dataset.range) || 9000;
    signal3DMap.tilt = 63;
    signal3DMap.heading = Number(node.dataset.heading) || 0;
  }

  async function activateSignal3DMap() {
    if (!signalMapMount || signalMapAttempted) return;
    signalMapAttempted = true;

    if (navigator.connection?.saveData) {
      setSignalMapFallback("Illustrative regional fallback · Data saver on");
      return;
    }

    const timeout = window.setTimeout(() => {
      if (!signal3DMap) setSignalMapFallback("Illustrative regional fallback");
    }, 12000);

    window.gm_authFailure = () => {
      window.clearTimeout(timeout);
      signal3DMap = null;
      setSignalMapFallback("Illustrative regional fallback");
    };

    const loader = document.createElement("script");
    loader.async = true;
    loader.src = "/.netlify/functions/google-maps-loader";
    loader.onerror = () => {
      window.clearTimeout(timeout);
      setSignalMapFallback("Illustrative regional fallback");
    };
    window.initBridgeSignal3DMap = async () => {
      try {
        const { Map3DElement, Marker3DElement } = await window.google.maps.importLibrary("maps3d");
        const map = new Map3DElement({
          center: { lat: 39.85, lng: -74.75, altitude: 0 },
          heading: 22,
          tilt: 48,
          range: 690000,
          mode: "HYBRID"
        });

        marketNodes.forEach((node) => {
          const lat = Number(node.dataset.lat);
          const lng = Number(node.dataset.lng);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
          const marker = new Marker3DElement({
            position: { lat, lng, altitude: 0 },
            label: node.dataset.market.split("|")[0],
            extruded: true
          });
          map.append(marker);
        });

        signalMapMount.replaceChildren(map);
        signal3DMap = map;
        signalMapMount.setAttribute("aria-hidden", "false");
        signalMapPanel?.classList.add("is-live");
        if (signalMapStatus) signalMapStatus.textContent = "Live Google 3D discovery";
        window.clearTimeout(timeout);
      } catch (error) {
        console.warn("Bridge live 3D map fallback", error instanceof Error ? error.message : "Unknown map error");
        window.clearTimeout(timeout);
        signal3DMap = null;
        setSignalMapFallback("Illustrative regional fallback");
      }
    };
    document.head.append(loader);
  }

  if (signalMapMount) {
    if (!signalLiveMapEnabled) {
      setSignalMapFallback("Illustrative regional fallback");
    } else if ("IntersectionObserver" in window) {
      const mapObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          activateSignal3DMap();
        }
      }, { rootMargin: "240px" });
      mapObserver.observe(signalMapMount);
    } else {
      activateSignal3DMap();
    }
  }

  marketNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const [market, signal, sample] = node.dataset.market.split("|");
      marketNodes.forEach((item) => {
        item.classList.toggle("active", item === node);
        item.setAttribute("aria-pressed", String(item === node));
      });
      const marketName = document.getElementById("selectedMarketName");
      const marketSignal = document.getElementById("selectedMarketSignal");
      const marketSample = document.getElementById("selectedMarketSample");
      const googleMap = document.getElementById("signalGoogleMap");
      if (marketName) marketName.textContent = market;
      if (marketSignal) marketSignal.textContent = signal;
      if (marketSample) marketSample.textContent = sample;
      if (googleMap) {
        const city = market.split(",")[0];
        googleMap.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(node.dataset.mapQuery)}`;
        const label = document.getElementById("signalGoogleMapLabel");
        if (label) label.textContent = `Open ${city} in Google Maps`;
        else googleMap.textContent = `Open ${city} in Google Maps`;
      }
      focusSignalMap(node);
      showToast(market, `${signal} · ${sample}`);
    });
  });

  document.querySelectorAll("[data-intro]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.intro;
      button.textContent = "Request pending";
      button.disabled = true;
      showToast("Permission requested", `${target} can review the fit summary before any contact details are shared.`);
    });
  });

  // Permission-based location handoff to Google Maps. Coordinates are not stored.
  const locationButton = document.getElementById("useCurrentLocation");
  const googleMapLink = document.getElementById("openGoogleMap");
  const locationStatus = document.getElementById("locationStatus");
  const locationMap = document.getElementById("locationMap");

  locationButton?.addEventListener("click", () => {
    if (!navigator.geolocation) {
      locationStatus.textContent = "This browser does not support current location. You can still open the Baltimore map.";
      showToast("Location unavailable", "Use the Baltimore Google Map or search the verified directory instead.");
      return;
    }

    locationButton.disabled = true;
    locationButton.textContent = "Finding location";
    locationStatus.textContent = "Your browser will ask for location permission. Bridge does not save the result.";

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const point = `${coords.latitude.toFixed(5)},${coords.longitude.toFixed(5)}`;
        const query = encodeURIComponent(`cannabis businesses near ${point}`);
        googleMapLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
        googleMapLink.textContent = "Open nearby Google Map";
        locationButton.textContent = "Refresh location";
        locationButton.disabled = false;
        locationMap?.classList.add("ready");
        const mapCopy = locationMap?.querySelector(".location-map-copy");
        if (mapCopy) mapCopy.innerHTML = "<strong>Current location is ready.</strong><span>Open Google Maps when you choose. Bridge keeps no location history.</span>";
        locationStatus.textContent = "Location is held only in this page. Google receives it only if you open the external map. Google results are not Bridge verified.";
        showToast("Location ready", "Open Google Maps when you are ready to explore nearby.");
      },
      (error) => {
        locationButton.textContent = "Use my location";
        locationButton.disabled = false;
        const denied = error.code === 1;
        locationStatus.textContent = denied
          ? "Location permission was not granted. You can still open the Baltimore map."
          : "Current location could not be found. Try again or open the Baltimore map.";
        showToast(denied ? "Location not shared" : "Location unavailable", "No location was saved or sent to Google Maps.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  });
})();
