import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerIcons}>
      <a href="/feed.xml" aria-label="RSS Feed">
        <i className="fas fa-rss"></i>
      </a>
      <a href="https://github.com/kwonjiy" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
        <i className="fab fa-github"></i>
      </a>
    </div>
    <p>2024 Kwonjiy's Blog. All rights reserved.</p>
  </footer>
);

export default Footer;