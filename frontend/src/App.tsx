import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx'; // Importe o componente para a página de login
import DashBoardPage from './pages/DashboardPage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
