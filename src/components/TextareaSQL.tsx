import { useRef, useEffect } from "react";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor-core";

interface MonacoEditorCoreProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const MonacoEditorCore: React.FC<MonacoEditorCoreProps> = ({
  value,
  onChange,
  name,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      // Create the highlighter, it can be reused
      const highlighter = await createHighlighter({
        themes: ["vitesse-dark", "vitesse-light"],
        langs: ["sql"],
      });

      // Register the languageIds first. Only registered languages will be highlighted.
      monaco.languages.register({ id: "sql" });

      // Register the themes from Shiki, and provide syntax highlighting for Monaco.
      shikiToMonaco(highlighter, monaco);
    })();

    if (editorRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: value,
        language: "sql",
        minimap: { enabled: false },
        automaticLayout: true,
        theme: "vitesse-dark",
      });

      editorInstanceRef.current.onDidChangeModelContent(() => {
        console.log("onDidChangeModelContent");
        const newValue = editorInstanceRef.current?.getValue();
        if (newValue !== undefined) {
          onChange(newValue);
        }
      });
    }

    return () => {
      editorInstanceRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (
      editorInstanceRef.current &&
      editorInstanceRef.current.getValue() !== value
    ) {
      editorInstanceRef.current.setValue(value);
    }
  }, [value]);

  return (
    <>
      <input type="hidden" value={value} name={name} />
      <div ref={editorRef} className="min-h-[100px] w-full" />
    </>
  );
};

export default MonacoEditorCore;
