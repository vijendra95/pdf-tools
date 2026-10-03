import ToolContent, { toolMetadata } from "@/components/ToolContent";

export function generateMetadata() {
  return toolMetadata("watermark-pdf");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolContent slug="watermark-pdf" />
    </>
  );
}
