import StaticPage, { staticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return staticPageMetadata("about");
}

export default function Page() {
  return <StaticPage pageKey="about" />;
}
