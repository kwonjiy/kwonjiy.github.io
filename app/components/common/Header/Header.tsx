"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [infoOpen, setInfoOpen] = useState(false);

  const handleInfoMenuToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setInfoOpen(!infoOpen);
  };

  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [infoOpen]);

  return (
    <header className={styles.header}>    
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoLink}>
          <h1>KOMJI BLOG</h1>
          <p>어제 뭐했는지 기억못하는 청년의 기억소</p>
        </Link>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link href="/tags">TAG</Link></li>      
          <li className={styles.navItem}><Link href="/posts">POSTS</Link></li>
          <li className={styles.navItem}><Link href="/devjournal">DEV JOURNAL</Link></li>
          <li className={styles.navItem} ref={dropdownRef} onClick={handleInfoMenuToggle}>
            INFO <span className={styles.icon}>▼</span>
            {infoOpen && (
              <ul className={styles.dropdownMenu}>
                <li><Link href="/info">ABOUT ME</Link></li>
                <li><Link href="https://github.com/kwonjiy/kwonjiy.github.io/issues/1" target="_blank">문의하기</Link></li>
              </ul>
            )}
          </li>        
        </ul>
      </nav>
    </header>
  );
};

export default Header;