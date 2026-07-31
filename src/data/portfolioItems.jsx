import iraraClient from "../assets/projects/irara-client.png";
import iraraDriver from "../assets/projects/irara-driver.png";
import gmtentes from "../assets/projects/gmtentes.jpg";
import gmBonPour from "../assets/projects/gmbonpour.png";
import goldenStoreApp from "../assets/projects/goldenstore-app.jpg";

export const portfolioItems = [
  {
    id: 11,
    title: "Irara Express — Delivery Marketplace",
    demo: "https://iraraexpress.com/",
    desc: "A nationwide parcel-delivery marketplace: customers book a delivery, nearby drivers bid on it, and both sides follow the courier live on a map. Spans two mobile apps, a real-time backend and an operations back office.",
    img: iraraClient,
    category: "Full-Stack",
    tech: ["Flutter", "Node.js", "Fastify", "PostgreSQL", "Redis", "React"],
    features: [
      "Real-time driver matching and live bidding",
      "Live map tracking from pickup to drop-off",
      "Wallet, cash-on-delivery and driver settlement",
      "Operations back office with role-based access",
    ],
  },
  {
    id: 12,
    title: "Irara Drive — Courier App",
    demo: "#",
    private: true,
    desc: "The driver side of the marketplace: couriers go online, receive nearby jobs, bid, navigate multi-stop routes and track their earnings. Published on Google Play.",
    img: iraraDriver,
    category: "Flutter Developer",
    tech: ["Flutter", "Dart", "Google Maps", "FCM", "WebSockets"],
    features: [
      "Push-driven job offers with route preview",
      "Multi-stop navigation and per-parcel handling",
      "Earnings dashboard and cash reconciliation",
    ],
  },
  {
    id: 13,
    title: "HR Platform — Odoo & Flutter",
    demo: "#",
    private: true,
    desc: "An HR management platform pairing a Flutter desktop and mobile client with a self-hosted Odoo backend, extended with a custom module for Algerian labour-law requirements.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    category: "Full-Stack",
    tech: ["Flutter", "Riverpod", "Odoo 17", "PostgreSQL", "Docker"],
    features: [
      "Employee records, contracts and decisions",
      "Leave requests, approvals and attendance",
      "Custom Odoo module for local compliance",
    ],
  },
  {
    id: 14,
    title: "GMTentes — Camping Store",
    demo: "https://gmtentes.com/",
    desc: "An Arabic-first storefront for camping and outdoor gear, built with Next.js. Fully right-to-left, with cash-on-delivery checkout and nationwide shipping.",
    img: gmtentes,
    category: "Web Development",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    features: [
      "Right-to-left Arabic storefront",
      "Cash-on-delivery ordering",
      "Nationwide delivery coverage",
    ],
  },
  {
    id: 15,
    title: "GM Bon Pour — Desktop Back Office",
    demo: "#",
    private: true,
    desc: "A Windows desktop back office for a retail business, built in Flutter. Every add and edit form opens as its own native window so staff can work across several records at once.",
    img: gmBonPour,
    imgFit: "contain",
    category: "Full-Stack",
    tech: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    features: [
      "Multi-window desktop workflow",
      "Orders, receipts and delivery tracking",
      "Arabic and French interface",
    ],
  },
  {
    id: 1,
    title: "Golden Store — E-Commerce Platform",
    demo: "https://golden-store.store/",
    desc: "An online store with a customer mobile app and an admin back office covering catalogue, stock, sales and marketing reporting.",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
    category: "Full-Stack",
    tech: ["Flutter", "Next.js", "Supabase", "PostgreSQL"],
    features: [
      "Customer mobile app",
      "Stock and sales management",
      "Order tracking",
    ],
  },
  {
    id: 9,
    title: "Golden Store — Shopping App",
    demo: "#",
    private: true,
    desc: "The Golden Store customer app, built in Flutter with clean architecture. Offline-first: the catalogue, cart and orders work from a local database and sync to the cloud when a connection returns.",
    img: goldenStoreApp,
    imgFit: "contain",
    category: "Flutter Developer",
    tech: ["Flutter", "Riverpod", "SQLite", "Firebase"],
    features: [
      "Offline-first catalogue and cart",
      "Checkout, orders and order tracking",
      "Light and dark themes",
    ],
  },
];
