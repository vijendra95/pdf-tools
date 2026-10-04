import StaticPage, { staticPageMetadata } from "@/components/StaticPage";

export function generateMetadata() {
  return staticPageMetadata("terms");
}

export default function Page() {
  return <StaticPage pageKey="terms" />;
}
