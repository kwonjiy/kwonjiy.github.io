declare module 'markdown-it-prism' {
  import MarkdownIt from 'markdown-it';
  
  function markdownItPrism(md: MarkdownIt, options?: any): void;
  
  export default markdownItPrism;
}
