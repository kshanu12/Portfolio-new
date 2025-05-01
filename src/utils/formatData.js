import { aboutDetails } from "@/constants/about";
import { expDetails } from "@/constants/expDetails";
import { projects } from "@/constants/projectDetails";
import { skills } from "@/constants/skills";

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

export function formatAbout() {
  return aboutDetails.join("\n\n");
}

export function formatProjects() {
  return projects
    .map(
      (p, i) =>
        `🛠 Project ${i + 1}: ${p.name}\nDescription: ${p.description}\nLive: ${
          p.liveUrl
        }\nCode: ${p.githubUrl}`
    )
    .join("\n\n");
}

export function formatSkills() {
  function recurse(skillList, level = 0) {
    return skillList
      .map((s) => {
        const indent = "  ".repeat(level);
        const label = `${indent}- ${s.label}`;
        const children = s.children ? recurse(s.children, level + 1) : "";
        return `${label}\n${children}`;
      })
      .join("\n");
  }
  return recurse(skills);
}