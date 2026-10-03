import ToolContent, { toolMetadata } from "@/components/ToolContent";

export function generateMetadata() {
  return toolMetadata("pdf-forms");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToolContent slug="pdf-forms" />
    </>
  );
}
