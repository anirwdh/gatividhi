import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserHome, UserAllActivitiesScreen, UserDetailAcitivityScreen, UserCheckOut, SubadminFirstScreen, SignUpSubAdmin, SignInSubadmin, SubadminHome, SubAdminDetailListing, SubadminBooking, AboutScreen, PrivacyScreen } from './pages';
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
          <Route path="/travel-agents" element={<SubadminFirstScreen />} />
          <Route path="/subadmin/signup" element={<SignUpSubAdmin />} />
          <Route path="/subadmin/signin" element={<SignInSubadmin />} />
          <Route path="/subadmin/home" element={<SubadminHome />} />
          <Route path="/subadmin/listings" element={<SubadminHome />} />
          <Route path="/subadmin/calendar" element={<SubadminHome />} />
          <Route path="/subadmin/listing-detail" element={<SubAdminDetailListing />} />
          <Route path="/subadmin/bookings" element={<SubadminBooking />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/privacy" element={<PrivacyScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
