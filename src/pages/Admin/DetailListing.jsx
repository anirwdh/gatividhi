import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubAdminDetailListing from '../Subadmin/SubAdminDetailListing';

const DetailListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.state?.backPath || '/admin';

  const handleDeleteListing = () => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      // Logic to delete listing would go here
      console.log('Listing deleted');
      navigate(backPath);
    }
  };

  return (
    <SubAdminDetailListing 
      isEmbedded={true} 
      onDelete={handleDeleteListing}
      backPath={backPath}
    />
  );
};

export default DetailListing;