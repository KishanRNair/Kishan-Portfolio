/**
 * Central site configuration — EDIT THIS FILE to personalize the site.
 * Name, role, availability, email, and social links all live here.
 */
export const site = {
  // TODO: Replace with your real name / wordmark.
  name: "Kishan R Nair",
  wordmark: "Kishan R Nair",
  logo: "/KNAIR/wordmark.png",
  // TODO: Replace with your actual role or title.
  role: "Creative Developer & Design Engineer",
  // TODO: Replace with your real availability and location.
  availability: "Available for select projects",
  location: "Bengaluru, India — working worldwide",
  // TODO: Replace with your real email address.
  email: "hello@kishanrnair.dev",
  // TODO: Replace with your real profile URLs.
  socials: [
    { label: "GitHub", url: "https://github.com/your-handle" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle" },
    { label: "X", url: "https://x.com/your-handle" },
  ],
  copyright: `© ${new Date().getFullYear()} Kishan R Nair. All rights reserved.`,
} as const;
