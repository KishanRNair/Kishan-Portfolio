/**
 * Central site configuration — EDIT THIS FILE to personalize the site.
 * Name, role, availability, email, and social links all live here.
 */
export const site = {
  name: "Kishan R Nair",
  wordmark: "Kishan R Nair",
  logo: "/KNAIR/wordmark.png",
  role: "Full-Stack Developer · AI/ML Engineer · Creative Technologist",
  availability: "Available for select opportunities & projects",
  location: "Kochi, Kerala, India — Working Worldwide",
  email: "kishanrnairwork@gmail.com",
  phone: "+91 8848045083",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kishan-r-nair-76a183268" },
    { label: "Email", url: "mailto:kishanrnairwork@gmail.com" },
  ],
  copyright: `© ${new Date().getFullYear()} Kishan R Nair. All rights reserved.`,
} as const;
