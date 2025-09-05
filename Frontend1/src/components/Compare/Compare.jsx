import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Brain, 
  Dice6, 
  UserCog, 
  User, 
  RotateCcw, 
  Eraser 
} from 'lucide-react';

const Compare = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    const container = document.querySelector('#comparison-container');
    if (container) {
      observer.observe(container);
    }

    const cells = document.querySelectorAll('.ai-cell, .manual-cell');
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        const progressBar = cell.querySelector('.progress-bar');
        const value = progressBar.getAttribute('data-value');
        progressBar.style.width = `${value}%`;
      });

      cell.addEventListener('mouseleave', () => {
        const progressBar = cell.querySelector('.progress-bar');
        progressBar.style.width = '0%';
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const comparisonData = [
    {
      feature: 'Speed',
      aiValue: '30 seconds',
      manualValue: '1+ hour',
      aiIcon: Zap,
      manualIcon: Clock,
      aiProgress: 95,
      manualProgress: 20
    },
    {
      feature: 'Conflict Detection',
      aiValue: 'Auto-fixed',
      manualValue: 'Manual checks',
      aiIcon: CheckCircle,
      manualIcon: AlertTriangle,
      aiProgress: 90,
      manualProgress: 30
    },
    {
      feature: 'Optimization',
      aiValue: 'AI-driven',
      manualValue: 'Guesswork',
      aiIcon: Brain,
      manualIcon: Dice6,
      aiProgress: 100,
      manualProgress: 40
    },
    {
      feature: 'Personalization',
      aiValue: 'Energy & focus-based',
      manualValue: 'Basic preferences',
      aiIcon: UserCog,
      manualIcon: User,
      aiProgress: 85,
      manualProgress: 50
    },
    {
      feature: 'Updates',
      aiValue: 'Instant adjustments',
      manualValue: 'Start from scratch',
      aiIcon: RotateCcw,
      manualIcon: Eraser,
      aiProgress: 95,
      manualProgress: 25
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            transform: translateY(0) rotateX(0);
            opacity: 1;
          }
        }

        @keyframes headerGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes titleUnderline {
          to { transform: scaleX(1); }
        }

        @keyframes fadeInSubtitle {
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        @keyframes featureHighlight {
          0% { height: 0; }
          100% { height: 100%; }
        }

        @keyframes pulseBadge {
          0% { box-shadow: 0 0 0 0 rgba(74, 108, 247, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(74, 108, 247, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 108, 247, 0); }
        }

        .comparison-container {
          transform: translateY(20px) rotateX(5deg);
          opacity: 0;
          animation: fadeInUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards 0.3s;
          transform-style: preserve-3d;
        }

        .comparison-container:hover {
          transform: translateY(-10px) rotateX(0deg);
        }

        .header-glow::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
          animation: headerGlow 8s linear infinite;
        }

        .title-underline::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 25%;
          width: 50%;
          height: 3px;
          background-color: white;
          transform: scaleX(0);
          animation: titleUnderline 1.5s ease-in-out forwards 1s;
        }

        .subtitle-animation {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInSubtitle 1s ease forwards 1.5s;
        }

        .feature-highlight::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 3px;
          height: 0;
          background: linear-gradient(to bottom, #4a6cf7, #2541b2);
          transition: height 0.3s ease;
        }

        .feature-row:hover .feature-highlight::before {
          height: 100%;
          animation: featureHighlight 0.5s ease;
        }

        .badge-pulse {
          animation: pulseBadge 3s infinite;
        }

        .badge-pulse:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(74, 108, 247, 0.4);
        }

        .highlight-effect::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background-color: rgba(74, 108, 247, 0.2);
          z-index: -1;
          transform-origin: bottom left;
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .ai-cell:hover .highlight-effect::after {
          transform: scaleX(1);
        }

        .best-feature::before {
          content: '★';
          position: absolute;
          top: -18px;
          right: -10px;
          color: gold;
          font-size: 14px;
          opacity: 0;
          transform: rotate(0deg);
          transition: all 0.5s ease;
        }

        .ai-cell:hover .best-feature::before {
          opacity: 1;
          transform: rotate(360deg);
        }

        .progress-container {
          opacity: 0;
          transform: scaleX(0.5);
          transition: all 0.5s ease;
        }

        .ai-cell:hover .progress-container,
        .manual-cell:hover .progress-container {
          opacity: 1;
          transform: scaleX(1);
        }

        .progress-bar {
          width: 0%;
          transition: width 1s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        .cell-content {
          transition: transform 0.3s ease;
          transform-style: preserve-3d;
        }

        .ai-cell:hover .cell-content {
          transform: translateZ(20px);
        }

        .manual-cell:hover .cell-content {
          transform: translateZ(10px);
        }

        .icon-animation {
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      `}</style>

      <div
        className="comparison-container max-w-[1400px] w-full mx-auto rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out bg-white"
        id="comparison-container"
      >
        {/* Header */}
        <div className="header-glow bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white px-8 py-12 text-center relative overflow-hidden">
          <h2 className="title-underline text-4xl font-bold mb-4 relative inline-block">
            AI vs Manual Timetable Creation
          </h2>
          <p className="subtitle-animation text-lg opacity-90">
            Discover why TimeLazy's AI outperforms traditional methods
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-6 text-left font-semibold text-gray-700 border-b border-gray-200">
                  Feature
                </th>
                <th className="p-6 text-center font-semibold text-gray-700 border-b border-gray-200">
                  <span className="badge-pulse inline-block px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold cursor-pointer transition-all duration-300">
                    TimeLazy AI
                  </span>
                </th>
                <th className="p-6 text-center font-semibold text-gray-700 border-b border-gray-200">
                  <span className="inline-block px-6 py-2 bg-red-500 text-white rounded-full text-sm font-semibold">
                    Manual Tools
                  </span>
                </th>
              </tr>
            </thead>
            
            <tbody>
              {comparisonData.map((item, index) => {
                const AIIcon = item.aiIcon;
                const ManualIcon = item.manualIcon;
                
                return (
                  <tr key={index} className="feature-row transition-all duration-300 hover:bg-gray-50">
                    <td className="feature-highlight p-6 text-left font-medium text-gray-700 relative overflow-hidden border-b border-gray-200 transition-all duration-300">
                      {item.feature}
                    </td>
                    <td className="ai-cell p-6 text-center bg-blue-50 bg-opacity-50 border-b border-gray-200 transition-all duration-300">
                      <div className="cell-content flex flex-col items-center">
                        <AIIcon className="icon-animation text-blue-500 mb-3 w-8 h-8" />
                        <span className="highlight-effect best-feature relative inline-block z-10 font-semibold text-gray-800">
                          {item.aiValue}
                        </span>
                        <div className="progress-container relative h-2 w-full bg-gray-200 mt-3 rounded-lg overflow-hidden">
                          <div 
                            className="progress-bar h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg absolute top-0 left-0" 
                            data-value={item.aiProgress}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="manual-cell p-6 text-center bg-red-50 bg-opacity-30 border-b border-gray-200 transition-all duration-300">
                      <div className="cell-content flex flex-col items-center">
                        <ManualIcon className="icon-animation text-red-500 mb-3 w-8 h-8" />
                        <span className="font-semibold text-gray-800">{item.manualValue}</span>
                        <div className="progress-container relative h-2 w-full bg-gray-200 mt-3 rounded-lg overflow-hidden">
                          <div 
                            className="progress-bar h-full bg-gradient-to-r from-red-500 to-red-400 rounded-lg absolute top-0 left-0" 
                            data-value={item.manualProgress}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compare;