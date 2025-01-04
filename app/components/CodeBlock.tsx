'use client';

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <div className="code-block">
      <pre>
        <div className="code-header">
          <span className="language">{language}</span>
        </div>
        <code className={`language-${language}`}>
          {value}
        </code>
      </pre>
    </div>
  );
}
