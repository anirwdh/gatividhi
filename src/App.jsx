import { AuthProvider } from './context/AuthContext';
import { UserHome } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserHome />
    </AuthProvider>
  );
}

export default App;
