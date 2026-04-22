import React, { useState, useMemo } from 'react';
import { skillNodes, type SkillNode } from '../data/skillTree';

const SkillTree: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['root']));

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
      // Можно заменить на красивый тост/уведомление
      return; 
    }

    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      // Рекурсивное удаление детей при отмене выбора родителя
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

  // Расчет статистики
  const totalSkills = skillNodes.length - 1; // без корня
  const learnedSkills = selectedIds.size - 1;
  const progressPercent = Math.round((learnedSkills / totalSkills) * 100);

  return (
    <div className="game-layout">
      {/* ЛЕВАЯ ЧАСТЬ: ДРЕВО */}
      <div className="tree-container">
        <svg className="skill-tree-svg" viewBox="0 0 800 700">
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
                onClick={() => handleNodeClick(node.id)}
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

      {/* ПРАВАЯ ЧАСТЬ: ПАНЕЛЬ СТАТИСТИКИ */}
      <div className="stats-sidebar">
        <div className="sidebar-header">
          <h2>Character Stats</h2>
          <div className="avatar-placeholder">🧙‍♂️</div>
        </div>

        <div className="stat-block">
          <div className="stat-row">
            <span>Level</span>
            <span className="stat-value">{Math.floor(learnedSkills / 3) + 1}</span>
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

        <div className="lore-text">
          <p>"Путь аналитика долог и тернист. Изучи все ветви знаний, чтобы стать Архитектором Систем."</p>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;