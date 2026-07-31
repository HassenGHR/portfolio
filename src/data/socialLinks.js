import {
  IconLinkedIn,
  IconGitHub,
  IconDataCamp,
  IconWhatsApp,
} from "../components/icons/Icons";

// One source for every place these render (header + mobile menu), so they
// can't drift apart the way the nav lists did.
export const socialLinks = [
  {
    name: "WhatsApp",
    url: "https://wa.me/213542761377",
    icon: IconWhatsApp,
    hover: "hover:text-green-400",
  },
  {
    name: "LinkedIn",
    url: import.meta.env.VITE_LINKEDIN_URL || "#",
    icon: IconLinkedIn,
    hover: "hover:text-blue-400",
  },
  {
    name: "GitHub",
    url: import.meta.env.VITE_GITHUB_URL || "#",
    icon: IconGitHub,
    hover: "hover:text-white",
  },
  {
    name: "DataCamp",
    url: import.meta.env.VITE_DATACAMP_URL || "#",
    icon: IconDataCamp,
    hover: "hover:text-emerald-400",
  },
];
