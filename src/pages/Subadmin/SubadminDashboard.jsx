import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SubadminHeader from './SubadminHeader';
import SubadminFooter from './SubadminFooter';
import SubadminHome from './SubadminHome';
import SubadminListing from './SubadminListing';
import './SubadminDashboard.css';

const SubadminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('create');

  // Set active tab based on route
  useEffect(() => {
    if (location.pathname === '/subadmin/home' || location.pathname === '/subadmin') {
      setActiveTab('create');
    } else if (location.pathname === '/subadmin/listings' || location.pathname === '/subadmin/calendar') {
      setActiveTab('listings');
    }
  }, [location.pathname]);

  return (
    <div className="subadmin-dashboard">
      <SubadminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="subadmin-dashboard-content">
        {activeTab === 'create' && <SubadminHome />}
        {activeTab === 'listings' && <SubadminListing />}
      </main>

      <SubadminFooter />
    </div>
  );
};

export default SubadminDashboard;

