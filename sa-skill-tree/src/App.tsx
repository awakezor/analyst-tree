import SkillTree from './components/SkillTree';

function App() {
  return (
    <div className="app-container">
      <h1 className="title">Древо Прокачки Аналитика</h1>
      <SkillTree />
      <p className="hint">🖱 Кликните по узлу, чтобы активировать путь</p>
    </div>
  );
}

export default App;