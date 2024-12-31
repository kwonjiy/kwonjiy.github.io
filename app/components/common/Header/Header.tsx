import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>    
    <div className={styles.headerContent}>
      <Link href="/" className={styles.logoLink}>
        <h1>KOMJI BLOG</h1>
        <p>어제 뭐했는지 기억못하는 청년의 기억소</p>
      </Link>
    </div>
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
      <li className={styles.navItem}><Link href="#">TAG</Link></li>      
        <li className={styles.navItem}><Link href="/posts">POSTS</Link></li>
        <li className={styles.navItem}><Link href="/devjournal">DEV JOURNAL</Link></li>
        <li className={styles.navItem}><Link href="#">INFO</Link></li>
        
      </ul>
    </nav>
  </header>
);

export default Header;