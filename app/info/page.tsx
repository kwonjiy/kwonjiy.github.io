import Header from '../components/common/Header/Header';
import styles from '../posts/posts.module.css';

export default function InfoPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1>About Me</h1>
        <p>
          안녕하세요! 저는 웹 개발자입니다.
        </p>
        <p>
          주로 TypeScript, React, Node.js를 사용하여 웹 애플리케이션을 개발하고 있습니다.
        </p>
      </main>
    </div>
  );
}