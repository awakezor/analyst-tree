import React from 'react';

export interface CharacterClass {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface ClassSelectionProps {
  onSelectClass: (classId: string) => void;
}

const availableClasses: CharacterClass[] = [
  {
    id: 'analyst',
    name: 'Системный Аналитик',
    icon: '📊',
    description: 'Мастер требований и интеграций. Строит мосты между бизнесом и разработкой.',
    color: '#ffd700'
  }
  // В будущем можно добавить другие классы:
  // { id: 'architect', name: 'Архитектор', icon: '🏛️', description: '...', color: '#c0c0c0' },
  // { id: 'devops', name: 'DevOps Инженер', icon: '⚙️', description: '...', color: '#cd7f32' }
];

const ClassSelection: React.FC<ClassSelectionProps> = ({ onSelectClass }) => {
  return (
    <div className="class-selection-screen">
      <div className="class-selection-content">
        <h1 className="class-selection-title">Выбери свой класс</h1>
        <p className="class-selection-subtitle">От которого зависит твой путь развития</p>
        
        <div className="classes-grid">
          {availableClasses.map((charClass) => (
            <div 
              key={charClass.id}
              className="class-card"
              onClick={() => onSelectClass(charClass.id)}
              style={{ '--class-color': charClass.color } as React.CSSProperties}
            >
              <div className="class-card-icon">{charClass.icon}</div>
              <h3 className="class-card-name">{charClass.name}</h3>
              <p className="class-card-description">{charClass.description}</p>
              <div className="class-card-button">Выбрать класс</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
