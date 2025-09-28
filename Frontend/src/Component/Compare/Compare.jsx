import React, { useEffect } from 'react';
import compareStyles from './Compare.module.css';
import { useTheme } from '../Theme/ThemeContext';

const Compare = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    const container = document.querySelector(`.${compareStyles.compareContainer}`);
    if (container) observer.observe(container);

    const cells = document.querySelectorAll(`.${compareStyles.aiFeatureCell}, .${compareStyles.manualFeatureCell}`);
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        const progressBar = cell.querySelector(`.${compareStyles.featureProgressBar}`);
        const value = progressBar.getAttribute('data-value');
        progressBar.style.width = `${value}%`;
      });
      cell.addEventListener('mouseleave', () => {
        const progressBar = cell.querySelector(`.${compareStyles.featureProgressBar}`);
        progressBar.style.width = '0%';
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${compareStyles.compareContainer} ${theme === 'dark' ? compareStyles.darkTheme : ''}`} id="compare-container">
      <div className={compareStyles.compareHeader}>
        <h2 className={compareStyles.compareTitle}>AI vs Manual Timetable Creation</h2>
        <p className={compareStyles.compareSubtitle}>Discover why TimeLazy's AI outperforms traditional methods</p>
      </div>
      <table className={compareStyles.compareTable}>
        <thead>
          <tr>
            <th className={compareStyles.compareTableHeader}>Feature</th>
            <th className={compareStyles.compareTableHeader}><span className={compareStyles.aiBadge}>TimeLazy AI</span></th>
            <th className={compareStyles.compareTableHeader}><span className={compareStyles.manualBadge}>Manual Tools</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={compareStyles.featureNameCell}>Speed</td>
            <td className={compareStyles.aiFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-bolt ${compareStyles.featureIcon}`}></i>
                <span className={`${compareStyles.featureHighlight} ${compareStyles.bestFeature}`}>30 seconds</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="95"></div>
                </div>
              </div>
            </td>
            <td className={compareStyles.manualFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-hourglass-half ${compareStyles.featureIcon}`}></i>
                <span>1+ hour</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="20"></div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={compareStyles.featureNameCell}>Conflict Detection</td>
            <td className={compareStyles.aiFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-check-circle ${compareStyles.featureIcon}`}></i>
                <span className={`${compareStyles.featureHighlight} ${compareStyles.bestFeature}`}>Auto-fixed</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="90"></div>
                </div>
              </div>
            </td>
            <td className={compareStyles.manualFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-exclamation-triangle ${compareStyles.featureIcon}`}></i>
                <span>Manual checks</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="30"></div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={compareStyles.featureNameCell}>Optimization</td>
            <td className={compareStyles.aiFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-brain ${compareStyles.featureIcon}`}></i>
                <span className={`${compareStyles.featureHighlight} ${compareStyles.bestFeature}`}>AI-driven</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="100"></div>
                </div>
              </div>
            </td>
            <td className={compareStyles.manualFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-dice ${compareStyles.featureIcon}`}></i>
                <span>Guesswork</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="40"></div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={compareStyles.featureNameCell}>Personalization</td>
            <td className={compareStyles.aiFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-user-cog ${compareStyles.featureIcon}`}></i>
                <span className={`${compareStyles.featureHighlight} ${compareStyles.bestFeature}`}>Energy & focus-based</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="85"></div>
                </div>
              </div>
            </td>
            <td className={compareStyles.manualFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-user ${compareStyles.featureIcon}`}></i>
                <span>Basic preferences</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="50"></div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={compareStyles.featureNameCell}>Updates</td>
            <td className={compareStyles.aiFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-sync-alt ${compareStyles.featureIcon}`}></i>
                <span className={compareStyles.featureHighlight}>Instant adjustments</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="95"></div>
                </div>
              </div>
            </td>
            <td className={compareStyles.manualFeatureCell}>
              <div className={compareStyles.featureContent}>
                <i className={`fas fa-eraser ${compareStyles.featureIcon}`}></i>
                <span>Start from scratch</span>
                <div className={compareStyles.featureProgressContainer}>
                  <div className={compareStyles.featureProgressBar} data-value="25"></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Compare;
