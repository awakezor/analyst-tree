export interface SkillNode {
  id: string;
  label: string;
  icon: string;
  parentId: string | null;
  x: number;
  y: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardTitle: string;
}

export const achievements: Achievement[] = [
  {
    id: 'scrum-master',
    title: 'Скрам-мастер команды',
    description: 'Возглавьте процесс внедрения Agile в команде',
    icon: '📋',
    rewardTitle: 'Фасилитатор',
  },
  {
    id: 'ti-participant',
    title: 'Участвует в ТИ',
    description: 'Проведите техническое интервью кандидата',
    icon: '🎯',
    rewardTitle: 'Собеседующий',
  },
  {
    id: 'business-analyst',
    title: 'Покрывает бизнес-анализ',
    description: 'Выполните полноценный бизнес-анализ проекта',
    icon: '💼',
    rewardTitle: 'Бизнес-эксперт',
  },
];

export const skillNodes: SkillNode[] = [
  // --- КОРЕНЬ ---
  { id: 'root', label: 'System\nAnalyst', icon: '🧙‍♂️', parentId: null, x: 400, y: 380 },
  
  // --- ВЕТКА 1: ТЕХНИЧЕСКИЕ (Слева-Верх) ---
  { id: 'tech', label: 'Hard Skills', icon: '⚔️', parentId: 'root', x: 150, y: 250 },
  
    // SQL & DB
    { id: 'sql', label: 'Advanced SQL', icon: '📜', parentId: 'tech', x: 80, y: 170 },
    { id: 'db_design', label: 'DB Design', icon: '🗄️', parentId: 'sql', x: 30, y: 100 },
    { id: 'indexes', label: 'Indexes &\nPerformance', icon: '⚡', parentId: 'sql', x: 130, y: 100 },

    // API & Integration
    { id: 'rest', label: 'REST API', icon: '🔌', parentId: 'tech', x: 200, y: 160 },
    { id: 'soap', label: 'SOAP / XML', icon: '📦', parentId: 'rest', x: 170, y: 90 },
    { id: 'graphql', label: 'GraphQL', icon: '🕸️', parentId: 'rest', x: 230, y: 90 },
    
    // Messaging
    { id: 'kafka', label: 'Kafka / MQ', icon: '📨', parentId: 'tech', x: 270, y: 170 },
    { id: 'async', label: 'Async Patterns', icon: '🔄', parentId: 'kafka', x: 320, y: 100 },

  // --- ВЕТКА 2: АРХИТЕКТУРА (Справа-Верх) ---
  { id: 'arch', label: 'Architecture', icon: '🏰', parentId: 'root', x: 650, y: 250 },
  
    { id: 'uml', label: 'UML 2.5', icon: '📐', parentId: 'arch', x: 580, y: 170 },
    { id: 'c4', label: 'C4 Model', icon: '🏗️', parentId: 'uml', x: 540, y: 100 },
    
    { id: 'patterns', label: 'Design Patterns', icon: '🧩', parentId: 'arch', x: 720, y: 170 },
    { id: 'microservices', label: 'Microservices', icon: '🧱', parentId: 'patterns', x: 770, y: 100 },

  // --- ВЕТКА 3: ИНСТРУМЕНТЫ (Слева-Низ) ---
  { id: 'tools', label: 'Toolbox', icon: '🎒', parentId: 'root', x: 150, y: 510 },
  
    { id: 'jira', label: 'Jira / Agile', icon: '🟦', parentId: 'tools', x: 80, y: 580 },
    { id: 'git', label: 'Git Basics', icon: '🌿', parentId: 'tools', x: 180, y: 600 },
    
    { id: 'postman', label: 'Postman', icon: '🚀', parentId: 'tools', x: 250, y: 570 },
    { id: 'docker', label: 'Docker', icon: '🐳', parentId: 'postman', x: 300, y: 630 },

  // --- ВЕТКА 4: СОФТ И ПРОЦЕССЫ (Справа-Низ) ---
  { id: 'soft', label: 'Soft Skills', icon: '🛡️', parentId: 'root', x: 650, y: 510 },
  
    { id: 'comm', label: 'Communication', icon: '💬', parentId: 'soft', x: 580, y: 580 },
    { id: 'pres', label: 'Public Speaking', icon: '🎤', parentId: 'comm', x: 540, y: 640 },
    
    { id: 'mentor', label: 'Mentoring', icon: '🎓', parentId: 'soft', x: 720, y: 580 },
    { id: 'leadership', label: 'Leadership', icon: '👑', parentId: 'mentor', x: 770, y: 640 },
];
