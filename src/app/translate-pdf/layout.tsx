import ToolContent, { toolMetadata } from "@/components/ToolContent";

export function generateMetadata() {
  return toolMetadata("translate-pdf");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolContent slug="translate-pdf" />
    </>
  );
}
