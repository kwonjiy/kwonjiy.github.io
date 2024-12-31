import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>    
    <div className={styles.headerContent}>
      <h1>KOMJI BLOG</h1>
      <p>어제 뭐했는지 기억못하는 청년의 기억소</p>
    </div>
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
      <li className={styles.navItem}><a href="#">TAG</a></li>      
        <li className={styles.navItem}><a href="#">POSTS</a></li>
        <li className={styles.navItem}><a href="#">DEV JOURNAL</a></li>
        <li className={styles.navItem}><a href="#">INFO</a></li>
        
      </ul>
    </nav>
  </header>
);

export default Header;