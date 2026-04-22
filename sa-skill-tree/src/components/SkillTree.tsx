import React, { useState, useMemo, useRef, useCallback } from 'react';
import { skillNodes, type SkillNode } from '../data/skillTree';

const SkillTree: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['root']));
  
  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div className="game-layout">
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

        <div 
          className="skill-tree-nodes"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
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
