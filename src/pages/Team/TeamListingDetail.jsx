import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubadminFooter from '../Subadmin/SubadminFooter';
import SubAdminDetailListing from '../Subadmin/SubAdminDetailListing';
import './TeamListingDetail.css';

const TeamListingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="team-listing-detail-wrapper">
      <div className="team-listing-detail-header">
        <button 
          className="detail-back-btn"
          onClick={() => navigate('/gatividhiteam')}
        >
          ← Back to Listings
        </button>
        <h1 className="team-listing-detail-title">Team Listing Management</h1>
      </div>

      <div className="team-listing-detail-content">
        <SubAdminDetailListing 
          isEmbedded={true} 
          backPath="/gatividhiteam"
        />
      </div>

      <SubadminFooter />
    </div>
  );
};

export default TeamListingDetail;
