import { useState } from 'react';
import ClassSelection from './components/ClassSelection';
import MainGame from './components/SkillTree';

function App() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleSelectClass = (classId: string) => {
    setSelectedClass(classId);
  };

  if (!selectedClass) {
    return <ClassSelection onSelectClass={handleSelectClass} />;
  }

  return (
    <div className="app-container">
      <MainGame />
    </div>
  );
}

export default App;