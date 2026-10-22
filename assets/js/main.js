/* ============================================================
   TOPCRAFT — MAIN JS
   Central config · Navbar · Counters · Reveal · Filters · Forms
   ============================================================ */

/* ---------- SITE CONFIG — EDIT THIS ONE OBJECT ---------- */
const siteConfig = {
    company: "TopCraft Aluminium Formwork System Pvt. Ltd.",
    phone: "[Enter Phone]",
    phoneHref: "tel:+910000000000",
    whatsapp: "[Enter WhatsApp number, e.g. 919876543210]",
    email: "[Enter Email]",
    website: "[Enter Website]",
    address: "[Enter Office & Plant Address]",
    hours: "Mon – Sat · 9:00 AM – 6:30 PM",
    formEndpoint: "https://api.web3forms.com/submit", // replace with your access key flow
    formAccessKey: "[YOUR-WEB3FORMS-ACCESS-KEY]"
};

/* Helper: fill any element with data-config attribute */
document.querySelectorAll("[data-config]").forEach(el => {
    const key = el.getAttribute("data-config");
    if (siteConfig[key]) el.textContent = siteConfig[key];
});
document.querySelectorAll("[data-config-href]").forEach(el => {
    const key = el.getAttribute("data-config-href");
    if (siteConfig[key]) el.setAttribute("href", siteConfig[key]);
});

/* ---------- NAVBAR SHRINK + ACTIVE LINK ---------- */
const navbar = document.querySelector(".navbar-tc");
if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("shrink", window.scrollY > 40);
    }, { passive: true });
}
(function setActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-tc .nav-link, .navbar-tc .dropdown-item").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;
        if (href === path) {
            a.classList.add("active");
            const parent = a.closest(".dropdown");
            if (parent) parent.querySelector(".nav-link").classList.add("active");
        }
    });
})();

/* ---------- ANIMATED COUNTERS ---------- */
function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.done) {
            e.target.dataset.done = "1";
            animateCounter(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------- BACK TO TOP ---------- */
const topBtn = document.querySelector(".float-top");
if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- FILTERABLE GRIDS (products / projects / accessories) ---------- */
function initFilter(containerSelector, chipSelector, itemSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const chips = document.querySelectorAll(chipSelector);
    const items = container.querySelectorAll(itemSelector);
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            const cat = chip.dataset.filter;
            items.forEach(item => {
                const show = cat === "all" || item.dataset.category === cat;
                item.style.display = show ? "" : "none";
            });
        });
    });
}
initFilter("#productGrid", "#productFilters .chip", ".filter-item");
initFilter("#projectGrid", "#projectFilters .chip", ".filter-item");
initFilter("#accessoryGrid", "#accessoryFilters .chip", ".filter-item");

/* ---------- ACCESSORY LIVE SEARCH ---------- */
const accSearch = document.getElementById("accSearch");
if (accSearch) {
    accSearch.addEventListener("input", () => {
        const q = accSearch.value.toLowerCase().trim();
        document.querySelectorAll("#accessoryGrid .filter-item").forEach(item => {
            const name = item.dataset.name.toLowerCase();
            item.style.display = name.includes(q) ? "" : "none";
        });
    });
}

/* ---------- ENQUIRY MODAL: pre-fill product name ---------- */
document.querySelectorAll("[data-enquire]").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.enquire;
        const field = document.getElementById("modalProduct");
        if (field) field.value = name;
        const label = document.getElementById("modalProductLabel");
        if (label) label.textContent = name;
    });
});

/* ---------- FORM HANDLING (Web3Forms / Formspree) ---------- */
function showToast(msg) {
    let toast = document.querySelector(".toast-tc");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast-tc";
        toast.innerHTML = '<i class="bi bi-check-circle-fill"></i><span></span>';
        document.body.appendChild(toast);
    }
    toast.querySelector("span").textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 5000);
}

document.querySelectorAll("form[data-tc-form]").forEach(form => {
    form.addEventListener("submit", async e => {
        e.preventDefault();
        if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
        const btn = form.querySelector("[type=submit]");
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
        try {
            const fd = new FormData(form);
            fd.append("access_key", siteConfig.formAccessKey);
            const res = await fetch(siteConfig.formEndpoint, { method: "POST", body: fd });
            if (!res.ok) throw new Error("Network error");
            form.reset();
            form.classList.remove("was-validated");
            showToast("Thank you! Your enquiry has been sent. We will contact you shortly.");
        } catch (err) {
            showToast("Sorry, something went wrong. Please call or WhatsApp us instead.");
        } finally {
            btn.disabled = false;
            btn.innerHTML = original;
        }
    });
});

/* ---------- "SEND ON WHATSAPP" BUTTONS ---------- */
document.querySelectorAll("[data-wa-form]").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const form = document.getElementById(btn.dataset.waForm);
        if (!form) return;
        const data = new FormData(form);
        const lines = ["*New Enquiry — TopCraft*"];
        data.forEach((v, k) => {
            if (v && typeof v === "string") lines.push(`*${k}:* ${v}`);
        });
        const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank");
    });
});

/* ---------- LIGHTBOX (GLightbox init if present) ---------- */
if (window.GLightbox) {
    GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
}

/* ---------- SMOOTH ANCHOR SCROLL WITH OFFSET ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        const offset = 90;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    });
});