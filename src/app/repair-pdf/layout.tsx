import ToolContent, { toolMetadata } from "@/components/ToolContent";

export function generateMetadata() {
  return toolMetadata("repair-pdf");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolContent slug="repair-pdf" />
    </>
  );
}
