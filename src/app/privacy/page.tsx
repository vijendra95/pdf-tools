import StaticPage, { staticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return staticPageMetadata("privacy");
}

export default function Page() {
  return <StaticPage pageKey="privacy" />;
}
