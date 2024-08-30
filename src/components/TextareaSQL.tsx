import DOMPurify from "dompurify";
import { useCallback, useMemo, useRef, useEffect } from "react";

export default function TextareaSQL({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const valueFormatted = useMemo(() => {
    const formatted = value
      .split(" ")
      .map((word) => {
        if (
          [
            "SELECT",
            "FROM",
            "WHERE",
            "LIMIT",
            "SELECT",
            "FROM",
            "WHERE",
            "GROUP",
            "ORDER",
            "BY",
            "LIMIT",
            "AS",
            "JOIN",
            "LEFT",
            "RIGHT",
            "INNER",
            "OUTER",
            "ON",
            "AND",
            "OR",
            "NOT",
            "IN",
            "BETWEEN",
            "LIKE",
            "IS NULL",
            "IS NOT NULL",
            "DISTINCT",
            "UNION",
            "INTERSECT",
            "EXCEPT",
            "HAVING",
            "ASC",
            "DESC",
            "NULL",
            "NOT NULL",
            "TRUE",
            "FALSE",
            "NULLIF",
            "COALESCE",
            "CASE",
            "WHEN",
            "THEN",
            "ELSE",
            "END",
          ].includes(word.toUpperCase())
        ) {
          return `<span class="font-bold text-blue-500">${word}</span>`;
        }
        return word;
      })
      .join(" ");
    return DOMPurify.sanitize(formatted);
  }, [value]);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const text = e.currentTarget.innerText;
      console.log(text);
      onChange(text);
    },
    [onChange],
  );

  useEffect(() => {
    const el = contentEditableRef.current;
    if (el) {
      el.innerHTML = valueFormatted;
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [valueFormatted]);

  return (
    <>
      <div
        ref={contentEditableRef}
        contentEditable
        onKeyUp={handleKeyUp}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input type="hidden" name={name} value={value} />
    </>
  );
}
