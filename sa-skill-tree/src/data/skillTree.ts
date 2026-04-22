export interface SkillNode {
  id: string;
  label: string;
  icon: string;
  parentId: string | null;
  x: number;
  y: number;
}

export const skillNodes: SkillNode[] = [
  // --- КОРЕНЬ ---
  { id: 'root', label: 'System\nAnalyst', icon: '🧙‍♂️', parentId: null, x: 400, y: 350 },

  // --- ВЕТКА 1: ТЕХНИЧЕСКИЕ (Слева-Верх) ---
  { id: 'tech', label: 'Hard Skills', icon: '⚔️', parentId: 'root', x: 200, y: 200 },
  
    // SQL & DB
    { id: 'sql', label: 'Advanced SQL', icon: '📜', parentId: 'tech', x: 100, y: 120 },
    { id: 'db_design', label: 'DB Design', icon: '🗄️', parentId: 'sql', x: 50, y: 60 },
    { id: 'indexes', label: 'Indexes &\nPerformance', icon: '⚡', parentId: 'sql', x: 150, y: 60 },

    // API & Integration
    { id: 'rest', label: 'REST API', icon: '🔌', parentId: 'tech', x: 200, y: 100 },
    { id: 'soap', label: 'SOAP / XML', icon: '📦', parentId: 'rest', x: 180, y: 40 },
    { id: 'graphql', label: 'GraphQL', icon: '🕸️', parentId: 'rest', x: 220, y: 40 },
    
    // Messaging
    { id: 'kafka', label: 'Kafka / MQ', icon: '📨', parentId: 'tech', x: 300, y: 120 },
    { id: 'async', label: 'Async Patterns', icon: '🔄', parentId: 'kafka', x: 350, y: 60 },

  // --- ВЕТКА 2: АРХИТЕКТУРА (Справа-Верх) ---
  { id: 'arch', label: 'Architecture', icon: '🏰', parentId: 'root', x: 600, y: 200 },
  
    { id: 'uml', label: 'UML 2.5', icon: '📐', parentId: 'arch', x: 550, y: 120 },
    { id: 'c4', label: 'C4 Model', icon: '🏗️', parentId: 'uml', x: 520, y: 60 },
    
    { id: 'patterns', label: 'Design Patterns', icon: '🧩', parentId: 'arch', x: 650, y: 120 },
    { id: 'microservices', label: 'Microservices', icon: '🧱', parentId: 'patterns', x: 700, y: 60 },

  // --- ВЕТКА 3: ИНСТРУМЕНТЫ (Слева-Низ) ---
  { id: 'tools', label: 'Toolbox', icon: '🎒', parentId: 'root', x: 200, y: 500 },
  
    { id: 'jira', label: 'Jira / Agile', icon: '🟦', parentId: 'tools', x: 120, y: 550 },
    { id: 'git', label: 'Git Basics', icon: '🌿', parentId: 'tools', x: 180, y: 580 },
    
    { id: 'postman', label: 'Postman', icon: '🚀', parentId: 'tools', x: 280, y: 550 },
    { id: 'docker', label: 'Docker', icon: '🐳', parentId: 'postman', x: 320, y: 590 },

  // --- ВЕТКА 4: СОФТ И ПРОЦЕССЫ (Справа-Низ) ---
  { id: 'soft', label: 'Soft Skills', icon: '🛡️', parentId: 'root', x: 600, y: 500 },
  
    { id: 'comm', label: 'Communication', icon: '💬', parentId: 'soft', x: 550, y: 550 },
    { id: 'pres', label: 'Public Speaking', icon: '🎤', parentId: 'comm', x: 520, y: 590 },
    
    { id: 'mentor', label: 'Mentoring', icon: '🎓', parentId: 'soft', x: 650, y: 550 },
    { id: 'leadership', label: 'Leadership', icon: '👑', parentId: 'mentor', x: 680, y: 590 },
];