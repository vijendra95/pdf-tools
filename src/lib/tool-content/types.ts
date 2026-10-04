export interface ToolInfo {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string[];
  steps: string[];
  features: [string, string][];
  useCases: string[];
  faqs: [string, string][];
  privacy?: string;
}

export { SITE_URL } from "../site";
