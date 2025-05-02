export const skills = [
  {
    id: "1",
    label: "Skills",
    isOpen:true,
    children: [
      {
        id: "1-1",
        label: "Technical",
        isOpen:true,
        children: [
          {
            id: "1-1-1",
            label: "Languages",
            children: [
              { id: "1-1-1-1", label: "C" },
              { id: "1-1-1-2", label: "C++" },
              { id: "1-1-1-3", label: "JavaScript" },
              { id: "1-1-1-4", label: "TypeScript" },
              { id: "1-1-1-5", label: "Python" },
              { id: "1-1-1-6", label: "GraphQL" },
            ],
          },
          {
            id: "1-1-2",
            label: "Frontend",
            children: [
              { id: "1-1-2-1", label: "React" },
              { id: "1-1-2-2", label: "Next.js" },
              { id: "1-1-2-3", label: "Redux" },
              { id: "1-1-2-4", label: "Zustand" },
              { id: "1-1-2-5", label: "Tailwind CSS" },
              { id: "1-1-2-6", label: "MUI (Material-UI)" },
              { id: "1-1-2-7", label: "HTML" },
              { id: "1-1-2-8", label: "CSS / SCSS" },
              { id: "1-1-2-9", label: "Vitest" },
            ],
          },
          {
            id: "1-1-3",
            label: "Backend",
            children: [
              { id: "1-1-3-1", label: "Node.js" },
              { id: "1-1-3-2", label: "NestJS" },
              { id: "1-1-3-3", label: "Express.js" },
            ],
          },
          {
            id: "1-1-4",
            label: "Database",
            children: [
              { id: "1-1-4-1", label: "SQL" },
              { id: "1-1-4-2", label: "PostgreSQL" },
              { id: "1-1-4-3", label: "MongoDB" },
            ],
          },
          {
            id: "1-1-5",
            label: "Tools",
            children: [
              { id: "1-1-5-1", label: "Git" },
              { id: "1-1-5-2", label: "Swagger" },
              { id: "1-1-5-3", label: "Docker" },
              { id: "1-1-5-4", label: "JIRA" },
              { id: "1-1-5-5", label: "Confluence" },
              { id: "1-1-5-6", label: "Linux" },
            ],
          },
        ],
      },
      {
        id: "1-2",
        label: "Non-Technical / Hobbies",
        isOpen: true,
        children: [
          { id: "1-2-1", label: "Sketching" },
          { id: "1-2-2", label: "Badminton" },
          { id: "1-2-3", label: "Traveling" },
        ],
      },
    ],
  },
];
