import dynamic from "next/dynamic";

// Dynamically import the SkillSection component without SSR
const SkillSection = dynamic(() => import("@/components/skills"), {
  ssr: false,
});

export default function Skills() {
    return <SkillSection/>;
}
