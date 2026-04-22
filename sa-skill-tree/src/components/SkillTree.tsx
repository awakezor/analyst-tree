import React, { useState, useMemo, useRef, useCallback } from 'react';
import { skillNodes, achievements, type SkillNode, type Achievement } from '../data/skillTree';

interface MainGameProps {
  onExit?: () => void;
}

const MainGame: React.FC<MainGameProps> = ({ onExit }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['root']));
  // Состояние для дополнительных квестов (достижений)
  const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());
  
  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Используем onExit если нужно
  React.useEffect(() => {
    if (onExit) {
      // Можно добавить логику при необходимости
    }
  }, [onExit]);
  
  const nodesMap = useMemo(() => {
    const map = new Map<string, SkillNode>();
    skillNodes.forEach(n => map.set(n.id, n));
    return map;
  }, []);
  
  const isNodeAvailable = (node: SkillNode) => {
    if (!node.parentId) return true;
    return selectedIds.has(node.parentId);
  };
  
  const isActiveEdge = (parentId: string, childId: string) => {
    return selectedIds.has(parentId) && selectedIds.has(childId);
  };
  
  const handleNodeClick = (id: string) => {
    const node = nodesMap.get(id);
    if (!node) return;
    if (id === 'root') return;

    if (!selectedIds.has(node.parentId!) && !selectedIds.has(id)) {
      return; 
    }

    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      const removeChildren = (parentId: string) => {
        skillNodes.filter(n => n.parentId === parentId).forEach(child => {
          newSelected.delete(child.id);
          removeChildren(child.id);
        });
      };
      newSelected.delete(id);
      removeChildren(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Zoom handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    const newScale = Math.min(Math.max(0.3, scale + delta), 3);
    setScale(newScale);
  }, [scale]);

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({
      x: offsetStart.current.x + dx,
      y: offsetStart.current.y + dy
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Reset view
  const handleResetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // Расчет статистики
  const totalSkills = skillNodes.length - 1;
  const learnedSkills = selectedIds.size - 1;
  const progressPercent = Math.round((learnedSkills / totalSkills) * 100);
  
  // Расчет уровня и титула
  const level = Math.floor(learnedSkills / 3) + 1;
  const maxLevel = Math.ceil(totalSkills / 3);
  const levelRatio = learnedSkills / totalSkills;
  
  let title = 'Junior';
  let avatar = '🧙‍♂️';
  if (levelRatio >= 0.75) {
    title = 'Senior';
    avatar = '👑';
  } else if (levelRatio >= 0.5) {
    title = 'Middle+';
    avatar = '🧚‍♂️';
  } else if (levelRatio >= 0.25) {
    title = 'Middle';
    avatar = '🧙‍♀️';
  }

  // Проверка выполненных квестов (достижений)
  const unlockedAchievements: Achievement[] = [];
  achievements.forEach(achievement => {
    if (completedQuests.has(achievement.id)) {
      unlockedAchievements.push(achievement);
    }
  });

  // Обработчик клика по квесту
  const handleQuestClick = (questId: string) => {
    const newCompleted = new Set(completedQuests);
    if (newCompleted.has(questId)) {
      newCompleted.delete(questId);
    } else {
      newCompleted.add(questId);
    }
    setCompletedQuests(newCompleted);
  };

  // Обработчик сброса прогресса
  const handleResetProgress = () => {
    setSelectedIds(new Set(['root']));
    setCompletedQuests(new Set());
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="game-layout">
      {/* ЗАГОЛОВОК СВЕРХУ */}
      <div className="tree-header">
        <h1 className="tree-title">Древо Прокачки Аналитика</h1>
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="tree-content-wrapper">
        {/* ЛЕВАЯ ЧАСТЬ: ДРЕВО */}
        <div 
          ref={containerRef}
          className="tree-container"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Zoom/Pan controls */}
          <div className="zoom-controls">
            <button onClick={() => setScale(s => Math.min(s + 0.2, 3))}>+</button>
            <button onClick={() => setScale(s => Math.max(s - 0.2, 0.3))}>−</button>
            <button onClick={handleResetView}>⟲</button>
          </div>

          {/* Контейнер для трансформации узлов и линий вместе */}
          <div 
            className="skill-tree-content"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              width: '800px',
              height: '700px',
            }}
          >
            <svg className="skill-tree-svg" width="800" height="700">
              {skillNodes.map(node => {
                if (!node.parentId) return null;
                const active = isActiveEdge(node.parentId, node.id);
                return (
                  <line
                    key={`${node.parentId}-${node.id}`}
                    x1={nodesMap.get(node.parentId)!.x} 
                    y1={nodesMap.get(node.parentId)!.y}
                    x2={node.x} 
                    y2={node.y}
                    className={`skill-edge ${active ? 'active' : ''}`}
                  />
                );
              })}
            </svg>

            <div className="skill-tree-nodes">
              {skillNodes.map(node => {
                const isSelected = selectedIds.has(node.id);
                const available = isNodeAvailable(node);
                const isRoot = node.parentId === null;

                return (
                  <div
                    key={node.id}
                    className={`skill-node ${isSelected ? 'selected' : ''} ${available ? 'available' : 'locked'} ${isRoot ? 'root' : ''}`}
                    style={{ left: node.x, top: node.y }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(node.id);
                    }}
                  >
                    <div className="node-inner">
                      <span className="node-icon">{node.icon}</span>
                      <span className="node-label">{node.label}</span>
                    </div>
                    {!available && !isSelected && <div className="lock-overlay">🔒</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: ПАНЕЛЬ СТАТИСТИКИ */}
        <div className="stats-sidebar">
          <div className="sidebar-header">
            <h2>Character Stats</h2>
            <div className="avatar-display">
              <div className="avatar-icon">{avatar}</div>
              <div className="avatar-title">{title}</div>
              {unlockedAchievements.length > 0 && (
                <div className="avatar-achievements">
                  {unlockedAchievements.map(a => (
                    <span key={a.id} className="achievement-badge" title={a.rewardTitle}>
                      {a.icon}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="stat-block">
            <div className="stat-row">
              <span>Level</span>
              <span className="stat-value">{level} / {maxLevel}</span>
            </div>
            <div className="stat-row">
              <span>Skills Learned</span>
              <span className="stat-value">{learnedSkills} / {totalSkills}</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Mastery Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Кнопка сброса прогресса */}
          <button 
            className="reset-button"
            onClick={handleResetProgress}
            type="button"
            title="Сбросить весь прогресс"
          >
            🗑️ Сброс
          </button>

          {/* Блок дополнительных квестов */}
          <div className="achievements-section">
            <h3 className="achievements-title">Additional Quests</h3>
            <p className="quests-hint">Кликните по иконке, чтобы отметить квест как выполненный</p>
            <div className="achievements-grid">
              {achievements.map(achievement => {
                const isCompleted = completedQuests.has(achievement.id);
                return (
                  <div 
                    key={achievement.id} 
                    className={`achievement-item ${isCompleted ? 'unlocked' : 'locked'}`}
                    onClick={() => handleQuestClick(achievement.id)}
                    style={{ cursor: 'pointer' }}
                    title={achievement.description}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-info">
                      <div className="achievement-name">{achievement.title}</div>
                      {isCompleted && <div className="achievement-reward">+{achievement.rewardTitle}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lore-text">
            <p>"Путь аналитика долог и тернист. Изучи все ветви знаний, чтобы стать Архитектором Систем."</p>
          </div>
        </div>
      </div>

      {/* ПОДСКАЗКА ВНИЗУ */}
      <div className="tree-footer">
        <p className="hint-text">🖱 Кликните по узлу, чтобы активировать путь</p>
      </div>
    </div>
  );
};

export default MainGame;
