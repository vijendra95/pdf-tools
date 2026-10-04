"use client";

import { useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Placeholder from "@tiptap/extension-placeholder";
import MediaPicker from "./MediaPicker";

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "40px"];
const COLORS = ["#111827", "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#0891b2", "#2563eb", "#7c3aed", "#db2777", "#6b7280", "#ffffff"];

function Btn({ on, active, children, title, disabled }: { on: () => void; active?: boolean; children: React.ReactNode; title: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={on}
      className={`px-2 py-1 rounded text-sm font-semibold leading-5 disabled:opacity-30 ${active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-100 text-gray-700"}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span className="w-px bg-gray-300 mx-1 my-1" />;
}

function Dropdown({ label, title, children }: { label: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      <Btn title={title} on={() => setOpen(!open)} active={open}>{label} ▾</Btn>
      {open && (
        <>
          <span className="fixed inset-0 z-10" onMouseDown={(e) => { e.preventDefault(); setOpen(false); }} />
          <span className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-1 flex flex-col min-w-[150px]" onMouseDown={(e) => e.preventDefault()} onClick={() => setOpen(false)}>
            {children}
          </span>
        </>
      )}
    </span>
  );
}

function Item({ on, children }: { on: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={on} className="text-left text-sm px-3 py-1.5 rounded hover:bg-gray-100 whitespace-nowrap">
      {children}
    </button>
  );
}

function ColorGrid({ onPick, onClear }: { onPick: (c: string) => void; onClear: () => void }) {
  return (
    <span className="p-1">
      <span className="grid grid-cols-6 gap-1 mb-1">
        {COLORS.map((col) => (
          <button key={col} type="button" title={col} onClick={() => onPick(col)} className="w-6 h-6 rounded border border-gray-300" style={{ background: col }} />
        ))}
        <label className="w-6 h-6 rounded border border-dashed border-gray-400 cursor-pointer text-[10px] flex items-center justify-center" title="Custom colour">
          +
          <input type="color" className="sr-only" onChange={(e) => onPick(e.target.value)} />
        </label>
      </span>
      <Item on={onClear}>Clear</Item>
    </span>
  );
}

function Toolbar({ editor, onImage, source, toggleSource }: { editor: Editor; onImage: () => void; source: boolean; toggleSource: () => void }) {
  const c = () => editor.chain().focus();
  const link = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (leave empty to remove)", prev || "https://");
    if (url === null) return;
    if (!url) c().unsetLink().run();
    else c().extendMarkRange("link").setLink({ href: url }).run();
  };
  const youtube = () => {
    const url = window.prompt("YouTube video URL", "https://www.youtube.com/watch?v=");
    if (!url) return;
    c().setYoutubeVideo({ src: url, width: 640, height: 360 }).run();
  };
  const imageUrl = () => {
    const url = window.prompt("Image URL", "https://");
    if (!url) return;
    const alt = window.prompt("Image alt text (for SEO)", "") ?? "";
    c().setImage({ src: url, alt }).run();
  };
  const inTable = editor.isActive("table");
  const block = editor.isActive("heading", { level: 1 }) ? "Heading 1"
    : editor.isActive("heading", { level: 2 }) ? "Heading 2"
    : editor.isActive("heading", { level: 3 }) ? "Heading 3"
    : editor.isActive("heading", { level: 4 }) ? "Heading 4"
    : editor.isActive("codeBlock") ? "Code block"
    : editor.isActive("blockquote") ? "Quote" : "Paragraph";
  const fontSize = (editor.getAttributes("textStyle").fontSize as string | undefined) || "Size";

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-gray-50 rounded-t-xl sticky top-0 z-10">
      {!source && (
        <>
          <Dropdown title="Text style" label={block}>
            <Item on={() => c().setParagraph().run()}>Paragraph</Item>
            <Item on={() => c().toggleHeading({ level: 1 }).run()}><b className="text-xl">Heading 1</b></Item>
            <Item on={() => c().toggleHeading({ level: 2 }).run()}><b className="text-lg">Heading 2</b></Item>
            <Item on={() => c().toggleHeading({ level: 3 }).run()}><b>Heading 3</b></Item>
            <Item on={() => c().toggleHeading({ level: 4 }).run()}><b className="text-sm">Heading 4</b></Item>
            <Item on={() => c().toggleBlockquote().run()}>Quote</Item>
            <Item on={() => c().toggleCodeBlock().run()}><code>Code block</code></Item>
          </Dropdown>
          <Dropdown title="Font size" label={fontSize}>
            {FONT_SIZES.map((s) => (
              <Item key={s} on={() => c().setFontSize(s).run()}><span style={{ fontSize: s }}>{s}</span></Item>
            ))}
            <Item on={() => c().unsetFontSize().run()}>Default</Item>
          </Dropdown>
          <Sep />
          <Btn title="Bold (Ctrl+B)" on={() => c().toggleBold().run()} active={editor.isActive("bold")}><b>B</b></Btn>
          <Btn title="Italic (Ctrl+I)" on={() => c().toggleItalic().run()} active={editor.isActive("italic")}><i>I</i></Btn>
          <Btn title="Underline (Ctrl+U)" on={() => c().toggleUnderline().run()} active={editor.isActive("underline")}><u>U</u></Btn>
          <Btn title="Strikethrough" on={() => c().toggleStrike().run()} active={editor.isActive("strike")}><s>S</s></Btn>
          <Btn title="Inline code" on={() => c().toggleCode().run()} active={editor.isActive("code")}>{"<>"}</Btn>
          <Btn title="Subscript" on={() => c().toggleSubscript().run()} active={editor.isActive("subscript")}>X<sub>2</sub></Btn>
          <Btn title="Superscript" on={() => c().toggleSuperscript().run()} active={editor.isActive("superscript")}>X<sup>2</sup></Btn>
          <Dropdown title="Text colour" label={<span style={{ borderBottom: `3px solid ${(editor.getAttributes("textStyle").color as string) || "#111827"}` }}>A</span>}>
            <ColorGrid onPick={(col) => c().setColor(col).run()} onClear={() => c().unsetColor().run()} />
          </Dropdown>
          <Dropdown title="Highlight colour" label={<span className="bg-yellow-200 px-1">A</span>}>
            <ColorGrid onPick={(col) => c().setHighlight({ color: col }).run()} onClear={() => c().unsetHighlight().run()} />
          </Dropdown>
          <Btn title="Clear formatting" on={() => c().unsetAllMarks().clearNodes().run()}>Tx</Btn>
          <Sep />
          <Btn title="Align left" on={() => c().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })}>⇤</Btn>
          <Btn title="Align centre" on={() => c().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })}>☰</Btn>
          <Btn title="Align right" on={() => c().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })}>⇥</Btn>
          <Btn title="Justify" on={() => c().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })}>≡</Btn>
          <Sep />
          <Btn title="Bullet list" on={() => c().toggleBulletList().run()} active={editor.isActive("bulletList")}>• List</Btn>
          <Btn title="Numbered list" on={() => c().toggleOrderedList().run()} active={editor.isActive("orderedList")}>1. List</Btn>
          <Btn title="Indent list item" on={() => c().sinkListItem("listItem").run()} disabled={!editor.can().sinkListItem("listItem")}>→</Btn>
          <Btn title="Outdent list item" on={() => c().liftListItem("listItem").run()} disabled={!editor.can().liftListItem("listItem")}>←</Btn>
          <Sep />
          <Btn title="Link" on={link} active={editor.isActive("link")}>🔗 Link</Btn>
          <Dropdown title="Insert image" label="🖼 Image">
            <Item on={onImage}>Upload / choose from gallery</Item>
            <Item on={imageUrl}>From URL</Item>
            {editor.isActive("image") && (
              <>
                <Item on={() => {
                  const alt = window.prompt("Image alt text (for SEO)", (editor.getAttributes("image").alt as string) || "");
                  if (alt !== null) c().updateAttributes("image", { alt }).run();
                }}>Edit alt text</Item>
                <Item on={() => c().deleteSelection().run()}>Remove image</Item>
              </>
            )}
          </Dropdown>
          <Btn title="YouTube video" on={youtube}>▶ Video</Btn>
          <Dropdown title="Table" label={`▦ Table${inTable ? " ✓" : ""}`}>
            <Item on={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Insert 3×3 table</Item>
            <Item on={() => {
              const r = Number(window.prompt("Rows", "4")); const col = Number(window.prompt("Columns", "3"));
              if (r > 0 && col > 0) c().insertTable({ rows: r, cols: col, withHeaderRow: true }).run();
            }}>Insert custom size…</Item>
            {inTable && (
              <>
                <span className="border-t my-1" />
                <Item on={() => c().addRowBefore().run()}>Add row above</Item>
                <Item on={() => c().addRowAfter().run()}>Add row below</Item>
                <Item on={() => c().deleteRow().run()}>Delete row</Item>
                <span className="border-t my-1" />
                <Item on={() => c().addColumnBefore().run()}>Add column left</Item>
                <Item on={() => c().addColumnAfter().run()}>Add column right</Item>
                <Item on={() => c().deleteColumn().run()}>Delete column</Item>
                <span className="border-t my-1" />
                <Item on={() => c().toggleHeaderRow().run()}>Toggle header row</Item>
                <Item on={() => c().toggleHeaderColumn().run()}>Toggle header column</Item>
                <Item on={() => c().mergeOrSplit().run()}>Merge / split cells</Item>
                <span className="border-t my-1" />
                <Item on={() => c().deleteTable().run()}><span className="text-red-600">Delete table</span></Item>
              </>
            )}
          </Dropdown>
          <Btn title="Horizontal line" on={() => c().setHorizontalRule().run()}>―</Btn>
          <Sep />
          <Btn title="Undo (Ctrl+Z)" on={() => c().undo().run()} disabled={!editor.can().undo()}>↶</Btn>
          <Btn title="Redo (Ctrl+Y)" on={() => c().redo().run()} disabled={!editor.can().redo()}>↷</Btn>
        </>
      )}
      <span className="flex-1" />
      <Btn title="Edit HTML" on={toggleSource} active={source}>&lt;/&gt; HTML</Btn>
    </div>
  );
}

export default function RichEditor({ value, onChange, placeholder }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const [picker, setPicker] = useState(false);
  const [source, setSource] = useState(false);
  const [html, setHtml] = useState(value);
  const [, setTick] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false }, heading: { levels: [1, 2, 3, 4] } }),
      Image.configure({ inline: false, allowBase64: false }),
      TableKit.configure({ table: { resizable: true } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyleKit,
      Highlight.configure({ multicolor: true }),
      Youtube.configure({ nocookie: true }),
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder: placeholder || "Write your content here…" }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: { attributes: { class: "rich-content rich-editor min-h-[320px] p-4 focus:outline-none" } },
    onUpdate: ({ editor }) => {
      const h = editor.getHTML();
      setHtml(h);
      onChange(h);
    },
    onSelectionUpdate: () => setTick((t) => t + 1),
    onTransaction: () => setTick((t) => t + 1),
  });

  if (!editor) return <div className="border rounded-xl min-h-[360px] bg-white" />;

  const words = editor.getText().trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="border border-gray-300 rounded-xl bg-white">
      <Toolbar
        editor={editor}
        source={source}
        onImage={() => setPicker(true)}
        toggleSource={() => {
          if (source) editor.commands.setContent(html);
          setSource(!source);
        }}
      />
      {source ? (
        <textarea
          className="w-full min-h-[360px] p-4 font-mono text-sm focus:outline-none"
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            onChange(e.target.value);
          }}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
      <div className="px-4 py-1.5 border-t text-xs text-gray-500 flex justify-between rounded-b-xl bg-gray-50">
        <span>{words} words</span>
        <span>Tip: select text to format it; click inside a table for row/column options.</span>
      </div>
      <MediaPicker
        open={picker}
        onClose={() => setPicker(false)}
        onSelect={(url, alt) => {
          const a = window.prompt("Image alt text (for SEO)", alt) ?? alt;
          editor.chain().focus().setImage({ src: url, alt: a }).run();
        }}
      />
    </div>
  );
}
