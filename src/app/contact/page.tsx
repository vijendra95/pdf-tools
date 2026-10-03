import StaticPage, { staticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return staticPageMetadata("contact");
}

export default function Page() {
  return <StaticPage pageKey="contact" />;
}
