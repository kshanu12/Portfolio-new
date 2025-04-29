import { expDetails } from "@/constants/expDetails";

export function formatExperience() {
  const school = expDetails.filter((e) => e.type === "school");
  const work = expDetails.filter((e) => e.type === "work");

  const format = (entries) =>
    entries
      .map(
        (entry) => `
Title: ${entry.title}
Company: ${entry.company_name}
Date: ${entry.date}
Details: 
- ${entry.points.join("\n- ")}
`
      )
      .join("\n");

  return `EDUCATION:\n${format(school)}\n\nWORK EXPERIENCE:\n${format(work)}`;
}
