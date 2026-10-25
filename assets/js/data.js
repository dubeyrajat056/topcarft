/* ==========================================================================
   TOPCRAFT — CENTRAL DATA & CONFIG
   Edit this ONE file to update contact info, images, clients,
   accessories, profiles, projects and products across the whole site.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) SITE CONFIG — single edit updates every page
   -------------------------------------------------------------------------- */
const siteConfig = {
    companyName: "TopCraft Aluminium Formwork System Pvt. Ltd.",
    shortName: "TopCraft",
    tagline: "Aluminium Formwork System",
    officeAddress: "[Office & Plant Address]",
    phone: "[Phone]",
    phoneHref: "", // if empty, JS builds tel: from phone
    email: "[Email]",
    website: "[Website]",
    whatsapp: "[WhatsApp number]", // digits only, country code e.g. 9198XXXXXXXX
    workingHours: "Mon – Sat, 9:00 AM – 7:00 PM IST",
    formEndpoint: "[FORM ENDPOINT]", // Web3Forms / Formspree endpoint placeholder
    social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
        youtube: "#"
    }
};

/* --------------------------------------------------------------------------
   2) IMAGE MAP — swap any image by changing one URL here
   All images from Unsplash / Pexels are hotlink-friendly.
   -------------------------------------------------------------------------- */
const IMG = {
    logo: "assets/img/logo.png", // "/assets/img/logo.png" — leave empty to use SVG fallback
    hero: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=75",
    plant: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=75",
    panels: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75",
    about: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=75",
    aboutSmall: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=75",
    workers: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=75",
    welding: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=75",
    accessories: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=75",
    profiles: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=75",
    refurb: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=75",
    residential: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=75",
    highrise: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75",
    commercial: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=75",
    infra: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=75",
    site: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=75",
    concrete: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&w=1200&q=75",
    projects: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75"
    ],
    gallery: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&w=1200&q=75"
    ]
};

/* --------------------------------------------------------------------------
   3) CLIENTS — add/remove by editing this array.
   file: "assets/img/clients/ncc.png" (optional). If missing, a text tile is shown.
   -------------------------------------------------------------------------- */
const CLIENTS = [
    { name: "NCC", file: "" },
    { name: "NJR", file: "" },
    { name: "Dosti", file: "" },
    { name: "JMC Projects", file: "" },
    { name: "Madhure", file: "" },
    { name: "Simplex Infrastructures", file: "" },
    { name: "Nyati", file: "" },
    { name: "Larsen & Toubro", file: "" },
    { name: "Golden Developer", file: "" },
    { name: "Shapoorji Pallonji", file: "" },
    { name: "Abhijit Realtors & Infraventures", file: "" },
    { name: "JP Infra", file: "" },
    { name: "CNTC", file: "" },
    { name: "Kothari Construction Co.", file: "" },
    { name: "Lodha", file: "" }
];

/* --------------------------------------------------------------------------
   4) ACCESSORIES
   -------------------------------------------------------------------------- */
const ACCESSORIES = [
    { name: "Alignment Jack / Push-Pull Jack", cat: "alignment", tag: "Alignment", img: IMG.accessories },
    { name: "Beam Bar", cat: "beam", tag: "Beam" },
    { name: "BKS Patti", cat: "patti", tag: "Beam" },
    { name: "Bombay Nails", cat: "fasteners", tag: "Fasteners" },
    { name: "Hex Nut Welded Tie Rod", cat: "tie", tag: "Tie System" },
    { name: "Hole Bar", cat: "fasteners", tag: "Fasteners" },
    { name: "Long Pin", cat: "fasteners", tag: "Fasteners" },
    { name: "L-Pin", cat: "fasteners", tag: "Fasteners" },
    { name: "MS Jally", cat: "deck", tag: "Deck" },
    { name: "Panel Puller", cat: "tools", tag: "Tools" },
    { name: "Pin & Wedges", cat: "fasteners", tag: "Fasteners" },
    { name: "Props (Adjustable)", cat: "props", tag: "Props" },
    { name: "PVC Cone", cat: "pvc", tag: "PVC" },
    { name: "PVC Hard Sleeve", cat: "pvc", tag: "PVC" },
    { name: "PVC Sleeve Cover", cat: "pvc", tag: "PVC" },
    { name: "PVC Sleeve (Coloured)", cat: "pvc", tag: "PVC" },
    { name: "Tie Puller", cat: "tools", tag: "Tools" },
    { name: "Tie Rod with Wing Nut (16 mm)", cat: "tie", tag: "Tie System" },
    { name: "Turn Buckle with Wire", cat: "alignment", tag: "Alignment" },
    { name: "Kicker & Rocker Nut + Bolt + Washer", cat: "fasteners", tag: "Fasteners" },
    { name: "Wall Attached Bracket (600×1000, 600×800)", cat: "brackets", tag: "Brackets" },
    { name: "Wall Tie", cat: "tie", tag: "Tie System" },
    { name: "Waller Bracket", cat: "brackets", tag: "Brackets" },
    { name: "Wing Nut", cat: "fasteners", tag: "Fasteners" },
    { name: "U-Jack", cat: "props", tag: "Props" },
    { name: "PP Sheet", cat: "pvc", tag: "PVC" },
    { name: "Polythene Roll", cat: "pvc", tag: "PVC" }
];

/* --------------------------------------------------------------------------
   5) EXTRUSION PROFILES
   -------------------------------------------------------------------------- */
const PROFILES = [
    { name: "Channel", sizes: "50 mm – 300 mm", note: "C-section for wall panels & stiffening" },
    { name: "L-Sections", sizes: "100 mm – 300 mm", note: "Corner & edge profiles" },
    { name: "IC Profile", sizes: "100×100, 100×125, 100×150", note: "Internal corner profile" },
    { name: "SL Profile", sizes: "On request", note: "Slab edge profile" },
    { name: "Soldier Profile (EB & MB)", sizes: "Standard", note: "Vertical stiffener" },
    { name: "ECA Profile", sizes: "65×65 mm", note: "External corner angle" },
    { name: "RK Profile", sizes: "50, 75, 100, 125", note: "Rail & kicker" },
    { name: "Side Rail", sizes: "61 mm", note: "Panel perimeter rail" },
    { name: "Main Frame", sizes: "65 mm", note: "Panel frame" },
    { name: "U-Profiles", sizes: "Small, Medium, Big", note: "Deck & slab edges" },
    { name: "I-Stiffener", sizes: "For deck panels", note: "Deck panel stiffener" },
    { name: "Round Pipe", sizes: "32 mm & 38 mm dia", note: "Props & bracing" },
    { name: "BKS Patti", sizes: "Standard", note: "Beam support" },
    { name: "Beam Bar", sizes: "Standard", note: "Beam alignment" },
    { name: "Props", sizes: "Adjustable", note: "Slab & beam shoring" }
];

/* --------------------------------------------------------------------------
   6) PROJECTS
   -------------------------------------------------------------------------- */
const PROJECTS = [
    { name: "[Project Name]", location: "[City, State]", category: "residential", area: "[Area] sq.ft.", img: IMG.projects[0] },
    { name: "[Project Name]", location: "[City, State]", category: "high-rise", area: "[Area] sq.ft.", img: IMG.projects[1] },
    { name: "[Project Name]", location: "[City, State]", category: "residential", area: "[Area] sq.ft.", img: IMG.projects[2] },
    { name: "[Project Name]", location: "[City, State]", category: "commercial", area: "[Area] sq.ft.", img: IMG.projects[3] },
    { name: "[Project Name]", location: "[City, State]", category: "infrastructure", area: "[Area]", img: IMG.projects[4] },
    { name: "[Project Name]", location: "[City, State]", category: "high-rise", area: "[Area] sq.ft.", img: IMG.projects[5] }
];

/* --------------------------------------------------------------------------
   7) PRODUCTS / CATEGORIES (used by products.html & homepage grid)
   -------------------------------------------------------------------------- */
const PRODUCTS = [
    {
        slug: "aluminium-formwork-system",
        title: "Aluminium Formwork System",
        cat: "systems",
        img: IMG.panels,
        text: "Lightweight, high-repetition wall & slab panel system for monolithic concrete construction."
    },
    {
        slug: "columns-beams",
        title: "Columns & Beams",
        cat: "systems",
        img: IMG.concrete,
        text: "Precision-engineered beam and column formwork for challenging structural designs."
    },
    {
        slug: "slab-deck-panels",
        title: "Slab / Deck Panels",
        cat: "systems",
        img: IMG.site,
        text: "Deck panels, I-stiffeners, props and jacks for fast, flat and safe slab cycles."
    },
    {
        slug: "accessories",
        title: "Accessories",
        cat: "accessories",
        img: IMG.accessories,
        text: "Complete range of tie rods, pins, wedges, brackets, PVC sleeves and tools."
    },
    {
        slug: "extrusion-profiles",
        title: "Extrusion Profiles",
        cat: "profiles",
        img: IMG.profiles,
        text: "Channels, L-sections, IC/SL profiles, soldier profiles and custom extrusions."
    },
    {
        slug: "refurbishment",
        title: "Refurbishment & Modification",
        cat: "services",
        img: IMG.refurb,
        text: "Cleaning, resizing, redesigning and re-lacquering of used aluminium formwork."
    }
];

/* Expose globally (no modules → works on file://) */
window.siteConfig = siteConfig;
window.IMG = IMG;
window.CLIENTS = CLIENTS;
window.ACCESSORIES = ACCESSORIES;
window.PROFILES = PROFILES;
window.PROJECTS = PROJECTS;
window.PRODUCTS = PRODUCTS;