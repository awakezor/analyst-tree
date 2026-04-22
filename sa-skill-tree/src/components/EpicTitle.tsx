import React from 'react';
import './EpicTitle.css';

export const EpicTitle: React.FC = () => {
  return (
    <div className="epic-title-container">
      <svg viewBox="0 0 800 200" className="epic-title-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Золотой градиент для текста */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="20%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#B8860B" />
            <stop offset="80%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFF8DC" />
          </linearGradient>
          
          {/* Градиент для фона (камень/металл) */}
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>

          {/* Фильтр свечения */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Тень для объема текста */}
          <filter id="textShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.8"/>
          </filter>
        </defs>

        {/* Фоновая табличка */}
        <g className="title-bg">
          <rect x="50" y="20" width="700" height="160" rx="15" fill="url(#bgGradient)" stroke="#B8860B" strokeWidth="3" />
          <rect x="60" y="30" width="680" height="140" rx="10" fill="none" stroke="#5c4003" strokeWidth="1" strokeDasharray="5,5" />
          
          {/* Декоративные углы */}
          <path d="M50 40 L80 20 M750 20 L720 40 M50 160 L80 180 M750 180 L720 160" stroke="#B8860B" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Левый декор (Меч/Крыло) */}
        <g className="left-decoration" transform="translate(30, 100) rotate(-10)">
          <path d="M0 0 Q-20 -30 -10 -60 L10 -50 Q0 -20 20 -10 Z" fill="#B8860B" opacity="0.6" />
          <circle cx="0" cy="0" r="15" fill="#FFD700" filter="url(#glow)" />
        </g>

        {/* Правый декор (Меч/Крыло) */}
        <g className="right-decoration" transform="translate(770, 100) rotate(10)">
          <path d="M0 0 Q20 -30 10 -60 L-10 -50 Q0 -20 -20 -10 Z" fill="#B8860B" opacity="0.6" />
          <circle cx="0" cy="0" r="15" fill="#FFD700" filter="url(#glow)" />
        </g>

        {/* Текст: ДРЕВО */}
        <text x="400" y="85" textAnchor="middle" fontFamily="'Cinzel Decorative', serif" fontSize="50" fontWeight="900" fill="url(#goldGradient)" filter="url(#textShadow)" className="title-text-main">
          ДРЕВО
        </text>

        {/* Текст: ПРОКАЧКИ (поменьше) */}
        <text x="400" y="135" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="28" fontWeight="700" fill="#FFD700" filter="url(#textShadow)" letterSpacing="5">
          ПРОКАЧКИ
        </text>
        
        {/* Текст: АНАЛИТИКА (акцентное) */}
        <text x="400" y="165" textAnchor="middle" fontFamily="'Cinzel Decorative', serif" fontSize="32" fontWeight="900" fill="url(#goldGradient)" filter="url(#glow)" letterSpacing="2">
          АНАЛИТИКА
        </text>
        
        {/* Магические искры */}
        <g className="magic-sparks">
          <circle cx="150" cy="50" r="2" fill="#FFF" opacity="0.8">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="650" cy="150" r="2" fill="#FFF" opacity="0.8">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="400" cy="20" r="3" fill="#FFD700" opacity="0.6">
            <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};
