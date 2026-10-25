/* ==========================================================================
   TOPCRAFT — MAIN BEHAVIOUR
   Vanilla JS only. Every init is guarded so missing elements never throw.
   ========================================================================== */
(function () {
    "use strict";

    /* ------------------------------------------------------------------
       0) Helpers
       ------------------------------------------------------------------ */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
    const prefersReduced = () =>
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cfg = window.siteConfig || {};
    const IMG = window.IMG || {};

    /* SVG fallback logo (vertical bars + wordmark) */
    function svgLogo(height = 52) {
        return (
            `<svg viewBox="0 0 300 60" height="${height}" role="img" aria-label="TopCraft Aluminium Formwork System logo" xmlns="http://www.w3.org/2000/svg">` +
            `<g fill="#1E2124">` +
            `<rect x="0"  y="18" width="6" height="42"/>` +
            `<rect x="10" y="6"  width="6" height="54"/>` +
            `<rect x="20" y="26" width="6" height="34"/>` +
            `<rect x="30" y="2"  width="6" height="58"/>` +
            `<rect x="40" y="22" width="6" height="38"/>` +
            `</g>` +
            `<g fill="#0B5FB5">` +
            `<rect x="50" y="14" width="6" height="46"/>` +
            `<rect x="60" y="28" width="6" height="32"/>` +
            `</g>` +
            `<text x="80" y="34" font-family="Montserrat, sans-serif" font-size="26" font-weight="800" fill="#1E2124">TOP</text>` +
            `<text x="158" y="34" font-family="Montserrat, sans-serif" font-size="26" font-weight="800" fill="#0B5FB5">CROFT</text>` +
            `<text x="82" y="48" font-family="Montserrat, sans-serif" font-size="7" letter-spacing="2" fill="#6B7580">ALUMINIUM FORMWORK SYSTEM</text>` +
            `</svg>`
        );
    }

    /* Inline SVG placeholder for broken images */
    function placeholderSVG(label) {
        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">` +
                `<rect width="800" height="500" fill="#1E2124"/>` +
                `<g fill="#2F86E0" opacity=".85">` +
                `<rect x="60"  y="300" width="22" height="140"/>` +
                `<rect x="100" y="220" width="22" height="220"/>` +
                `<rect x="140" y="280" width="22" height="160"/>` +
                `<rect x="180" y="180" width="22" height="260"/>` +
                `<rect x="220" y="260" width="22" height="180"/>` +
                `</g>` +
                `<g fill="#0B5FB5" opacity=".85">` +
                `<rect x="260" y="240" width="22" height="200"/>` +
                `<rect x="300" y="320" width="22" height="120"/>` +
                `</g>` +
                `<text x="400" y="290" text-anchor="middle" fill="#fff" font-family="Montserrat, sans-serif" font-size="28" font-weight="700">TOPCRAFT</text>` +
                `<text x="400" y="322" text-anchor="middle" fill="#AEB6BF" font-family="Inter, sans-serif" font-size="16">${label || "Image coming soon"}</text>` +
                `</svg>`
            )
        );
    }

    /* Toast */
    function toast(message, type) {
        let el = $("#tcToast");
        if (!el) {
            el = document.createElement("div");
            el.id = "tcToast";
            el.className = "toast-tc";
            el.setAttribute("role", "status");
            el.setAttribute("aria-live", "polite");
            document.body.appendChild(el);
        }
        el.textContent = message;
        el.className = "toast-tc" + (type ? " toast-tc--" + type : "");
        requestAnimationFrame(() => el.classList.add("is-visible"));
        clearTimeout(el._t);
        el._t = setTimeout(() => el.classList.remove("is-visible"), 4200);
    }
    window.tcToast = toast;

    /* ------------------------------------------------------------------
       1) Loader
       ------------------------------------------------------------------ */
    function initLoader() {
        const loader = $("#tcLoader");
        if (!loader) return;
        const hide = () => loader.classList.add("is-hidden");
        if (prefersReduced()) { hide(); return; }
        window.addEventListener("load", () => setTimeout(hide, 280));
        // safety net
        setTimeout(hide, 2600);
    }

    /* ------------------------------------------------------------------
       2) Config injection (data-config="phone" etc.)
       ------------------------------------------------------------------ */
    function initConfig() {
        const telHref = cfg.phoneHref || (cfg.phone ? "tel:" + String(cfg.phone).replace(/[^\d+]/g, "") : "#");
        const mailHref = cfg.email ? "mailto:" + cfg.email : "#";
        const waDigits = (cfg.whatsapp || "").replace(/[^\d]/g, "");
        const waHref = waDigits ? "https://wa.me/" + waDigits : "#";

        const map = {
            companyName: cfg.companyName || "",
            shortName: cfg.shortName || "",
            tagline: cfg.tagline || "",
            address: cfg.officeAddress || "",
            phone: cfg.phone || "",
            email: cfg.email || "",
            website: cfg.website || "",
            whatsapp: cfg.whatsapp || "",
            hours: cfg.workingHours || "",
            year: new Date().getFullYear()
        };

        $$("[data-config]").forEach((el) => {
            const key = el.getAttribute("data-config");
            if (map[key] !== undefined && map[key] !== "") {
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.value = map[key];
                else el.textContent = map[key];
            }
        });

        $$("[data-href='phone']").forEach((el) => el.setAttribute("href", telHref));
        $$("[data-href='email']").forEach((el) => el.setAttribute("href", mailHref));
        $$("[data-href='whatsapp']").forEach((el) => el.setAttribute("href", waHref));
        $$("[data-href='website']").forEach((el) => {
            if (cfg.website) {
                el.setAttribute("href", cfg.website);
                el.setAttribute("target", "_blank");
                el.setAttribute("rel", "noopener");
            }
        });

        // Social links
        $$("[data-social]").forEach((el) => {
            const k = el.getAttribute("data-social");
            if (cfg.social && cfg.social[k]) el.setAttribute("href", cfg.social[k]);
        });

        // Logo fallback
        $$("[data-logo]").forEach((el) => {
            if (IMG.logo) {
                el.innerHTML = `<img src="${IMG.logo}" alt="${map.companyName} logo" height="52">`;
            } else {
                el.innerHTML = svgLogo(52);
            }
        });

        // Favicon from bars (data URI)
        if (!document.querySelector("link[rel='icon']")) {
            const fav = document.createElement("link");
            fav.rel = "icon";
            fav.type = "image/svg+xml";
            fav.href =
                "data:image/svg+xml," +
                encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
                    `<rect width="64" height="64" rx="12" fill="#1E2124"/>` +
                    `<rect x="14" y="30" width="6" height="22" fill="#0B5FB5"/>` +
                    `<rect x="24" y="18" width="6" height="34" fill="#2F86E0"/>` +
                    `<rect x="34" y="26" width="6" height="26" fill="#0B5FB5"/>` +
                    `<rect x="44" y="12" width="6" height="40" fill="#2F86E0"/>` +
                    `</svg>`
                );
            document.head.appendChild(fav);
        }
    }

    /* ------------------------------------------------------------------
       3) Navbar (sticky shrink + mobile menu)
       ------------------------------------------------------------------ */
    function initNavbar() {
        const nav = $("#tcNav");
        const burger = $("#tcBurger");
        const off = $("#tcOffcanvas");
        const closeBtn = $("#tcOffcanvasClose");

        if (nav) {
            const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
            onScroll();
            window.addEventListener("scroll", onScroll, { passive: true });
        }

        let lastFocus = null;
        function openMenu() {
            if (!off) return;
            lastFocus = document.activeElement;
            off.classList.add("is-open");
            off.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            if (closeBtn) closeBtn.focus();
        }
        function closeMenu() {
            if (!off) return;
            off.classList.remove("is-open");
            off.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            if (lastFocus) lastFocus.focus();
        }
        on(burger, "click", openMenu);
        on(closeBtn, "click", closeMenu);
        on(off, "click", (e) => { if (e.target === off) closeMenu(); });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && off && off.classList.contains("is-open")) closeMenu();
        });

        // Mobile accordion sub-menus
        $$(".tc-mobile-menu > li > a[data-sub]").forEach((a) => {
            on(a, "click", (e) => {
                e.preventDefault();
                const li = a.parentElement;
                const wasOpen = li.classList.contains("is-open");
                $$(".tc-mobile-menu > li.is-open").forEach((x) => {
                    if (x !== li) x.classList.remove("is-open");
                });
                li.classList.toggle("is-open", !wasOpen);
                a.setAttribute("aria-expanded", String(!wasOpen));
            });
        });

        // Smooth-scroll for in-page anchors
        $$('a[href^="#"]').forEach((a) => {
            const href = a.getAttribute("href");
            if (!href || href === "#") return;
            on(a, "click", (e) => {
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
            });
        });
    }

    /* ------------------------------------------------------------------
       4) Reveal on scroll
       ------------------------------------------------------------------ */
    function initReveal() {
        const els = $$(".reveal");
        if (!els.length) return;
        if (prefersReduced() || !("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-visible"));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        en.target.classList.add("is-visible");
                        io.unobserve(en.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        els.forEach((el) => io.observe(el));
    }

    /* ------------------------------------------------------------------
       5) Animated counters
       ------------------------------------------------------------------ */
    function initCounters() {
        const nums = $$("[data-count]");
        if (!nums.length) return;
        const run = (el) => {
            const target = parseFloat(el.getAttribute("data-count"));
            const suffix = el.getAttribute("data-suffix") || "";
            const dur = 1400;
            const start = performance.now();
            const from = 0;
            function frame(t) {
                const p = Math.min((t - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const val = Math.round(from + (target - from) * eased);
                el.textContent = val + suffix;
                if (p < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        };
        if (prefersReduced() || !("IntersectionObserver" in window)) {
            nums.forEach((el) => {
                el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
            });
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        run(en.target);
                        io.unobserve(en.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        nums.forEach((el) => io.observe(el));
    }

    /* ------------------------------------------------------------------
       6) Image fallback (swap to branded SVG on error)
       ------------------------------------------------------------------ */
    function initImageFallback() {
        $$("img").forEach((img) => {
            on(img, "error", () => {
                img.onerror = null;
                img.src = placeholderSVG(img.getAttribute("alt") || "TopCraft");
            });
        });
    }

    /* ------------------------------------------------------------------
       7) Clients marquee / grid
       ------------------------------------------------------------------ */
    function renderClients() {
        const clients = window.CLIENTS || [];
        const track = $("#clientMarqueeTrack");
        if (track && clients.length) {
            const tile = (c) =>
                c.file
                    ? `<div class="client-tile"><img src="${c.file}" alt="${c.name}" height="40" style="max-height:40px;width:auto"></div>`
                    : `<div class="client-tile">${c.name}</div>`;
            // duplicate for seamless loop
            track.innerHTML = clients.map(tile).join("") + clients.map(tile).join("");
        }
    }

    /* ------------------------------------------------------------------
       8) Homepage product grid
       ------------------------------------------------------------------ */
    function renderHomeProducts() {
        const wrap = $("#homeProducts");
        if (!wrap) return;
        const products = window.PRODUCTS || [];
        wrap.innerHTML = products
            .map(
                (p) => `
      <div class="reveal">
        <article class="card-tc h-100">
          <div class="img-wrap">
            <img src="${p.img}" alt="${p.title}" loading="lazy" width="600" height="375">
          </div>
          <div class="card-body-tc">
            <h3 class="card-title-tc">${p.title}</h3>
            <p class="card-text-tc">${p.text}</p>
            <a class="card-link" href="${p.slug}.html">View Details <i class="bi bi-arrow-right"></i></a>
          </div>
        </article>
      </div>`
            )
            .join("");
    }

    /* ------------------------------------------------------------------
       9) Testimonials (placeholder data)
       ------------------------------------------------------------------ */
    const TESTIMONIALS = [
        {
            quote: "[Replace with real testimonial] The TopCraft team delivered our wall panel sets ahead of schedule, and the concrete finish meant we could skip internal plastering on three floors.",
            name: "[Client Name]",
            role: "[Project Manager, Company]"
        },
        {
            quote: "[Replace with real testimonial] Their in-house engineering support caught layout issues at the drawing stage. Slab cycles came down to five days on a 22-storey tower.",
            name: "[Client Name]",
            role: "[Site Engineer, Company]"
        },
        {
            quote: "[Replace with real testimonial] We sent 4,000 sq.m of old panels for refurbishment. They returned resized, re-lacquered and palletised — like new at a fraction of replacement cost.",
            name: "[Client Name]",
            role: "[Procurement Head, Company]"
        }
    ];

    function renderTestimonials() {
        const track = $("#testimonialTrack");
        if (!track) return;
        track.innerHTML = TESTIMONIALS.map(
            (t, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="testimonial">
              <p class="testimonial__quote">“${t.quote}”</p>
              <div class="testimonial__who">
                <div class="testimonial__avatar">${t.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || "TC"}</div>
                <div>
                  <p class="testimonial__name">${t.name}</p>
                  <p class="testimonial__role">${t.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
        ).join("");
    }

    /* ------------------------------------------------------------------
       10) Forms (guarded + endpoint check + WhatsApp helper)
       ------------------------------------------------------------------ */
    function formValues(form) {
        const data = {};
        $$("input, select, textarea", form).forEach((f) => {
            if (!f.name) return;
            if (f.type === "checkbox" || f.type === "radio") {
                if (f.checked) data[f.name] = f.value;
            } else {
                data[f.name] = f.value;
            }
        });
        return data;
    }

    function buildWaLink(form) {
        const digits = (cfg.whatsapp || "").replace(/[^\d]/g, "");
        if (!digits) return "#";
        const data = formValues(form);
        const lines = Object.keys(data)
            .filter((k) => k !== "botcheck" && data[k])
            .map((k) => `${k}: ${data[k]}`);
        const text = encodeURIComponent("TopCraft Enquiry\n" + lines.join("\n"));
        return `https://wa.me/${digits}?text=${text}`;
    }

    function initForms() {
        $$("[data-tc-form]").forEach((form) => {
            // WhatsApp button
            $$("[data-wa-form]", form.parentElement || document).forEach((btn) => {
                if (btn.getAttribute("data-wired")) return;
                btn.setAttribute("data-wired", "1");
                on(btn, "click", (e) => {
                    e.preventDefault();
                    const href = buildWaLink(form);
                    if (href === "#") { toast("WhatsApp number not configured yet.", "warn"); return; }
                    window.open(href, "_blank", "noopener");
                });
            });

            on(form, "submit", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!form.checkValidity()) {
                    form.classList.add("was-validated");
                    const firstBad = form.querySelector(":invalid");
                    if (firstBad) firstBad.focus();
                    return;
                }
                form.classList.add("was-validated");

                const endpoint = (cfg.formEndpoint || "").trim();
                const notConnected = !endpoint || endpoint === "[FORM ENDPOINT]";

                if (notConnected) {
                    toast("Form not yet connected — please email or call us directly.", "warn");
                    return;
                }

                const submitBtn = form.querySelector("[type='submit']");
                if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.innerHTML; submitBtn.innerHTML = "Sending…"; }

                try {
                    const fd = new FormData(form);
                    const res = await fetch(endpoint, {
                        method: "POST",
                        body: fd,
                        headers: { Accept: "application/json" }
                    });
                    if (res.ok) {
                        form.reset();
                        form.classList.remove("was-validated");
                        toast("Thank you! Your enquiry has been sent. We'll respond shortly.", "success");
                    } else {
                        toast("Something went wrong. Please try again or call us.", "error");
                    }
                } catch (err) {
                    toast("Network error. Please email us directly.", "error");
                } finally {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitBtn.dataset.label || "Submit"; }
                }
            });
        });
    }

    /* ------------------------------------------------------------------
       11) Floating buttons
       ------------------------------------------------------------------ */
    function initFloats() {
        const top = $("#tcBackTop");
        if (top) {
            const check = () => top.classList.toggle("is-visible", window.scrollY > 420);
            check();
            window.addEventListener("scroll", check, { passive: true });
            on(top, "click", () =>
                window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" })
            );
        }
    }

    /* ------------------------------------------------------------------
       12) Carousel enhancement (pause on hover handled by Bootstrap;
          swipe handled by Bootstrap 5 natively)
       ------------------------------------------------------------------ */
    function initCarousels() {
        if (!window.bootstrap) return;
        $$(".carousel").forEach((el) => {
            // Bootstrap data attributes handle it; no extra init needed
        });
    }

    /* ------------------------------------------------------------------
       BOOT
       ------------------------------------------------------------------ */
    document.addEventListener("DOMContentLoaded", () => {
        initLoader();
        initConfig();
        initNavbar();
        initReveal();
        initCounters();
        initImageFallback();
        renderClients();
        renderHomeProducts();
        renderTestimonials();
        initForms();
        initFloats();
        initCarousels();
    });
})();