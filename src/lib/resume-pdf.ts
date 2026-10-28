import { jsPDF } from "jspdf";
import { resume } from "@/data/resume";

/**
 * Builds a real, multi-page-capable PDF from the central resume data file.
 * Runs client-side (called from the Download button on /resume).
 */
export async function downloadResumePdf() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed <= pageH - margin) return;
    doc.addPage();
    y = margin;
  };

  const ink = "#1a1917";
  const accent = "#8a7340";
  const gray = "#5a564f";

  doc.setTextColor(ink);

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(resume.name, margin, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(accent);
  doc.text(resume.title, margin, y);
  y += 18;
  doc.setFontSize(9);
  doc.setTextColor(gray);
  const contactLine = resume.contacts
    .map((c) => (c.href ? `${c.label}: ${c.value}` : `${c.label}: ${c.value}`))
    .join("  ·  ");
  doc.text(doc.splitTextToSize(contactLine, contentW), margin, y);
  y += 30;
  doc.setDrawColor(accent);
  doc.setLineWidth(1);
  doc.line(margin, y, pageW - margin, y);
  y += 26;
  doc.setTextColor(ink);

  const section = (title: string) => {
    ensureSpace(46);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accent);
    doc.text(title.toUpperCase(), margin, y);
    y += 8;
    doc.setDrawColor("#ddd8cf");
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageW - margin, y);
    y += 16;
    doc.setTextColor(ink);
  };

  const paragraph = (text: string, opts?: { indent?: number; size?: number }) => {
    const indent = opts?.indent ?? 0;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(opts?.size ?? 10);
    const lines = doc.splitTextToSize(text, contentW - indent) as string[];
    for (const line of lines) {
      ensureSpace(14);
      doc.text(line, margin + indent, y);
      y += 13;
    }
    y += 6;
  };

  // Summary
  section("Professional summary");
  paragraph(resume.summary);

  // Skills
  section("Skills");
  for (const group of resume.skills) {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${group.group}:`, margin, y);
    const labelW = doc.getTextWidth(`${group.group}: `) + 6;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(
      group.items,
      contentW - labelW
    ) as string[];
    doc.text(lines, margin + labelW, y);
    y += 13 * lines.length + 6;
  }
  y += 6;

  // Experience
  section("Experience");
  for (const job of resume.experience) {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(job.role, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(accent);
    doc.text(job.company, margin, y);
    doc.setTextColor(gray);
    doc.text(job.period, pageW - margin - doc.getTextWidth(job.period), y);
    y += 16;
    doc.setTextColor(ink);
    for (const point of job.points) {
      paragraph(`•  ${point}`, { indent: 10 });
    }
    y += 8;
  }

  // Education
  section("Education");
  for (const ed of resume.education) {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(ed.degree, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(accent);
    doc.text(ed.school, margin, y);
    doc.setTextColor(gray);
    doc.text(ed.period, pageW - margin - doc.getTextWidth(ed.period), y);
    y += 22;
    doc.setTextColor(ink);
  }

  // Projects
  section("Selected projects");
  for (const proj of resume.projects) {
    ensureSpace(26);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(proj.name, margin, y);
    y += 13;
    paragraph(proj.note, { indent: 10, size: 9 });
  }

  // Certifications
  if (resume.certifications.length > 0) {
    section("Certifications");
    for (const cert of resume.certifications) {
      paragraph(`•  ${cert.name} — ${cert.issuer}`, { indent: 10, size: 10 });
    }
  }

  doc.save(`${resume.name.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`);
}
