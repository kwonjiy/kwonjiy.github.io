import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    // HTML 이스케이프 처리
    const escapedStr = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return `<div class="code-block">
      <pre>
        <div class="code-header">
          <span class="language">${lang}</span>
        </div>
        <code class="language-${lang}">${escapedStr}</code>
      </pre>
    </div>`;
  }
});

export interface PostData {
  content: string;
  data: {
    title: string;
    layout: string;
    categories: string[];
    [key: string]: any;
  };
}

export async function parseMarkdown(markdown: string): Promise<PostData> {
  const { content, data } = matter(markdown);
  const contentHtml = md.render(content);

  return {
    content: contentHtml,
    data: data as PostData['data']
  };
}
