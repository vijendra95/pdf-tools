import StaticPage, { staticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return staticPageMetadata("faq");
}

export default function Page() {
  return <StaticPage pageKey="faq" />;
}
