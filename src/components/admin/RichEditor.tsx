"use client";

import { useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MediaPicker from "./MediaPicker";

function Btn({ on, active, children, title }: { on: () => void; active?: boolean; children: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={on}
      className={`px-2.5 py-1 rounded text-sm font-semibold ${active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-100 text-gray-700"}`}
    >
      {children}
    </button>
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
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 rounded-t-xl sticky top-0 z-10">
      {!source && (
        <>
          <Btn title="Bold" on={() => c().toggleBold().run()} active={editor.isActive("bold")}>B</Btn>
          <Btn title="Italic" on={() => c().toggleItalic().run()} active={editor.isActive("italic")}><i>I</i></Btn>
          <Btn title="Underline" on={() => c().toggleUnderline().run()} active={editor.isActive("underline")}><u>U</u></Btn>
          <Btn title="Heading 2" on={() => c().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>H2</Btn>
          <Btn title="Heading 3" on={() => c().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>H3</Btn>
          <Btn title="Paragraph" on={() => c().setParagraph().run()} active={editor.isActive("paragraph")}>P</Btn>
          <Btn title="Bullet list" on={() => c().toggleBulletList().run()} active={editor.isActive("bulletList")}>• List</Btn>
          <Btn title="Numbered list" on={() => c().toggleOrderedList().run()} active={editor.isActive("orderedList")}>1. List</Btn>
          <Btn title="Quote" on={() => c().toggleBlockquote().run()} active={editor.isActive("blockquote")}>❝</Btn>
          <Btn title="Link" on={link} active={editor.isActive("link")}>🔗 Link</Btn>
          <Btn title="Image" on={onImage}>🖼 Image</Btn>
          <Btn title="Horizontal line" on={() => c().setHorizontalRule().run()}>―</Btn>
          <Btn title="Undo" on={() => c().undo().run()}>↶</Btn>
          <Btn title="Redo" on={() => c().redo().run()}>↷</Btn>
        </>
      )}
      <span className="flex-1" />
      <Btn title="Edit HTML" on={toggleSource} active={source}>&lt;/&gt; HTML</Btn>
    </div>
  );
}

export default function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [picker, setPicker] = useState(false);
  const [source, setSource] = useState(false);
  const [html, setHtml] = useState(value);

  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } }), Image],
    content: value,
    immediatelyRender: false,
    editorProps: { attributes: { class: "rich-content min-h-[220px] p-4 focus:outline-none" } },
    onUpdate: ({ editor }) => {
      const h = editor.getHTML();
      setHtml(h);
      onChange(h);
    },
  });

  if (!editor) return <div className="border rounded-xl min-h-[260px] bg-white" />;

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
          className="w-full min-h-[260px] p-4 font-mono text-sm rounded-b-xl focus:outline-none"
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            onChange(e.target.value);
          }}
        />
      ) : (
        <EditorContent editor={editor} />
      )}
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
