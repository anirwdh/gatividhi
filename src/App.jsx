import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserHome, UserAllActivitiesScreen, UserDetailAcitivityScreen, UserCheckOut } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/activities" element={<UserAllActivitiesScreen />} />
          <Route path="/activity/:id" element={<UserDetailAcitivityScreen />} />
          <Route path="/checkout" element={<UserCheckOut />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
