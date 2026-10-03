import ToolContent, { toolMetadata } from "@/components/ToolContent";

export function generateMetadata() {
  return toolMetadata("extract-pages");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolContent slug="extract-pages" />
    </>
  );
}
