import { useState, useEffect, useRef, useMemo } from "react";
import BaseNode from "../components/BaseNode";

// Match valid JS identifiers inside {{ }}
const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);

  // Extract unique, valid JS variable names from {{ varName }}
  const variables = useMemo(() => {
    const matches = [...text.matchAll(VAR_REGEX)].map((m) => m[1]);
    return [...new Set(matches)];
  }, [text]);

  // Dynamic resize: height follows content, width grows with long lines
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";

    // Adjust node width based on longest line
    const lines = text.split("\n");
    const maxLen = Math.max(...lines.map((l) => l.length), 20);
    const newWidth = Math.min(Math.max(220, maxLen * 8 + 40), 500);
    if (wrapperRef.current) {
      wrapperRef.current.style.width = newWidth + "px";
    }
  }, [text]);

  // Build input handles from detected variables
  const varHandles = variables.map((v) => ({ id: v, label: v }));

  return (
    <div ref={wrapperRef} style={{ minWidth: 220 }}>
      <BaseNode
        id={id}
        type="text"
        title="Text"
        inputs={varHandles}
        outputs={[{ id: "output", label: "output" }]}
      >
        <div className="node-field">
          <label className="node-field__label">Content</label>
          <textarea
            ref={textareaRef}
            className="node-field__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={'Type text… use {{ variable }}'}
            rows={2}
          />
        </div>
      </BaseNode>
    </div>
  );
};

export default TextNode;