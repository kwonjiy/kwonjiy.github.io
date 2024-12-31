import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faJs, faPhp, faWindows, faLinux 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCode, faCodeBranch, faDatabase 
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function Home() {
  return (
    <div id="main-content">
      <section className="container">
        <div className="main-profile">
          <div className="profile-image-container">
            <Image src="/favicon.ico" alt="Profile Image" width={128} height={128} className="profile-image" />
          </div>
          <h2>HI, I'M KWON JI YEON</h2>
          <p>
            안녕하세요, 개발자 권지연입니다.
            <br/>이 블로그는 제가 배우고 경험한 다양한 개발 주제와 개인적인 통차을 공유하는 공간입니다.
            <br/>기술적인 글부터 일상적인 이야기까지, 다양한 콘텐츠를 통해 여러분과 소통하고 싶습니다.
          </p>
        </div>

        <div className="skills">
          <h2>Skills</h2>
          <table className="skill-table">
            <tbody>
              <tr>
                <td>Languages</td>
                <td>
                  <FontAwesomeIcon icon={faJs} className="skill-icon js" title="JavaScript" />
                  <FontAwesomeIcon icon={faPhp} className="skill-icon php" title="PHP" />
                  <FontAwesomeIcon icon={faWindows} className="skill-icon csharp" title="C#" />
                </td>
              </tr>
              <tr>
                <td>Frameworks & Libraries</td>
                <td>
                  <FontAwesomeIcon icon={faCode} className="skill-icon jquery" title="jQuery" />
                  <FontAwesomeIcon icon={faCodeBranch} className="skill-icon dotnet" title=".NET Core" />
                </td>
              </tr>
              <tr>
                <td>Databases</td>
                <td>
                  <FontAwesomeIcon icon={faDatabase} className="skill-icon mongodb" title="MongoDB" />
                  <FontAwesomeIcon icon={faDatabase} className="skill-icon mysql" title="MySQL" />
                </td>
              </tr>
              <tr>
                <td>Operating Systems</td>
                <td>
                  <FontAwesomeIcon icon={faLinux} className="skill-icon linux" title="Linux" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="career">
          <h2>Career</h2>
          {/* Career 내용은 추후 추가 */}
        </div>
      </section>
    </div>
  );
}
