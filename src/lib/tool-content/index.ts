import type { ToolInfo } from "./types";
import { organizeContent } from "./organize";
import { convertContent } from "./convert";
import { editSecurityContent } from "./edit-security";
import { intelligenceAudioContent } from "./intelligence-audio";

export const toolContent: Record<string, ToolInfo> = {
  ...organizeContent,
  ...convertContent,
  ...editSecurityContent,
  ...intelligenceAudioContent,
};
