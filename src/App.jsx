import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserHome, UserAllActivitiesScreen } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/activities" element={<UserAllActivitiesScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
