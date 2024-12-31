'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { 
  faJs, 
  faPhp, 
  faWindows, 
  faGit, 
  faLinux,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faCode,
  faCodeBranch
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Font Awesome 자동 CSS 삽입 비활성화
config.autoAddCss = false;

export default function Home() {
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div id="main-content">
      <section className="container">
        <motion.div 
          className="main-profile"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="profile-content">
            <div className="profile-image-container">
              <Image
                src="/favicon.ico"
                alt="Profile Image"
                width={128}
                height={128}
                className="profile-image"
              />
            </div>
            <div className="profile-text">
              <h2>HI, I'M KWON JI YEON</h2>
              <p>
                안녕하세요, 개발자 권지연입니다.
                <br/>이 블로그는 제가 배우고 경험한 다양한 개발 주제와 개인적인 통차을 공유하는 공간입니다.
                <br/>기술적인 글부터 일상적인 이야기까지, 다양한 콘텐츠를 통해 여러분과 소통하고 싶습니다.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.h2>
          <motion.div 
            className="skills-container"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="skill-card" variants={fadeInUp}>
              <div className="skill-title">
                <h3>Languages</h3>
              </div>
              <div className="skill-icons">
                <FontAwesomeIcon icon={faJs} className="skill-icon javascript" />
                <FontAwesomeIcon icon={faPhp} className="skill-icon php" />
                <FontAwesomeIcon icon={faWindows} className="skill-icon csharp" />
              </div>
            </motion.div>

            <motion.div className="skill-card" variants={fadeInUp}>
              <div className="skill-title">
                <h3>Frameworks & Libraries</h3>
              </div>
              <div className="skill-icons">
                <FontAwesomeIcon icon={faReact} className="skill-icon react" />
                <FontAwesomeIcon icon={faGit} className="skill-icon git" />
              </div>
            </motion.div>

            <motion.div className="skill-card" variants={fadeInUp}>
              <div className="skill-title">
                <h3>Databases</h3>
              </div>
              <div className="skill-icons">
                <FontAwesomeIcon icon={faDatabase} className="skill-icon mysql" />
                <FontAwesomeIcon icon={faDatabase} className="skill-icon postgresql" />
              </div>
            </motion.div>

            <motion.div className="skill-card" variants={fadeInUp}>
              <div className="skill-title">
                <h3>Operating Systems</h3>
              </div>
              <div className="skill-icons">
                <FontAwesomeIcon icon={faLinux} className="skill-icon linux" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="career"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Career
          </motion.h2>
          <motion.div 
            className="career-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="career-item">
              <div className="career-date">2022.06 - Present</div>
              <div className="career-description">
                <p className="career-title">웹 개발자</p>
                <p className="career-title-en">Web Developer</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
