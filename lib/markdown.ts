import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

// HTML 정리 함수
function cleanHtml(html: string): string {
  return html
    // 중첩된 code 태그 제거
    .replace(/<code><code>/g, '<code>')
    .replace(/<\/code><\/code>/g, '</code>')
    // 코드 블록 내부의 p 태그 제거
    .replace(/<pre([^>]*)><code>([^]*?)<\/code><\/pre>/g, (_, attrs, content) => {
      const cleanContent = content
        .replace(/<\/?p>/g, '\n')
        .replace(/<\/?h1>/g, '')
        .replace(/<hr>/g, '---')
        .trim();
      return `<pre${attrs}><code>${cleanContent}</code></pre>`;
    })
    // 연속된 빈 줄 제거
    .replace(/\n{3,}/g, '\n\n');
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  xhtmlOut: true
})
.disable('code')  // 기본 코드 렌더러 비활성화
.enable('fence')  // 펜스 코드 블록만 활성화
.enable(['table', 'strikethrough']);

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
  // Parse front matter
  const { content, data } = matter(markdown);

  // Convert markdown to HTML and clean it
  const contentHtml = cleanHtml(md.render(content));

  return {
    content: contentHtml,
    data: data as PostData['data']
  };
}
